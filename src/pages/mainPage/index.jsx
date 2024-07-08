import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer"

function MainPage() {
  return (
    <>
      <div>
        <h1>PARK JAVA</h1>
        <Link to="/login">로그인</Link>
        <Link to="/notice">공지사항</Link>
        <Link to="/admin">관리자 페이지</Link>

      </div>
      <Footer />
    </>
  );
}

export default MainPage;
