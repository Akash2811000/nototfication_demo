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
            console.log('1');

            const notification_options = {
                priority: "high",
                timeToLive: 60 * 60 * 24
            };
            console.log('2');
            var deviceid = await devicemodel.find({ device_id: req.body.deviceid });
            console.log('3');
            var data = new devicemodel(devicedata);
            console.log('4');
            if (deviceid.length == 1) {
                console.log('6');

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
                console.log('7');




                //To find FCM token
                var userDevices = await devicemodel.find({ useruid: emailExist._id });
                var userData: String = emailExist.email
                var registrationToken: any = [];
                console.log('8');

                userDevices.forEach(element => {
                    registrationToken.push(element.fcmtoken);
                });
                console.log('9');

                const options = notification_options;
                const bookingSuccessfullMessage = {
                    "data": { "key": "booking" },
                    "notification": {
                        "title": "Booking successfull",
                        "body": `Hi ${userData}, thanks for choosing to stay `
                    }

                }
                console.log('10');

                //Booking Successfull Notification
                admin.messaging().sendToDevice(registrationToken, bookingSuccessfullMessage, options);
                console.log("hy from if");
                return res.status(200).send(emailExist);


            }
            else {
                console.log('else');

                await data.save();
                //To find FCM token
                var userDevices = await devicemodel.find({ useruid: emailExist._id });
                var userData: String = emailExist.email
                var registrationToken: any = [];
                console.log('else 1');
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
                console.log('else 2');
                //Booking Successfull Notification
                admin.messaging().sendToDevice(registrationToken, bookingSuccessfullMessage, options);
                console.log("hy from else");
                console.log('else 4');
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