#!/usr/bin/env python3

from pwn import *
from base64 import b64decode

host, port = '10.10.212.86', 3338
context.log_level = 'warn'

s = remote(host, port)
s.recvline()

while True:

	b64enc = s.recvline()
	b64enc = b64enc.decode('utf-8')

	#print("challenge: {}".format(b64enc))
	if 'flag' in b64enc:
		print(b64enc)
		# get the FTP user
		print(s.recvline())
		print(s.recvline())
		break

	b64dec = b64decode(b64enc)
	s.sendline(b64dec)
	#print("response: {}".format(b64dec))

s.close()
