import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RoomManagement from "./pages/RoomManagement";
import BookingManagement from "./pages/BookingManagement";
import CustomerManagement from "./pages/CustomerManagement";
import StaffManagement from "./pages/StaffManagement";

function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    return isLoggedIn ? children : <Navigate to="/login" />;
}

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/", element: <Navigate to="/dashboard" /> },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/rooms",
        element: (
            <ProtectedRoute>
                <RoomManagement />
            </ProtectedRoute>
        ),
    },
    {
        path: "/bookings",
        element: (
            <ProtectedRoute>
                <BookingManagement />
            </ProtectedRoute>
        ),
    },
    {
        path: "/customers",
        element: (
            <ProtectedRoute>
                <CustomerManagement />
            </ProtectedRoute>
        ),
    },
    {
        path: "/staff",
        element: (
            <ProtectedRoute>
                <StaffManagement />
            </ProtectedRoute>
        ),
    },
]);

const App = () => <RouterProvider router={router} />;
export default App;
