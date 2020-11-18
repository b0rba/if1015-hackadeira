const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const proto = grpc.loadPackageDefinition(
    protoLoader.loadSync('voltage.proto', {})
);

const REMOTE_SERVER = 'localhost:5001';

const client = new proto.voltagePackage.Voltage(
    REMOTE_SERVER,
    grpc.credentials.createInsecure()
);

const randomIntBetweenValues = (lower, higher) => Math.floor(Math.random() * (higher - lower) + lower);

const sendVoltage = () => {
    const voltage = randomIntBetweenValues(100, 130);

    client.write({ voltage: voltage }, (err, res) => {
        if (err) throw err;
        if (res.status.code != 200) throw res.status.message;

        console.log(`Send data: ${voltage}`);
    });
};

setInterval(sendVoltage, 2000);