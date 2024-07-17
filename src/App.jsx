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
import NoticeEditPage from "./pages/adminPage/notice/noticeupdate/index"; //
import PenaltyListPage from "./pages/adminPage/penalty/index";
import PenaltyDetailPage from "./pages/adminPage/penalty/detail/index"
import PatrolListPage from "./pages/adminPage/patrol/index";
import PatrolCreatePage from "./pages/adminPage/patrol/create/index";
import PatrolUpdatePage from "./pages/adminPage/patrol/detail/update";
import PatrolDetailPage from "./pages/adminPage/patrol/detail/index";
import ControlPage from "./pages/adminPage/control/index";
import InquiryPage from "./pages/adminPage/inquiry/index";
import InquiryDetailPage from "./pages/adminPage/inquiry/deatail/index"
import InquiryEdit from "./pages/adminPage/inquiry/update";
import PatrolCreate from "./pages/adminPage/patrol/create/index";

/*-------------------------------------------------------------*/

// 사용자 전용
import MainPage from "./pages/mainPage/index";
import MainProjectInfoPage from "./pages/mainPage/projectInfo/index"
import MainCreatorIngoPage from "./pages/mainPage/creator/index";
import MainNoticePage from "./pages/mainPage/notice/index";
import MainNoticeDetailPage from "./pages/mainPage/notice/detail/index";
import MainInquiryPage from "./pages/mainPage/inquiry/index";

/*-------------------------------------------------------------*/

export default function App() {
    return (
        <>
                <Routes>
                    {/* 테스트 페이지 */}
                    <Route path="/test" element={<Test/>}/>
                    {/*-------------------------------------------------------------*/}
                    {/* 관리자 전용 페이지*/}
                    <Route path="/" element={<AdminPage/>}/> {/* 관리자 로그인*/}
                    <Route path="/login" element={<LoginPage/>}/> {/* 관리자 메인 페이지*/}
                    <Route path="/admin/control" element={<ControlPage/>}/>  {/* 관제페이지*/}
                    <Route path="/admin/notice" element={<NoticePage/>}/> {/* 관리자 공지사항 페이지*/}
                    <Route path="/admin/notice/create" element={<NoticeCreatePage/>} /> {/* 관리자 공지사항 작성*/}
                    <Route path="/admin/notice/update/:noticeIndex" element={<NoticeEditPage />} /> {/*관리자 공지사항 수정*/}
                    <Route path="/admin/notice/:noticeIndex" element={<NoticeDetailPage/>} /> {/* 관리자 공지사항 상세 */}
                    <Route path="/admin/penalty" element={<PenaltyListPage/>}/> {/* 단속차량조회 페이지*/}
                    <Route path="/admin/penalty/:penaltyIndex" element={<PenaltyDetailPage/>}/>{/* 단속차량조회 상세 */}
                    <Route path="/admin/patrol" element={<PatrolListPage/>}/> {/* 순찰일지 조회*/}
                    <Route path="/admin/patrol/create" element={<PatrolCreatePage/>} /> {/* 순찰일지 작성*/}
                    <Route path="/admin/patrol/:patrolIndex" element={<PatrolDetailPage/>}/> {/* 순찰일지 상세*/}
                    <Route path="/admin/patrol/update/:patrolIndex" element={<PatrolUpdatePage/>}/>
                    <Route path="/admin/inquiry" element={<InquiryPage/>}/>
                    <Route path="/admin/inquiry/:inquiryIndex" element={<InquiryDetailPage/>}/>
                    <Route path="/admin/inquiry/update/:inquiryIndex" element={<InquiryEdit />} />
                    <Route path="/admin/patrol/create" element={<PatrolCreate/>}/>
                    {/*-------------------------------------------------------------*/}
                    {/* 사용자 전용 페이지 */}
                    <Route path="/main" element={<MainPage/>}/> {/* 사용자 메인 페이지*/}
                    <Route path="/main/notice" element={<MainNoticePage/>}/>{/* 사용자 공지사항 */}
                    <Route path="/main/notice/:noticeIndex" element={<MainNoticeDetailPage/>}/>{/* 사용자 공지사항 디테일 */}
                    <Route path="/main/info" element={<MainProjectInfoPage/>}/> {/* 프로젝트 소개 */}
                    <Route path="/main/creator" element={<MainCreatorIngoPage/>}/>
                    <Route path="/main/inquiry" element={<MainInquiryPage/>}/> {/* 문의 등록 페이지*/}
                    {/*-------------------------------------------------------------*/}
                </Routes>
        </>
    );
}


