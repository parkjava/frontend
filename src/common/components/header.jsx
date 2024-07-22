import React from 'react';
import {Container, Image, Navbar} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import '../../static/header.css'
import logo from '../../static/images/parkjavalogo.png'



export default function Header() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하는 상태 변수
    const navigate = useNavigate();

    // 예시: 로그인 상태를 설정하는 함수
    // const handleLogin = () => {
    //     setIsLoggedIn(true); // 로그인 상태 설정
    //     // 실제 로그인 처리 로직 추가
    // };

    // 로그아웃 상태를 설정하는 함수
    const handleLogout = () => {
        // 세션 쿠키 삭제
        document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // 기타 로그아웃 처리 (예: 리다이렉트 등)
        navigate('/login'); // 로그인 페이지로 이동
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <Image className={'headerLogo'} src={logo} ></Image>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/main/info" className="nav-link">
                                    프로젝트소개
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/main/creator" className="nav-link">
                                    만든이
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/main/notice" className="nav-link">
                                    유저공지사항
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/main/inquiry" className="nav-link">
                                    문의하기
                                </Link>
                            </li>
                            <li className="nav-item nav-link">
                                <b>&#60;-- 유저전용 | 관리자전용 --&#62;</b>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/control" className="nav-link">
                                    관제
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/patrol" className="nav-link">
                                    순찰내역
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/penalty" className="nav-link">
                                    단속차량내역
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/notice" className="nav-link">
                                    공지사항
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/inquiry" className="nav-link">
                                    문의확인
                                </Link>
                            </li>
                            <li>
                                <TbLogout onClick={handleLogout}/>

                                {/*{isLoggedIn ? (*/}
                                {/*    <li className="nav-item">*/}
                                {/*        <span className="nav-link" style={{ cursor: 'pointer' }} onClick={handleLogout}>*/}
                                {/*            로그아웃*/}
                                {/*        </span>*/}
                                {/*    </li>*/}
                                {/*) : (*/}
                                {/*    <li className="nav-item">*/}
                                {/*        <Link to="/admin" className="nav-link" onClick={handleLogin}>*/}
                                {/*            로그인*/}
                                {/*        </Link>*/}
                                {/*    </li>*/}
                                {/*)}*/}
                            </li>
                        </ul>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
