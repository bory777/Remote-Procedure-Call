const net = require('net');
const readline = require('readline')

const server_address = '/tmp/socket_file';

// サーバーとの通信を担当
class SocketClient {
    constructor(address){
        this.client = new net.Socket();
        this.address = address;
    };

    connect(){
        this.client.connect({path: this.address}, () => {
            console.log(`${this.address}に接続しました`);
            this.printMethodDiscription();
            this.startSession();
        });
        // レスポンスを受信するためのリスナー
        this.client.on('data', data => {
            console.log('受け取ったレスポンス: ', data.toString());
            this.client.end();
        })

        this.client.on('end', () => {
            console.log('接続が終了しました');
        })

        this.client.on('error', (err) => {
            console.error('エラーが発生しました', err);
        })
    }

    printMethodDiscription(){
        console.log('以下を参照しメソッド名と値を入力してください。')
        console.log('メソッド名: floor \n 値: (double x),   【10 進数 x を最も近い整数に切り捨て、その結果を整数で返す。】')
        console.log('メソッド名: nroot, 値: (int n, int x),   【方程式 rn = x における、r の値を計算する。】')
        console.log('メソッド名: reverse, 値: (string s),   【文字列 s を入力として受け取り、入力文字列の逆である新しい文字列を返す。】')
        console.log('メソッド名: validAnagram, 値: (string str1, string str2),   【2 つの文字列を入力として受け取り，2 つの入力文字列が互いにアナグラムであるかどうかを示すブール値を返す。】')
        console.log('メソッド名: sort_string_array, 値: (string[] strArr),   【文字列の配列を入力として受け取り、その配列をソートして、ソート後の文字列の配列を返す。】')
    }
        
        
    async startSession(){
        const inputHandler = new InputHandler();
        
        try{
            const method = await inputHandler.askQuestion('メソッド名: ');
            const params = await inputHandler.askQuestion('値(カンマで区切る): ');
            const paramsArray = params.split(',').map(params => params.trim());
            const requestId = Date.now();
        
            const message = RequestBuilder.buildRequest(method, paramsArray, requestId);
            this.send(message, (err) => {
                if(!err) {
                    inputHandler.close();
                } 
            });
        } catch (error) {
            console.log('エラーが発生しました。', error);
            inputHandler.close();
        }
    }

    send(message, callback) {
        this.client.write(message, (err) => {
            if (err) {
                console.log('メッセージを送れませんでした。', err);
            } else {
                console.log('メッセージを送りました。')
            }
            if (callback) callback(err);
        });
    }
}

// ユーザーからの入力を処理
class InputHandler {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    askQuestion(question) {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => resolve(answer));
        });
    }

    close() {
        this.rl.close();
    }
}

// リクエストメッセージを構築
class RequestBuilder {
    static buildRequest(method, params, requestId) {
        const message = JSON.stringify({
            method: method,
            params: params,
            id: requestId
        });
        return message;
    }
}

async function main() {
    const socketClient = new SocketClient(server_address);
    socketClient.connect();
}

if (require.main === module) {
    main();
}




