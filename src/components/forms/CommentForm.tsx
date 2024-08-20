import { useForm } from "react-hook-form";
import { post } from "../../utils/webservice";

type CommentFormInputs = {
    body: string
}

export default function CommentForm({ contentId }: { contentId: string }) {
    const {
        register,
        handleSubmit,
    } = useForm<CommentFormInputs>();
    function onSubmit(data: CommentFormInputs) {
        post<CommentFormInputs>(`comment/${contentId}`, data).then(() => {
            console.log("posted");
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
            <textarea rows={3} className="px-4 py-2" placeholder="body"  {...register("body")} />
            <button type="submit">Comment</button>
        </form>
    );
}