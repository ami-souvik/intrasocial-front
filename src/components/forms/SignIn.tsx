import { useForm, SubmitHandler } from "react-hook-form";

export type SignInFormInputs = {
  username: string;
  password: string;
};

export default function SignIn({ onSubmit }: {
  onSubmit: (v: SignInFormInputs) => void
}) {
  const {
    register,
    handleSubmit,
  } = useForm<SignInFormInputs>();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 w-80">
      <input className="px-4 py-2" placeholder="username" {...register("username")} />
      <input className="px-4 py-2" placeholder="password"  {...register("password")} />
      <button type="submit">Sign In</button>
    </form>
  );
}
