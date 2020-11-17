# rabbitmq producer consumer

you need to have rabbitmq-server running, know how to install [here](https://www.vultr.com/docs/how-to-install-rabbitmq-on-ubuntu-16-04-47)

## how to use

```bash
# install dependencies
yarn install

# open file on browser
client.html

# start the consumer with
node consumer.js

# send a request to be approved on the client
node producer.js "xablau"
```