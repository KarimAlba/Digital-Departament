export default interface IBook{
    type?: string;
    name:  string;
    author: string;
    date?: string;
    tags?: string;
    subjects?: string;
    description?: string;
    prefer: boolean;
}