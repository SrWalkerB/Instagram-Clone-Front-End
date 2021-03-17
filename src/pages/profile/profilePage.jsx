import React, { useContext, useEffect, useState } from "react";
import Profile from "../../components/profile/Profile";
import { AuthContext } from "../../providers/auth";
import LoginPage from "../login/LoginPage";

console.clear();
function ProfilePage(){

    const { autorization, setAutorization } = React.useContext(AuthContext);

    console.log(autorization);

    return(
        <div>
            {autorization ? <Profile /> : <LoginPage />}
        </div>
    )
}

export default ProfilePage;