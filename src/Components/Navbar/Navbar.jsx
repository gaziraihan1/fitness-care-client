import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { Button } from "@material-tailwind/react";

const Navbar = () => {
  const { user,logOut } = useAuth();
  const navigate = useNavigate();
  const loggedOut = () => {
    logOut()
    .then(() => {
      navigate('/')
    })
  }
  const navLink = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/allTrainer"}>All Trainer</NavLink>
      </li>
      <li>
        <NavLink to={"/allClasses"}>All Classes</NavLink>
      </li>
      <li>
        <NavLink to={"/forums"}>Forums</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <nav className="flex justify-between items-center my-2">
        <div>GYM</div>
        <ul className="lg:flex gap-8 hidden 2xl:text-lg py-6 px-8 2xl:gap-12 bg-gray-200 rounded">{navLink}
            {
                user && <>
                <li>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>
      
                </>
            }
        </ul>
        <div className="lg:flex gap-3 hidden">
          {
            user ? (
              <>
              <img className="w-12 h-12 rounded-full" src={user.photoURL} alt="" />
              <button onClick={loggedOut}>
                Logout
              </button>
              </>
            ):(
              <>
              <Link to={'/register'}>
             <button className="py-2 px-5 bg-blue-700 text-white rounded">
              Register
             </button>
              </Link>
              
              <Link to={'/login'}>
             <button className="py-2 px-5 bg-blue-700 text-white rounded">
              Login
             </button>
              </Link>
              
              </>
            )
          }
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
