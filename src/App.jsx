import { Route, Routes } from "react-router-dom";
import MainPage from "./pages//mainPage/index";
import LoginPage from "./pages/loginPage/index";
import NoticePage from "./pages/noticePage/index";
import AdminPage from "./pages/adminpage/index";
import "./App.css"

import ControllPage from "./pages/controllPage/index";



export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/notice" element={<NoticePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/controll" element={<ControllPage/>}/>
        </Routes>
    );
}


