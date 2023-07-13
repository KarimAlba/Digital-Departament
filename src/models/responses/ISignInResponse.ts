import IServerUser from "./IServerUserResponse"

interface ISignInResponse{
    user: IServerUser;
    token: string;
}

export default ISignInResponse;
