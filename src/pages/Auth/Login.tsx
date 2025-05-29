// src/pages/Auth/Login.tsx

import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Context/useAuth";
import { jwtDecode } from "jwt-decode";
import api from "../../services/api";

interface LoginResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setError(null);
  setIsLoading(true);

  try {
    // client-side validation
    if (!formData.email.includes("@")) {
      throw new Error("Please enter a valid email address");
    }
    if (formData.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    // 1) call the login endpoint
    const { data } = await api.post<LoginResponse>(
      "/api/StudentAccount/Login",
      { Email: formData.email, Password: formData.password }
    );

    // 2) decode the token
    const decoded: any = jwtDecode(data.token);

    // 3) extract the userId (if needed) and the role
    const userId =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
      decoded.sub;
    const roleClaim =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      decoded.role;
    const userRole = String(roleClaim).toLowerCase() as "admin" | "student";

    // 4) persist token+userId into localStorage for later calls
    localStorage.setItem(
      "eduSyncUser",
      JSON.stringify({
        id:        data.id,
        firstName: data.firstName,
        lastName:  data.lastName,
        email:     data.email,
        token:     data.token
      })
    );
    
    // 5) update your auth context
    login({
      name: `${data.firstName} ${data.lastName}`,
      role: userRole,
      token: data.token,
    });

    // 6) navigate based on the role
    navigate(userRole === "admin" ? "/admin/dashboard" : "/dashboard");
  } catch (err: any) {
    setError(err.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Side */}
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

      {/* Right Side */}
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
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
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
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
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
                <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
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
