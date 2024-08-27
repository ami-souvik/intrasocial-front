import { useForm } from "react-hook-form";
import { post } from "../../utils/webservice";
import Avatar from "../Avatar";

type ContentFormInputs = {
    title: string
    body: string
}

export default function ContentForm() {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<ContentFormInputs>();
    function onSubmit(data: ContentFormInputs) {
        post<ContentFormInputs>('content', data).then(() => {
            reset()
        })
        .catch(err => {
            alert(String(err))
        });
    }
    return (
        <div className="flex my-4 bg-neutral-900 p-4 border border-slate-600 rounded-lg">
            {/* <Avatar emojiUnicode={user.emojiUnicode} /> */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
                <input className="p-2 text-xl border-b border-slate-600 bg-neutral-900" placeholder="Subject" {...register("title")} />
                <textarea className="p-2 bg-neutral-900 resize-none" placeholder="What is happening?"  {...register("body")} />
                <div className="flex justify-end">
                    <button className="bg-teal-700 rounded-2xl" type="submit">Post</button>
                </div>
            </form>
        </div>
    );
}