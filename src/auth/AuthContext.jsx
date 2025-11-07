import React, { createContext, useState, useEffect } from 'react';

// Create the context object
export const AuthContext = createContext(null);

// Create the provider component
export const AuthProvider = ({ children }) => {
    // Initialize state from local storage to keep the user logged in after refresh
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return null;
        }
    });
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true); // Added loading state for initial check

    useEffect(() => {
        // Set loading to false once initial state is read
        setLoading(false); 
    }, []);

    // Function to handle login
    const login = (newToken, newUser) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };
    
    // Check if the user is authenticated
    const isAuthenticated = !!token && !!user;

    const contextValue = {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        loading,
    };

    // // If still loading the initial state, show nothing or a loader
    // if (loading) {
    //     return null; // Or return a <LoadingSpinner /> component
    // }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};