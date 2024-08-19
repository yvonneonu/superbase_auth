"use client";
import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } else {
      setSuccessMessage("Password reset email sent successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }
  };

  return (
    <div className="bg-indigo-700 w-full justify-center items-center flex h-screen">
      <div className=" w-[600px] bg-white p-10">
        <form onSubmit={handleResetPassword}>
          <div className="my-8  ">
            <div className="text-black text-2xl font-bold">
              FORGOT YOUR PASSWORD?
            </div>
            <div className="text-cila-slate-700 mt-2">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </div>

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
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 mt-2 border border-cila-slate-200 text-cila-slate-700 font-lotar focus:outline-none focus:ring-2 focus:ring-cila-slate-700 focus:invalid:ring-0 focus:invalid:border-cila-red-300 invalid:text-cila-red-300 focus:border-transparent placeholder:font-lota autofill:bg-cila-slate-50"
                  placeholder="JohnDoe@email.com"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="mt-4 text-red-500 text-sm">{errorMessage}</div>
            )}

            {successMessage && (
              <div className="mt-4 text-green-500 text-sm">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded h-12 text-center mt-10 text-white bg-indigo-700 hover:bg-indigo-800 md:h-14 sora-bold md:text-base"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="mt-10 flex flex-wor gap-20 justify-center">
              <Link href={"/"}>Back to Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
