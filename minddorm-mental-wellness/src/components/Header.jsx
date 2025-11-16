

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smile, UserCircle, LogOut, LayoutDashboard, User, Menu, X } from 'lucide-react';

const Header = ({ onSignOut, isAdmin = false }) => {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // -----------------------------------------------
  // NAV ITEMS BASED ON ROLE (admin sees minimal menu)
  // -----------------------------------------------
  const navItems = isAdmin
    ? [
      { name: 'Dashboard', href: '/AdminDashboard' }
    ]
    : [
      { name: 'Home', href: '/HomePage' },
      { name: 'Support', href: '/SupportPage' },
      { name: 'Chat', href: '/ChatPage' },
      { name: 'Community', href: '/AnnouncementsPage' },
      { name: 'Resources', href: '/ArticlesPage' },
      { name: 'Track Mood', href: '/TrackMoodPage' },
      { name: 'Dashboard', href: '/WellnessDashboard' },
    ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);

  const handleSignOutClick = () => {
    if (onSignOut) onSignOut();
    setIsMenuOpen(false);
    setIsMobileNavOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsMobileNavOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-6 flex justify-between items-center h-14">

        {/* LOGO */}
        <div className="flex items-center space-x-2 text-blue-600 font-semibold text-lg ml-4">
          <Link to="/" className="hover:text-blue-800 transition-colors">
            <img src="/logo.png" alt="BetterX Logo" className="h-8 w-auto" />
          </Link>
        </div>

        <div className="flex items-center space-x-4">

          {/* Hamburger button — ADMIN DOES NOT SEE IT */}
          {!isAdmin && (
            <button
              className="md:hidden text-gray-600 hover:text-blue-600 p-2 z-40"
              onClick={toggleMobileNav}
            >
              {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}

          {/* DESKTOP NAV — shown for BOTH admin and users */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm px-2 py-4 text-gray-600 hover:text-blue-500 transition-colors ${location.pathname === item.href
                    ? 'font-semibold text-blue-700 border-b-2 border-blue-700'
                    : 'border-b-2 border-transparent hover:border-blue-200'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* PROFILE ICON + DROPDOWN (works same for admin & user) */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="p-1 rounded-full text-gray-700 hover:text-blue-600 focus:outline-none transition"
            >
              <UserCircle className="w-8 h-8" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-30">

                {/* My Profile */}
                {/* <Link
                  to="/UserProfile"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </Link> */}

                {/* Dashboard Link — open user or admin dashboard */}
                <Link
                  to={isAdmin ? "/AdminDashboard" : "/WellnessDashboard"}
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                <div className="border-t border-gray-100"></div>

                {/* Sign Out */}
                <button
                  onClick={handleSignOutClick}
                  className="flex items-center space-x-3 px-4 py-2 w-full text-left text-red-500 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE NAV — ADMIN DOES NOT SEE THIS */}
      {!isAdmin && (
        <nav
          id="mobile-nav-menu"
          className={`md:hidden absolute top-14 left-0 w-full bg-white shadow-xl transition-transform duration-300 z-40 ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleLinkClick}
                className={`block px-3 py-2 text-base rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition ${location.pathname === item.href ? 'font-semibold text-blue-700 bg-blue-100' : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
