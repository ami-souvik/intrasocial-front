import { useEffect, useState } from "react"
import { gql, useApolloClient } from "@apollo/client"
import { FeedbackType } from "./Feedback"
import User from "../user/User"

const FEEDBACK_RECORD_LEN = 10
const FEEDBACKS_QUERY = gql`
  query getFeedbacks($content: ID!, $offset: Int!){
    feedbacks(content: $content, last: ${FEEDBACK_RECORD_LEN}, offset: $offset) {
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

export default function FeedbackList({ data: id, close }: { data: number, close: () => void }) {
    const [eol, setEol] = useState(false);
    const [data, setData] = useState({
      feedbacks: [],
      offset: 0,
      last: 0,
    });
    const client = useApolloClient();
    function fetchFeedbacks() {
      client.query({
        query: FEEDBACKS_QUERY,
        variables: {
          content: id,
          offset: data.offset + data.last
        }
      })
      .then(({ data: resData }) => {
          if(resData.feedbacks.length < FEEDBACK_RECORD_LEN) {
            setEol(true)
          }
          setData(prev => ({
            last: FEEDBACK_RECORD_LEN,
            offset: prev.offset + resData.last,
            feedbacks: prev.feedbacks.concat(resData.feedbacks)
          }))
      });
    }
    useEffect(() => {
      fetchFeedbacks()
    }, [])
    return <div className="my-2">
      {data.feedbacks?.map((c: FeedbackType) => <User key={c.id} data={c.user}/>)}
    </div>
}