import { useState } from "react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-gray-50"
      style={{
        backgroundImage: "url('/placeholder.svg?height=800&width=800&text=🍕🥗🍔🥦')",
        backgroundSize: "200px",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-3xl border-2 border-orange-400 p-8 shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Log In</h1>

        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email or username
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-3 rounded-md bg-orange-200 border-0 focus:ring-2 focus:ring-orange-300"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-3 rounded-md bg-orange-200 border-0 focus:ring-2 focus:ring-orange-300"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm">
                Show Password
              </label>
            </div>
            <a href="/forgot-password" className="text-sm text-gray-600 hover:text-orange-500">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            Log In
          </button>
        </form>

        {/* <button
          type="button"
          className="w-full flex items-center justify-center border border-orange-400 text-orange-500 font-medium py-3 px-4 rounded-md hover:bg-orange-50 transition-colors"
        >
          <LuGoogle className="mr-2" />
          Continue with Google
        </button> */}

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-orange-500 hover:text-orange-600 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
