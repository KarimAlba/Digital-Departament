import EnumGender from "../request/EnumGender";

export default interface IServerUser{
    role?: number;
    name?: string;
    login: string;
    email?: string;
    password?: string;
    birthDate?: Date | string;
    gender?: EnumGender;
    career?: {
        id?: number,
        value: string
    }[];
    post?: {
        id?: number,
        value: string
    }[];
    canPublish?: boolean;
    creationDate?: string;
}