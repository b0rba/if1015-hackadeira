
const dgram = require("dgram");
const validator = require('../validator');
const calculator = require('../calculator');

const handleConnection = (msg, rinfo) => {
    console.log('Client connected.\n');

    const expression = JSON.parse(msg.toString());
    try {
        validator.validateInput(expression);
        socket.send(`Result is: ${calculator.calculate(expression)}\n`, rinfo.port, rinfo.address)
    } catch (e) {
        socket.send(e.message, rinfo.port, rinfo.address);
    }
}

const socket = dgram.createSocket('udp4');
socket.bind(6969);

socket.on('message', handleConnection);