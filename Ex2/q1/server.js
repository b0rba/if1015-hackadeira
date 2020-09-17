const dgram = require("dgram");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = dgram.createSocket("udp4");
rl.prompt(true);

socket.on("message", (msg) => {
  readline.cursorTo(process.stdout, 0);
  console.log(`client: ${msg}`);
  rl.prompt(true);
});

rl.addListener("line", (line) => {
  rl.prompt(true);
  socket.send(line, 6969, "127.0.0.1");
});

socket.bind(9696);