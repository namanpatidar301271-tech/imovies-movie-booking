import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, Lock, Mail, User, Phone, MapPin, ArrowRight } from 'lucide-react';

const CITIES = ['Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune', 'Hyderabad'];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: 'Bengaluru'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const res = await register(formData);
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('An unexpected error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="district-glass p-4 p-md-5 rounded-4 shadow-xl">
            {/* Header */}
            <div className="text-center mb-4">
              <div 
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3 shadow"
                style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #FF2A6D, #7928CA)' }}
              >
                <Film size={26} color="#ffffff" />
              </div>
              <h3 className="brand-font fw-bold text-white mb-1">Create an Account</h3>
              <p className="text-muted small">Unlock IMAX perks, instant bookings, and digital fastpasses</p>
            </div>

            {error && (
              <div className="alert alert-danger py-2 small mb-4" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label text-muted small fw-semibold">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary border-opacity-50 text-muted">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      className="form-control bg-dark border-secondary border-opacity-50 text-white shadow-none"
                      placeholder="Naman Patidar"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label text-muted small fw-semibold">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary border-opacity-50 text-muted">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      className="form-control bg-dark border-secondary border-opacity-50 text-white shadow-none"
                      placeholder="namanpatidar301271@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <label className="form-label text-muted small fw-semibold">Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary border-opacity-50 text-muted">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control bg-dark border-secondary border-opacity-50 text-white shadow-none"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <label className="form-label text-muted small fw-semibold">Preferred City</label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary border-opacity-50 text-muted">
                      <MapPin size={16} />
                    </span>
                    <select
                      name="city"
                      className="form-select bg-dark border-secondary border-opacity-50 text-white shadow-none"
                      value={formData.city}
                      onChange={handleChange}
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label text-muted small fw-semibold">Password (min. 6 characters)</label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary border-opacity-50 text-muted">
                      <Lock size={16} />
                    </span>
                    <input
                      type="password"
                      name="password"
                      required
                      minLength={6}
                      className="form-control bg-dark border-secondary border-opacity-50 text-white shadow-none"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-district w-100 py-3 mt-4 d-flex align-items-center justify-content-center gap-2"
              >
                {loading ? (
                  <div className="spinner-border spinner-border-sm" role="status" />
                ) : (
                  <>
                    <span>Create District Account</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="text-muted small">Already registered? </span>
              <Link to="/login" className="text-info text-decoration-none small fw-semibold">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
