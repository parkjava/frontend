import React, {useState} from "react";
import {Container, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하는 상태 변수
    //const [log, setLog] = useState([]);


    // 예시: 실제 로그인 상태를 설정하는 함수
    const handleLogin = () => {
        setIsLoggedIn(true); // 로그인 상태 설정
        const logout =document.getElementsByClassName('logout')
        logout.style.display ="content";
    };

    // 예시: 실제 로그아웃 상태를 설정하는 함수
    const handleLogout = () => {
        localStorage.removeItem("user"); // 예시: 로컬 스토리지에서 사용자 정보 제거
        setIsLoggedIn(false); // 로그아웃 상태 설정
    };


    /*}    const Login = () => {
        if (isLoggedIn === true) {
            setLog("Logout")
        } else if (isLoggedIn === false) {
            setLog("Login")
        }

    }*/

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <b>ParkJava</b>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                            {/*{isLoggedIn ? (*/}
                            {/*    <li className="nav-item">*/}
                            {/*        <Link to="/admin" onClick={handleLogout} className="nav-link ">*/}
                            {/*            Logout*/}
                            {/*        </Link>*/}
                            {/*    </li>*/}
                            {/*) : (*/}
                            {/*    <li className="nav-item">*/}
                            {/*        <Link to="/admin" className="nav-link" onClick={handleLogin}>*/}
                            {/*            Login*/}
                            {/*        </Link>*/}
                            {/*    </li>*/}
                            {/*)}*/}
                        </ul>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
