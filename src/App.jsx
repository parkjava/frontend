import React from "react";
import "./App.css"
import { Route, Routes } from "react-router-dom";

// 테스트 전용
import Test from "./pages/testPage/app"
/*-------------------------------------------------------------*/

// 관리자 전용
import LoginPage from "./pages/adminPage/login/index";
import AdminPage from "./pages/adminPage/index";
import NoticePage from "./pages/adminPage/notice/index";
import NoticeCreatePage from "./pages/adminPage/notice/create/index";
import NoticeDetailPage from "./pages/adminPage/notice/detail/index";
import PenaltyListPage from "./pages/adminPage/penalty/index";
import PenaltyDetailPage from "./pages/adminPage/penalty/detail/index"
import PatrolListPage from "./pages/adminPage/patrol/index";
import PatrolDetailPage from "./pages/adminPage/patrol/detail/index";
import ControlPage from "./pages/adminPage/control/index";
import InquiryPage from "./pages/adminPage/inquiry/index";

/*-------------------------------------------------------------*/

// 사용자 전용
import MainPage from "./pages/mainPage/index";
import MainNoticePage from "./pages/mainPage/notice/index";
import MainInfoPage from "./pages/mainPage/projectInfo/index"
import MainInquiryPage from "./pages/mainPage/inquiry/index";
/*-------------------------------------------------------------*/

export default function App() {
    return (
        <>
            <div style={{height:'100vh'}}>
                <Routes>
                    {/* 테스트 페이지 */}
                    <Route path="/test" element={<Test/>}/>
                    {/*-------------------------------------------------------------*/}
                    {/* 관리자 전용 페이지*/}
                    <Route path="/" element={<AdminPage/>}/> {/* 관리자 로그인*/}
                    <Route path="/admin" element={<LoginPage/>}/> {/* 관리자 메인 페이지*/}
                    <Route path="/admin/control" element={<ControlPage/>}/>  {/* 관제페이지*/}
                    <Route path="/admin/noticelist" element={<NoticePage/>}/> {/* 관리자 공지사항*/}
                    <Route path="/admin/notice/create" element={<NoticeCreatePage/>} /> {/* 관리자 공지사항 작성*/}
                    <Route path="/admin/notice/:noticeIndex" element={<NoticeDetailPage/>} /> {/* 관리자 공지사항 상세 */}
                    <Route path="/admin/penaltylist" element={<PenaltyListPage/>}/> {/* 단속차량조회 페이지*/}
                    <Route path="/admin/penaltylist/:penaltyIndex" element={<PenaltyDetailPage/>}/>{/* 단속차량조회 상세 */}
                    <Route path="/admin/patrollist" element={<PatrolListPage/>}/> {/* 순찰일지 조회*/}
                    <Route path="/admin/patrollist/:patrolIndex" element={<PatrolDetailPage/>}/> {/* 순찰일지 상세*/}
                    <Route path="/admin/inquirylist" element={<InquiryPage/>}/>
                    {/*-------------------------------------------------------------*/}
                    {/* 사용자 전용 페이지 */}
                    <Route path="/main" element={<MainPage/>}/> {/* 사용자 메인 페이지*/}
                    <Route path="/main/noticelist" element={<MainNoticePage/>}/>{/* 사용자 공지사항 */}
                    <Route path="/main/info" element={<MainInfoPage/>}/> {/* 프로젝트 소개 */}
                    <Route path="/main/inquiry" element={<MainInquiryPage/>}/>
                    {/*-------------------------------------------------------------*/}
                </Routes>
            </div>
        </>
    );
}


