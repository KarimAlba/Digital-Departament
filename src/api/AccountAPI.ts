import IUser from "../models/requests/IUserRequest";
import IServerUser from "../models/responses/IServerUserResponse";
import IEditUser from "../models/requests/IEditUserRequest";
import axiosConfig from "./axiosConfig";

class AccountAPI{
    public static registration(body: IUser) {
        return axiosConfig.post('/account/sign-up', {...body});
    }

    public static autorization(body: IServerUser) {
        return axiosConfig.post('/account/sign-in', {...body});
    }

    public static edit(body: IEditUser) {
        return axiosConfig.put('/account/edit', {...body});
    }
}

export default AccountAPI;
