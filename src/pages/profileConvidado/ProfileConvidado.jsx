import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../providers/auth";

import "./style.css"

console.clear();
function ProfileConvidado(){

    const { autorization, setAutorization } = React.useContext(AuthContext);
    const { username } = useParams();
    const [userNotFound, setUserNotFound] = useState(false);
    const [followingButton, setFollowingButton] = useState(false);
    const [user, setUser] = useState(['']);
    const [userFollowing, setUserFollowing] = useState(['']);
    const [userFollowers, setUserFollowers] = useState(['']);
    const [userPhotos, setUserPhotos] = useState(['']);

    useEffect(async () => {
        
        await seacherUser()

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

        if(data == undefined){
            return setUserNotFound(true);
        }
        await verifyFollow(data[0].id)
        await follow(data[0].id); 


        const [{ following_user, photo_user, followers }] = data;

        setUserFollowers(followers)
        setUserPhotos(photo_user)
        setUserFollowing(following_user);
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

        if(result.msg == false){
            return setFollowingButton(false);
        }

        return setFollowingButton(true);
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

            if(follow.msg == "Following"){
                return setFollowingButton(true)
            }
        }
    }

    return(
        <div>
            {userNotFound ? <Redirect to="/err"/> : ""}
            
            <Header />
            <div className="container-profile">
                <div className="img-profile">
                    <img 
                        src="https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
                        width={"150px"}
                    />
                </div>

                <div className="profile-itens">
                    <div className="container-profile-follow">
                        <p>{user.name_full}</p>
                        {followingButton ? <button id="button-follow-true">Following</button> : <button id="button-follow">Follow</button>}
                    </div>

                    <div className="container-profile-seguidores-pub-seguindo">
                        <p>{userPhotos.length} Publicações</p>
                        <p>{userFollowers.length} Seguidores</p>
                        <p>{userFollowing.length} Seguindo</p>
                    </div>

                    <div className="profile-description">
                        <p>Description user</p>
                    </div>
                </div>
            </div>

            <div className="container-photos">
                <div className="container-photos-elements">
                    {userPhotos.map((result, index) => {
                        return (
                            <div className="elements-photos" key={index}>
                                <img src={result.url}></img>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default ProfileConvidado;