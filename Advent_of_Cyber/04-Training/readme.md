# [Day 4] Training 
## Description

With the entire incident, McElferson has been very stressed.

We need all hands on deck now

To help resolve things faster, she has asked you to help the new intern(mcsysadmin) get familiar with Linux. 

Access the machine via SSH on port 22 using the command: `ssh mcsysadmin@[your-machines-ip]`

* username: mcsysadmin
* password: bestelf1234

Check out the supporting material [here](https://docs.google.com/document/d/1CpwM_MdHgRqlPSe4eCC_-rVgi8F1xh88PKOySTRSkxU/edit?usp=sharing)

 	
## #1 - How many visible files are there in the home directory(excluding ./ and ../)?

There are `8` visible files in the `home` directory:

~~~
$ ssh mcsysadmin@10.10.80.250
The authenticity of host '10.10.80.250 (10.10.80.250)' can't be established.
ECDSA key fingerprint is SHA256:IYNPmKurskzl/7GcTFinzOmOKtpQWPkd4wxR3P3pvvI.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.80.250' (ECDSA) to the list of known hosts.
mcsysadmin@10.10.80.250's password: 
Last login: Wed Dec  4 19:50:16 2019 from 82.34.52.37

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
[mcsysadmin@ip-10-10-80-250 ~]$ pwd
/home/mcsysadmin
[mcsysadmin@ip-10-10-80-250 ~]$ ls -l
total 116
-rw-rw-r-- 1 mcsysadmin mcsysadmin 13545 Dec  4 07:28 file1
-rw-rw-r-- 1 mcsysadmin mcsysadmin 13545 Dec  4 07:35 file2
-rw-rw-r-- 1 mcsysadmin mcsysadmin 13545 Dec  4 07:28 file3
-rw-rw-r-- 1 mcsysadmin mcsysadmin 13545 Dec  4 07:28 file4
-rw-rw-r-- 1 mcsysadmin mcsysadmin     8 Dec  4 07:30 file5
-rw-rw-r-- 1 mcsysadmin mcsysadmin 13545 Dec  4 07:34 file6
-rw-rw-r-- 1 mcsysadmin mcsysadmin 13545 Dec  4 07:28 file7
-rw-rw-r-- 1 mcsysadmin mcsysadmin 13545 Dec  4 07:28 file8
~~~

## #2 - What is the content of file5?

~~~
[mcsysadmin@ip-10-10-80-250 ~]$ cat file5
recipes
~~~

## #3 - Which file contains the string ‘password’?

`file6` contains the string `password`:

~~~
[mcsysadmin@ip-10-10-80-250 ~]$ grep password *
file6:passwordHpKRQfdxzZocwg5O0RsiyLSVQon72CjFmsV4ZLGjxI8tXYo1NhLsEply
~~~


## #4 - What is the IP address in a file in the home folder?

`file2` contains an IP address: `10.0.0.05`

~~~
$ egrep -o "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" *
file2:10.0.0.05
~~~

## #5 - How many users can log into the machine?

`3` users can log into the machine:

~~~
[mcsysadmin@ip-10-10-80-250 ~]$ cat /etc/passwd | grep "/bin/bash" | wc -l
3
$ cat /etc/passwd | grep "/bin/bash"
root:x:0:0:root:/root:/bin/bash
ec2-user:x:1000:1000:EC2 Default User:/home/ec2-user:/bin/bash
mcsysadmin:x:1001:1001::/home/mcsysadmin:/bin/bash
~~~

## #6 - What is the sha1 hash of file8?

The SHA1 hash of `file8` is `fa67ee594358d83becdd2cb6c466b25320fd2835`.

~~~
$ sha1sum file8
fa67ee594358d83becdd2cb6c466b25320fd2835  file8
~~~

## #7 - What is mcsysadmin’s password hash?

Passwords are stored in `/etc/shadow` but the `mcsysadmin` user has insufficient privileges to read the file:

~~~
[mcsysadmin@ip-10-10-80-250 ~]$ cat /etc/shadow
cat: /etc/shadow: Permission denied
~~~

That said it seems the `shadow` file has been copied to `/var/shadow.bak`:

~~~
[mcsysadmin@ip-10-10-80-250 ~]$ find / -name shadow* 2>/dev/null | head
/etc/shadow
/etc/shadow-
/var/shadow.bak
/usr/share/doc/python-babel-0.9.6/doc/common/style/shadow.gif
/usr/share/doc/shadow-utils-4.1.5.1
/usr/share/locale/ca/LC_MESSAGES/shadow.mo
/usr/share/locale/da/LC_MESSAGES/shadow.mo
/usr/share/locale/de/LC_MESSAGES/shadow.mo
/usr/share/locale/es/LC_MESSAGES/shadow.mo
/usr/share/locale/fi/LC_MESSAGES/shadow.mo
~~~

Here is the hash we are looking for:

~~~
[mcsysadmin@ip-10-10-80-250 ~]$ grep mcsysadmin /var/shadow.bak 
mcsysadmin:$6$jbosYsU/$qOYToX/hnKGjT0EscuUIiIqF8GHgokHdy/Rg/DaB.RgkrbeBXPdzpHdMLI6cQJLdFlS4gkBMzilDBYcQvu2ro/:18234:0:99999:7:::
~~~

Answer: `$6$jbosYsU/$qOYToX/hnKGjT0EscuUIiIqF8GHgokHdy/Rg/DaB.RgkrbeBXPdzpHdMLI6cQJLdFlS4gkBMzilDBYcQvu2ro/`
