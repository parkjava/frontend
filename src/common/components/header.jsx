import React, {useEffect, useState} from 'react';
import '../../static/header.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Image} from "react-bootstrap";
import Logo from '../../static/images/logo.png'
import AdminLogo from '../../static/images/adminLogo.png'
import Cookies from "js-cookie";
import axiosInstance from "./axiosinstance";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [headerLocation, setHeaderLocation] = useState('')
    const [isLogin, setIsLogin] = useState('');


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

    const handleSignOut = () => {
        if (Cookies.get("Authorization") != null) {
            if( window.confirm("정말 로그아웃 하시겠습니까?") ){
                alert('로그아웃 되었습니다');
                Cookies.remove('Authorization');
                navigate("/")
            }
        } else {
            alert('로그인 정보가 없습니다.')
        }
    };

    function loginApi() {
        axiosInstance
            .get('/members/test')
            .then((res) => {
                console.log('Fetched notices:', res);
                return setName(res)
            })
            .catch((err) => console.log(err));
    }

    useEffect((res) => {
        loginApi(res);
    }, []);


    return (
        <>
            {
                headerLocation === 0 // /user일때
                    ?
                    <nav className={"header"}>
                        <Link to={"/user"} className={"logo"}>
                            <Image src={Logo} className={'headerImg'} width={200}/>
                        </Link>
                        <input className={"menu-btn"} type="checkbox" id="menu-btn"/>
                        <label className={"menu-icon"} htmlFor="menu-btn">
                            <span className="navicon">
                            </span>
                        </label>
                        <ul className={"menu"}>
                            <li><Link to={'/'}>MAIN</Link></li>
                            <li><Link to={"/user/info"}>ProjectInfo</Link></li>
                            <li><Link to={"/user/creator"}>Creator</Link></li>
                            <li><Link to={"/user/notice"}>Notice</Link></li>
                            <li><Link to={"/user/inquiry"}>Contact Us</Link></li>
                        </ul>
                    </nav>
                    : (headerLocation === 1 ? // /admin 일때
                        <nav className={"header"}>
                            <Link to={"/admin"} className={"logo"}>
                                <Image src={AdminLogo} className={'headerImg'} width={340}/>
                            </Link>

                            <input className="menu-btn" type="checkbox" id="menu-btn"/>
                            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                            <ul className="menu">
                                <li><Link to={'/'}>MAIN</Link></li>
                                <li><Link to={"/admin/control"}>Control</Link></li>
                                <li><Link to={"/admin/penalty"}>Penalty</Link></li>
                                <li><Link to={"/admin/patrol"}>Patrol</Link></li>
                                <li><Link to={"/admin/notice"}>Notice</Link></li>
                                <li><Link to={"/admin/inquiry"}>Inquiry</Link></li>
                                <li className={'adminName'}>{name}님, 안녕하세요</li>
                                <li onClick={handleSignOut} className={'logoutBtn'}>
                                    <FontAwesomeIcon icon={faRightFromBracket} size='xl'/>
                                </li>
                            </ul>
                        </nav>

                        // 메인페이지
                        : null)}
        </>
    );
}
