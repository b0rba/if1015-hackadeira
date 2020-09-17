const dgram = require("dgram");
const readline = require('readline');
const validator = require('../validator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const client  = dgram.createSocket('udp4');
client.on("message", (msg, rinfo) => {
    console.log(msg.toString());
});
  
client.on("error", async () => {
    console.log("A error accurred");
});

console.log('-------------------------------')
console.log('Valid operations: <+, -, *, />');
console.log('Input example, if i want to do 1 + 2:');
console.log('1\n2\n+')
console.log('Result is: 3')
console.log('-------------------------------')

let expression = {};
rl.addListener('line', (line) => {
    line = line.toString()
    if (!expression.a) {
        expression.a = line
    } else if (!expression.b) {
        expression.b = line
    } else if (!expression.op) {
        expression.op = line
        
        try {
            if (validator.isReadyToSend(expression)) {
                client.send(JSON.stringify(expression), 6969, '127.0.0.1');
                expression = {}
            }
        } catch (e) {
            console.log(e.message);
        }
    }
})