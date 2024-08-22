import { useForm } from "react-hook-form";
import { post } from "../../utils/webservice";
import EmojiPicker from "../EmojiPicker";

export type ProfileFormInputs = {
    emoji_unicode: string
    first_name: string
    last_name: string
    email: string
}

export default function ProfileForm({ initialValues, onSubmitSuccess }: { initialValues: ProfileFormInputs, onSubmitSuccess: () => void }) {
    const {
        control,
        register,
        handleSubmit,
        reset,
    } = useForm<ProfileFormInputs>({
        defaultValues: initialValues
    });
    function onSubmit(data: ProfileFormInputs) {
        post<ProfileFormInputs>('auth/users/update', data).then(() => {
            console.log(data);
            reset()
            onSubmitSuccess()
        })
        .catch(err => {
            console.log(err);
            alert(String(err))
        });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-neutral-900 border border-slate-600 rounded-lg p-2">
            <EmojiPicker name="emoji_unicode" control={control} />
            <input className="p-2 text-xl border-b border-slate-600 bg-neutral-900" placeholder="first_name" {...register("first_name")} />
            <input className="p-2 text-xl border-b border-slate-600 bg-neutral-900" placeholder="last_name" {...register("last_name")} />
            <input className="p-2 text-xl border-b border-slate-600 bg-neutral-900" placeholder="email" {...register("email")} />
            <div className="flex justify-end">
                <button className="bg-teal-700 rounded-2xl" type="submit">Update</button>
            </div>
        </form>
    )
}