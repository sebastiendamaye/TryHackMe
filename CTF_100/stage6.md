# [Task 6] Stage 6

Stage 6 is now ready to be root. Deploy the machine and start capturing the flag. Please terminate the previous VM before deploying a new one. The theme for this stage is Linux.

**Prerequisite: Complete stage 5 and obtain the port sequence. Use the sequence to activate the ports in the port 9999**

Here are some of the tips:

1. You are going to need a network scanning tool (Nmap). Just do a fast scan with ping skip (nmap -Pn -p- -v -T5).
2. Some Linux activity: Check the file permission, scheduler, find a file, get attribute and sudo 
3. Stay calm and have fun

Refer to the hints if you are stuck or DM me in my discord channel if you are really stuck. Once again, good luck with the challenge. 

Note: ~~A new path will be revealed if the chosen one managed to solve all 80 flags. Are you the chosen one?~~ A new path has been revealed

# #1 - Flag 72

*Hint: Permission*

Let's start by unlocking the ports with the sequence found at stage 5 (notice that the order was TB/PI/TW, as told in the AES decrypted message)

~~~
$ nc 10.10.241.97 9999
***************************
*   Port knocking input   *
***************************
Hi user, please enter the port sequence
The format is (can be more than 4): PORT PORT PORT PORT
> 39914 28817 44414
Something happen
Good luck!
~~~

The Nmap scan reveals that port 22 is now open:

~~~
PORT     STATE SERVICE
22/tcp   open  ssh
9999/tcp open  abyss
~~~


# #2 - Flag 73

*Hint: Is an illusion*

# #3 - Flag 74

*Hint: file attribute*

# #4 - Flag 75

*Hint: Search the file*

# #5 - Flag 76

*Hint: Pull the password from another user*

# #6 - Flag 77


# #7 - Flag 78

*Hint: Find the vim password. It is a 'game'*

# #8 - Flag 79


# #9 - Flag 80

