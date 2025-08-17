import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import {
  FaClipboardList,
  FaUserCircle,
  FaChalkboardTeacher,
  FaClock,
  FaTasks,
  FaEnvelopeOpenText,
  FaUserTie,
  FaUserCheck,
  FaMoneyBill,
  FaChalkboard,
  FaDumbbell,
  FaShieldAlt,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [role] = useUserRole();
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-3 rounded-md bg-blue-600 text-white font-semibold shadow-md transition"
      : "flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition";

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setShowSidebar(false);
    }
  };

  // Define route shortcuts based on role
  const memberRoutes = [
    { to: "/dashboard/activityLog", label: "Activity Log", icon: <FaClipboardList /> },
    { to: "/dashboard/bookedTrainer", label: "Booked Trainer", icon: <FaChalkboardTeacher /> },
    { to: "/dashboard/profile", label: "Profile", icon: <FaUserCircle /> },
  ];

  const trainerRoutes = [
    { to: "/dashboard/trainer/addForum", label: "Add Forum", icon: <FaDumbbell /> },
    { to: "/dashboard/trainer/addSlot", label: "Add Slot", icon: <FaClock /> },
    { to: "/dashboard/trainer/manageSlot", label: "Manage Slot", icon: <FaTasks /> },
  ];

  const adminRoutes = [
    { to: "/dashboard/admin/allNewsletter", label: "All Newsletters", icon: <FaEnvelopeOpenText /> },
    { to: "/dashboard/admin/allTrainer", label: "All Trainers", icon: <FaUserTie /> },
    { to: "/dashboard/admin/appliedTrainer", label: "Applied Trainers", icon: <FaUserCheck /> },
    { to: "/dashboard/admin/balance", label: "Balance", icon: <FaMoneyBill /> },
    { to: "/dashboard/admin/newClass", label: "New Class", icon: <FaChalkboard /> },
    { to: "/dashboard/admin/addForum", label: "Add Forum", icon: <FaShieldAlt /> },
  ];

  const roleRoutes =
    role === "member"
      ? memberRoutes
      : role === "trainer"
      ? trainerRoutes
      : role === "admin"
      ? adminRoutes
      : [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 shadow-md">
          <h2 className="text-white text-xl font-bold">
            {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Loading"} Panel
          </h2>
          <p className="text-blue-100 text-sm break-all mt-1">{user?.email}</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
            onClick={handleLinkClick}
          >
            <FaHome /> Home
          </Link>

          {roleRoutes.map((r) => (
            <NavLink
              key={r.to}
              to={r.to}
              className={navLinkClass}
              onClick={handleLinkClick}
            >
              {r.icon} {r.label}
            </NavLink>
          ))}
        </nav>
      </div>
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
        ></div>
      )}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <div className="lg:hidden p-4 bg-white shadow-md flex justify-between items-center sticky top-0 z-30">
          <h1 className="text-lg font-bold text-gray-800">
            {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Loading"} Dashboard
          </h1>

          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-gray-700 hover:text-blue-600 p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Toggle Menu"
          >
            {showSidebar ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        <div className="p-4 md:p-6 lg:p-8 overflow-x-hidden">
          {location.pathname === "/dashboard" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {roleRoutes.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  <div className="text-blue-600 text-3xl mb-3">{r.icon}</div>
                  <h3 className="text-gray-800 font-semibold">{r.label}</h3>
                </Link>
              ))}
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
