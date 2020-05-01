# [Day 3] Evil Elf 

## Description

[Download](files/EvilElf.pcap)

An Elf-ministrator, has a network capture file from a computer and needs help to figure out what went on! Are you able to help?

Supporting material for the challenge can be found [here](https://docs.google.com/document/d/1ZVsOtW7mM-4neZZ4QtYCEp__exiMrvlUCXTxhB-zyxk/edit?usp=sharing)! 

## #1: Whats the destination IP on packet number 998?

In Wireshark, use `Ctrl+G` to jump to packet #998.

The destination is `63.32.89.195`.

## #2: What item is on the Christmas list?

~~~
Answer: ps4
~~~

Right clicking on packet 998 > follow TCP stream reveals the below content. We see that the string `ps4` is written to `christmas_list.txt`.

~~~
echo 'ps4' > christmas_list.txt
cat /etc/shadow
root:*:18171:0:99999:7:::
daemon:*:18171:0:99999:7:::
bin:*:18171:0:99999:7:::
sys:*:18171:0:99999:7:::
sync:*:18171:0:99999:7:::
games:*:18171:0:99999:7:::
man:*:18171:0:99999:7:::
lp:*:18171:0:99999:7:::
mail:*:18171:0:99999:7:::
news:*:18171:0:99999:7:::
uucp:*:18171:0:99999:7:::
proxy:*:18171:0:99999:7:::
www-data:*:18171:0:99999:7:::
backup:*:18171:0:99999:7:::
list:*:18171:0:99999:7:::
irc:*:18171:0:99999:7:::
gnats:*:18171:0:99999:7:::
nobody:*:18171:0:99999:7:::
systemd-network:*:18171:0:99999:7:::
systemd-resolve:*:18171:0:99999:7:::
syslog:*:18171:0:99999:7:::
messagebus:*:18171:0:99999:7:::
_apt:*:18171:0:99999:7:::
lxd:*:18171:0:99999:7:::
uuidd:*:18171:0:99999:7:::
dnsmasq:*:18171:0:99999:7:::
landscape:*:18171:0:99999:7:::
sshd:*:18171:0:99999:7:::
pollinate:*:18171:0:99999:7:::
ubuntu:!:18232:0:99999:7:::
buddy:$6$3GvJsNPG$ZrSFprHS13divBhlaKg1rYrYLJ7m1xsYRKxlLh0A1sUc/6SUd7UvekBOtSnSyBwk3vCDqBhrgxQpkdsNN6aYP1:18233:0:99999:7:::
~~~

## #3: Crack buddy's password!

Paste the following content to [shadow.txt](files/shadow.txt):
~~~
$ cat shadow.txt 
buddy:$6$3GvJsNPG$ZrSFprHS13divBhlaKg1rYrYLJ7m1xsYRKxlLh0A1sUc/6SUd7UvekBOtSnSyBwk3vCDqBhrgxQpkdsNN6aYP1:18233:0:99999:7:::
~~~

Also create [passwd.txt](files/passwd.txt):
~~~
$ cat passwd.txt 
buddy:x:1000:1000:buddy,,,:/home/buddy:/bin/bash
~~~

Now use `unshadow` to compile both files into something John will be able to process ([hash.txt](files/hash.txt)):
~~~
$ ./unshadow passwd.txt shadow.txt > hash.txt
$ cat hash.txt 
buddy:$6$3GvJsNPG$ZrSFprHS13divBhlaKg1rYrYLJ7m1xsYRKxlLh0A1sUc/6SUd7UvekBOtSnSyBwk3vCDqBhrgxQpkdsNN6aYP1:1000:1000:buddy,,,:/home/buddy:/bin/bash
~~~

Now, let's crack:
~~~
$ /data/src/john-1.9.0-jumbo-1/run/john --wordlist=/data/src/wordlists/rockyou.txt hash.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (sha512crypt, crypt(3) $6$ [SHA512 256/256 AVX2 4x])
Cost 1 (iteration count) is 5000 for all loaded hashes
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
rainbow          (buddy)
1g 0:00:00:00 DONE (2020-05-01 18:25) 4.545g/s 4654p/s 4654c/s 4654C/s 123456..bethany
Use the "--show" option to display all of the cracked passwords reliably
Session completed
~~~

Password is `rainbow`.
