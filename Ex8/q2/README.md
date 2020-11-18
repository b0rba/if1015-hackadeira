# undesired voltage report with multiple producers

A sample voltage report program feed using a websocket and grpc, where each event is filtered by a RxJS program to check if voltage is a undesired value and finally sent to a rabbitmq queue.

- you need to have `rabbitmq-server` running, know how to install [here](https://www.vultr.com/docs/how-to-install-rabbitmq-on-ubuntu-16-04-47)

## how to use

You'll need 4 terminals

```bash
# install dependencies
yarn install
```

```bash
# terminal 1
cd producers/websocket
node ws-server.js
```

```bash
# terminal 2
cd rxjs
node rxjs.js
```

```bash
# terminal 3
cd producers/grpc
node grpc.js
```

```bash
# terminal 4
cd rabbitmq
node rabbitmq.js
```

```bash
# open file on browser to watch live feed of the queue
index.html
```