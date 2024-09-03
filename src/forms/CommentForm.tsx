import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FaCommentAlt } from "react-icons/fa";

type CommentFormInputs = {
    body: string
}

type CommentFormProps = {
    id: number
    what?: 'content' | 'comment'
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

export default function CommentForm({ id, what='content', onSubmitSuccess }
    :CommentFormProps) {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<CommentFormInputs>();
    const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
    function onSubmit(data: CommentFormInputs) {
        createComment({ variables: { id, what, ...data }})
        reset()
        if(onSubmitSuccess) onSubmitSuccess()
    }
    return (
        <div className="flex items-end bg-neutral-900 border border-slate-600 rounded-lg p-2">
            <textarea rows={2} className="flex-1 px-2 py-1 bg-neutral-900 resize-none" placeholder="body" {...register("body")} />
            <div className="flex justify-end">
                <button onClick={handleSubmit(onSubmit)}>
                    <FaCommentAlt />
                </button>
            </div>
        </div>
    );
}