# Remote-Procedure-Call

## RPC クライアント・サーバーシステムの使用方法

このプロジェクトは、Unixドメインソケットを使用してRPC（リモートプロシージャコール）を実装するクライアント・サーバーシステムです。クライアントはNode.jsで、サーバーはPythonで書かれています。

### 1. 前提条件

このプロジェクトを実行するには、以下のソフトウェアがインストールされている必要があります：

- Node.js
- Python 3.x

### 2. ファイルの説明

- `client.js`: Node.jsで書かれたクライアントプログラム。
- `server.py`: Pythonで書かれたサーバープログラム。

### 3. 使用方法

#### サーバーの起動

```sh
python3 server.py
```

次に、クライアントを起動します。クライアントはNode.jsで書かれており、ユーザーからの入力を受け付けてサーバーにリクエストを送信します。

#### クライアントの起動

```sh
node client.js
```

クライアントを起動すると、サーバーに接続され、次のようなメッセージが表示されます：

```
/tmp/socket_fileに接続しました
以下を参照しメソッド名と値を入力してください。
メソッド名: floor 値: (double x),   【10 進数 x を最も近い整数に切り捨て、その結果を整数で返す。】
メソッド名: nroot, 値: (int n, int x),   【方程式 rn = x における、r の値を計算する。】
メソッド名: reverse, 値: (string s),   【文字列 s を入力として受け取り、入力文字列の逆である新しい文字列を返す。】
メソッド名: validAnagram, 値: (string str1, string str2),   【2 つの文字列を入力として受け取り，2 つの入力文字列が互いにアナグラムであるかどうかを示すブール値を返す。】
メソッド名: sort_string_array, 値: (string[] strArr),   【文字列の配列を入力として受け取り、その配列をソートして、ソート後の文字列の配列を返す。】
```

### 5. デモ

以下は、各メソッドの使用例です：

#### `floor` メソッドの使用例

```
メソッド名: floor
値(カンマで区切る): 3.55
受け取ったレスポンス: {"status":"success","result":3,"id":<request_id>}
```

#### `nroot` メソッドの使用例

```
メソッド名: nroot
値(カンマで区切る): 2, 16
受け取ったレスポンス: {"status":"success","result":4,"id":<request_id>}
```

#### `reverse` メソッドの使用例

```
メソッド名: reverse
値(カンマで区切る): hello
受け取ったレスポンス: {"status":"success","result":"olleh","id":<request_id>}
```

#### `validAnagram` メソッドの使用例

```
メソッド名: validAnagram
値(カンマで区切る): listen, silent
受け取ったレスポンス: {"status":"success","result":true,"id":<request_id>}
```

#### `sort_string_array` メソッドの使用例

```
メソッド名: sort_string_array
値(カンマで区切る): apple, banana, cherry
受け取ったレスポンス: {"status":"success","result":["apple","banana","cherry"],"id":<request_id>}
```
