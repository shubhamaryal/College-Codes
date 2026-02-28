import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BACKEND_URI = "http://localhost:8000/";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            setError("");

            const payload = {
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phone,
                password: data.password,
            };

            console.log("Sending payload:", payload);

            const response = await fetch(`${BACKEND_URI}user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            console.log("Response status:", response.status);

            const result = await response.json();
            console.log("Response data:", result);

            if (!response.ok) {
                throw new Error(
                    result.message || result.error || "Registration failed",
                );
            }

            // Store user info in localStorage for later use
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("userName", data.fullName);
            localStorage.setItem("userPhone", data.phone);
            localStorage.setItem("userId", result.userId);

            navigate("/");
        } catch (err) {
            setError(err.message || "An error occurred during registration");
            console.error("Signup error:", err);
        } finally {
            setIsSubmitting(false);
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
                        src="images/signup.jpeg"
                        alt="Luxury hotel with swimming pool"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
                    <h2 className="text-5xl font-semibold text-center text-amber-500 mb-10">
                        Register & Explore
                    </h2>
                    <h3 className="text-2xl font-bold text-center mb-8">
                        Sign Up
                    </h3>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <form
                        className="space-y-6 flex flex-col items-center"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            {...register("fullName", {
                                required: "Full Name is required",
                            })}
                            type="text"
                            placeholder="Full Name"
                            className="w-[80%] px-6 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-sm">
                                {errors.fullName.message}
                            </p>
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

                        <input
                            {...register("phone", {
                                required: "Phone Number is required",
                            })}
                            type="tel"
                            placeholder="Phone Number"
                            className="w-[80%] px-6 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">
                                {errors.phone.message}
                            </p>
                        )}

                        <div className="relative w-[80%]">
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
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

                        <div className="relative w-[80%]">
                            <input
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) =>
                                        value === watch("password") ||
                                        "Passwords do not match",
                                })}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="w-full px-6 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-5 flex items-center"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-7 w-7 text-gray-400" />
                                ) : (
                                    <Eye className="h-7 w-7 text-gray-400" />
                                )}
                            </button>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-[80%] py-3 text-lg bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors disabled:bg-amber-300"
                        >
                            {isSubmitting ? "Processing..." : "Create Account"}
                        </button>
                    </form>
                    <p className="mt-8 text-center text-lg">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-amber-500 font-medium hover:underline"
                        >
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
