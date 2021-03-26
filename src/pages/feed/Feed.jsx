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
    const [ loading, setLoading] = useState(true);

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