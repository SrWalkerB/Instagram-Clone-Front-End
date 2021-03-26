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
    const [likeButtom, setLikeButtom] = useState(false);

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

    function LikeButon(){

        return (
            <img onClick={() => setLikeButtom(true)} id="like_button" src="https://icons-for-free.com/iconfiles/png/512/heart-131965017458786724.png"></img>
        )
    }

    function RemoveLike(){

        return (
            <img onClick={() => setLikeButtom(false)} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/OOjs_UI_icon_heart.svg/768px-OOjs_UI_icon_heart.svg.png"></img>
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
                                        <img src={ result.profilePhotos.url || "https://www.drshaneholmes.com/wp-content/uploads/2020/03/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}/>
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

                            <div className='container-like-elements'>

                                {likeButtom ? <RemoveLike /> :  <LikeButon />}
                                <p>Curtida por {result.photo_like.length} pessoas</p>
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

            { userFeed.length == feedLength ? <ContainerFeed /> : <h1>Loading</h1>}
            
        </div>
    )
}

export default Feed;