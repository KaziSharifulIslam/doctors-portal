import useToken from "hooks/useToken";
import React, { useEffect, useState } from "react";
import './login.css'
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    const [token] = useToken(user|| emailUser )
const [showPass, setShowPass] = useState(false)
  // important for redirecting user after login
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
      // navigate('/')
    }
  }, [user, emailUser, token, from, navigate]);

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
          fill="#E5E7EB"/>
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"/>
      </svg>
    );
  }
  if (error || emailError) toast.error(error?.message || emailError?.message);

  // react hook form
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data?.email, data?.password);
  };
  return (
    <div>
      <div className="flex h-max mt-20 justify-center items-center">
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
                className="input input-bordered w-full max-w-xs input-primary dark:input-accent"
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
             <div>
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
                type={`${showPass ? 'text' : 'password'}`}
                placeholder="Password"
                className="input password input-bordered w-full max-w-xs input-primary dark:input-accent"
                autoComplete="off"
                
              />
              <span className="eye" onClick={()=> {
                setShowPass(!showPass);
              }}>
                {showPass ? <EyeOff/> : <Eye/>}
              </span>
             </div>

              <button className="btn border-0 bg-gradient-to-tr from-primary to-secondary text-white dark:bg-gradient-to-r dark:from-accent dark:to-accent dark:border-none">
                {emailLoading && spinner} Login
              </button>
              <p className="text-sm text-center">
                New to Doctors Portal?{" "}
                <Link to="/signup" className="text-secondary dark:text-accent">
                  Create new account
                </Link>{" "}
              </p>
            </form>
            <div className="divider">OR</div>
            {/* sign in with google  */}

            <button
              onClick={() => signInWithGoogle()}
              className="btn border-0 bg-gradient-to-tr from-primary to-secondary text-white dark:bg-gradient-to-r dark:from-accent dark:to-accent dark:border-none"
            >
              {loading && spinner} continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Eye = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
<path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
</svg>
}
const EyeOff = () => {
  return  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
<path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
</svg>
}
export default Login;
