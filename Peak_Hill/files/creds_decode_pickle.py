#!/usr/bin/env python3

import pickle
import re

with open('creds.dat', 'rb') as f:
	data = pickle.load(f)
	sshuser = []
	sshpass = []

	for i in data:
		pos = int(re.findall('\d+', i[0])[0])
		if 'ssh_user' in i[0]:
			sshuser.append([pos, i[1]])
		else:
			sshpass.append([pos, i[1]])

	sshuser.sort()
	sshpass.sort()
	print("SSH user: {}".format(''.join([i[1] for i in sshuser])))
	print("SSH pass: {}".format(''.join([i[1] for i in sshpass])))