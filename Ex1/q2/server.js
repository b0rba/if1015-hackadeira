const net = require('net');

const host = 'localhost';
const port = 1337;

const socketUserMap = new Map();
const server = net.createServer(socket => {
    const timestamp = new Date().toUTCString()
    console.log('New client just connected at: ' + timestamp);

    socket.write('inform your username below');

    socket.on('data', data => {
        let input = data.toString()
        if (!socketUserMap.has(socket)) {
            const user = input;
            socketUserMap.set(socket, user);
            console.log('user "' + user + '" logged in');

            socket.write('joinned the chat as ' + user);

            return;
        }

        const user = socketUserMap.get(socket);
        if (input === '!exit'){
            input = 'disconnected'
            disconnectUser(socket)
        }
        
        socketUserMap.forEach((_, socketValue) => {
            if (socketValue !== socket) {
                socketValue.write(user + ': ' + input);
            }
        });
    });

    socket.on('end', () => {
        disconnectUser(socket)
    });
});

function disconnectUser(socket) {
    console.log('user "' + socketUserMap.get(socket) + '" logged out');
    socketUserMap.delete(socket)
    socket.write('inform your username below');
}

server.listen(port, host);
console.log('started listening to ' + host + ':' + port);