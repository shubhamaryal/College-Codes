import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Plus, Pencil, Trash2, X, UserCog, Mail } from "lucide-react";

const API = "http://localhost:8000/admin";
const emptyStaff = { staffId: "", staffname: "", position: "Staff", email: "" };

const positionColor = (p) => {
    const pos = p?.toLowerCase();
    if (pos === "manager") return "bg-violet-100 text-violet-700";
    if (pos === "receptionist") return "bg-blue-100 text-blue-700";
    if (pos === "housekeeping") return "bg-emerald-100 text-emerald-700";
    if (pos === "chef") return "bg-amber-100 text-amber-700";
    if (pos === "security") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
};

function StaffManagement() {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(emptyStaff);
    const [saving, setSaving] = useState(false);

    const fetchStaff = async () => {
        try {
            const res = await fetch(`${API}/staff/getstaffdetails`);
            const data = await res.json();
            setStaff(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const openAdd = () => {
        setForm(emptyStaff);
        setModal("add");
    };
    const openEdit = (s) => {
        setForm({
            staffId: s.staffId,
            staffname: s.staffname,
            position: s.position,
            email: s.email,
        });
        setModal("edit");
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (modal === "add") {
                const res = await fetch(`${API}/staff/addstaff`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
                if (!res.ok) {
                    const d = await res.json();
                    alert(d.message);
                    return;
                }
            } else {
                const res = await fetch(
                    `${API}/staff/updatestaffdetails/${form.staffId}`,
                    {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            staffname: form.staffname,
                            position: form.position,
                            email: form.email,
                        }),
                    },
                );
                if (!res.ok) {
                    const d = await res.json();
                    alert(d.message);
                    return;
                }
            }
            setModal(null);
            fetchStaff();
        } catch (e) {
            alert("Error saving staff");
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (staffId) => {
        if (!confirm("Delete this staff member?")) return;
        try {
            await fetch(`${API}/staff/deletestaff/${staffId}`, {
                method: "DELETE",
            });
            fetchStaff();
        } catch (e) {
            console.error(e);
        }
    };

    const update = (field) => (e) =>
        setForm((p) => ({ ...p, [field]: e.target.value }));
    const inputCls =
        "w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

    const avatarColors = [
        "bg-indigo-100 text-indigo-600",
        "bg-pink-100 text-pink-600",
        "bg-cyan-100 text-cyan-600",
        "bg-orange-100 text-orange-600",
        "bg-emerald-100 text-emerald-600",
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="md:ml-60 p-6 pt-20 md:pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Staff
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {staff.length} team members
                        </p>
                    </div>
                    <button
                        onClick={openAdd}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm"
                    >
                        <Plus size={16} /> Add Member
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : staff.length === 0 ? (
                    <div className="text-center py-16">
                        <UserCog
                            size={40}
                            className="mx-auto text-gray-300 mb-3"
                        />
                        <p className="text-gray-500">No staff members found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {staff.map((s, i) => (
                            <div
                                key={s.staffId}
                                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-11 h-11 rounded-full flex items-center justify-center ${avatarColors[i % avatarColors.length]}`}
                                            >
                                                <span className="text-sm font-bold">
                                                    {s.staffname
                                                        ?.charAt(0)
                                                        ?.toUpperCase() || "?"}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {s.staffname}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    ID: {s.staffId}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${positionColor(s.position)}`}
                                        >
                                            {s.position}
                                        </span>
                                    </div>

                                    {s.email && (
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
                                            <Mail
                                                size={13}
                                                className="text-gray-400"
                                            />
                                            <span className="truncate">
                                                {s.email}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-1.5 rounded-b-2xl">
                                    <button
                                        onClick={() => openEdit(s)}
                                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                        title="Edit"
                                    >
                                        <Pencil size={15} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(s.staffId)}
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

                {/* Modal */}
                {modal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 mx-4 border border-gray-200">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-lg font-bold text-gray-900">
                                    {modal === "add"
                                        ? "Add Staff Member"
                                        : "Edit Staff Member"}
                                </h2>
                                <button
                                    onClick={() => setModal(null)}
                                    className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Staff ID
                                    </label>
                                    <input
                                        value={form.staffId}
                                        onChange={update("staffId")}
                                        disabled={modal === "edit"}
                                        className={`${inputCls} ${modal === "edit" ? "bg-gray-100 text-gray-400" : ""}`}
                                        placeholder="e.g. S001"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Name
                                    </label>
                                    <input
                                        value={form.staffname}
                                        onChange={update("staffname")}
                                        className={inputCls}
                                        placeholder="Full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Position
                                    </label>
                                    <select
                                        value={form.position}
                                        onChange={update("position")}
                                        className={inputCls}
                                    >
                                        <option value="Manager">Manager</option>
                                        <option value="Receptionist">
                                            Receptionist
                                        </option>
                                        <option value="Housekeeping">
                                            Housekeeping
                                        </option>
                                        <option value="Chef">Chef</option>
                                        <option value="Security">
                                            Security
                                        </option>
                                        <option value="Staff">Staff</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={update("email")}
                                        className={inputCls}
                                        placeholder="name@hotel.com"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setModal(null)}
                                    className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition shadow-sm"
                                >
                                    {saving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default StaffManagement;
