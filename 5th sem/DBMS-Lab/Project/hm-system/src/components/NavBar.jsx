import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Rooms", path: "/rooms" },
    ];

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPhone");
        setIsLoggedIn(false);
        setProfileOpen(false);
        navigate("/");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
                {/* Logo */}
                <NavLink to="/" className="text-2xl text-amber-500 font-light">
                    Table<span className="font-bold">Booking</span>
                </NavLink>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-sm font-medium px-3 py-2 rounded-md transition ${isActive ? "text-amber-500" : "text-gray-600 hover:text-gray-900"}`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}

                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition"
                            >
                                <User size={18} />
                            </button>
                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 z-50 border">
                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate("/profile");
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        My Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <NavLink
                                to="/signup"
                                className="text-sm px-4 py-2 text-amber-500 border border-amber-400 rounded-lg hover:bg-amber-500 hover:text-white transition"
                            >
                                Sign Up
                            </NavLink>
                            <NavLink
                                to="/login"
                                className="text-sm px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                            >
                                Login
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-gray-600"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t px-4 pb-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `block py-2 text-sm font-medium ${isActive ? "text-amber-500" : "text-gray-600"}`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                    {isLoggedIn ? (
                        <>
                            <NavLink
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className="block py-2 text-sm text-gray-600"
                            >
                                My Profile
                            </NavLink>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="block py-2 text-sm text-gray-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex gap-2 pt-2">
                            <NavLink
                                to="/signup"
                                onClick={() => setMenuOpen(false)}
                                className="flex-1 text-center text-sm py-2 text-amber-500 border border-amber-400 rounded-lg"
                            >
                                Sign Up
                            </NavLink>
                            <NavLink
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="flex-1 text-center text-sm py-2 bg-amber-500 text-white rounded-lg"
                            >
                                Login
                            </NavLink>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
