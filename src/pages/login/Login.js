import React from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);
  if (error || emailError) toast.error(error?.message || emailError?.message);
  let spinner = "";
  if (loading || emailLoading) {
    spinner = (
      <svg
        role="status"
        className="inline w-5 h-5 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (user || emailUser) {
    console.dir(user || emailUser);
    toast.info("User logged in");
  }

  // react hook form
  const onSubmit = (data) => {
    console.log(data);
    signInWithEmailAndPassword(data?.email, data?.password);
  };

  return (
    <div className="flex h-max justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <h2 className="text-center font-bold text-2xl">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
            {/* email with label warning*/}
            <label className="label pb-0">
              <span className="label-text">Your Email</span>
              <div>
                {/*  error msg as label  */}
                {errors.email?.type === "required" && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Provide a valid email",
                },
              })}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs input-primary"
            />

            {/* password  */}
            <label className="label pb-0">
              <span className="label-text">Password</span>
              {/* label for password error message  */}
              <div>
                {errors.password?.type === "required" && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </label>
            <input 
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Minimum six characters",
                },
              })}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs input-primary"
              autoComplete="off"
            />

            <button className="btn border-0 bg-gradient-to-tr from-primary to-secondary text-white">
              {emailLoading && spinner} Login
            </button>
            <p className="text-sm text-center">
              New to Doctors Portal?{" "}
              <Link to="/signup" className="text-secondary">
                Create new account
              </Link>{" "}
            </p>
          </form>
          <div className="divider">OR</div>
          {/* sign in with google  */}

          <button
            onClick={() => signInWithGoogle()}
            className="btn border-0 bg-gradient-to-tr from-primary to-secondary text-white"
          >
            {loading && spinner} continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
