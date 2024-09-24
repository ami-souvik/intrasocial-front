import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { CiEdit } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { CiCircleRemove } from "react-icons/ci";
import Avatar from "@/components/Avatar";
import CommentList from "@/views/comment/CommentList";
import { CommentType } from "@/views/comment";
import { UserType } from "@/views/user/User";
import { formatDate } from "@/utils/datetime";
import { confirmAction } from "@/utils/popups";
import Feedback, { FeedbackType } from "@/views/feedback/Feedback";
import ContentForm from "@/forms/ContentForm";
import CommentForm from "@/forms/CommentForm";
import { getCommentSchema } from "@/queries/comment";
import Loader from "@/components/Loader";

const CONTENT_RELATED_COMMENT_LEN = 2
const CONTENT_QUERY = gql`
  query getContent($content: ID!, $comment: ID! = -1){
    contents(content: $content) {
      id
      title
      body
      feedback {
        id
        vote
        user {
          firstName
          lastName
          emojiUnicode
        }
      }
      owner {
        firstName
        lastName
        emojiUnicode
      }
      upvoteCount
      downvoteCount
      createdAt
      commentCount
      comments(comment: $comment, last: ${CONTENT_RELATED_COMMENT_LEN}) {
        ${getCommentSchema(4)}
      }
    }
  }
`

export type ContentType = {
  id: number,
  owner: UserType,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
  feedback: FeedbackType,
  commentCount: number,
  comments: CommentType[],
  upvoteCount: number,
  downvoteCount: number,
  feedbacks: FeedbackType[]
}

const DELETE_CONTENT_MUTATION = gql`
  mutation deleteContent($id: ID!) {
    deleteContent(id: $id) {
      success
    }
  }
`

export default function Content() {
  const { content } = useParams();
  const searchParams = useSearchParams()[0];
  const client = useApolloClient();
  const [data, setData] = useState<ContentType | null>(null);
  const [deleteContent] = useMutation(DELETE_CONTENT_MUTATION);
  const [reply, setReply] = useState(false);
  const [edit, setEdit] = useState(false);
  function queryContent() {
    client.query({
      query: CONTENT_QUERY,
      variables: { content, comment: searchParams.get("id") || -1 }
    })
    .then(({ data }) => {
      setData(data.contents[0])
    });
  }
  function handleDeleteContent() {
    if(confirmAction({ what: 'comment' })) {
      deleteContent({
        variables: {
          id: data.id
        }
      })
    }
  }
  useEffect(() => {
    queryContent()
  }, [])
  if (!data) return <div className="flex h-screen justify-center items-center">
    <Loader size='lg' />
  </div>
  return <div className="flex-1 py-4">
    <div className="flex justify-between">
      <div className="flex space-x-2">
        <Avatar size="sm" emojiUnicode={data.owner.emojiUnicode} />
        <div className="flex items-end py-1">
          <p className="font-bold capitalize">{data.owner.firstName} {data.owner.lastName}</p>
          <p className="pl-2 text-sm">posted on {formatDate(new Date(data.createdAt))}</p>
        </div>
      </div>
    </div>
    <div className="my-2 overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden">
        {
          edit ? <div className="flex">
              {/** reply to this comment */}
              <ContentForm data={data}
              close={() => setEdit(false)} onSuccess={({ title, body }) => {
                setData(prev => {
                  let obj: ContentType = {}
                  if(prev) obj = JSON.parse(JSON.stringify(prev))
                  obj.title = title
                  obj.body = body
                  return obj
                })
              }} />
          </div> :
          <>
            <div className="px-4 py-2 flex justify-between items-center">
              <h3 className="text-4xl font-bold text-wrap truncate">{data.title}</h3>
            </div>
            <div className='tiptap px-4 py-2 bg-neutral-950' dangerouslySetInnerHTML={{__html: data.body}}></div>
            <div className="flex space-x-2 justify-end items-center">
              <Feedback
                id={data.id}
                summary={{
                  upvoteCount: data.upvoteCount,
                  downvoteCount: data.downvoteCount,
                  commentCount: data.commentCount
                }}
                data={data.feedback}
              />
              <button onClick={() => setReply(true)}><GoComment /></button>
              <button onClick={() => setEdit(true)}><CiEdit size={22} /></button>
              <div className="rounded-lg cursor-pointer" onClick={handleDeleteContent}>
                  <CiCircleRemove size={20} />
              </div>
            </div>
          </>
        }
      </div>
      {
        reply &&
        <CommentForm parentId={data.id} close={() => setReply(false)} what="content" />
      }
    </div>
    <CommentList
      id={data.id}
      count={searchParams.get("id") ? 1 : data.commentCount}
      comments={data.comments}
      what="content"
      level={4}
    />
  </div>
}