import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import Tiptap from "./Tiptap";
import { Top } from "../Top";
import { Body, Left, Mid, Right } from "../Body";


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
      $title: String!,
      $body: String!) {
    updateContent(
      title: $title,
      body: $body) {
        content {
          title
          body
        }
      }
  }
`

export default function ContentForm({ data=null, closeContentForm }: { closeContentForm: () => void }) {
    const {
        control,
        register,
        handleSubmit,
        reset
    } = useForm<ContentFormInputs>({
        defaultValues: data
    });
    const [createContent] = useMutation(CREATE_CONTENT_MUTATION);
    function onSubmit(data: ContentFormInputs) {
        createContent({ variables: { ...data } });
        reset();
        closeContentForm();
    }
    return <div className="fixed top-0 left-0 w-screen h-screen overflow-y-auto bg-neutral-950 z-50">
        <Top>
            <div className="flex w-full justify-end space-x-4">
                <button className="bg-teal-700 rounded-2xl" onClick={handleSubmit(onSubmit)}>Post</button>
                <div className="rounded-lg cursor-pointer" onClick={closeContentForm}>
                    <p className="text-xl">❌</p>
                </div>
            </div>
        </Top>
        <Body>
            <Left />
            <Mid>
              <div className="flex flex-1 flex-col">
                <input className="p-2 text-5xl border-b border-slate-600 bg-neutral-950"
                placeholder="Title" {...register("title")} />
                <Tiptap name="body" control={control} />
              </div>
            </Mid>
            <Right />
        </Body>
    </div>
}
