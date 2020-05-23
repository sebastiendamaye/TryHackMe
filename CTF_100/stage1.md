# CTF 100

Capture all 100 flags and be the lord of CTF.

# [Task 1] Stage 1

Deploy the machine and start capturing the flag. This is part of the CTF 100 series. At the end of the series, you should able to capture all 100 flags.

Here are some of the tips:

1. You are going to use a network scanning tool (Nmap) quite often. Just do a fast scan with ping skip (nmap -Pn -p- -v -T5).
2. Submit decrypted answer via telnet to get the flag
3. Stay calm and have fun

Refer to the hints if you are stuck or DM me in my discord channel if you are really stuck. Once again, good luck with the challenge. 

**Extra note (9/10/2019): The decoded/decrypted text is not the actual flag. You are required to submit the text after '>' via telnet or any relevant program.**

P/S: If you are tired of Nmap scan, here are the hints

* Part 1: 3333.
* Part 2: 4 digits, starts with 3. (Flag 2 - 6)
* Part 3: 4 digits, starts with 4. (Flag 7 - 12)
* Part 4: 4 digits, starts with 6. (Flag 13 - 18)

Note: ~~Stage 2 challenge will be released on 13/10/2019, UTC time~~. Stage 2 is available now.

Extra note (15/12/2019) [Click and download the OVA](https://drive.google.com/open?id=1Z2eJtsLQXPFf1jzzopcsr1qmSLX5nThR)

## #1 - Flag 1

*Hint: IP addr*

~~~
$ nmap  -Pn 172.16.222.132
Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-22 21:42 CEST
Nmap scan report for 172.16.222.132
Host is up (0.0014s latency).
Not shown: 998 filtered ports
PORT     STATE SERVICE
3333/tcp open  dec-notes
9999/tcp open  abyss

Nmap done: 1 IP address (1 host up) scanned in 13.86 seconds
~~~

~~~
$ nc 172.16.222.132 3333
***************************
*   100 Flags challenge   *
***************************
Welcome to the THM point grabbing challenge!
The task is simple, find the flag and get the point
It can be hard or easy, IDK
To start the challenge, I need your address. So that I can send it to you.
> 172.16.222.1
Well done! Please take your first flag
flag 1: you_got_a_message
5 open ports is now opened for you! Hint: 4 digits and start with 3
Good luck!
^C
~~~

Now, we have new ports:

~~~
$ nmap -Pn -p- -v -T5 172.16.222.132
PORT     STATE SERVICE
3333/tcp open  dec-notes
3343/tcp open  ms-cluster-net
3353/tcp open  fatpipe
3363/tcp open  nati-vi-server
3373/tcp open  lavenir-lm
3383/tcp open  esp-lm
9999/tcp open  abyss
~~~

Flag 1: `you_got_a_message`

## #2 - Flag 2

*Hint: You are require to submit the text in order to get the flag. Follow the question format*

Decode with ROT13:

~~~
$ nc 172.16.222.132 3343
Flag 2 challenge
Crack the following code
Guvf_vf_prnfre_pvcure
> This_is_ceaser_cipher

Good job!
flag 2: qt8pm59jh5r49uqdwfw2
Just some numbering: 8989
~~~

Flag 2: `qt8pm59jh5r49uqdwfw2`

## #3 - Flag 3

*Hint: Another Rot cipher*

Ceasar with offset of 10:

~~~
$ nc 172.16.222.132 3353
Flag 3 challenge
Crack the following code
Kxydrob_mokcob_mszrob
> Another_ceaser_cipher

Good job!
flag 3: 5wdtc7jzk33qjauh5gxm
Just some numbering: 7431
~~~

Flag 3: `5wdtc7jzk33qjauh5gxm`

## #4 - Flag 4

*Hint: A statement or a question*

~~~
$ nc 172.16.222.132 3363
Flag 4 challenge
Crack the following code
where is the key
Ez_me_jnvrk_sb_fslv_afij
>
~~~

Use the [https://www.guballa.de/vigenere-solver following site] to brute force Vigenere. It found the key "wnere" and the decrypted code:

~~~
Im_in_frint_of_sour_eses
~~~

Trying with the key "where":

~~~
Is_in_front_of_your_eyes
~~~

will unlock the flag:
~~~
Good job!
flag 4: sm8jvu8jxu7dz6s7qmsp
Just some numbering: 5667
~~~

Flag 4: `sm8jvu8jxu7dz6s7qmsp`

## #5 - Flag 5

*Hint: Submit the text in upper cases and what does '/' represent*

~~~
$ nc 172.16.222.132 3373
Flag 5 challenge
Crack the following code
-- --- .-. ... . / -.-. --- -.. . / -... . . .--. / -... --- --- .--.
> 
~~~

Looks like MORSE code:

~~~
MORSE CODE BEEP BOOP
~~~

Flag unlocked:

~~~
Good job!
flag 5: 2p3363hrava9fbq296ca
Just some numbering: 9332
~~~

Flag 5: `2p3363hrava9fbq296ca`

## #6 - Flag 6

~~~
$ nc 172.16.222.132 3383
Flag 6 challenge
Crack the following code
59 6f 75 20 67 65 74 20 68 65 78 2d 65 64
~~~

Decodes as: `You get hex-ed`

Unlocked flag:

~~~
Good job!
flag 6: skuj9359mqdm6sv8d8z6
Just some numbering: 3331
~~~

Flag 6: `skuj9359mqdm6sv8d8z6`

## #7 - Flag 7

*Hint: Collect 5 numbers and access to the port 9999. The order: numbering 1,2,3,4,5*

~~~
$ nc 172.16.222.132 9999
***************************
*   Port knocking input   *
***************************
Hi user, please enter the port sequence
The format is (can be more than 4): PORT PORT PORT PORT
> 8989 7431 5667 9332 3331
Something happen
Good luck!
~~~

New nmap scan discovers new port: `4000`

~~~
PORT     STATE SERVICE
3333/tcp open  dec-notes
3343/tcp open  ms-cluster-net
3353/tcp open  fatpipe
3363/tcp open  nati-vi-server
3373/tcp open  lavenir-lm
3383/tcp open  esp-lm
4000/tcp open  remoteanything
9999/tcp open  abyss
~~~

~~~
$ nc 172.16.222.132 4000
Congratulation! You have captured all the flag
Please go home, nothing to see here
Type 'exit' and leave this place
exit
^C
~~~

Weird, nothing happened. Let's try again. Ah, the message is different, press `ENTER`.

~~~
$ nc 172.16.222.132 4000
Congratulation! You have captured all the flag
Please go home, nothing to see here
Type 'exit' and leave this place
WHY are you here? Leave

Seriously? Nothing to see here!
GET LOST!

Please I beg you, LEAVE!

Oh my fking god, take it, JUST TAKE IT
flag 7: zmht7gg3q3ft7cmc942n
Please leave, thank you

PORT PORT PORT PORT PORT
8989 7431 5667 9332 3331

Ncat: Broken pipe.
~~~

Flag 7: flag 7: `zmht7gg3q3ft7cmc942n`

## #8 - Flag 8

Now, new ports:

~~~
PORT     STATE SERVICE
3333/tcp open  dec-notes
3343/tcp open  ms-cluster-net
3353/tcp open  fatpipe
3363/tcp open  nati-vi-server
3373/tcp open  lavenir-lm
3383/tcp open  esp-lm
4000/tcp open  remoteanything
4001/tcp open  newoak
4002/tcp open  mlchat-proxy
4003/tcp open  pxc-splr-ft
4004/tcp open  pxc-roid
4005/tcp open  pxc-pin
9999/tcp open  abyss
~~~

Base64 decode:

~~~
$ nc 172.16.222.132 4001
Flag 8 challenge
Crack the following code
QSBjb21tb24gYmFzZQ==
> A common base

Good job!
flag 8: dmm32qvfkfwm6yjnw46k
Same old stuff: 10113
~~~

Flag 8: `dmm32qvfkfwm6yjnw46k`

## #9 - Flag 9

Base32:

~~~
$ nc 172.16.222.132 4002
Flag 9 challenge
Crack the following code
KRUGS4ZANFZSAYJAONWWC3DMMVZCAYTBONSQ====
> This is a smaller base

Good job!
flag 9: fuf8mx74nph26f69mr97
Same old stuff: 10415
~~~

Flag 9: `fuf8mx74nph26f69mr97`

## #10 - Flag 10

Base58:

~~~
$ nc 172.16.222.132 4003
Flag 10 challenge
Crack the following code
4UFrmghikrDhdg9avkV9avpg4uHQmhvUf7GgRoCo
> Look like a brother to base64

Good job!
flag 10: hud9bm8yc37md5b7t7mn
Same old stuff: 21033
~~~

Flag 10: `hud9bm8yc37md5b7t7mn`

## #11 - Flag 11

*Hint: A higher base number. Base8x*

Base85:

~~~
$ nc 172.16.222.132 4004
Flag 11 challenge
Crack the following code
9lG&`+@/pn8P(%7BOPpi@ru:&
> More ASCII character

Good job!
flag 11: 4xm43r2wajrsrbm4775d
Same old stuff: 35555
~~~

Flag 11: `4xm43r2wajrsrbm4775d`

## #12 - Flag 12

*Hint: Another base number. Base9x*

Base91 (https://www.dcode.fr/code-base-91):

~~~
$ nc 172.16.222.132 4005
Flag 12 challenge
Crack the following code
Erzg,W]@7RqSkb9jPD<:vz3B
> More and More ASCII

Good job!
flag 12: qtfvbd7gbvyg9gww5jwj
Same old stuff: 25637
~~~

Flag 12: `qtfvbd7gbvyg9gww5jwj`

## #13 - Flag 13

*Hint: Reverse the order? Perhaps?*

~~~
 nc 172.16.222.132 9999
***************************
*   Port knocking input   *
***************************
Hi user, please enter the port sequence
The format is (can be more than 4): PORT PORT PORT PORT
> 10113 10415 21033 35555 25637
Wrong sequence
Bye!
^C
~~~

Let's try to inverse the sequence as suggested by the hint:

~~~
$ nc 172.16.222.132 9999
***************************
*   Port knocking input   *
***************************
Hi user, please enter the port sequence
The format is (can be more than 4): PORT PORT PORT PORT
> 25637 35555 21033 10415 10113
Something happen
Good luck!
~~~

New Nmap scan, new port: `6000`

~~~
PORT     STATE SERVICE
3333/tcp open  dec-notes
3343/tcp open  ms-cluster-net
3353/tcp open  fatpipe
3363/tcp open  nati-vi-server
3373/tcp open  lavenir-lm
3383/tcp open  esp-lm
4000/tcp open  remoteanything
4001/tcp open  newoak
4002/tcp open  mlchat-proxy
4003/tcp open  pxc-splr-ft
4004/tcp open  pxc-roid
4005/tcp open  pxc-pin
6000/tcp open  X11
9999/tcp open  abyss
~~~

~~~
$ nc 172.16.222.132 6000
Congratulation on getting this far
You are a worthy challenger
5 more gates are opened for you
Take this as your reward
flag 13: aehg24vwn5yyc8jz4tv5
~~~

New ports:
~~~
PORT     STATE  SERVICE
6000/tcp closed X11
6010/tcp open   x11
6020/tcp open   x11
6030/tcp open   x11
6040/tcp open   x11
6050/tcp open   arcserve
~~~

Flag 13: `aehg24vwn5yyc8jz4tv5`

## #14 - Flag 14

Googling for "decode pikachu" leads to https://www.dcode.fr/langage-pikalang

~~~
$ nc 172.16.222.132 6010
Flag 14 challenge
Crack the following code
pi pi pi pi pi pi pi pi pi pi pika pipi pi pipi pi pi pi pipi pi pi pi pi pi pi pi pipi pi pi pi pi pi pi pi pi pi pi pichu pichu pichu pichu ka chu pipi pipi pipi pi pi pi pi pi pi pi pi pi pi pikachu pipi pi pi pi pi pi pikachu pi pi pikachu ka ka ka ka ka ka ka ka ka ka pikachu pi pi pikachu pi pi pi pi pi pikachu pi pi pi pi pi pi pi pi pi pi pi pi pi pikachu pichu pichu pi pi pikachu pipi pipi ka ka ka ka ka ka ka ka ka ka ka ka pikachu pi pi pi pi pi pi pi pi pi pi pikachu pichu pichu pikachu pipi pi pi pi pi pi pi pi pi pi pi pi pi pi pi pi pi pi pikachu pichu pikachu pipi pipi pi pikachu pi pi pi pi pi pikachu ka ka ka ka ka ka ka ka ka pikachu pichu pi pi pi pi pikachu pichu pikachu pipi pipi ka pikachu pichu pi pikachu pichu pikachu pipi ka pikachu pipi ka ka ka pikachu pichu pikachu ka ka pikachu pipi pi pi pi pi pi pi pi pi pikachu ka ka pikachu pichu pi pi pi pi pi pi pikachu ka ka ka ka ka ka pikachu pichu pikachu pipi pipi ka ka pikachu ka pikachu ka ka ka ka pikachu pichu pi pi pikachu pipi pi pi pikachu pi pi pikachu ka pikachu
> Pikachu is a type of electric pokemon


Good job!
flag 14: k2phhw85emq3v4njj5g6
You know the drill: 31031
~~~

Flag 14: `k2phhw85emq3v4njj5g6`

## #15 - Flag 15

*Hint: esolang*

BinaryFuck decode (https://www.dcode.fr/binaryfuck-language)

~~~
$ nc 172.16.222.132 6020
Flag 15 challenge
Crack the following code
000000000000000000000000000000110010000010000000000010000000000000000000000010000000000000000000000000000000011011011011001111010010010000000000000000000000000000000000000000000100010000000000000100000100000000000000000000000000000000100011011000000100010010001001001001001001001001001001100000000000000000000000000000000100011011100010010001001001001001100000100000000000000000100011011100010000000000000000000000000000000000000000100011100010000100000000000000000000000100000000000000000100001001001001001001001001001001001001001100010001001100000000000000000000000100
> This is not a binary

Good job!
flag 15: qtfvbd7gbvyg9gww5jwj
You know the drill: 50010
~~~

Flag 15: `qtfvbd7gbvyg9gww5jwj`

## #16 - Flag 16

*Hint: cutlery*

Spoon language: https://www.dcode.fr/langage-spoon

~~~
$ nc 172.16.222.132 6030
Flag 16 challenge
Crack the following code
111111111100100010101011101011111110101111111111011011011011000001101001001000101001011111111111001010111001010000000000000000000000001010011011110010100100100000000000000000000000000000000010101111111111111001010000000000000000000000000000000001010011011001010010010111111111111111001010000000000001010000001010001010000001010
> Fork and spoon

Good job!
flag 16: ckjug6sj88xuajfku72h
You know the drill: 7968
~~~

Flag 16: `ckjug6sj88xuajfku72h`

## #17 - Flag 17

*Hint: Brainfuck is too mainstream. I need something special.*

Reversefuck: https://www.dcode.fr/langage-reversefuck

~~~
$ nc 172.16.222.132 6040
Flag 17 challenge
Crack the following code
----------]<-<---<-------<---------->>>>+[<<<------------,<-,-----------------,+++++++++++++++++,-------------,-,++++++++++++++,>>--,<<----------,+++++++++,>>,<<++++,----------------,>---------------,--------,<++++,>+++,<-------,>+++,--------,
> Reverse of brainfuck

Good job!
flag 17: x4xhrqx3ywzyx2jmgc5j
You know the drill: 20010
~~~

Flag 17: `x4xhrqx3ywzyx2jmgc5j`

## #18 - Flag 18

*Hint: Alp what?*

Alphuck: https://www.dcode.fr/langage-alphuck

~~~
$ nc 172.16.222.132 6050
Flag 18 challenge
Crack the following code
eeeeeeeeeepaeaeeeaeeeeeeeaeeeeeeeeeeccccisaaaeeeejaeeeeeeeeeeeeeeeeejiijejcceejaaiiiiiiiijiiijeejiiiiiijccjaaeeeeeeeeeeeeeeejiiiiiiiiiiiijiiijccjaaiiijeeeeeeeeeeeeeeeejiiiiiiiiiiiiiiiiijeeeeeeeejeeeeejiiiiiiiijeeeeeeeeeeeeeeejiiiiiiiiiiiiiiiiiijeeeeeeeej
> Just like the brainfuck

Good job!
flag 18: kr2t9qcgt4ht9h6j5ydp
You know the drill: 6100
~~~

Flag 18: `kr2t9qcgt4ht9h6j5ydp`

## #19 - Port to stage 2 (Format: PORT PORT PORT PORT PORT)

Answer: `31031 50010 7968 20010 6100`
