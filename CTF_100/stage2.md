# [Task 2] Stage 2

Stage 2 is up now. Deploy the machine and start capturing the flag. Please terminate the previous VM before deploying a new one. The theme for this stage is HTTP and POP3.

**Prerequisite: Complete stage 1 and obtain the port sequence. Use the sequence to activate the ports in the port 9999**

Here are some of the tips:

1. You are going to use a network scanning tool (Nmap) quite often. Just do a fast scan with ping skip (`nmap -Pn -p- -v -T5`).
2. Bust the directory
3. Telnet strike again
4. Hail hydra!
5. Hints for the wordlists: `common.txt` (dirb), `big.txt` (dirb), `medium-lower-case` (dirbuster)
6. Stay calm and have fun

Refer to the hints if you are stuck or DM me in my discord channel if you are really stuck. Once again, good luck with the challenge. 

Note: ~~Stage 3 challenge will be released on 21/10/2019, UTC time~~. Stage 3 is now up!

Extra note (15/12/2019) [Click and download the OVA](https://drive.google.com/open?id=1XQyrcUCDx8p5gGcX9RxIKbSrTWY15ZF3)

## #1 - Flag 19

*Hint: Notepad could be useful*

A first scan reveals that port 9999 is open. Connect with `nc 172.16.222.133 9999` and enter the sequence found at stage 1.

~~~
$ nc 172.16.222.133 9999
***************************
*   Port knocking input   *
***************************
Hi user, please enter the port sequence
The format is (can be more than 4): PORT PORT PORT PORT
> 31031 50010 7968 20010 6100
Something happen
Good luck!
~~~

New ports have been unlocked.

~~~
$ nmap -Pn -v --min-parallelism 100 172.16.222.133
Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-23 09:07 CEST
Initiating Parallel DNS resolution of 1 host. at 09:07
Completed Parallel DNS resolution of 1 host. at 09:07, 0.00s elapsed
Initiating Connect Scan at 09:07
Scanning 172.16.222.133 [1000 ports]
Discovered open port 9999/tcp on 172.16.222.133
Discovered open port 1111/tcp on 172.16.222.133
Completed Connect Scan at 09:07, 6.63s elapsed (1000 total ports)
Nmap scan report for 172.16.222.133
Host is up (0.0031s latency).
Not shown: 998 filtered ports
PORT     STATE SERVICE
1111/tcp open  lmsocialserver
9999/tcp open  abyss

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 6.66 seconds
~~~

Nothing happens when we connect with netcat on port 1111. A script/version Nmap scan reveals that this is a web service with Python:

~~~
PORT     STATE SERVICE VERSION
1111/tcp open  http    SimpleHTTPServer 0.6 (Python 3.6.8)
| http-methods: 
|_  Supported Methods: GET HEAD
|_http-server-header: SimpleHTTP/0.6 Python/3.6.8
|_http-title: Site doesn't have a title (text/html).
~~~

Let's try with a browser. We have a lot of alerts:

~~~
$ curl -s http://172.16.222.133:1111 
alert!alert!alert!alert!alert!alert!alert!alert!alert!...[SNIP]...
~~~

Let's get the file and remove the alerts to see if there is anything else:

~~~
$ curl -s http://172.16.222.133:1111 > alert.txt
$ sed "s/alert\!//g" alert.txt 
flag 19:j4dnbdewgwgy5r7kjtnd
~~~

Flag 19: `j4dnbdewgwgy5r7kjtnd`

## #2 - Flag 20

Let's see if there is a `robots.txt` file:

~~~
$ curl -s http://172.16.222.133:1111/robots.txt
Disallow:
/
/This_is_easy
/flag_20_2re645f4n2ex85g3b2fw
~~~

Flag20: `2re645f4n2ex85g3b2fw`

## #3 - Flag 21

Both URLs found in the `robots.txt` file lead to 404.

Let's scan the web server with dirsearch. Several directories are found: 
* /capture/
* /hidden/
* /godzilla/

~~~
$ curl -s http://172.16.222.133:1111/hidden/
<p>Not bad, you found the hidden directory</p>
<!--Always check the comment-->
<!--flag 21: 5tjdmdawe35dsacmunqa-->
~~~

Flag 21: `5tjdmdawe35dsacmunqa`

## #4 - Flag 22

*Hint: What does the base look like*

~~~
$ curl -s http://172.16.222.133:1111/capture/
<p>Not bad, you found another flag</p>
<p>flag22: 35x7axg8xd7n4geyxp2t</p>
UHJvY2VlZCB3aXRoIHRoZSBuZXh0IGNoYWx<style></style>QMFZXG53POJSDUIDUNBSV6ZLOMQ======
~~~

**Encoded values**

Encoded | base | Decoded
---|---|---
UHJvY2VlZCB3aXRoIHRoZSBuZXh0IGNoYWx | base64 | Proceed with the next chal
QMFZXG53POJSDUIDUNBSV6ZLOMQ====== | ??? | ???

Flag22: `35x7axg8xd7n4geyxp2t`

## #5 - Flag 23

*Hint: remember the base*

~~~
$ curl -s http://172.16.222.133:1111/godzilla/
<p>Another one, you are smart ^^</p>
<p>flag23: 5vttxb43qpsh9ctbfzrd</p>
eW91IGFyZSB0b28gc21hcnQsIGRvbid0IHlvdSB0aGluay4=<br><br><br><br><br>
<font color="white">KVZWK4TOMFWWKORAM5QW2ZLPOZSXEID<style></style>sZW5nZTogODc2OSwgOTQ1MywgNjEyMywgOTkxMy4=</font>

<script language="JavaScript">
  window.onload = function() {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
    document.addEventListener("keydown", function(e) {
    //document.onkeydown = function(e) {
      // "I" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
      }
      // "J" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
      }
      // "S" key + macOS
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
      }
      // "U" key
      if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
      }
      // "F12" key
      if (event.keyCode == 123 || event.keyCode == 18) {
        disabledEvent(e);
      }
    }, false);
    function disabledEvent(e){
      if (e.stopPropagation){
        e.stopPropagation();
      } else if (window.event){
        window.event.cancelBubble = true;
      }
      e.preventDefault();
      return false;
    }
  };
