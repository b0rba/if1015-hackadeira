# tutorial 3 rabbitmq

tutorial provided by the teacher, you can find the step-by-step instructions [here](https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html)

you need to have rabbitmq-server running, know how to install [here](https://www.vultr.com/docs/how-to-install-rabbitmq-on-ubuntu-16-04-47)

## how to use

```bash
# install dependencies
yarn install

# u can start as many receivers as u want, one on each terminal with
node receive_logs.js

# send a "Hello World!" to all receivers with 
node emit_logs.js
```