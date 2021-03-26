import axios from "axios";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../../providers/auth";
import Header from "../Header/Header";

import "./style.css";

console.clear();
function Profile(){
    
    const { setAutorization } = React.useContext(AuthContext);
    const [following, setFollowing] = useState(['0']);
    const [follow, setFollow] = useState(['0']);
    const [userData, setUserData] = useState([""]);
    const [userPhoto, setUserPhoto] = useState(['']);
    const [userPhotoProfile, setUserPhotoProfile] = useState(['']);
    const [file, setFile] = useState("");
    const [fileProfile, setFileProfile] = useState("");

    useEffect(async () => {

        await Loading_User_Data();
        await Upload_image();
        await Upload_Profile();

    }, [file, fileProfile])

    async function Loading_User_Data(){
     
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

        setUserPhotoProfile(dataUser.photo_profile.data)
        setFollow(dataUser.follow);
        setUserPhoto(dataUser.photo_users);
        setFollowing(dataUser.following)
        setUserData(dataUser)
    }

    async function Upload_image(){

        const token = localStorage.getItem("token");
        const button_upload = document.querySelector("#button_upload");

        button_upload.onclick = () => {

            document.querySelector("#input-upload").click();            
        }

        if(file != ""){

            const data = new FormData();
            data.append('file', file.file)    
            
            await axios({
                method: "POST",
                baseURL: process.env.REACT_APP_API_UPLOAD,
                data: data,
                contentType: 'multipart/form-data',
                headers: {
                    token: token
                },
                validateStatus: false
            }).then(resp => {
                return resp.data
            })

            document.location.reload(true);
        }
    }

    async function Upload_Profile(){

        const token = localStorage.getItem("token");
        const button_upload_profile = document.querySelector("#img-element");

        button_upload_profile.onclick = () => {

            document.querySelector("#input-upload-profile").click();               
        }

       if(fileProfile != ""){

            const data = new FormData();
            data.append('fileProfile', fileProfile.fileProfile)    
            
            await axios({
                method: "PUT",
                baseURL: process.env.REACT_APP_API_UPLOAD,
                data: data,
                contentType: 'multipart/form-data',
                headers: {
                    token: token
                },
                validateStatus: false
            }).then(resp => {
                return resp.data
            }) 

            document.location.reload(true); 
        } 
    }

    return(
        <div>
            <Header />
            <div className="container-profile">
                <div className="img-profile-elements">
                    <img 
                    id="img-element"
                    src={userPhotoProfile.url || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLGxsb7+/vT09PJycn19fXq6urb29ve3t7w8PDOzs7n5+f5+fnt7e30nlkBAAAFHUlEQVR4nO2dC5qqMAyFMTwUBdz/bq+VYYrKKJCkOfXmXwHna5uTpA+KwnEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcA2iO9cdIc5PUdO257y+BU39u66b4HplE3fk6VIcnqmNfl1+gksr6+iIucjl3WYukor7+re6Hoe1y1UhNO3zUd+fUFRmKpOa0Tt6dY5ubRCrOG/QFLk1WGmnt/JxzykcjdZ/jyxJDLlOV2l36AtcsJJb9boG3YcR3DuqODIE3ztYKPkDdmwRmpUToUaSaq++AvRgZMWbOpbQW8hdCAm8ZDugoikzREdCJ2okJPBx6azFLNOwoOgcxojJ98JkaTSJxMpklKrCAKhZGI0drTY/wU5lXoJYibannV9NYy4oozNEAkPHTjop+DTDxVGkIgYJNoyQQJtiIW+EMjGAjm649AjGIaqswcEFQKJ2QPlJbqytki6ZXAAZRJ52J2McaUowzAfs+uFzrYhnzaapphiPWdaJWShqxjqa6kTTQ205TVbsfMa6htL0iYOsXpJrQjHSmCkv1QGPtiHqlYcQ21Gj7fcDU8xOEUuNgSltPzexh+HqFlanCBHZ4OLhCV+gK/3OF6vWvucLv98MUOY2pwu/PS/+D2qJU7pYGbOvDFDW+bbON9p3o3oRxn0bfLgZTgSn6pSfrtr56qLHemtHPTK2319SzGvtjQ9qeb39WgS66Cm073nd0U1PzDdJCO3Gzn6TKpl9Zq7ujGWsQhlA3NwWIMwG9zM08Y/tBrR9VWeczv5CSQuuUNKIUTk23ZJ5RKfVhjnkXotfWIlgX2BSCDYbZR+QTcLhb3dKZDUY2M0d4KWItwhHRah/zsrOgKw4wycwjcgEVcgQDQo23CqSiWEJkFAfod2oE1uIFdA1OsCPqFXYNTjCfb8Ez+iX2x5sKLlVbhtqdDcar9ZevhnbZxoBUD35k23t0d304LYs1ELVbnfFaZ/REJJX9niP8Q19moZGo3m8XR/yBvOnjFfsXcI2c8ZuNo7WMP5HQh6yRGrlmFOJTnyTcT+zRlqPUBI2gTVWNUzUna1ERgecgF4GpNBQ38jGqxVLzQA1A31Rrhk6Yz9QEh/WND0GnuG9huhiTXJkxfAizTHLr6cbJKN6UCU6x/2DTRE1xEeEXi3O0ZUqBN4nJRzHhFB1JPlFTBZlI2kQ8zc3KJ1Le8DIRmFJiknuVS6RK4Ej/JtBfJErDSzOBiY4wJHX6Z1I4v1GUmdCPNirnLLeg3oJLcbX5PcpHNbRvOa1A956QmRPOUXVF+zkaUJynpkYR0bOMJH2nNej1pqyV/aKkz9jr5yj5vrXXz1F5SQLACiMapmierj2ikLyleKdlA/I/2oFxiglxx9B+mHwz0lf34IZQfhDRhlD6bhvgEAoPYooHkTczSIZTLC+cEExsoNKZiGBiY9cCfo/Y/SjIOBMQizWWTe73CMUasJx7jlD+DdKdWUKoY4PRYFtGpO0G1Lx4RaadgTtJhf4fiGqGIwKWCGuGIwKWqP+7IxYCzygjR9IAO5pC7Da9g70TBVpWRNgFBlgT8RV2WxHbKwJMv4BOaEaYaU2K16yZMN/qgV+G7IWIvwyZCxHeDQMsR8wg0DBDDXB5H2EV+hkEGmaoySHQsEJNFoGGFWrAq98JRhUMX1iMMMqLLEIpK5jCbd4vw9nSt/72lewXiN6jmdjfq8Hdknlk92ZwJnbIMMRM7JBhiFlUFoHd1UWaP1QKsPsHA5mkNB+Smn9JqV3wskatnQAAAABJRU5ErkJggg=="}
                    ></img>
                    <input onChange={(e) => setFileProfile({fileProfile: e.target.files[0]})} id="input-upload-profile" type="file" accept="image/png, image/jpeg" name="upload-image-profile"/>
                </div>

                <div className="profile-itens">
                    <p>{userData.name_full}</p>

                    <div className="container-profile-seguidores-pub-seguindo">
                        <p>{userPhoto.length} Publicações</p>
                        <p>{follow.length} Seguidores</p>
                        <p>{following.length} Seguindo</p>
                    </div>

                    <div className="profile-description">
                        <p>Description user</p>
                    </div>

                    <div className="container-upload">
                        <input onChange={(e) => setFile({file: e.target.files[0]})} id="input-upload" type="file" accept="image/png, image/jpeg" name="upload-image"/>
                        <button id="button_upload">Upload Image</button>
                    </div>
                
                </div>
                

            </div>
            <div className="container-photos">
                <div className="container-photos-elements">
                    {userPhoto.map((result, index) => {
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

export default Profile;