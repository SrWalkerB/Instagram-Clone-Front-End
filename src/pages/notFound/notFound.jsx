import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.css";

function NotFound(){

    useEffect(() => {

    }, []);

    return(
        <div className="container-not-found">
            <div className="not-found-msg">
                <h1>User Not Found</h1>
            </div>

            <div className="not-found-buttons">
                <Link to="/profile">
                    Return Profile
                </Link>
            </div>
        </div>
    )
}

export default NotFound;