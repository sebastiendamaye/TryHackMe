# [Task 6] Stage 6

Stage 6 is now ready to be root. Deploy the machine and start capturing the flag. Please terminate the previous VM before deploying a new one. The theme for this stage is Linux.

**Prerequisite: Complete stage 5 and obtain the port sequence. Use the sequence to activate the ports in the port 9999**

Here are some of the tips:

1. You are going to need a network scanning tool (Nmap). Just do a fast scan with ping skip (nmap -Pn -p- -v -T5).
2. Some Linux activity: Check the file permission, scheduler, find a file, get attribute and sudo 
3. Stay calm and have fun

Refer to the hints if you are stuck or DM me in my discord channel if you are really stuck. Once again, good luck with the challenge. 

Note: ~~A new path will be revealed if the chosen one managed to solve all 80 flags. Are you the chosen one?~~ A new path has been revealed

# #1 - Flag 72

*Hint: Permission*

Let's start by unlocking the ports with the sequence found at stage 5 (notice that the order was TB/PI/TW, as told in the AES decrypted message)

~~~
$ nc 10.10.237.246 9999
***************************
*   Port knocking input   *
***************************
Hi user, please enter the port sequence
The format is (can be more than 4): PORT PORT PORT PORT
> 39914 28817 44414
Something happen
Good luck!
~~~

The Nmap scan reveals that port 22 is now open:

~~~
PORT     STATE SERVICE
22/tcp   open  ssh
9999/tcp open  abyss
~~~

Remember the SSH credentials found at stage 5... Time has come to use them. Connect with: `beginner:timehascome`.

The flag is in our home directory:

~~~
$ cat /home/beginner/flag72
flag72: pdk0yp5w4ao6g7gq21r2
~~~

# #2 - Flag 73

*Hint: Is an illusion*

There are several users in the `home` directory and we will probably need to switch from `beginner` to `level1`, then to `level2`, ... until `level6`, and then become `main`:

~~~
$ ls -l /home
total 32
drwx------ 4 beginner beginner 4096 May 25 10:27 beginner
drwx------ 3 level1   level1   4096 Oct  8  2019 level1
drwx------ 2 level2   level2   4096 Oct  8  2019 level2
drwx------ 2 level3   level3   4096 Oct  8  2019 level3
drwx------ 2 level4   level4   4096 Oct  8  2019 level4
drwx------ 5 level5   level5   4096 Oct  8  2019 level5
drwx------ 2 level6   level6   4096 Oct  8  2019 level6
drwx------ 4 main     main     4096 Oct  8  2019 main
~~~

In our home directory, there is a file named `level1` which is owned by us, but has no permission:

~~~
beginner@main:~$ ls -la
total 28
drwx------  2 beginner beginner 4096 Oct  8  2019 .
drwxr-xr-x 10 root     root     4096 Oct  8  2019 ..
-rw-r--r--  1 beginner beginner  220 Apr  4  2018 .bash_logout
-rw-r--r--  1 beginner beginner 3771 Apr  4  2018 .bashrc
-rw-r--r--  1 beginner beginner   29 Oct  8  2019 flag72
----------  1 beginner beginner   31 Oct  8  2019 level1   <------ No permission at all?
-rw-r--r--  1 beginner beginner  807 Apr  4  2018 .profile
~~~

Let's give it read permissions:

~~~
$ /bin/bash
beginner@main:~$ chmod 600 level1
beginner@main:~$ cat level1
password: i30c8incjneju36lzuxm
~~~

Probably level1's password. Let's change user:

~~~
beginner@main:~$ su - level1
Password: 
$ /bin/bash
level1@main:~$ whoami
level1
~~~

We find the flag in our new home directory:

~~~
level1@main:~$ cat /home/level1/flag73 
flag 73: r6jk3oiu5tjmnuokzrcq
~~~

# #3 - Flag 74

*Hint: file attribute*

Let's search for a file named flag74:

~~~
level1@main:~$ find / -name "*flag74*" 2>/dev/null
level1@main:~$ 
~~~

Hum, no such file. Notice that there is a weird hidden directory (`...`) in our home:

