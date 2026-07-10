import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HocConditionalRendering from "./HocConditionalRendering";
import { jwtDecode } from "jwt-decode";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import Button from "./Button";
import axios from "axios";
 

function Navbar() {
  const [opacity, setOpacity] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(100); // State to control navbar height
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [userPayload, setUserPayload] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Get the token from localStorage (or cookies if you use that)
    const token = localStorage.getItem('token'); // Or use cookies.get('token') if using cookies

    if (token) {
      try {
        // Decode the token to get the payload
        const decodedPayload = jwtDecode(token);
        setUserPayload(decodedPayload);
        console.log("User Payload:", decodedPayload);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);


  useEffect(() => {
    // Only apply scroll opacity effect on the home route
    if (location.pathname === "/") {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) { // Adjust scroll value as needed
          setOpacity(1); // Fully opaque
          setNavbarHeight(70); // Smaller height when scrolled
        } else {
          setOpacity(scrollPosition / 100); // Adjust opacity based on scroll
          setNavbarHeight(100 - scrollPosition / 2); // Dynamically adjust height
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setOpacity(1); // Fully opaque on other routes
      setNavbarHeight(100); // Default height on other routes
    }
  }, [location]);
  async function HandleLogout(){
    
    localStorage.removeItem("token");

  try {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
    // ...
    const res = await axios.post(`${API_BASE}/api/v1/auth/logout`)
    if (res.data.success) {
      navigate('/signin')
      console.log("Logged out successfully");
    } else {
      // Handle logout error
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }

  }
  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full flex items-center text-white"
      style={{ height: `${navbarHeight}px`, transition: "height 0.3s ease" }} // Apply dynamic height
    >
      {/* Background overlay with opacity */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-300"
        style={{ opacity: opacity }}
      ></div>

      <div className="relative flex h-full w-full items-center justify-between px-4 sm:px-8 lg:justify-around lg:px-0 z-10">
        <p className="intro-title text-2xl sm:text-4xl lg:navbar-text">TIXPLORE.</p>

        <div className="hidden lg:w-[30%] lg:block">
          <ul className="nav-links hidden md:flex gap-5 w-full">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block rounded-sm font-semibold px-2 duration-200 transform transition-all ease-in-out 
                   ${isActive
                    ? "text-orange-400 bg-white -translate-y-1 scale-110"
                    : "text-white"
                  } 
                   hover:bg-gray-200 hover:text-black hover:scale-110 hover:-translate-y-1`
                }
              >
                Home
              </NavLink>
            </li>


            <li>
              <NavLink
                to="/membership"
                className={({ isActive }) =>
                  `block rounded-sm font-semibold px-2 duration-200 transform transition-all ease-in-out 
                   ${isActive
                    ? "text-orange-400 bg-white -translate-y-1 scale-110"
                    : "text-white"
                  } 
                   hover:bg-gray-200 hover:text-black hover:scale-110 hover:-translate-y-1`
                }
              >
                Membership
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/plan-your-visit"
                className={({ isActive }) =>
                  `block rounded-sm font-semibold px-2 duration-200 transform transition-all ease-in-out 
                   ${isActive
                    ? "text-orange-400 bg-white -translate-y-1 scale-110"
                    : "text-white"
                  } 
                   hover:bg-gray-200 hover:text-black hover:scale-110 hover:-translate-y-1`
                }
              >
                Museums
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          {
            userPayload ? (
              <>
              <Popover>
                <PopoverTrigger>
                <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-base font-bold text-white sm:h-12 sm:w-12 lg:h-16 lg:w-16 lg:text-xl"
                title={userPayload.userId} // Tooltip with the full userId
              >
                {userPayload.email.charAt(0).toUpperCase()}
              </div>
                </PopoverTrigger>
                <PopoverContent className="flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-5 p-5 lg:absolute lg:top-4 lg:-left-60 lg:w-[365px] lg:gap-8">
                  <ul className="flex flex-col gap-2">
                    {
                      userPayload.id?(
                      <h2 className="w-full flex items-center"><strong className="pr-2 inline">Discount ID:</strong>{<p className=" inline">{userPayload.id}</p>}</h2> 
                      ) : ''
                    }
                    
                    <li><strong>Status: </strong>{userPayload.membership==true?" Member":" Guest"} </li>
                    <li><strong>Discount Points</strong> {userPayload.discountPoints}</li>


                  </ul>
                  <Button className="text-white" onClick={HandleLogout} label={"Logout"}></Button>

                </PopoverContent>
                
              </Popover>
              
              </>

            )
              : (
                <button
                  onClick={() => navigate("/signup")}
                  className="flex items-center justify-center rounded-lg p-2 text-sm hover:bg-green-500 sm:text-xl sm:p-3 lg:text-xl"
                >
                  <User />
                  Sign-Up
                </button>)
          }
          <button onClick={() => setMenuOpen((open) => !open)} className="rounded-md p-2 lg:hidden" aria-label="Toggle navigation">
            {menuOpen ? <X /> : <Menu />}
          </button>

        </div>
        {menuOpen && <div className="absolute left-4 right-4 top-full rounded-xl bg-slate-950 p-4 shadow-2xl lg:hidden">
          <div className="flex flex-col gap-2 text-base">
            <NavLink onClick={() => setMenuOpen(false)} to="/" className="rounded-lg px-3 py-2 hover:bg-white/10">Home</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/membership" className="rounded-lg px-3 py-2 hover:bg-white/10">Membership</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/plan-your-visit" className="rounded-lg px-3 py-2 hover:bg-white/10">Museums</NavLink>
          </div>
        </div>}
      </div>
    </nav>
  );
}

export default HocConditionalRendering(Navbar);
