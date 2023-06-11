import IUser from "../models/IUser";
import IServerUser from "../models/IServerUser";
import axiosConfig from "./axiosConfig";

class AccountAPI{
    public static registration(body: IUser) {
        return axiosConfig.post('/account/sign-up', {...body});
    }

    public static autorization(body: IServerUser) {
        return axiosConfig.post('/account/sign-in', {...body});
    }
}

export default AccountAPI;
