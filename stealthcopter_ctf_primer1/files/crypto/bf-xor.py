#!/usr/bin/env python3
import pwn
a = """\HWPG^DCXETEHAT^WT_RCHAEX^_XBI^CX_V;XEBEYTSTBE;B^BTRDCT;;w}pvJI^CnXBnBDATCnBTRDCTL;w}pvJI^CnXBnBDATCnBTRDCTL;w}pvJI^CnXBnBDATCnBTRDCTL;w}pvJI^CnXBnBDATCnBTRDCTL;w}pvJI^CnXBnBDATCnBTRDCTL;w}pvJI^CnXBnBDATCnBTRDCTL;w}pvJI^CnXBnBDATCnBTRDCTL;w}pvJI^CnXBnBDATCnBTRDCTL;w}pvJI^CnXBnBDATCnBTRDCTL"""

for key in range(0x01, 0xff):
    x = pwn.xor(a, key).decode('ascii')
    if 'flag' in x or 'FLAG' in x:
        print(x)
