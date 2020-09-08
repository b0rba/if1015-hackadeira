# Discussion Questions

1. What are the main difficulties?
2. What are the main differences between the implementation of question 1 and question 2?
3. How to manage connections between clients in question 2?
4. How do I identify messages and senders to follow the example format?
____

### Answers

1. Learn how to use web sockets;
2. We use the server as a mediator, and the clients communicate to each other and not to the server;
3. I created a map of sockets, so for each connection e checked if it is from a previous socket or not;
4. If is not a new socket, I use the current socket as key and get the username for that socket as value from the map, and send the info to every other socket on the map;
