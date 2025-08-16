import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaBars, FaTimes, FaDumbbell } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut().then(() => navigate("/"));
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "relative text-blue-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:rounded"
      : "relative text-gray-700 hover:text-blue-600 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-blue-400 after:rounded after:transition-all after:duration-300 after:w-0";

  const navLinks = (
    <>
      <li>
        <NavLink to={"/"} className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={"/allTrainer"} className={navLinkClass}>
          All Trainer
        </NavLink>
      </li>
      <li>
        <NavLink to={"/allClasses"} className={navLinkClass}>
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink to={"/forums"} className={navLinkClass}>
          Forums
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={"/dashboard"} className={navLinkClass}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <header className="bg-white sticky top-0 z-50">
      <nav className="flex justify-between items-center py-3 px-4 lg:px-0 lg:w-11/12 2xl:w-10/12 mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-blue-700 hover:text-blue-800 transition-colors"
        >
          <FaDumbbell className="text-3xl" />
          <span>FitnessCare</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              <div className="relative group">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-blue-600 shadow"
                />
                <span className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                  {user.displayName || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium shadow transition"
              >
                Logout
              </button>
            </>
          ) : (
            
            <>
            {
              loading ? <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div> : 
              <Link to="/register">
                <button className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow transition">
                  Register
                </button>
              </Link>
            }
            {
              loading ? <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>: 
              <Link to="/login">
                <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium shadow transition">
                  Login
                </button>
              </Link>
            }
            </>
          )}
        </div>

        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            {menuOpen ? (
              <FaTimes className="text-2xl text-gray-800" />
            ) : (
              <FaBars className="text-2xl text-gray-800" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-xl font-bold text-blue-700">Menu</span>
          <button onClick={toggleMenu}>
            <FaTimes className="text-2xl text-gray-700" />
          </button>
        </div>
        <ul className="flex flex-col gap-6 p-6 text-base font-medium">
          <li>
      <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/allTrainer" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        All Trainer
      </NavLink>
    </li>
    <li>
      <NavLink to="/allClasses" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        All Classes
      </NavLink>
    </li>
    <li>
      <NavLink to="/forums" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        Forums
      </NavLink>
    </li>
    {user && (
      <li>
        <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          Dashboard
        </NavLink>
      </li>
    )}
        </ul>
        <div className="px-6 mt-4 border-t pt-4 flex flex-col gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-blue-600 shadow"
                />
                <span className="text-sm font-semibold">
                  {user.displayName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition">
                  Register
                </button>
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full shadow transition">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
