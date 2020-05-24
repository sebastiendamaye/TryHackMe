#!/usr/bin/env python3

import sys
import base64

if len(sys.argv) < 2:
	print("Usage: {} <file.b64.txt>".format(sys.argv[0]))
	sys.exit(1)

data = open(sys.argv[1], "r").read()

while True:
	try:
		data = base64.b64decode(data)
	except:
		break

print(data)
