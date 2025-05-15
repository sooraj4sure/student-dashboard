import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 

const Navbar = ({ user, login, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-4 py-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Student Dashboard</Link>
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className="hidden md:flex items-center gap-4">
          {user && <Link to="/add" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Add Student</Link>}
          {user ? (
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
          ) : (
            <button onClick={login} className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">Login</button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="mt-3 flex flex-col gap-2 md:hidden">
          {user && <Link to="/add" className="bg-blue-500 px-3 py-2 rounded hover:bg-blue-600">Add Student</Link>}
          {user ? (
            <button onClick={logout} className="bg-red-500 px-3 py-2 rounded hover:bg-red-600">Logout</button>
          ) : (
            <button onClick={login} className="bg-green-500 px-3 py-2 rounded hover:bg-green-600">Login</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