~~~
level1@main:~$ ls -la
total 36
drwx------  5 level1 level1 4096 May 25 15:22 .
drwxr-xr-x 10 root   root   4096 Oct  8  2019 ..
drwxr-xr-x  2 root   root   4096 Oct  8  2019 ... <----------- hidden directory ("...")
-rw-r--r--  1 level1 level1  220 Apr  4  2018 .bash_logout
-rw-r--r--  1 level1 level1 3771 Apr  4  2018 .bashrc
drwx------  2 level1 level1 4096 May 25 15:22 .cache
-rw-r--r--  1 level1 level1   30 Oct  8  2019 flag73
drwx------  3 level1 level1 4096 May 25 15:22 .gnupg
-rw-r--r--  1 level1 level1  807 Apr  4  2018 .profile
~~~

This hidden directory contains a hidden file that gives the level2's password. Switch to `level2` and get the flag:

~~~
level1@main:~$ cat .../.level2
password: gkgl4ilh6469ux3j82yy
level1@main:~$ su - level2
Password: 
$ /bin/bash
level2@main:~$ cat flag74 
flag 74: 7z8w6bvsyipjz3o9s3a5
~~~

Flag74: `7z8w6bvsyipjz3o9s3a5`

# #4 - Flag 75

*Hint: Search the file*

The hint indicates to search the flag:

~~~
level2@main:/var/backup$ find / -name flag75 2>/dev/null
level2@main:/var/backup$ find / -name "*flag75*" 2>/dev/null
~~~

No `flag75` file found, either because it is not the correct name, or because we do not have the correct privileges to access the file.

Our home directory contains a weird file named `nothing`:

~~~
level2@main:/var/backup$ cd
level2@main:~$ ll
total 352
538614 drwx------  4 level2 level2   4096 May 25 16:30 .
393218 drwxr-xr-x 10 root   root     4096 Oct  8  2019 ..
539575 -rw-------  1 level2 level2   1615 May 25 15:57 .bash_history
538620 -rw-r--r--  1 level2 level2    220 Apr  4  2018 .bash_logout
538616 -rw-r--r--  1 level2 level2   3771 Apr  4  2018 .bashrc
539568 drwx------  2 level2 level2   4096 May 25 13:09 .cache
538624 -rw-r--r--  1 level2 level2     30 Oct  8  2019 flag74
539566 drwx------  3 level2 level2   4096 May 25 13:36 .gnupg
538626 -rw-r--r--  1 level2 level2     15 Oct  8  2019 nothing  <--------- ???
538618 -rw-r--r--  1 level2 level2    807 Apr  4  2018 .profile
539576 -rw-------  1 level2 level2   6957 May 25 16:19 .viminfo
level2@main:~$ cat nothing 
Nothing to see
level2@main:~$ xxd nothing 
00000000: 4e6f 7468 696e 6720 746f 2073 6565 0a    Nothing to see.
~~~

Digging further on the files in our home, we can see that `.viminfo` discloses the existence of a backup script (`/var/backup.sh`):

~~~
root@main:/home/level2# cat .viminfo 
# This viminfo file was generated by Vim 8.0.
# You may edit it if you're careful!

# Viminfo version
|1,4

# Value of 'encoding' when this file was written
*encoding=utf-8


# hlsearch on (H) or off (h):
~h
# Command Line History (newest to oldest):
:q!
|2,0,1590493156,,"q!"
:x
|2,0,1590493153,,"x"
:x!
|2,0,1590492989,,"x!"

# Search String History (newest to oldest):

# Expression History (newest to oldest):

# Input Line History (newest to oldest):

# Debug Line History (newest to oldest):

# Registers:
""-	CHAR	0
	e
|3,1,36,0,1,0,1590492964,"e"

# File marks:
'0  3  24  /var/backup/backup.sh
|4,48,3,24,1590493156,"/var/backup/backup.sh"
'1  3  24  /var/backup/backup.sh
|4,49,3,24,1590493153,"/var/backup/backup.sh"
'2  3  20  /var/backup/backup.sh
|4,50,3,20,1590492989,"/var/backup/backup.sh"
'3  3  20  /var/backup/backup.sh
|4,51,3,20,1590492989,"/var/backup/backup.sh"

