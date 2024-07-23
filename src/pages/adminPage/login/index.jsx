import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";

export default function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const [formattedResponse, setFormattedResponse] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (response) {
            setFormattedResponse(JSON.stringify(response, null, 2));
        }
    }, [response]);

    const handleSignIn = async () => {
        try {
            const res = await axios.post('http://localhost:8080/members/signIn', {
                username,
                password
            });
            setResponse(res.data);
            Cookies.set("Authorization", `${res.data.grantType} ${res.data.accessToken}`, {expires: 1});
        } catch (error) {
            console.error('Error signing in:', error);
            setResponse({error: 'Failed to sign in'});
        }
    };

    const handleSignOut = () => {
        Cookies.remove('Authorization');
        navigate('/');
    };

    const handleRequestWithCookie = async () => {
        try {
            const res = await axios.get('http://localhost:8080/members/test', {
                headers: {
                    'Authorization': Cookies.get('Authorization') // 쿠키를 요청 헤더에 포함
                }
            });
            setResponse(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setResponse({error: 'Failed to fetch data'});
        }
    };

    return (
        <div>
            <h1>관리자 로그인</h1>
            <div>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleSignIn}>로그인</button>
            <button onClick={handleSignOut}>로그아웃</button>
            <button onClick={handleRequestWithCookie}>요청 확인</button>
            {formattedResponse && (
                <div>
                    <h2>Response</h2>
                    {response.error ? (
                        <p>{response.error}</p>
                    ) : (
                        <pre>{formattedResponse}</pre>
                    )}
                </div>
            )}
        </div>
    );
}
