import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Close from "@/components/Close";
import { FaCommentAlt } from "react-icons/fa";
import { ContentType } from "@/views/content/Content";
import { CommentType } from "@/views/comment/Comment";

type CommentFormInputs = {
    body: string
}

type CommentFormProps = {
    data: {
        data: ContentType | CommentType,
        what?: 'content' | 'comment'
    },
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

export default function CommentForm({ data: { data: parentData, what='content' }, close, onSubmitSuccess }
    :CommentFormProps) {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<CommentFormInputs>();
    const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
    function onSubmit(data: CommentFormInputs) {
        createComment({ variables: { id: parentData.id, what, ...data }})
        reset()
        if(onSubmitSuccess) onSubmitSuccess()
    }
    return (
        <div className="flex flex-col justify-end h-full w-full max-w-[750px] my-8">
            <div className="flex items-end w-full bg-neutral-900 border border-slate-600 rounded-lg p-2">
                <textarea rows={2} className="flex-1 px-2 py-1 bg-neutral-900 resize-none" placeholder="body" {...register("body")} />
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