import "./App.css"
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages//mainPage/index";
import LoginPage from "./pages/loginPage/index";
import NoticePage from "./pages/noticePage/index";
import ControllPage from "./pages/controllPage/index";
import NoticeCreatePage from "./pages/noticeCreate/index"
import NoticeDetailPage from "./pages/noticeDetail/index"



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/notice" element={<NoticePage />} />
        <Route path="/noticecreate" element={<NoticeCreatePage/>} />
        <Route path="/noticedetail" element={<NoticeDetailPage/>} />
      <Route path="/login" element={<LoginPage />} />
        <Route path="/controll" element={<ControllPage/>}/>
    </Routes>
  );
}


