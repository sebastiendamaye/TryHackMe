#!/usr/bin/env python3

keys = [
	[0, ' '],
	[1, False],
	[2, 'abc'],
	[3, 'def'],
	[4, 'ghi'],
	[5, 'jkl'],
	[6, 'mno'],
	[7, 'pqrs'],
	[8, 'tuv'],
	[9, 'wxyz']
	]

seq = "333 555 2 4 0 8 9 33 66 8 999 66 444 66 33 0 444 7777 0 9 7777 7 2 6 9 777 "
seq+= "9999 44 66 222 44 777 9 777 99 33 88 5 44 0 66 33 99 8 0 7 666 777 8 0 444 "
seq+= "7777 0 8 44 777 33 33 0 666 66 33 0 8 44 777 33 33 0 8 44 777 33 33 0 9999 "
seq+= "33 777 666"

dec = []

for s in seq.split(' '):
	dec.append(keys[int(s[0])][1][len(s)-1])

print(''.join(dec))