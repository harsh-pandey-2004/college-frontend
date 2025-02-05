import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  GraduationCap,
  User,
  LogIn,
  LogOut,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token-user");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token-user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const menuItems = {
    academics: {
      label: "Academics",
      items: [
        { label: "Programs", href: "/programs" },
        { label: "Departments", href: "/departments" },
        { label: "Course Catalog", href: "/courses" },
        { label: "Academic Calendar", href: "/calendar" },
        { label: "Library", href: "/library" },
      ],
    },
    admissions: {
      label: "Admissions",
      items: [
        { label: "Apply", href: "/apply" },
        { label: "Requirements", href: "/requirements" },
        { label: "Financial Aid", href: "/financial-aid" },
        { label: "Visit Campus", href: "/visit" },
      ],
    },
    studentLife: {
      label: "Student Life",
      items: [
        { label: "Housing", href: "/housing" },
        { label: "Clubs & Activities", href: "/activities" },
        { label: "Career Services", href: "/career" },
        { label: "Health & Wellness", href: "/health" },
      ],
    },
    research: {
      label: "Research",
      items: [
        { label: "Research Centers", href: "/research-centers" },
        { label: "Publications", href: "/publications" },
        { label: "Opportunities", href: "/research-opportunities" },
        { label: "Resources", href: "/research-resources" },
      ],
    },
  };

  const Dropdown = ({ items, label, isOpen, onClick }) => (
    <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
      <button
        className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
        onMouseEnter={onClick}
      >
        <span>{label}</span>
        <ChevronDown
          size={16}
          className={`transform transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav className="bg-white shadow-md w-full z-20 top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="text-blue-600" size={32} />
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                window.location.reload();
              }}
            >
              <span className="font-bold text-xl text-blue-600">Logo</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {Object.entries(menuItems).map(([key, { label, items }]) => (
              <Dropdown
                key={key}
                label={label}
                items={items}
                isOpen={activeDropdown === key}
                onClick={() => setActiveDropdown(key)}
              />
            ))}

            {!isLoggedIn ? (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-100"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700"
                >
                  <User size={18} />
                  <span>Register</span>
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md"
                >
                  <User size={18} />
                  <span>Profile</span>
                </button>
                {isProfileOpen && (
                  <div className="absolute left-0 bg-white shadow-lg rounded-md mt-2 w-48 top-8 z-50 p-4">
                    <div className=" flex-col items-center border-b pb-3 mb-3 hidden md:flex">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold">
                        H
                      </div>
                      <p className="mt-2 text-gray-900 font-semibold">
                        Harsh Pandey
                      </p>
                      <p className="text-gray-500 text-sm"> 9650328936</p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4">
            {Object.entries(menuItems).map(([key, { label, items }]) => (
              <div key={key} className="mb-4">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === key ? null : key)
                  }
                  className="flex items-center justify-between w-full px-2 py-2 text-gray-700"
                >
                  <span>{label}</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition ${
                      activeDropdown === key ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === key && (
                  <div className="pl-4 space-y-2">
                    {items.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="block px-2 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {!isLoggedIn ? (
              <div className="space-y-2 pt-2">
                <Link
                  to="/login"
                  className="block w-full bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md text-center"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
