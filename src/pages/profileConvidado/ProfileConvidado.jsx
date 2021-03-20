import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Header from "../../components/Header/Header";


console.clear();

function ProfileConvidado(){

    const { username } = useParams();
    const [userNotFound, setUserNotFound] = useState(false);
    const [user, setUser] = useState(['']);

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

        if(data == 0){
            return setUserNotFound(true);
        }

        setUser(...data);

    }

    return(
        <div>
            <Header />

            {userNotFound ? <Redirect to="/err"/> : ""}

            <div className="container-profile">
                <div className="img-profile">
                    <img src="https://instagram.fcok1-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fcok1-1.fna.fbcdn.net&_nc_ohc=EiFnMM8BpOgAX8I15oq&ccb=7-4&oh=2749ac8ab0adf5c93d21b67abb3f1284&oe=607B960F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-4"></img>
                </div>

                <div className="profile-itens">
                    <p>{user.name_full}</p>

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