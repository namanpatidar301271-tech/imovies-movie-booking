import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBookingApi, getAddonsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import { 
  ChevronLeft, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  Ticket, 
  Plus, 
  Minus, 
  CheckCircle,
  Sparkles,
  Lock
} from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const bookingState = location.state;

  const [addons, setAddons] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('District UPI (GPay/PhonePe)');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!bookingState || !bookingState.selectedSeats || bookingState.selectedSeats.length === 0) {
      navigate('/');
      return;
    }

    loadAddons();
  }, [bookingState]);

  const loadAddons = async () => {
    try {
      const res = await getAddonsApi();
      if (res.success) {
        setAddons(res.data);
      }
    } catch (err) {
      console.error('Failed to load addons', err);
    }
  };

  if (!bookingState) return null;

  const { movie, cinema, show, selectedSeats, subtotal } = bookingState;

  const handleAddonQty = (addonId, delta) => {
    setSelectedAddons((prev) => {
      const current = prev[addonId] || 0;
      const nextVal = Math.max(0, current + delta);
      if (nextVal === 0) {
        const copy = { ...prev };
        delete copy[addonId];
        return copy;
      }
      return { ...prev, [addonId]: nextVal };
    });
  };

  const calculateFoodTotal = () => {
    return Object.entries(selectedAddons).reduce((total, [id, qty]) => {
      const item = addons.find((a) => a.id === id);
      return total + (item ? item.price * qty : 0);
    }, 0);
  };

  const convenienceFee = 48;
  const foodTotal = calculateFoodTotal();
  const grandTotal = subtotal + foodTotal + convenienceFee;

  const handlePayAndConfirm = async () => {
    setProcessing(true);
    setErrorMsg('');

    try {
      // Prepare food items array
      const foodItems = Object.entries(selectedAddons).map(([id, qty]) => {
        const item = addons.find((a) => a.id === id);
        return {
          id,
          name: item.name,
          price: item.price,
          quantity: qty
        };
      });

      const payload = {
        movieId: movie?._id || show.movieId,
        movieTitle: movie?.title || show.movieTitle,
        moviePoster: movie?.poster || '',
        certificate: movie?.certificate || 'UA 16+',
        cinemaId: cinema.id || cinema._id,
        cinemaName: cinema.name,
        cinemaCity: cinema.city,
        cinemaLocation: cinema.location,
        screenName: show.screenName,
        showId: show.showId,
        showTime: show.time,
        showDate: show.date,
        format: show.format,
        language: show.language,
        seats: selectedSeats.map((s) => s.id),
        seatDetails: selectedSeats.map((s) => ({
          seatId: s.id,
          tier: s.tier,
          price: s.price
        })),
        subtotal,
        convenienceFee,
        foodAddons: foodItems,
        totalAmount: grandTotal,
        paymentMethod
      };

      const res = await createBookingApi(payload);

      if (res.success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Navigate to My Bookings with confirmed ticket
        navigate('/my-bookings', {
          state: { newBooking: res.data, successMsg: '🎉 Booking Confirmed! Your tickets are ready below.' }
        });
      } else {
        setErrorMsg(res.message || 'Payment failed. Please try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMsg('An unexpected error occurred during checkout.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="checkout-page py-4 pb-5">
      <div className="container">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-district-outline d-inline-flex align-items-center gap-1 mb-3 py-1 px-3 text-muted"
          style={{ fontSize: '0.85rem' }}
        >
          <ChevronLeft size={16} /> Back to Seats
        </button>

        <h3 className="brand-font fw-bold text-white mb-4">
          District Checkout & Food Add-ons
        </h3>

        {errorMsg && (
          <div className="alert alert-danger py-2 mb-4" role="alert">
            {errorMsg}
          </div>
        )}

        <div className="row g-4">
          {/* Left Column: Food Addons & Payment Option */}
          <div className="col-lg-7">
            {/* Grab a Bite / Addons */}
            <div className="district-glass p-4 rounded-4 mb-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="text-white fw-bold mb-0 d-flex align-items-center gap-2">
                  <span>🍿</span> Grab a Bite (Save up to 20%)
                </h5>
                <span className="badge bg-secondary bg-opacity-25 text-info" style={{ fontSize: '0.75rem' }}>
                  Delivered to Seat
                </span>
              </div>

              <div className="d-flex flex-column gap-3">
                {addons.map((addon) => {
                  const qty = selectedAddons[addon.id] || 0;
                  return (
                    <div
                      key={addon.id}
                      className="p-3 rounded-3 d-flex align-items-center justify-content-between"
                      style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <span className="fs-3">{addon.icon}</span>
                        <div>
                          <div className="text-white fw-semibold small">{addon.name}</div>
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>{addon.desc}</div>
                          <div className="text-warning fw-bold small mt-1">₹{addon.price}</div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        {qty > 0 ? (
                          <div className="d-flex align-items-center gap-2 bg-dark rounded-pill px-2 py-1 border border-secondary border-opacity-50">
                            <button
                              type="button"
                              className="btn btn-sm text-white p-0"
                              onClick={() => handleAddonQty(addon.id, -1)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-white fw-bold px-1" style={{ fontSize: '0.85rem' }}>
                              {qty}
                            </span>
                            <button
                              type="button"
                              className="btn btn-sm text-white p-0"
                              onClick={() => handleAddonQty(addon.id, 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-sm btn-district-outline px-3 py-1"
                            onClick={() => handleAddonQty(addon.id, 1)}
                            style={{ fontSize: '0.8rem' }}
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="district-glass p-4 rounded-4">
              <h5 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
                <CreditCard size={20} color="#00F2FE" />
                Select Payment Method
              </h5>

              <div className="d-flex flex-column gap-2 mb-3">
                {[
                  { id: 'upi', label: 'District Instant UPI (Google Pay, PhonePe, Paytm)', icon: Smartphone },
                  { id: 'card', label: 'Credit / Debit Card (Visa, Mastercard, RuPay)', icon: CreditCard },
                  { id: 'netbanking', label: 'NetBanking / Corporate Banking', icon: Lock }
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`p-3 rounded-3 d-flex align-items-center gap-3 cursor-pointer ${
                      paymentMethod.includes(method.id)
                        ? 'border border-info'
                        : 'border border-secondary border-opacity-25'
                    }`}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment_choice"
                      className="form-check-input mt-0"
                      checked={paymentMethod.toLowerCase().includes(method.id)}
                      onChange={() => setPaymentMethod(method.label)}
                    />
                    <method.icon size={18} color="#00F2FE" />
                    <span className="text-white small fw-medium">{method.label}</span>
                  </label>
                ))}
              </div>

              {paymentMethod.toLowerCase().includes('upi') && (
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control bg-dark border-secondary text-white"
                    placeholder="Enter UPI ID (e.g., yourname@okhdfcbank / yourname@paytm)"
                    style={{ fontSize: '0.88rem' }}
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <span className="text-muted small mt-1 d-block" style={{ fontSize: '0.72rem' }}>
                    Instant confirmation via sandbox payment gateway.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="col-lg-5">
            <div className="district-glass-card p-4 rounded-4 sticky-top" style={{ top: '90px' }}>
              <h5 className="text-white fw-bold mb-3 brand-font">Booking Summary</h5>

              {/* Movie info */}
              <div className="d-flex gap-3 pb-3 mb-3 border-bottom border-secondary border-opacity-25">
                <img
                  src={movie?.poster}
                  alt={movie?.title}
                  className="rounded-3"
                  style={{ width: '60px', height: '85px', objectFit: 'cover' }}
                />
                <div>
                  <h6 className="text-white fw-bold mb-1">{movie?.title || show.movieTitle}</h6>
                  <div className="text-muted small">{show.language} • {show.format}</div>
                  <div className="text-muted small">{cinema.name}</div>
                  <div className="text-info small fw-semibold mt-1">
                    {show.date} | {show.time}
                  </div>
                </div>
              </div>

              {/* Seats list */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Seats:</span>
                <span className="text-white fw-bold small">
                  {selectedSeats.map((s) => s.id).join(', ')} ({selectedSeats.length} Seats)
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Base Ticket Fare</span>
                <span className="text-white small">₹{subtotal}</span>
              </div>

              {foodTotal > 0 && (
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small">Food & Snacks</span>
                  <span className="text-white small">₹{foodTotal}</span>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted small">Convenience Fee & GST</span>
                <span className="text-white small">₹{convenienceFee}</span>
              </div>

              <hr className="border-secondary border-opacity-25 my-3" />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="text-white fw-bold fs-5">Amount Payable</span>
                <span className="text-warning fw-extrabold fs-4">₹{grandTotal}</span>
              </div>

              <button
                type="button"
                disabled={processing}
                onClick={handlePayAndConfirm}
                className="btn btn-district w-100 py-3 d-flex align-items-center justify-content-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="spinner-border spinner-border-sm" role="status" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    <span>Pay ₹{grandTotal} & Confirm</span>
                  </>
                )}
              </button>

              <div className="text-center text-muted small mt-3" style={{ fontSize: '0.72rem' }}>
                <Lock size={12} className="me-1 inline" />
                Protected by 256-Bit SSL Encryption • Instant E-Ticket Issuance
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
