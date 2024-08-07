import React from "react";
import "./App.css"
import {Route, Routes} from "react-router-dom";
// 테스트 전용
import Test from "./pages/testPage/app"
/*-------------------------------------------------------------*/
// 메인 페이지
import MainPage from "./pages/index"
import NotFound from './NotFound'
// 관리자 전용
import LoginPage from "./pages/adminPage/login/index";
import AdminPage from "./pages/adminPage/index";
import NoticePage from "./pages/adminPage/notice/index";
import NoticeCreatePage from "./pages/adminPage/notice/create/index";
import NoticeDetailPage from "./pages/adminPage/notice/detail/index";
import NoticeEditPage from "./pages/adminPage/notice/update/index"; //
import PenaltyListPage from "./pages/adminPage/penalty/index";
import PenaltyDetailPage from "./pages/adminPage/penalty/detail/index"
import PatrolListPage from "./pages/adminPage/patrol/index";
import PatrolCreatePage from "./pages/adminPage/patrol/create/index";
import PatrolUpdatePage from "./pages/adminPage/patrol/update/index";
import PatrolDetailPage from "./pages/adminPage/patrol/detail/index";
import ControlPage from "./pages/adminPage/control/index";
import InquiryPage from "./pages/adminPage/inquiry/index";
import InquiryDetailPage from "./pages/adminPage/inquiry/detail/index"
import InquiryEdit from "./pages/adminPage/inquiry/update/index";
/*-------------------------------------------------------------*/
// 사용자 전용
import UserPage from "./pages/userPage/index";
import UserProjectInfoPage from "./pages/userPage/projectInfo/index"
import UserCreatorIngoPage from "./pages/userPage/creator/index";
import UserNoticePage from "./pages/userPage/notice/index";
import UserNoticeDetailPage from "./pages/userPage/notice/detail/index";
import UserInquiryPage from "./pages/userPage/inquiry/newindex";


/*-------------------------------------------------------------*/

export default function App() {
    return (
        <>
            <Routes>
                {/* 테스트 페이지 */}
                <Route path="/test" element={<Test/>}/>


                {/* 메인 페이지*/}
                <Route path="/" element={<MainPage/>}/>

                {/*없는 페이지 갈 때 ?*/}
                <Route path={"/user/*"} element={<NotFound/>}/>
                <Route path={"/admin/*"} element={<NotFound/>}/>
                <Route path={"*"} element={<NotFound/>}/>

                {/* 관리자 전용 페이지*/}
                <Route path="/login" element={<LoginPage/>}/> {/* 관리자 로그인*/}
                <Route path="/admin" element={<AdminPage/>}/> {/* 관리자 메인 페이지*/}
                <Route path="/admin/control" element={<ControlPage/>}/> {/* 관제페이지*/}
                <Route path="/admin/notice" element={<NoticePage/>}/> {/* 관리자 공지사항 페이지*/}
                <Route path="/admin/notice/create" element={<NoticeCreatePage/>}/> {/* 관리자 공지사항 작성*/}
                <Route path="/admin/notice/update/:noticeIndex" element={<NoticeEditPage/>}/> {/*관리자 공지사항 수정*/}
                <Route path="/admin/notice/:noticeIndex" element={<NoticeDetailPage/>}/> {/* 관리자 공지사항 상세 */}
                <Route path="/admin/penalty" element={<PenaltyListPage/>}/> {/* 단속차량조회 페이지*/}
                <Route path="/admin/penalty/:penaltyIndex" element={<PenaltyDetailPage/>}/>{/* 단속차량조회 상세 */}
                <Route path="/admin/patrol" element={<PatrolListPage/>}/> {/* 순찰일지 조회*/}
                <Route path="/admin/patrol/create" element={<PatrolCreatePage/>}/> {/* 순찰일지 작성*/}
                <Route path="/admin/patrol/:patrolIndex" element={<PatrolDetailPage/>}/> {/* 순찰일지 상세*/}
                <Route path="/admin/patrol/update/:patrolIndex" element={<PatrolUpdatePage/>}/>
                <Route path="/admin/inquiry" element={<InquiryPage/>}/>
                <Route path="/admin/inquiry/:inquiryIndex" element={<InquiryDetailPage/>}/>
                <Route path="/admin/inquiry/update/:inquiryIndex" element={<InquiryEdit/>}/>

                {/* 사용자 전용 페이지 */}
                <Route path="/user" element={<UserPage/>}/> {/* 사용자 메인 페이지*/}
                <Route path="/user/notice" element={<UserNoticePage/>}/>{/* 사용자 공지사항 */}
                <Route path="/user/notice/:noticeIndex" element={<UserNoticeDetailPage/>}/>{/* 사용자 공지사항 디테일 */}
                <Route path="/user/info" element={<UserProjectInfoPage/>}/> {/* 프로젝트 소개 */}
                <Route path="/user/creator" element={<UserCreatorIngoPage/>}/>
                <Route path="/user/inquiry" element={<UserInquiryPage/>}/> {/* 문의 등록 페이지*/}
            </Routes>
        </>
    );
}


