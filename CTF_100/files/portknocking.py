#!/usr/bin/env python3

from pwn import *
from itertools import permutations

host, port = '10.10.215.74', 9999
ports = [7177, 7994, 7885, 9932, 6612]
context.log_level = 'warn'

permutations_object = permutations(ports)
sequences = list(permutations_object)

for sequence in sequences:
	
	s = remote(host, port)

	s.recvline()
	s.recvline()
	s.recvline()
	s.recvline()
	s.recvline()

	seq = ' '.join([str(i) for i in sequence])
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
