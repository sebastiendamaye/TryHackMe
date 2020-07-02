#!/usr/bin/env python
from pwn import *
import re

host, port = '10.10.104.157', 1337

context.log_level = 'warn'
s = remote(host, port)
s.recvuntil("Answer my questions 1000 times and I'll give you your gift.\n")

for i in range(1001):
	computation = s.recvline()

	r = re.search("\((\d+), '([\+\-\*\/])', (\d+)\)", computation.decode('utf-8'))

	n1 = int(r.group(1))
	op = r.group(2)
	n2 = int(r.group(3))

	if op == '+':
		n = n1 + n2
	elif op == '-':
		n = n1 - n2
	elif op == '*':
		n = n1 * n2
	else:
		n = n1 / n2

	print("[#{}] {}{}{}={}".format(i+1, n1, op, n2, n))

	s.sendline(str(n))

print(s.recvline().decode('utf-8'))
print(s.recvline().decode('utf-8'))
print(s.recvline().decode('utf-8'))

s.close()
