import { useState } from "react";

export default function LoginRegister() {
  const [tab, setTab] = useState("login");

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-right text-black mb-8 uppercase font-medium">
        <span className="text-gray-500">Home</span> /{" "}
        <span className="font-bold">Login Register</span>
      </div>

      {/* Tabs */}
      <div className="text-center mb-8">
        <button
          className={`text-xl font-bold px-4 py-2 ${
            tab === "login" ? "text-[#b142f5]" : "text-black"
          }`}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <span className="mx-2 text-gray-300">|</span>
        <button
          className={`text-xl font-bold px-4 py-2 ${
            tab === "register" ? "text-[#b142f5]" : "text-black"
          }`}
          onClick={() => setTab("register")}
        >
          Register
        </button>
      </div>

      {/* Card */}
      <div className="max-w-md mx-auto bg-white border border-gray-200 shadow-sm p-8">
        {tab === "login" ? (
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full border border-gray-300 px-4 py-2 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-2 outline-none"
            />
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="text-black hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="bg-gray-100 hover:bg-gray-200 px-6 py-2 text-sm"
            >
              LOGIN
            </button>
          </form>
        ) : (
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 px-4 py-2 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 px-4 py-2 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-2 outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 px-4 py-2 outline-none"
            />
            <button
              type="submit"
              className="bg-gray-100 hover:bg-gray-200 px-6 py-2 text-sm"
            >
              REGISTER
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
