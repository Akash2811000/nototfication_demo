import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    device_id: { type: String, required: true, unique: true },
    useruid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    fcmtoken: { type: String, required: true },
    // devicetype: { type: String, required: true }
});

const devicemodel = mongoose.model('devices', deviceSchema);

export { devicemodel }