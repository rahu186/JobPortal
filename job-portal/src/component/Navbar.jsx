import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { getAuth, signOut } from "firebase/auth"; // Import signOut from Firebase

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext); // Get user from AuthContext
  const auth = getAuth(); // Get the auth instance

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Start a search", enabled: true },
    { path: "/my-job", title: "My Jobs", enabled: user !== null }, // Enable if user is logged in
    { path: "/games", title: "Games", enabled: true }, // Always enabled
    { path: "/post-job", title: "Post A Job", enabled: user !== null }, // Enable if user is logged in
  ];

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // Reset user context
        console.log("User logged out"); // Optional: log message
      })
      .catch((error) => {
        console.error("Logout error:", error); // Handle errors if needed
      });
  };

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <Link to="/" className="flex items-center gap-2 text-2xl text-b">
          <img src="/images/Raycast.png" alt="Career Plus" />
          <span>Career Plus</span>
        </Link>
        {/* navbar items for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title, enabled }) => (
            <li key={path} className="text-base text-primary">
              {enabled ? (
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              ) : (
                <span className="text-gray-400">{title}</span> // Disabled styling for My Jobs and Post A Job
              )}
            </li>
          ))}
        </ul>
        {/* account icon and logout button for large devices */}
        <div className="items-center gap-5 hidden md:flex">
          {user ? (
            <>
              <img
                src={user.photoURL || "/path/to/default/image.png"} // Fallback image
                alt={`${user.displayName}'s account`}
                className="w-8 h-8 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="py-2 px-5 border rounded bg-red-600 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="text-base text-primary font-medium space-x-5">
              <Link to="/login" className="py-2 px-5 border rounded">
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="py-2 px-5 border rounded bg-blue text-white"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        {/* mobile menu toggler */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>
      {/* nav items for mobile */}
      {isMenuOpen && (
        <div className="px-4 bg-gray-800 py-5 rounded-sm md:hidden">
          <ul>
            {navItems.map(({ path, title, enabled }) => (
              <li key={path} className="text-base text-white py-1">
                {enabled ? (
                  <NavLink
                    to={path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={handleMenuToggler}
                  >
                    {title}
                  </NavLink>
                ) : (
                  <span className="text-gray-400">{title}</span> // Disabled styling for My Jobs and Post A Job
                )}
              </li>
            ))}
            <li className="text-white py-1">
              {user ? (
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL || "/path/to/default/image.png"} // Fallback image
                    alt={`${user.displayName}'s account`}
                    className="w-8 h-8 rounded-full"
                  />
                  <button onClick={handleLogout} className="text-white">Logout</button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3"> {/* Added flex-col here */}
                  <Link to="/login" onClick={handleMenuToggler} className="text-white">
                    Log in
                  </Link>
                  <Link
                    to="/sign-up"
                    onClick={handleMenuToggler}
                    className="text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
