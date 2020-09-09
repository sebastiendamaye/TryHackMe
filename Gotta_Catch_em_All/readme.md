**Gotta Catch'em All!**

This room is based on the original Pokemon series. Can you obtain all the Pokemon in this room?


# Find the Grass-Type Pokemon

*Hint: Colors are beautiful!*

## Services enumeration

Nmap reveals the presence of a SSH service and a web server:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 58:14:75:69:1e:a9:59:5f:b2:3a:69:1c:6c:78:5c:27 (RSA)
|   256 23:f5:fb:e7:57:c2:a5:3e:c2:26:29:0e:74:db:37:c2 (ECDSA)
|_  256 f1:9b:b5:8a:b9:29:aa:b6:aa:a2:52:4a:6e:65:95:c5 (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Can You Find Them All?
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Source code of main web page

The source code of the main page contains an invalid set of tags: `<pokemon>` and `<hack_the_pokemon>`:

~~~
$ curl -s http://10.10.1.173 | tail
          </p>
        </div>
        <pokemon>:<hack_the_pokemon>
        	<!--(Check console for extra surprise!)-->
      </div>
    </div>
    <div class="validator">
    </div>
  </body>
</html>
~~~

Without the tags sign, it looks like credentials: `pokemon:hack_the_pokemon`.

## SSH

It is confirmed that these are valid credentials to connect against the SSH service. Once connected, a quick enumeration of the `home` folder reveals the presence of a zip archive:

~~~
pokemon@root:~$ cd Desktop/
pokemon@root:~/Desktop$ ls -la
total 12
drwxr-xr-x  2 pokemon pokemon 4096 Jun 24 14:58 .
drwxr-xr-x 19 pokemon pokemon 4096 Sep  9 01:23 ..
-rw-rw-r--  1 pokemon pokemon  383 Jun 22 22:40 P0kEmOn.zip
pokemon@root:~/Desktop$ unzip P0kEmOn.zip 
Archive:  P0kEmOn.zip
   creating: P0kEmOn/
  inflating: P0kEmOn/grass-type.txt  
pokemon@root:~/Desktop$ cat P0kEmOn/grass-type.txt 
50 6f 4b 65 4d 6f 4e 7b 42 75 6c 62 61 73 61 75 72 7d
~~~

## Grass-Type Pokemon

The string is a serie of hex characters that we can easily decode:

~~~
pokemon@root:~/Desktop$ cat P0kEmOn/grass-type.txt | xxd -r -p
PoKeMoN{Bulbasaur} 
~~~

Answer: `PoKeMoN{Bulbasaur}`


# Find the Water-Type Pokemon

## Lateral move (pokemon -> ash)

*Hint: Maybe the website has an answer?*

Further enumerating the `home` folder reveals the presence of another file, which is the source code of a basic C++ program. It reveals other credentials (`ash:pikapika`):

~~~
pokemon@root:~/Videos/Gotta/Catch/Them/ALL!$ cat Could_this_be_what_Im_looking_for\?.cplusplus 
# include <iostream>

int main() {
	std::cout << "ash : pikapika"
	return 0;
}
~~~

Let's switch user:

~~~
pokemon@root:/home$ su ash
Password: 
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

bash: /home/ash/.bashrc: Permission denied
ash@root:/home$ 
~~~

## Lateral move (ash -> root)

Unfortunately, ash's home folder is only accessible by root, but checking our privileges reveals that we can elevate to `root`.

~~~
ash@root:/home$ sudo -l
[sudo] password for ash: 
Matching Defaults entries for ash on root:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User ash may run the following commands on root:
    (ALL : ALL) ALL
~~~

Let's elevate to `root`:

~~~
ash@root:/home$ sudo -s
root@root:/home# id
uid=0(root) gid=0(root) groups=0(root)
~~~

## Water-Type pokemon

The water-type pokemon is located in the `/var/www/html` directory:

~~~
root@root:/var/www/html# cat water-type.txt 
Ecgudfxq_EcGmP{Ecgudfxq}
~~~

Once again, it is encoded, this time using the Caesar cipher with an offset of 12 (you can also use this [link](https://www.dcode.fr/chiffre-cesar)):

~~~
root@root:/var/www/html# cat water-type.txt | tr 'A-Za-z' 'O-ZA-No-za-n'
Squirtle_SqUaD{Squirtle}
~~~

Answer: `Squirtle_SqUaD{Squirtle}`


# Find the Fire-Type Pokemon

After some unsuccessful basic manual enumeration of the filesystem, I tried to search for files containing the string `fire`, and found an interesting file:

~~~
root@root:/root# find / -type f -name "*fire*" 2>/dev/null
[REDACTED]
/etc/why_am_i_here?/fire-type.txt
[REDACTED]
~~~

The string is encoded in base64:

~~~
root@root:/root# cat /etc/why_am_i_here?/fire-type.txt
UDBrM20wbntDaGFybWFuZGVyfQ==
root@root:/root# cat /etc/why_am_i_here?/fire-type.txt | base64 -d
P0k3m0n{Charmander}
~~~

Answer: `P0k3m0n{Charmander}`

# Who is Root's Favorite Pokemon?

At the root of the `/home` folder, there is a file that reveals the root's favorite pokemon:

~~~
root@root:/home# cat roots-pokemon.txt 
Pikachu!root
~~~

Answer: `Pikachu!`
