import React from "react";
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
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold flex items-center gap-2 px-4 py-2 rounded bg-blue-100"
      : "text-gray-700 hover:text-blue-600 flex items-center gap-2 px-4 py-2";

  return (
    <div>
      <header className="p-4 md:px-6 lg:p-0 lg:w-11/12 2xl:w-10/12 mx-auto">
        <Navbar />
      </header>
      <main className="p-4 md:px-6 lg:p-0 lg:w-11/12 2xl:w-10/12 mx-auto lg:grid grid-cols-6">
        <div className="col-span-1">
          {role === "member" && (
            <>
              <NavLink
                to="/dashboard/activityLog"
                className="flex items-center gap-2"
              >
                <FaClipboardList /> Activity Log
              </NavLink>
              <NavLink
                to="/dashboard/bookedTrainer"
                className="flex items-center gap-2"
              >
                <FaChalkboardTeacher /> Booked Trainer
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className="flex items-center gap-2"
              >
                <FaUserCircle /> Profile
              </NavLink>
            </>
          )}
          {role === "trainer" && (
            <>
              <NavLink
                to="/dashboard/trainer/addForum"
                className="flex items-center gap-2"
              >
                <FaPlusCircle /> Add Forum
              </NavLink>
              <NavLink
                to="/dashboard/trainer/addSlot"
                className="flex items-center gap-2"
              >
                <FaClock /> Add Slot
              </NavLink>
              <NavLink
                to="/dashboard/trainer/manageSlot"
                className="flex items-center gap-2"
              >
                <FaTasks /> Manage Slot
              </NavLink>
            </>
          )}
          {role === "admin" && (
            <>
              <NavLink
                to="/dashboard/admin/allNewsletter"
                className="flex items-center gap-2"
              >
                <FaEnvelopeOpenText /> All Newsletters
              </NavLink>
              <NavLink
                to="/dashboard/admin/allTrainer"
                className="flex items-center gap-2"
              >
                <FaUserTie /> All Trainers
              </NavLink>
              <NavLink
                to="/dashboard/admin/appliedTrainer"
                className="flex items-center gap-2"
              >
                <FaUserCheck /> Applied Trainers
              </NavLink>
              <NavLink
                to="/dashboard/admin/balance"
                className="flex items-center gap-2"
              >
                <FaMoneyBill /> Balance
              </NavLink>
              <NavLink
                to="/dashboard/admin/newClass"
                className="flex items-center gap-2"
              >
                <FaChalkboard /> New Class
              </NavLink>
            </>
          )}
        </div>
        <div className="col-span-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
