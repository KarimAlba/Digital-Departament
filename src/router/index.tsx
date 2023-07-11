import { Routes, Route } from "react-router-dom";
import Autorization from "../components/views/Autorization";
import Main from "../components/views/MainPage";
import Registration from "../components/views/Registration";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Autorization/>}/>
            <Route path='registration' element={<Registration/>}/>
            <Route path='main/*' element={<Main/>}/>
            <Route path='*' element={<h1>Сломався...</h1>}/>
        </Routes>
    )
}

export default Router;
