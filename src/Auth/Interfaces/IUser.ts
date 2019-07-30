import { ObjectID } from "bson";
import {Document} from "mongoose";
import IOrganization from "../../Organization/Interfaces/IOrganization";

export default interface IUser extends Document {
    name: string;

    email: string;

    password: string;

    organization: ObjectID | IOrganization
}
