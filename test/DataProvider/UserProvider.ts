import {genSaltSync, hashSync} from "bcrypt";
import IAuthTokens from "../../src/Auth/Interfaces/IAuthTokens";
import IUser from "../../src/Auth/Interfaces/IUser";
import LoginService from "../../src/Auth/Services/LoginService";
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

export const getAccessToken = async ():Promise<IAuthTokens> =>
    get().then(user => new LoginService().login(user));
