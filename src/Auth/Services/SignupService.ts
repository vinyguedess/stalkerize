import { hashSync } from "bcrypt";
import BaseService from "../../Main/Services/BaseService";
import User from "../Models/User";


export default class SignupService extends BaseService
{

    public register(data)
    {
        return this.checkUserAlreadyExists(data.email).then(userExists => {
                if (userExists)
                    return Promise.resolve(false);
    
                data.password = hashSync(data.password, 8)
    
                const user = new User(data);    
                return user.save().then(() => true);
            }
        );
    }

    private checkUserAlreadyExists(email: string): Promise<boolean>
    {
        return User.countDocuments({ email })
            .then((totalUsers:number) => totalUsers > 0);
    }

}