import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    BedDouble,
    CalendarCheck,
    Users,
    UserCog,
    LogOut,
    Menu,
    X,
    Hotel,
} from "lucide-react";
import { useState } from "react";

const links = [
    {
        to: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        desc: "Overview & stats",
    },
    {
        to: "/rooms",
        label: "Rooms",
        icon: BedDouble,
        desc: "Manage hotel rooms",
    },
    {
        to: "/bookings",
        label: "Bookings",
        icon: CalendarCheck,
        desc: "View reservations",
    },
    {
        to: "/customers",
        label: "Customers",
        icon: Users,
        desc: "Guest accounts",
    },
    { to: "/staff", label: "Staff", icon: UserCog, desc: "Team members" },
];

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const adminName = localStorage.getItem("adminName") || "Admin";

    const logout = () => {
        localStorage.removeItem("isAdminLoggedIn");
        localStorage.removeItem("adminUsername");
        localStorage.removeItem("adminName");
        navigate("/login");
    };

    const linkCls = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            isActive
                ? "bg-indigo-50 text-indigo-700 shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        }`;

    // Get current page title for mobile header
    const currentPage =
        links.find((l) => location.pathname.startsWith(l.to))?.label || "Admin";

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-gray-200 flex-col z-40">
                {/* Logo */}
                <div className="px-5 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Hotel size={16} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-gray-900">
                                Hotel Manager
                            </h1>
                            <p className="text-[10px] text-gray-400 leading-tight">
                                Admin Panel
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-0.5 flex-1 p-3">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                        Menu
                    </p>
                    {links.map((l) => (
                        <NavLink key={l.to} to={l.to} className={linkCls}>
                            <l.icon size={18} />
                            <span>{l.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom user section */}
                <div className="border-t border-gray-100 p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-xs font-bold text-indigo-600">
                                {adminName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {adminName}
                            </p>
                            <p className="text-[11px] text-gray-400">
                                Administrator
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                    >
                        <LogOut size={14} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <Hotel size={13} className="text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">
                        {currentPage}
                    </span>
                </div>
                <button
                    onClick={() => setOpen(!open)}
                    className="text-gray-600 p-1"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* Mobile nav drawer */}
            {open && (
                <>
                    <div
                        className="md:hidden fixed inset-0 bg-black/20 z-30"
                        onClick={() => setOpen(false)}
                    />
                    <div className="md:hidden fixed top-14 left-0 right-0 bottom-0 bg-white z-30 p-4 overflow-y-auto">
                        <nav className="flex flex-col gap-1">
                            {links.map((l) => (
                                <NavLink
                                    key={l.to}
                                    to={l.to}
                                    onClick={() => setOpen(false)}
                                    className={linkCls}
                                >
                                    <l.icon size={18} />
                                    <div>
                                        <span className="block">{l.label}</span>
                                        <span className="block text-[11px] text-gray-400 font-normal">
                                            {l.desc}
                                        </span>
                                    </div>
                                </NavLink>
                            ))}
                        </nav>
                        <div className="border-t border-gray-100 mt-4 pt-4">
                            <p className="text-xs text-gray-400 mb-2">
                                Signed in as{" "}
                                <span className="text-gray-700 font-medium">
                                    {adminName}
                                </span>
                            </p>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-sm text-red-600 font-medium"
                            >
                                <LogOut size={14} /> Sign Out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Navbar;
