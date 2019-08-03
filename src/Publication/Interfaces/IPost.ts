import { ObjectId } from "bson";
import { Document } from "mongoose";
import IUser from "../../Auth/Interfaces/IUser";

export default interface IPost extends Document {
    text: string;

    post_at: Date;

    author: ObjectId | IUser
}