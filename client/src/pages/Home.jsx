import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getMoviesApi, getFeaturedMoviesApi } from '../api';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import { 
  Sparkles, 
  Flame, 
  Film, 
  Search, 
  Filter, 
  Compass, 
  ChevronRight,
  Play
} from 'lucide-react';

const GENRES = ['All', 'Action', 'Sci-Fi', 'Adventure', 'Drama', 'Comedy', 'Animation'];
const VIBES = ['All', 'District Hype 🔥', 'Blockbuster Surge ⚡', 'Cult Masterpiece 🌌', 'Visual Spectacle 🪐'];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedVibe, setSelectedVibe] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { selectedCity } = useAuth();

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    loadData();
  }, [selectedCity, selectedGenre, selectedVibe, searchQuery]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [moviesRes, featuredRes] = await Promise.all([
        getMoviesApi({
          city: selectedCity,
          genre: selectedGenre,
          vibe: selectedVibe,
          search: searchQuery
        }),
        getFeaturedMoviesApi()
      ]);

      if (moviesRes.success) {
        setMovies(moviesRes.data);
      }
      if (featuredRes.success) {
        setFeaturedMovies(featuredRes.data);
      }
    } catch (err) {
      console.error('Failed to load movies', err);
    } finally {
      setLoading(false);
    }
  };

  const heroMovie = featuredMovies[0] || movies[0];

  return (
    <div className="home-page pb-5">
      {/* District Hero Spotlight */}
      {heroMovie && !searchQuery && (
        <div className="position-relative overflow-hidden mb-5" style={{ minHeight: '480px' }}>
          {/* Background Backdrop with Vignette */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              backgroundImage: `url(${heroMovie.backdrop})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%',
              filter: 'brightness(0.35)',
              transform: 'scale(1.03)',
              transition: 'transform 8s ease'
            }}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background: 'linear-gradient(180deg, rgba(10,10,15,0.4) 0%, rgba(10,10,15,0.85) 70%, #0a0a0f 100%)'
            }}
          />

          <div className="container position-relative py-5 mt-3">
            <div className="row align-items-center">
              <div className="col-lg-7 text-white">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="badge-vibe d-inline-flex align-items-center gap-1">
                    <Flame size={14} /> District Spotlight
                  </span>
                  <span className="badge bg-white bg-opacity-10 text-white border border-white border-opacity-20 px-2 py-1">
                    {heroMovie.certificate}
                  </span>
                  <span className="text-muted small">
                    📍 Now Showing in {selectedCity}
                  </span>
                </div>

                <h1 className="display-4 fw-extrabold brand-font mb-2" style={{ letterSpacing: '-0.03em' }}>
                  {heroMovie.title}
                </h1>

                <p className="text-secondary fs-6 mb-3 fst-italic">
                  "{heroMovie.tagline}"
                </p>

                <p className="text-light text-opacity-75 mb-4" style={{ maxWidth: '580px', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {heroMovie.synopsis}
                </p>

                <div className="d-flex flex-wrap align-items-center gap-3">
                  <Link
                    to={`/movie/${heroMovie._id || heroMovie.slug}`}
                    className="btn btn-district px-4 py-3 d-flex align-items-center gap-2"
                  >
                    <span>Reserve Seats</span>
                    <ChevronRight size={18} />
                  </Link>

                  <a
                    href="https://www.youtube.com/results?search_query=dune+part+two+trailer"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-district-outline px-4 py-3 d-flex align-items-center gap-2"
                  >
                    <Play size={16} fill="white" />
                    <span>Watch Trailer</span>
                  </a>
                </div>
              </div>

              <div className="col-lg-5 d-none d-lg-flex justify-content-end">
                <div 
                  className="rounded-4 overflow-hidden shadow-2xl p-2"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    maxWidth: '280px',
                    transform: 'rotate(2deg)'
                  }}
                >
                  <img
                    src={heroMovie.poster}
                    alt={heroMovie.title}
                    className="img-fluid rounded-3"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Catalog Section */}
      <div className="container">
        {/* District Filter Bar */}
        <div className="district-glass p-3 rounded-4 mb-4">
          <div className="row g-3 align-items-center">
            {/* Genre Pills */}
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-2 overflow-x-auto pb-1 pb-lg-0">
                <span className="text-muted small fw-semibold me-2 d-none d-sm-inline">
                  <Filter size={14} className="me-1" /> Genres:
                </span>
                {GENRES.map((g) => (
                  <button
                    key={g}
                    className={`btn btn-sm text-nowrap rounded-pill px-3 py-1 ${
                      selectedGenre === g
                        ? 'btn-district'
                        : 'btn-district-outline text-muted'
                    }`}
                    style={{ fontSize: '0.8rem' }}
                    onClick={() => setSelectedGenre(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Vibe Selector */}
            <div className="col-lg-4 text-lg-end">
              <div className="d-flex align-items-center justify-content-lg-end gap-2">
                <span className="text-muted small fw-semibold d-none d-md-inline">Vibe:</span>
                <select
                  className="form-select form-select-sm bg-dark text-white border-secondary border-opacity-50"
                  style={{ maxWidth: '200px', fontSize: '0.82rem', borderRadius: '10px' }}
                  value={selectedVibe}
                  onChange={(e) => setSelectedVibe(e.target.value)}
                >
                  {VIBES.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h3 className="brand-font fw-bold text-white mb-1 d-flex align-items-center gap-2">
              <Sparkles size={22} color="#00F2FE" />
              {searchQuery ? `Search Results for "${searchQuery}"` : `Now Showing in ${selectedCity}`}
            </h3>
            <p className="text-muted small mb-0">
              Curated screen experiences, IMAX 3D, and luxury recliners
            </p>
          </div>
          <span className="badge bg-dark border border-secondary text-info px-3 py-2 rounded-pill">
            {movies.length} Experiences Available
          </span>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading District experiences...</span>
            </div>
            <div className="text-muted small mt-2">Loading showtimes...</div>
          </div>
        ) : movies.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {movies.map((movie) => (
              <div className="col" key={movie._id || movie.slug}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="district-glass p-5 rounded-4 text-center my-4">
            <Film size={48} className="text-muted mb-3" />
            <h4 className="text-white fw-bold">No Movies Matched Your Filter</h4>
            <p className="text-muted small mb-3">
              Try switching your city, genre, or clearing the search query to explore more screenings.
            </p>
            <button
              className="btn btn-district"
              onClick={() => {
                setSelectedGenre('All');
                setSelectedVibe('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
