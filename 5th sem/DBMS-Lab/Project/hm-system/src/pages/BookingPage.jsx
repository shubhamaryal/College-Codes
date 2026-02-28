import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import {
    ArrowLeft,
    CalendarDays,
    Users,
    CreditCard,
    Bed,
    Hash,
    CheckCircle2,
    User,
    Mail,
    Phone,
} from "lucide-react";

function BookingPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const room = state?.room;

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: localStorage.getItem("userEmail") || "",
        phone: localStorage.getItem("userPhone") || "",
        checkIn: "",
        checkOut: "",
        guests: 1,
        paymentMethod: "cash",
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(null);

    if (!room) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-500 mb-4">
                            Room data not found.
                        </p>
                        <button
                            onClick={() => navigate("/rooms")}
                            className="text-amber-600 font-medium hover:underline"
                        >
                            Back to Rooms
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const nights = (() => {
        if (!form.checkIn || !form.checkOut) return 0;
        const diff =
            (new Date(form.checkOut) - new Date(form.checkIn)) / 86400000;
        return diff > 0 ? diff : 0;
    })();
    const total = nights * room.price;

    const update = (field) => (e) =>
        setForm((p) => ({ ...p, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (nights <= 0) {
            setError("Check-out must be after check-in.");
            return;
        }
        if (!form.firstName || !form.lastName) {
            setError("Name is required.");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch(
                "http://localhost:8000/user/booking/create",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: localStorage.getItem("userId"),
                        roomId: room.id,
                        checkIn: form.checkIn,
                        checkOut: form.checkOut,
                        guests: Number(form.guests),
                        firstName: form.firstName,
                        lastName: form.lastName,
                        phone: form.phone,
                        email: form.email,
                        paymentMethod: form.paymentMethod,
                        totalAmount: total,
                    }),
                },
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setSuccess({
                bookingId: data.bookingId || "—",
                nights,
                total,
                checkIn: form.checkIn,
                checkOut: form.checkOut,
            });
        } catch (err) {
            setError(err.message || "Booking failed.");
        } finally {
            setSubmitting(false);
        }
    };

    const inputCls =
        "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition placeholder:text-gray-400";
    const labelCls = "block text-sm font-medium text-gray-600 mb-1.5";

    // ── Success confirmation view ──
    if (success) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
                    <div className="max-w-md mx-auto text-center">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2
                                size={40}
                                className="text-green-500"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Booking Confirmed!
                        </h1>
                        <p className="text-gray-500 mb-8">
                            Your reservation has been placed successfully.
                        </p>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left space-y-4 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    Room
                                </span>
                                <span className="font-semibold text-gray-800">
                                    {room.roomName}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    Check-in
                                </span>
                                <span className="font-medium text-gray-700">
                                    {success.checkIn}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    Check-out
                                </span>
                                <span className="font-medium text-gray-700">
                                    {success.checkOut}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    Duration
                                </span>
                                <span className="font-medium text-gray-700">
                                    {success.nights} night
                                    {success.nights !== 1 ? "s" : ""}
                                </span>
                            </div>
                            <hr className="border-gray-100" />
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-gray-700">
                                    Total
                                </span>
                                <span className="text-xl font-bold text-amber-600">
                                    Rs. {success.total.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate("/profile")}
                                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition"
                            >
                                View My Bookings
                            </button>
                            <button
                                onClick={() => navigate("/rooms")}
                                className="flex-1 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition"
                            >
                                Browse Rooms
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // ── Booking form ──
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-500 hover:text-amber-600 text-sm mb-6 transition"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>

                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        Complete Your Booking
                    </h1>
                    <p className="text-gray-500 mb-8">
                        Fill in the details below to reserve your room.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left column — Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="lg:col-span-2 space-y-6"
                        >
                            {/* Guest Info */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-5">
                                    <User
                                        size={18}
                                        className="text-amber-500"
                                    />{" "}
                                    Guest Information
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelCls}>
                                            First Name
                                        </label>
                                        <input
                                            value={form.firstName}
                                            onChange={update("firstName")}
                                            className={inputCls}
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>
                                            Last Name
                                        </label>
                                        <input
                                            value={form.lastName}
                                            onChange={update("lastName")}
                                            className={inputCls}
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail
                                                size={15}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                            />
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={update("email")}
                                                className={`${inputCls} pl-10`}
                                                placeholder="john@email.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelCls}>
                                            Phone
                                        </label>
                                        <div className="relative">
                                            <Phone
                                                size={15}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                            />
                                            <input
                                                value={form.phone}
                                                onChange={update("phone")}
                                                className={`${inputCls} pl-10`}
                                                placeholder="98XXXXXXXX"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stay Details */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-5">
                                    <CalendarDays
                                        size={18}
                                        className="text-amber-500"
                                    />{" "}
                                    Stay Details
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelCls}>
                                            Check-in
                                        </label>
                                        <input
                                            type="date"
                                            value={form.checkIn}
                                            onChange={update("checkIn")}
                                            className={inputCls}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>
                                            Check-out
                                        </label>
                                        <input
                                            type="date"
                                            value={form.checkOut}
                                            onChange={update("checkOut")}
                                            className={inputCls}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>
                                            Guests
                                        </label>
                                        <div className="relative">
                                            <Users
                                                size={15}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                            />
                                            <input
                                                type="number"
                                                min="1"
                                                max="10"
                                                value={form.guests}
                                                onChange={update("guests")}
                                                className={`${inputCls} pl-10`}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelCls}>
                                            Payment
                                        </label>
                                        <div className="relative">
                                            <CreditCard
                                                size={15}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                            />
                                            <select
                                                value={form.paymentMethod}
                                                onChange={update(
                                                    "paymentMethod",
                                                )}
                                                className={`${inputCls} pl-10 appearance-none`}
                                            >
                                                <option value="cash">
                                                    Cash on Arrival
                                                </option>
                                                <option value="cc">
                                                    Credit Card
                                                </option>
                                                <option value="paypal">
                                                    PayPal
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold rounded-xl transition text-base shadow-sm"
                            >
                                {submitting
                                    ? "Processing..."
                                    : `Confirm Booking${nights > 0 ? ` — Rs. ${total.toLocaleString()}` : ""}`}
                            </button>
                        </form>

                        {/* Right column — Room summary card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                                    Room Summary
                                </h3>

                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                                        <Bed
                                            size={22}
                                            className="text-amber-500"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {room.roomName}
                                        </p>
                                        <p className="text-xs text-gray-400 capitalize">
                                            {room.roomType}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between text-gray-600">
                                        <span className="flex items-center gap-2">
                                            <Hash
                                                size={14}
                                                className="text-gray-400"
                                            />{" "}
                                            Room No.
                                        </span>
                                        <span className="font-medium">
                                            {room.roomNumber}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-600">
                                        <span className="flex items-center gap-2">
                                            <Bed
                                                size={14}
                                                className="text-gray-400"
                                            />{" "}
                                            Beds
                                        </span>
                                        <span className="font-medium">
                                            {room.beds}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-600">
                                        <span>Per night</span>
                                        <span className="font-semibold text-amber-600">
                                            Rs. {room.price?.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {nights > 0 && (
                                    <>
                                        <hr className="my-4 border-gray-100" />
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between text-gray-500">
                                                <span>
                                                    {nights} night
                                                    {nights !== 1
                                                        ? "s"
                                                        : ""}{" "}
                                                    × Rs.{" "}
                                                    {room.price?.toLocaleString()}
                                                </span>
                                                <span>
                                                    Rs.{" "}
                                                    {total.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                                                <span>Total</span>
                                                <span className="text-amber-600">
                                                    Rs.{" "}
                                                    {total.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingPage;