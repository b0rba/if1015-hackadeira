const { webSocket } = require('rxjs/webSocket');
const ws = require('ws');
const { Subject } = require('rxjs');
const amqp = require('amqplib/callback_api');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const webSocketSubject = webSocket({
    url: 'ws://localhost:8081/random-voltage',
    WebSocketCtor: ws,
});

// start grpc server
const grpcSubject = new Subject();

const StartGrpcServer = grpcSubject => {
    const SERVER_ADDRESS = 'localhost:5001';

    const proto = grpc.loadPackageDefinition(
        protoLoader.loadSync('voltage.proto', {})
    );

    const server = new grpc.Server();
    server.addService(proto.voltagePackage.Voltage.service, {
        write: (call, callback) => {
            grpcSubject.next(call.request.voltage);

            const response = {
                status: { code: 200, message: 'OK' },
            };

            callback(null, response);
        },
    });

    server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
    server.start();
};

StartGrpcServer(grpcSubject);

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
                console.log(`undesirable voltage ${msg}V`);
                channel.sendToQueue(queue, Buffer.from(`${msg}`), { persistent: true });
            }
        };

        const error = err => {
            const target =
                err.target._url === 'ws://localhost:8081/random-voltage'
                    ? 'websocket'
                    : 'grpc';

            console.log(`${target} error: ${err.message}`);
        };

        const complete = () => {
            console.log('complete');
            connection.close();
            process.exit(0);
        };

        webSocketSubject.subscribe(next, error, complete);
        grpcSubject.subscribe(next, error, complete);
    });
});