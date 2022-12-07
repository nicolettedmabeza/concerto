import React from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../auth.js";

export default function Logout() {
  const [, , logout] = useToken();
  const navigate = useNavigate();

  const signout = async (e) => {
    e.preventDefault();
    logout();
    console.log("logged out");
    navigate("/");
  };

  return (
    <>
      <div className="overflow-y-scroll bg-hero bg-cover bg-blend-overlay from-indigo-500 h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="mx-auto max-w-3xl">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Are you sure you want to sign out?
                </h3>
                <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                  <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center">
                    <button
                      onClick={signout}
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
