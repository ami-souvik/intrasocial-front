import { useState } from "react"
import { gql, useApolloClient } from "@apollo/client"
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
      has_reply
      createdAt
      owner {
        emojiUnicode
        username
        firstName
        lastName
        email
      }
    }
  }
`

export default function CommentList({ comments=[], id, what='content' }:
    { comments: CommentType[], id: number, what?: 'content' | 'comment' }) {
    const [eoc, setEoc] = useState(comments.length < CONTENT_RELATED_COMMENT_LEN);
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
          if(resData.comments.length < COMMENT_RECORD_LEN) {
            setEoc(true)
          }
          setData(prev => ({
            last: COMMENT_RECORD_LEN,
            offset: prev.offset + resData.last,
            comments: prev.comments.concat(resData.comments)
          }))
      });
    }
    function onSubmitSuccess() {}
    return <div>
        {data.comments.map((c: CommentType, idx: number) =><Comment key={idx} data={c} />)}
        {!eoc && <a className="cursor-pointer text-slate-500" onClick={fetchComments}>Show More...</a>}
    </div>
}