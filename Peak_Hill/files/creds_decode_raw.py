#!/usr/bin/env python3

with open('creds_decoded.txt', 'w') as credsout, open('creds.txt', 'r') as credsin:
	r = credsin.read()
	# chunks of 8
	b = ' '.join([r[i:i+8] for i in range(0, len(r), 8)])
	# decode
	credsout.write(''.join([chr(int(c, 2)) for c in b.split(' ')]))
