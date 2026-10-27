import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login({ email, password });
      if (res.success) {
        // If there was a pending booking in session, restore it
        const pending = sessionStorage.getItem('pending_booking');
        if (pending && redirect === 'checkout') {
          sessionStorage.removeItem('pending_booking');
          const data = JSON.parse(pending);
          const subtotal = data.selectedSeats.reduce((sum, s) => sum + s.price, 0);
          navigate('/checkout', {
            state: {
              ...data,
              subtotal
            }
          });
          return;
        }
        navigate(redirect === 'checkout' ? '/' : redirect);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('demo@imovies.com');
    setPassword('Demo@123');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="district-glass p-4 p-md-5 rounded-4 shadow-xl">
            {/* Header */}
            <div className="text-center mb-4">
              <div 
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3 shadow"
                style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #FF2A6D, #7928CA)' }}
              >
                <Film size={26} color="#ffffff" />
              </div>
              <h3 className="brand-font fw-bold text-white mb-1">Welcome Back</h3>
              <p className="text-muted small">Sign in to your IMovies District account</p>
            </div>

            {error && (
              <div className="alert alert-danger py-2 small mb-4" role="alert">
                {error}
              </div>
            )}

            {/* Quick Demo Access for Mentor */}
            <div 
              className="p-3 rounded-3 mb-4 d-flex align-items-center justify-content-between"
              style={{ background: 'rgba(255, 42, 109, 0.1)', border: '1px solid rgba(255, 42, 109, 0.25)' }}
            >
              <div>
                <div className="text-white small fw-bold d-flex align-items-center gap-1">
                  <Sparkles size={14} color="#FF2A6D" /> Mentor Quick Demo
                </div>
                <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                  Auto-fill demo credentials with 1-click
                </div>
              </div>
              <button
                type="button"
                onClick={handleDemoFill}
                className="btn btn-sm btn-district py-1 px-3"
                style={{ fontSize: '0.75rem' }}
              >
                Auto Fill
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-muted small fw-semibold">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-dark border-secondary border-opacity-50 text-muted">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    required
                    className="form-control bg-dark border-secondary border-opacity-50 text-white shadow-none"
                    placeholder="namanpatidar301271@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-muted small fw-semibold">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-dark border-secondary border-opacity-50 text-muted">
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    required
                    className="form-control bg-dark border-secondary border-opacity-50 text-white shadow-none"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-district w-100 py-3 d-flex align-items-center justify-content-center gap-2"
              >
                {loading ? (
                  <div className="spinner-border spinner-border-sm" role="status" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="text-muted small">Don't have an account? </span>
              <Link to="/register" className="text-info text-decoration-none small fw-semibold">
                Join District Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
