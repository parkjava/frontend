import React from 'react';
import '../../static/header.css'
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import Logo from '../../static/images/logo.png'

export default function Header() {
    return (
        <>
            <nav className={'header'}>
                <Link to="/">
                    <Image src={Logo} className="logo"/>
                </Link>

                <ul className={'userHeader'}>
                    <li><Link to={"/user/info"}>프로젝트소개</Link></li>
                    <li><Link to={"/user/creator"}>만든이</Link></li>
                    <li><Link to={"/user/notice"}>공지사항</Link></li>
                    <li><Link to={"/user/inquiry"}>문의하기</Link></li>
                </ul>

                <ul className={'adminHeader'}>
                    <li><Link to={"/admin/control"}>Control</Link></li>
                    <li><Link to={"/admin/penalty"}>Penalty</Link></li>
                    <li><Link to={"/admin/patrol"}>Patrol</Link></li>
                    <li><Link to={"/admin/notice"}>Notice</Link></li>
                    <li><Link to={"/admin/inquiry"}>Inquiry</Link></li>
                </ul>
            </nav>
        </>
    );
}
