import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { getMyBookingsApi, cancelBookingApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { 
  Ticket, 
  QrCode, 
  Calendar, 
  Clock, 
  MapPin, 
  Printer, 
  XCircle, 
  CheckCircle,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [filterTab, setFilterTab] = useState('ALL'); // 'ALL' | 'CONFIRMED' | 'CANCELLED'
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const successMessage = location.state?.successMsg;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=my-bookings');
      return;
    }
    loadBookings();
  }, [isAuthenticated]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await getMyBookingsApi();
      if (res.success) {
        setBookings(res.data);
      }
    } catch (err) {
      console.error('Failed to load bookings', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this booking? A 100% refund will be credited to your original payment mode.'
    );
    if (!confirmCancel) return;

    setCancellingId(bookingId);
    try {
      const res = await cancelBookingApi(bookingId);
      if (res.success) {
        // Refresh bookings
        loadBookings();
      } else {
        alert(res.message || 'Failed to cancel booking');
      }
    } catch (err) {
      console.error('Cancel booking error', err);
    } finally {
      setCancellingId(null);
    }
  };

  const handlePrint = (bookingId) => {
    window.print();
  };

  const filteredBookings = bookings.filter((b) => {
    if (filterTab === 'ALL') return true;
    return b.status === filterTab;
  });

  return (
    <div className="my-bookings-page py-4 pb-5">
      <div className="container">
        {successMessage && (
          <div className="alert alert-success d-flex align-items-center gap-2 mb-4 rounded-4 py-3" role="alert">
            <CheckCircle size={22} />
            <div>
              <strong className="d-block">{successMessage}</strong>
              <span className="small text-success text-opacity-75">
                Your entry passes are ready below. Show the QR code at the cinema gate for instant entry.
              </span>
            </div>
          </div>
        )}

        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <h3 className="brand-font fw-bold text-white mb-1 d-flex align-items-center gap-2">
              <Ticket size={26} color="#FF2A6D" />
              My District Tickets
            </h3>
            <p className="text-muted small mb-0">
              Manage your movie passes, show QR codes, or download printable receipts
            </p>
          </div>

          <div className="d-flex gap-2">
            {['ALL', 'CONFIRMED', 'CANCELLED'].map((tab) => (
              <button
                key={tab}
                className={`btn btn-sm rounded-pill px-3 py-1 ${
                  filterTab === tab ? 'btn-district' : 'btn-district-outline text-muted'
                }`}
                style={{ fontSize: '0.8rem' }}
                onClick={() => setFilterTab(tab)}
              >
                {tab === 'ALL' ? 'All Tickets' : tab}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status" />
            <div className="text-muted small mt-2">Fetching your tickets...</div>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="row g-4">
            {filteredBookings.map((b) => (
              <div key={b._id || b.bookingId} className="col-lg-6">
                <div className="ticket-pass p-4 text-white shadow-lg">
                  {/* Status header */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span
                      className={`badge px-3 py-1 rounded-pill ${
                        b.status === 'CONFIRMED'
                          ? 'bg-success bg-opacity-25 text-success border border-success border-opacity-50'
                          : 'bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50'
                      }`}
                      style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}
                    >
                      {b.status === 'CONFIRMED' ? '● CONFIRMED PASS' : 'CANCELLED & REFUNDED'}
                    </span>
                    <span className="text-muted font-monospace small">
                      ID: <strong className="text-white">{b.bookingId}</strong>
                    </span>
                  </div>

                  {/* Movie Info & Poster */}
                  <div className="row g-3 align-items-center pb-3 border-bottom border-secondary border-opacity-25 mb-3">
                    <div className="col-3">
                      <img
                        src={b.moviePoster || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80'}
                        alt={b.movieTitle}
                        className="img-fluid rounded-3"
                        style={{ height: '110px', width: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-9">
                      <h5 className="fw-bold brand-font text-white mb-1">{b.movieTitle}</h5>
                      <div className="text-muted small mb-1">
                        <MapPin size={13} className="me-1 inline" />
                        {b.cinemaName} ({b.cinemaCity})
                      </div>
                      <div className="text-info small fw-semibold">
                        {b.screenName} • {b.format} • {b.language}
                      </div>
                      <div className="text-muted small mt-1">
                        <Calendar size={13} className="me-1 inline" /> {b.showDate} | <Clock size={13} className="me-1 inline" /> {b.showTime}
                      </div>
                    </div>
                  </div>

                  {/* Seats & Booking details */}
                  <div className="row g-2 mb-3 bg-dark bg-opacity-50 p-3 rounded-3">
                    <div className="col-6">
                      <div className="text-muted small" style={{ fontSize: '0.72rem' }}>SEATS BOOKED</div>
                      <div className="text-warning fw-extrabold fs-6">
                        {b.seats?.join(', ')}
                      </div>
                    </div>
                    <div className="col-6 text-end">
                      <div className="text-muted small" style={{ fontSize: '0.72rem' }}>TOTAL PAID</div>
                      <div className="text-white fw-bold fs-6">
                        ₹{b.totalAmount}
                      </div>
                    </div>

                    {b.foodAddons && b.foodAddons.length > 0 && (
                      <div className="col-12 mt-2 pt-2 border-top border-secondary border-opacity-25">
                        <div className="text-muted small" style={{ fontSize: '0.7rem' }}>F&B ADDONS:</div>
                        <div className="small text-light">
                          {b.foodAddons.map((f) => `${f.name} x${f.quantity}`).join(' • ')}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* QR Code and Actions */}
                  <div className="d-flex align-items-center justify-content-between pt-2">
                    <div className="d-flex align-items-center gap-2">
                      <div 
                        className="p-2 rounded bg-white text-dark d-flex align-items-center justify-content-center"
                        style={{ width: '48px', height: '48px' }}
                      >
                        <QrCode size={34} />
                      </div>
                      <div className="small text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                        Scan at entry turnstile<br />
                        <span className="text-info">District FastPass</span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button
                        onClick={() => handlePrint(b.bookingId)}
                        className="btn btn-district-outline btn-sm d-flex align-items-center gap-1"
                        title="Print / Save e-Ticket"
                      >
                        <Printer size={15} />
                        <span className="d-none d-sm-inline">Print</span>
                      </button>

                      {b.status === 'CONFIRMED' && (
                        <button
                          disabled={cancellingId === b.bookingId}
                          onClick={() => handleCancel(b.bookingId)}
                          className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                          style={{ fontSize: '0.75rem' }}
                        >
                          <XCircle size={15} />
                          <span>{cancellingId === b.bookingId ? 'Cancelling...' : 'Cancel'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="district-glass p-5 rounded-4 text-center my-4">
            <Ticket size={48} className="text-muted mb-3" />
            <h4 className="text-white fw-bold">No Bookings Found</h4>
            <p className="text-muted small mb-4">
              You haven't booked any movie screenings in this tab yet. Explore trending movies and book your seats!
            </p>
            <Link to="/" className="btn btn-district px-4 py-2">
              Browse Movies Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
