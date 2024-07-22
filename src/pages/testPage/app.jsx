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
            const {grantType, accessToken} = response;
            // cookie 저장
            Cookies.set('Authorization', grantType + " " + accessToken, {expires: 1})
        }
    }, [response]);

    const handleSignIn = async () => {
        try {
            const res = await axios.post('http://localhost:8080/members/signIn', {
                username,
                password
            },{});
            setResponse(res.data);
        } catch (error) {
            console.error('Error signing in:', error);
            setResponse({error: 'Failed to sign in'});
        }
    };
    const handleSignOut = () => {
        Cookies.remove('Authorization');
        navigate('/')
    }

    return (
        <div style={{height: '100vh'}}>
            <h1>Sign In</h1>
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
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignOut}> Sign Out</button>
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
