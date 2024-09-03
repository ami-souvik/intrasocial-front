import { gql, useMutation } from "@apollo/client";
import Avatar from "@/components/Avatar";
import { CiEdit } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import CommentList from "@/views/comment/CommentList";
import { CommentType } from "@/views/comment/Comment";
import { UserType } from "@/views/user/User";
import { formatDate } from "@/utils/datetime";
import { confirmAction } from "@/utils/popups";
import Feedback, { FeedbackType } from "@/views/feedback/Feedback";
import { useModal } from "@/context/ModalContext";
import ContentForm from "@/forms/ContentForm";

export type ContentType = {
    id: number,
    owner: UserType,
    title: string,
    body: string,
    createdAt: string,
    updatedAt: string,
    feedback: FeedbackType[],
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

export function Content({ data }: { data: ContentType }) {
    const { open } = useModal()
    const [deleteContent] = useMutation(DELETE_CONTENT_MUTATION);
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
        <div className="my-2 border border-slate-600 bg-neutral-900 rounded-xl overflow-hidden">
            <div className="flex flex-1 flex-col overflow-hidden">
                <div className="px-4 py-2 flex justify-between items-center bg-neutral-900">
                    <h3 className="text-xl font-bold text-wrap truncate">{data.title}</h3>
                    <div className="flex space-x-2 items-center">
                        <Feedback
                            id={data.id}
                            summary={{
                                upvoteCount: data.upvoteCount,
                                downvoteCount: data.downvoteCount,
                                commentCount: data.commentCount
                            }}
                            data={data.feedback[0]}
                        />
                        <button onClick={() => open(ContentForm, {
                            modalClassName: 'h-full',
                            data
                        })}><CiEdit size={22} /></button>
                        <div className="rounded-lg cursor-pointer" onClick={handleDeleteContent}>
                            <CiCircleRemove size={20} />
                        </div>
                    </div>
                </div>
                <div className="border-b border-slate-600"></div>
                <div className='tiptap px-4 py-2 bg-neutral-950' dangerouslySetInnerHTML={{__html: data.body}}></div>
            </div>
        </div>
        <CommentList comments={data.comments} id={data.id} what="comment" />
    </div>
}