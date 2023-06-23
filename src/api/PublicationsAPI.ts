import axiosConfig from "./axiosConfig";
import IBook from "../models/request/IBook";

class PublicationAPI {
    public static getFavourites(page: number, pageSize: number) {
        return axiosConfig.get('/favourites', { 
            params: { 
                page: page, 
                pageSize: pageSize 
            }
        });
    };

    public static getAllPublications(body: IBook) {
        return axiosConfig.get('/publications/filter', {
            params: {...body}
        });
    };
};

export default PublicationAPI;
