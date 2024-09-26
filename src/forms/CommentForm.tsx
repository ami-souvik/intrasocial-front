import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { FaCommentAlt } from 'react-icons/fa'
import Close from '@/components/Close'
import { CommentType } from '@/views/comment'
import Loader from '@/components/Loader'

type CommentFormInputs = {
  body: string
}

type CommentFormProps = {
  id?: number
  body?: string
  parentId?: number
  what?: 'content' | 'comment'
  close: () => void
  onSuccess?: (v: CommentType) => void
  onError?: (v: any) => void
}

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($id: ID!, $what: String!, $body: String!) {
    createComment(id: $id, what: $what, body: $body) {
      comment {
        id
        body
        owner {
          emojiUnicode
          firstName
          lastName
        }
        createdAt
        updatedAt
      }
    }
  }
`
const UPDATE_COMMENT_MUTATION = gql`
  mutation updateComment($id: ID!, $body: String!) {
    updateComment(id: $id, body: $body) {
      comment {
        id
        body
      }
    }
  }
`

export default function CommentForm({
  id,
  body,
  parentId,
  what = 'comment',
  close,
  onSuccess,
  onError
}: CommentFormProps) {
  const { register, handleSubmit, reset } = useForm<CommentFormInputs>({
    defaultValues: {
      body
    }
  })
  const [loading, setLoading] = useState(false)
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION)
  const [updateComment] = useMutation(UPDATE_COMMENT_MUTATION)
  function onSubmit(data: CommentFormInputs) {
    setLoading(true)
    if (!id)
      createComment({ variables: { id: parentId, what, ...data } })
        .then((res) => {
          setLoading(false)
          if (onSuccess) onSuccess(res.data.createComment.comment)
          close()
        })
        .catch((res) => {
          setLoading(false)
          if (onError) onError(res.data.createComment.comment)
          close()
        })
    else
      updateComment({ variables: { id, ...data } })
        .then(() => {
          setLoading(false)
          if (onSuccess) onSuccess(data)
          close()
        })
        .catch(() => {
          setLoading(false)
          if (onError) onError(data)
          close()
        })
    reset()
  }
  if (loading)
    return (
      <div className="flex h-4 items-center">
        <Loader />
      </div>
    )
  return (
    <div className="flex items-end w-full my-2 bg-neutral-900 border border-slate-600 rounded-lg">
      <textarea
        autoFocus
        rows={2}
        className="flex-1 px-2 py-1 bg-neutral-900 resize-none rounded-lg"
        placeholder="body"
        {...register('body')}
      />
      <div className="flex justify-end">
        <Close size={20} onClick={close} />
        <button onClick={handleSubmit(onSubmit)}>
          <FaCommentAlt />
        </button>
      </div>
    </div>
  )
}
