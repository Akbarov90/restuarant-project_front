import {useState} from "react";
import {Base64} from "js-base64";

function User() {
    const [role, setRole] = useState(JSON.parse(Base64.decode(localStorage.getItem('Authority'))).data)
    console.log(role)
    return(
        <div>
            User
        </div>
    )
}

export default User