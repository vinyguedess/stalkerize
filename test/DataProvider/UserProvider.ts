import {genSaltSync, hashSync} from "bcrypt";
import IUser from "../../src/Auth/Interfaces/IUser";
import User from "../../src/Auth/Models/User";

const data: any = {};

export const get = async (): Promise<IUser> => 
{
    if (!data.user) 
    {
        data.user = new User({
            name: "Vinicius Guedes",
            email: "viniciusgued@gmail.com",
            password: hashSync("@GloryousD4y", genSaltSync(10))
        });
        await data.user.save();
    }

    return data.user;
};
