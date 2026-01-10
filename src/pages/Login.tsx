import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import { Eye, EyeOff, SendToBack, StepBack } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode } = useSettings();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors duration-300 p-4">
      <div className="w-full max-w-md relative">
        {/* Return Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 cursor-pointer p-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-inconsolata font-bold text-sm"
        >
          <StepBack /> VOLVER
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter font-bitcount font-normal text-black dark:text-white mb-2">
            BYTE HOUSE
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-inconsolata">
            INICIA SESIÓN EN TU CUENTA
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border border-black dark:border-white p-6 bg-white dark:bg-black">
            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-black dark:text-white mb-2 font-inconsolata"
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full p-3 border border-black dark:border-white font-inconsolata bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-900 transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-black dark:text-white mb-2 font-inconsolata"
              >
                CONTRASEÑA
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full p-3 pr-12 border border-black dark:border-white font-inconsolata bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-900 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer flex items-center gap-2 absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors font-inconsolata text-sm"
                >
                  {/* Eye icon */}
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full py-3 px-4 bg-black dark:bg-white text-white dark:text-black font-inconsolata font-bold hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-black dark:border-white"
            >
              {isLoading ? "INICIANDO SESIÓN..." : "INICIAR SESIÓN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
