'use strict';

const http = require('http');
const fs = require('fs');

const method = process.argv[2];
const contentType = process.argv[3];
const accept = process.argv[4];
const path = process.argv[5];
const filePath = process.argv[6];

const serverPort = 6969

if (!method || !contentType || !accept | !path) {
    console.log(`Invalid input, expected: (method, contentType, accept, path) not null, actual: (${method}, ${contentType}, ${accept}, ${path})`);
    process.exit(1);
}

const requestCallback = res => {
    console.log(`statusCode: ${res['statusCode']}, statusMessage: ${res['statusMessage']}`);

    let str = '';
    res.on('data', chunk => (str += chunk));
    res.on('end', () => console.log(str));
};

let body = (!filePath) ? '' : fs.readFileSync(filePath, 'utf8');

const options = {
    hostname: 'localhost',
    port: serverPort,
    path: path,
    method: method,
    headers: {
        'Content-Type': contentType,
        'Content-Length': body.length,
        Accept: accept,
    },
};

const req = http.request(options, requestCallback);
req.on('error', err => {
  console.log(err);
});
req.write(body);
req.end();