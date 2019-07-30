import { hashSync } from "bcrypt";
import BaseService from "../../Main/Services/BaseService";
import IOrganization from "../../Organization/Interfaces/IOrganization";
import Organization from "../../Organization/Models/Organization";
import User from "../Models/User";


export default class SignupService extends BaseService
{

    public register(data)
    {
        return this.checkUserAlreadyExists(data.email).then(async userExists => {
                if (userExists)
                    return Promise.resolve(false);

                const organization: IOrganization = await this.registerOrganization(data);
    
                data.password = hashSync(data.password, 8);
                data.organization = organization._id;
    
                const user = new User(data);
                return user.save().then(() => user);
            }
        );
    }

    private checkUserAlreadyExists(email: string): Promise<boolean>
    {
        return User.countDocuments({ email })
            .then((totalUsers:number) => totalUsers > 0);
    }

    private registerOrganization(data): Promise<IOrganization> {
        const organization: IOrganization = new Organization({ name: data.organization })
        return organization.save()
            .then(() => organization);
    }

}