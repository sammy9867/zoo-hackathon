import React, { createContext, useState, useEffect, useContext } from 'react';
import { addItemToStorage, getItemFromStorage } from '../utils/local-storage';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] =  useState(() => {
        const authToken = getItemFromStorage("auth-token");
            return authToken != null
            ? authToken
            : "";
    });

    useEffect(() => {
        console.log("Auth token added to storage")
        addItemToStorage("auth-token", token);
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthValue = () => useContext(AuthContext);