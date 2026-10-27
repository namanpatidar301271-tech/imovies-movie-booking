const initialMovies = [
  {
    _id: 'mov-101',
    title: 'Dune: Part Two',
    slug: 'dune-part-two',
    tagline: 'Long live the fighters.',
    genre: ['Sci-Fi', 'Adventure', 'Action'],
    language: ['English', 'Hindi'],
    format: ['IMAX 3D', '4DX', '4K Dolby Atmos', '2D'],
    duration: 166,
    rating: 8.9,
    votesCount: '194.2K',
    releaseDate: '2026-03-01',
    certificate: 'UA 16+',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.',
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
      { name: 'Zendaya', role: 'Chani', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
      { name: 'Rebecca Ferguson', role: 'Lady Jessica', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' },
      { name: 'Austin Butler', role: 'Feyd-Rautha', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' }
    ],
    director: 'Denis Villeneuve',
    districtVibe: 'District Hype 🔥',
    isTrending: true,
    isFeatured: true,
    cities: ['Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune', 'Hyderabad']
  },
  {
    _id: 'mov-102',
    title: 'Deadpool & Wolverine',
    slug: 'deadpool-wolverine',
    tagline: 'Everyone deserves a happy ending.',
    genre: ['Action', 'Comedy', 'Sci-Fi'],
    language: ['English', 'Hindi'],
    format: ['IMAX 3D', '4DX', '3D', '2D'],
    duration: 127,
    rating: 8.7,
    votesCount: '240.8K',
    releaseDate: '2026-07-26',
    certificate: 'A',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary Deadpool behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
    cast: [
      { name: 'Ryan Reynolds', role: 'Wade Wilson / Deadpool', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
      { name: 'Hugh Jackman', role: 'Logan / Wolverine', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
      { name: 'Emma Corrin', role: 'Cassandra Nova', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' }
    ],
    director: 'Shawn Levy',
    districtVibe: 'Blockbuster Surge ⚡',
    isTrending: true,
    isFeatured: true,
    cities: ['Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune', 'Hyderabad']
  },
  {
    _id: 'mov-103',
    title: 'Interstellar: 70mm Experience',
    slug: 'interstellar-imax',
    tagline: 'Mankinds next step will be our greatest.',
    genre: ['Sci-Fi', 'Drama', 'Adventure'],
    language: ['English'],
    format: ['IMAX 70mm', 'Dolby Atmos', 'Laser 4K'],
    duration: 169,
    rating: 9.1,
    votesCount: '410.5K',
    releaseDate: '2026-10-15',
    certificate: 'UA 16+',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft along with a team of researchers to find a new planet for humans.',
    cast: [
      { name: 'Matthew McConaughey', role: 'Cooper', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80' },
      { name: 'Anne Hathaway', role: 'Brand', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
      { name: 'Jessica Chastain', role: 'Murph', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' }
    ],
    director: 'Christopher Nolan',
    districtVibe: 'Cult Masterpiece 🌌',
    isTrending: true,
    isFeatured: true,
    cities: ['Bengaluru', 'Mumbai', 'Delhi-NCR']
  },
  {
    _id: 'mov-104',
    title: 'Gladiator II',
    slug: 'gladiator-2',
    tagline: 'What we do in life echoes in eternity.',
    genre: ['Action', 'Drama', 'Epic'],
    language: ['English', 'Hindi'],
    format: ['4K Laser', 'Dolby Atmos', '2D'],
    duration: 152,
    rating: 8.4,
    votesCount: '86.1K',
    releaseDate: '2026-11-22',
    certificate: 'A',
    poster: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius must enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist.',
    cast: [
      { name: 'Paul Mescal', role: 'Lucius', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80' },
      { name: 'Pedro Pascal', role: 'Marcus Acacius', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
      { name: 'Denzel Washington', role: 'Macrinus', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' }
    ],
    director: 'Ridley Scott',
    districtVibe: 'Epic Arena ⚔️',
    isTrending: false,
    isFeatured: false,
    cities: ['Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune', 'Hyderabad']
  },
  {
    _id: 'mov-105',
    title: 'Kalki 2898 AD',
    slug: 'kalki-2898-ad',
    tagline: 'The future of prophecy begins.',
    genre: ['Sci-Fi', 'Mythology', 'Action'],
    language: ['Telugu', 'Hindi', 'Tamil', 'English'],
    format: ['IMAX 3D', '3D', '4DX', '2D'],
    duration: 181,
    rating: 8.5,
    votesCount: '312.4K',
    releaseDate: '2026-06-27',
    certificate: 'UA 16+',
    poster: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'Set in a post-apocalyptic world in the year 2898 AD, a modern avatar of Vishnu is believed to have descended to the earth to protect the world from evil forces.',
    cast: [
      { name: 'Prabhas', role: 'Bhairava', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
      { name: 'Amitabh Bachchan', role: 'Ashwatthama', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
      { name: 'Deepika Padukone', role: 'SUM-80', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
      { name: 'Kamal Haasan', role: 'Supreme Yaskin', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' }
    ],
    director: 'Nag Ashwin',
    districtVibe: 'Visual Spectacle 🪐',
    isTrending: true,
    isFeatured: false,
    cities: ['Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune', 'Hyderabad']
  },
  {
    _id: 'mov-106',
    title: 'Spider-Man: Beyond the Spider-Verse',
    slug: 'beyond-the-spider-verse',
    tagline: 'Every universe is connected.',
    genre: ['Animation', 'Action', 'Adventure'],
    language: ['English', 'Hindi'],
    format: ['IMAX 3D', 'Dolby Atmos', '2D'],
    duration: 140,
    rating: 8.8,
    votesCount: '154.9K',
    releaseDate: '2026-12-18',
    certificate: 'U',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'Miles Morales traverses the multiverse to save those he loves from destruction while confronting the destiny that awaits every spider hero across the dimensions.',
    cast: [
      { name: 'Shameik Moore', role: 'Miles Morales', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' },
      { name: 'Hailee Steinfeld', role: 'Gwen Stacy', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' },
      { name: 'Oscar Isaac', role: 'Miguel O Hara', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80' }
    ],
    director: 'Joaquim Dos Santos',
    districtVibe: 'Midnight Fever 🌙',
    isTrending: true,
    isFeatured: false,
    cities: ['Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune', 'Hyderabad']
  }
];

const initialCinemas = [
  {
    _id: 'cin-blr-01',
    name: 'District PVR INOX: Vega City',
    brand: 'District IMAX Experience',
    city: 'Bengaluru',
    location: 'Bannerghatta Main Rd, BTM Layout',
    distance: '1.8 km away',
    rating: 4.9,
    amenities: ['IMAX Laser', 'Dolby Atmos', 'Recliner Lounges', 'District Gourmet Cafe', 'Free Valet'],
    shows: [
      {
        showId: 'shw-101',
        movieId: 'mov-101',
        movieTitle: 'Dune: Part Two',
        time: '10:15 AM',
        date: 'Today, 28 Oct',
        format: 'IMAX 3D Laser',
        language: 'English',
        screenName: 'IMAX Laser 1',
        status: 'available',
        pricing: { standard: 260, prime: 390, recliner: 620 },
        bookedSeats: ['A3', 'A4', 'C6', 'C7', 'E5']
      },
      {
        showId: 'shw-102',
        movieId: 'mov-101',
        movieTitle: 'Dune: Part Two',
        time: '01:45 PM',
        date: 'Today, 28 Oct',
        format: 'IMAX 3D Laser',
        language: 'English',
        screenName: 'IMAX Laser 1',
        status: 'fast_filling',
        pricing: { standard: 280, prime: 420, recliner: 650 },
        bookedSeats: ['B1', 'B2', 'B3', 'D4', 'D5', 'D6', 'E7', 'E8', 'F3', 'F4']
      },
      {
        showId: 'shw-103',
        movieId: 'mov-101',
        movieTitle: 'Dune: Part Two',
        time: '05:30 PM',
        date: 'Today, 28 Oct',
        format: 'IMAX 3D Laser',
        language: 'English',
        screenName: 'IMAX Laser 1',
        status: 'almost_full',
        pricing: { standard: 320, prime: 460, recliner: 700 },
        bookedSeats: ['A1', 'A2', 'A5', 'B4', 'B5', 'B6', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3', 'E1', 'E2', 'E3', 'F1', 'F2']
      },
      {
        showId: 'shw-104',
        movieId: 'mov-101',
        movieTitle: 'Dune: Part Two',
        time: '09:15 PM',
        date: 'Today, 28 Oct',
        format: 'IMAX 3D Laser',
        language: 'English',
        screenName: 'IMAX Laser 1',
        status: 'fast_filling',
        pricing: { standard: 300, prime: 440, recliner: 680 },
        bookedSeats: ['C4', 'C5', 'E4', 'E5', 'F5', 'F6']
      },
      {
        showId: 'shw-105',
        movieId: 'mov-102',
        movieTitle: 'Deadpool & Wolverine',
        time: '11:00 AM',
        date: 'Today, 28 Oct',
        format: '4K Dolby Atmos',
        language: 'English',
        screenName: 'Audi 3 Luxe',
        status: 'available',
        pricing: { standard: 220, prime: 340, recliner: 520 },
        bookedSeats: ['B4', 'B5', 'C3']
      },
      {
        showId: 'shw-106',
        movieId: 'mov-102',
        movieTitle: 'Deadpool & Wolverine',
        time: '04:00 PM',
        date: 'Today, 28 Oct',
        format: '4K Dolby Atmos',
        language: 'English',
        screenName: 'Audi 3 Luxe',
        status: 'fast_filling',
        pricing: { standard: 240, prime: 360, recliner: 550 },
        bookedSeats: ['A3', 'A4', 'D4', 'D5', 'F1', 'F2']
      },
      {
        showId: 'shw-107',
        movieId: 'mov-103',
        movieTitle: 'Interstellar: 70mm Experience',
        time: '07:30 PM',
        date: 'Today, 28 Oct',
        format: 'IMAX 70mm Special',
        language: 'English',
        screenName: 'IMAX Laser 1',
        status: 'almost_full',
        pricing: { standard: 350, prime: 500, recliner: 750 },
        bookedSeats: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3', 'D4', 'E1', 'E2', 'E3', 'F1', 'F2']
      }
    ]
  },
  {
    _id: 'cin-blr-02',
    name: 'Cinepolis VIP: Nexus Koramangala',
    brand: 'Cinepolis VIP Club',
    city: 'Bengaluru',
    location: 'Hosur Road, Koramangala',
    distance: '3.4 km away',
    rating: 4.8,
    amenities: ['Full Recliner Service', 'At-Seat Dining', 'Barista Coffee Bar', 'Dolby 7.1'],
    shows: [
      {
        showId: 'shw-201',
        movieId: 'mov-101',
        movieTitle: 'Dune: Part Two',
        time: '12:30 PM',
        date: 'Today, 28 Oct',
        format: 'VIP Recliner Atmos',
        language: 'English',
        screenName: 'VIP Audi 1',
        status: 'available',
        pricing: { standard: 300, prime: 450, recliner: 650 },
        bookedSeats: ['B2', 'B3', 'C4']
      },
      {
        showId: 'shw-202',
        movieId: 'mov-102',
        movieTitle: 'Deadpool & Wolverine',
        time: '03:45 PM',
        date: 'Today, 28 Oct',
        format: 'VIP Recliner Atmos',
        language: 'English',
        screenName: 'VIP Audi 2',
        status: 'fast_filling',
        pricing: { standard: 300, prime: 450, recliner: 650 },
        bookedSeats: ['A1', 'A2', 'D5', 'D6', 'E4']
      },
      {
        showId: 'shw-203',
        movieId: 'mov-105',
        movieTitle: 'Kalki 2898 AD',
        time: '08:00 PM',
        date: 'Today, 28 Oct',
        format: 'VIP 3D Laser',
        language: 'Telugu',
        screenName: 'VIP Audi 1',
        status: 'available',
        pricing: { standard: 280, prime: 420, recliner: 600 },
        bookedSeats: ['C1', 'C2', 'F7', 'F8']
      }
    ]
  },
  {
    _id: 'cin-mum-01',
    name: 'District Maison PVR: Jio World Drive',
    brand: 'District Ultra Luxury',
    city: 'Mumbai',
    location: 'BKC, Bandra Kurla Complex',
    distance: '2.1 km away',
    rating: 4.95,
    amenities: ['Maison Lounge', 'Chef Curated Menu', 'Laser Projection', 'Private Butler'],
    shows: [
      {
        showId: 'shw-301',
        movieId: 'mov-101',
        movieTitle: 'Dune: Part Two',
        time: '11:15 AM',
        date: 'Today, 28 Oct',
        format: 'Laser Ultra 4K',
        language: 'English',
        screenName: 'Maison Luxe 1',
        status: 'available',
        pricing: { standard: 350, prime: 550, recliner: 850 },
        bookedSeats: ['B1', 'B2', 'E3']
      },
      {
        showId: 'shw-302',
        movieId: 'mov-103',
        movieTitle: 'Interstellar: 70mm Experience',
        time: '06:00 PM',
        date: 'Today, 28 Oct',
        format: 'Laser Ultra 4K',
        language: 'English',
        screenName: 'Maison Luxe 1',
        status: 'almost_full',
        pricing: { standard: 400, prime: 600, recliner: 950 },
        bookedSeats: ['A1', 'A2', 'B3', 'B4', 'C1', 'C2', 'D3', 'D4', 'E1', 'E2', 'F3', 'F4']
      }
    ]
  },
  {
    _id: 'cin-del-01',
    name: 'District PVR Directors Cut: Ambience Mall',
    brand: 'Directors Cut Signature',
    city: 'Delhi-NCR',
    location: 'Vasant Kunj, New Delhi',
    distance: '3.0 km away',
    rating: 4.9,
    amenities: ['Fine Dining Inside', 'Automated Pushback Recliners', 'Dolby Atmos', 'Curated Bar'],
    shows: [
      {
        showId: 'shw-401',
        movieId: 'mov-101',
        movieTitle: 'Dune: Part Two',
        time: '02:00 PM',
        date: 'Today, 28 Oct',
        format: 'DC Signature Atmos',
        language: 'English',
        screenName: 'DC Audi 2',
        status: 'available',
        pricing: { standard: 350, prime: 500, recliner: 800 },
        bookedSeats: ['A3', 'A4', 'D2']
      },
      {
        showId: 'shw-402',
        movieId: 'mov-106',
        movieTitle: 'Spider-Man: Beyond the Spider-Verse',
        time: '07:15 PM',
        date: 'Today, 28 Oct',
        format: 'DC Signature Atmos',
        language: 'English',
        screenName: 'DC Audi 1',
        status: 'fast_filling',
        pricing: { standard: 320, prime: 480, recliner: 750 },
        bookedSeats: ['B1', 'B2', 'B3', 'C5', 'C6']
      }
    ]
  }
];

const initialFoodAddons = [
  { id: 'f-1', name: 'Caramel Popcorn (Jumbo)', price: 290, desc: 'Freshly popped with rich salted caramel glaze', icon: '🍿' },
  { id: 'f-2', name: 'District Nachos with Warm Cheese & Salsa', price: 240, desc: 'Crispy corn tortilla crisps with jalapeno dips', icon: '🌮' },
  { id: 'f-3', name: 'Chilled Pepsi Zero (650ml)', price: 160, desc: 'Refreshing fountain drink served chilled', icon: '🥤' },
  { id: 'f-4', name: 'District VIP Combo (Popcorn + 2 Drinks + Nachos)', price: 580, desc: 'Best value party bundle for movie lovers', icon: '✨' }
];

module.exports = {
  initialMovies,
  initialCinemas,
  initialFoodAddons
};
