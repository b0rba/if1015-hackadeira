const sendMessage = (client, rinfo, message) => {
    client.send(`${message}@`, rinfo.port, rinfo.address);
  };

const receiveMessages = (client, handler) => {
    let buffered = "";
    client.on("message", (data, rinfo) => {
        buffered += data;
        let received = buffered.split("@");
        while (received.length > 1) {
        handler(received[0], rinfo);
        buffered = received.slice(1).join("@");
        received = buffered.split("@");
        }
    });
};
const sendOperation = (client, port, address, num1, num2, operation) => {
    client.send(`${num1}|${num2}|${operation}@`, port, address);
  };

const receiveOperations = (client, handler) => {
    let buffered = "";
    client.on("message", (data, rinfo) => {
        buffered += data;
        let received = buffered.split("@");
        while (received.length > 1) {
            payload = received[0].split("|");
            let expression = {}
            expression.a = payload[0]
            expression.b = payload[1]
            expression.op = payload[2]
            handler(expression, rinfo);
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