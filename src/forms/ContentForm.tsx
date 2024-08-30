import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import Tiptap from "./Tiptap";
import { Top } from "@/components/Top";
import Close from "@/components/Close";
import { Body, Left, Mid, Right } from "@/components/Body";


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

export default function ContentForm({ data=null, close }: { close: () => void }) {
  console.log(close);
  
    const {
      control,
      register,
      handleSubmit,
      reset
    } = useForm<ContentFormInputs>({
      defaultValues: data
    });
    const [createContent] = useMutation(CREATE_CONTENT_MUTATION);
    const [updateContent] = useMutation(UPDATE_CONTENT_MUTATION);
    function onSubmit(data: ContentFormInputs) {
        if(data["id"]) updateContent({ variables: { ...data } });
        else createContent({ variables: { ...data } });
        reset();
        close();
    }
    return <>
      <Top>
        <div className="flex w-full justify-end space-x-4">
          <button className="bg-teal-700 mx-2" onClick={handleSubmit(onSubmit)}>Post</button>
        </div>
      </Top>
      <div>
        <input className="p-2 text-5xl border-b border-slate-600 bg-neutral-950"
        placeholder="Title" {...register("title")} />
        <Tiptap name="body" control={control} />
      </div>
    </>
}
