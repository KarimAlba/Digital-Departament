import axiosConfig from "./axiosConfig";
import { AxiosResponse } from "axios";
import IErrorResponse from "../models/responses/IErrorResponse";
import IBook from "../models/requests/IPublicationRequest";

class PublicationAPI {
    public static getFavourites(page: number, pageSize: number): Promise<AxiosResponse<any | IErrorResponse>> {
        return axiosConfig.get('/favourites', { 
            params: { 
                page: page, 
                pageSize: pageSize 
            }
        });
    };

    public static getAllPublications(body: IBook): Promise<AxiosResponse<any | IErrorResponse>>  {
        return axiosConfig.get('/publications/filter', {
            params: {...body}
        });
    };

    public static getAuthors(name?: string): Promise<AxiosResponse<any | IErrorResponse>>  {
        return axiosConfig.get('/authors/filter', {
            params: {name}
        });
    };

    public static getSubjects(name?: string): Promise<AxiosResponse<any | IErrorResponse>>  {
        return axiosConfig.get('/subjects/filter', {
            params: {name}
        });
    };

    public static updateFavourites(body: {id?: number}): Promise<AxiosResponse<any | IErrorResponse>>  {
        return axiosConfig.put(`/favourites/update/${body.id}`, {
            body: {
                id: body.id
            }
        });
    };
};

export default PublicationAPI;
