"use client";
import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function SignUp() {
  const [signInEmail, setSignUpEmail] = useState("");
  const [signInPassword, setSignUpPassword] = useState("");
  const isFormValid = signInEmail && signInPassword; // Example form validation
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: signInEmail,
      password: signInPassword,
    });
    setLoading(false);
    // if (error) setSignInError(error.message);
    // else alert("Login successful!");
    if (error) {
      setSignInError(error.message);
      setTimeout(() => {
        setSignInError("");
      }, 5000);
    } else {
      setSuccessMessage("Login successful!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }
  };

  return (
    <div className="bg-indigo-700 w-full justify-center items-center flex h-screen">
      <div className=" w-[600px] bg-white p-10">
        <form onSubmit={signUp}>
          <div className="my-8  ">
            <div className="text-black text-2xl font-bold">SIGN UP</div>

            <div className="mt-5 w-full">
              <div className="">
                <label
                  htmlFor="email"
                  className="mb-1 text-sm font-normal font-lota cila-slate-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  id="email"
                  value={signInEmail}
                  name="email"
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  className="w-full h-12 px-4 mt-2 border border-cila-slate-200 text-cila-slate-700 font-lotar focus:outline-none focus:ring-2 focus:ring-cila-slate-700 focus:invalid:ring-0 focus:invalid:border-cila-red-300 invalid:text-cila-red-300 focus:border-transparent placeholder:font-lota autofill:bg-cila-slate-50"
                  placeholder="JohnDoe@email.com"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="mb-1 text-sm  font-normal font-lota cila-slate-700"
              >
                Password
              </label>

              <input
                type="password"
                required
                id="password"
                name="password"
                value={signInPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="w-full h-12 px-4 border border-cila-slate-200 text-cila-slate-700 focus:invalid:ring-0 focus:invalid:border-cila-red-300 invalid:text-cila-red-300 font-lotar focus:outline-none focus:ring-2 focus:ring-cila-slate-700 focus:border-transparent placeholder:font-lota autofill:bg-cila-slate-50 "
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className={`w-full rounded h-12 text-center mt-10 text-white bg-indigo-700 hover:bg-indigo-800 md:h-14 sora-bold md:text-base

                ${isFormValid ? "" : "cursor-not-allowed opacity-50"}

                `}
              disabled={!isFormValid}
            >
              SIGN UP
              {loading && (
                <div role="status" className="inline ml-2">
                  <svg
                    ariaHidden="true"
                    className="inline w-5 h-5 mr-2 text-white animate-spin dark:text-slate-50/70 fill-white dark:fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              )}
            </button>

            {signInError && (
              <div className="mt-4 text-red-500 text-sm">{signInError}</div>
            )}

            {successMessage && (
              <div className="mt-4 text-green-500 text-sm">
                {successMessage}
              </div>
            )}

            <div className="mt-10 flex flex-wor gap-20 justify-center">
              <Link href={"/"}>Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
