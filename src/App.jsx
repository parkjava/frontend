import { Route, Routes } from "react-router-dom";
import MainPage from "./pages//mainPage/index";
import LoginPage from "./pages/loginPage/index";
import NoticePage from "./pages/noticePage/index";
import AdminPage from "./pages/adminpage/index";
import CheckPages from "./pages/carcheckpage/index";
import PatrolLogs from "./pages/PatrolLogPage/index";
import "./App.css"
import NoticeCreatePage from "./pages/noticeCreate/index"
import NoticeDetailPage from "./pages/noticeDetail/index"
import ControlPage from "./pages/controllPage/index";
import CarDetailPage from "./pages/carDetail/index"
import PatrolDetails from "./pages/PatrolDetail";
import NoticeUser from "./pages/userpage/noticepage/components/noticeUser";
import Info from "./pages/userpage/infopage/components/projectinfo"
import React from "react";


export default function App() {
    return (
        <>
            <div style={{height:'100vh'}}>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/notice" element={<NoticePage/>}/>
                    <Route path="/noticecreate" element={<NoticeCreatePage/>} />
                    <Route path="/noticedetail" element={<NoticeDetailPage/>} />
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/admin" element={<AdminPage/>}/>
                    <Route path="/controll" element={<ControlPage/>}/>
                    <Route path="/carcheck" element={<CheckPages/>}/>
                    <Route path="/carcheck/cardetail/1" element={<CarDetailPage/>}/>
                    <Route path="/Patrol" element={<PatrolLogs/>}/>
                    <Route path="/Patrol/PatrolDetail/1" element={<PatrolDetails/>}/>
                    <Route path="/noticeUser" element={<NoticeUser/>}/>
                    <Route path="/info" element={<Info/>}/>

                </Routes>
            </div>
        </>
    );
}


