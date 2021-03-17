import axios from "axios";
import React, { useEffect } from "react";
import { AuthContext } from "../../providers/auth";

console.clear();

function Profile(){
    
    useEffect(async () => {

        const token = localStorage.getItem("token");
        
        const dataUser = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_API_PROFILE,
            headers: {
                token: token
            }
        }).then(resp => {
            return resp.data;
        })

        console.log(dataUser); 

    }, [])

    return(
        <div>
            <h1>Hello </h1>

        </div>
    )
}

export default Profile;