import React from 'react';
import {Link} from "react-router-dom";

export default function Index() {
    return (
        <>
            <div>
                여기는 관리자 전용 페이지
                <Link to={'/test'}>쿠키 테스트</Link>
            </div>
        </>
    );
}