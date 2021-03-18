import axios from "axios";
import React, { useState } from "react";
import { Link, Redirect, Route } from "react-router-dom";

import "./style.css"

function CreateAccountPage(){

    const [resultCreateAccount, SetResultAccount] = useState("");
    const [redirect, setRedirect] = useState(false);


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
                return SetResultAccount(<p id="msg-err">{userCreate.err}</p>);
            }

            SetResultAccount(<p id="msg-ok">Account Create!</p>);

            setInterval(() => {
                setRedirect(true);
            }, 2000)
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

                    {redirect == true ? <Redirect to="/login"/> : ""}
                </div>

                {resultCreateAccount}

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