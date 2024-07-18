import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [userNames, setUserName] = useState(null);


    useEffect(() => {
        // Check if user is logged in when the component mounts
        const loggedUser = localStorage.getItem('user');
        const userName = localStorage.getItem("userName");
        if (loggedUser && userName) {
            setToken(JSON.parse(loggedUser));
            setUserName(JSON.parse(userName));
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
                localStorage.setItem('userName', JSON.stringify(username));
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
        <AuthContext.Provider value={{ token, userNames, handleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};