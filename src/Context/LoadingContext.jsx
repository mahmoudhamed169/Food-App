import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthLayout, setIsAuthLayout] = useState(true);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, isAuthLayout, setIsAuthLayout }}>
            {children}
        </LoadingContext.Provider>
    );
};
