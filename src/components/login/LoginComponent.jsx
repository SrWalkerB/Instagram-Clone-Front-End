import axios from "axios";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../providers/auth";
import "./style.css"

console.clear();

function LoginComponent(){

    const [check, setCheck] = useState(false);
    const [msgErr, setMsgErr] = useState("");
    const { setAutorization } = React.useContext(AuthContext);

    async function UserLogin(){
        
        const email = document.querySelector("#input-email").value;
        const password = document.querySelector("#input-password").value;

        if(email && password != ""){

            const loginStatus = await axios({
                baseURL: process.env.REACT_APP_API_LOGIN,
                method: "POST",
                data: {
                    email: email,
                    password: password
                },
                validateStatus: false
            }).then(resp => {
                return resp.data;
            })

            if(loginStatus.err){
                return setMsgErr(loginStatus.err);
            }

            if(loginStatus.msg){
                localStorage.setItem('token', loginStatus.msg);
                setAutorization(true);
                return setCheck(true);
            }

        }
       
    }


    return (
        <div className="container-body-login">

            <div className="container-login">
                <h1>Instagram</h1>

                <div className="container-input-login">
                    <input id={"input-email"} type="email" placeholder="Email" />
                    <input id={"input-password"} type="password" placeholder="Password"/>
                    <button onClick={() => UserLogin()}>Log in</button>

                    <h2 id="msg-err">{msgErr}</h2>
                    {check ? <Redirect to="/profile"/> : ""};
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