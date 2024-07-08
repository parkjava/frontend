import { Route, Routes } from "react-router-dom";
import MainPage from "./pages//mainPage/index";
import LoginPage from "./pages/loginPage/index";
import NoticePage from "./pages/noticePage/index";
import AdminPage from "./pages/adminpage/index";
import CheckPages from "./pages/carcheckpage/index";
import PatrolLogs from "./pages/PatrolLogPage/index";
import "./App.css"

import ControllPage from "./pages/controllPage/index";
import CarDetailPage from "./pages/carDetail/index"
import PatrolDetails from "./pages/PatrolDetail";



export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/notice" element={<NoticePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/controll" element={<ControllPage/>}/>
            <Route path="/carcheck" element={<CheckPages/>}/>
            <Route path="/carcheck/cardetail/1" element={<CarDetailPage/>}/>
            <Route path="/Patrol" element={<PatrolLogs/>}/>
            <Route path="/Patrol/PatrolDetail/1" element={<PatrolDetails/>}/>
        </Routes>
    );
}


