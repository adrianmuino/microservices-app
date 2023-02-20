import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/homerun/get', (req: Request, res: Response) => {
    console.log('HomeRun is working');
    res.send({ greeting: "Hello World"})
});

router.post('/api/homerun/post', (req: Request, res: Response) => {
     
});

export { router };