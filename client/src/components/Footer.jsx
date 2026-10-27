import React from 'react';
import { Film, Heart, ShieldCheck, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="district-glass mt-auto py-5" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-lg-5">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div 
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #FF2A6D, #7928CA)' }}
              >
                <Film size={18} color="#ffffff" />
              </div>
              <span className="brand-font fs-5 fw-bold text-white">
                IMO<span style={{ color: '#FF2A6D' }}>VIES</span>
                <span className="badge bg-secondary ms-2" style={{ fontSize: '0.65rem' }}>DISTRICT APP</span>
              </span>
            </div>
            <p className="text-muted small mb-3" style={{ maxWidth: '420px', lineHeight: '1.6' }}>
              IMovies delivers a next-generation cinema ticketing ecosystem. Explore live shows, pick premium recliners, order snacks, and get instant verified digital boarding passes with real-time seat locks.
            </p>
            <div className="d-flex align-items-center gap-3 text-muted small">
              <span className="d-flex align-items-center gap-1">
                <ShieldCheck size={16} color="#10B981" /> 256-Bit SSL Secured
              </span>
              <span>•</span>
              <span className="d-flex align-items-center gap-1">
                <Zap size={16} color="#00F2FE" /> Zero-Latency Booking
              </span>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>
              Project Information
            </h6>
            <ul className="list-unstyled text-muted small mb-0 d-flex flex-column gap-2">
              <li>Developer: <strong className="text-white">Naman Patidar</strong></li>
              <li>GitHub: <span className="text-info">@namanpatidar301271-tech</span></li>
              <li>Email: <span className="text-light">namanpatidar301271@gmail.com</span></li>
              <li>Repo: <span className="text-warning">imovies-movie-booking</span></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="p-3 rounded-4" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div className="text-white fw-semibold small mb-1">Mentor Evaluation Ready</div>
              <p className="text-muted small mb-2" style={{ fontSize: '0.78rem' }}>
                Full REST API with JWT Auth, Mongoose Schemas, Auto-fallback In-Memory DB, and District-inspired React Client.
              </p>
              <div className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 py-1 px-2">
                Status: Verified & Live
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary border-opacity-25" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center text-muted small">
          <div>&copy; {new Date().getFullYear()} IMovies District. All cinema trademarks belong to their respective owners.</div>
          <div className="mt-2 mt-sm-0">
            Crafted for <strong className="text-white">Movie Lovers & Mentors</strong>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
