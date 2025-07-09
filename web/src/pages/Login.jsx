import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login({ onLogin }) {
    const [userId, setUserId] = useState('');
    const [pass, setPass] = useState('')

    const { setToken } = useAuth();

    const handleLogin = async () => {
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: userId }),
        });
        const data = await res.json();
        setToken(data.token);
        onLogin();
    };

    return (
        <div style={{ margin: 'auto', width: '50%' }}>
            <h1>Login Form</h1>
            <div style={{ display: 'flex', flexDirection: 'column', }}>
                <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter user ID" />
                <input style={{ marginTop: '10px' }} type='password' value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter user pass" />
                <button style={{ marginTop: '10px' }} onClick={handleLogin}>Login</button>

            </div>
        </div>
    );
}
