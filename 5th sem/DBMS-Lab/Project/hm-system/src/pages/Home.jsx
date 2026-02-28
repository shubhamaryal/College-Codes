import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Bed } from "lucide-react";

const roomTypes = [
    {
        name: "Classic",
        image: "/room-type/classic.jpeg",
        desc: "Cozy rooms with all the essentials for a comfortable stay.",
        link: "/rooms/classic",
    },
    {
        name: "Deluxe",
        image: "/room-type/delux.jpeg",
        desc: "Spacious rooms with premium furnishings and city views.",
        link: "/rooms/deluxe",
    },
    {
        name: "Suite",
        image: "/room-type/suite.jpeg",
        desc: "Luxury suites with separate living area and top amenities.",
        link: "/rooms/suite",
    },
];

const Home = () => {
    return (
        <main className="min-h-screen bg-white">
            <NavBar />

            {/* Hero */}
            <section className="relative h-[520px]">
                <img
                    src="/images/hotel.jpeg"
                    alt="Hotel"
                    className="w-full h-full object-cover brightness-[0.55]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Welcome to{" "}
                        <span className="text-amber-400">TableBooking</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-8">
                        Experience comfort and elegance — book your perfect room
                        today.
                    </p>
                    <Link
                        to="/rooms"
                        className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition"
                    >
                        Browse Rooms
                    </Link>
                </div>
            </section>

            {/* Room Types */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl md:text-4xl font-light text-center mb-2">
                    Our{" "}
                    <span className="text-amber-500 font-medium">
                        Room Types
                    </span>
                </h2>
                <p className="text-gray-500 text-center mb-12">
                    Choose from Classic, Deluxe, or Suite.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {roomTypes.map((room) => (
                        <Link
                            key={room.name}
                            to={room.link}
                            className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                        >
                            <div className="h-52 overflow-hidden">
                                <img
                                    src={room.image}
                                    alt={room.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Bed className="w-5 h-5 text-amber-500" />
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {room.name}
                                    </h3>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    {room.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </main>
    );
};

export default Home;
