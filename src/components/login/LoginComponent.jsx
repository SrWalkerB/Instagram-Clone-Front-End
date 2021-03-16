
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
                    <a>Create Account</a>
                </div>

        </div>
    )
}


export default LoginComponent;