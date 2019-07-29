import {Document} from "mongoose";

export default interface ITemplate extends Document {
    text: string;
}
