import React, { createContext, useState, useEffect, useContext } from 'react';
import { addItemToStorage, getItemFromStorage } from '../utils/local-storage';

export const ForestContext = createContext();

export const ForestContextProvider = ({ children }) => {
    const [forestId, setForestId] =  useState(() => {
        const forestId = getItemFromStorage("forestId");
            return forestId != null
            ? forestId
            : "5fc978e66124743260838763";
    });

    useEffect(() => {
        addItemToStorage("forestId", forestId);
    }, [forestId]);

    return (
        <ForestContext.Provider value={{ forestId, setForestId }}>
            {children}
        </ForestContext.Provider>
    );
};

export const useForestIdValue = () => useContext(ForestContext);