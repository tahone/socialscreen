import express from 'express';
import cors from 'cors';

import React from 'react';
import {renderToString} from 'react-dom/server';
import Transmit from 'react-transmit';

import {Static} from '../Views/Bricks/Dilbert';

function handleRender(req, res) {
    // Renders our Hello component into an HTML string
    Transmit.renderToString(Static).then((response) => {
        console.log('Transmit', response.reactString, response.reactData);
        res.send(response.reactString);
    });

    // Load contents of index.html
    /*
    fs.readFile('./index.html', 'utf8', function (err, data) {
        if (err) throw err;

        // Inserts the rendered React HTML into our main div
        const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);

        // Sends the response back to the client
        res.send(document);
    });
    */
}

const app = express();

app.options('*', cors({
    optionsSuccessStatus: 200,
    origin: /.+/
}));
app.use('*', cors({
    optionsSuccessStatus: 200,
    origin: /.+/
}));

app.get('/announce', (req, res) => {
    res.json([
        {url: 'http://localhost:3001', size: 6}
    ]);
});

// Serve requests with our handleRender function
app.get('*', handleRender);

// Start server
app.listen(3001);

console.log('Listening on port 3001');