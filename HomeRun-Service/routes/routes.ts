import express, { Request, Response } from 'express';
import amqp from "amqplib";
import HomeRunModel from '../models/homerun';

import { randomBytes } from "crypto";

const router = express.Router();

router.get('/api/homerun/', (req: Request, res: Response) => {
    HomeRunModel.find({}, (err: any, homerun: any) => {
        if (err) {
            res.send(err);
        }
        res.status(200).json(homerun);
    });
});

router.post('/api/homerun/', async (req: Request, res: Response) => {
    const { player } = req.body;
    const homerunId = randomBytes(4).toString("hex");
    const homerunData = { player, homerunId };
    try {
        const newHomeRun = new HomeRunModel(homerunData);
        await newHomeRun.save();
        console.log("Saved homerun to DB");

        const amqpConnection = await amqp.connect("amqp://user:mypass@rabbitmq-service:5672");
        console.log("HomeRun connected to RabbitMQ");
        const channel = await amqpConnection.createChannel();
        await channel.assertExchange("homerun-exchange", "topic", { durable: false });
        console.log("Exchange created");
        await channel.publish("homerun-exchange", "homerun", Buffer.from(JSON.stringify(homerunData)));
        console.log("Published to RabbitMQ");
        res.status(201).send(homerunData);

    } catch (err) {
        res.status(500).send("error " + err);
    }
});

export { router };