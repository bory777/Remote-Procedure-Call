import socket
import os
import math

class SocketServer:
    def __init__(self, address):
        self.server_address = address

        # ソケットの作成、UNIXドメインソケットの使用
        self.sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)

        # 既存のソケットがあれば削除
        if os.path.exists(self.server_address):
            os.remove(self.server_address)

        # ソケットにアドレスをバインド
        self.sock.bind(self.server_address)
        self.sock.listen(1)

        print(f'{self.server_address}からの通信を待っています。')

    def get_socket(self):
        return self.sock
    

import json

class RequestHandler:
    def __init__(self, sock, function_map):
        self.sock = sock
        self.function_map = function_map

    def handle_request(self):
        while True:
            conn, _ = self.sock.accept()
            data = conn.recv(4096)
            request = json.loads(data.decode())

            method = request.get('method')
            params = request.get('params', [])
            # param_types = request.get('param_tyoes', [])
            request_id = request.get('id')

            result = self.function_map[method](*params)
            response = json.dumps({'status': 'success', 'result': result, 'id': request_id})

            conn.sendall(response.encode())
            conn.close()



class Function:
    # 10 進数 x を最も近い整数に切り捨て、その結果を整数で返す。
    @staticmethod
    def floor(x):
        return math.floor(float(x))

    # 方程式 rn = x における、r の値を計算する。
    @staticmethod
    def nroot(n, x):
        return int(x ** (1 / n))

    # 文字列 s を入力として受け取り、入力文字列の逆である新しい文字列を返す。
    @staticmethod
    def reverse(s):
        return s[::-1]

    # 2 つの文字列を入力として受け取り，2 つの入力文字列が互いにアナグラムであるかどうかを示すブール値を返す。
    @staticmethod
    def validAnagram(str1, str2):
        return sorted(str1.lower()) == sorted(str2.lower())

    # 文字列の配列を入力として受け取り、その配列をソートして、ソート後の文字列の配列を返す。
    @staticmethod
    def sort_string_array(strArr):
        return sorted(strArr)
    

def main():
    server_address = '/tmp/socket_file'
    socket_server = SocketServer(server_address)
    sock = socket_server.get_socket()

    # 関数のマッピング
    function_map = {
        'floor': Function.floor,
        'nroot': Function.nroot,
        'reverse': Function.reverse,
        'validAnagram': Function.validAnagram,
        'sort_string_array': Function.sort_string_array
    }

    # リクエストハンドラのインスタンスを作成
    request_handler = RequestHandler(sock, function_map)

    # サーバーのリクエスト処理開始
    request_handler.handle_request()

if __name__ == "__main__":
    main()