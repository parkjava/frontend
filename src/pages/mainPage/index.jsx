import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <>
      <div>
        <h1>PARK JAVA 사용자</h1>
        <Link to="/notice">공지사항</Link><br/>
        <Link to="/noticeUser">사용자공지</Link><br/>
        <Link to="/info">프로젝트소개</Link><br/>
        <Link to="/info">문의하기</Link><br/>
      </div>
    </>
  );
}

