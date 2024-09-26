import { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import CommentList from './CommentList'
import { CommentType } from '@/views/comment'
import Actions from './Actions'
import CommentForm from '@/forms/CommentForm'
import CommentIdentity from './CommentIdentity'

export default function Comment({
  data: comment,
  level = 0
}: {
  data: CommentType
  level: 0 | 1 | 2 | 3 | 4
}) {
  const [data, setData] = useState(comment)
  const [reply, setReply] = useState(false)
  const [edit, setEdit] = useState(false)
  useEffect(() => {
    setData(comment)
  }, [comment])
  return (
    <div className="w-full">
      <div className="flex relative">
        <div
          className={`w-[12px] absolute top-[36px] left-[21px] border-l border-slate-800
                ${data.commentCount > 0 ? 'h-[95px] border-b rounded-bl-2xl' : 'h-[99px]'}`}
        />
        <div className="w-full">
          <CommentIdentity owner={data.owner} createdAt={data.createdAt} />
          {edit ? (
            <div className="flex">
              {/** reply to this comment */}
              <div className="w-10" />
              <CommentForm
                id={data.id}
                body={data.body}
                close={() => setEdit(false)}
                onSuccess={({ body }) => {
                  setData((prev) => {
                    return { ...prev, body }
                  })
                }}
              />
            </div>
          ) : (
            <div>
              <div className="flex">
                <div className="w-10" />
                <p className=" text-wrap truncate ml-2 text-sm">{data.body}</p>
              </div>
              <div className="flex my-1">
                <div className="w-8" />
                <Actions data={data} reply={() => setReply(true)} edit={() => setEdit(true)} />
              </div>
              {reply && (
                <div className="flex">
                  <div className="w-10" />
                  {/** reply to this comment */}
                  <CommentForm
                    parentId={data.id}
                    close={() => setReply(false)}
                    onSuccess={(data) => {
                      setData((prev) => {
                        const cloned = JSON.parse(JSON.stringify(prev))
                        cloned.comments.unshift({
                          ...data,
                          upvoteCount: 0,
                          downvoteCount: 0,
                          commentCount: 0,
                          comments: []
                        })
                        return cloned
                      })
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {data.commentCount > 0 && (!data.comments || data.comments.length === 0) ? (
        <div className="flex my-4 translate-y-[7px]">
          <div className="w-6" />
          <div className="w-full">
            <a
              className="flex items-center cursor-pointer text-slate-500 space-x-2 mx-2"
              onClick={() => window.open(`?id=${data.id}`, '_self')}
            >
              <IoIosAddCircleOutline size={22} />
              <p>Show More...</p>
            </a>
          </div>
        </div>
      ) : (
        data.comments.length > 0 && (
          <div className="flex my-4">
            <div className="w-6" />
            <div className="w-full">
              <CommentList
                id={data.id}
                count={data.commentCount}
                comments={data.comments}
                what="comment"
                level={level - 1}
              />
            </div>
          </div>
        )
      )}
    </div>
  )
}
