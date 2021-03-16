import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./style.css"

console.clear();
function CreateAccountPage(){

    const [resultERR, SetResultERR] = useState("");

    async function GetInputData(){

        const full_name = document.querySelector("#input-full-name").value;
        const username = document.querySelector("#input-username").value;
        const email = document.querySelector("#input-email").value;
        const password = document.querySelector("#input-password").value;

        if(full_name || username || email || password !== ""){

            const userCreate = await axios({
                method: "POST",
                baseURL: process.env.REACT_APP_API_CREATE,
                data: {
                    name_full: full_name,
                    username: username,
                    email: email,
                    password: password
                },
                validateStatus: false
            }).then(resp => {
                return resp.data;
            })

            
            if(userCreate.err){
                return SetResultERR(userCreate.err);
            }

            

            SetResultERR("");
        }
    }

    return (
        <div className="container-body-login">

            <div className="container-create-account">
                <h1>Instagram</h1>
                <h3>Sign up to see photos and videos from your friends.</h3>

                <div className="container-input-login">
                    <input id="input-full-name" placeholder="Full Name" />
                    <input id="input-username" placeholder="Username" />
                    <input id="input-email" type="email" placeholder="Email" />
                    <input id="input-password" type="password" placeholder="Password"/>
                    <button onClick={() => GetInputData()}>Create Account</button>
                </div>

                <p id="msg-err">{resultERR}</p>
            </div>
                <div className="container-option-create-account">
                    <p>Have an account?</p>
                    <Link to="/">
                        Log in
                    </Link>
                </div>
        </div>
    )
}


export default CreateAccountPage;