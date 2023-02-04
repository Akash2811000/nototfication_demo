import { userModel } from '../model/user'
import express, { Express, Request, Response } from 'express'
import { devicemodel } from '../model/device';

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
            console.log("devicedata", devicedata);
            var deviceid = await devicemodel.find({ device_id: req.body.deviceid });
            console.log("deviceid", deviceid);
            var data = new devicemodel(devicedata);
            console.log("data", data);
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
                return res.send(emailExist);
                // res.status(200).send(emailExist)
            }
            else {
                await data.save();
                return res.send(emailExist);
                // res.status(200).send("Data save")
            }
            return res.send(emailExist);
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