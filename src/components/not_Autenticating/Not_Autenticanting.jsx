import { Link } from "react-router-dom";
import "./style.css"

function Not_Autenticanting(){
    return(
        <div className='container-not-autenticanting'>
            <h1>Not Autenticating</h1>
            <button>
                <Link to="/login">
                    Return Login
                </Link>
            </button>
        </div>
    )
}


export default Not_Autenticanting;