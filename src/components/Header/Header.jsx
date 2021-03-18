
import { useEffect } from "react";
import  "./style.css"

function Header(){

    useEffect(() => {

        ExitButton();
    }, [])

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

            <button onClick={ExitButton} id="button-exit">Exit</button>
        </div>
    )
}

export default Header;