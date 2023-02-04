import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import { LoggerMiddleware } from './middleware/logger';
const app: Express = express();
app.use(express.json());

import { router as userroute } from './controller/login_contoller';

app.use(LoggerMiddleware);
// ROOT LEVEL
app.get('/', (req: Request, res: Response) => {
    res.send('MMT Backend development');
    res.end();
});

app.use('/user', userroute);


export { app };