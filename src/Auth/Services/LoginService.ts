import jwt from "jsonwebtoken";
import IAuthTokens from "../Interfaces/IAuthTokens";

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
}
