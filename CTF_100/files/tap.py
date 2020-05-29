#!/usr/bin/env python3

import numpy as np

message = "... .  ..... ...  ..... .....  ... ..  .... ..  . .....  .... .."
message+= "  . ...  .... .  ... ....  .... .  .... ....  . ..  . ....."
message+= "  .... ..  ..... ..  ..... ....  . .....  ..... .....  ..... ."

for rm_letter in range(65, 91):

	decoded = ''

	a = [chr(i) for i in range(65,91) if i!=rm_letter]
	alphabet = np.array(a).reshape(-1, 5)

	message_array = message.split('  ')
	for m in message_array:
		m1, m2 = m.split(' ')
		decoded += alphabet[len(m1)-1][len(m2)-1]

	print("(-{}) {}".format(chr(rm_letter), decoded))
