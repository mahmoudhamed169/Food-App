import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {

    const [loginData, setLoginData] = useState(null);

    const saveLoginData = () => {
        let encodedToken = localStorage.getItem("token");
        let decodedToken = jwtDecode(encodedToken);

        setLoginData(decodedToken);

    };


    useEffect(() => {
        if (localStorage.getItem("token")) {
            saveLoginData()
        }

    }, []);


    return (
        <AuthContext.Provider value={{ loginData, saveLoginData }}>
            {children}
        </AuthContext.Provider>
    );
};

