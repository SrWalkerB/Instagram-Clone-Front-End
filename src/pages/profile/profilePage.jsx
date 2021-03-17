import { useState } from "react";
import Not_Autenticanting from "../../components/not_Autenticating/Not_Autenticanting";
import Profile from "../../components/profile/Profile";

function ProfilePage(){

    const [showProfile, setShowProfile] = useState(false);

    return(
        <div>
            {showProfile ? <Profile /> : <Not_Autenticanting />}
        </div>
    )
}

export default ProfilePage;