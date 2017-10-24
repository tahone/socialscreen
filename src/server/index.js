import express from 'express';
import cors from 'cors';

import Transmit from 'react-transmit';

import {Static as Dilbert} from '../Views/Bricks/Dilbert';

function handleRender(req, res, Component) {
    Transmit.renderToString(Component).then((response) => {
        res.send(response.reactString);
    });
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

app.get('/', (req, res) => {
    res.json([
        {url: 'http://localhost:3001/dilbert1', size: 6},
        {url: 'http://localhost:3001/dilbert2', size: 3},
        {url: 'http://localhost:3001/dilbert3', size: 3},
        {component: 'Weather', props: {apiKey: '', size: 1}}
    ]);
});

// Serve requests with our handleRender function
app.get('/dilbert1', (req, res) => {
    handleRender(req, res, Dilbert)
});
app.get('/dilbert2', (req, res) => {
    handleRender(req, res, Dilbert)
});
app.get('/dilbert3', (req, res) => {
    handleRender(req, res, Dilbert)
});

// Start server
app.listen(3001);

console.log('Listening on port 3001');