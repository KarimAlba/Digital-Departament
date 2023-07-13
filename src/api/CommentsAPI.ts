import axiosConfig from "./axiosConfig";
import { AxiosResponse } from "axios";
import IErrorResponse from "../models/responses/IErrorResponse";
import ITokenCommentResponse from "../models/responses/ITokenCommentResponse";

class CommentsAPI {
    public static getCommentaries(page: number, pageSize: number, id: number): Promise<AxiosResponse<ITokenCommentResponse | IErrorResponse>> {
        return axiosConfig.get(`/comments/${id}`, {
            params: { 
                page: page, 
                pageSize: pageSize 
            }
        });
    };

    public static setComment(formData: FormData) : Promise<AxiosResponse<boolean | IErrorResponse>> {
        return axiosConfig.post('/comments/create', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
    };
};

export default CommentsAPI;
