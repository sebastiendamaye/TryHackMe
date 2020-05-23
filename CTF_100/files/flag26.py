#!/usr/bin/env python3

import sys

if len(sys.argv) < 3:
	print("Usage: python3 {} key encoded".format(sys.argv[0]))
	print("Example: python3 {} '{}' '{}'".format(
		sys.argv[0], '264315', 'zf7b75uung8afcyfj3t2'))
	sys.exit(1)

key = sys.argv[1]
enc = sys.argv[2].replace(' ', '')

# split encoded string into chunks of key length (last chunk may be truncated)
enc_chunk = [enc[i:i+len(key)] for i in range(0, len(enc), len(key))]


def pos_list(key, chunk):
	# make pos order list (only keeps value < chunk length)
	tmp = []
	i = 0
	for k in key:
		if(int(k)<=len(chunk)):
			tmp.append((int(k), i))
			i+=1

	tmp.sort()
	pos_order = [i[1] for i in tmp]
	return pos_order

dec = ""
for chunk in enc_chunk:
	pos_order = pos_list(key, chunk)
	for pos in pos_order:		
		dec += chunk[pos]

print(dec)
