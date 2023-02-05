import mongoose from 'mongoose';
import { app } from "./app";
const start = async () => {
    // if (!process.env.MONGO_URI) {
    //     throw new Error("don't defined mongo uri");
    // }

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect("mongodb+srv://akash2000:akash@nodelearning.loubutj.mongodb.net/notification");
        console.log("mongo sucesfully connect to restarant")

    } catch (error) {
        console.error(error);
    }
    app.listen(3000, () => {
        console.log("Listening restaurant on  PORT 3000!!!!!");
    });
}

start();