</script>
~~~

**Encoded values**

Encoded | base | Decoded
---|---|---
eW91IGFyZSB0b28gc21hcnQsIGRvbid0IHlvdSB0aGluay4= | base64 | you are too smart, don't you think.
KVZWK4TOMFWWKORAM5QW2ZLPOZSXEID | ??? | ???
sZW5nZTogODc2OSwgOTQ1MywgNjEyMywgOTkxMy4= | ??? | ???

Notice that playing with concenating the strings with the previous values resolves the puzzle:

Encoded | base | Decoded
---|---|---
UHJvY2VlZCB3aXRoIHRoZSBuZXh0IGNoYWx | base64 | Proceed with the next chal
eW91IGFyZSB0b28gc21hcnQsIGRvbid0IHlvdSB0aGluay4= | base64 | you are too smart, don't you think.
UHJvY2VlZCB3aXRoIHRoZSBuZXh0IGNoYWxsZW5nZTogODc2OSwgOTQ1MywgNjEyMywgOTkxMy4= | base64 | Proceed with the next challenge: 8769, 9453, 6123, 9913
KVZWK4TOMFWWKORAM5QW2ZLPOZSXEIDQMFZXG53POJSDUIDUNBSV6ZLOMQ====== | base32 | Username: gameover password: the_end

Flag23: `5vttxb43qpsh9ctbfzrd`

## #6 - Flag 24

Let's try the sequence found previously:

~~~
$ nc 172.16.222.133 9999
***************************
*   Port knocking input   *
***************************
Hi user, please enter the port sequence
The format is (can be more than 4): PORT PORT PORT PORT
> 8769 9453 6123 9913
Something happen
Good luck!
~~~

Yes! It unlocked port 110:

~~~
PORT     STATE SERVICE
110/tcp  open  pop3
1111/tcp open  lmsocialserver
9999/tcp open  abyss
~~~

Now, let's connect, authenticate and retrieve the emails:

~~~
$ nc 172.16.222.133 110
+OK Dovecot (Ubuntu) ready.
USER gameover
+OK
PASS the_end
+OK Logged in.
stat 
+OK 4 9951
list
+OK 4 messages:
1 1010
2 7189
3 875
4 877
.
RETR 1
+OK 1010 octets
Return-Path: <gameover@ctf100.com>
X-Original-To: gameover@ctfmain
Delivered-To: gameover@ctfmain
Received: from [192.168.247.144] (localhost [127.0.0.1])
  by ctfmain.localdomain (Postfix) with ESMTP id 601A1828E8
  for <gameover@ctfmain>; Mon,  7 Oct 2019 12:33:52 +0000 (UTC)
