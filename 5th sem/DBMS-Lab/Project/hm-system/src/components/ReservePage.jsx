import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./NavBar";
import { Bed, Hash, ArrowLeft } from "lucide-react";

function ReservePage() {
    const { roomType, roomName } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const room = state?.room;

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

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-500 hover:text-amber-600 text-sm mb-6 transition"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                                <Bed size={22} className="text-amber-500" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    {room.roomName}
                                </h1>
                                <p className="text-sm text-gray-400 capitalize">
                                    {room.roomType}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <span className="flex items-center gap-2 text-sm text-gray-500">
                                    <Hash
                                        size={15}
                                        className="text-gray-400"
                                    />{" "}
                                    Room Number
                                </span>
                                <span className="font-semibold text-gray-800">
                                    {room.roomNumber}
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <span className="flex items-center gap-2 text-sm text-gray-500">
                                    <Bed
                                        size={15}
                                        className="text-gray-400"
                                    />{" "}
                                    Beds
                                </span>
                                <span className="font-semibold text-gray-800">
                                    {room.beds}
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <span className="text-sm text-gray-500">
                                    Price per night
                                </span>
                                <span className="text-xl font-bold text-amber-600">
                                    Rs. {room.price?.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                const userId =
                                    localStorage.getItem("userId");
                                if (!userId) {
                                    navigate("/login");
                                    return;
                                }
                                navigate(
                                    `/rooms/${roomType}/${roomName}/booking`,
                                    { state: { room } },
                                );
                            }}
                            className="w-full mt-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition shadow-sm"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReservePage;
