# CTF collection Vol.1

## [Task 2] What does the base said? 02/01/2020
~~~
$ echo -n "VEhNe2p1NTdfZDNjMGQzXzdoM19iNDUzfQ==" | base64 -d
THM{ju57_d3c0d3_7h3_b453}
~~~

## [Task 3] Meta meta 02/01/2020

~~~
$ /data/src/exiftool-11.93/exiftool Findme.jpg 
ExifTool Version Number         : 11.93
File Name                       : Findme.jpg
Directory                       : .
File Size                       : 34 kB
File Modification Date/Time     : 2020:05:08 12:20:13+02:00
File Access Date/Time           : 2020:05:08 12:20:13+02:00
File Inode Change Date/Time     : 2020:05:08 12:20:42+02:00
File Permissions                : rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
X Resolution                    : 96
Y Resolution                    : 96
Exif Byte Order                 : Big-endian (Motorola, MM)
Resolution Unit                 : inches
Y Cb Cr Positioning             : Centered
Exif Version                    : 0231
Components Configuration        : Y, Cb, Cr, -
Flashpix Version                : 0100
Owner Name                      : THM{3x1f_0r_3x17}
Comment                         : CREATOR: gd-jpeg v1.0 (using IJG JPEG v62), quality = 60.
Image Width                     : 800
Image Height                    : 480
Encoding Process                : Progressive DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 800x480
Megapixels                      : 0.384
~~~

Owner name is `THM{3x1f_0r_3x17}`

## [Task 4] Mon, are we going to be okay? 02/01/2020

Submit the picture to https://futureboy.us/stegano/decode.pl.
~~~
It going to be over soon. Sleep my child.

THM{500n3r_0r_l473r_17_15_0ur_7urn}
~~~

## [Task 5] Erm......Magick 02/01/2020

Highligthing the text will reveal:

~~~
Huh, where is the flag? THM{wh173_fl46}
Did you find the flag?
~~~

## [Task 6] QRrrrr 02/01/2020

Upload the picture to https://zxing.org/w/decode.jspx.

~~~
THM{qr_m4k3_l1f3_345y}
~~~

## [Task 7] Reverse it or read it? 02/01/2020

Disassemble the binary in IDA Pro. Analyze the functions. There is a function called `skip` that will never be called but it contains the flag:

```asm
.text:0000000000001145                 public skip
.text:0000000000001145 skip            proc near
.text:0000000000001145                 push    rbp
.text:0000000000001146                 mov     rbp, rsp
.text:0000000000001149                 lea     rdi, format     ; "THM{345y_f1nd_345y_60}"
.text:0000000000001150                 mov     eax, 0
.text:0000000000001155                 call    _printf
.text:000000000000115A                 nop
.text:000000000000115B                 pop     rbp
.text:000000000000115C                 retn
.text:000000000000115C skip            endp
```
Answer: `THM{345y_f1nd_345y_60}`

## [Task 8] Another decoding stuff 02/01/2020

Can you decode it?
~~~
3agrSy1CewF9v8ukcSkPSYm3oKUoByUpKG4L
~~~

Use Cyberchef to find the right base

https://gchq.github.io/CyberChef/#recipe=From_Base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',true)&input=M2FnclN5MUNld0Y5djh1a2NTa1BTWW0zb0tVb0J5VXBLRzRM

Answer: `THM{17_h45_l3553r_l3773r5}`

## [Task 9] Left or right 02/01/2020
https://gchq.github.io/CyberChef/#recipe=ROT13(true,true,7)&input=TUFGe2F0YmVfbWF4X3Z0eGx0a30

~~~
THM{hail_the_caesar}
~~~

## [Task 10] Make a comment 02/01/2020

Right click > Inspect element.
~~~
<p style="display:none;"> THM{4lw4y5_ch3ck_7h3_c0m3mn7} </p>
~~~
## [Task 11] Can you fix it? 02/01/2020

Image is corrupted because it is missing the PNG header (`89 50 4E 47`):
~~~
$ xxd spoil.png |head
00000000: 2333 445f 0d0a 1a0a 0000 000d 4948 4452  #3D_........IHDR
00000010: 0000 0320 0000 0320 0806 0000 00db 7006  ... ... ......p.
00000020: 6800 0000 0173 5247 4200 aece 1ce9 0000  h....sRGB.......
00000030: 0009 7048 5973 0000 0ec4 0000 0ec4 0195  ..pHYs..........
00000040: 2b0e 1b00 0020 0049 4441 5478 9cec dd79  +.... .IDATx...y
00000050: 9c9c 559d eff1 cf79 9e5a bb7a 5f92 7477  ..U....y.Z.z_.tw
00000060: f640 4802 0920 1150 c420 bba2 88a8 805c  .@H.. .P. .....\
00000070: 1906 7c5d 64c0 79e9 752e 03ce 38e3 0e8e  ..|]d.y.u...8...
00000080: 2f75 e63a 23ea 8c0c e830 8e03 6470 c191  /u.:#....0..dp..
00000090: cd80 880c 4b20 0909 184c 42b6 4ed2 e9f4  ....K ...LB.N...
~~~

