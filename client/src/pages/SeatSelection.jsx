import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShowDetailsApi, getMovieByIdApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { 
  ChevronLeft, 
  Info, 
  Sparkles, 
  Armchair, 
  CheckCircle,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

const SeatSelection = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);
  const [showData, setShowData] = useState(null);
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  // Row and seat layout configuration
  const tiers = [
    { name: 'Recliner / VIP', rows: ['A', 'B'], priceKey: 'recliner', icon: '👑' },
    { name: 'Prime / Gold', rows: ['C', 'D'], priceKey: 'prime', icon: '🌟' },
    { name: 'Standard / Silver', rows: ['E', 'F'], priceKey: 'standard', icon: '🎟️' }
  ];

  const seatsPerRow = 10;

  useEffect(() => {
    loadShowDetails();
  }, [showId]);

  const loadShowDetails = async () => {
    setLoading(true);
    try {
      const res = await getShowDetailsApi(showId);
      if (res.success) {
        setShowData(res.data);
        if (res.data.show.movieId) {
          const mRes = await getMovieByIdApi(res.data.show.movieId);
          if (mRes.success) {
            setMovie(mRes.data);
          }
        }
      }
    } catch (err) {
      console.error('Failed to load show details', err);
    } finally {
      setLoading(false);
    }
  };

  const isBooked = (seatId) => {
    return showData?.show?.bookedSeats?.includes(seatId);
  };

  const isSelected = (seatId) => {
    return selectedSeats.some((s) => s.id === seatId);
  };

  const handleSeatClick = (row, colIndex, tierName, price) => {
    const seatId = `${row}${colIndex + 1}`;

    if (isBooked(seatId)) return;

    if (isSelected(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seatId));
      setErrorMsg('');
    } else {
      if (selectedSeats.length >= 8) {
        setErrorMsg('You can select a maximum of 8 seats per transaction.');
        return;
      }
      setSelectedSeats([
        ...selectedSeats,
        { id: seatId, row, number: colIndex + 1, tier: tierName, price }
      ]);
      setErrorMsg('');
    }
  };

  const calculateSubtotal = () => {
    return selectedSeats.reduce((sum, s) => sum + s.price, 0);
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      setErrorMsg('Please select at least 1 seat to continue.');
      return;
    }

    if (!isAuthenticated) {
      // Store pending booking state in sessionStorage and redirect to login
      sessionStorage.setItem(
        'pending_booking',
        JSON.stringify({
          showId,
          selectedSeats,
          cinema: showData.cinema,
          show: showData.show,
          movie
        })
      );
      navigate('/login?redirect=checkout');
      return;
    }

    // Pass data via state to checkout
    navigate('/checkout', {
      state: {
        showId,
        selectedSeats,
        cinema: showData.cinema,
        show: showData.show,
        movie,
        subtotal: calculateSubtotal()
      }
    });
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-danger" role="status" />
        <div className="text-muted small mt-2">Loading interactive seat layout...</div>
      </div>
    );
  }

  if (!showData) {
    return (
      <div className="container text-center py-5">
        <h4 className="text-white">Showtime Not Found</h4>
        <button onClick={() => navigate('/')} className="btn btn-district mt-3">
          Back to Shows
        </button>
      </div>
    );
  }

  const { cinema, show } = showData;

  return (
    <div className="seat-selection-page pb-5">
      {/* Top Header Bar */}
      <div className="district-glass py-3 border-bottom border-secondary border-opacity-25 sticky-top" style={{ zIndex: 900 }}>
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <button onClick={() => navigate(-1)} className="btn btn-district-outline p-2 rounded-circle">
              <ChevronLeft size={18} />
            </button>
            <div>
              <h5 className="text-white fw-bold mb-0 brand-font">
                {movie?.title || show.movieTitle}
              </h5>
              <div className="text-muted small">
                {cinema.name} • <span className="text-info">{show.format}</span> • {show.time} ({show.date})
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="text-end d-none d-sm-block">
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>Screen</div>
              <div className="text-white fw-semibold small">{show.screenName}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {errorMsg && (
          <div className="alert alert-warning py-2 d-flex align-items-center gap-2 mb-4" role="alert">
            <ShieldAlert size={18} />
            <span style={{ fontSize: '0.85rem' }}>{errorMsg}</span>
          </div>
        )}

        {/* Screen Visual Indicator */}
        <div className="screen-curve-container my-4">
          <div className="screen-curve" />
          <div className="screen-text">
            SCREEN THIS WAY
          </div>
        </div>

        {/* Seat Layout by Tiers */}
        <div className="district-glass p-4 rounded-4 mb-4" style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: '580px' }}>
            {tiers.map((tier) => {
              const tierPrice = show.pricing[tier.priceKey] || 250;

              return (
                <div key={tier.name} className="mb-4">
                  <div className="d-flex align-items-center justify-content-between border-bottom border-secondary border-opacity-25 pb-2 mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span>{tier.icon}</span>
                      <span className="text-white fw-semibold small">{tier.name}</span>
                    </div>
                    <span className="text-warning fw-bold small">
                      ₹{tierPrice}
                    </span>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    {tier.rows.map((rowLetter) => (
                      <div key={rowLetter} className="d-flex align-items-center justify-content-center gap-2">
                        {/* Row letter label */}
                        <span className="text-muted fw-bold me-2" style={{ width: '20px', fontSize: '0.8rem' }}>
                          {rowLetter}
                        </span>

                        {/* Seats */}
                        {Array.from({ length: seatsPerRow }).map((_, colIdx) => {
                          const seatId = `${rowLetter}${colIdx + 1}`;
                          const booked = isBooked(seatId);
                          const selected = isSelected(seatId);

                          return (
                            <React.Fragment key={seatId}>
                              {/* Add aisle space in the middle */}
                              {colIdx === 5 && <div style={{ width: '24px' }} />}

                              <button
                                type="button"
                                disabled={booked}
                                onClick={() => handleSeatClick(rowLetter, colIdx, tier.name, tierPrice)}
                                className={`seat-btn ${
                                  booked
                                    ? 'seat-booked'
                                    : selected
                                    ? 'seat-selected'
                                    : 'seat-available'
                                }`}
                                title={`Seat ${seatId} - ₹${tierPrice}`}
                              >
                                {colIdx + 1}
                              </button>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Seat Legend */}
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 py-2 text-muted small mb-5">
          <div className="d-flex align-items-center gap-2">
            <div className="seat-btn seat-available" style={{ width: '20px', height: '20px' }} />
            <span>Available</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="seat-btn seat-selected" style={{ width: '20px', height: '20px' }} />
            <span className="text-white fw-semibold">Selected</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="seat-btn seat-booked" style={{ width: '20px', height: '20px' }} />
            <span>Booked</span>
          </div>
        </div>
      </div>

      {/* Floating Bottom Booking Action Dock (District Mobile/Desktop Bar) */}
      <div 
        className="fixed-bottom district-glass py-3 border-top border-secondary border-opacity-25"
        style={{ zIndex: 1000 }}
      >
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <div className="text-muted small">
              {selectedSeats.length > 0 ? (
                <>
                  Seats: <strong className="text-info">{selectedSeats.map((s) => s.id).join(', ')}</strong> ({selectedSeats.length} Tickets)
                </>
              ) : (
                'Select seats to proceed'
              )}
            </div>
            <div className="fs-5 fw-extrabold text-white">
              ₹{calculateSubtotal()}{' '}
              <span className="text-muted fw-normal small" style={{ fontSize: '0.75rem' }}>+ fees</span>
            </div>
          </div>

          <button
            onClick={handleProceed}
            disabled={selectedSeats.length === 0}
            className="btn btn-district px-4 py-2 d-flex align-items-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
