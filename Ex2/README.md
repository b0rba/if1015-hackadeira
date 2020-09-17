# Discussion Questions

1. What are the main differences between UDP and TCP?
2. What are the main differences between the implementation of UDP and TCP in both chat and calculator?
3. What are the main difficulties in the UDP implementations?
4. When to use UDP and TCP?
____

### Answers

1. The main difference is that tcp is reliable, data sent using a TCP protocol is guaranteed to be delivered to the receiver, because of that and many other thing tcp is more slow than udp, knowing the trade-offs you can make the right decision;
2. On server-side the difference is that we don't have a handler to each client, it all in the same handler and we use rinfo to send the info to the 'right endpoint', on clien-side we couldn't use the same port to multiple connection, because the udp dont have a pool of sockets for example. we need each connection is a different port so on theserve when can know, using rinfo how to send back the info;
3. In this application, not much, could be a problem running not in localhost, because the client will not know if something happend or not. And the port pool control could be a problem too, but not in this case;
4. TCP is best suited to be used for applications that require high reliability where timing is less of a concern: 
World Wide Web (HTTP, HTTPS), Secure Shell (SSH), File Transfer Protocol (FTP), Email (SMTP, IMAP/POP); UDP is best suited for applications that require speed and efficiency: VPN tunneling, Streaming videos, Online games, Live broadcasts, Voice over Internet Protocol (VoIP)
