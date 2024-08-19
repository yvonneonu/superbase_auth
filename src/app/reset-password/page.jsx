"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } else {
      setSuccessMessage("Password reset successfully!");
      setTimeout(() => {
        router.push("/"); // Redirect to provided URL or home
      }, 5000);
    }
  };

  return (
    <div className="bg-indigo-700 w-full justify-center items-center flex h-screen">
      <div className="w-[600px] bg-white p-10">
        <form onSubmit={handleResetPassword}>
          <div className="my-8">
            <div className="text-black text-2xl font-bold">
              RESET YOUR PASSWORD
            </div>

            <div className="mt-5 w-full">
              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-1 text-sm font-normal font-lota cila-slate-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  required
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-12 px-4 mt-2 border border-cila-slate-200 text-cila-slate-700 font-lotar focus:outline-none focus:ring-2 focus:ring-cila-slate-700"
                  placeholder="Enter your new password"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 text-sm font-normal font-lota cila-slate-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-12 px-4 mt-2 border border-cila-slate-200 text-cila-slate-700 font-lotar focus:outline-none focus:ring-2 focus:ring-cila-slate-700"
                  placeholder="Confirm your new password"
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
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
