import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import  "./style.css"

console.clear();

function Header(){

    const [seacherUser, setSeacherUser] = useState([]);
    const [activeSearchBar, setActiveSeacherBar] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect( async() => {

        await SeacherUser_API();

    }, [seacherUser])


    async function SeacherUser_API(name){

        const token = localStorage.getItem("token");

        if(name != undefined){

            const dataUser = await axios({
                method: 'GET',
                baseURL: `${process.env.REACT_APP_API_PROFILE}/${name}`,
                headers: {
                    token: token
                }
            }).then(resp => {
                 return resp.data;
            })
            
           return setSeacherUser(dataUser);
        }


        if(seacherUser.length > 0 && seacherUser != undefined){
            return setActiveSeacherBar(true);
        }else{
            return setActiveSeacherBar(false);
        }  
    }

    function SearchBar(){

        let dataUser = [];
        
        for(let x = 0; x < 10; x++){

            if(seacherUser[x] != undefined){
                dataUser.push(seacherUser[x].username);
            }
        }

        return(
            <div className="search-users-suggestion">
                {dataUser.map((result, index) => {
                    return (
                        <div key={index}>
                            <li onClick={() => setActiveSeacherBar(false)}>
                                <Link to={`/profile/${result}`} >
                                    <p>{result}</p>
                                </Link>
                            </li>
                        </div>
                    )
                })}
            </div>
        )
    }

    function ExitButton(){
    
        localStorage.clear();
        document.location.reload(true);    
    
    }
    
    return(
        <div className="container-header">
            <Link to="/feed">
                <div className="header-logo">
                    <img src={"https://image.flaticon.com/icons/png/512/87/87390.png"}></img>
                    <h1>Instagram</h1>
                </div>
            </Link> 

            <div>
                <input id="seacher-user" placeholder="Searcher" onChange={(e) => SeacherUser_API(e.target.value)} />
                {activeSearchBar ? <SearchBar /> : ""}
            </div>
            
            <div className="user-options-header">
                <button>
                    {<Link to="/profile">
                        <p>My Profile</p>
                    </Link>
                    }
                </button>
                <button onClick={ExitButton} id="button-exit">Exit</button>
            </div>
        </div>
    )
}

export default Header;