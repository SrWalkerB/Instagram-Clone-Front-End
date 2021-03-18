import axios from "axios";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../../providers/auth";

console.clear();
function Profile(){
    
    const { autorization, setAutorization } = React.useContext(AuthContext);
    const [userData, setUserData] = useState([""]);

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
       
        if(dataUser.id){
            setAutorization(true);
        }
        
        setUserData(dataUser);

    }, [])

    return(
        <div>
            <h1>Welcome {userData.name_full}</h1>

        </div>
    )
}

export default Profile;