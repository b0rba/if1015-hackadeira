const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("groupchat.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const groupchat = grpcObject.groupchat;

const users = {};

const server = new grpc.Server();
server.bind("localhost:6969", grpc.ServerCredentials.createInsecure());

server.addService(groupchat.GroupChat.service, {
  sendMessage: handleMessage,
  login: handleLogin,
  logout: handleLogout,
});
server.start();

function handleMessage(call, callback) {
  for (const [peer, user] of Object.entries(users)) {
    if (peer != call.getPeer()) {
      user.call.write({
        name: users[call.getPeer()].name,
        message: call.request.message,
      });
    }
  }
  callback({});
}

function handleLogin(call, _) {
  users[call.getPeer()] = {
    name: call.request.name,
    call: call,
  };
  call.write({
    name: "Server",
    message: `Currently, there is ${Object.keys(users).length-1} other users in the chat!`,
  });
}

function handleLogout(call, callback) {
  users[call.getPeer()].call.end();
  for (const [peer, user] of Object.entries(users)) {
    if (peer != call.getPeer()) {
      user.call.write({
        name: users[call.getPeer()].name,
        message: "LOGGED OUT",
      });
    }
  }
  delete users[call.getPeer()]
  callback();
}