const net = require('net');
const readline = require('readline');

const host = 'localhost';
const port = 6969;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const server = net.createServer(socket => {
  console.log('client connected');
  rl.prompt(true);

  rl.addListener('line', line => {
    socket.write(line);
    rl.prompt(true);
  });

  socket.on('data', data => {
    readline.cursorTo(process.stdout, 0);
    const input = data.toString()
    if (input === 'end'){
        socket.end()
        return
    }

    console.log('client: ' + input);
    rl.prompt(true);
  });

  socket.on('end', () => {
    console.log('client disconnected');
  });
});

server.listen(port, host);