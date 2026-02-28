import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    Pencil,
    Trash2,
    X,
    Users,
    Mail,
    Phone,
    CalendarCheck,
    IndianRupee,
} from "lucide-react";

const API = "http://localhost:8000/admin";

function CustomerManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [saving, setSaving] = useState(false);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API}/users/getallusers`);
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const openEdit = (u) => {
        setForm({
            name: u.name,
            email: u.email,
            phone: u.phone === "N/A" ? "" : u.phone,
        });
        setEditing(u);
    };

    const handleUpdate = async () => {
        setSaving(true);
        try {
            const res = await fetch(`${API}/users/updateuser/${editing.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const d = await res.json();
                alert(d.message);
                return;
            }
            setEditing(null);
            fetchUsers();
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this customer?")) return;
        try {
            await fetch(`${API}/users/deleteuser/${id}`, { method: "DELETE" });
            fetchUsers();
        } catch (e) {
            console.error(e);
        }
    };

    const inputCls =
        "w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

    // Color palette for avatars
    const colors = [
        "bg-blue-100 text-blue-600",
        "bg-violet-100 text-violet-600",
        "bg-pink-100 text-pink-600",
        "bg-emerald-100 text-emerald-600",
        "bg-amber-100 text-amber-600",
        "bg-sky-100 text-sky-600",
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="md:ml-60 p-6 pt-20 md:pt-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Customers
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {users.length} registered guests
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-16">
                        <Users
                            size={40}
                            className="mx-auto text-gray-300 mb-3"
                        />
                        <p className="text-gray-500">No customers found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.map((u, i) => (
                            <div
                                key={u.id}
                                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-5">
                                    {/* Avatar + name */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-11 h-11 rounded-full flex items-center justify-center ${colors[i % colors.length]}`}
                                            >
                                                <span className="text-sm font-bold">
                                                    {u.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase() || "?"}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {u.name}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    ID: {u.id}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact info */}
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Mail
                                                size={13}
                                                className="text-gray-400"
                                            />
                                            <span className="truncate">
                                                {u.email}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Phone
                                                size={13}
                                                className="text-gray-400"
                                            />
                                            <span>{u.phone}</span>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex gap-3 mt-4">
                                        <div className="flex-1 bg-gray-50 rounded-xl p-2.5 text-center">
                                            <div className="flex items-center justify-center gap-1 text-gray-400 mb-0.5">
                                                <CalendarCheck size={12} />
                                            </div>
                                            <p className="text-lg font-bold text-gray-900">
                                                {u.totalBookings}
                                            </p>
                                            <p className="text-[10px] text-gray-400">
                                                Bookings
                                            </p>
                                        </div>
                                        <div className="flex-1 bg-gray-50 rounded-xl p-2.5 text-center">
                                            <div className="flex items-center justify-center gap-1 text-gray-400 mb-0.5">
                                                <IndianRupee size={12} />
                                            </div>
                                            <p className="text-lg font-bold text-gray-900">
                                                ₹
                                                {Number(
                                                    u.totalSpent,
                                                ).toLocaleString()}
                                            </p>
                                            <p className="text-[10px] text-gray-400">
                                                Total Spent
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-1.5 rounded-b-2xl">
                                    <button
                                        onClick={() => openEdit(u)}
                                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                        title="Edit"
                                    >
                                        <Pencil size={15} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(u.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                        title="Delete"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit Modal */}
                {editing && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 mx-4 border border-gray-200">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Edit Customer
                                </h2>
                                <button
                                    onClick={() => setEditing(null)}
                                    className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Name
                                    </label>
                                    <input
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm((p) => ({
                                                ...p,
                                                name: e.target.value,
                                            }))
                                        }
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm((p) => ({
                                                ...p,
                                                email: e.target.value,
                                            }))
                                        }
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Phone
                                    </label>
                                    <input
                                        value={form.phone}
                                        onChange={(e) =>
                                            setForm((p) => ({
                                                ...p,
                                                phone: e.target.value,
                                            }))
                                        }
                                        className={inputCls}
                                    />
                                </div>
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
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default CustomerManagement;
