import axios from "axios";
import { useEffect, useState } from "react";
import  "./style.css"

console.clear();

function Header(){

    const [seacherUser, setSeacherUser] = useState(["0"]);
    const [activeSearchBar, setActiveSeacherBar] = useState(false);

    useEffect( async() => {

        await SeacherUser_API();
        ExitButton();
    }, [seacherUser])

    console.log(activeSearchBar);

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

            setSeacherUser(dataUser);

        }

        console.log(seacherUser);

        SearchBar();
    }

    function SearchBar(){
        
        if(seacherUser.length == 0){
            return setActiveSeacherBar(false);
        }

        return setActiveSeacherBar(true);
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

            <input id="seacher-user" onChange={(e) => SeacherUser_API(e.target.value)} />
            
            <button onClick={ExitButton} id="button-exit">Exit</button>
        </div>
    )
}

export default Header;