import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    Plus,
    Pencil,
    Trash2,
    X,
    BedDouble,
    IndianRupee,
    Hash,
} from "lucide-react";

const API = "http://localhost:8000/admin";

const emptyRoom = {
    roomNumber: "",
    roomName: "",
    roomType: "Classic",
    price: "",
    beds: 1,
    isAvailable: true,
};

function RoomManagement() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(emptyRoom);
    const [saving, setSaving] = useState(false);
    const [filter, setFilter] = useState("all");

    const fetchRooms = async () => {
        try {
            const res = await fetch(`${API}/rooms/getroomdetails`);
            const data = await res.json();
            setRooms(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const getBeds = (room) => {
        const beds = room.amenities?.beds;
        if (!beds) return 1;
        return (beds.king || 0) + (beds.queen || 0) + (beds.single || 0) || 1;
    };

    const openAdd = () => {
        setForm(emptyRoom);
        setModal("add");
    };
    const openEdit = (room) => {
        setForm({
            roomNumber: room.roomNumber,
            roomName: room.roomName,
            roomType: room.roomType,
            price: room.price,
            beds: getBeds(room),
            isAvailable: room.isAvailable,
        });
        setModal("edit");
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const amenities = {
                beds: { king: 0, queen: 0, single: Number(form.beds) || 1 },
                wifi: true,
                bathrooms: 1,
            };
            const body = {
                roomNumber: form.roomNumber,
                roomName: form.roomName,
                roomType: form.roomType,
                price: Number(form.price),
                isAvailable: form.isAvailable,
                amenities,
                occupancy: { maxOccupancy: 2 },
            };

            if (modal === "add") {
                const res = await fetch(`${API}/rooms/addroom`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
                if (!res.ok) {
                    const d = await res.json();
                    alert(d.message);
                    return;
                }
            } else {
                const res = await fetch(
                    `${API}/rooms/updateroomdetails/${form.roomNumber}`,
                    {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                    },
                );
                if (!res.ok) {
                    const d = await res.json();
                    alert(d.message);
                    return;
                }
            }
            setModal(null);
            fetchRooms();
        } catch (e) {
            alert("Error saving room");
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (roomNumber) => {
        if (!confirm("Delete this room?")) return;
        try {
            await fetch(`${API}/rooms/deleteroom/${roomNumber}`, {
                method: "DELETE",
            });
            fetchRooms();
        } catch (e) {
            console.error(e);
        }
    };

    const update = (field) => (e) =>
        setForm((p) => ({
            ...p,
            [field]:
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value,
        }));

    const filtered =
        filter === "all"
            ? rooms
            : rooms.filter((r) => r.roomType.toLowerCase() === filter);

    const typeColor = (t) => {
        const type = t?.toLowerCase();
        if (type === "deluxe") return "bg-violet-100 text-violet-700";
        if (type === "suite") return "bg-amber-100 text-amber-700";
        return "bg-sky-100 text-sky-700";
    };

    const inputCls =
        "w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="md:ml-60 p-6 pt-20 md:pt-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Rooms
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {rooms.length} rooms total ·{" "}
                            {rooms.filter((r) => r.isAvailable).length}{" "}
                            available
                        </p>
                    </div>
                    <button
                        onClick={openAdd}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm"
                    >
                        <Plus size={16} /> Add Room
                    </button>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    {["all", "classic", "deluxe", "suite"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition capitalize ${
                                filter === f
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                            }`}
                        >
                            {f === "all" ? "All Rooms" : f}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16">
                        <BedDouble
                            size={40}
                            className="mx-auto text-gray-300 mb-3"
                        />
                        <p className="text-gray-500">No rooms found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((r) => (
                            <div
                                key={r.roomNumber}
                                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                            >
                                {/* Card header */}
                                <div className="p-5 pb-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {r.roomName}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span
                                                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${typeColor(r.roomType)}`}
                                                >
                                                    {r.roomType}
                                                </span>
                                                <span
                                                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${r.isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
                                                >
                                                    {r.isAvailable
                                                        ? "Available"
                                                        : "Occupied"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Room details */}
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1.5">
                                            <Hash size={13} /> {r.roomNumber}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <BedDouble size={13} /> {getBeds(r)}{" "}
                                            Bed{getBeds(r) !== 1 ? "s" : ""}
                                        </span>
                                    </div>
                                </div>

                                {/* Card footer */}
                                <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
                                        <IndianRupee size={16} />
                                        {r.price}
                                        <span className="text-xs font-normal text-gray-400">
                                            /night
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => openEdit(r)}
                                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                            title="Edit"
                                        >
                                            <Pencil size={15} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(r.roomNumber)
                                            }
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

                {/* Modal */}
                {modal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4 border border-gray-200">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-lg font-bold text-gray-900">
                                    {modal === "add"
                                        ? "Add New Room"
                                        : "Edit Room"}
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
                                        Room Number
                                    </label>
                                    <input
                                        value={form.roomNumber}
                                        onChange={update("roomNumber")}
                                        disabled={modal === "edit"}
                                        className={`${inputCls} ${modal === "edit" ? "bg-gray-100 text-gray-400" : ""}`}
                                        placeholder="e.g. 101"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Room Name
                                    </label>
                                    <input
                                        value={form.roomName}
                                        onChange={update("roomName")}
                                        className={inputCls}
                                        placeholder="e.g. Ocean View Classic"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Type
                                        </label>
                                        <select
                                            value={form.roomType}
                                            onChange={update("roomType")}
                                            className={inputCls}
                                        >
                                            <option value="Classic">
                                                Classic
                                            </option>
                                            <option value="Deluxe">
                                                Deluxe
                                            </option>
                                            <option value="Suite">Suite</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Price (₹)
                                        </label>
                                        <input
                                            type="number"
                                            value={form.price}
                                            onChange={update("price")}
                                            className={inputCls}
                                            placeholder="2500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Beds
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={form.beds}
                                            onChange={update("beds")}
                                            className={inputCls}
                                        />
                                    </div>
                                    <div className="flex items-end pb-1">
                                        <label className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                checked={form.isAvailable}
                                                onChange={update("isAvailable")}
                                                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-gray-700 font-medium">
                                                Available
                                            </span>
                                        </label>
                                    </div>
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
                                    {saving ? "Saving..." : "Save Room"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default RoomManagement;
