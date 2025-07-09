import React from "react";
import { NavLink, useNavigate } from "react-router";
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
      <nav>
        <div>GYM</div>
        <ul className="flex flex-row">{navLink}
            {
                user && <>
                <li>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>
      
                </>
            }
        </ul>
        <div>
          {
            user ? (
              <>
              <img src={user.photoURL} alt="" />
              <button onClick={loggedOut}>
                Logout
              </button>
              </>
            ):(
              <>
              <Button color="blue" size="lg" variant="filled">
                Register
              </Button>
              <Button>
                Login
              </Button>
              </>
            )
          }
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
