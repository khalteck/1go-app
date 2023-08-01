import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useHeaderContext } from "../contexts/HeaderContext";

const Header = () => {
  const { currentPage, scrollPosition } = useHeaderContext();
  const {
    user,
    userDetails,
    logout,
    toggleLogoutOn,
    toggleLogoutOff,
    showLogout,
    accessDashboard,
    userNotLoggedIn,
  } = useAppContext();

  const [openMenu, setOpenMenu] = useState(false);
  function handleClick() {
    setOpenMenu((prevState) => !prevState);
  }

  //to close the dropdown after clicking a link
  const hideDropdown = () => {
    setOpenMenu(false);
  };

  return (
    <header>
      {/* desktop header */}
      <div
        className={`${
          scrollPosition > 224
            ? "sm:w-full md:w-full top-0 bg-[#252525]/80 lg:px-[15%]"
            : currentPage === "/login" || currentPage === "/register"
            ? "sm:w-[80%] top-8 rounded-md bg-[#252525]/50 lg:px-10"
            : "sm:w-[80%] top-8 rounded-md bg-white/20 lg:px-10"
        } px-12 py-4 fixed left-[50%] translate-x-[-50%] border-b border-slate-600 md:flex items-center z-40 hidden transition-all duration-500`}
      >
        {userNotLoggedIn && currentPage === "/login" && (
          <div className="w-[fit-content] text-[.9rem] scale flex gap-4 items-center py-3 px-10 bg-blue-100 rounded-lg border border-blue-400 absolute top-20 left-0">
            <img
              alt=""
              src="/images/icons8-info-black-64.png"
              className="w-8 h-8 mr-1"
            />
            <p>
              Login or register to book rides. <br /> It will only take a
              minute!
            </p>
          </div>
        )}
        <Link to="/" className="mr-auto">
          <img alt="" src="/images/logo.png" className="w-12 h-12" />
        </Link>
        <nav className="flex items-center uppercase">
          <div className="flex items-center gap-3 lg:gap-8 mr-auto text-white text-[0.9rem]">
            <Link
              to="/"
              className={`cursor-pointer px-2 py-1 ${
                currentPage === "/" && "bg-blue-500"
              } rounded-md hover:bg-blue-500 hover:translate-y-[6px] transition-all duration-300`}
            >
              Home
            </Link>

            <div
              onClick={accessDashboard}
              className={`cursor-pointer px-2 py-1 ${
                currentPage === "/book-ride" && "bg-blue-500"
              } rounded-md hover:bg-blue-500 hover:translate-y-[6px] transition-all duration-300`}
            >
              Bookings
            </div>
            <Link
              to="/about"
              className={`cursor-pointer px-2 py-1 ${
                currentPage === "/about" && "bg-blue-500"
              } rounded-md hover:bg-blue-500 hover:translate-y-[6px] transition-all duration-300`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`cursor-pointer px-2 py-1 ${
                currentPage === "/contact" && "bg-blue-500"
              } rounded-md hover:bg-blue-500 hover:translate-y-[6px] transition-all duration-300`}
            >
              Contact
            </Link>
            {!userDetails?.token && (
              <Link
                to="/login"
                className={`cursor-pointer px-2 py-1 ${
                  currentPage === "/login" && "bg-blue-500"
                } rounded-md hover:bg-blue-500 hover:translate-y-[6px] transition-all duration-300`}
              >
                Login
              </Link>
            )}
            {!userDetails?.token && (
              <Link
                to="/register"
                className={`cursor-pointer px-2 py-1 ${
                  currentPage === "/register" && "bg-blue-500"
                } rounded-md hover:bg-blue-500 hover:translate-y-[6px] transition-all duration-300`}
              >
                Register
              </Link>
            )}

            {userDetails?.token && (
              <div
                onMouseOver={toggleLogoutOn}
                className={`cursor-pointer px-2 py-1 rounded-md flex items-center gap-2 border-2 border-blue-500 hover:bg-blue-500/50 hover:translate-y-[6px] transition-all duration-300 relative`}
              >
                <div>
                  {userDetails?.first_name ? (
                    userDetails?.first_name
                  ) : (
                    <div className="w-[25px] h-[25px] bg-gradient-to-b from-blue-500 to-white rounded-full relative rotate">
                      {/* <div className="w-1/3 h-full bg-white"></div> */}
                      <div className="w-1/2 h-1/2 bg-slate-600/90 rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
                    </div>
                  )}
                </div>
                <img
                  alt=""
                  src="/images/icons8-user-64.png"
                  className="w-6 h-6"
                />
                <img
                  alt=""
                  src="/images/icons8-expand-arrow-50.png"
                  className="w-3 h-3"
                />
                {showLogout && (
                  <div
                    onMouseOut={toggleLogoutOff}
                    className={` ${
                      scrollPosition > 224
                        ? "bg-[#252525]/70 "
                        : "bg-[#252525]/40 "
                    } w-[fit-content] px-2 py-3 absolute top-[54px] right-[-44px] transition-all duration-500`}
                  >
                    <button
                      onClick={logout}
                      className="text-white px-10 py-2 hover:bg-blue-500/50 border-y border-white/60"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* mobile header */}
      <div
        className={` ${
          scrollPosition > 224
            ? "top-0 bg-[#252525]/70 "
            : currentPage === "/login" || currentPage === "/register"
            ? "top-6 bg-[#252525]/50"
            : "top-6 bg-white/20 "
        } md:hidden w-full h-[65px] px-6 fixed left-0 z-40 border-b-[0px] border-b-[#47a3b3] flex justify-between items-center shadow-md transition-all duration-500`}
      >
        <Link to="/" className="mr-auto">
          <img alt="" src="/images/logo.png" className="w-10 h-10" />
        </Link>
        <img
          alt="hamburger"
          src="/images/icons8-menu-rounded-30.png"
          className="w-[30px] h-[30px] cursor-pointer"
          onClick={handleClick}
        />
        {userNotLoggedIn && currentPage === "/login" && (
          <div className="w-[90%] scale-mob flex gap-4 items-center py-4 px-10 bg-blue-200 text-[0.85rem] rounded-lg border border-blue-400 absolute top-24 left-[50%] translate-x-[-50%]">
            <img
              alt=""
              src="/images/icons8-info-black-64.png"
              className="w-8 h-8 mr-1"
            />
            <p>
              Login or register to book rides. <br /> It will only take a
              minute!
            </p>
          </div>
        )}
        {openMenu && (
          <div className="w-full h-[100vh] z-[200] bg-black/80 fixed top-0 left-0 lg:hidden">
            <img
              className="w-[30px] h-[30px] cursor-pointer mr-[25px] absolute top-[30px] right-[10px] text-white"
              alt=""
              src="/images/icons8-cancel-white-48.png"
              onClick={handleClick}
            />
            <div
              onClick={hideDropdown}
              className="w-[35%] h-full float-left bg-transparent"
            ></div>
            <ul className="slide float-right w-[65%] h-full bg-black/80 px-[30px] text-[1rem] text-white pt-[100px] uppercase slide">
              {user && (
                <li
                  onMouseOver={toggleLogoutOn}
                  className={`cursor-pointer py-2 mb-8 flex items-center gap-2 border-t border-white/60 hover:bg-blue-500/50 transition-all duration-300 relative`}
                >
                  <img
                    alt=""
                    src="/images/icons8-user-64.png"
                    className="w-6 h-6"
                  />

                  <p>{userDetails?.first_name}</p>
                </li>
              )}
              <li className="my-4">
                <Link to="/" onClick={hideDropdown}>
                  <div className="w-full">Home</div>
                </Link>
              </li>
              <li
                onClick={() => {
                  hideDropdown();
                  accessDashboard();
                }}
                className="my-4"
              >
                <div className="w-full">Bookings</div>
              </li>
              <li className="my-4">
                <Link to="/about" onClick={hideDropdown}>
                  <div className="w-full">About</div>
                </Link>
              </li>
              <li className="my-4">
                <Link to="/contact" onClick={hideDropdown}>
                  <div className="w-full">Contact</div>
                </Link>
              </li>
              {!user && (
                <li className="my-4">
                  <Link to="/login" onClick={hideDropdown}>
                    <div className="w-full">Login</div>
                  </Link>
                </li>
              )}
              {!user && (
                <li className="my-4">
                  <Link to="/register" onClick={hideDropdown}>
                    <div className="w-full">Register</div>
                  </Link>
                </li>
              )}
              {user && (
                <li
                  onMouseOut={toggleLogoutOff}
                  className={`py-3 transition-all duration-500`}
                >
                  <button
                    onClick={logout}
                    className="w-full text-white py-2 px-2 text-start hover:bg-blue-500/50 border-y border-white/60"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      {/*mobile header */}
    </header>
  );
};

export default Header;
