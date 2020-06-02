import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    response.json(['item', 'nome', 'ts-node-dev']);
});

app.listen(3333);
