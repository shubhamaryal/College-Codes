import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/NavBar";
import { Eye, EyeOff, CreditCard, Clock, User, Lock } from "lucide-react";

const ProfilePage = () => {
    const [singleBookingDetails, setSingleBookingDetails] = useState(null);
    const [activeTab, setActiveTab] = useState("personal");
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        phone: "",
    });
    const [passwordUpdateStatus, setPasswordUpdateStatus] = useState({
        isLoading: false,
        error: null,
        success: false,
    });
    const [bookingHistory, setBookingHistory] = useState([]);
    const [bookingsLoading, setBookingsLoading] = useState(false);
    const [bookingsError, setBookingsError] = useState(null);

    const {
        register: registerPersonal,
        handleSubmit: handleSubmitPersonal,
        formState: { errors: errorsPersonal },
        setValue: setValuePersonal,
    } = useForm();

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword },
        watch: watchPassword,
        reset: resetPassword,
    } = useForm();

    const {
        register: registerCard,
        handleSubmit: handleSubmitCard,
        formState: { errors: errorsCard },
    } = useForm();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const storedName = localStorage.getItem("userName") || "";
        const storedEmail = localStorage.getItem("userEmail") || "";
        const storedPhone = localStorage.getItem("userPhone") || "";

        setUserData({
            fullName: storedName,
            email: storedEmail,
            phone: storedPhone,
        });

        setValuePersonal("fullName", storedName);
        setValuePersonal("email", storedEmail);
        setValuePersonal("phone", storedPhone);
    }, [setValuePersonal]);

    useEffect(() => {
        if (activeTab === "bookings") {
            fetchBookingHistory();
        }
    }, [activeTab]);

    // Fetch all bookings for the logged-in user
    const fetchBookingHistory = async () => {
        try {
            setBookingsLoading(true);
            setBookingsError(null);

            const userId = localStorage.getItem("userId");

            const response = await fetch(
                `http://localhost:8000/user/bookinghistory?userId=${userId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                },
            );

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error(
                        "Authentication failed. Please login again.",
                    );
                }
                throw new Error(
                    `Error ${response.status}: Failed to fetch booking history`,
                );
            }

            const data = await response.json();
            setBookingHistory(data);
        } catch (error) {
            console.error("Error fetching booking history:", error);
            setBookingsError(error.message || "Failed to load booking history");
        } finally {
            setBookingsLoading(false);
        }
    };

    // Fetch details of a single booking by its ID
    const fetchBookingDetails = async (bookingId) => {
        try {
            setBookingsLoading(true);
            setBookingsError(null);
            setSingleBookingDetails(null);

            const userId = localStorage.getItem("userId");

            const response = await fetch(
                `http://localhost:8000/user/bookings/${bookingId}?userId=${userId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                },
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({
                    message: "Failed to fetch booking details",
                }));
                throw new Error(
                    errorData.message ||
                        `Error ${response.status}: Failed to fetch booking details`,
                );
            }

            const data = await response.json();
            setSingleBookingDetails(data);
            console.log("Booking Details:", data);
        } catch (error) {
            console.error("Error fetching booking details:", error);
            setBookingsError(
                error.message || "Failed to load booking details for this ID",
            );
        } finally {
            setBookingsLoading(false);
        }
    };

    const onSubmitPersonal = (data) => {
        console.log("Personal info updated:", data);
        localStorage.setItem("userName", data.fullName);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userPhone", data.phone);

        setUserData({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
        });

        alert("Personal information updated successfully!");
    };

    // No complex auth needed — we just send userId from localStorage

    const onSubmitPassword = async (data) => {
        setPasswordUpdateStatus({
            isLoading: true,
            error: null,
            success: false,
        });
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                throw new Error("Not logged in. Please login again.");
            }

            const payload = {
                userId: userId,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            };

            const response = await fetch(
                "http://localhost:8000/user/updatepassword",
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                },
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.message ||
                        errorData.error ||
                        `Error ${response.status}: Password update failed`,
                );
            }

            setPasswordUpdateStatus({
                isLoading: false,
                error: null,
                success: true,
            });
            resetPassword();
        } catch (error) {
            console.error("Error updating password:", error);
            setPasswordUpdateStatus({
                isLoading: false,
                error: error.message || "Failed to update password",
                success: false,
            });
        }
    };

    const onSubmitCard = (data) => {
        console.log("Card added:", data);
        alert("Credit card added successfully!");
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 pt-32 pb-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">
                        My Profile
                    </h1>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="w-full md:w-1/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div>
                                        <p className="text-gray-500">
                                            {userData.email ||
                                                "user@example.com"}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setActiveTab("personal")}
                                        className={`flex items-center space-x-3 w-full p-3 rounded-md transition ${
                                            activeTab === "personal"
                                                ? "bg-amber-50 text-amber-500"
                                                : "hover:bg-gray-100"
                                        }`}
                                    >
                                        <User size={20} />
                                        <span>Personal Info</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("password")}
                                        className={`flex items-center space-x-3 w-full p-3 rounded-md transition ${
                                            activeTab === "password"
                                                ? "bg-amber-50 text-amber-500"
                                                : "hover:bg-gray-100"
                                        }`}
                                    >
                                        <Lock size={20} />
                                        <span>Change Password</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("payment")}
                                        className={`flex items-center space-x-3 w-full p-3 rounded-md transition ${
                                            activeTab === "payment"
                                                ? "bg-amber-50 text-amber-500"
                                                : "hover:bg-gray-100"
                                        }`}
                                    >
                                        <CreditCard size={20} />
                                        <span>Payment Methods</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("bookings")}
                                        className={`flex items-center space-x-3 w-full p-3 rounded-md transition ${
                                            activeTab === "bookings"
                                                ? "bg-amber-50 text-amber-500"
                                                : "hover:bg-gray-100"
                                        }`}
                                    >
                                        <Clock size={20} />
                                        <span>Booking History</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="w-full md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                {/* Personal Information */}
                                {activeTab === "personal" && (
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-6">
                                            Personal Information
                                        </h2>
                                        <form
                                            onSubmit={handleSubmitPersonal(
                                                onSubmitPersonal,
                                            )}
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                <div>
                                                    <label className="block text-gray-700 mb-2">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className={`w-full border ${
                                                            errorsPersonal.email
                                                                ? "border-red-500"
                                                                : "border-gray-300"
                                                        } rounded-md p-3`}
                                                        {...registerPersonal(
                                                            "email",
                                                            {
                                                                required:
                                                                    "Email is required",
                                                                pattern: {
                                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                    message:
                                                                        "Invalid email address",
                                                                },
                                                            },
                                                        )}
                                                    />
                                                    {errorsPersonal.email && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                errorsPersonal
                                                                    .email
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 mb-2">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        className={`w-full border ${
                                                            errorsPersonal.phone
                                                                ? "border-red-500"
                                                                : "border-gray-300"
                                                        } rounded-md p-3`}
                                                        {...registerPersonal(
                                                            "phone",
                                                            {
                                                                required:
                                                                    "Phone number is required",
                                                                pattern: {
                                                                    value: /^[0-9]{10}$/,
                                                                    message:
                                                                        "Please enter a valid 10-digit phone number",
                                                                },
                                                            },
                                                        )}
                                                    />
                                                    {errorsPersonal.phone && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                errorsPersonal
                                                                    .phone
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="bg-amber-500 text-white py-3 px-6 rounded-md font-medium hover:bg-amber-600 transition-colors"
                                            >
                                                Save Changes
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {/* Change Password */}
                                {activeTab === "password" && (
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-6">
                                            Change Password
                                        </h2>

                                        {/* Status messages */}
                                        {passwordUpdateStatus.error && (
                                            <div
                                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                                                role="alert"
                                            >
                                                <strong className="font-bold">
                                                    Error:{" "}
                                                </strong>
                                                <span className="block sm:inline">
                                                    {passwordUpdateStatus.error}
                                                </span>
                                            </div>
                                        )}

                                        {passwordUpdateStatus.success && (
                                            <div
                                                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                                                role="alert"
                                            >
                                                <strong className="font-bold">
                                                    Success!{" "}
                                                </strong>
                                                <span className="block sm:inline">
                                                    Your password has been
                                                    updated successfully.
                                                </span>
                                            </div>
                                        )}

                                        <form
                                            onSubmit={handleSubmitPassword(
                                                onSubmitPassword,
                                            )}
                                        >
                                            <div className="space-y-6 max-w-md">
                                                <div className="relative">
                                                    <label className="block text-gray-700 mb-2">
                                                        Current Password
                                                    </label>
                                                    <input
                                                        type={
                                                            showCurrentPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        className={`w-full border ${
                                                            errorsPassword.currentPassword
                                                                ? "border-red-500"
                                                                : "border-gray-300"
                                                        } rounded-md p-3`}
                                                        {...registerPassword(
                                                            "currentPassword",
                                                            {
                                                                required:
                                                                    "Current password is required",
                                                            },
                                                        )}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 bottom-3"
                                                        onClick={() =>
                                                            setShowCurrentPassword(
                                                                !showCurrentPassword,
                                                            )
                                                        }
                                                    >
                                                        {showCurrentPassword ? (
                                                            <EyeOff size={20} />
                                                        ) : (
                                                            <Eye size={20} />
                                                        )}
                                                    </button>
                                                    {errorsPassword.currentPassword && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                errorsPassword
                                                                    .currentPassword
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="relative">
                                                    <label className="block text-gray-700 mb-2">
                                                        New Password
                                                    </label>
                                                    <input
                                                        type={
                                                            showNewPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        className={`w-full border ${
                                                            errorsPassword.newPassword
                                                                ? "border-red-500"
                                                                : "border-gray-300"
                                                        } rounded-md p-3`}
                                                        {...registerPassword(
                                                            "newPassword",
                                                            {
                                                                required:
                                                                    "New password is required",
                                                                minLength: {
                                                                    value: 6,
                                                                    message:
                                                                        "Password must be at least 6 characters",
                                                                },
                                                            },
                                                        )}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 bottom-3"
                                                        onClick={() =>
                                                            setShowNewPassword(
                                                                !showNewPassword,
                                                            )
                                                        }
                                                    >
                                                        {showNewPassword ? (
                                                            <EyeOff size={20} />
                                                        ) : (
                                                            <Eye size={20} />
                                                        )}
                                                    </button>
                                                    {errorsPassword.newPassword && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                errorsPassword
                                                                    .newPassword
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="relative">
                                                    <label className="block text-gray-700 mb-2">
                                                        Confirm New Password
                                                    </label>
                                                    <input
                                                        type={
                                                            showConfirmPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        className={`w-full border ${
                                                            errorsPassword.confirmPassword
                                                                ? "border-red-500"
                                                                : "border-gray-300"
                                                        } rounded-md p-3`}
                                                        {...registerPassword(
                                                            "confirmPassword",
                                                            {
                                                                required:
                                                                    "Please confirm your new password",
                                                                validate: (
                                                                    value,
                                                                ) =>
                                                                    value ===
                                                                        watchPassword(
                                                                            "newPassword",
                                                                        ) ||
                                                                    "Passwords do not match",
                                                            },
                                                        )}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 bottom-3"
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                !showConfirmPassword,
                                                            )
                                                        }
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff size={20} />
                                                        ) : (
                                                            <Eye size={20} />
                                                        )}
                                                    </button>
                                                    {errorsPassword.confirmPassword && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                errorsPassword
                                                                    .confirmPassword
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className={`bg-amber-500 text-white py-3 px-6 rounded-md font-medium hover:bg-amber-600 transition-colors mt-6 ${
                                                    passwordUpdateStatus.isLoading
                                                        ? "opacity-70 cursor-not-allowed"
                                                        : ""
                                                }`}
                                                disabled={
                                                    passwordUpdateStatus.isLoading
                                                }
                                            >
                                                {passwordUpdateStatus.isLoading
                                                    ? "Updating..."
                                                    : "Update Password"}
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {/* Payment Methods */}
                                {activeTab === "payment" && (
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-6">
                                            Payment Methods
                                        </h2>
                                        <div className="mb-8">
                                            <h3 className="text-lg font-medium mb-4">
                                                Saved Cards
                                            </h3>
                                            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
                                                <p className="text-gray-500">
                                                    You don't have any saved
                                                    payment methods yet.
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium mb-4">
                                                Add New Card
                                            </h3>
                                            <form
                                                onSubmit={handleSubmitCard(
                                                    onSubmitCard,
                                                )}
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                    <div className="md:col-span-2">
                                                        <label className="block text-gray-700 mb-2">
                                                            Card Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`w-full border ${
                                                                errorsCard.cardNumber
                                                                    ? "border-red-500"
                                                                    : "border-gray-300"
                                                            } rounded-md p-3`}
                                                            placeholder="1234 5678 9012 3456"
                                                            {...registerCard(
                                                                "cardNumber",
                                                                {
                                                                    required:
                                                                        "Card number is required",
                                                                    pattern: {
                                                                        value: /^[0-9]{13,19}$/,
                                                                        message:
                                                                            "Please enter a valid card number",
                                                                    },
                                                                },
                                                            )}
                                                        />
                                                        {errorsCard.cardNumber && (
                                                            <p className="text-red-500 text-sm mt-1">
                                                                {
                                                                    errorsCard
                                                                        .cardNumber
                                                                        .message
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700 mb-2">
                                                            Cardholder Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`w-full border ${
                                                                errorsCard.cardholderName
                                                                    ? "border-red-500"
                                                                    : "border-gray-300"
                                                            } rounded-md p-3`}
                                                            placeholder="John Doe"
                                                            {...registerCard(
                                                                "cardholderName",
                                                                {
                                                                    required:
                                                                        "Cardholder name is required",
                                                                },
                                                            )}
                                                        />
                                                        {errorsCard.cardholderName && (
                                                            <p className="text-red-500 text-sm mt-1">
                                                                {
                                                                    errorsCard
                                                                        .cardholderName
                                                                        .message
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-gray-700 mb-2">
                                                                Expiry Date
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className={`w-full border ${
                                                                    errorsCard.expiryDate
                                                                        ? "border-red-500"
                                                                        : "border-gray-300"
                                                                } rounded-md p-3`}
                                                                placeholder="MM/YY"
                                                                {...registerCard(
                                                                    "expiryDate",
                                                                    {
                                                                        required:
                                                                            "Expiry date is required",
                                                                        pattern:
                                                                            {
                                                                                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                                                                message:
                                                                                    "Please enter a valid expiry date (MM/YY)",
                                                                            },
                                                                    },
                                                                )}
                                                            />
                                                            {errorsCard.expiryDate && (
                                                                <p className="text-red-500 text-sm mt-1">
                                                                    {
                                                                        errorsCard
                                                                            .expiryDate
                                                                            .message
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <label className="block text-gray-700 mb-2">
                                                                CVV
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className={`w-full border ${
                                                                    errorsCard.cvv
                                                                        ? "border-red-500"
                                                                        : "border-gray-300"
                                                                } rounded-md p-3`}
                                                                placeholder="123"
                                                                {...registerCard(
                                                                    "cvv",
                                                                    {
                                                                        required:
                                                                            "CVV is required",
                                                                        pattern:
                                                                            {
                                                                                value: /^\d{3,4}$/,
                                                                                message:
                                                                                    "Please enter a valid CVV",
                                                                            },
                                                                    },
                                                                )}
                                                            />
                                                            {errorsCard.cvv && (
                                                                <p className="text-red-500 text-sm mt-1">
                                                                    {
                                                                        errorsCard
                                                                            .cvv
                                                                            .message
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="bg-amber-500 text-white py-3 px-6 rounded-md font-medium hover:bg-amber-600 transition-colors"
                                                >
                                                    Add Card
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}

                                {/* Booking History */}
                                {activeTab === "bookings" && (
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-6">
                                            Booking History
                                        </h2>

                                        {/* Show loading state */}
                                        {bookingsLoading && (
                                            <div className="text-center py-8">
                                                <div
                                                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent"
                                                    role="status"
                                                >
                                                    <span className="sr-only">
                                                        Loading...
                                                    </span>
                                                </div>
                                                <p className="mt-2 text-gray-600">
                                                    Loading your booking
                                                    history...
                                                </p>
                                            </div>
                                        )}

                                        {/* Show error state */}
                                        {bookingsError && (
                                            <div
                                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                                                role="alert"
                                            >
                                                <strong className="font-bold">
                                                    Error:{" "}
                                                </strong>
                                                <span className="block sm:inline">
                                                    {bookingsError}
                                                </span>
                                                <button
                                                    className="mt-3 bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md"
                                                    onClick={
                                                        fetchBookingHistory
                                                    } // Ensure this is correctly bound
                                                >
                                                    Try Again
                                                </button>
                                            </div>
                                        )}

                                        {/* Show data when available */}
                                        {!bookingsLoading &&
                                        !bookingsError &&
                                        bookingHistory.length > 0 ? (
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Booking ID
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Room Type
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Check-in
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Check-out
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Amount
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Status
                                                            </th>
                                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Actions
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {bookingHistory.map(
                                                            (booking) => (
                                                                <tr
                                                                    key={
                                                                        booking.id ||
                                                                        booking._id
                                                                    }
                                                                >
                                                                    <td
                                                                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-500 cursor-pointer hover:underline"
                                                                        onClick={() =>
                                                                            fetchBookingDetails(
                                                                                booking.id ||
                                                                                    booking._id ||
                                                                                    booking.bookingId,
                                                                            )
                                                                        }
                                                                    >
                                                                        {booking.id ||
                                                                            booking._id ||
                                                                            booking.bookingId ||
                                                                            "N/A"}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                                        {booking.roomType ||
                                                                            "N/A"}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                                        {formatDate(
                                                                            booking.checkIn,
                                                                        ) ||
                                                                            "N/A"}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                                        {formatDate(
                                                                            booking.checkOut,
                                                                        ) ||
                                                                            "N/A"}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                                        Rs.{" "}
                                                                        {booking.amount ||
                                                                            booking.totalAmount ||
                                                                            "N/A"}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <span
                                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                                booking.status ===
                                                                                    "Completed" ||
                                                                                booking.status ===
                                                                                    "completed"
                                                                                    ? "bg-green-100 text-green-800"
                                                                                    : booking.status ===
                                                                                            "Upcoming" ||
                                                                                        booking.status ===
                                                                                            "upcoming" ||
                                                                                        booking.status ===
                                                                                            "confirmed"
                                                                                      ? "bg-blue-100 text-blue-800"
                                                                                      : booking.status ===
                                                                                          "cancelled"
                                                                                        ? "bg-red-100 text-red-800"
                                                                                        : "bg-gray-100 text-gray-800"
                                                                            }`}
                                                                        >
                                                                            {booking.status ||
                                                                                "N/A"}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                        <button
                                                                            onClick={() =>
                                                                                fetchBookingDetails(
                                                                                    booking.id ||
                                                                                        booking._id ||
                                                                                        booking.bookingId,
                                                                                )
                                                                            }
                                                                            className="text-amber-600 hover:text-amber-800"
                                                                        >
                                                                            View
                                                                            Details
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ),
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : !bookingsLoading &&
                                          !bookingsError ? (
                                            <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center">
                                                <p className="text-gray-500 mb-4">
                                                    You don't have any booking
                                                    history yet.
                                                </p>
                                                <button className="bg-amber-500 text-white py-2 px-4 rounded-md font-medium hover:bg-amber-600 transition-colors">
                                                    Book a Room
                                                </button>
                                            </div>
                                        ) : null}

                                        {/* Display single booking details */}
                                        {singleBookingDetails && (
                                            <div className="mt-8 p-6 bg-white rounded-md shadow-md">
                                                <h3 className="text-xl font-semibold mb-4">
                                                    Booking Details
                                                </h3>
                                                <pre>
                                                    {JSON.stringify(
                                                        singleBookingDetails,
                                                        null,
                                                        2,
                                                    )}
                                                </pre>
                                                <button
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mt-4"
                                                    onClick={() =>
                                                        setSingleBookingDetails(
                                                            null,
                                                        )
                                                    } // Option to close details
                                                >
                                                    Close Details
                                                </button>
                                            </div>
                                        )}

                                        {/* Error message for fetching single booking details (optional, if you want a separate display) */}
                                        {bookingsError &&
                                            singleBookingDetails === null && (
                                                <div
                                                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
                                                    role="alert"
                                                >
                                                    <strong className="font-bold">
                                                        Error:
                                                    </strong>
                                                    <span className="block sm:inline">
                                                        {bookingsError}
                                                    </span>
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
