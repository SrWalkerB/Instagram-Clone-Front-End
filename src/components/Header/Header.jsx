import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import  "./style.css"

console.clear();

function Header(){

    const [seacherUser, setSeacherUser] = useState([]);
    const [activeSearchBar, setActiveSeacherBar] = useState(false);

    useEffect( async() => {

        await SeacherUser_API();
        ExitButton();

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
                dataUser.push(seacherUser[x]);
            }
        }

        return(
            <div className="search-users-suggestion">
                {dataUser.map((result, index) => {
                    return (
                        <div key={index}>
                            <li onClick={() => setActiveSeacherBar(false)}>
                                <Link to={`/profile/${result.username}`} >
                                    {result.username}
                                </Link>
                            </li>
                        </div>
                    )
                })}
            </div>
        )
    }

    function ExitButton(){

        const button_exit = document.querySelector("#button-exit");

        button_exit.onclick = () => {
            localStorage.clear();
            document.location.reload(true); 
        }
    }
    
    return(
        <div className="container-header">
            <h1>Instagram</h1>

            <div>
                <input id="seacher-user" onChange={(e) => SeacherUser_API(e.target.value)} />
                {activeSearchBar ? <SearchBar /> : ""}
            </div>
            
            <div className="user-options-header">
                <button>
                    {<Link to="/profile">
                        My Profile
                    </Link>
                    }
                </button>
                <button onClick={ExitButton} id="button-exit">Exit</button>
            </div>
        </div>
    )
}

export default Header;