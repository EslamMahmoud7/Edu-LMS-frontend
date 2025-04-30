import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Context/useAuth"; // adjust path as needed

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // from context

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validation
      if (!formData.email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // 🔐 Mock login logic (you can replace with real API call)
      const mockRole: "admin" | "student" = formData.email.includes("admin")
        ? "admin"
        : "student";

      const mockUser = {
        name: "Michael Nelson",
        role: mockRole, // ✅ Use variable, not string
        token: "mock_token_123",
      };

      login(mockUser);
      // 🔄 use context login
      navigate(mockRole === "admin" ? "/admin/dashboard" : "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Side - Illustration */}
      <div className="relative flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-[#1a2767] to-[#70a0e9] p-8 text-white">
        <div className="absolute left-8 top-8 z-10 flex items-center space-x-2">
          <img src="/favicon.ico" alt="EduSync Logo" className="h-8 w-8" />
          <span className="hidden text-lg font-bold sm:block sm:text-xl">
            EduSync
          </span>
        </div>
        <div className="mt-16 max-w-xl text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
            Welcome to EduSync LMS
          </h1>
          <p className="text-lg opacity-90">
            Your gateway to interactive learning and knowledge sharing
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h3 className="mb-1 text-2xl font-semibold text-gray-800">
            Welcome back!
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            Please enter your credentials to login
          </p>

          {error && (
            <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded border border-gray-200 py-2 pl-10 pr-3 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded border border-gray-200 py-2 pl-10 pr-3 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mb-6 w-full flex items-center justify-center gap-2 rounded bg-blue-700 px-4 py-2 text-white transition-colors hover:bg-blue-500 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
