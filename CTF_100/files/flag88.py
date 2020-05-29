#!/usr/bin/env python3
import re

encoded = [31, 53, 55, 32, 42, 15, 42, 13, 41, 34, 41, 44, 12, 15, 42, 52, 54, 15, 55, 51]

for i in range(255):
	decoded = ''.join([chr(b+i) for b in encoded])
	if re.match('^[a-zA-Z0-9]{20}$', decoded):
		print(decoded)