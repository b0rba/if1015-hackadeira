const sendMessage = (socket, message) => {
    socket.write(`${message}@`);
};

const receiveMessages = (socket, handler) => {
    let buffered = "";
    socket.on("data", (data) => {
        buffered += data;
        let received = buffered.split("@");
        while (received.length > 1) {
        handler(received[0]);
        buffered = received.slice(1).join("@");
        received = buffered.split("@");
        }
    });
};

const sendOperation = (socket, num1, num2, operation) => {
    socket.write(`${num1}|${num2}|${operation}@`);
  };

const receiveOperations = (socket, handler) => {
    let buffered = "";
    socket.on("data", (data) => {
        buffered += data;
        let received = buffered.split("@");
        while (received.length > 1) {
            payload = received[0].split("|");
            let expression = {}
            expression.a = payload[0]
            expression.b = payload[1]
            expression.op = payload[2]
            handler(expression);
            buffered = received.slice(1).join("@");
            received = buffered.split("@");
        }
    });
};

module.exports = {
    sendMessage,
    receiveMessages,
    sendOperation,
    receiveOperations,
};