import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

import "./style.css"

console.clear();

function Feed(){

    const [ userFeed, setUserFeed ] = useState(['']);
    const [ feedLength, setfeedLength ] = useState(0);

    useEffect(async () => {

        const token = localStorage.getItem('token');

        const data = await axios.get(process.env.REACT_APP_API_FEED, {
            headers: {
                token: token
            }
        }).then(resp => {
            return resp.data;
        })

        setUserFeed(data);
        setfeedLength(data.length)

    }, [])


    async function LikeButton(id, id_photo){

        const del = document.querySelector(`#element-${id}`).querySelector('button');

        if(del.textContent == 'Like'){
            
            const like = await Like_and_Remove_Photo_API(id_photo);
            
            if(like.msg == "like"){
                
                return del.textContent = "Voce Curtiu"
            }
        } 

        if(del.textContent == "Voce Curtiu"){
            const like = await Like_and_Remove_Photo_API(id_photo);

            if(like.err == "Removed Like"){

                return del.textContent = "Like"
            }
        }
    }

    async function RemoveLike(id, id_photo){

        const del = document.querySelector(`#element-${id}`).querySelector('button');

        if(del.textContent == "Curtida"){
            const remove = await Like_and_Remove_Photo_API(id_photo);
            
            if(remove.err == "Removed Like"){

                return del.textContent = "Like";
            }
        }

        if(del.textContent == "Like"){
            const like = await Like_and_Remove_Photo_API(id_photo);

            if(like.msg == "like"){
                return del.textContent = "Curtida";
            }
        }
    }

    async function Like_and_Remove_Photo_API(id_photo){

        const token = localStorage.getItem("token");
        const result = await axios({
            baseURL: `${process.env.REACT_APP_API_LIKE}/${id_photo}`,
            method: "GET",
            headers: {
                token: token
            }
        }).then(resp => {
            return resp.data;
        })

        return result;
    }

    function Verify_Likes_for_text(likes){

        // { result.like ? <p id="text-likes">Voce e outras {result.photo_like.length-1} pessoas curtiram</p> : <p id="text-likes">Curtida por {result.photo_like.length} pessoas</p>}
        // { result.like ? <p id="text-likes">Voce e outras {result.photo_like.length-1} pessoas curtiram</p> : <p id="text-likes">Curtida por {result.photo_like.length} pessoas</p>}

        const numberLikes = likes.likes -1;

        if(numberLikes > 0){

            return (
                <p>Voce e outra pessoa curtiram</p>
            )
        }

        if(numberLikes > 1){
            return (
                <p>Voce e outras {numberLikes} curtiram</p>
            )
        }

        return(
            <p>Voce Curtiu</p>
        )
    }

    function Verify_Other_Likes(likes){

        const numberLikes = likes.likes;

        if(numberLikes >= 2){
            return (
                <p>{numberLikes} pessoas curtiram</p>
            )
        }

        if(numberLikes > 0){
            return (
                <p>{numberLikes} pessoa curtiu</p>
            )
        }

        return (
            <p></p>
        )
    }

    function ContainerFeed() {
        return (
            <div className="container-feed">
                {userFeed.map((result, index) => {
                    return (
                        <div key={index} className="elements-feed">
                            <Link to={`/profile/${result.username}`}>
                                <div className="container-profile-feed">
                                    <div className="feed-profile">
                                        <img src={result.profilePhotos.url || "https://www.drshaneholmes.com/wp-content/uploads/2020/03/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}/>
                                        <h2>{result.username}</h2>
                                    </div>

                                    <div>
                                        <p>{result.upload_At}</p>
                                    </div>
                                </div>

                                <div className="element-profile-feed">
                                    <img src={result.url}></img>
                                </div>
                            </Link>

                            <div className='container-like-elements' id={`element-${index}`}>

                                { result.like ? <button onClick={() => RemoveLike(index, result.id_photo)}>Curtida</button> : <button onClick={() => LikeButton(index, result.id_photo)}>Like</button> }

                                { result.like ? <Verify_Likes_for_text likes={result.photo_like.length} /> : <Verify_Other_Likes likes={result.photo_like.length} />}
                            </div>  
                        </div>
                    )
                })}                
      
            </div>
        )
    }

    return (
        <div>
            <Header />
            {userFeed.length == feedLength ? <ContainerFeed /> : <h1>Loading</h1>}
            
        </div>
    )
}

export default Feed;