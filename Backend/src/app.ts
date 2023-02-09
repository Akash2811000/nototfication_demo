import express, { Express, Request, Response } from 'express';

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

var payload = {
    notification: {
        title: "Account Deposit",
        body: "A deposit to your savings account has just cleared."
    },
    data: {
        account: "Savings",
        balance: "$3020.25"
    }
};
var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};


app.use(LoggerMiddleware);
// ROOT LEVEL
app.get('/', (req: Request, res: Response) => {
    res.send('MMT Backend development');
    res.end();
});
const message = {
    notification: {
      title: '$FooCorp up 1.43% on the day',
      body: '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.'
    },
    topic:"Events"
  };
app.use('/user', userroute);

admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
});

export { app };
