import axiosConfig from "./axiosConfig";
import { AxiosResponse } from "axios";
import IErrorResponse from "../models/responses/IErrorResponse";
import IBook from "../models/requests/IPublicationRequest";
import IPublicationTokenResponse from "../models/responses/IPublicationsTokenResponse";
import IGotFavourites from "../models/responses/IGotFavourites";
import IServerBookResponse from "../models/responses/IServerBookResponse";

class PublicationAPI {
    public static getFavourites(page: number, pageSize: number): Promise<AxiosResponse<IGotFavourites | IErrorResponse>> {
        return axiosConfig.get('/favourites', { 
            params: { 
                page: page, 
                pageSize: pageSize 
            }
        });
    };

    public static getAllPublications(body: IBook): Promise<AxiosResponse<IPublicationTokenResponse | IErrorResponse>>  {
        return axiosConfig.get('/publications/filter', {
            params: {...body}
        });
    };

    public static updateFavourites(body: {id?: number}): Promise<AxiosResponse<boolean | IErrorResponse>>  {
        return axiosConfig.put(`/favourites/update/${body.id}`, {
            body: {
                id: body.id
            }
        });
    };

    public static getUniqPublication(id: number): Promise<AxiosResponse<IServerBookResponse | IErrorResponse>> {
        return axiosConfig.get(`/publications/${id}`);
    };

    public static createPublication(formData: FormData): Promise<AxiosResponse<boolean | IErrorResponse>> {
        return axiosConfig.post('/publications/create', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
    };
};

export default PublicationAPI;
