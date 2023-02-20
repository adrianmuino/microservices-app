import express, { Router } from 'express';
import mongoose, { mongo } from 'mongoose';
import { router } from './routes/routes';

const app = express();
app.use(express.json());
app.use(router);

const Startup = async() => {
    try{
        await mongoose.connect('mongodb://homerun-mongo-service:27017/homerun');
        console.log('connected to mongodb');
    } catch(e) {
        console.log(e);
    }

    app.listen(5000, () => {
        console.log('HomeRun-Service is listening on port 5000');
    });
};

Startup(); 
