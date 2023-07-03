import axiosConfig from "./axiosConfig";
import { AxiosResponse } from "axios";
import IErrorResponse from "../models/responses/IErrorResponse";

class CommentsAPI {
    public static getCommentaries(page: number, pageSize: number, id: number): Promise<AxiosResponse<any | IErrorResponse>> {
        return axiosConfig.get(`/comments/${id}`, {
            params: { 
                page: page, 
                pageSize: pageSize 
            }
        });
    };

    public static setComment(body: any) : Promise<AxiosResponse<any | IErrorResponse>> {
        return axiosConfig.post('/comments/create', {
            params: {...body}
        });
    };
};

export default CommentsAPI;
