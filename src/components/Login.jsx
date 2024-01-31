import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Input, Logo } from "./index";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.loginAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-full bg-gray-100 p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className=" inline-block w-full max-w-[100]">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-center text-red-600 mt-8">{error}</p>}
        <form className="mt-8" onSubmit={handleSubmit(login)}>
          <div className="space-y-5">
            <Input
              label="Email:"
              placeholder="Enter Your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchpatern: (value) =>
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                      value
                    ) || "email address must be a valid",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="enter your password"
              {...register("password", { required: true })}
            />
            <button className="w-full" type="submit">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
