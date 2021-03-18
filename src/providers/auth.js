import axios from "axios";
import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext({});


export const AuthProvider = (props) => {

    const token = localStorage.getItem('token');
    const [autorization, setAutorization] = useState(false);

    useEffect(async () => {

        if(token){
            const data = await axios({
                method: 'GET',
                baseURL: process.env.REACT_APP_API_PROFILE,
                headers: {
                    token: token
                }
            }).then(resp => {
                return resp.data;
            })
    
            if(data.id){
                setAutorization(true);
            }
        } 
    }, [])

    return (
        <AuthContext.Provider value={{ autorization, setAutorization }}>
            {props.children}
        </AuthContext.Provider>
    )
}