Received: from 192.168.247.129
        (SquirrelMail authenticated user gameover)
        by 192.168.247.144 with HTTP;
        Mon, 7 Oct 2019 12:33:52 -0000
Message-ID: <1063a6d5ad70050be0771dbfe93280a7.squirrel@192.168.247.144>
Date: Mon, 7 Oct 2019 12:33:52 -0000
Subject: You found me
From: gameover@ctf100.com
To: gameover@ctfmain
User-Agent: SquirrelMail/1.4.22
MIME-Version: 1.0
Content-Type: text/plain;charset=iso-8859-1
Content-Transfer-Encoding: 8bit
X-Priority: 3 (Normal)
Importance: Normal

Congratulation on finding this port, This is a pop3

Take this flag as a token of celebration.

flag 24: phzppg952hsxaarspjfs

>From now on, thing will getting weirder and weirder. Good luck ^^


.
~~~

Flag 24: `phzppg952hsxaarspjfs`

## #7 - Flag 25

*Hint: This is an Ook. Kindly replace the first three dot to Ook. I purposely did an oopsie on the 5 dots, it should be 3.*

Let's retrieve the second email:

~~~
RETR 2
+OK 7189 octets
Return-Path: <gameover@ctf100.com>
X-Original-To: gameover@ctfmain
Delivered-To: gameover@ctfmain
Received: from [192.168.247.144] (localhost [127.0.0.1])
  by ctfmain.localdomain (Postfix) with ESMTP id 4EB57828E8
  for <gameover@ctfmain>; Mon,  7 Oct 2019 12:41:22 +0000 (UTC)
Received: from 192.168.247.129
        (SquirrelMail authenticated user gameover)
        by 192.168.247.144 with HTTP;
        Mon, 7 Oct 2019 12:41:22 -0000
Message-ID: <92b46b2d9318f438d18857a060dbdef5.squirrel@192.168.247.144>
Date: Mon, 7 Oct 2019 12:41:22 -0000
Subject: A beautiful tree
From: gameover@ctf100.com
To: gameover@ctfmain
User-Agent: SquirrelMail/1.4.22
MIME-Version: 1.0
Content-Type: text/plain;charset=iso-8859-1
Content-Transfer-Encoding: 8bit
X-Priority: 3 (Normal)
Importance: Normal

...... .... .... .... .... .... .... .... .... .... .... .... .... .... ....
...... .... .... .... .... ...! ...? .... ...? .... .... .... ...? .... ....
...... .... .... .... .... ...? .... .... .... .... .... .... .... .... ....
...... .... .... .... .... .... ...? .... .... .... .... .... .... .... ....
...... .... .... .... .... .... .... .... .... .... .... .... ...? .... ...?

...[SNIP]...

.
~~~

So we know from the hint this is "Ook" language, with a bit of customization. Let's make the necessary replacements:

~~~
$ sed "s/\.\.\.\.\./\.\.\./g" ook.txt | sed "s/\.\.\./Ook/g"
~~~

Now, let's decode the message with [dcode.fr](https://www.dcode.fr/langage-ook):

~~~
Oak is a beautiful tree. Don't you think? flag 25: nsknvw33cx4kfzhdbveb
~~~

Flag 25: `nsknvw33cx4kfzhdbveb`

## #8 - Flag 26

*Hint: Look at the subject, I'm just messing it up. Time to arrange the flag. 2 6 4 3 1 5 2 6 4 3 1 5 2 6... The flag is ???..jffy3c2t. Got it?*

~~~
RETR 3
+OK 875 octets
Return-Path: <gameover@ctf100.com>
X-Original-To: gameover@ctfmain
Delivered-To: gameover@ctfmain
Received: from [192.168.247.144] (localhost [127.0.0.1])
  by ctfmain.localdomain (Postfix) with ESMTP id 2148B828E8
  for <gameover@ctfmain>; Mon,  7 Oct 2019 12:42:35 +0000 (UTC)
Received: from 192.168.247.129
        (SquirrelMail authenticated user gameover)
        by 192.168.247.144 with HTTP;
        Mon, 7 Oct 2019 12:42:35 -0000
