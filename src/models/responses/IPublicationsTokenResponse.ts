import IServerBookResponse from "./IServerBookResponse";

interface IPublicationTokenResponse{
    totalCount: number;
    data: IServerBookResponse[];
}

export default IPublicationTokenResponse;
