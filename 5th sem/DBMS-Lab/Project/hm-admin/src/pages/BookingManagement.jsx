import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Pencil, Trash2, X, CalendarCheck, ArrowRight } from "lucide-react";

const API = "http://localhost:8000/admin";

function BookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [editStatus, setEditStatus] = useState("");
    const [saving, setSaving] = useState(false);
    const [filter, setFilter] = useState("all");

    const fetchBookings = async () => {
        try {
            const res = await fetch(`${API}/bookings/getbookinghistory`);
            const data = await res.json();
            setBookings(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const fmtDate = (d) =>
        d
            ? new Date(d).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
              })
            : "—";
    const shortDate = (d) =>
        d
            ? new Date(d).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
              })
            : "—";

    const handleUpdate = async () => {
        setSaving(true);
        try {
            const res = await fetch(
                `${API}/bookings/updatebooking/${editing.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: editStatus }),
                },
            );
            if (!res.ok) {
                const d = await res.json();
                alert(d.message);
                return;
            }
            setEditing(null);
            fetchBookings();
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this booking?")) return;
        try {
            await fetch(`${API}/bookings/deletebooking/${id}`, {
                method: "DELETE",
            });
            fetchBookings();
        } catch (e) {
            console.error(e);
        }
    };

    const statusStyle = (s) => {
        if (s === "completed") return "bg-emerald-100 text-emerald-700";
        if (s === "cancelled") return "bg-red-100 text-red-700";
        if (s === "confirmed") return "bg-blue-100 text-blue-700";
        return "bg-amber-100 text-amber-700";
    };

    const filtered =
        filter === "all"
            ? bookings
            : bookings.filter((b) => b.status === filter);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="md:ml-60 p-6 pt-20 md:pt-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Bookings
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {bookings.length} total reservations
                    </p>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    {[
                        "all",
                        "pending",
                        "confirmed",
                        "completed",
                        "cancelled",
                    ].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition capitalize ${
                                filter === f
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                            }`}
                        >
                            {f === "all" ? "All" : f}
                            {f !== "all" && (
                                <span className="ml-1.5 text-xs opacity-70">
                                    (
                                    {
                                        bookings.filter((b) => b.status === f)
                                            .length
                                    }
                                    )
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16">
                        <CalendarCheck
                            size={40}
                            className="mx-auto text-gray-300 mb-3"
                        />
                        <p className="text-gray-500">No bookings found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((b) => (
                            <div
                                key={b.id}
                                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-5">
                                    {/* Top row: customer + status */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-bold text-gray-500">
                                                    {b.customerName
                                                        ?.charAt(0)
                                                        ?.toUpperCase() || "?"}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm">
                                                    {b.customerName}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Booking #{b.id}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyle(b.status)}`}
                                        >
                                            {b.status}
                                        </span>
                                    </div>

                                    {/* Room info */}
                                    <div className="bg-gray-50 rounded-xl p-3 mb-3">
                                        <p className="text-sm font-medium text-gray-900">
                                            {b.room?.name || "N/A"}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Room #{b.room?.id}
                                        </p>
                                    </div>

                                    {/* Dates */}
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                        <span>{shortDate(b.checkIn)}</span>
                                        <ArrowRight
                                            size={13}
                                            className="text-gray-400"
                                        />
                                        <span>{shortDate(b.checkOut)}</span>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between rounded-b-2xl">
                                    <span className="text-lg font-bold text-gray-900">
                                        ₹{b.totalAmount}
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => {
                                                setEditing(b);
                                                setEditStatus(b.status);
                                            }}
                                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                            title="Edit status"
                                        >
                                            <Pencil size={15} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(b.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Delete"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit Status Modal */}
                {editing && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 mx-4 border border-gray-200">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Update Booking #{editing.id}
                                </h2>
                                <button
                                    onClick={() => setEditing(null)}
                                    className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Status
                                </label>
                                <select
                                    value={editStatus}
                                    onChange={(e) =>
                                        setEditStatus(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setEditing(null)}
                                    className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    disabled={saving}
                                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition shadow-sm"
                                >
                                    {saving ? "Saving..." : "Update Status"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default BookingManagement;
