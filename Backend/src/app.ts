import express, { Express, Request, Response } from 'express';

import { LoggerMiddleware } from './middleware/logger';
import * as admin from 'firebase-admin';
import credential from "../notofication-demo-ccf50-firebase-adminsdk-ujm95-c534dd31ec.json";
const app: Express = express();
app.use(express.json());

import { router as userroute } from './controller/login_contoller';

var registrationToken = "AAAAT-qSNUc:APA91bEqT5SdTKr9mUllVITl5N7ob-WXswmeWaXy36crJ9IFGpYxskLpMypVsQ_KZHzXoN-NhovjM-2RsPP7TlP1rKCyNN3z8dorSlqwkEhPIuvHNAeyrngynxTIFYfaUo5cxsHTH09Y";

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

app.use('/user', userroute);
admin.messaging().sendToDevice(registrationToken, payload, options)
    .then(function (response) {
        console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
        console.log("Error sending message:", error);
    });

export { app };