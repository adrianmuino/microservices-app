import express, { Request, Response } from 'express';
import amqp from "amqplib";
import StatModel from '../models/stat';

import { randomBytes } from "crypto";

const router = express.Router();

router.get('/api/stats/:homerunId', (req: Request, res: Response) => {
    const homerunId = req.params.homerunId;
    StatModel.find({ homerunId: homerunId }, (err: any, stats: any) => {
        if (err) {
            res.status(500).send(err);
        } else {

            res.status(200).send(stats);
        }
    });
});

    router.post('/api/stats/:homerunId', async (req: Request, res: Response) => {
        const { stat } = req.body;
        const statId = randomBytes(4).toString("hex");
        const homerunId = req.params.homerunId;
        const statData = { stat: stat, statId: statId};
        const msg = { stat: stat, statId: statId, homerunId: homerunId };

        try {
            await StatModel.updateOne({ homerunId: homerunId }, { $push: { stats: statData } });
            console.log(`Stat ${statId} saved to homerun ${homerunId}`);

            const amqpConnection = await amqp.connect("amqp://user:mypass@rabbitmq-service:5672");
            console.log("Stats API connected to RabbitMQ");
            const channel = await amqpConnection.createChannel();
            await channel.assertExchange("homerun-exchange", "topic", { durable: false });
            console.log("Exchange created");
            await channel.publish("homerun-exchange", "stat", Buffer.from(JSON.stringify(msg)));
            console.log("Stat published to RabbitMQ");
            res.status(201).send(statData);

        } catch (err) {
            res.status(500).send("error " + err);
        }
    });

    export { router };