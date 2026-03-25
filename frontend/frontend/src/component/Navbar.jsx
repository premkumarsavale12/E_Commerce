// Navbar.jsx
import { useState } from "react";
import { FaBars, FaTimes, FaRegStar, FaSearch, FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa"; // Added FaSignOutAlt
import { useNavigate } from "react-router-dom"; // Added useNavigate

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-[1300px] mx-auto px-6 py-4 flex items-center justify-between">
        
        <button
          className="md:hidden text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Minimalist
        </h1>

        <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium">
          <a href="#" className="hover:text-gray-500">Shop</a>
          <a href="#" className="hover:text-gray-500">Best Sellers</a>
          <a href="#" className="hover:text-gray-500">Skin & Body Care</a>
          <a href="#" className="hover:text-gray-500">Baby Care</a>
          <a href="#" className="hover:text-gray-500">Hair Care</a>
          <a href="#" className="hover:text-gray-500">AI Assistants</a>
          <a href="#" className="hover:text-gray-500">Track Order</a>
        </nav>

        <div className="flex items-center gap-4 md:gap-5 text-lg">
          <FaRegStar className="hidden md:block cursor-pointer" />
          <FaSearch className="cursor-pointer" />
          <FaUser className="cursor-pointer" title="Profile" />

          {/* Added Logout Icon */}
          <FaSignOutAlt className="cursor-pointer" onClick={handleLogout} title="Logout" />

          <div className="relative cursor-pointer">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1.5 py-[1px] rounded-full">
              0
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm font-medium">
          <a href="#">Shop</a>
          <a href="#">Best Sellers</a>
          <a href="#">Skin & Body Care</a>
          <a href="#">Baby Care</a>
          <a href="#">Hair Care</a>
          <a href="#">AI Assistants</a>
          <a href="#">Track Order</a>
          <button onClick={handleLogout} className="flex items-center gap-2 text-left hover:text-red-600 transition-colors">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </header>
  );
}