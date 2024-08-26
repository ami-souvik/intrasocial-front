import { useRef } from "react";
import { useForm } from "react-hook-form";
import { post } from "../../utils/webservice";

type CommentFormInputs = {
    body: string
}

type CommentFormProps = {
    contentId: number
    onSubmitSuccess: () => void
}

export default function CommentForm({ contentId, onSubmitSuccess }
    :CommentFormProps) {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<CommentFormInputs>();
    function onSubmit(data: CommentFormInputs) {
        post<CommentFormInputs>(`comment/${contentId}`, data).then(() => {
            reset()
            onSubmitSuccess()
        })
        .catch(err => {
            alert(String(err))
        });
    }
    const inputRef = useRef(null);
    inputRef.current?.keypress(function (e) {
        console.log(e.which);
        if(e.which === 13 && !e.shiftKey) {
            e.preventDefault();
        
            // $(this).closest("form").submit();
        }
    });
    return (
        <div className="flex items-end bg-neutral-900 border border-slate-600 rounded-lg p-2">
            <textarea ref={inputRef} rows={2} className="flex-1 px-2 py-1 bg-neutral-900 resize-none" placeholder="body" />
            {/* {...register("body")} */}
            <div className="flex justify-end">
                <p className="text-2xl cursor-pointer" onClick={handleSubmit(onSubmit)}>
                    {String.fromCodePoint(parseInt('1F5E8', 16))}</p>
            </div>
        </div>
    );
}