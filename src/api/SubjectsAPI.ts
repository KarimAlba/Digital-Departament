import axiosConfig from "./axiosConfig";
import { AxiosResponse } from "axios";
import IErrorResponse from "../models/responses/IErrorResponse";

class SubjectsAPI {
    public static getSubjects(name?: string): Promise<AxiosResponse<any | IErrorResponse>>  {
        return axiosConfig.get('/subjects/filter', {
            params: {name}
        });
    };
}

export default SubjectsAPI;
