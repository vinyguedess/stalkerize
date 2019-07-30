import {Schema, model} from "mongoose";
import ITemplate from "../Interfaces/ITemplate";

const schema: Schema = new Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

export default model<ITemplate>("Template", schema, "publications_template");
