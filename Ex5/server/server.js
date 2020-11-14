'use strict';

const express = require('express');
const http = require('http');
const xmlparser = require('express-xml-bodyparser');
const convert = require('xml-js');

const bands = require('./bands');
const serverPort = 6969

const app = express();
app.use(express.json());
app.use(xmlparser({
        explicitArray: false,
        normalize: false,
        normalizeTags: false,
        trim: true,
    })
);

const send = (req, res, data) => {
    res.setHeader('Content-Type', req.headers['accept']);

    switch (req.headers['accept']) {      
        case 'text/xml':
            const options = { compact: true, ignoreComment: true, spaces: 2 };
            res.status(200).send(convert.js2xml({ root: data }, options));
            break;

        case 'text/json':
            res.status(200).json(data);
            break;
  
      default:
        res.status(400).send('Response Format not supported');
    }
};

const handleRequest = (req, callback) => {
    switch (req.headers['content-type']) {
        case 'text/json':
            let str = '';
            req.on('data', chunk => (str += chunk));
            req.on('end', () => callback(JSON.parse(str)));
            break;
    
        case 'text/xml':
            callback(req.body['root']);
            break;
    
        default:
            callback('');
    }
};

function getNextIdValueBasedOnbandsize(band) {
    nextId = bandIds.length > 0 ? Math.max.apply(Math, bandIds) + 1 : 0;
    return nextId.toString()
}

// GET
app.get('/bands', (req, res) => {
    send(req, res, bands);
});
  
app.get('/band/:id', (req, res) => {
    const band = bands.find(band => band.id === req.params.id);
    band ? send(req, res, band) : res.status(404).send();
});

app.get('/band/:id/songs', (req, res) => {
    const band = bands.find(band => band.id === req.params.id);
    band ? send(req, res, band.songs) : res.status(404).send();
});

app.get('/band/:id/song/:id', (req, res) => {
    const band = bands.find(band => band.id === req.params.id);
    if (band) {
        const song = band.songs.find(song => song.id === req.params.id);
        if (song) {
            send(req, res, song);
            return;
        }
    }

    res.status(404).send();
});

// POST
app.post('/band', (req, res) => {
    handleRequest(req, body => {
        const bandIds = bands.map(band => band.id);

        const id = getNextIdValueBasedOnbandsize(bandIds) 
        const band = {
            id: id,
            name: body.name,
            songs: body.songs,
        };

        bands.push(band);
        send(req, res, band);
    });
});
  
app.post('/band/:id/song', (req, res) => {
    handleRequest(req, body => {
        const band = bands.find(band => band.id === req.params.id);
        if (band) {
            const songs = band.songs.map(song => song.id);

            const id =getNextIdValueBasedOnbandsize(songs)
            const song = {
                id: id,
                name: body.name
            };

            band.songs.push(song);
            send(req, res, song);
        } else {
            res.status(404).send();
        }
    });
});

// PUT
app.put('/band/:id', (req, res) => {
    const band = bands.find(band => {return band.id === req.params.id;});

    if (band) {
        handleRequest(req, body => {
        const updatedband = {
            id: band.id,
            name: body.name,
            songs: body.songs,
        };

        bands.splice(bands.indexOf(band), 1, updatedband);
        res.sendStatus(204);
        });
    } else {
        res.status(404).send();
    }
});
  
app.put('/band/:id/song/:id', (req, res) => {
    const band = bands.find(band => {
        return band.id === req.params.id;
    });

    if (band) {
        const song = band.songs.find(song => {
        return song.id === req.params.id;
        });

        if (song) {
            handleRequest(req, body => {
                const updatedsong = {
                id: song.id,
                name: body.name
                };

                band.songs.splice(band.songs.indexOf(song), 1, updatedsong);
                res.sendStatus(204);
            });
        return;
        }
    }

    res.status(404).send();
});

// DELETE
app.delete('/band/:id', (req, res) => {
    const band = bands.find(band => {
        return band.id === req.params.id;
    });

    if (band) {
        bands.splice(bands.indexOf(band), 1);
        res.sendStatus(204);
    } else {
        res.status(404).send();
    }
});
  
app.delete('/band/:id/song/:id', (req, res) => {
    const band = bands.find(band => {
        return band.id === req.params.id;
    });

    if (band) {
        const song = band.songs.find(song => {
        return song.id === req.params.id;
        });

        if (song) {
        band.songs.splice(band.songs.indexOf(song), 1);
        res.sendStatus(204);
        return;
        }
    }

    res.status(404).send();
});



const server = http.createServer(app);
server.listen(serverPort);

console.log(`Server bandening on port ${serverPort}`);   