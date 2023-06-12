import EnumGender from "./EnumGender";

interface IEditUser{
    name: string;
    login: string;
    email: string;
    gender: EnumGender;
    birthDate: string;
    career: string;
    post: string;
}

export default IEditUser;