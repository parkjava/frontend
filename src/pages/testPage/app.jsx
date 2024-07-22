import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);

    const handleSignIn = async () => {
        try {
            const res = await axios.post('http://localhost:8080/members/signIn', {
                username,
                password
            });
            setResponse(res.data);
        } catch (error) {
            console.error('Error signing in:', error);
            setResponse({ error: 'Failed to sign in' });
        }
    };

    return (
        <div style={{height:'100vh'}}>
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

            {response && (
                <div>
                    <h2>Response</h2>
                    {response.error ? (
                        <p>{response.error}</p>
                    ) : (
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
