import { useState } from "react";
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
      $body: Json!) {
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
        control,
        register,
        handleSubmit,
        reset
    } = useForm<ContentFormInputs>();
    const [showForm, setShowForm] = useState(false);
    const [createContent, { data, loading, error }] = useMutation(CREATE_CONTENT_MUTATION);
    console.log({ data, loading, error });
    function onSubmit(data: ContentFormInputs) {
        createContent({ variables: { ...data } });
        reset();
    }
    function form() {
        if(showForm)
            return <div className="fixed top-0 left-0 w-screen h-screen overflow-y-auto bg-neutral-900 z-50">
                <Top>
                    <div className="flex w-full justify-end space-x-4">
                        <button className="bg-teal-700 rounded-2xl" onClick={handleSubmit(onSubmit)}>Post</button>
                        <div className="rounded-lg cursor-pointer" onClick={() => setShowForm(false)}>
                            <p className="text-xl">❌</p>
                        </div>
                    </div>
                </Top>
                <Body>
                    <Left />
                    <Mid>
                        <div className="flex flex-1 flex-col">
                            <input className="p-2 text-5xl border-b border-slate-600 bg-neutral-900"
                            placeholder="Title" {...register("title")} />
                            <Tiptap name="body" control={control} />
                        </div>
                    </Mid>
                    <Right />
                </Body>
            </div>
        else return null
    }
    return (
        <>
            {form()}
            <div className="flex justify-end">
                <button className="bg-teal-700 rounded-2xl" onClick={() => setShowForm(true)}>📝 Write</button>
            </div>
        </>
    );
}