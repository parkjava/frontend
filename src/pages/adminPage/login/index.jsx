import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
import {Button, Form, Image} from 'react-bootstrap'
import Logo from '../../../static/images/loginLogo.png'
// import axiosInstance from '../../../common/components/axiosinstance';

export default function App() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState('');

    const handleSignIn = async () => {
        try {
            const res = await axios.post('http://localhost:8080/members/signIn', {
                username,
                password
            });
            Cookies.set("Authorization", `${res.data.grantType} ${res.data.accessToken}`, {expires: 1});
            alert("로그인에 성공하였습니다.")
            navigate('/admin')

        } catch (error) {
            alert("로그인에 실패하였습니다.")
            navigate('')
        }

    };

    const handleSignOut = () => {
        if (Cookies.get("Authorization") != null) {
            alert('로그아웃 되었습니다');
            Cookies.remove('Authorization');
        } else {
            alert('로그인 정보가 없습니다.')
        }
        navigate('/')
    };

    useEffect(() => {
        const loginInfo = Cookies.get("Authorization");
        if (loginInfo != null) {
            return setIsLogin(true);
        } else if (loginInfo == null) {
            return setIsLogin(false);
        }
    }, []);

    return (<>
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
                            />
                        </div>
                        <div className={'loginArea'}>
                            <Form.Control className={'loginInput'}
                                          type="password"
                                          value={password}
                                          placeholder={'Password'}
                                          onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button type={'submit'} className={'loginBtn'}
                                onClick={handleSignIn}>
                            로그인
                        </Button>
                    </div>
                </div>
            </div> :
            <Button type={'submit'} className={'loginBtn btn-danger'}
                    onClick={handleSignOut}>
                로그아웃
            </Button>
        }


    </>);
}
