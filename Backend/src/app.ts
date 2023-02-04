import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
import { LoggerMiddleware } from './middleware/logger';
const app: Express = express();
app.use(express.json());

// ROOT LEVEL
app.get('/', (req: Request, res: Response) => {
    res.send('MMT Backend development');
    res.end();
});
app.use(LoggerMiddleware);

export { app };