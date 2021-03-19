import axios from "axios";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../../providers/auth";
import Header from "../Header/Header";

import "./style.css";

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
            <Header />
            <div className="container-profile">
                <div className="img-profile">
                    <img src="https://instagram.fcok1-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fcok1-1.fna.fbcdn.net&_nc_ohc=EiFnMM8BpOgAX8I15oq&ccb=7-4&oh=2749ac8ab0adf5c93d21b67abb3f1284&oe=607B960F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-4"></img>
                </div>

                <div className="profile-itens">
                    <p>{userData.name_full}</p>

                    <div className="container-profile-seguidores-pub-seguindo">
                        <p>0 Publicações</p>
                        <p>0 Seguidores</p>
                        <p>0 Seguindo</p>
                    </div>

                    <div className="profile-description">
                        <p>Description user</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile;