import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FaCommentAlt } from "react-icons/fa";
import Close from "@/components/Close";
import { CommentType } from "@/views/comment";

type CommentFormInputs = {
  body: string
}

type CommentFormProps = {
  id?: number
  body?: string
  parentId?: number
  what?: 'content' | 'comment'
  close: () => void
  onSuccess?: (v: CommentType) => void
  onError?: (v: any) => void
}
const CREATE_COMMENT_MUTATION = gql`
  mutation createComment(
    $id: ID!
    $what: String!
    $body: String!) {
  createComment(
    id: $id,
    what: $what,
    body: $body) {
      comment {
        id
        body
        owner {
          emojiUnicode
          firstName
          lastName
        }
        createdAt
        updatedAt
      }
    }
  }
`
const UPDATE_COMMENT_MUTATION = gql`
  mutation updateComment(
    $id: ID!
    $body: String!) {
  updateComment(
    id: $id,
    body: $body) {
      comment {
        id
        body
      }
    }
  }
`

export default function CommentForm({ id, body, parentId, what='comment', close, onSuccess, onError }
    :CommentFormProps) {
    const {
      register,
      handleSubmit,
      reset,
    } = useForm<CommentFormInputs>({
      defaultValues: {
        body
      }
    });
    const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
    const [updateComment] = useMutation(UPDATE_COMMENT_MUTATION);
    function onSubmit(data: CommentFormInputs) {
        if(!id) createComment({ variables: { id: parentId, what, ...data }})
          .then((res) => {
            if(onSuccess) onSuccess(res.data.createComment.comment)
          })
          .catch((res) => {
            if(onError) onError(res.data.createComment.comment)
          })
        else updateComment({ variables: { id, ...data }})
          .then(() => {
            if(onSuccess) onSuccess(data)
          })
          .catch(() => {
            if(onError) onError(data)
          })
        reset()
        close()
    }
    return (
      <div className="flex items-end w-full bg-neutral-900 border border-slate-600 rounded-lg p-2">
        <textarea autoFocus rows={2} className="flex-1 px-2 py-1 bg-neutral-900 resize-none" placeholder="body" {...register("body")} />
        <div className="flex justify-end">
          <Close size={24} onClick={close} />
          <button onClick={handleSubmit(onSubmit)}>
            <FaCommentAlt />
          </button>
        </div>
      </div>
    );
}