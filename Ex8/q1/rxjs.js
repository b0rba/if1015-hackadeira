const { webSocket } = require('rxjs/webSocket');
const ws = require('ws');
const amqp = require('amqplib/callback_api');

const subject = webSocket({
    url: 'ws://localhost:8081/random-voltage',
    WebSocketCtor: ws,
});

const queue = 'voltage';
const lowerBound = 105
const upperBound = 120

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) throw err;

    connection.createChannel((err1, channel) => {
        if (err1) throw err1;

        channel.assertQueue(queue, { durable: true });

        const next = msg => {
            if (lowerBound <= msg && msg <= upperBound) {
                console.log(`undesirable voltage: ${msg}`);
                channel.sendToQueue(queue, Buffer.from(`${msg}`), { persistent: true });
            }
        };

        const error = err => {
            console.log(err);
            process.exit(1);
        };

        const complete = () => {
            console.log('complete');
            connection.close();
            process.exit(0);
        };

        subject.subscribe(next, error, complete);
    });
});