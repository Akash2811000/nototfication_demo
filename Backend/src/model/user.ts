import mongoose from "mongoose";

const userSchme = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true }
});

const userModel = mongoose.model('users', userSchme);

export { userModel }