import { useState } from "react"
import { gql, useQuery } from "@apollo/client";
import { useAuth } from "../../context/AuthContext";
import ProfileForm from "@/forms/ProfileForm";
import Avatar from "../../components/Avatar";
import ProfileSearch from "@/forms/ProfileSearch";

const CURRENT_QUERY = gql`
  query {
    current {
      username
      emojiUnicode
      firstName
      lastName
      email
    }
  }
`

export default function Profile() {
    const { handleSignOut } = useAuth();
    const [showEdit, setShowEdit] = useState(false);
    const { data, loading, error,refetch } = useQuery(CURRENT_QUERY);
    function onUpdate() {
        setShowEdit(false)
        refetch()
    }
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    return  <>
        <div className="flex flex-col m-4">
            {data.current && showEdit &&
                <div className="fixed top-0 left-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
                    <div className="flex flex-col items-end">
                        <button onClick={() => setShowEdit(false)}>close</button>
                        <ProfileForm initialValues={data.current} onSubmitSuccess={onUpdate}/>
                    </div>
                </div>
            }
            <div className="space-y-8">
                <ProfileSearch />
                {data.current &&
                    <div className="space-y-2">
                        <div className="flex justify-between items-end">
                            <Avatar emojiUnicode={data.current.emojiUnicode} />
                            <button className="bg-teal-700"
                                onClick={() => setShowEdit(true)}>Edit</button>
                        </div>
                        <div className="flex">
                            <p className="opacity-50">@</p>
                            <p className="italic">{data.current.username}</p>
                        </div>
                        <p>{data.current.firstName} {data.current.lastName}</p>
                        <p>{data.current.email}</p>
                    </div>
                }
                <button className="bg-teal-700" onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    </>
}