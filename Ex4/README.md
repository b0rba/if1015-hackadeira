# Discussion Questions

1. What are the advantages of using an approach like gRPC when correcting sockets?
2. Still comparing with the approach using sockets, what is the role of the Protocol Buffer in the
exercises above? Is there any increase in complexity?
3. In general, what are the main differences between the implementations of the calculator and the chats?
____

### Answers

1. In general, gRPC abstract the complexity when creating your own protocol, but this is such a simple example that may actually make it more complex. gRPC gives u more control and efficiency;
2. Define the message model; You need to define more things, so yes. In this simple application it may not be worth it, but in a bigger one it definitely is, and when you need have a aplication as a service it is probably a good idea use this kinda structures;
3. I only saw the advantages when making the group chat, cause i could divide login/out and the message part in a pretty good way, the other two here straight forward, define the message model, define de ports and gg;