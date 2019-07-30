import {Document} from "mongoose";
import { ObjectId } from "bson";
import IUser from "../../Auth/Interfaces/IUser";

export default interface ITemplate extends Document {
    text: string;

    author: ObjectId | IUser
}
