import React, {useEffect, useState} from 'react';
import '../../static/header.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Image} from "react-bootstrap";
import Logo from '../../static/images/logo.png'
// import AdminLogo from '../../static/images/adminLogo.png'
import Cookies from "js-cookie";
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [headerLocation, setHeaderLocation] = useState('')
    const [isLogin, setIsLogin] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        AOS.init();
    }, [])

    useEffect(() => {
        if (location.pathname.startsWith('/user')) {
            setHeaderLocation(0)
        } else if (location.pathname.startsWith('/admin')) {
            setHeaderLocation(1)
        } else {
            setHeaderLocation(2)
        }
    }, [location])

    useEffect(() => {
        const loginInfo = Cookies.get("Authorization");
        if (loginInfo != null) {
            return setIsLogin(true);
        } else if (loginInfo == null) {
            return setIsLogin(false);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSignOut = () => {
        if (Cookies.get("Authorization") != null) {
            alert('로그아웃 되었습니다');
            Cookies.remove('Authorization');
        } else {
            alert('로그인 정보가 없습니다.')
        }
        navigate('/')
    };

    return (
        <>
            {
                headerLocation === 0 //  user 일때
                    ?
                    <nav className={`header ${isScrolled ? 'scrolled' : ''}`}>
                        <Link to={"/user"} className={"logo"} data-aos="fade-right" data-aos-duration="500">
                            <Image src={Logo} className={'headerImg'}/>
                        </Link>
                        <input className={"menu-btn"} type="checkbox" id="menu-btn"/>
                        <label className={"menu-icon"} htmlFor="menu-btn">
                            <span className="navicon">
                            </span>
                        </label>
                        <ul className={"menu"}>
                            <li><Link to={'/'}>메인</Link></li>
                            <li><Link to={"/user/info"}>프로젝트소개</Link></li>
                            <li><Link to={"/user/creator"}>만든 이</Link></li>
                            <li><Link to={"/user/notice"}>공지사항</Link></li>
                            <li><Link to={"/user/inquiry"}>문의하기</Link></li>
                        </ul>
                    </nav>
                    : (headerLocation === 1 ? // admin 일때
                        <nav className={`header ${isScrolled ? 'scrolled' : ''}`}>
                            <Link to={"/admin"} className={"logo"} data-aos="fade-right" data-aos-duration="500">
                                <Image src={Logo} className={'headerImg'}/>
                            </Link>
                            <input className="menu-btn" type="checkbox" id="menu-btn"/>
                            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                            <ul className="menu">
                                <li><Link to={'/'}>메인</Link></li>
                                <li><Link to={"/admin/control"}>관제</Link></li>
                                <li><Link to={"/admin/patrol"}>순찰내역</Link></li>
                                <li><Link to={"/admin/penalty"}>단속차량</Link></li>
                                <li><Link to={"/admin/notice"}>공지사항</Link></li>
                                <li><Link to={"/admin/inquiry"}>문의목록</Link></li>
                                <li onClick={handleSignOut} className={'logoutBtn'}>
                                    <Link to={'/'} className={'svgIcon'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="currentColor"
                                             className="bi bi-box-arrow-in-right icon"
                                             viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                                            <path fillRule="evenodd"
                                                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                        </svg>
                                    </Link></li>
                            </ul>
                        </nav>
                        : null)}
        </>
    );
}