Message-ID: <a93592815814af66d50fa39e415beee0.squirrel@192.168.247.144>
Date: Mon, 7 Oct 2019 12:42:35 -0000
Subject: This is not over yet (264315)
From: gameover@ctf100.com
To: gameover@ctfmain
User-Agent: SquirrelMail/1.4.22
MIME-Version: 1.0
Content-Type: text/plain;charset=iso-8859-1
Content-Transfer-Encoding: 8bit
X-Priority: 3 (Normal)
Importance: Normal

flag26: zf7b75uung8afcyfj3t2

sareunea awmkaakw

.
~~~

I have written a [python script](files/flag26.py) to decode the values:

```python
#!/usr/bin/env python3

import sys

if len(sys.argv) < 3:
  print("Usage: python3 {} key encoded".format(sys.argv[0]))
  print("Example: python3 {} '{}' '{}'".format(
    sys.argv[0], '264315', 'zf7b75uung8afcyfj3t2'))
  sys.exit(1)

key = sys.argv[1]
enc = sys.argv[2].replace(' ', '')

# split encoded string into chunks of key length (last chunk may be truncated)
enc_chunk = [enc[i:i+len(key)] for i in range(0, len(enc), len(key))]


def pos_list(key, chunk):
  # make pos order list (only keeps value < chunk length)
  tmp = []
  i = 0
  for k in key:
    if(int(k)<=len(chunk)):
      tmp.append((int(k), i))
      i+=1

  tmp.sort()
  pos_order = [i[1] for i in tmp]
  return pos_order

dec = ""
for chunk in enc_chunk:
  pos_order = pos_list(key, chunk)
  for pos in pos_order:   
    dec += chunk[pos]

print(dec)
```

~~~
$ python flag26.py 264315 zf7b75uung8afcyfj3t2
7zb75f8ugnaujffy3c2t
$ python flag26.py 264315 "sareunea awmkaakw"
usernamewakawaka
~~~

We now have our flag and a username (`wakawaka`)

Flag26: `7zb75f8ugnaujffy3c2t`

## #9 - Flag 27

*Hint: Hint on the subject. You might find the other username as well*

We now retrieve the 4th email (notice that it is sent from wakawaka):

~~~
RETR 4
+OK 877 octets
Return-Path: <wakawaka@ctf100.com>
X-Original-To: gameover@ctfmain
Delivered-To: gameover@ctfmain
Received: from [192.168.247.144] (localhost [127.0.0.1])
  by ctfmain.localdomain (Postfix) with ESMTP id D7E8E828EA
  for <gameover@ctfmain>; Mon,  7 Oct 2019 12:47:40 +0000 (UTC)
Received: from 192.168.247.129
        (SquirrelMail authenticated user wakawaka)
        by 192.168.247.144 with HTTP;
        Mon, 7 Oct 2019 12:47:40 -0000
Message-ID: <3f6ad0edfd6b027c506da5fe1ee02a59.squirrel@192.168.247.144>
Date: Mon, 7 Oct 2019 12:47:40 -0000
Subject: The sheep jump over two fences
From: wakawaka@ctf100.com
To: gameover@ctfmain
User-Agent: SquirrelMail/1.4.22
MIME-Version: 1.0
Content-Type: text/plain;charset=iso-8859-1
Content-Transfer-Encoding: 8bit
X-Priority: 3 (Normal)
Importance: Normal

GONGTFA WNYEE SCKVTVVWNXSODIH LGTETSVNI VWJZNPZQWB

.
~~~

