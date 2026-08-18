import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      {
        name: "Lorenz Allen Biscocho",
        email: "lorenzallen@gmail.com",
        role: "student",
      },
      "mock-jwt-token"
    );
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Login
      </h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            defaultValue="lorenzallen@gmail.com"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;