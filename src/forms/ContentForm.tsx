import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import Tiptap from "./Tiptap";
import Close from "@/components/Close";


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
const UPDATE_CONTENT_MUTATION = gql`
    mutation updateContent(
      $id: ID!,
      $title: String!,
      $body: String!) {
    updateContent(
      id: $id,
      title: $title,
      body: $body) {
        content {
          title
          body
        }
      }
  }
`

export default function ContentForm({ data: { id, title, body }, close }: { close: () => void }) {
  const {
    control,
    register,
    handleSubmit,
    reset
  } = useForm<ContentFormInputs>({
    defaultValues: {
      title, body
    }
  });
  const [createContent] = useMutation(CREATE_CONTENT_MUTATION);
  const [updateContent] = useMutation(UPDATE_CONTENT_MUTATION);
  function onSubmit(data: ContentFormInputs) {
      if(id) updateContent({ variables: { id, ...data } });
      else createContent({ variables: { ...data } });
      reset();
      close();
  }
  return <div>
    <div className="flex justify-end w-full max-w-[750px]">
      <Close onClick={close} />
    </div>
    <div className="rounded-lg border border-slate-600 bg-neutral-950 max-w-[750px] overflow-x-hidden">
      <div className="flex justify-between items-center px-8 bg-zinc-900 border-slate-700 py-3">
        <p className="text-xl font-bold">Write Post</p>
        <div className="space-x-4">
          <button className="bg-teal-700" onClick={handleSubmit(onSubmit)}>Post</button>
        </div>
      </div>
      <div className="px-8 py-4 space-y-4">
        <input className="w-full p-2 text-5xl border border-slate-600 bg-neutral-950 rounded-xl"
        placeholder="Title" {...register("title")} />
        <div className="p-2 border border-slate-600 bg-neutral-950 rounded-xl min-h-32">
          <Tiptap name="body" control={control} />
        </div>
      </div>
    </div>
  </div>
}
