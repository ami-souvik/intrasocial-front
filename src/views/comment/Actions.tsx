import { gql, useMutation } from "@apollo/client";
import { GoComment } from "react-icons/go";
import { CiCircleRemove, CiEdit } from "react-icons/ci";
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
    const { id, upvoteCount, downvoteCount, commentCount } = data
    const { open } = useModal()
    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION);
    function handleDeleteComment() {
        if(confirmAction({ what: 'comment' })) {
            deleteComment({
                variables: {
                    id
                }
            })
        }
    }
    return <div className="flex items-center space-x-2">
        <Feedback
            id={id}
            what='comment'
            summary={{ upvoteCount, downvoteCount, commentCount }}
            data={data.feedback}
        />
        <button onClick={() => open(CommentForm, {
            data: {
                parentId: id,
                what: 'comment'
            }
        })}><GoComment /></button>
        <p>{data.commentCount || 0}</p>
        <button onClick={() => open(CommentForm, {
            data: {
                id,
                body: data.body,
                what: 'comment'
            }
        })}><CiEdit size={22} /></button>
        <div className="rounded-lg cursor-pointer" onClick={handleDeleteComment}>
            <CiCircleRemove size={20} />
        </div>
    </div>
}