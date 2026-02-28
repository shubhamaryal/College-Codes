import { useState, useEffect } from "react";
import RoomCard from "./RoomCard";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bed } from "lucide-react";
import { fetchAvailableRooms } from "../api/roomsApi";

const getBedText = (amenities) => {
    if (!amenities?.beds) return "1 Bed";
    const { king = 0, queen = 0, single = 0 } = amenities.beds;
    const total = king + queen + single;
    return `${total} Bed${total !== 1 ? "s" : ""}`;
};

function SuiteRoomDetails() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchAvailableRooms();
                setRooms(data.filter((r) => r.roomType?.toLowerCase() === "suite"));
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleReserve = (room) => {
        const userId = localStorage.getItem("userId");
        if (!userId) { navigate("/login"); return; }
        const slug = room.roomName.replace(/\s+/g, "-").toLowerCase();
        navigate(`/rooms/suite/${slug}/booking`, {
            state: { room: { ...room, roomType: "suite", beds: getBedText(room.amenities) } },
        });
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <button onClick={() => navigate("/rooms")} className="flex items-center gap-2 text-gray-500 hover:text-amber-600 text-sm mb-6 transition">
                        <ArrowLeft size={16} /> Back to Rooms
                    </button>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                            <Bed size={20} className="text-amber-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Suite Rooms</h1>
                            <p className="text-sm text-gray-400">{rooms.length} room{rooms.length !== 1 ? "s" : ""} available</p>
                        </div>
                    </div>

                    {loading && (
                        <div className="flex justify-center py-16">
                            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                    {!loading && rooms.length === 0 && (
                        <p className="text-gray-400 text-center py-16">No Suite rooms available.</p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {rooms.map((r) => (
                            <RoomCard
                                key={r.id || r.roomNumber}
                                title={r.roomName}
                                roomNumber={r.roomNumber}
                                price={r.price}
                                beds={getBedText(r.amenities)}
                                handleReserveClick={() => handleReserve(r)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SuiteRoomDetails;
