import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';
import Dock from './nav';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Contact' },
    { path: '/service', label: 'Service' },
  ];

  const dockItems = [
    {
      icon: <VscHome size={20} />,
      label: 'Home',
      onClick: () => window.location.href = '/',
    },
    {
      icon: <VscArchive size={20} />,
      label: 'Portfolio',
      onClick: () => window.location.href = '/portfolio',
    },
    {
      icon: <VscAccount size={20} />,
      label: 'Contact',
      onClick: () => window.location.href = '/contact',
    },
    {
      icon: <VscSettingsGear size={20} />,
      label: 'Service',
      onClick: () => window.location.href = '/service',
    },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="w-full fixed top-0 left-0 bg-white text-black shadow-md px-6 py-4 flex items-center z-50">
        {/* Logo */}
        <div className="text-2xl font-bold text-black">
          <Link to="/">CodeNest</Link>
        </div>

        {/* Center Navigation - Desktop */}
        <div className="hidden md:flex gap-6 text-lg absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`transition font-medium ${
                location.pathname === path ? 'text-purple-600' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Side - Quote Button */}
        <div className="hidden md:block ml-auto">
          <Link
            to="/quotepage"
            className="bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Get Quote
          </Link>
        </div>

        {/* Hamburger Icon - Mobile */}
        <div className="md:hidden ml-auto">
          <button onClick={() => setMenuOpen(true)} aria-label="Open Menu">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-purple-500">Menu</h2>
          <button onClick={() => setMenuOpen(false)} aria-label="Close Menu">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6 text-lg">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className="transition font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="px-6 mt-4">
          <Link
            to="/quotepage"
            className="block w-full text-center bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg transition"
            onClick={() => setMenuOpen(false)}
          >
            Get Quote
          </Link>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Bottom Dock - Mobile only */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <Dock
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>
    </>
  );
};

export default Navbar;