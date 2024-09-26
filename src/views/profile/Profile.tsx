import { useEffect, useState } from "react"
import { gql, useQuery } from "@apollo/client";
import { useAuth } from "../../context/AuthContext";
import ProfileForm from "@/forms/ProfileForm";
import Avatar from "../../components/Avatar";
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
    const { handleSignOut } = useAuth();
    const [showEdit, setShowEdit] = useState(false);
    const { data: userData, loading, error } = useQuery(CURRENT_QUERY);
    const [data, setData] = useState(null);
    function onUpdate(_d) {
        setShowEdit(false)
        setData(_d)
    }
    useEffect(() => {
        setData(userData?.current)
    }, [userData])
    if (loading) return <div className="flex h-10 justify-center items-center">
        <Loader size='lg' />
    </div>
    if (error) return <pre>{error.message}</pre>
    return <div className="flex flex-col p-4 rounded-lg bg-neutral-950">
        {data && showEdit ?
            <ProfileForm initialValues={data}
                close={() => setShowEdit(false)} onSubmitSuccess={onUpdate}/> :
            <div className="space-y-8">
                {data &&
                    <div className="space-y-2">
                        <div className="flex justify-between items-end">
                            <Avatar unicode={data.emojiUnicode} />
                            <button className="bg-teal-700"
                                onClick={() => setShowEdit(true)}>Edit</button>
                        </div>
                        <div className="flex">
                            <p className="opacity-50">@</p>
                            <p className="italic">{data.username}</p>
                        </div>
                        <p>{data.firstName} {data.lastName}</p>
                        <p>{data.email}</p>
                    </div>
                }
                <button className="bg-teal-700" onClick={handleSignOut}>Sign Out</button>
            </div>
        }
    </div>
}