import express from 'express';
import mongoose from 'mongoose';
import amqp, { Channel, ConsumeMessage } from "amqplib";
import QueryModel from './models/query';

import { router } from './routes/routes';

const app = express();
app.use(express.json());
app.use(router);

async function processStatMessage(msg: { content: { toString: () => any; }; }) {
  const content = JSON.parse(msg.content.toString());
  const { stat, statId, homerunId } = content;
  console.log(stat, statId, homerunId);
  const statData = { stat: stat, statId: statId};
  await mongoose.model('Query').updateOne({ homerunId: homerunId }, { $push: { stats: statData } });
  console.log("Saved stat to DB");
};


async function processHomerunMessage(msg: { content: { toString: () => any; }; }) {
  const content = JSON.parse(msg.content.toString());
  const { homerun, homerunId } = content;
  console.log(homerun, homerunId);

  const queryData = {
    homerun: homerun,
    homerunId: homerunId,
    stats: []
  };

  try {
    const newQuery = new QueryModel(queryData);
    await newQuery.save();
    console.log("Saved homerun event to DB");
  } catch (err) {
    console.log(err);
  } 
};

const Startup = async () => {
  try {
    await mongoose.connect('mongodb://query-mongo-service:27017/query');
    console.log('Connected to MongoDB');

    const amqpConnection = await amqp.connect("amqp://user:mypass@rabbitmq-service:5672", "heartbeat=30");
    console.log("Query connected to RabbitMQ");
    const channel = await amqpConnection.createChannel();
    await channel.assertExchange("homerun-exchange", "topic", { durable: false });
    console.log("Exchange created");

    await channel.assertQueue("query-stats-queue", { durable: false });
    await channel.bindQueue("query-stats-queue", "homerun-exchange", "stat.#");

    const consumer = (channel: Channel) => async (msg: ConsumeMessage | null): Promise<void> => {
        if (msg) {
            console.log("Processing message");
            await processStatMessage(msg);
            await channel.ack(msg);
        }
    }

    await channel.consume("query-stats-queue", consumer(channel), { noAck: false });

    await channel.assertQueue("query-homerun-queue", { durable: false });
    await channel.bindQueue("query-homerun-queue", "homerun-exchange", "homerun.#");
    await channel.consume("query-homerun-queue", consumer(channel), { noAck: false });


  } catch (e) {
    console.log(e);
  }

  app.listen(5200, () => {
    console.log('Query-Service listening on port 5200');
  });
};

Startup();