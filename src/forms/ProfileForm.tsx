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

export default function ProfileForm({ initialValues, onSubmitSuccess }: { initialValues: ProfileFormInputs, onSubmitSuccess: (v: ProfileFormInputs) => void }) {
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center bg-neutral-900 border border-slate-600 rounded-xl p-4 space-y-2">
            <EmojiPicker name="emojiUnicode" control={control} />
            <input className="p-2 text-xl border-b border-slate-600 bg-neutral-900" placeholder="First Name" {...register("firstName")} />
            <input className="p-2 text-xl border-b border-slate-600 bg-neutral-900" placeholder="Last Name" {...register("lastName")} />
            <input className="p-2 text-xl border-b border-slate-600 bg-neutral-900" placeholder="Email" {...register("email")} />
            <div className="flex justify-end">
                <button className="bg-teal-700" type="submit">Update</button>
            </div>
        </form>
    )
}