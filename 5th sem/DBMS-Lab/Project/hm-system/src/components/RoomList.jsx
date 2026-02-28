import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

const RoomList = ({ number, title, image }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row items-center mb-8">
                <div className="md:w-1/2 relative">
                    <div className="overflow-hidden rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-104 max-w-fit mx-auto md:mx-0">
                        <img
                            src={image || "/placeholder.svg"}
                            alt={`${title} hotel room`}
                            className="w-full h-auto sm:w-130 sm:h-70 object-cover rounded-3xl"
                        />
                    </div>
                </div>
                <div className="md:w-1/2 flex items-start space-x-4 sm:space-x-10 md:space-x-30 mt-4 md:mt-0">
                    <span className="text-3xl sm:text-4xl md:text-5xl text-gray-500 font-semibold">
                        {number}
                    </span>
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl text-gray-700 font-semibold">
                                {title}
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <Link
                            to={`/rooms/${title.toLowerCase()}`}
                            className="text-amber-400 hover:text-amber-500 scale-200 ml-auto sm:ml-48 mt-5"
                        >
                            <MoveRight size={24} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="border-1 border-amber-100 mb-8"></div>
        </>
    );
};

export default RoomList;
