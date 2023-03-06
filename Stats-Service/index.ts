import express from 'express';
import mongoose from 'mongoose';
import amqp, { Channel, ConsumeMessage } from "amqplib";
import StatModel from './models/stat';

import { router } from './routes/routes';

const app = express();
app.use(express.json());
app.use(router);

async function processHomeRunMessage(msg: { content: { toString: () => any; }; }) {
  const content = JSON.parse(msg.content.toString());
  const { homerunId } = content;
  console.log(content);
  console.log(homerunId);

  const statData = {
    homerunId: homerunId,
    stats: [],
  };

  try {
    const newStat = new StatModel(statData);
    await newStat.save();
    console.log("Saved homerun event to DB");
  } catch (err) {
    console.log(err);
  } 
};

const Startup = async () => {
  try {
    await mongoose.connect('mongodb://stats-mongo-service:27017/stats');
    console.log('Connected to mongoDB');

    const amqpConnection = await amqp.connect("amqp://user:mypass@rabbitmq-service:5672", "heartbeat=30");
    console.log("Stats connected to RabbitMQ");
    const channel = await amqpConnection.createChannel();
    await channel.assertExchange("homerun-exchange", "topic", { durable: false });
    console.log("Exchange created");

    await channel.assertQueue("stats-homerun-queue", { durable: false });
    await channel.bindQueue("stats-homerun-queue", "homerun-exchange", "homerun.#");

    const consumer = (channel: Channel) => async (msg: ConsumeMessage | null): Promise<void> => {
        if (msg) {
            console.log("Processing message");
            await processHomeRunMessage(msg);
            await channel.ack(msg);
        }
    }
    await channel.consume("stats-homerun-queue", consumer(channel), { noAck: false });

  } catch (e) {
    console.log(e);
  }

  app.listen(5100, () => {
    console.log('Stats-Service listening on port 5100');
  });
};

Startup();