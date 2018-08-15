const {readFileSync} = require('fs');
const {createServer} = require('https');
const WebSocketServer = require('ws');

const port = 18080;

// 创建一个 wws
const server = new createServer({
    cert: readFileSync('/usr/local/etc/nginx/server.crt'),
    key: readFileSync('/usr/local/etc/nginx/server.key')
}).listen(port);

const wss = new WebSocketServer.Server({server});

// 连接池
const clients = new Set();

wss.on('connection', (ws, req) => {
    // 将新的连接 push 进连接池
    clients.add(ws);
    console.log(`🔥 New connection, pool size: ${clients.size}`);

    ws.on('message', msg => {
        if (msg === 'ping') return pong();

        const {role, message} = JSON.parse(msg);

        console.log(`📩 New message: ${role} ${message}\n`);

        if (type === 'ping') return pong();

        // 只有 admin 可以广播消息
        if (/admin/i.exec(role)) {
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocketServer.OPEN) {
                    client.send(message);
                }
            });
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log(`🌧 Connection closed, pool size: ${clients.size}`);
    });

    function pong() {
        ws.send('pong');
    }
});