import NavBar from "../components/NavBar";
import RoomList from "../components/RoomList";

const Rooms = () => {
    return (
        <main className="min-h-screen bg-white">
            <NavBar />
            <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
                <h1 className="text-3xl md:text-4xl font-light mb-2">
                    <span className="text-amber-500">Our</span> Rooms
                </h1>
                <p className="text-gray-500 mb-10">
                    Choose a category to explore available rooms.
                </p>

                <div className="space-y-8">
                    <RoomList
                        number="01"
                        title="Classic"
                        image="/room-type/classic.jpeg"
                    />
                    <RoomList
                        number="02"
                        title="Deluxe"
                        image="/room-type/delux.jpeg"
                    />
                    <RoomList
                        number="03"
                        title="Suite"
                        image="/room-type/suite.jpeg"
                    />
                </div>
            </div>
        </main>
    );
};

export default Rooms;
