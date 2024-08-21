import { useEffect, useState } from "react"
import { get } from "../utils/webservice";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { handleSignOut } = useAuth();
    const [user, setUser] = useState({});
    useEffect(() => {
        get('auth/users').then(res => setUser(res.data))
    }, [])
    return <div>
        <button onClick={handleSignOut}>Sign Out</button>
        <p>{user.username}</p>
        <p>{user.first_name}</p>
        <p>{user.last_name}</p>
        <p>{user.email}</p>
    </div>
}