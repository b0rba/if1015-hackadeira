
const dgram = require("dgram");
const validator = require('../validator');
const calculator = require('../calculator');
const { sendMessage, receiveOperations } = require("./protocol");

const socket = dgram.createSocket('udp4');

receiveOperations(socket, (expression, rinfo) => {
    console.log('Client connected.\n');

    try {
        validator.validateInput(expression);
        sendMessage(socket, rinfo, `Result is: ${calculator.calculate(expression)}\n`)
        // socket.send(, rinfo.port, rinfo.address)
    } catch (e) {
        sendMessage(socket, rinfo, e.message)
    }
})

// const handleConnection = (msg, rinfo) => {
//     console.log('Client connected.\n');

//     const expression = JSON.parse(msg.toString());
//     try {
//         validator.validateInput(expression);
//         socket.send(`Result is: ${calculator.calculate(expression)}\n`, rinfo.port, rinfo.address)
//     } catch (e) {
//         socket.send(e.message, rinfo.port, rinfo.address);
//     }
// }

socket.bind(6969);