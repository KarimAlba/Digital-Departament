interface IServerBookResponse{
    id: number;
    userId: number;
    type: number;
    title: string;
    review: string;
    authors: {
        id: number;
        name: string;
    }[];
    subjects: {
        id: number;
        name: string;
    }[];
    tags: {
        id: number;
        name: string;
    }[];
    isFavourite: boolean;
    releaseDate: string;
    creationDate: string;
    coverPath: string;
    filePath: string;
}

export default IServerBookResponse;
