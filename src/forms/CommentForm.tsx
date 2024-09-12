import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FaCommentAlt } from "react-icons/fa";
import Close from "@/components/Close";

type CommentFormInputs = {
    body: string
}

type UpdateCommentType = {
    id: number
    body?: string
}

type CommentFormProps = {
    data: {
        id?: number
        body?: string
        parentId?: number
        comment?: UpdateCommentType
        what?: 'content' | 'comment'
    }
    close: () => void
    onSubmitSuccess?: () => void
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
          body
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
          body
        }
      }
    }
`

export default function CommentForm({ data: { id, body="", parentId, what='content' }, close, onSubmitSuccess }
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
        else updateComment({ variables: { id, ...data }})
        reset()
        if(onSubmitSuccess) onSubmitSuccess()
        close()
    }
    return (
        <div className="flex flex-col justify-end h-full w-full max-w-[750px] my-8">
            <div className="flex items-end w-full bg-neutral-900 border border-slate-600 rounded-lg p-2">
                <textarea autoFocus rows={2} className="flex-1 px-2 py-1 bg-neutral-900 resize-none" placeholder="body" {...register("body")} />
                <div className="flex justify-end">
                    <Close size={24} onClick={close} />
                    <button onClick={handleSubmit(onSubmit)}>
                        <FaCommentAlt />
                    </button>
                </div>
            </div>
        </div>
    );
}