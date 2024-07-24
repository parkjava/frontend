import React, {useEffect, useState} from 'react';
import '../../static/header.css'
import {Link, useLocation} from "react-router-dom";
import {Image} from "react-bootstrap";
import Logo from '../../static/images/logo.png'


export default function Header() {
    const [headerLocation, setHeaderLocation] = useState('')
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/user')) {
            setHeaderLocation(0)
        } else if (location.pathname.startsWith('/admin')) {
            setHeaderLocation(1)
        } else {
            setHeaderLocation(2)
        }
    }, [location])

    return (
        <>

            {
                headerLocation === 0 // /user일때
                    ?
                    <nav className={'headerContainer'}>
                        <Link to={'/'}>시작 페이지</Link>
                        <Link to="/user">
                            <Image src={Logo} className="logo"/>
                        </Link>
                        <ul className={'userHeader'}>
                            <li><Link to={"/user/info"}>프로젝트소개</Link></li>
                            <li><Link to={"/user/creator"}>만든이</Link></li>
                            <li><Link to={"/user/notice"}>공지사항</Link></li>
                            <li><Link to={"/user/inquiry"}>문의하기</Link></li>
                        </ul>
                    </nav>
                    : (headerLocation === 1 ? // /admin 일때
                        <nav className={'headerContainer'}>
                            <Link to={'/'}>시작 페이지</Link>
                            <Link to="/admin">
                                <Image src={Logo} className="logo"/>
                            </Link>
                            <ul className={'adminHeader'}>
                                <li><Link to={"/admin/control"}>Control</Link></li>
                                <li><Link to={"/admin/penalty"}>Penalty</Link></li>
                                <li><Link to={"/admin/patrol"}>Patrol</Link></li>
                                <li><Link to={"/admin/notice"}>Notice</Link></li>
                                <li><Link to={"/admin/inquiry"}>Inquiry</Link></li>
                            </ul>
                        </nav>
                        // 메인페이지
                        :<Link to={'/'}>시작페이지로(임시)</Link> )
            }
        </>
    )
        ;
}
