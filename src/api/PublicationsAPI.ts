import axiosConfig from "./axiosConfig";

class PublicationAPI {
    public static getFavourites(page: number, pageSize: number) {
        return axiosConfig.get('/favourites', { 
            params: { 
                page: page, 
                pageSize: pageSize 
            }
        });
    };
}

export default PublicationAPI;
