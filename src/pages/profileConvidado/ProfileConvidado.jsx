import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Header from "../../components/Header/Header";

import "./style.css"

console.clear();

function ProfileConvidado(){

    const { username } = useParams();
    const [userNotFound, setUserNotFound] = useState(false);
    const [followingButton, setFollowingButton] = useState(false);
    const [user, setUser] = useState(['']);
    const [userFollowing, setUserFollowing] = useState(['']);
    const [userFollowers, setUserFollowers] = useState(['']);
    const [userPhotos, setUserPhotos] = useState(['']);
    const [userProfilePhoto, setProfilePhoto] = useState(['']);

    useEffect(async () => {

        await seacherUser();

    }, [username, followingButton]);


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

        if(data == 0){
            return setUserNotFound(true);
        }

        const [{ following_user, photo_user, followers, dataProfile }] = data;

        console.log(dataProfile);
        setProfilePhoto(dataProfile);
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

        const token = localStorage.getItem('token');

        const result = await axios({
            method:"POST",
            baseURL: `${process.env.REACT_APP_API_FOLLOW_USER}/${id}`,
            headers: {
                token: token
            },
            validateStatus: false
        }).then(resp => {
            return resp.data;
        })

        if(result.msg == "Following"){
            return setFollowingButton(true);
        }
        
    }

    async function unfollow(id){

        const token = localStorage.getItem('token');

        const result = await axios({
            method:"DELETE",
            baseURL: `${process.env.REACT_APP_API_UNFOLLOW}/${id}`,
            headers: {
                token: token
            },
            validateStatus: false
        }).then(resp => {
            return resp.data;
        })

        if(result.msg == "unfollow"){
            return setFollowingButton(false);
        }
    }

    return(
        <div>
            <Header />

            {userNotFound ? <Redirect to="/err"/> : ""}

            <div className="container-profile">
                <div className="img-profile">
                    <img 
                        src={ userProfilePhoto.url || "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"}
                    />
                </div>

                <div className="profile-itens">
                    <div className="container-profile-follow">
                        <p>{user.name_full}</p>
                        {followingButton ? <button onClick={() => unfollow(user.id)} id="button-follow-true">Following</button> : <button onClick={() => follow(user.id)} id="button-follow">Follow</button>}
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