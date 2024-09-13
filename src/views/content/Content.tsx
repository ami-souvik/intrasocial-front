import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { CiEdit } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { CiCircleRemove } from "react-icons/ci";
import Avatar from "@/components/Avatar";
import CommentList from "@/views/comment/CommentList";
import { CommentType } from "@/views/comment/Comment";
import { UserType } from "@/views/user/User";
import { formatDate } from "@/utils/datetime";
import { confirmAction } from "@/utils/popups";
import Feedback, { FeedbackType } from "@/views/feedback/Feedback";
import { useModal } from "@/context/ModalContext";
import ContentForm from "@/forms/ContentForm";
import CommentForm from "@/forms/CommentForm";
import ContentProvider, { useContent } from "@/context/ContentContext";

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

function Content() {
  const { open } = useModal()
  const { data: contentData } = useContent()
  const [data, setData] = useState(contentData)
  const [deleteContent] = useMutation(DELETE_CONTENT_MUTATION);
  const [reply, setReply] = useState(false);
  const [edit, setEdit] = useState(false);
  function handleDeleteContent() {
    if(confirmAction({ what: 'comment' })) {
      deleteContent({
        variables: {
          id: data.id
        }
      })
    }
  }
  return <div className="flex-1 py-4">
    <div className="flex justify-between">
      <div className="flex space-x-2">
        <Avatar size="sm" emojiUnicode={data.owner.emojiUnicode} />
        <div className="flex items-end py-1">
          <p className="font-bold">{data.owner.firstName} {data.owner.lastName}</p>
          <p className="pl-2 text-sm">posted on {formatDate(new Date(data.createdAt))}</p>
        </div>
      </div>
    </div>
    <div className="my-2 overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden">
        {
          edit ? <div className="flex">
              {/** reply to this comment */}
              <div className="w-10" />
              <ContentForm id={data.id} close={() => setEdit(false)} />
          </div> :
          <>
            <div className="px-4 py-2 flex justify-between items-center">
              <h3 className="text-4xl font-bold text-wrap truncate">{data.title}</h3>
              <div className="flex space-x-2 items-center">
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
            </div>
            <div className='tiptap px-4 py-2 bg-neutral-950' dangerouslySetInnerHTML={{__html: data.body}}></div>
          </>
        }
      </div>
      {
        reply &&
        <CommentForm parentId={data.id} close={() => setReply(false)} what="content" />
      }
    </div>
    <CommentList id={data.id} count={data.commentCount} comments={data.comments} what="content" />
  </div>
}

export default () => {
  return <ContentProvider>
    <Content />
  </ContentProvider>
}

// export default () => {
//   const { contentId } = useParams();
//   return <SocketProvider id={Number(contentId)}>
//     <Content id={Number(contentId)} />
//   </SocketProvider>
// }