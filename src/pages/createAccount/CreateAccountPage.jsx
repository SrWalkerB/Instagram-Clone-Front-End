import { Link } from "react-router-dom";

import "./style.css"

function CreateAccountPage(){
    return (
        <div className="container-body-login">

            <div className="container-create-account">
                <h1>Instagram</h1>
                <h3>Sign up to see photos and videos from your friends.</h3>

                <div className="container-input-login">
                    <input placeholder="Full Name" />
                    <input placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password"/>
                    <button>Create Account</button>
                </div>

                <div className="container-option-create-account">
                    <p>Have an account?</p>
                    <Link to="/">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default CreateAccountPage;