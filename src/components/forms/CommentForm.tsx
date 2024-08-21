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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-neutral-900 border border-slate-600 rounded-lg p-2">
            <textarea rows={2} className="px-2 py-1 bg-neutral-900 resize-none" placeholder="body" {...register("body")} />
            <div className="flex justify-end">
                <button className="w-28 bg-teal-700 rounded-2xl" type="submit">Comment</button>
            </div>
        </form>
    );
}