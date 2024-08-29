import { useState } from "react"
import { gql, useApolloClient } from "@apollo/client"
import { CONTENT_RELATED_COMMENT_LEN } from "@/screens/feed/Feed"
import CommentView, { type Comment } from "./CommentView"
import CommentForm from "@/forms/CommentForm"

const COMMENT_RECORD_LEN = 10
const COMMENTS_QUERY = gql`
  query getComments($contentId: ID!, $offset: Int!){
    comments(contentId: $contentId, last: ${COMMENT_RECORD_LEN}, offset: $offset) {
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
    }
  }
`

export default function CommentListView({ comments=[], contentId: id }:
    { comments: Comment[], contentId: number }) {
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
          contentId: id,
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
    // if (loading) return "Loading...";
    // if (error) return <pre>{error.message}</pre>
    function onSubmitSuccess() {}
    return <div>
        {data.comments.map((c: Comment, idx: number) =><CommentView key={idx} data={c} />)}
        {!eoc && <a className="cursor-pointer text-slate-500" onClick={fetchComments}>Show More...</a>}
        <CommentForm contentId={id} onSubmitSuccess={onSubmitSuccess} />
    </div>
}