import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

type ContentFormInputs = {
    title: string
    body: string
}
const CREATE_CONTENT_MUTATION = gql`
    mutation createContent(
      $title: String!,
      $body: String!) {
    createContent(
      title: $title,
      body: $body) {
        content {
          title
          body
        }
      }
  }
`

export default function ContentForm() {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<ContentFormInputs>();
    const [createContent, { data, loading, error }] = useMutation(CREATE_CONTENT_MUTATION);
    console.log({ data, loading, error });
    function onSubmit(data: ContentFormInputs) {
        createContent({ variables: { ...data } });
        reset();
    }
    return (
        <div className="flex my-4 bg-neutral-900 p-4 border border-slate-600 rounded-lg">
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