# Jumplist (newest first):
-'  3  24  /var/backup/backup.sh
|4,39,3,24,1590493156,"/var/backup/backup.sh"
-'  3  24  /var/backup/backup.sh
|4,39,3,24,1590493153,"/var/backup/backup.sh"
-'  3  20  /var/backup/backup.sh
|4,39,3,20,1590492989,"/var/backup/backup.sh"
-'  1  0  /var/backup/backup.sh
|4,39,1,0,1590492958,"/var/backup/backup.sh"
-'  1  0  /var/backup/backup.sh
|4,39,1,0,1590492958,"/var/backup/backup.sh"
-'  1  0  /var/backup/backup.sh
|4,39,1,0,1590492958,"/var/backup/backup.sh"

# History of marks within files (newest to oldest):

> /var/backup/backup.sh
	*	1590493156	0
	"	3	24
	^	3	25
	.	3	24
	+	3	24
~~~

THe file is owned by `level5`. It copies the test.txt file in level5's home to `/var/backup/` every minute:

~~~
level2@main:~$ ls -l /var/backup/
total 8
-rwxrw-r-x 1 level5 level5 58 Oct  8  2019 backup.sh
-rw-rw-r-- 1 level5 level5 20 Oct 19  2019 test.txt
level2@main:/var/backup$ cat backup.sh 
#!/bin/bash
cp /home/level5/test.txt /var/backup/test.txt
~~~

I was able to modify it with `vim`, but as the script is executed by level5's cron, and `level5` does not have access to `/home/level3` to read the flag. **I would appreciate if you would tell me how you have solved this...**

I've found another way to bypass it and get the password for the next level. After completion of the final stage (you will be `root`), I've been able to get the missing flag:

~~~
root@main:~# whoami
root
root@main:~# cat /home/level3/flag75 
flag 75: 6xm84idg44zgjudgfu40
~~~

# #5 - Flag 76

*Hint: Pull the password from another user*

Here is how I did. Looking for files owned by level3, I found `/var/lib/vim/addons/pass` that contained the password for `level4`:

~~~
level2@main:/var/mail$ find / -type f -user level3 2>/dev/null
/var/lib/vim/addons/pass
level2@main:/var/mail$ cat /var/lib/vim/addons/pass
level 4 pass: d5kzrgizk0eh4k4u31ng
level2@main:/var/backup$ su - level4
Password: 
$ /bin/bash
level4@main:~$ ls -la
total 28
drwx------  2 level4 level4 4096 Oct  8  2019 .
drwxr-xr-x 10 root   root   4096 Oct  8  2019 ..
-rw-r--r--  1 level4 level4  220 Apr  4  2018 .bash_logout
-rw-r--r--  1 level4 level4 3771 Apr  4  2018 .bashrc
-rw-r--r--  1 level4 level4   30 Oct  8  2019 flag76
-rw-r--r--  1 root   root    103 Oct  8  2019 .hidden_note
-rw-r--r--  1 level4 level4  807 Apr  4  2018 .profile
level4@main:~$ cat flag76 
flag 76: bhjnkoyf0vmwh3a8mo92
~~~

Flag 76: `bhjnkoyf0vmwh3a8mo92`

# #6 - Flag 77

~~~
level4@main:~$ cat .hidden_note 
Hi level 4,

Task scheduling was fun. I don't know who put pass5.txt into my directory.

From,
level5
~~~

Edit the backup script with vim to view the content of the level5's home directory. This backup script is executed every minute.

~~~
$ cd /var/backup/
$ cat backup.sh 
#!/bin/bash
#cp /home/level5/test.txt /var/backup/test.txt
ls -la /home/level5 > /var/backup/test.txt
~~~

After some seconds, the content of `test.txt` reveals the level5's home:

~~~
$ cat test.txt 
total 48
drwx------  5 level5 level5 4096 Oct  8  2019 .
drwxr-xr-x 10 root   root   4096 Oct  8  2019 ..
-rw-r--r--  1 level5 level5  220 Apr  4  2018 .bash_logout
-rw-r--r--  1 level5 level5 3771 Apr  4  2018 .bashrc
drwx------  2 level5 level5 4096 Oct  8  2019 .cache
-rw-rw-r--  1 level5 level5   30 Oct  8  2019 flag77
drwx------  3 level5 level5 4096 Oct  8  2019 .gnupg
drwxrwxr-x  3 level5 level5 4096 Oct  8  2019 .local
-rw-rw-r--  1 level5 level5   35 Oct  8  2019 pass5.txt
-rw-r--r--  1 level5 level5  807 Apr  4  2018 .profile
-rw-rw-r--  1 level5 level5   66 Oct  8  2019 .selected_editor
-rw-rw-r--  1 level5 level5   20 Oct  8  2019 test.txt
~~~

