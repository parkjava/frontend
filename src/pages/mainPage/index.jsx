
import React from "react";
import { Link } from "react-router-dom";

// App.jsx
function MainPage() {
  return (
    <>
      <div>
        <p>메인페이지입니다.</p>
        <Link to="/login">로그인</Link>
        <Link to="/notice">공지사항</Link>
      </div>
    </>
  );
}

export default MainPage;
