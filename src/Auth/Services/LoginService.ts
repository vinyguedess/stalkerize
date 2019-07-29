import jwt from "jsonwebtoken";
import IAuthTokens from "../Interfaces/IAuthTokens";
import User from "../Models/User";


export default class LoginService 
{
    public login(user): IAuthTokens 
    {
        return {
            access_token: jwt.sign(
                {
                    id: user._id
                },
                process.env.SECRET_KEY
            )
        };
    }

    public check(accessToken:string) {
        const payload = jwt.decode(accessToken) as any;
        console.log(accessToken, payload);
        return User.findById(payload.id).then(user => {
            console.log(user)
            return User.find().then(users => {
                console.log(users);

                return user;
            })
        });
    }

}
