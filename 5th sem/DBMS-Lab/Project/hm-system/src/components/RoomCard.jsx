import { Bed, Hash, ArrowRight } from "lucide-react";

function RoomCard({ title, roomNumber, price, beds, handleReserveClick }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-500" />

            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                            <Bed size={20} className="text-amber-500" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-gray-900">{title}</h3>
                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                <Hash size={11} /> {roomNumber}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info row */}
                <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                        <Bed size={12} /> {beds}
                    </span>
                </div>

                {/* Price + Book */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400">Per night</p>
                        <p className="text-xl font-bold text-gray-900">Rs. {Number(price).toLocaleString()}</p>
                    </div>
                    <button
                        onClick={handleReserveClick}
                        className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition shadow-sm group-hover:shadow-md"
                    >
                        Book Now <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RoomCard;
