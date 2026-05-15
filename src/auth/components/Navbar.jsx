import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === '/';
  const isAuth = location.pathname === '/login' || location.pathname === '/signup';

  let navClass = 'agrisense-navbar';
  if (isAuth) navClass += ' auth-page';
  else if (!isHome) navClass += ' inner-page';

  const homeLinks = [
    { to: '/', label: 'Home' },
    { to: '/#features', label: 'Features' },
    { to: '/#testimonials', label: 'Stories' },
    { to: '/#contact', label: 'Contact us' },
  ];

  const innerLinks = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/disease', label: 'Disease Detection' },
    { to: '/field', label: 'Field Segmentation' },
    { to: '/forecast', label: 'Yield Forecasting' },
  ];

  const authLinks = [{ to: '/', label: 'Home' }];

  let links;
  if (isAuth) links = authLinks;
  else if (isHome && !user) links = homeLinks;
  else links = innerLinks;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={navClass}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          AgriSense
        </Link>

        <nav className={`navbar-links${menuOpen ? ' open' : ''}`}>
          {links.map(link => (
            <Link
              key={link.to + link.label}
              to={link.to}
              className={`nav-link${location.pathname === link.to ? ' active' : ''}`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar-actions">
          {!user ? (
            <>
              <Link to="/login" className="nav-btn login-btn" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" className="nav-btn signup-btn" onClick={closeMenu}>
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="nav-btn profile-btn" onClick={closeMenu}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
                Profile
              </Link>
              <button className="logout-btn" onClick={() => { logout(); closeMenu(); }}>
                Logout
              </button>
            </>
          )}

          <button
            type="button"
            className={`navbar-toggle${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
