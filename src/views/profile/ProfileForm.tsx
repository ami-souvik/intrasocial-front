import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import EmojiPicker from '../../components/EmojiPicker'
import Loader from '@/components/Loader'

export type ProfileFormInputs = {
  emojiUnicode: string
  firstName: string
  lastName: string
  email: string
}
const UPDATE_USER_MUTATION = gql`
  mutation updateCurrent(
    $emojiUnicode: String!
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    updateCurrent(
      emojiUnicode: $emojiUnicode
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      current {
        username
        emojiUnicode
        firstName
        lastName
        email
      }
    }
  }
`

export default function ProfileForm({
  initialValues,
  close,
  onSubmitSuccess
}: {
  initialValues: ProfileFormInputs
  onSubmitSuccess: (v: ProfileFormInputs) => void
}) {
  const { control, register, handleSubmit } = useForm<ProfileFormInputs>({
    defaultValues: initialValues
  })
  const [updateCurrent] = useMutation(UPDATE_USER_MUTATION)
  const [loading, setLoading] = useState(false)
  async function onSubmit(data: ProfileFormInputs) {
    setLoading(true)
    const res = await updateCurrent({ variables: { ...data } })
    setLoading(false)
    onSubmitSuccess(res.data.updateCurrent.current)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-2">
        <EmojiPicker name="emojiUnicode" control={control} />
        <div className="flex">
          <p className="opacity-50">@</p>
          <p className="italic">{initialValues.username}</p>
        </div>
        <div className="flex space-x-2">
          <input
            className="w-full p-1 border border-slate-600 bg-neutral-900"
            placeholder="First Name"
            {...register('firstName')}
          />
          <input
            className="w-full p-1 border border-slate-600 bg-neutral-900"
            placeholder="Last Name"
            {...register('lastName')}
          />
        </div>
        <input
          className="w-full p-1 border border-slate-600 bg-neutral-900"
          placeholder="Email"
          {...register('email')}
        />
      </div>
      <div className="flex items-center space-x-2">
        {loading ? (
          <>
            <Loader />
            <p>Updating</p>
          </>
        ) : (
          <>
            <button className="bg-teal-700" type="submit">
              update
            </button>
            <button className="hover:underline" onClick={close}>
              cancel
            </button>
          </>
        )}
      </div>
    </form>
  )
}
