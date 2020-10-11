const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculator = grpcObject.calculator;
const readline = require("readline");
const validator = require('./validator');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new calculator.Calculator(
  "localhost:7474",
  grpc.credentials.createInsecure()
);

let expression = {};
rl.addListener('line', (line) => {
    line = line.toString()
    if (!expression.a) {
        expression.a = line
    } else if (!expression.b) {
        expression.b = line
    } else if (!expression.op) {
        expression.op = getOpNumber(line)
        
        try {
          num1 = expression.a
          num2 = expression.b
          operation = expression.op
          makeOperation({ num1, num2, operation })
          expression = {}
        } catch (e) {
            console.log(e.message);
            expression = {}
        }
    }
})

function getOpNumber(op) {
  switch(op) {
    case '+':
        return 0;
    case '-':
        return 1;
    case '*':
        return 2;
    case '/':
        return 3;
}
}

function makeOperation(request) {
  client.makeOperation(request, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response.response);
    }
  });
}