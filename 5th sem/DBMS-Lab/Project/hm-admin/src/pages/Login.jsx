import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hotel, Eye, EyeOff } from "lucide-react";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            localStorage.setItem("isAdminLoggedIn", "true");
            localStorage.setItem("adminUsername", username);
            localStorage.setItem("adminName", data.name);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-indigo-200">
                        <Hotel size={22} className="text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">
                        Welcome back
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Sign in to the admin panel
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPw ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw(!showPw)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPw ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-3.5 py-2.5">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-xl transition shadow-sm"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
