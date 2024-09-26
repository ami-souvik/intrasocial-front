import { useEffect, useState } from 'react'
import { gql, useApolloClient } from '@apollo/client'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { CommentType } from '.'
import Comment from './Comment'
import { getCommentSchema } from '@/queries/comment'
import Loader from '@/components/Loader'
import schema from '@/queries/schema'

function getComments(level: 0 | 1 | 2 | 3 | 4) {
  return gql`
    query getComments($id: ID!, $what: String!, $last: Int!, $offset: Int!){
      comments(id: $id, what: $what, last: $last, offset: $offset) {
        ${getCommentSchema(level)}
      }
    }
  `
}

export default function CommentList({
  id,
  count,
  comments = [],
  what = 'content',
  level = 0
}: {
  id: number
  count: number
  comments: CommentType[]
  what?: 'content' | 'comment'
  level: 0 | 1 | 2 | 3 | 4
}) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    offset: 0,
    comments: []
  })
  useEffect(() => {
    setData({
      offset: comments.length,
      comments
    })
  }, [comments])
  const client = useApolloClient()
  function fetchComments() {
    setLoading(true)
    client
      .query({
        query: getComments(level),
        variables: {
          id,
          what,
          last: schema.comment.records,
          offset: data.offset
        }
      })
      .then(({ data: resData }) => {
        setData((prev) => ({
          offset: prev.offset + schema.comment.records,
          comments: prev.comments.concat(resData.comments)
        }))
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  return (
    <div>
      {data.comments.map((c: CommentType, idx: number) => (
        <div key={idx} className="flex">
          <div className="border-l border-slate-800 translate-x-[21.9px]" />
          <Comment data={c} level={level} />
        </div>
      ))}
      {data.offset < count && (
        <a
          className="flex items-center cursor-pointer text-slate-500 space-x-2 mx-2"
          onClick={fetchComments}
        >
          <IoIosAddCircleOutline size={22} />
          {loading ? <Loader /> : <p>Show More...</p>}
        </a>
      )}
    </div>
  )
}
