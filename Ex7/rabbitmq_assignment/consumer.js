#!/usr/bin/env node

// rabbitmq implementation
const amqp = require('amqplib/callback_api');

const queue = 'queue';

let connectionChannel = null;

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) throw err;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        connectionChannel = channel;

        channel.assertQueue(queue, { durable: true });
        channel.prefetch(1);

        console.log('waiting for messages in queue %s...', queue);

        const onMessage = msg => {
            console.log('received: %s', msg.content.toString());
            broadcastMessage(msg);
        };

        channel.consume(queue, onMessage, { noAck: false });
    });
});

// ws implemetation
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 9090, path: '/requests' });
const socketUserMap = new Map();

let curMessage = null;
const broadcastMessage = msg => {
    curMessage = msg;
    socketUserMap.forEach((_, socket) => {
        socket.send(curMessage.content.toString());
    })
};

wss.on('connection', ws => {
    console.log('new connection');

    socketUserMap.set(ws);

    if (curMessage) ws.send(curMessage.content.toString());

    ws.on('message', msg => {
        if (connectionChannel &&
            curMessage &&
            curMessage.content.toString() === msg
        ) {
            console.log(`ack %s`, msg);

            const tmp = curMessage;
            curMessage = null;
            connectionChannel.ack(tmp);
        }
    });

    ws.on('close', (code, reason) => {
        console.log(`connection closed: ${code} - ${reason}`);
        socketUserMap.delete(ws)
    });
});