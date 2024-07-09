import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <>
      <div >
        <h1>PARK JAVA</h1>
        <Link to="/login">로그인</Link>
        <Link to="/notice">공지사항</Link>
        <Link to="/admin">관리자 페이지</Link>
        <Link to="/carcheck">차량 조회</Link>
          <Link to="/Patrol">단속내역</Link>

      </div>
    </>
  );
}

export default MainPage;
