
const net = require('net');
const validator = require('../validator');
const calculator = require('../calculator');
const { receiveOperations, sendMessage } = require('../protocol')

const handleConnection = socket => {
    console.log('Client connected.\n');

    receiveOperations(socket, (expression) => {
        try {
            validator.validateInput(expression);
            sendMessage(socket, `Result is: ${calculator.calculate(expression)}\n`)
        } catch (e) {
            sendMessage(socket, e.message)
        }
    })
}

const server = net.createServer(handleConnection);
server.listen(5000, '127.0.0.1');