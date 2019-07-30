import {Schema, model} from "mongoose";
import IOrganization from "../Interfaces/IOrganization";

const schema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

export default model<IOrganization>("Organization", schema, "organization_name");
