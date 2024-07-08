import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Check if user is logged in when the component mounts
        const loggedUser = localStorage.getItem('user');
        if (loggedUser) {
            setToken(JSON.parse(loggedUser));
        }
    }, []);
    
    const handleLogin = async (username, password) => {
        try {
            await axios.post('https://localhost:8080/login', {
                username,
                password
            }).then((res) => {
                console.log(res)
                localStorage.setItem('user', JSON.stringify(res.data.token));
                setToken(res.data.token);
            });
        } catch(err) {
            console.log(err.message)
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ token, handleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};