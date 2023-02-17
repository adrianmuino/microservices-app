const express = require('express');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());

const homerunData = {};

app.post('/homerun', (req, res) => {
    const id = randomBytes(8).toString('hex');
    const { title } = req.body;
    homerunData[id] = { id, title };
    res.status(201).send(homerunData[id]);
});

app.listen(5000, () => {
    console.log('HomeRun-Service is listening on port 5000');
});
