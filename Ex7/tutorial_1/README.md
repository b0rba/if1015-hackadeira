# tutorial 1 rabbitmq

tutorial provided by the teacher, you can find the step-by-step instructions [here](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)

you need to have rabbitmq-server running, know how to install [here](https://www.vultr.com/docs/how-to-install-rabbitmq-on-ubuntu-16-04-47)

## how to use

```bash
# install dependencies
yarn install

# start receiver
node receive.js

# start sender to send a "Hello World" message
node send.js
```