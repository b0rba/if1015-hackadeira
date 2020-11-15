'use strict';

const WebSocketServer = require('ws').Server;
const http = require('http');

const messages = [];
const socketUserMap = new Map();

const wss = new WebSocketServer({ port: 8080, path: '/chat' });

const broadcastMessage = (ws, msg) => {
    messages.push(msg);
    socketUserMap.forEach((_, userSocket) => {
        if (userSocket !== ws) {
            userSocket.send(msg);
        }
    });
};

wss.on('connection', ws => {
    console.log('new connection');

    socketUserMap.set(ws)
    ws.send('server: name, pls?');

    let isFirstInput = true;
    let user = 'host';
    ws.on('message', text => {
        let msg = `${user}: ${text}`;
        if (isFirstInput) {
            isFirstInput = false
            user = text;
            console.log(`user '${user}' connected!`);

            msg = `server: ${user} joined the chat!`;
            ws.send('**Joined!**')
        }

        broadcastMessage(ws, msg);
    });

    ws.on('close', (code, e) => {
        console.log(`user ${user} was disconnected: ${code} - ${e}`);

        socketUserMap.delete(ws);
        broadcastMessage(ws, `server: ${user} left the chat`);
    });
});

// READ-ONLY chat
const eventifyArrayPush = (arr, callback) => {
    arr.push = e => {
        Array.prototype.push.call(arr, e);
        callback(arr);
    };
};

const requestListener = (_, res) => {
    res.writeHeader(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
    });

    for (const message of messages) {
        res.write(`${message}\n`);
    }

    eventifyArrayPush(_, updatedMessages => {
        const i = updatedMessages.length - 1;
        const msg = updatedMessages[i];
        res.write(`${msg}\n`);
    });
};

const server = http.createServer(requestListener);
server.listen(9090);

console.log('SSE-Server listening at 9090');