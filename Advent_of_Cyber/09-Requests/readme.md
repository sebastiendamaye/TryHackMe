# [Day 9] Requests

## Description

﻿McSkidy has been going keeping inventory of all the infrastructure but he finds a random web server running on port 3000. All he receives when accessing `/` is
~~~
{"value":"s","next":"f"}
~~~

McSkidy needs to access the next page at `/f` (which is the value received from the data above) and keep track of the value at each step (in this case `s`). McSkidy needs to do this until the `value` and `next` data have the value equal to `end`.

You can access the machines at the following IP: `10.10.169.100`

Things to note about this challenge:

* The JSON object retrieved will need to be converted from unicode to ASCII(as shown in the supporting material)
* All the values retrieved until the 'end' will be the flag(end is not included in the flag)

Check out the supporting material [here](https://docs.google.com/document/d/1FyAnxlQpzh0Cy17cKLsUZYCYqUA3eHu2hm0snilaPL0/edit?usp=sharing).

## #1 - What is the value of the flag?

Let's write the following python code:

```python
#!/usr/bin/env python3
import requests

url = 'http://10.10.169.100:3000'

flag = ''
v, n = '', ''

while v != 'end' and n != 'end':
	r = requests.get('%s/%s' % (url, n))
	j = r.json()
	v, n = j['value'], j['next']
	flag += v

print(flag[:-3])
```

Answer: `sCrIPtKiDd`