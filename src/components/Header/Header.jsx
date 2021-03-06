import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
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
        setRedirect(true);
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
                    {<Link to="/profile">
                        <img src={"https://cdn3.iconfinder.com/data/icons/linies-small/64/house-512.png"}/>
                    </Link>
                    }
                
                <img src="https://pics.freeicons.io/uploads/icons/png/18610531421560147113-512.png" onClick={ExitButton} />
                {redirect ? <Redirect to="/login"/> : ""}
            </div>
        </div>
    )
}

export default Header;