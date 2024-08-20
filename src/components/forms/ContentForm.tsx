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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <input className="px-4 py-2 text-4xl" placeholder="title" {...register("title")} />
            <input className="px-4 py-2" placeholder="body"  {...register("body")} />
            <button type="submit">Post</button>
        </form>
    );
}