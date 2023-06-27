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

    public static getAuthors(name?: string) {
        return axiosConfig.get('/authors/filter', {
            params: {name}
        });
    };

    public static getSubjects(name?: string) {
        return axiosConfig.get('/subjects/filter', {
            params: {name}
        });
    };

    public static updateFavourites(body: {id?: number}) {
        return axiosConfig.put(`/favourites/update/${body.id}`, {
            Body: {
                id: body.id
            }
        });
    };
};

export default PublicationAPI;
