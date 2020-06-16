import sys, hexdump, binascii
from Crypto.Cipher import AES

class AESCipher:
    def __init__(self, key):
        self.key = key

    def decrypt(self, iv, data):
        self.cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return self.cipher.decrypt(data)

key = binascii.unhexlify("0602000000a400005253413100040000")
iv = binascii.unhexlify("0100010067244F436E6762F25EA8D704")
hex_str_cipher = "871C158E545657D6D714B34730465D85E4A5F96D3E6CCF47AE7310A3FC41AA4A18ADFE594917DD1847A810EFF8C13356" #Query

ciphertext = binascii.unhexlify(hex_str_cipher)
raw_un = AESCipher(key).decrypt(iv, ciphertext)
print(hexdump.hexdump(raw_un))
password = raw_un.decode('utf-16')
print(password)

