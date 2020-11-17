# Discussion

three sample tutorial about rabbitmq provided by the teacher(you can find the link in their own readme), and the actual task.

### Questions
1. What is the main difference between each example of the tutorials followed?
2. Suppose your queue server (rabbitmq-server) is running and has queues that contain messages not yet consumed, and accidentally the machine on which it runs restarts, how can you guarantee that the messages will be saved when the queue server is up and running?

### Answers
1. it was a progression, first we learn the basics, how one, send a message to anothe through a queue. Second we could have more people receive waht as send it through the queue. Third, we abstract to the producer the queue and send the message to a exchange and this exchange control in which queue the message goes.
2. "The RabbitMQ persistence layer is intended to provide reasonably good throughput in the majority of situations without configuration."
This layer ensures that the message can be recovered, because it is written in the disk, more info [here](https://www.rabbitmq.com/persistence-conf.html#:~:text=Persistent%20messages%20will%20be%20written,from%20memory%20under%20memory%20pressure.).