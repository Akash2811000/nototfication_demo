import { userModel } from '../model/user'
import express, { Express, Request, Response } from 'express'
import { devicemodel } from '../model/device';
import * as admin from 'firebase-admin';

class UserDomain {

    async login(req: Request, res: Response) {
        var loginData = {
            email: req.body.email,
            password: req.body.password
        };

        var emailExist = await userModel.findOne({ email: loginData.email }).select('email');
        if (!emailExist) {
            return res.status(400).send("email not found");
        }
        var passwordMatch = await userModel.findOne({ email: loginData.email, password: loginData.password });
        if (!passwordMatch) {
            return res.status(400).send("password not match");
        }

        try {
            var devicedata = {
                device_id: req.body.deviceid,
                fcmtoken: req.body.fcmtoken,
                useruid: emailExist._id,
            }
            const notification_options = {
                priority: "high",
                timeToLive: 60 * 60 * 24
            };
            var deviceid = await devicemodel.find({ device_id: req.body.deviceid });

            var data = new devicemodel(devicedata);

            if (deviceid.length == 1) {
                await devicemodel.updateOne({
                    "device_id": req.body.deviceid,

                },
                    {
                        $set: {
                            useruid: emailExist._id,
                            fcmtoken: req.body.fcmtoken
                        }
                    }
                );



                //To find FCM token
                var userDevices = await devicemodel.find({ useruid: emailExist._id });
                var userData: String = emailExist.email
                var registrationToken: any = [];
                userDevices.forEach(element => {
                    registrationToken.push(element.fcmtoken);
                });
                const options = notification_options;
                const bookingSuccessfullMessage = {
                    "data": { "key": "booking" },
                    "notification": {
                        "title": "Booking successfull",
                        "body": `Hi ${userData}, thanks for choosing to stay `
                    }

                }
                //Booking Successfull Notification
                admin.messaging().sendToDevice(registrationToken, bookingSuccessfullMessage, options);
                console.log("hy from if");
                return res.status(200).send(emailExist);


            }
            else {
                await data.save();
                //To find FCM token
                var userDevices = await devicemodel.find({ useruid: emailExist._id });
                var userData: String = emailExist.email
                var registrationToken: any = [];
                userDevices.forEach(element => {
                    registrationToken.push(element.fcmtoken);
                });
                const options = notification_options;
                const bookingSuccessfullMessage = {
                    "data": { "key": "booking" },
                    "notification": {
                        "title": "Booking successfull",
                        "body": `Hi ${userData}, thanks for choosing to stay `
                    }

                }
                //Booking Successfull Notification
                admin.messaging().sendToDevice(registrationToken, bookingSuccessfullMessage, options);
                console.log("hy from else");
                return res.send(emailExist);
                // res.status(200).send("Data save")
            }


        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }


    async signUp(req: Request, res: Response) {
        var loginData = {
            email: req.body.email,
            password: req.body.password
        };

        var emailExist = await userModel.findOne({ email: loginData.email });
        if (emailExist) {
            return res.status(400).send("email alredy exist");
        }

        try {
            var data = new userModel(loginData);
            var dataSave = await data.save();
            return res.send(dataSave);
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }

}

export { UserDomain };