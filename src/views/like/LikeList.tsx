import { useEffect, useState } from "react"
import { gql, useApolloClient } from "@apollo/client"
import { LikeType } from "./Like"
import User from "../user/User"
import Close from "@/components/Close";

const LIKE_RECORD_LEN = 10
const LIKES_QUERY = gql`
  query getLikes($content: ID!, $offset: Int!){
    likes(content: $content, last: ${LIKE_RECORD_LEN}, offset: $offset) {
      id
      user {
        emojiUnicode
        username
        firstName
        lastName
        email
      }
    }
  }
`

export default function LikeList({ data: id, close }: { data: number, close: () => void }) {
    const [eol, setEol] = useState(false);
    const [data, setData] = useState({
      likes: [],
      offset: 0,
      last: 0,
    });
    const client = useApolloClient();
    function fetchLikes() {
      client.query({
        query: LIKES_QUERY,
        variables: {
          content: id,
          offset: data.offset + data.last
        }
      })
      .then(({ data: resData }) => {
          if(resData.likes.length < LIKE_RECORD_LEN) {
            setEol(true)
          }
          setData(prev => ({
            last: LIKE_RECORD_LEN,
            offset: prev.offset + resData.last,
            likes: prev.likes.concat(resData.likes)
          }))
      });
    }
    useEffect(() => {
        fetchLikes()
    }, [])
    return <div className="my-2">
      {data.likes?.map((c: LikeType) => <User key={c.id} data={c.user}/>)}
    </div>
}