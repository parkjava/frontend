import React, {useEffect, useRef, useState} from 'react';
import '../../static/header.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Image} from "react-bootstrap";
import Logo from '../../static/images/logo.png';
import Cookies from "js-cookie";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const [headerLocation, setHeaderLocation] = useState('');
    const [isLogin, setIsLogin] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [shadow, setShadow] = useState('');

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        if (location.pathname.startsWith('/user')) {
            setHeaderLocation(0);
        } else if (location.pathname.startsWith('/admin')) {
            setHeaderLocation(1);
        } else {
            setHeaderLocation(2);
        }
        setShadow('');
    }, [location]);

    useEffect(() => {
        const loginInfo = Cookies.get("Authorization");
        setIsLogin(loginInfo != null);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);

        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                document.getElementById('menu-btn').checked = false;
                document.body.classList.remove('noScroll');
                setShadow('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuToggle = () => {
        const menuBtn = document.getElementById('menu-btn');
        if (menuBtn.checked) {
            setShadow('shadow');
            document.body.classList.add('noScroll');
        } else {
            setShadow('');
            document.body.classList.remove('noScroll');
        }
    };

    const handleSignOut = () => {
        if (Cookies.get("Authorization") != null) {
            alert('로그아웃 되었습니다');
            Cookies.remove('Authorization');
        } else {
            alert('로그인 정보가 없습니다.');
        }
        navigate('/',{replace:true});
    };

    const handleLinkClick = () => {
        document.getElementById('menu-btn').checked = false;
        document.body.classList.remove('noScroll');
        setShadow('');
    };

    return (
        <>
            <div className={shadow}>
                {headerLocation === 0 ? (
                    <nav className={`header ${isScrolled ? 'scrolled' : ''}`} ref={menuRef}>
                        <Link to={"/"} className={"logo"} data-aos="fade-right" data-aos-duration="500">
                            <Image src={Logo} className={'headerImg'}/>
                        </Link>
                        <input className={"menu-btn"} type="checkbox" id="menu-btn" onChange={handleMenuToggle}/>
                        <label className={"menu-icon"} htmlFor="menu-btn">
                            <span className="navicon"></span>
                        </label>
                        <ul className={"menu"}>
                            <li><Link to={'/user'} onClick={handleLinkClick}>메인</Link></li>
                            <li><Link to={"/user/info"} onClick={handleLinkClick}>프로젝트소개</Link></li>
                            <li><Link to={"/user/creator"} onClick={handleLinkClick}>팀원소개</Link></li>
                            <li><Link to={"/user/notice"} onClick={handleLinkClick}>공지사항</Link></li>
                            <li><Link to={"/user/inquiry"} onClick={handleLinkClick}>문의하기</Link></li>
                        </ul>
                    </nav>
                ) : (
                    headerLocation === 1 && (
                        <nav className={`header ${isScrolled ? 'scrolled' : ''}`} ref={menuRef}>
                            <Link to={"/"} className={"logo"} data-aos="fade-right" data-aos-duration="500">
                                <Image src={Logo} className={'headerImg'}/>
                            </Link>
                            <input className="menu-btn" type="checkbox" id="menu-btn" onChange={handleMenuToggle}/>
                            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                            <ul className="menu">
                                <li><Link to={'/admin'} target={'_self'} onClick={handleLinkClick}>메인</Link></li>
                                <li><Link to={"/admin/control"} onClick={handleLinkClick}>관제</Link></li>
                                <li><Link to={"/admin/patrol"} onClick={handleLinkClick}>순찰내역</Link></li>
                                <li><Link to={"/admin/penalty"} onClick={handleLinkClick}>단속차량</Link></li>
                                <li><Link to={"/admin/notice"} onClick={handleLinkClick}>공지사항</Link></li>
                                <li><Link to={"/admin/inquiry"} onClick={handleLinkClick}>문의목록</Link></li>
                                <li onClick={handleSignOut} className={'logoutBtn'}>
                                    <Link to={'/'} className={'svgIcon'} onClick={handleLinkClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="currentColor"
                                             className="bi bi-box-arrow-in-right icon" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                                            <path fillRule="evenodd"
                                                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                        </svg>
                                    </Link>
                                    <Link to={'/'} className={'logout'}>로그아웃</Link>
                                </li>
                            </ul>
                        </nav>
                    )
                )}
            </div>
        </>
    );
}
