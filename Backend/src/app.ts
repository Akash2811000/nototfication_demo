import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import { LoggerMiddleware } from './middleware/logger';
import * as admin from 'firebase-admin';
import credential from "../notofication-demo-ccf50-firebase-adminsdk-ujm95-c534dd31ec.json";
const app: Express = express();
app.use(express.json());

import { router as userroute } from './controller/login_contoller';
// FIREBASE INTITIALIZE
admin.initializeApp(
    {
        credential: admin.credential.cert(JSON.parse(JSON.stringify(credential)))
    }
);

app.use(LoggerMiddleware);
// ROOT LEVEL
app.get('/', (req: Request, res: Response) => {
    res.send('MMT Backend development');
    res.end();
});

app.use('/user', userroute);


export { app };