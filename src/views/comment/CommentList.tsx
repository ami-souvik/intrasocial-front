import { useState } from "react"
import { gql, useApolloClient } from "@apollo/client"
import { IoIosAddCircleOutline } from "react-icons/io";
import { CONTENT_RELATED_COMMENT_LEN } from "@/views/feed/Feed"
import Comment, { type CommentType } from "./Comment"

const COMMENT_RECORD_LEN = 10
const COMMENTS_QUERY = gql`
  query getComments($id: ID!
    $what: String!,
    $offset: Int!){
    comments(id: $id, what: $what, last: ${COMMENT_RECORD_LEN}, offset: $offset) {
      id
      body
      createdAt
      owner {
        emojiUnicode
        username
        firstName
        lastName
        email
      }
      upvoteCount
      downvoteCount
      feedback {
        id
        vote
        user {
          firstName
          lastName
          emojiUnicode
        }
      }
      feedbacks {
        id
        vote
        user {
          firstName
          lastName
          emojiUnicode
        }
      }
    }
  }
`

export default function CommentList({ id, count, comments=[], what='content' }:
    { id: number, count: number, comments: CommentType[], what?: 'content' | 'comment' }) {
    const [data, setData] = useState({
      last: comments.length,
      offset: 0,
      comments,
    });
    const client = useApolloClient();
    function fetchComments() {
      client.query({
        query: COMMENTS_QUERY,
        variables: {
          id,
          what,
          offset: data.offset + data.last
        }
      })
      .then(({ data: resData }) => {
          setData(prev => ({
            last: COMMENT_RECORD_LEN,
            offset: prev.offset + resData.last,
            comments: prev.comments.concat(resData.comments)
          }))
      });
    }
    return <div>
        {data.comments.map((c: CommentType, idx: number) =><Comment key={idx} data={c} />)}
        {data.last < count && <a className="flex items-center cursor-pointer text-slate-500 space-x-2 mx-2" onClick={fetchComments}>
          <IoIosAddCircleOutline size={22} />
          <p>Show More...</p>
        </a>}
    </div>
}