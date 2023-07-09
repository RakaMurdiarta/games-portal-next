"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

const Login_Form = (props: Props) => {
  const [loadingbtn, setLoadingBtn] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm();

  const FormSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoadingBtn(true);
    try {
      const resp = await axios.post("/api/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (resp.status === 201 && resp.statusText === "Created") {
        router.push("/login");
        setLoadingBtn(false);
      }
    } catch (error: any) {
      alert(error?.response?.data?.msg);
      setLoadingBtn(false);
    }
  };

  return (
    <React.Fragment>
      <div className="h-screen md:flex">
        <div className="relative overflow-hidden sm:px-5 md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              Games Portal
            </h1>
            <p className="text-white mt-1">
              The most popular catalog for reasearch informations about games
            </p>
            <Link href={"/"}>
              <Button variant={"secondary"} className="mt-2">
                Read More
              </Button>
            </Link>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form className="bg-white" onSubmit={handleSubmit(FormSubmit)}>
            <h1 className="text-gray-800 font-bold text-2xl mb-8 text-center">
              Welcome
            </h1>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                id="fullname"
                placeholder="Full name"
                {...register("fullname")}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                id="username"
                placeholder="Username"
                {...register("username")}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="email"
                id="email"
                placeholder="Email Address"
                {...register("email")}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                id="password"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            {loadingbtn ? (
              <Button
                disabled
                className="w-full block rounded-2xl font-semibold mt-4 py-2 mb-2"
              >
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <p>Please wait</p>
                </div>
              </Button>
            ) : (
              <Button
                variant={"default"}
                className="w-full block rounded-2xl font-semibold bg-indigo-600 mt-4 py-2 mb-2 hover:bg-indigo-400"
              >
                Login
              </Button>
            )}

            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              Forgot Password ?
            </span>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login_Form;
