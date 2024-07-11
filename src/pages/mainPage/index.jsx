import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <>
        <div style={{textAlign:"center"}}>
            <h1>PARK JAVA 사용자</h1>
            <Link to="/main/info">프로젝트소개</Link><br/>
            <Link to="/main/creator">만든 이</Link><br/>
            <Link to="/main/notice">공지사항</Link><br/>
            <Link to="/main/inquiry">문의하기</Link><br/>
        </div>
    </>
  );
}

