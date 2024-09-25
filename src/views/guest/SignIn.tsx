import { useForm } from "react-hook-form";

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
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-6 border border-slate-600 rounded-lg bg-neutral-900 w-80">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <p>Username</p>
          <input className="px-4 py-2 rounded border border-slate-600 bg-neutral-950" placeholder="username" {...register("username")} />
          <p>Password</p>
          <input type="password" className="px-4 py-2 rounded border border-slate-600 bg-neutral-950"
          placeholder="password"  {...register("password")} />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
