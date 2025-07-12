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
  FaChevronDown, 
  FaChevronUp,
  FaDumbbell,
  FaShieldAlt
} from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";

const DashboardLayout = () => {
  const [role] = useUserRole();
  const [showDashboard, setShowDashboard] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold flex items-center gap-2 px-4 lg:px-2 xl:px-4 py-2 rounded bg-blue-100"
      : "text-gray-700 hover:text-blue-600 flex items-center gap-2 px-4 py-2";

  // Auto-close sidebar on small screen link click
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setShowDashboard(false);
    }
  };

  return (
    <div>
      

      <main className="p-4 md:px-6 lg:p-0 lg:w-11/12 2xl:w-10/12 mx-auto lg:grid grid-cols-8 2xl:grid-cols-6 min-h-screen mt-2 gap-12 lg:mt-0">
        {/* Toggle Button (only visible on small screens) */}
        <button
  onClick={() => setShowDashboard(!showDashboard)}
  className="lg:hidden bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center gap-2 uppercase"
>
 {role} Dashboard
  {showDashboard ? <FaChevronUp /> : <FaChevronDown />}
</button>

        {/* Sidebar */}
        <div
          className={`bg-gray-200 space-y-2 p-4 lg:col-span-2 2xl:col-span-1 
    ${showDashboard ? "block" : "hidden"} 
    lg:block`}
        >
          {role === "member" && (
            <>
            <h2 className="my-2 px-2 py-2 bg-gray-600 text-white rounded hidden lg:block font-bold">
              Member Dashboard
            </h2>
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
            <h2 className="my-2 px-2 py-2 bg-gray-600 text-white rounded hidden lg:block font-bold">
              Trainer Dashboard
            </h2>
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
            <h2 className="my-2 px-2 py-2 bg-gray-600 text-white rounded hidden lg:block font-bold">
              Admin Dashboard
            </h2>
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
        </div>

        {/* Main Content */}
        <div className="lg:col-span-6 2xl:col-span-5 my-2 lg:my-0 lg:py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
