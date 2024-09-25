import { useState } from "react"
import { gql, useQuery } from "@apollo/client";
import { useApp } from "../../context/AuthContext";
import ProfileForm from "@/forms/ProfileForm";
import Avatar from "../../components/Avatar";
import Close from "@/components/Close";
import Loader from "@/components/Loader";

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
    const { handleSignOut } = useApp();
    const [showEdit, setShowEdit] = useState(false);
    const { data, loading, error,refetch } = useQuery(CURRENT_QUERY);
    function onUpdate() {
        setShowEdit(false)
        refetch()
    }
    if (loading) return <div className="flex h-10 justify-center items-center">
        <Loader size='lg' />
    </div>
    if (error) return <pre>{error.message}</pre>
    return <div className="flex flex-col p-4 rounded-lg bg-neutral-950">
        {data.current && showEdit &&
            <div className="fixed top-0 left-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col items-end">
                    <div className="flex justify-end">
                        <Close onClick={() => setShowEdit(false)} />
                    </div>
                    <ProfileForm initialValues={data.current} onSubmitSuccess={onUpdate}/>
                </div>
            </div>
        }
        <div className="space-y-8">
            {data.current &&
                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <Avatar unicode={data.current.emojiUnicode} />
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
}