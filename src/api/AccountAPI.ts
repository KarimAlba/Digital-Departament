import IUser from "../models/requests/IUserRequest";
import IServerUser from "../models/responses/IServerUserResponse";
import IEditUser from "../models/requests/IEditUserRequest";
import axiosConfig from "./axiosConfig";
import { AxiosResponse } from "axios";
import IErrorResponse from "../models/responses/IErrorResponse";

class AccountAPI{
    public static registration(body: IUser): Promise<AxiosResponse<any | IErrorResponse>> {
        return axiosConfig.post('/account/sign-up', {...body});
    }

    public static autorization(body: IServerUser): Promise<AxiosResponse<any | IErrorResponse>> {
        return axiosConfig.post('/account/sign-in', {...body});
    }

    public static edit(body: IEditUser): Promise<AxiosResponse<any | IErrorResponse>> {
        return axiosConfig.put('/account/edit', {...body});
    }
}

export default AccountAPI;
