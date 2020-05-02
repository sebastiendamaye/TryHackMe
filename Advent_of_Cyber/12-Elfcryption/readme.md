# [Day 12] Elfcryption

## Instructions

[Download](files/tosend.zip)

You think the Christmas Monster is intercepting and reading your messages! Elf Alice has sent you an encrypted message. Its your job to go and decrypt it!

Read the supporting materials [here](https://docs.google.com/document/d/1xUOtEZOTS_L8u_S5Fbs1Wof7mdpWQrj2NkgWLV9tqns/edit?usp=sharing).

## #1 - What is the md5 hashsum of the encrypted note1 file?

We are provided with a zip archive that contains 3 files, 1 of which (`note1.txt.gpg`) being the GPG encrypted `note1.txt` file.

~~~
$ unzip tosend.zip 
Archive:  tosend.zip
 extracting: note1.txt.gpg           
 extracting: note2_encrypted.txt     
  inflating: private.key             
$ ll
total 24
-rw-rw-r-- 1 unknown unknown  128 Dec 11 23:16 note1.txt.gpg
-rw-rw-r-- 1 unknown unknown 1114 Dec 11 23:17 note2_encrypted.txt
-rw-rw-r-- 1 unknown unknown 7011 Dec 11 23:17 private.key
-rw-r--r-- 1 unknown unknown 7075 May  2 20:09 tosend.zip
$ md5sum note1.txt.gpg 
24cf615e2a4f42718f2ff36b35614f8f  note1.txt.gpg
~~~

Answer: `24cf615e2a4f42718f2ff36b35614f8f`

## #2 - Where was elf Bob told to meet Alice?

*Hint: gpg key is 25daysofchristmas*

Let's decrypt the GPG message with the password `25daysofchristmas` provided in the Hint.

~~~
$ gpg --decrypt note1.txt.gpg 
gpg: AES encrypted data
gpg: encrypted with 1 passphrase
I will meet you outside Santa's Grotto at 5pm!
~~~

Answer: `Santa's Grotto`

## #3 - Decrypt note2 and obtain the flag!

*Hint: private password is hello*

`note2` has been encrypted with `openssl`:

~~~
$ file note2_encrypted.txt 
note2_encrypted.txt: data

$ head private.key 
-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-256-CBC,E11422626FD8F8B1104E57409AC813F6

pEnm+2UEEa4ABlyDU6mTAx2/1ynLnAzPEJv2V7ltV9dbF14KaJo3LcXM/6YSyMPA
LZHzIjq8Ug/zOxwLohnJO1B74PRZQ3+hBaIAeu6QrAT7bipUeExPvbvlrbWrVMZY
f5474opUXDvZAt3y3aOypO/UJkSLbCfgjTz9wLfT8Sk4in2NgpZq3+nlqusbxgaX
OUVVSFJn9fo0u1t73WZlCb8vgDto1iZcFB2EV2CtB3xBx15m8EojKRy4mgTw/j4/
shIkywQOMZrHGEM3mbyrHXTM3y2P4dSIkyDD1nf9UU1qdxMoLef0otxgPLt0E9IM
c8R0mvAKT/uiikwGEININqKUClYqaVn1vdnq6rs+W76Fxg9tt2OcuhWjsgXH4RFa
~~~

Now, let's decrypt the file (password is `hello`)

~~~
$ openssl rsautl -decrypt -inkey private.key -in note2_encrypted.txt -out note2.txt
Enter pass phrase for private.key:
$ cat note2.txt 
THM{ed9ccb6802c5d0f905ea747a310bba23}
~~~
