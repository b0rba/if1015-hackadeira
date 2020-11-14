# client server rest api

## how to use
You'll need two terminal, one for server, one for client, which should be "turn on" respectively

server
```bash
# go to directory
cd server

# install dependencies
yarn install

# start server
yarn start
```
client
```bash
# go to directory
cd client

# install dependencies
yarn install

# send a sample get request
node client.js GET text/json text/json /band/1/songs
```

client command structure:

```bash
node client.js method content-type accept path filepath
```
accepted methods
```
GET, POST, PUT, DELETE
```
paths
```
GET
/bands
/band/:id
/band/:id/songs
/band/:id/song/:id

POST
/band
/band/:id/song

PUT
/band/:id
/band/:id/song/:id

DELETE
/band/:id
/band/:id/song/:id
```

# Discussion

### Guidelines
- Resource identification: Use of unique URIs to describe resources (a resource must have only one URI)
- Resource manipulation through representations: the same resource must be
available in different representations (eg XML and JSON)
- Self-descriptive message: Correct use of HTTP headers to describe
requests and responses.
- Hypermedia as the engine of application state (HATEOAS): Use of navigable links resources (see example here: https://restfulapi.net/hateoas/)

### Questions
1. What decisions involved choosing the nomenclature of resources?
2. What HTTP headers were involved to guarantee the above four guidelines?

### Answers
1. The ideia is to make straightfoward, we have `bands`, each `band` has `songs` and that is it, the structure is the same as te genreal use:
 ```resource/{resource-id}/sub-resource/{resource-id}```
2. The first was guaranteed by the URLs themselves. The second by the content-type header. The third for standard headers. The fourth is not present in this sample api.