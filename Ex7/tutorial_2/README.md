# tutorial 2 rabbitmq

tutorial provided by the teacher, you can find the step-by-step instructions [here](https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html)

you need to have rabbitmq-server running, know how to install [here](https://www.vultr.com/docs/how-to-install-rabbitmq-on-ubuntu-16-04-47)

## how to use

```bash
# install dependencies
yarn install

# u can start as many workes as u want, one on each terminal with
node worker.js

# send a new task with 
node new_task.js sample_task.

# each '.' at the end is gonna be a second of delay to process the task.
node new_task.js sample.   # one second delay
node new_task.js sample..  # two seconds delay
node new_task.js sample... # three seconds delay
```