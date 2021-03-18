import React, { useContext, useEffect, useState } from "react";
import Profile from "../../components/profile/Profile";
import { AuthContext } from "../../providers/auth";
import LoginPage from "../login/LoginPage";

function ProfilePage(){

    const { autorization, setAutorization } = React.useContext(AuthContext);

    return(
        <div>
            {autorization ? <Profile /> : <LoginPage />}
        </div>
    )
}

export default ProfilePage;