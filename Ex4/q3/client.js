const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("groupchat.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const groupchat = grpcObject.groupchat;
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.prompt(true);
readline.cursorTo(process.stdout, 0);

const client = new groupchat.GroupChat(
  "localhost:6969",
  grpc.credentials.createInsecure()
);
rl.question("Choose your name\n", function (name) {
  const call = client.login({ name });
  call.on("data", (item) => {
    console.log(`${item.name}: ${item.message}`);
  });
  
  console.log("Send your messages, or send /exit to end.");
  rl.addListener("line", (line) => {
    readline.cursorTo(process.stdout, 0);
    if (line !== "/exit") {
      client.sendMessage({ message: line }, (err, response) => {});
    } else {
      client.logout({}, (err, response) => {});
      rl.close()
    }
    rl.prompt(true);
  });
});