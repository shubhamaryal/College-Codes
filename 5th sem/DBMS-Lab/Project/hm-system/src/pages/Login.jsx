import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BACKEND_URI = "http://localhost:8000/";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            const response = await fetch(`${BACKEND_URI}user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
                credentials: "include",
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            // Store user info in localStorage for later use
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("userId", result.userId);

            if (result.userName) {
                localStorage.setItem("userName", result.userName);
            }
            if (result.userPhone) {
                localStorage.setItem("userPhone", result.userPhone);
            }

            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            setError("root", {
                type: "manual",
                message:
                    error.message ||
                    "Login failed. Please check your credentials and try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative w-full h-screen bg-gray-100 flex justify-center items-center">
            <div
                style={{
                    clipPath: "polygon(0 0, 35% 0, 75% 100%, 0% 100%)",
                    backgroundColor: "#F49B33",
                }}
                className="absolute top-0 left-0 h-full w-full md:w-2/3"
            ></div>

            <div className="relative z-10 flex flex-col md:flex-row w-[90%] max-w-7xl bg-white shadow-lg rounded-2xl overflow-hidden h-[90vh]">
                <div className="w-full md:w-1/2 hidden md:block">
                    <img
                        src="images/login.jpeg"
                        alt="Login"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
                    <h2 className="text-5xl font-semibold text-center text-amber-500 mb-10">
                        Welcome Back
                    </h2>
                    <h3 className="text-2xl font-bold text-center mb-8">
                        Login
                    </h3>
                    <form
                        className="space-y-6 flex flex-col items-center"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {errors.root && (
                            <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-lg w-[80%]">
                                {errors.root.message}
                            </div>
                        )}

                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            placeholder="E-mail Address"
                            className="w-[80%] px-6 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}

                        <div className="relative w-[80%]">
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full px-6 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-5 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-7 w-7 text-gray-400" />
                                ) : (
                                    <Eye className="h-7 w-7 text-gray-400" />
                                )}
                            </button>
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-[80%] py-3 text-lg bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors flex justify-center items-center"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <p className="mt-8 text-center text-lg">
                        Don't have an account?{" "}
                        <a
                            onClick={() => navigate("/signup")}
                            className="text-amber-500 font-medium hover:underline cursor-pointer"
                        >
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
