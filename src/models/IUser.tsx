enum Gender {Male, Female}

export default interface IUser{
    name?: string;
    login: string;
    email?: string;
    password: string;
    birthDate?: Date | string;
    gender?: Gender;
    career?: string;
    post?: string;
}