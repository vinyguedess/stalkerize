import {Schema, model} from "mongoose";
import IPost from "../Interfaces/IPost";

const schema: Schema = new Schema({
    text: {
        type: String,
        required: true
    },
    post_at: {
        type: Date,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

export default model<IPost>("Post", schema, "publications_post");
