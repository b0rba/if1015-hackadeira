const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("chatp2p.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const chatp2p = grpcObject.chatp2p;
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
address = 'localhost'

rl.prompt(true);

rl.question("Write the port you want to receive in\n", function (localServerPort) {
  rl.question("Write the port you want to send to\n", function (receiverClientPort) {
    const server = new grpc.Server();
    server.bind(
      `${address}:${localServerPort}`,
      grpc.ServerCredentials.createInsecure()
    );

    server.addService(chatp2p.Chatp2p.service, {
      sendMessage: handleMessage,
    });
    server.start();

    const client = new chatp2p.Chatp2p(
      `${address}:${receiverClientPort}`,
      grpc.credentials.createInsecure()
    );

    function handleMessage(call, callback) {
      readline.cursorTo(process.stdout, 0);
      console.log(call.request.message);
      callback({})
      rl.prompt(true);
    }

    rl.addListener("line", (line) => {
      readline.cursorTo(process.stdout, 0);
      client.sendMessage({ message: line }, (err, response) => {
      });
      rl.prompt(true);
    });
  });
});