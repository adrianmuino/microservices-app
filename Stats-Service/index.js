const express = require('express');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());

const statsByHomerunID = {};

app.post('/homerun/:id/stats', (req, res) => {
    const statID = randomBytes(8).toString('hex');
    const { stat } = req.body;
    const stats = statsByHomerunID[req.params.id] || [];
    stats.push({ id: statID, stat });
    statsByHomerunID[req.params.id] = stats;
    res.status(201).send(stats);
});

app.get('/homerun/:id/stats', (req, res) => {
    res.send(statsByHomerunID[req.params.id] || []);
});

app.listen(5100, () => {
    console.log('Stats-Service is listening on port 5100');
});
