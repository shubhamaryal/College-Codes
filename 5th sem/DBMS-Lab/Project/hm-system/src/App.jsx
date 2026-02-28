import {
    createBrowserRouter,
    RouterProvider,
    useParams,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ClassicRoomDetails from "./components/ClassicRoomDetails";
import DeluxeRoomDetails from "./components/DeluxeRoomDetails";
import SuiteRoomDetails from "./components/SuiteRoomDetails";
import ReservePage from "./components/ReservePage";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";

// Picks the right room-type detail page based on URL param
function RoomDetails() {
    const { roomType } = useParams();
    if (roomType === "classic") return <ClassicRoomDetails />;
    if (roomType === "deluxe") return <DeluxeRoomDetails />;
    if (roomType === "suite") return <SuiteRoomDetails />;
    return <Navigate to="/rooms" />;
}

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/rooms", element: <Rooms /> },
    { path: "/rooms/:roomType", element: <RoomDetails /> },
    { path: "/rooms/:roomType/:roomName", element: <ReservePage /> },
    { path: "/rooms/:roomType/:roomName/booking", element: <BookingPage /> },
    { path: "/profile", element: <ProfilePage /> },
]);

const App = () => <RouterProvider router={router} />;
export default App;
