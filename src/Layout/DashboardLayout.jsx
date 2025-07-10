import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { NavLink, Outlet } from "react-router";
import {
  FaClipboardList,
  FaUserCircle,
  FaChalkboardTeacher,
  FaPlusCircle,
  FaClock,
  FaTasks,
  FaEnvelopeOpenText,
  FaUserTie,
  FaUserCheck,
  FaMoneyBill,
  FaChalkboard,
} from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";

const DashboardLayout = () => {
  const [role] = useUserRole();
  const [showDashboard, setShowDashboard] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold flex items-center gap-2 px-4 py-2 rounded bg-blue-100"
      : "text-gray-700 hover:text-blue-600 flex items-center gap-2 px-4 py-2";

  // Auto-close sidebar on small screen link click
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setShowDashboard(false);
    }
  };

  return (
    <div>
      <header className="p-4 md:px-6 lg:p-0 lg:w-11/12 2xl:w-10/12 mx-auto">
        <Navbar />
      </header>

      <main className="p-4 md:px-6 lg:p-0 lg:w-11/12 2xl:w-10/12 mx-auto lg:grid grid-cols-6 min-h-screen mt-6 lg:mt-12 gap-12">
        {/* Toggle Button (only visible on small screens) */}
        <button
          onClick={() => setShowDashboard(!showDashboard)}
          className="lg:hidden bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showDashboard ? "Hide Dashboard" : "Show Dashboard"}
        </button>

        {/* Sidebar */}
        <div
          className={`bg-gray-200 space-y-2 p-4 lg:block col-span-1 ${
            showDashboard ? "block" : "hidden"
          }`}
        >
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
                <FaPlusCircle /> Add Forum
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
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
