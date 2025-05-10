import http.server
import socketserver

HOST = "localhost"
PORT = 8000

class MyHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write("<h1>Hello, World!</h1>".encode())

server = socketserver.TCPServer((HOST, PORT), MyHandler)
server.serve_forever()