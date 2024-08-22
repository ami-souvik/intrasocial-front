import { useEffect, useState } from "react"
import { get } from "../utils/webservice";
import { useAuth } from "../context/AuthContext";
import ProfileForm from "../components/forms/ProfileForm";
import Avatar from "../components/Avatar";

type ProfileProps = {
    username: string
    emoji_unicode: string
    first_name: string
    last_name: string
    email: string
}

export default function Profile() {
    const { handleSignOut } = useAuth();
    const [showEdit, setShowEdit] = useState(false);
    const [user, setUser] = useState<ProfileProps>();
    useEffect(() => {
        get('auth/users').then(res => setUser(res.data))
    }, [])
    return <div className="fixed my-4 mx-8 space-y-2">
        {user && showEdit &&
            <div className="fixed top-0 left-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col items-end">
                    <button onClick={() => setShowEdit(false)}>close</button>
                    <ProfileForm initialValues={user} onSubmitSuccess={() => setShowEdit(false)}/>
                </div>
            </div>
        }
        <button onClick={handleSignOut}>Sign Out</button>
        {user &&
            <div className="space-y-2">
                <Avatar emoji_unicode={user.emoji_unicode} />
                <p>{user.username}</p>
                <p>{user.first_name}</p>
                <p>{user.last_name}</p>
                <p>{user.email}</p>
                <button className="bg-teal-700 rounded-2xl"
                    onClick={() => setShowEdit(true)}>Edit</button>
            </div>
        }
    </div>
}