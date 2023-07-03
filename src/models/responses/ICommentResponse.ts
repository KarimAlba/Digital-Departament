import ICommentAuthorResponse from "./ICommentAuthorResponse";
import IAssetResponse from "./IAssetResponse";

interface ICommentResponse{
    id: number;
    author: ICommentAuthorResponse;
    textComment: string;
    assets: IAssetResponse[];
    creationDate: string;
}

export default ICommentResponse;
