import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import EmojiPicker from "../components/EmojiPicker";

export type ProfileFormInputs = {
    emojiUnicode: string
    firstName: string
    lastName: string
    email: string
}
const UPDATE_USER_MUTATION = gql`
    mutation updateCurrent(
      $emojiUnicode: String!,
      $firstName: String!,
      $lastName: String!,
      $email: String!) {
    updateCurrent(
      emojiUnicode: $emojiUnicode,
      firstName: $firstName,
      lastName: $lastName,
      email: $email) {
        current {
          emojiUnicode
          firstName
          lastName
          email
        }
      }
  }
`

export default function ProfileForm({ initialValues, close, onSubmitSuccess }: { initialValues: ProfileFormInputs, onSubmitSuccess: (v: ProfileFormInputs) => void }) {
    const {
        control,
        register,
        handleSubmit,
    } = useForm<ProfileFormInputs>({
        defaultValues: initialValues
    });
    const [updateCurrent, { data: currentData, loading, error }] = useMutation(UPDATE_USER_MUTATION);
    function onSubmit(data: ProfileFormInputs) {
        updateCurrent({ variables: { ...data } })
        onSubmitSuccess(currentData)
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
                    <input className="w-full p-1 border border-slate-600 bg-neutral-900" placeholder="First Name" {...register("firstName")} />
                    <input className="w-full p-1 border border-slate-600 bg-neutral-900" placeholder="Last Name" {...register("lastName")} />
                </div>
                <input className="w-full p-1 border border-slate-600 bg-neutral-900" placeholder="Email" {...register("email")} />
            </div>
            <div className="flex space-x-2">
                <button className="bg-teal-700" type="submit">Update</button>
                <button className="bg-teal-700" onClick={close}>Cancel</button>
            </div>
        </form>
    )
}