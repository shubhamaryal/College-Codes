export const fetchAvailableRooms = async () => {
    try {
        const response = await fetch(
            "http://localhost:8000/user/booking/rooms",
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            return result.data;
        } else {
            throw new Error(result.message || "Failed to fetch rooms");
        }
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;
    }
};

export const getRoomsByType = (rooms) => {
    return {
        classic: rooms.filter((room) => room.roomType === "Classic"),
        deluxe: rooms.filter((room) => room.roomType === "Deluxe"),
        suite: rooms.filter((room) => room.roomType === "Suite"),
    };
};
