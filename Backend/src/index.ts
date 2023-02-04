import mongoose from 'mongoose';
import { app } from "./app";
import * as dotenv from 'dotenv';
dotenv.config();
const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("don't defined mongo uri");
    }

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo sucesfully connect to restarant")

    } catch (error) {
        console.error(error);
    }
    app.listen(3000, () => {
        console.log("Listening restaurant on  PORT 3000!!!!!");
    });
}

start();