Use CyberChef with Rail Fence Cipher Decode (https://gchq.github.io/CyberChef/#recipe=Rail_Fence_Cipher_Decode(2,0)&input=R09OR1RGQSBXTllFRSBTQ0tWVFZWV05YU09ESUggTEdURVRTVk5JIFZXSlpOUFpRV0I) with key=2 (`The sheep jump over two fences`).

Decoded message: `GOODNIGHT FLAG TWENTYSEVEN IS CVKWVJTZVNVPWZNQXWSB`

Flag 27: `CVKWVJTZVNVPWZNQXWSB`

## #10 - Flag 28

*Hint: we will, we will rock you. The text appear in between line 4500 to 5500, starts with d. It takes 1 to 2 hours to brute-force with -t 64.*

Let's brute force wakawaka's POP3 password. As we are told the password is in rockyou.txt list, between lines 4500 and 5500, we will save some time.

~~~
$ sed -n 4500,5500p /data/src/wordlists/rockyou.txt | grep "^d" > passwords.txt 
$ wc -l passwords.txt 
38 passwords.txt
$ hydra -l wakawaka -P passwords.txt -f pop3://172.16.222.133
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-05-23 20:41:38
[INFO] several providers have implemented cracking protection, check with a small wordlist first - and stay legal!
[DATA] max 16 tasks per 1 server, overall 16 tasks, 38 login tries (l:1/p:38), ~3 tries per task
[DATA] attacking pop3://172.16.222.133:110/
[110][pop3] host: 172.16.222.133   login: wakawaka   password: damnit
[STATUS] attack finished for 172.16.222.133 (valid pair found)
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-05-23 20:41:47
~~~

Let's connect as `wakawaka` with `damnit` as password:

~~~
$ nc 172.16.222.133 110
+OK Dovecot (Ubuntu) ready.
USER wakawaka
+OK
PASS damnit
+OK Logged in.
LIST
+OK 6 messages:
1 953
2 1039
3 895
4 959
5 23450
6 867
.
~~~

There are 6 emails. Let's retrieve the 1st one:

~~~
RETR 1
+OK 953 octets
Return-Path: <wakawaka@ctf100.com>
X-Original-To: wakawaka@ctfmain
Delivered-To: wakawaka@ctfmain
Received: from [192.168.247.144] (localhost [127.0.0.1])
  by ctfmain.localdomain (Postfix) with ESMTP id 64A18828EA
  for <wakawaka@ctfmain>; Mon,  7 Oct 2019 12:48:37 +0000 (UTC)
Received: from 192.168.247.129
        (SquirrelMail authenticated user wakawaka)
        by 192.168.247.144 with HTTP;
        Mon, 7 Oct 2019 12:48:37 -0000
Message-ID: <28398944887e2d66a8b8b192c98a1c01.squirrel@192.168.247.144>
Date: Mon, 7 Oct 2019 12:48:37 -0000
Subject: More stuff
From: wakawaka@ctf100.com
To: wakawaka@ctfmain
User-Agent: SquirrelMail/1.4.22
MIME-Version: 1.0
Content-Type: text/plain;charset=iso-8859-1
Content-Transfer-Encoding: 8bit
X-Priority: 3 (Normal)
Importance: Normal

Great, you reached the abyss. If you stare into the abyss, the abyss is
staring back at you

flag 28: 3yy9e7wwe2b8fy65sgxb

The flag is clean

.
~~~

Flag 28: `3yy9e7wwe2b8fy65sgxb`

## #11 - Flag 29

*Hint: Sending SMS in old age*

~~~
RETR 2
+OK 1039 octets
Return-Path: <wakawaka@ctf100.com>
X-Original-To: wakawaka@ctfmain
Delivered-To: wakawaka@ctfmain
Received: from [192.168.247.144] (localhost [127.0.0.1])
  by ctfmain.localdomain (Postfix) with ESMTP id F2F40828EA
  for <wakawaka@ctfmain>; Mon,  7 Oct 2019 12:49:22 +0000 (UTC)
Received: from 192.168.247.129
        (SquirrelMail authenticated user wakawaka)
        by 192.168.247.144 with HTTP;
        Mon, 7 Oct 2019 12:49:22 -0000
Message-ID: <37f93f2ba240bf97e89f41f47ca6bc68.squirrel@192.168.247.144>
Date: Mon, 7 Oct 2019 12:49:22 -0000
Subject: 3310
From: wakawaka@ctf100.com
To: wakawaka@ctfmain
User-Agent: SquirrelMail/1.4.22
MIME-Version: 1.0
Content-Type: text/plain;charset=iso-8859-1
Content-Transfer-Encoding: 8bit
X-Priority: 3 (Normal)
Importance: Normal

333 555 2 4 0 8 9 33 66 8 999 66 444 66 33 0 444 7777 0 9 7777 7 2 6 9 777
9999 44 66 222 44 777 9 777 99 33 88 5 44 0 66 33 99 8 0 7 666 777 8 0 444
7777 0 8 44 777 33 33 0 666 66 33 0 8 44 777 33 33 0 8 44 777 33 33 0 9999
33 777 666

.
~~~

Let's write a [python script](files/flag29.py) to decode the T9 message:

```python
#!/usr/bin/env python3

keys = [
  [0, ' '],
  [1, False],
  [2, 'abc'],
  [3, 'def'],
  [4, 'ghi'],
  [5, 'jkl'],
  [6, 'mno'],
  [7, 'pqrs'],
  [8, 'tuv'],
  [9, 'wxyz']
  ]

seq = "333 555 2 4 0 8 9 33 66 8 999 66 444 66 33 0 444 7777 0 9 7777 7 2 6 9 777 "
seq+= "9999 44 66 222 44 777 9 777 99 33 88 5 44 0 66 33 99 8 0 7 666 777 8 0 444 "
seq+= "7777 0 8 44 777 33 33 0 666 66 33 0 8 44 777 33 33 0 8 44 777 33 33 0 9999 "
seq+= "33 777 666"

dec = []

for s in seq.split(' '):
  dec.append(keys[int(s[0])][1][len(s)-1])

print(''.join(dec))
```

~~~
$ python flag29.py 
flag twentynine is wspamwrzhnchrwrxeujh next port is three one three three zero
~~~

We have the flag and indication on the next port: `31330`.

Flag 29: `wspamwrzhnchrwrxeujh`

## #12 - Flag 30

*Hint: You are using it, right now. Keyboard shift*

~~~
RETR 3
+OK 895 octets
Return-Path: <wakawaka@ctf100.com>
X-Original-To: wakawaka@ctfmain
Delivered-To: wakawaka@ctfmain
Received: from [192.168.247.144] (localhost [127.0.0.1])
  by ctfmain.localdomain (Postfix) with ESMTP id 321B0828EA
  for <wakawaka@ctfmain>; Mon,  7 Oct 2019 12:49:51 +0000 (UTC)
Received: from 192.168.247.129
        (SquirrelMail authenticated user wakawaka)
        by 192.168.247.144 with HTTP;
        Mon, 7 Oct 2019 12:49:51 -0000
Message-ID: <42932e91cc912e70d6fe82a44d8ff1ba.squirrel@192.168.247.144>
Date: Mon, 7 Oct 2019 12:49:51 -0000
Subject: You are using it right now
From: wakawaka@ctf100.com
To: wakawaka@ctfmain
User-Agent: SquirrelMail/1.4.22
MIME-Version: 1.0
Content-Type: text/plain;charset=iso-8859-1
Content-Transfer-Encoding: 8bit
X-Priority: 3 (Normal)
Importance: Normal

g;sh yjotyu od gu[dwtig[dcinueslwyk/ Mrcy [pty od gobr pmr momr doc xrtp

.
~~~

Use dcode with Keyboard Shift cipher (https://www.dcode.fr/keyboard-shift-cipher). The decoded text with a QWERTY keyboard is:

~~~
flag thirty is fypsqrufpsxubywakqtj. Next port is five one nine six zero
~~~

Next port: `51960`

Flag 30: `fypsqrufpsxubywakqtj`

## #13 - Flag 31

*Hint: This is not S/N. This is Bubble*

~~~
RETR 4
+OK 959 octets
Return-Path: <wakawaka@ctf100.com>
X-Original-To: wakawaka@ctfmain
Delivered-To: wakawaka@ctfmain
Received: from [192.168.247.144] (localhost [127.0.0.1])
  by ctfmain.localdomain (Postfix) with ESMTP id 3F91C828EA
  for <wakawaka@ctfmain>; Mon,  7 Oct 2019 12:50:26 +0000 (UTC)
Received: from 192.168.247.129
        (SquirrelMail authenticated user wakawaka)
        by 192.168.247.144 with HTTP;
        Mon, 7 Oct 2019 12:50:26 -0000
Message-ID: <ee6dd2c7add823fe796bb173f66b1e56.squirrel@192.168.247.144>
Date: Mon, 7 Oct 2019 12:50:26 -0000
Subject: Serial number
From: wakawaka@ctf100.com
To: wakawaka@ctfmain
User-Agent: SquirrelMail/1.4.22
MIME-Version: 1.0
Content-Type: text/plain;charset=iso-8859-1
Content-Transfer-Encoding: 8bit
X-Priority: 3 (Normal)
Importance: Normal

xinik-samak-lomof-fisuf-pomyf-hytif-fosyk-kymyf-fetok-tytal-puvek-metul-byval-nasal-bynad-vymog-vunul-motyd-bosyk-zasol-gomyk-nosed-betef-casif-cisyx

.
~~~

There are several implementations to decode BubbleBabble (python, PHP). I found this PHP [script](http://bohwaz.net/static/bubblebabble.php):

~~~
$ php bubblebabble.php -d  - <<< xinik-samak-lomof-fisuf-pomyf-hytif-fosyk-kymyf-fetok-tytal-puvek-metul-byval-nasal-bynad-vymog-vunul-motyd-bosyk-zasol-gomyk-nosed-betef-casif-cisyx
flag 31: 5u3rfa3vm6zzh7pzyqpe. Next port is 61111
~~~

Next port is `61111`.

Flag 31: `5u3rfa3vm6zzh7pzyqpe`. 

## #14 - Flag 32

*Hint: A javascript esolang*

~~~
RETR 5
+OK 23450 octets
Return-Path: <wakawaka@ctf100.com>
X-Original-To: wakawaka@ctfmain
Delivered-To: wakawaka@ctfmain
Received: from [192.168.247.144] (localhost [127.0.0.1])
  by ctfmain.localdomain (Postfix) with ESMTP id E4AAF828EA
  for <wakawaka@ctfmain>; Mon,  7 Oct 2019 12:51:13 +0000 (UTC)
Received: from 192.168.247.129
        (SquirrelMail authenticated user wakawaka)
        by 192.168.247.144 with HTTP;
        Mon, 7 Oct 2019 12:51:13 -0000
Message-ID: <f3aa24146efb27ac1671aadabc9b6ef5.squirrel@192.168.247.144>
Date: Mon, 7 Oct 2019 12:51:13 -0000
Subject: js?
From: wakawaka@ctf100.com
To: wakawaka@ctfmain
User-Agent: SquirrelMail/1.4.22
MIME-Version: 1.0
Content-Type: text/plain;charset=iso-8859-1
Content-Transfer-Encoding: 8bit
X-Priority: 3 (Normal)
Importance: Normal

(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+(!![]+[])...[SNIP]...


.
~~~

I found this [online decoder](https://enkhee-osiris.github.io/Decoder-JSFuck/). Decoded message:

~~~
alert("Flag 32 is 3j9c8utp2ag6bwbrkmkn. Next port is 10101")
~~~

Next port is `10101`.

Flag 32: `3j9c8utp2ag6bwbrkmkn`


## #15 - Flag 33

*Hint: Is a type of ASCII shift*

~~~
RETR 6
+OK 867 octets
Return-Path: <wakawaka@ctf100.com>
X-Original-To: wakawaka@ctfmain
Delivered-To: wakawaka@ctfmain
Received: from [192.168.247.144] (localhost [127.0.0.1])
  by ctfmain.localdomain (Postfix) with ESMTP id 426F5828EA
  for <wakawaka@ctfmain>; Mon,  7 Oct 2019 12:51:46 +0000 (UTC)
Received: from 192.168.247.129
        (SquirrelMail authenticated user wakawaka)
        by 192.168.247.144 with HTTP;
        Mon, 7 Oct 2019 12:51:46 -0000
Message-ID: <cf4d8ccfaab21a4da45d85a4c1ce3d3b.squirrel@192.168.247.144>
Date: Mon, 7 Oct 2019 12:51:46 -0000
Subject: Definately an ASCII
From: wakawaka@ctf100.com
To: wakawaka@ctfmain
User-Agent: SquirrelMail/1.4.22
MIME-Version: 1.0
Content-Type: text/plain;charset=iso-8859-1
Content-Transfer-Encoding: 8bit
X-Priority: 3 (Normal)
Importance: Normal

Hnci"55"ku"6y6x7di9r|i|chxwx9ht0"Pgzv"rqtv"ku"54434

.
quit
+OK Logging out.
~~~

This is ASCII shift cipher (https://www.dcode.fr/ascii-shift-cipher). Decoded message:

~~~
Flag 33 is 4w4v5bg7pzgzafvuv7fr. Next port is 32212
~~~

Next port is `32212`

Flag 33: `4w4v5bg7pzgzafvuv7fr`. 

## #16 - Port to stage 3 (Format: PORT PORT PORT....)

~~~
$ nc 172.16.222.133 9999
***************************
*   Port knocking input   *
***************************
Hi user, please enter the port sequence
The format is (can be more than 4): PORT PORT PORT PORT
> 31330 51960 61111 10101 32212
Save this sequence, you need it for stage 3
That's all for the challenge
Thank you for your participation
~~~

Sequence: `31330 51960 61111 10101 32212`