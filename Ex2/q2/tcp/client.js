const net = require('net');
const readline = require('readline');
const validator = require('../validator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const client = new net.Socket();
let expression = {};

const initClient = () => {
    client.connect(5000, '127.0.0.1', () => {   
        console.log('Connected to server\n');
        console.log('-------------------------------')
        console.log('Valid operations: <+, -, *, />');
        console.log('Input example, if i want to do 1 + 2:');
        console.log('1\n2\n+')
        console.log('Result is: 3')
        console.log('-------------------------------')
              
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
                        client.write(JSON.stringify(expression));
                        expression = {}
                    }
                } catch (e) {
                    console.log(e.message);
                }
            }
        })
    });
}

client.on('data', (data) => {
    console.log(`${data.toString()}`);
});
  
client.on('error', async () => {
    console.log('A error accurred');
});

initClient();
