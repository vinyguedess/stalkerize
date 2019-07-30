import {Document} from "mongoose";
import { ObjectId } from "bson";

export default interface ITemplate extends Document {
    text: string;

    author: ObjectId
}
