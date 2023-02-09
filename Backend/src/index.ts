import mongoose from 'mongoose';
import { app } from "./app";
const start = async () => {
    // if (!process.env.MONGO_URI) {
    //     throw new Error("don't defined mongo uri");
    // }

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect("mongodb+srv://nidhi:Nidhi%400905@nasa.uvkxz6f.mongodb.net/test?tls=true&tlsInsecure=true");
        console.log("mongo sucesfully connect to restarant")

    } catch (error) {
        console.error(error);
    }
    app.listen(8000, () => {
        console.log("Listening restaurant on  PORT 3000!!!!!");
    });
}

start();