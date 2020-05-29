#!/usr/bin/env python3

from pwn import *
import re

host, port = '10.10.212.86', 3404
context.log_level = 'warn'

s = remote(host, port)
s.recvline()

while True:

	op = s.recvline()
	op = op.decode('utf-8')
	
	#print("challenge: {}".format(op))
	if 'flag' in op:
		print(op)
		print(s.recvline())
		print(s.recvline())
		break

	reop = re.search('^(\d+)\s(minus|add|multiply)\s(\d+)\\n$', op, re.IGNORECASE)
	n1 = int(reop.group(1))
	sgn = reop.group(2)
	n2 = int(reop.group(3))
    
	if sgn == 'add':
		res = n1 + n2
	elif sgn == 'minus':
		res = n1 - n2
	else:
		res = n1 * n2

	#print("response: {}".format(res))
	s.sendline(str(res))

s.close()
