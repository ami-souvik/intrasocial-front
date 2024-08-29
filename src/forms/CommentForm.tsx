import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

type CommentFormInputs = {
    body: string
}

type CommentFormProps = {
    contentId: number
    onSubmitSuccess: () => void
}
const CREATE_COMMENT_MUTATION = gql`
    mutation createComment(
      $content: ID!
      $body: String!) {
    createComment(
      content: $content,
      body: $body) {
        comment {
          body
        }
      }
  }
`

export default function CommentForm({ contentId, onSubmitSuccess }
    :CommentFormProps) {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<CommentFormInputs>();
    const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
    function onSubmit(data: CommentFormInputs) {
        createComment({ variables: { content: contentId, ...data }})
        reset()
        onSubmitSuccess()
    }
    return (
        <div className="flex items-end bg-neutral-900 border border-slate-600 rounded-lg p-2">
            <textarea rows={2} className="flex-1 px-2 py-1 bg-neutral-900 resize-none" placeholder="body" {...register("body")} />
            <div className="flex justify-end">
                <p className="text-2xl cursor-pointer" onClick={handleSubmit(onSubmit)}>💬</p>
            </div>
        </div>
    );
}