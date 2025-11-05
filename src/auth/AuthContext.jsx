import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('userData');
        
        if (storedToken && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        
        setIsLoading(false); 
    }, []);

    function login(token, userData) {
        localStorage.setItem('authToken', token); 
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
    }

    function logout() {
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('userData');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}