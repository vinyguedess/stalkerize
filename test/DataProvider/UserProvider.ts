import {genSaltSync, hashSync} from "bcrypt";
import IAuthTokens from "../../src/Auth/Interfaces/IAuthTokens";
import IUser from "../../src/Auth/Interfaces/IUser";
import LoginService from "../../src/Auth/Services/LoginService";
import User from "../../src/Auth/Models/User";
import IOrganization from "../../src/Organization/Interfaces/IOrganization";
import Organization from "../../src/Organization/Models/Organization";

const data: any = {};

export const getOrganization = async (name:string = "Stalkerize"): Promise<IOrganization> => {
    if (!data.organization || await Organization.countDocuments() <= 0)
    {
        data.organization = new Organization({ name })
        await data.organization.save();
    }

    return data.organization;
}

export const get = async (): Promise<IUser> => 
{
    if (!data.user || await User.countDocuments() <= 0) 
    {
        const organization: IOrganization = await getOrganization();
        data.user = new User({
            name: "Vinicius Guedes",
            email: "viniciusgued@gmail.com",
            password: hashSync("@GloryousD4y", genSaltSync(10)),
            organization: organization.id
        });
        await data.user.save();
    }

    return data.user;
};

export const getAccessToken = async ():Promise<IAuthTokens> =>
    get().then(user => new LoginService().login(user));
