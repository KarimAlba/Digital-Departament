import axiosConfig from "./axiosConfig";
import { AxiosResponse } from "axios";
import IErrorResponse from "../models/responses/IErrorResponse";

class TagsAPI {
    public static getTags(name?: string): Promise<AxiosResponse<any | IErrorResponse>> {
        return axiosConfig.get('/tags/filter', { 
            params: {name}
        });
    };
};

export default TagsAPI;
