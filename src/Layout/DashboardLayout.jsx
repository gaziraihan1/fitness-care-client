import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
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
  FaChevronDown,
  FaChevronUp,
  FaDumbbell,
  FaShieldAlt,
  FaHome,
  FaBars, 
  FaTimes
} from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [role] = useUserRole();
  const [showSidebar, setShowSidebar] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-3 rounded-md bg-blue-600 text-white font-semibold shadow-md transition"
      : "flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition";

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setShowSidebar(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 shadow-md">
          <h2 className="text-white text-xl font-bold">
            {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Loading"} Panel
          </h2>
          <p className="text-blue-100 text-sm break-all mt-1">{user?.email}</p>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Common link */}
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
            onClick={handleLinkClick}
          >
            <FaHome /> Home
          </Link>

          {/* Role-based links */}
          {role === "member" && (
            <>
              <NavLink to="/dashboard/activityLog" className={navLinkClass} onClick={handleLinkClick}>
                <FaClipboardList /> Activity Log
              </NavLink>
              <NavLink to="/dashboard/bookedTrainer" className={navLinkClass} onClick={handleLinkClick}>
                <FaChalkboardTeacher /> Booked Trainer
              </NavLink>
              <NavLink to="/dashboard/profile" className={navLinkClass} onClick={handleLinkClick}>
                <FaUserCircle /> Profile
              </NavLink>
            </>
          )}

          {role === "trainer" && (
            <>
              <NavLink to="/dashboard/trainer/addForum" className={navLinkClass} onClick={handleLinkClick}>
                <FaDumbbell /> Add Forum
              </NavLink>
              <NavLink to="/dashboard/trainer/addSlot" className={navLinkClass} onClick={handleLinkClick}>
                <FaClock /> Add Slot
              </NavLink>
              <NavLink to="/dashboard/trainer/manageSlot" className={navLinkClass} onClick={handleLinkClick}>
                <FaTasks /> Manage Slot
              </NavLink>
            </>
          )}

          {role === "admin" && (
            <>
              <NavLink to="/dashboard/admin/allNewsletter" className={navLinkClass} onClick={handleLinkClick}>
                <FaEnvelopeOpenText /> All Newsletters
              </NavLink>
              <NavLink to="/dashboard/admin/allTrainer" className={navLinkClass} onClick={handleLinkClick}>
                <FaUserTie /> All Trainers
              </NavLink>
              <NavLink to="/dashboard/admin/appliedTrainer" className={navLinkClass} onClick={handleLinkClick}>
                <FaUserCheck /> Applied Trainers
              </NavLink>
              <NavLink to="/dashboard/admin/balance" className={navLinkClass} onClick={handleLinkClick}>
                <FaMoneyBill /> Balance
              </NavLink>
              <NavLink to="/dashboard/admin/newClass" className={navLinkClass} onClick={handleLinkClick}>
                <FaChalkboard /> New Class
              </NavLink>
              <NavLink to="/dashboard/admin/addForum" className={navLinkClass} onClick={handleLinkClick}>
                <FaShieldAlt /> Add Forum
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile toggle */}
        {/* Mobile Header */}
<div className="lg:hidden p-4 bg-white shadow-md flex justify-between items-center sticky top-0 z-30">
  <h1 className="text-lg font-bold text-gray-800">
    {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Loading"} Dashboard
  </h1>

  <button
    onClick={() => setShowSidebar(!showSidebar)}
    className="text-gray-700 hover:text-blue-600 p-2 rounded-md hover:bg-gray-100 transition"
    aria-label="Toggle Menu"
  >
    {showSidebar ? (
      <FaTimes className="text-2xl" />
    ) : (
      <FaBars className="text-2xl" />
    )}
  </button>
</div>


        {/* Dashboard content */}
        <div className="p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
