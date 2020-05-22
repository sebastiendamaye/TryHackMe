#!/usr/bin/env python3

import jwt


header = '{"alg":"HS256","typ":"JWT"}'
payload = '{"id":1337,"username":"admin","hint":"the flag is FLAG{xxxxxxx_d1ct10n4ry_4tt4ck} where xxxxxxx is the password used to sign this token"}'
signature = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMzNywidXNlcm5hbWUiOiJhZG1pbiIsImhpbnQiOiJ0aGUgZmxhZyBpcyBGTEFHe3h4eHh4eHhfZDFjdDEwbjRyeV80dHQ0Y2t9IHdoZXJlIHh4eHh4eHggaXMgdGhlIHBhc3N3b3JkIHVzZWQgdG8gc2lnbiB0aGlzIHRva2VuIn0.dWwXygXbxXud7WVBBVNwBZwUXjsxUhwMmN8rFnRyVgE'


encoded_jwt = jwt.encode({'some': 'payload'}, 'secret', algorithm='HS256')

jwt.decode(encoded_jwt, 'secret', algorithms=['HS256'])
{'some': 'payload'}

