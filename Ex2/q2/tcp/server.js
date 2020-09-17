
const net = require('net');
const validator = require('../validator');
const calculator = require('../calculator');

const handleConnection = socket => {
    console.log('Client connected.\n');

    socket.on("data", (data) => {
        const expression = JSON.parse(data.toString());
        try {
            validator.validateInput(expression);
            socket.write(`Result is: ${calculator.calculate(expression)}\n`)
        } catch (e) {
            console.log(e.message)
            socket.write(e.message);
        }
    });
}

const server = net.createServer(handleConnection);
server.listen(5000, '127.0.0.1');