import {Schema, model} from "mongoose";
import IUser from "../Interfaces/IUser";

const schema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export default model<IUser>("User", schema, "auth_user");
