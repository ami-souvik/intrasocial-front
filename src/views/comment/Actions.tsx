import { gql, useMutation } from "@apollo/client";
import { GoComment } from "react-icons/go";
import { CiCircleRemove } from "react-icons/ci";
import { useModal } from "@/context/ModalContext";
import { confirmAction } from "@/utils/popups";
import CommentForm from "@/forms/CommentForm";
import Feedback from "../feedback/Feedback";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
        success
    }
  }
`

export default function Actions({ data }) {
    const { upvoteCount, downvoteCount, commentCount } = data
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
    return <div className="flex items-center space-x-2">
        <Feedback
            id={data.id}
            what='comment'
            summary={{ upvoteCount, downvoteCount, commentCount }}
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
}