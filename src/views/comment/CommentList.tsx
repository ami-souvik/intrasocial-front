import { useEffect, useState } from "react"
import { gql, useApolloClient } from "@apollo/client"
import { IoIosAddCircleOutline } from "react-icons/io";
import { CommentType } from ".";
import Comment from "./Comment"
import { getCommentSchema } from "@/queries/comment";

const COMMENT_RECORD_LEN = 10
function getComments(level: 0 | 1 | 2 | 3 | 4) {
  return gql`
    query getComments($id: ID!, $what: String!, $offset: Int!){
      comments(id: $id, what: $what, last: ${COMMENT_RECORD_LEN}, offset: $offset) {
        ${getCommentSchema(level)}
      }
    }
  `
}

export default function CommentList({ id, count, comments=[], what='content', level=0 }:
  { id: number, count: number, comments: CommentType[], what?: 'content' | 'comment', level: 0 | 1 | 2 | 3 | 4 }) {
  const [data, setData] = useState({
    last: comments.length,
    offset: 0,
    comments,
  });
  useEffect(() => {
    setData({
      last: comments.length,
      offset: 0,
      comments,
    })
  }, [comments])
  const client = useApolloClient();
  function fetchComments() {
    client.query({
      query: getComments(level),
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
    {data.comments.map((c: CommentType, idx: number) =>
      <div key={idx} className="flex">
        <div className="border-l border-slate-800 translate-x-[18.9px]" />
        <Comment data={c} level={level} />
      </div>)}
    {data.last < count && <a className="flex items-center cursor-pointer text-slate-500 space-x-2 mx-2" onClick={fetchComments}>
      <IoIosAddCircleOutline size={22} />
      <p>Show More...</p>
    </a>}
  </div>
}