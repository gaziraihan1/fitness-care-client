import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut().then(() => {
      navigate("/");
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

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
      <nav className="flex justify-between items-center py-4 px-4 lg:px-0 lg:w-11/12 2xl:w-10/12 mx-auto">
        <div className="text-2xl font-bold text-blue-700">🏋️‍♂️ Fitness Care</div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-10">{navLinks}</ul>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border"
              />
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <FaTimes className="text-2xl text-gray-700" />
            ) : (
              <FaBars className="text-2xl text-gray-700" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 py-4 bg-gray-100 border-t">
          {navLinks}
          <div className="flex flex-col gap-3 mt-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full border"
                  />
                  <span>{user.displayName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
