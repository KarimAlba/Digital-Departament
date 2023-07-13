import IServerBookResponse from "./IServerBookResponse";

interface IGotFavourites{
    totalCount: number;
    data: IServerBookResponse[];
}

export default IGotFavourites;
