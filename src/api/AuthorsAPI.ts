import { AxiosResponse } from "axios";
import IErrorResponse from "../models/responses/IErrorResponse";
import axiosConfig from "./axiosConfig";

class AuthorsAPI{
    public static getAuthors(name?: string): Promise<AxiosResponse<any | IErrorResponse>>  {
        return axiosConfig.get('/authors/filter', {
            params: {name}
        });
    };
}

export default AuthorsAPI;
