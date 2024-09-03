import { gql, useMutation } from "@apollo/client"
import { useModal } from "@/context/ModalContext";
import Avatar from "@/components/Avatar"
import { formatDatetime } from "@/utils/datetime"
import { confirmAction } from "@/utils/popups"
import { GoComment } from "react-icons/go";
import { CiCircleRemove } from "react-icons/ci";
import CommentList from "./CommentList";
import CommentForm from "@/forms/CommentForm";
import Feedback from "../feedback/Feedback";


export type CommentType = {
    id: number,
    owner: {
        emojiUnicode: string,
        username: string,
        firstName: string,
        lastName: string,
        email: string,
    },
    content: number,
    body: string,
    createdAt: string,
    updatedAt: string,
    comments: CommentType[]
}

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
        success
    }
  }
`

export default function Comment({ data }: { data: CommentType }) {
    const { open } = useModal()
    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION);
    function handleDeleteComment() {
        if(confirmAction({ what: 'comment' })) {
            deleteComment({
                variables: {
                    id: data.id
                }
            })
        }
    }
    return <div>
        <div className="flex justify-between items-end">
            <div className="flex space-x-2 items-center">
                <Avatar size="sm" emojiUnicode={data.owner.emojiUnicode} />
                <div>
                    <p className="font-bold">{data.owner.firstName} {data.owner.lastName}</p>
                    <p className="text-sm">{formatDatetime(new Date(data.createdAt))}</p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Feedback
                    id={data.id}
                    summary={{
                        upvoteCount: data.upvoteCount,
                        downvoteCount: data.downvoteCount,
                        commentCount: data.commentCount
                    }}
                    data={data.feedback}
                />
                <button onClick={() => open(CommentForm, {
                    data: {
                        id: data.id,
                        what: 'comment'
                    }
                })}><GoComment /></button>
                <p>{data.commentCount}</p>
                <div className="rounded-lg cursor-pointer" onClick={handleDeleteComment}>
                    <CiCircleRemove size={20} />
                </div>
            </div>
        </div>
        <div className="my-2">
            <p>{data.body}</p>
        </div>
        <div className="flex my-4">
            <div className="w-6" />
            <div className="w-full">
                {data.comments && <CommentList comments={data.comments} id={data.id} what='comment' />}
            </div>
        </div>
    </div>
}