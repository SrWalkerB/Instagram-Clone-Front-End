import { Link } from "react-router-dom";
import "./style.css"

function LoginComponent(){
    return (
        <div className="container-body-login">

            <div className="container-login">
                <h1>Instagram</h1>

                <div className="container-input-login">
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password"/>
                    <button>Log in</button>
                </div>


            </div>
                <div className='container-option-create-account'>
                    <p>Don't have an account?</p>
                    <Link to="/create/account">
                        Create Account
                    </Link>
                </div>

        </div>
    )
}


export default LoginComponent;