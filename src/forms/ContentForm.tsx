import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import Tiptap from "./Tiptap";


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
          id
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
          id
          title
          body
        }
      }
  }
`

export default function ContentForm({ data: { id, title, body }={}, close, onSuccess }:
  { data?: { id?: number, title?: string, body?: string }, close?: () => void, onSuccess?: (v: ContentFormInputs) => void }) {
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
  const tiptap = useRef();
  const [loading, setLoading] = useState(false);
  async function onSubmit(data: ContentFormInputs) {
    try {
      setLoading(true)
      let response;
      if(id) {
        response = await updateContent({ variables: { id, ...data } })
        response = response.data.updateContent
      }
      else {
        response = await createContent({ variables: { ...data } })
        response = response.data.createContent
      }
      setLoading(false)
      if(onSuccess) onSuccess(response.content)
      if(close) close();
    }
    catch(ex) {
      setLoading(false)
      console.log(ex);
    }
  }
  return <div className="w-full">
    <div className="px-2 py-2 rounded-lg bg-neutral-950 overflow-x-hidden">
      <div className="space-y-2">
        <input className="p-1 w-full text-4xl font-bold border border-slate-600 bg-neutral-950 rounded-xl"
        placeholder="Title" {...register("title")} />
        <div className="p-1 border border-slate-600 bg-neutral-950 rounded-xl min-h-32 cursor-text"
          onClick={() => tiptap?.current?.focus()}>
          <Tiptap ref={tiptap} name="body" control={control} />
        </div>
      </div>
      <div className="flex justify-end items-center mt-2">
        <button className="flex bg-teal-700 mx-2 space-x-2" onClick={handleSubmit(onSubmit)}>
          {loading && <div className="w-[32px]">
            <div className="w-[1px] text-slate-400 aspect-square rounded translate-x-[-16px] translate-y-[12px] animate-l21sm"/>
          </div>}
          post
        </button>
        {close &&
          <button className="flex space-x-2 hover:underline" onClick={close}>
            cancel
          </button>}
      </div>
    </div>
  </div>
}
