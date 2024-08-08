import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Route, Router, useNavigate} from "react-router-dom";
import {Button, Form, Image} from 'react-bootstrap';
import Logo from '../../../static/images/loginLogo.png';

export default function App() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();  // Prevent default form submission
        await axios.post('http://localhost:8080/members/signIn', {
            username,
            password
        }).then((res) => {
            console.log(res)
            Cookies.set("Authorization", `${res.data.grantType} ${res.data.accessToken}`, {expires: 1});
            alert("로그인에 성공하였습니다.");
            navigate('/admin')
        }).catch((error) => {
            console.log(error)
            alert("로그인에 실패하였습니다.");
        })
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSignIn(e);
        }
    };

    useEffect(() => {
        const loginInfo = Cookies.get("Authorization");
        if (loginInfo != null) {
            setIsLogin(true);
            navigate('/admin',{replace:true})
        } else {
            setIsLogin(false);
        }
    }, []);

    return (
        <>
            <div className={'commonContainer'}>
                {isLogin === false ?
                    <div style={{height: '80vh'}}>
                        <div className={'loginContainer'}>
                            <div className={'loginGroup'}>
                                <Image src={Logo} width={355}/>
                                <div className={'loginArea'}>
                                    <Form.Control className={'loginInput'}
                                                  type="text"
                                                  value={username}
                                                  placeholder={'ID'}
                                                  onChange={(e) => setUsername(e.target.value)}
                                                  onKeyPress={handleKeyPress}
                                    />
                                </div>
                                <div className={'loginArea'}>
                                    <Form.Control className={'loginInput'}
                                                  type="password"
                                                  value={password}
                                                  placeholder={'Password'}
                                                  onChange={(e) => setPassword(e.target.value)}
                                                  onKeyPress={handleKeyPress}
                                    />
                                </div>
                                <Button type={'submit'} className={'loginBtn'}
                                        onClick={handleSignIn}
                                >
                                    로그인
                                </Button>
                            </div>
                        </div>
                    </div> : null
                    // <Router>
                    //     <Route exact path="/">
                    //         <Redirect to="/login"/>
                    //     </Route>
                    // </Router>
                }
            </div>
        </>
    );
}
