import React, { useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {

    const [autorization, setAutorization] = useState(false);

    return (
        <AuthContext.Provider value={{ autorization, setAutorization }}>
            {props.children}
        </AuthContext.Provider>
    )
}