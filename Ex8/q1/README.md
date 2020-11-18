# undesired voltage report

A sample voltage report program feed using a websocket, where each event is filtered by a RxJS program to check if voltage is a undesired value and finally sent to a rabbitmq queue.

- you need to have `rabbitmq-server` running, know how to install [here](https://www.vultr.com/docs/how-to-install-rabbitmq-on-ubuntu-16-04-47)

## how to use

You'll need 3 terminals

```bash
# install dependencies
yarn install
cd q1
```

```bash
# terminal 1
node ws-server.js
```

```bash
# terminal 2
node rabbitmq.js
```

```bash
# terminal 3
node rxjs.js
```