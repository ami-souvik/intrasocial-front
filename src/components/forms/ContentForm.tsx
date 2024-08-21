import { useForm } from "react-hook-form";
import { post } from "../../utils/webservice";

type ContentFormInputs = {
    title: string
    body: string
}

export default function ContentForm() {
    const {
        register,
        handleSubmit,
    } = useForm<ContentFormInputs>();
    function onSubmit(data: ContentFormInputs) {
        post<ContentFormInputs>('content', data).then(() => {
            console.log("posted");
        })
    }
    return (
        <div className="flex bg-neutral-900 p-4 border border-slate-600 rounded-lg">
            <div className="w-12 h-12 flex justify-center items-center">
                <p className="text-3xl">{String.fromCodePoint(parseInt('1f355', 16))}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
                <input className="p-2 text-xl border-b border-slate-600 bg-neutral-900" placeholder="Subject" {...register("title")} />
                <textarea className="p-2 bg-neutral-900 resize-none" placeholder="What is happening?"  {...register("body")} />
                <div className="flex justify-end">
                    <button className="w-24 bg-teal-700 rounded-2xl" type="submit">Post</button>
                </div>
            </form>
        </div>
    );
}