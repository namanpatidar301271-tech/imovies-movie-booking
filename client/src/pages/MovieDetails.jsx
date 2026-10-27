import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMovieByIdApi, getMovieCinemasApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { 
  Star, 
  Clock, 
  Calendar, 
  MapPin, 
  Sparkles, 
  ChevronLeft, 
  ShieldCheck, 
  Info,
  Flame,
  ArrowRight
} from 'lucide-react';

const DATES = [
  { label: 'Today', day: '28 Oct', full: 'Today, 28 Oct' },
  { label: 'Tomorrow', day: '29 Oct', full: 'Tomorrow, 29 Oct' },
  { label: 'Thursday', day: '30 Oct', full: 'Thu, 30 Oct' },
  { label: 'Friday', day: '31 Oct', full: 'Fri, 31 Oct' }
];

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedCity } = useAuth();

  const [movie, setMovie] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(DATES[0].full);
  const [selectedFormat, setSelectedFormat] = useState('All');

  useEffect(() => {
    loadMovieDetails();
  }, [id, selectedCity]);

  const loadMovieDetails = async () => {
    setLoading(true);
    try {
      const [movieRes, cinemasRes] = await Promise.all([
        getMovieByIdApi(id),
        getMovieCinemasApi(id, selectedCity)
      ]);

      if (movieRes.success) {
        setMovie(movieRes.data);
      }
      if (cinemasRes.success) {
        setCinemas(cinemasRes.data);
      }
    } catch (err) {
      console.error('Failed to load movie details', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading movie...</span>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container text-center py-5">
        <h3 className="text-white">Movie Not Found</h3>
        <Link to="/" className="btn btn-district mt-3">
          Back to Movies
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'fast_filling':
        return <span className="text-warning small" style={{ fontSize: '0.68rem' }}>Fast Filling</span>;
      case 'almost_full':
        return <span className="text-danger small" style={{ fontSize: '0.68rem' }}>Almost Full</span>;
      default:
        return <span className="text-success small" style={{ fontSize: '0.68rem' }}>Available</span>;
    }
  };

  return (
    <div className="movie-details-page pb-5">
      {/* Movie Banner Header */}
      <div className="position-relative" style={{ minHeight: '380px' }}>
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${movie.backdrop})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            filter: 'brightness(0.3)'
          }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(180deg, rgba(10,10,15,0.4) 0%, #0a0a0f 100%)'
          }}
        />

        <div className="container position-relative py-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-district-outline d-inline-flex align-items-center gap-1 mb-4 py-1 px-3 text-muted"
            style={{ fontSize: '0.85rem' }}
          >
            <ChevronLeft size={16} /> Back
          </button>

          <div className="row g-4 align-items-end">
            {/* Poster Card */}
            <div className="col-md-3 col-sm-4 text-center text-sm-start">
              <img
                src={movie.poster}
                alt={movie.title}
                className="img-fluid rounded-4 shadow-lg"
                style={{
                  maxHeight: '340px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
                }}
              />
            </div>

            {/* Info */}
            <div className="col-md-9 col-sm-8 text-white">
              <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                <span className="badge-vibe">{movie.districtVibe}</span>
                <span className="badge bg-secondary px-2 py-1">{movie.certificate}</span>
                <span className="badge bg-dark border border-secondary text-info px-2 py-1">
                  {movie.language?.join(', ')}
                </span>
              </div>

              <h1 className="display-5 fw-bold brand-font mb-2">
                {movie.title}
              </h1>

              <div className="d-flex flex-wrap align-items-center gap-3 text-muted small mb-3">
                <div className="d-flex align-items-center gap-1 text-warning fw-bold">
                  <Star size={16} fill="#FFB800" color="#FFB800" />
                  <span className="text-white fs-6">{movie.rating}</span>
                  <span className="text-muted small fw-normal">({movie.votesCount} votes)</span>
                </div>
                <span>•</span>
                <div className="d-flex align-items-center gap-1">
                  <Clock size={15} />
                  <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
                </div>
                <span>•</span>
                <div>{movie.genre?.join(', ')}</div>
                <span>•</span>
                <div>Release: {movie.releaseDate}</div>
              </div>

              <p className="text-light text-opacity-75 mb-3" style={{ maxWidth: '680px', lineHeight: '1.6', fontSize: '0.92rem' }}>
                {movie.synopsis}
              </p>

              <div className="small text-muted">
                Director: <span className="text-white fw-semibold">{movie.director}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mt-4">
        {/* Date Selector Tabs */}
        <div className="district-glass p-2 rounded-4 mb-4 d-flex align-items-center gap-2 overflow-x-auto">
          {DATES.map((d) => (
            <button
              key={d.full}
              className={`btn px-4 py-2 rounded-3 text-start d-flex flex-column ${
                selectedDate === d.full ? 'btn-district' : 'btn-district-outline text-muted'
              }`}
              onClick={() => setSelectedDate(d.full)}
              style={{ minWidth: '110px' }}
            >
              <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>{d.label}</span>
              <span className="fw-bold" style={{ fontSize: '0.95rem' }}>{d.day}</span>
            </button>
          ))}
        </div>

        {/* Cinemas & Showtimes Listing */}
        <div className="mb-5">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4 className="text-white fw-bold brand-font mb-0">
              Theatres & Screenings in {selectedCity}
            </h4>
            <div className="text-muted small">
              {cinemas.length} Cinemas Active
            </div>
          </div>

          {cinemas.length > 0 ? (
            <div className="d-flex flex-column gap-3">
              {cinemas.map((cinema) => (
                <div key={cinema._id} className="district-glass-card p-4 rounded-4">
                  <div className="row g-3">
                    {/* Cinema details */}
                    <div className="col-lg-4 col-md-5">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50" style={{ fontSize: '0.7rem' }}>
                          {cinema.brand}
                        </span>
                        <span className="text-muted small d-flex align-items-center gap-1">
                          <MapPin size={12} /> {cinema.distance}
                        </span>
                      </div>
                      <h5 className="text-white fw-bold mb-1">
                        {cinema.name}
                      </h5>
                      <p className="text-muted small mb-2">
                        {cinema.location}
                      </p>

                      <div className="d-flex flex-wrap gap-1">
                        {cinema.amenities?.map((amenity) => (
                          <span
                            key={amenity}
                            className="badge bg-secondary bg-opacity-25 text-light text-opacity-75"
                            style={{ fontSize: '0.68rem', fontWeight: '500' }}
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Showtime pills */}
                    <div className="col-lg-8 col-md-7">
                      <div className="d-flex flex-wrap gap-3 align-items-center">
                        {cinema.shows.map((show) => (
                          <button
                            key={show.showId}
                            onClick={() => navigate(`/seat-selection/${show.showId}`)}
                            className="btn btn-district-outline p-2 text-center rounded-3 position-relative"
                            style={{ minWidth: '125px', borderColor: '#343452' }}
                          >
                            <div className="fw-bold text-white fs-6">
                              {show.time}
                            </div>
                            <div className="text-info fw-semibold" style={{ fontSize: '0.72rem' }}>
                              {show.format}
                            </div>
                            <div className="mt-1">
                              {getStatusBadge(show.status)}
                            </div>
                            <div className="text-muted" style={{ fontSize: '0.68rem', marginTop: '2px' }}>
                              From ₹{show.pricing.standard}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="district-glass p-5 rounded-4 text-center">
              <h5 className="text-white">No Screenings Available</h5>
              <p className="text-muted small">
                There are no current screenings in {selectedCity} for this movie. Try selecting another city like Bengaluru or Mumbai.
              </p>
            </div>
          )}
        </div>

        {/* Cast & Crew Section */}
        {movie.cast && movie.cast.length > 0 && (
          <div className="district-glass p-4 rounded-4 mb-4">
            <h5 className="text-white fw-bold mb-3 brand-font">
              Top Cast & Characters
            </h5>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
              {movie.cast.map((actor, idx) => (
                <div key={idx} className="col">
                  <div className="d-flex align-items-center gap-3 p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <img
                      src={actor.photo}
                      alt={actor.name}
                      className="rounded-circle object-fit-cover"
                      style={{ width: '46px', height: '46px' }}
                    />
                    <div>
                      <div className="text-white fw-semibold small">{actor.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>{actor.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
