
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculator = grpcObject.calculator;
const customCalculator = require('./custom_calculator');
const validator = require('./validator');

const server = new grpc.Server();
server.bind("localhost:7474", grpc.ServerCredentials.createInsecure());

server.addService(calculator.Calculator.service, {
  makeOperation: makeOperation,
});
server.start();

function makeOperation(call, callback) {
  let { num1, num2, operation } = call.request;
  try {
    expression = {}
    expression.a = num1
    expression.b = num2
    expression.op = operation
    if (validator.validateInput(expression)){
      result = customCalculator.calculate(num1, num2, operation)
      callback(null, {response: result})
    }
  } catch(e) {
    callback(e)
  }
}
