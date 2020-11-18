// web socket publisher
const WebSocketServer = require('ws').Server;

const voltages = [];
const webSocketsMap = new Map();

const broadcastMessage = msg => {
    webSocketsMap.forEach((_, socket) => {
        socket.send(JSON.stringify({ voltages: [msg] }));
    })
};

const eventifyArrayPush = (arr, callback) => {
    arr.push = e => {
        Array.prototype.push.call(arr, e);
        callback(arr);
    };
};

eventifyArrayPush(voltages, updatedVoltages => {
    const i = updatedVoltages.length - 1;
    const msg = updatedVoltages[i];
    broadcastMessage(msg);
});

const wss = new WebSocketServer({ port: 8080, path: '/requests' });
wss.on('connection', ws => {
    console.log('new connection');

    webSocketsMap.set(ws);
    ws.send(JSON.stringify({ voltages: voltages }));

    ws.on('close', (code, reason) => {
        console.log(`connection closed: ${code} - ${reason}`);
        webSocketsMap.delete(ws);
    });
});

// rabbitmq consumer
const amqp = require('amqplib/callback_api');

const queue = 'voltage';

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) throw err;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        channel.assertQueue(queue, { durable: true });
        channel.prefetch(1);

        console.log('waiting for messages in queue %s...', queue);

        const onMessage = msg => {
            console.log('received: %s', msg.content.toString());
            voltages.push(msg.content.toString());
            channel.ack(msg);
        };

        channel.consume(queue, onMessage, { noAck: false });
    });
});