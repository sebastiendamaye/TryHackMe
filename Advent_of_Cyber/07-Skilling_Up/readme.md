# [Day 7] Skilling Up

## Description

Previously, we saw mcsysadmin learning the basics of Linux. With the on-going crisis, McElferson has been very impressed and is looking to push mcsysadmin to the security team. One of the first things they have to do is look at some strange machines that they found on their network. 

Check out the supporting material [here](https://docs.google.com/document/d/1q0FziVZM3zCWhcgtPpljVPzkBX0fMAh6ebrXVM5rg08/edit?usp=sharing).

## #1 - how many TCP ports under 1000 are open?

~~~
$ sudo nmap -sS -sV -A -p- 10.10.219.159
[sudo] password for unknown: 
Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-02 07:54 CEST
Nmap scan report for 10.10.219.159
Host is up (0.051s latency).
Not shown: 65531 closed ports
PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 7.4 (protocol 2.0)
| ssh-hostkey: 
|   2048 aa:35:92:fc:1b:3e:90:e3:9d:cf:5b:56:b5:c7:ec:09 (RSA)
|   256 c7:28:e5:ac:51:ef:f0:b1:c1:5f:d7:2e:d7:29:e4:51 (ECDSA)
|_  256 1e:e1:81:bc:fd:33:da:6b:a8:54:a4:e6:26:fc:3b:c2 (ED25519)
111/tcp   open  rpcbind 2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100024  1          47513/udp6  status
|   100024  1          50702/udp   status
|   100024  1          54567/tcp6  status
|_  100024  1          60863/tcp   status
999/tcp   open  http    SimpleHTTPServer 0.6 (Python 3.6.8)
|_http-server-header: SimpleHTTP/0.6 Python/3.6.8
|_http-title: Directory listing for /
60863/tcp open  status  1 (RPC #100024)
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.80%E=4%D=5/2%OT=22%CT=1%CU=41812%PV=Y%DS=2%DC=T%G=Y%TM=5EAD0BB6
OS:%P=x86_64-pc-linux-gnu)SEQ(SP=100%GCD=1%ISR=107%TI=Z%CI=Z%II=I%TS=A)OPS(
OS:O1=M508ST11NW6%O2=M508ST11NW6%O3=M508NNT11NW6%O4=M508ST11NW6%O5=M508ST11
OS:NW6%O6=M508ST11)WIN(W1=68DF%W2=68DF%W3=68DF%W4=68DF%W5=68DF%W6=68DF)ECN(
OS:R=Y%DF=Y%T=FF%W=6903%O=M508NNSNW6%CC=Y%Q=)T1(R=Y%DF=Y%T=FF%S=O%A=S+%F=AS
OS:%RD=0%Q=)T2(R=N)T3(R=N)T4(R=Y%DF=Y%T=FF%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T5(R=
OS:Y%DF=Y%T=FF%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)T6(R=Y%DF=Y%T=FF%W=0%S=A%A=Z%F=
OS:R%O=%RD=0%Q=)T7(R=Y%DF=Y%T=FF%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)U1(R=Y%DF=N%T
OS:=FF%IPL=164%UN=0%RIPL=G%RID=G%RIPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=FF%CD=
OS:S)

Network Distance: 2 hops

TRACEROUTE (using port 256/tcp)
HOP RTT      ADDRESS
1   46.06 ms 10.9.0.1
2   45.09 ms 10.10.219.159

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 155.19 seconds
~~~

Answer: There are `3` open ports under 1000: 22, 111, 999

## #2 - What is the name of the OS of the host?

The host is running `linux`.

## #3 - What version of SSH is running?

OpenSSH version `7.4` is running on the host.

## #4 - What is the name of the file that is accessible on the server you found running?

The HTTP service on port 999 is hosting a file (`interesting.file`). It's an empty file.

~~~
$ curl -s http://10.10.219.159:999/ | html2text 
****** Directory listing for / ******
===============================================================================
    * interesting.file
===============================================================================
~~~