import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    BedDouble,
    CalendarCheck,
    Users,
    IndianRupee,
    TrendingUp,
    DoorOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        available: 0,
        occupied: 0,
        bookings: 0,
        customers: 0,
        revenue: 0,
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [roomsRes, bookingsRes, usersRes] = await Promise.all([
                    fetch("http://localhost:8000/admin/rooms/getroomdetails"),
                    fetch(
                        "http://localhost:8000/admin/bookings/getbookinghistory",
                    ),
                    fetch("http://localhost:8000/admin/users/getallusers"),
                ]);
                const rooms = await roomsRes.json();
                const bookings = await bookingsRes.json();
                const users = await usersRes.json();

                const roomArr = Array.isArray(rooms) ? rooms : [];
                const bookArr = Array.isArray(bookings) ? bookings : [];
                const userArr = Array.isArray(users) ? users : [];

                setStats({
                    total: roomArr.length,
                    available: roomArr.filter((r) => r.isAvailable).length,
                    occupied: roomArr.filter((r) => !r.isAvailable).length,
                    bookings: bookArr.length,
                    customers: userArr.length,
                    revenue: bookArr.reduce(
                        (s, b) => s + (Number(b.totalAmount) || 0),
                        0,
                    ),
                });
                setRecentBookings(bookArr.slice(0, 5));
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const adminName = localStorage.getItem("adminName") || "Admin";

    const cards = [
        {
            label: "Total Rooms",
            value: stats.total,
            icon: BedDouble,
            bg: "bg-blue-50",
            iconBg: "bg-blue-100",
            color: "text-blue-600",
            link: "/rooms",
        },
        {
            label: "Available",
            value: stats.available,
            icon: DoorOpen,
            bg: "bg-emerald-50",
            iconBg: "bg-emerald-100",
            color: "text-emerald-600",
            link: "/rooms",
        },
        {
            label: "Occupied",
            value: stats.occupied,
            icon: BedDouble,
            bg: "bg-orange-50",
            iconBg: "bg-orange-100",
            color: "text-orange-600",
            link: "/rooms",
        },
        {
            label: "Bookings",
            value: stats.bookings,
            icon: CalendarCheck,
            bg: "bg-violet-50",
            iconBg: "bg-violet-100",
            color: "text-violet-600",
            link: "/bookings",
        },
        {
            label: "Customers",
            value: stats.customers,
            icon: Users,
            bg: "bg-pink-50",
            iconBg: "bg-pink-100",
            color: "text-pink-600",
            link: "/customers",
        },
        {
            label: "Revenue",
            value: `₹${stats.revenue.toLocaleString()}`,
            icon: IndianRupee,
            bg: "bg-amber-50",
            iconBg: "bg-amber-100",
            color: "text-amber-600",
            link: "/bookings",
        },
    ];

    const fmtDate = (d) =>
        d
            ? new Date(d).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
              })
            : "—";

    const statusStyle = (s) => {
        if (s === "completed") return "bg-emerald-100 text-emerald-700";
        if (s === "cancelled") return "bg-red-100 text-red-700";
        if (s === "confirmed") return "bg-blue-100 text-blue-700";
        return "bg-amber-100 text-amber-700";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="md:ml-60 p-6 pt-20 md:pt-6">
                {/* Greeting */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Good{" "}
                        {new Date().getHours() < 12
                            ? "morning"
                            : new Date().getHours() < 17
                              ? "afternoon"
                              : "evening"}
                        , {adminName}
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Here's what's happening at your hotel today.
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Stat cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {cards.map((c) => (
                                <div
                                    key={c.label}
                                    onClick={() => navigate(c.link)}
                                    className={`${c.bg} rounded-2xl p-5 cursor-pointer hover:shadow-md transition-shadow`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div
                                            className={`w-10 h-10 ${c.iconBg} rounded-xl flex items-center justify-center`}
                                        >
                                            <c.icon
                                                size={18}
                                                className={c.color}
                                            />
                                        </div>
                                        <TrendingUp
                                            size={14}
                                            className="text-gray-400"
                                        />
                                    </div>
                                    <p
                                        className={`text-2xl font-bold ${c.color}`}
                                    >
                                        {c.value}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {c.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Recent bookings */}
                        {recentBookings.length > 0 && (
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                    <h2 className="font-semibold text-gray-900">
                                        Recent Bookings
                                    </h2>
                                    <button
                                        onClick={() => navigate("/bookings")}
                                        className="text-xs text-indigo-600 font-medium hover:underline"
                                    >
                                        View all
                                    </button>
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {recentBookings.map((b) => (
                                        <div
                                            key={b.id}
                                            className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <span className="text-xs font-bold text-gray-500">
                                                        {b.customerName
                                                            ?.charAt(0)
                                                            ?.toUpperCase() ||
                                                            "?"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {b.customerName}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {b.room?.name} ·{" "}
                                                        {fmtDate(b.checkIn)} →{" "}
                                                        {fmtDate(b.checkOut)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full capitalize ${statusStyle(b.status)}`}
                                                >
                                                    {b.status}
                                                </span>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    ₹{b.totalAmount}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
