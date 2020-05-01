# Day 2 - Artic Forum

A big part of working at the best festival company is the social live! The elves have always loved interacting with everyone. Unfortunately, the christmas monster took down their main form of communication - the arctic forum! 

Elf McForum has been sobbing away McElferson's office. How could the monster take down the forum! In an attempt to make McElferson happy, she sends you to McForum's office to help. 

P.S. Challenge may a take up to 5 minutes to boot up and configure!

Access the page at `http://[your-ip-here]:3000`

Check out the supporting material [here](https://docs.google.com/document/d/1622ejYtCmLOS0zd16CyfhA1xgQk8l55gYWMY8fnpHfQ/edit?usp=sharing)!

 	
# What is the path of the hidden page?

dirsearch reveals the presence of a `/sysadmin` directory.

~~~
$ ./dirsearch.py -u http://10.10.248.154:3000 -w /data/src/wordlists/directory-list-2.3-medium.txt -e php,html

 _|. _ _  _  _  _ _|_    v0.3.9
(_||| _) (/_(_|| (_| )

Extensions: php, html | HTTP method: get | Threads: 10 | Wordlist size: 220521

Error Log: /data/src/dirsearch/logs/errors-20-05-01_14-14-37.log

Target: http://10.10.248.154:3000

[14:14:37] Starting: 
[14:14:38] 302 -   28B  - /  ->  /login
[14:14:38] 302 -   28B  - /home  ->  /login
[14:14:38] 200 -    2KB - /login
[14:14:41] 302 -   27B  - /admin  ->  /home
[14:14:41] 302 -   28B  - /Home  ->  /login
[14:14:41] 301 -  179B  - /assets  ->  /assets/
[14:14:45] 301 -  173B  - /css  ->  /css/
[14:14:49] 200 -    2KB - /Login
[14:14:50] 301 -  171B  - /js  ->  /js/
[14:14:54] 302 -   28B  - /logout  ->  /login
[14:15:26] 200 -    2KB - /sysadmin
~~~

# What is the password you found?

Browsing the `/sysadmin` page shows an authentication page similar to `/login`. Having a look at the source code of this page reveals an interesting information: `Admin portal created by arctic digital design - check out our github repo`:

~~~
$ curl -s http://10.10.248.154:3000/sysadmin | tail
                <label for="item">Password</label>
                <input type="password" class="form-control" id="password" name="password">
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>
    <!--
    Admin portal created by arctic digital design - check out our github repo
    -->
</html>
~~~

Let's check out on github: https://github.com/ashu-savani/arctic-digital-design.

And here is what the `readme.md` file reveals:

~~~
$ curl -s https://raw.githubusercontent.com/ashu-savani/arctic-digital-design/master/README.md
# Arctic Digital Design
arctic digital design used for advent of cyber

Previous versions of this software have been shipped out. The credentials to log in are:
* username: admin
* password: defaultpass

** the login portal accepts usernames instead of emails **
~~~

The default password is `defaultpass`.


# What do you have to take to the 'partay'

When we log in using `admin` and `defaultpass` respectively for the login and password, we are redirected to http://10.10.248.154:3000/admin where we can see the following text:

~~~
Prep for Christmas
Hey all - Please don't forget to BYOE(Bring Your Own Eggnog) for the partay!!
~~~

Answer: `Eggnog`