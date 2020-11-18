const { clear } = require('console');

const WebSocketServer = require('ws').Server;

const randomIntBetweenValues = (lower, higher) => Math.floor(Math.random() * (higher - lower) + lower);

const wss = new WebSocketServer({ port: 8081, path: '/random-voltage' });
wss.on('connection', ws => {
    console.log('New connection');

    ws.on('message', message => {
        console.log(`message received: ${s}`, message);
    });

    const sendVoltage = () => {
        const voltage = randomIntBetweenValues(100, 130);
        console.log(`sending data: ${voltage}`);
        ws.send(voltage);
    };

    setInterval(sendVoltage, 2000);
});