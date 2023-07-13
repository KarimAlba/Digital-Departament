import ICommentResponse from "./ICommentResponse";

interface ITokenCommentResponse{
    data: ICommentResponse[];
    totalCount: number;
}

export default ITokenCommentResponse;