You can fix it as follows:
~~~
$ printf '\x89\x50\x4E\x47' | dd of=spoil.png bs=4 conv=notrunc
1+0 records in
1+0 records out
4 bytes copied, 0.000128356 s, 31.2 kB/s
$ xxd spoil.png |head
00000000: 8950 4e47 0d0a 1a0a 0000 000d 4948 4452  .PNG........IHDR
00000010: 0000 0320 0000 0320 0806 0000 00db 7006  ... ... ......p.
00000020: 6800 0000 0173 5247 4200 aece 1ce9 0000  h....sRGB.......
00000030: 0009 7048 5973 0000 0ec4 0000 0ec4 0195  ..pHYs..........
00000040: 2b0e 1b00 0020 0049 4441 5478 9cec dd79  +.... .IDATx...y
00000050: 9c9c 559d eff1 cf79 9e5a bb7a 5f92 7477  ..U....y.Z.z_.tw
00000060: f640 4802 0920 1150 c420 bba2 88a8 805c  .@H.. .P. .....\
00000070: 1906 7c5d 64c0 79e9 752e 03ce 38e3 0e8e  ..|]d.y.u...8...
00000080: 2f75 e63a 23ea 8c0c e830 8e03 6470 c191  /u.:#....0..dp..
00000090: cd80 880c 4b20 0909 184c 42b6 4ed2 e9f4  ....K ...LB.N...
~~~

The image is now valid and the flag is:
~~~
THM{y35_w3_c4n}
~~~

## [Task 12] Read it 02/01/2020

https://www.reddit.com/r/tryhackme/comments/eizxaq/new_room_coming_soon/
~~~
THM{50c14l_4cc0un7_15_p4r7_0f_051n7}
~~~

## [Task 13] Spin my head 02/01/2020

https://www.splitbrain.org/_static/ook/
~~~
THM{0h_my_h34d}
~~~


## [Task 14] An exclusive! 02/01/2020

```python
$ python
>>> s1 = "44585d6b2368737c65252166234f20626d"
>>> s2 = "1010101010101010101010101010101010"
>>> h = hex(int(s1, 16) ^ int(s2, 16))[2:]
>>> bytes.fromhex(h).decode('utf-8')
THM{3xclu51v3_0r}
```

## [Task 15] Binary walk 03/01/2020

~~~
$ binwalk -e hell.jpg 

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             JPEG image data, JFIF standard 1.02
30            0x1E            TIFF image data, big-endian, offset of first image directory: 8
265845        0x40E75         Zip archive data, at least v2.0 to extract, uncompressed size: 69, name: hello_there.txt
266099        0x40F73         End of Zip archive, footer length: 22
 cat _hell.jpg.extracted/hello_there.txt 
Thank you for extracting me, you are the best!

THM{y0u_w4lk_m3_0u7}
~~~

## [Task 16] Darkness 03/01/2020

Open file in Stegsolve.jar and browse the plugins. With "Blue plane 1", the flag is decoded:

~~~
THM{7h3r3_15_h0p3_1n_7h3_d4rkn355}
~~~

## [Task 17] A sounding QR 03/01/2020

Upload the QR code to https://zxing.org/w/decode. It decodes as:
~~~
https://soundcloud.com/user-86667759/thm-ctf-vol1
~~~

Use text2speech service (https://speech-to-text-demo.ng.bluemix.net/).
~~~
Speaker 0:
    The flag is S. O. U. N. D.. 
Speaker 1:
    I.. 
Speaker 0:
    N. G. Q.. 
Speaker 2:
    R.. 
~~~

Answer: `THM{SOUNDINGQR}`

## [Task 18] Dig up the past 03/01/2020

Use wayback (https://web.archive.org/web/20200102131252/https://www.embeddedhacker.com/) to load the snapshot on Jan 2, 2020. Then search for string `THM{` on the page:

~~~
What did you just say? flag? THM{ch3ck_th3_h4ckb4ck} 
~~~


## [Task 19] Uncrackable! 03/01/2020

Load `MYKAHODTQ{RVG_YVGGK_FAL_WXF}` in CyberChef (https://gchq.github.io/CyberChef/#recipe=Vigen%C3%A8re_Decode('TRYHACKME')&input=TVlLQUhPRFRRe1JWR19ZVkdHS19GQUxfV1hGfQ) with Vigenere (key=TRYHACKME). Output is `THMTHMTHM{YEI_RVEWY_BHU_YQF}`

Now change the key to `THMTHMTHM`. Output: `TRYHACKME{YOU_FOUND_THE_KEY}`

## [Task 20] Small bases 03/01/2020

```python
$ python
>>> n = 581695969015253365094191591547859387620042736036246486373595515576333693
>>> h = hex(n)[2:]
>>> bytearray.fromhex(h).decode()
'THM{17_ju57_4n_0rd1n4ry_b4535}'
```

## [Task 21] Read the packet 

~~~
GET /flag.txt HTTP/1.1
Host: 192.168.247.140
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Upgrade-Insecure-Requests: 1
If-Modified-Since: Fri, 03 Jan 2020 04:36:45 GMT
If-None-Match: "e1bb7-15-59b34db67925a"
Cache-Control: max-age=0

HTTP/1.1 200 OK
Date: Fri, 03 Jan 2020 04:43:14 GMT
Server: Apache/2.2.22 (Ubuntu)
Last-Modified: Fri, 03 Jan 2020 04:42:12 GMT
ETag: "e1bb7-20-59b34eee33e0c"
Accept-Ranges: bytes
Vary: Accept-Encoding
Content-Encoding: gzip
Content-Length: 52
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: text/plain

THM{d0_n07_574lk_m3}

Found me!
~~~