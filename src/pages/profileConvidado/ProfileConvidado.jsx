import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Header from "../../components/Header/Header";

import "./style.css"

console.clear();

function ProfileConvidado(){

    const { username } = useParams();
    const [userNotFound, setUserNotFound] = useState(false);
    const [user, setUser] = useState(['']);
    const [following, setFollowing] = useState(false);

    useEffect(async () => {

        await seacherUser();

    }, [username]);


    async function seacherUser() {

        const token = localStorage.getItem("token");
        const data = await axios({
            baseURL: `${process.env.REACT_APP_API_PROFILE}/${username}`,
            method: "GET",
            headers: {
                token: token
            }
        }).then(resp => {
            return resp.data;
        }).catch(err => {
            console.log(err);
        })        

        await verifyFollow(data[0].id)
        await follow(data[0].id); 

        if(data == 0){
            return setUserNotFound(true);
        }

        setUser(...data);
    }
    
    async function verifyFollow(id){

        const token = localStorage.getItem('token');

        const result = await axios({
            method: "GET",
            baseURL: `${process.env.REACT_APP_API_LIST_FOLLOWING}/${id}`,
            headers: {
                token: token
            }
        }).then(resp => {
            return resp.data;
        })

        console.log(result);

        if(result.msg == false){
            return setFollowing(false);
        }

        return setFollowing(true);
    }

    async function follow(id){

        const button_Follow = document.querySelector(".container-profile-follow").querySelector('button');

        button_Follow.onclick = async () => {

            const token = localStorage.getItem('token');
            const follow = await axios({
                method: "POST",
                baseURL: `${process.env.REACT_APP_API_FOLLOW_USER}/${id}`,
                headers: {
                    token: token
                },
                validateStatus: false
            }).then(resp => {
                return resp.data;
            })

            console.log(follow)

            if(follow.msg == "Following"){
                return setFollowing(true)
            }
        }
    }

    return(
        <div>
            <Header />

            {userNotFound ? <Redirect to="/err"/> : ""}

            <div className="container-profile">
                <div className="img-profile">
                    <img 
                        src="https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
                    />
                </div>

                <div className="profile-itens">
                    <div className="container-profile-follow">
                        <p>{user.name_full}</p>
                        {following ? <button id="button-follow-true">Following</button> : <button id="button-follow">Follow</button>}
                    </div>

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

export default ProfileConvidado;