Let's get the flag (modify the script with vim):

~~~
level4@main:/var/backup$ cat backup.sh 
#!/bin/bash
#cp /home/level5/test.txt /var/backup/test.txt
cp /home/level5/flag77 /var/backup/test.txt
level4@main:/var/backup$ cat test.txt 
flag 77: tyqrkkk93w851fzg0yyn
~~~

Flag 77: `tyqrkkk93w851fzg0yyn`

# #7 - Flag 78

*Hint: Find the vim password. It is a 'game'*

Now, let's get pass5.txt:

~~~
level4@main:/var/backup$ cat backup.sh 
#!/bin/bash
#cp /home/level5/test.txt /var/backup/test.txt
cp /home/level5/pass5.txt /var/backup/test.txt
level4@main:/var/backup$ cat test.txt 
level 5 pass: g669dwbb3dcadt1eui63
~~~

Now that we have level5's password, let's switch to `level5` and search for files owned by the user:

~~~
$ su - level5
Password: 
$ /bin/bash
$ find / -type f -user level5 2>/dev/null
/bin/what
/var/backup/test.txt
/var/backup/backup.sh
~~~

What is `/bin/what`?

~~~
level5@main:~$ file /bin/what 
/bin/what: ASCII text
level5@main:~$ cat /bin/what 
level 6 pass: jaf615ikj0vjuujse2td
~~~

Let's switch to `level6`:

~~~
level5@main:~$ su - level6
Password: 
$ /bin/bash
level6@main:~$ whoami 
level6
~~~

The flag is in our home directory:

~~~
level6@main:~$ cat flag78 
flag 78: uvhkn9648vgmsfzl4zc1
~~~

Flag 78: `uvhkn9648vgmsfzl4zc1`

# #8 - Flag 79

There is a vim encrypted file in our home. If you open it with vim, you will be prompted for a password.

~~~
level6@main:~$ file hey_listen 
hey_listen: Vim encrypted file data
level6@main:~$ vim hey_listen
~~~

There is a hidden file in `/usr/games/` that gives the password:

~~~
$ cat /usr/games/.TheLegendofZelda 
vim pass

save_me_link
~~~

The vim password is `save_me_link`. Now open the file in vim to reveal the password:

~~~
main password: you_shall_not_password
~~~

We now have the final user's (main) password. Let's switch user and get the flag in the home directory.

~~~
$ su - main
main@main:~$ cat flag79 
flag 79: vnldgj530m7f09cw9c8t
~~~

# #9 - Flag 80

The `main` user is in the sudoers, so it's easy to become root and get the flag!

~~~
root@main:~# cd /root/
root@main:/root# ll
total 40
drwx------  5 root root 4096 Oct  8  2019 ./
drwxr-xr-x 24 root root 4096 Oct  8  2019 ../
-rw-------  1 root root  471 Oct  8  2019 .bash_history
-rw-r--r--  1 root root 3106 Apr  9  2018 .bashrc
drwxr-xr-x  2 root root 4096 Oct  8  2019 hello_there/
drwxr-xr-x  3 root root 4096 Oct  8  2019 .local/
-rw-r--r--  1 root root  148 Aug 17  2015 .profile
-rw-r--r--  1 root root   66 Oct  8  2019 .selected_editor
drwx------  2 root root 4096 Oct  8  2019 .ssh/
-rw-------  1 root root 1939 Oct  8  2019 .viminfo
root@main:/root# cd hello_there/
root@main:/root/hello_there# ll
total 12
drwxr-xr-x 2 root root 4096 Oct  8  2019 ./
drwx------ 5 root root 4096 Oct  8  2019 ../
-rw-r--r-- 1 root root  120 Oct  8  2019 message_by_author
root@main:/root/hello_there# cat message_by_author 
Congratulation, you are now completed the 100 CTF challenge

Here, enjoy your last flag.

Flag80: 1rmmclum4vp007otp95n
~~~

At this stage, I was able to get the missing flag75:

~~~
root@main:~# find / -type f -name flag75
/home/level3/flag75
root@main:~# cat /home/level3/flag75 
flag 75: 6xm84idg44zgjudgfu40
~~~
