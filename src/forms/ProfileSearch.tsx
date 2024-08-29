import { useEffect, useState } from "react"
import { gql, useApolloClient } from "@apollo/client";
import Avatar from "../components/Avatar";

const USER_RECORD_LEN = 10
const USERS_QUERY = gql`
  query getProfiles($name: String!){
    users(name: $name, last: ${USER_RECORD_LEN}, offset: 0) {
      id
      username
      emojiUnicode
      firstName
      lastName
      email
    }
  }
`

export default function ProfileSearch() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState({ last: 0, offset: 0, users: [] });
    const client = useApolloClient();
    const fetchProfiles = () => {
      client.query({
        query: USERS_QUERY,
        variables: {
          name: search
        }
      })
      .then(({ data: resData }) => {
        setData(prev => ({
          last: USER_RECORD_LEN,
          offset: prev.offset + resData.last,
          users: prev.users.concat(resData.users)
        }))
      });
  }
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        setData({ last: 0, offset: 0, users: [] })
        if(search) {
          fetchProfiles()
        }
      }, 700)
      return () => clearTimeout(delayDebounceFn)
    }, [search])
    return <div>
      <input className="p-2 w-full bg-neutral-950 rounded border border-slate-600" placeholder="Search friends" value={search}
      onChange={e => setSearch(e.target.value)}></input>
      <div className="relative">
        <div className="absolute top-2 rounded-lg bg-black w-full">
          {data.users.map(u => <div className="flex items-center p-1 space-x-2">
            <Avatar size="sm" emojiUnicode={u.emojiUnicode} />
            <p>{u.firstName} {u.lastName}</p>
          </div>)}
        </div>
      </div>
    </div>
}