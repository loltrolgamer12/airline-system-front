#!/usr/bin/env python3
import http.server
import socketserver
import webbrowser
import os
from threading import Timer

PORT = 3000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def open_browser():
    webbrowser.open(f'http://localhost:{PORT}')

if __name__ == "__main__":
    print(f"🌐 Iniciando servidor frontend en puerto {PORT}")
    print(f"📂 Sirviendo archivos desde: {os.getcwd()}")
    print(f"🔗 URL: http://localhost:{PORT}")
    print("⚡ Presiona Ctrl+C para detener\n")
    
    # Abrir navegador después de 1 segundo
    Timer(1, open_browser).start()
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Servidor detenido")
