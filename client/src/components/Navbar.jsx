import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Film, 
  MapPin, 
  Ticket, 
  User, 
  LogOut, 
  Search, 
  ChevronDown, 
  Sparkles,
  Flame
} from 'lucide-react';

const CITIES = ['Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune', 'Hyderabad'];

const Navbar = () => {
  const { user, isAuthenticated, logout, selectedCity, setCity } = useAuth();
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top district-glass py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', zIndex: 1000 }}>
      <div className="container">
        {/* Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none text-white">
          <div 
            className="d-flex align-items-center justify-content-center rounded-3 shadow"
            style={{ 
              width: '38px', 
              height: '38px', 
              background: 'linear-gradient(135deg, #FF2A6D, #7928CA)' 
            }}
          >
            <Film size={22} color="#ffffff" />
          </div>
          <span className="brand-font fs-4 fw-bold">
            IMO<span style={{ color: '#FF2A6D' }}>VIES</span>
            <span 
              className="badge ms-2"
              style={{
                background: 'rgba(255, 42, 109, 0.2)',
                color: '#FF2A6D',
                fontSize: '0.65rem',
                border: '1px solid rgba(255, 42, 109, 0.4)',
                letterSpacing: '1px'
              }}
            >
              DISTRICT
            </span>
          </span>
        </Link>

        {/* City Selector Pill */}
        <div className="position-relative ms-lg-3 me-auto">
          <button
            onClick={() => setShowCityDropdown(!showCityDropdown)}
            className="btn btn-district-outline d-flex align-items-center gap-2 px-3 py-1"
            style={{ fontSize: '0.85rem' }}
          >
            <MapPin size={15} color="#00F2FE" />
            <span className="fw-semibold text-white">{selectedCity}</span>
            <ChevronDown size={14} color="#94A3B8" />
          </button>

          {showCityDropdown && (
            <div 
              className="dropdown-menu show position-absolute mt-2 p-2 shadow-lg"
              style={{
                background: '#181824',
                border: '1px solid #2d2d42',
                borderRadius: '14px',
                minWidth: '180px',
                zIndex: 1050
              }}
            >
              <div className="px-3 py-1 text-uppercase fw-bold text-muted" style={{ fontSize: '0.7rem' }}>
                Select City
              </div>
              {CITIES.map((city) => (
                <button
                  key={city}
                  className={`dropdown-item rounded-3 py-2 px-3 d-flex align-items-center justify-content-between ${
                    selectedCity === city ? 'active text-white' : 'text-light'
                  }`}
                  style={{
                    fontSize: '0.88rem',
                    background: selectedCity === city ? '#FF2A6D' : 'transparent',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setCity(city);
                    setShowCityDropdown(false);
                  }}
                >
                  <span>{city}</span>
                  {selectedCity === city && <Sparkles size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar in Navbar */}
        <form onSubmit={handleSearchSubmit} className="d-none d-md-flex align-items-center mx-3 my-2 my-lg-0" style={{ maxWidth: '300px', flex: '1' }}>
          <div className="input-group" style={{ background: '#12121c', borderRadius: '12px', border: '1px solid #2d2d42' }}>
            <span className="input-group-text bg-transparent border-0 text-muted ps-3">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="form-control bg-transparent border-0 text-white shadow-none ps-2"
              placeholder="Search movies, genres..."
              style={{ fontSize: '0.88rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Right Nav Options */}
        <div className="d-flex align-items-center gap-3">
          <Link
            to="/my-bookings"
            className="btn btn-district-outline d-flex align-items-center gap-2 px-3 py-2"
            style={{ fontSize: '0.85rem' }}
          >
            <Ticket size={16} color="#FF2A6D" />
            <span className="d-none d-sm-inline">My Bookings</span>
          </Link>

          {isAuthenticated ? (
            <div className="dropdown">
              <button
                className="btn btn-district d-flex align-items-center gap-2 py-2 px-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                  style={{ width: '24px', height: '24px', background: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="d-none d-sm-inline">{user?.name?.split(' ')[0]}</span>
                <ChevronDown size={14} />
              </button>
              <ul 
                className="dropdown-menu dropdown-menu-end shadow-lg p-2"
                style={{
                  background: '#181824',
                  border: '1px solid #2d2d42',
                  borderRadius: '14px',
                  minWidth: '200px'
                }}
              >
                <li className="px-3 py-2 border-bottom border-secondary border-opacity-25">
                  <div className="fw-semibold text-white">{user?.name}</div>
                  <div className="text-muted small text-truncate">{user?.email}</div>
                </li>
                <li>
                  <Link className="dropdown-item text-white rounded-2 py-2 mt-1 d-flex align-items-center gap-2" to="/my-bookings">
                    <Ticket size={16} color="#00F2FE" />
                    <span>Active Tickets</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider border-secondary border-opacity-25" />
                </li>
                <li>
                  <button 
                    onClick={logout} 
                    className="dropdown-item text-danger rounded-2 py-2 d-flex align-items-center gap-2"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <Link to="/login" className="btn btn-district-outline px-3 py-2" style={{ fontSize: '0.85rem' }}>
                Sign In
              </Link>
              <Link to="/register" className="btn btn-district px-3 py-2" style={{ fontSize: '0.85rem' }}>
                Join District
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
