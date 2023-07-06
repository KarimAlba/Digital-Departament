interface ICreatedPublicationRequest{
    type: string;
    title: string;
    review: string;
    cover: any;
    authors: any[];
    subjects: any[];
    tags: any[];
}

export default ICreatedPublicationRequest;
