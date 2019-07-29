import { Request } from "express";
import IUser from "../../Auth/Interfaces/IUser";


export default interface IRequest extends Request
{

    /**
     * Contains authenticated request user
     */
    user?:IUser;

}
