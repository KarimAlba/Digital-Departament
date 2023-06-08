import ITag from "./ITag";

export default interface IBook{
    type?: string;
    name:  string;
    author: string;
    date?: string;
    tags?: ITag[];
    subjects?: string[] | undefined;
    description?: string;
    prefer: boolean;
}