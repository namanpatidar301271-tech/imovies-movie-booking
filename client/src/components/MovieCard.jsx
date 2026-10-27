import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Ticket } from 'lucide-react';

const MovieCard = ({ movie }) => {
  return (
    <div className="district-glass-card h-100 d-flex flex-column overflow-hidden position-relative group">
      {/* Poster Image Container */}
      <div className="position-relative overflow-hidden" style={{ paddingTop: '142%' }}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
          style={{ transition: 'transform 0.4s ease' }}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(180deg, rgba(10,10,15,0.2) 0%, rgba(10,10,15,0) 40%, rgba(10,10,15,0.95) 100%)'
          }}
        />

        {/* District Vibe Badge */}
        {movie.districtVibe && (
          <div className="position-absolute top-0 start-0 m-3">
            <span className="badge-vibe shadow-sm">
              {movie.districtVibe}
            </span>
          </div>
        )}

        {/* Rating Pill */}
        <div className="position-absolute top-0 end-0 m-3">
          <div 
            className="d-flex align-items-center gap-1 px-2 py-1 rounded-pill"
            style={{
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 184, 0, 0.4)',
              fontSize: '0.78rem',
              fontWeight: '700',
              color: '#FFB800'
            }}
          >
            <Star size={13} fill="#FFB800" color="#FFB800" />
            <span>{movie.rating}</span>
            <span className="text-muted fw-normal" style={{ fontSize: '0.68rem' }}>({movie.votesCount})</span>
          </div>
        </div>

        {/* Bottom Format Tags inside poster */}
        <div className="position-absolute bottom-0 start-0 p-3 w-100">
          <div className="d-flex flex-wrap gap-1 mb-1">
            {movie.format?.slice(0, 3).map((fmt) => (
              <span key={fmt} className="badge-format">
                {fmt}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3 d-flex flex-column flex-grow-1">
        <div className="d-flex align-items-center justify-content-between text-muted small mb-1">
          <span className="badge bg-dark border border-secondary border-opacity-50 text-light px-2 py-1" style={{ fontSize: '0.7rem' }}>
            {movie.certificate}
          </span>
          <span className="d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
            <Clock size={13} /> {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
          </span>
        </div>

        <h5 className="text-white fw-bold my-2 text-truncate" title={movie.title}>
          {movie.title}
        </h5>

        <div className="text-muted small mb-3 text-truncate">
          {movie.genre?.join(' • ')}
        </div>

        <div className="mt-auto pt-2">
          <Link
            to={`/movie/${movie._id || movie.slug}`}
            className="btn btn-district w-100 d-flex align-items-center justify-content-center gap-2 py-2"
            style={{ fontSize: '0.88rem' }}
          >
            <Ticket size={16} />
            <span>Book Tickets</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
