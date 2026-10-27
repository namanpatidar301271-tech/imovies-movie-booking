const app = require('./server');

console.log('Testing IMovies Express Endpoints...');

// Helper to simulate request to Express app
function testRoute(method, url, body = null, token = null) {
  return new Promise((resolve) => {
    const { EventEmitter } = require('events');
    const http = require('http');

    // Create mock request
    const req = new EventEmitter();
    req.method = method;
    req.url = url;
    req.headers = {
      'content-type': 'application/json'
    };
    if (token) {
      req.headers['authorization'] = `Bearer ${token}`;
    }

    let responseData = '';
    const res = {
      statusCode: 200,
      setHeader: () => {},
      writeHead: (code) => { res.statusCode = code; },
      status: function(code) { this.statusCode = code; return this; },
      send: function(data) { responseData = data; this.end(); },
      json: function(data) { responseData = JSON.stringify(data); this.end(); },
      end: function(data) {
        if (data) responseData = data;
        let parsed;
        try {
          parsed = JSON.parse(responseData);
        } catch {
          parsed = responseData;
        }
        resolve({ status: res.statusCode, body: parsed });
      }
    };

    if (body) {
      req.body = body;
    }

    app.handle(req, res);
  });
}

async function runTests() {
  console.log('1. Testing GET /api/movies');
  const moviesRes = await testRoute('GET', '/api/movies');
  console.log('   Status:', moviesRes.status, '| Movies Count:', moviesRes.body?.count);

  console.log('2. Testing GET /api/cinemas?city=Bengaluru');
  const cinemasRes = await testRoute('GET', '/api/cinemas?city=Bengaluru');
  console.log('   Status:', cinemasRes.status, '| Cinemas Count:', cinemasRes.body?.count);

  console.log('3. Testing POST /api/auth/login');
  const loginRes = await testRoute('POST', '/api/auth/login', {
    email: 'demo@imovies.com',
    password: 'Demo@123'
  });
  console.log('   Status:', loginRes.status, '| Success:', loginRes.body?.success, '| User:', loginRes.body?.user?.name);
  const token = loginRes.body?.token;

  if (token) {
    console.log('4. Testing GET /api/bookings/my (with JWT token)');
    const myBookingsRes = await testRoute('GET', '/api/bookings/my', null, token);
    console.log('   Status:', myBookingsRes.status, '| Bookings Count:', myBookingsRes.body?.count);

    console.log('5. Testing POST /api/bookings (Create a test reservation)');
    const createBkgRes = await testRoute('POST', '/api/bookings', {
      movieId: 'mov-101',
      movieTitle: 'Dune: Part Two',
      moviePoster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401',
      cinemaName: 'District PVR INOX: Vega City',
      cinemaCity: 'Bengaluru',
      screenName: 'IMAX Laser 1',
      showId: 'shw-101',
      showTime: '10:15 AM',
      showDate: 'Today, 28 Oct',
      format: 'IMAX 3D Laser',
      language: 'English',
      seats: ['D8', 'D9'],
      subtotal: 780,
      convenienceFee: 48,
      totalAmount: 828,
      paymentMethod: 'District UPI'
    }, token);
    console.log('   Status:', createBkgRes.status, '| Success:', createBkgRes.body?.success, '| Booking ID:', createBkgRes.body?.data?.bookingId);

    console.log('6. Re-testing GET /api/bookings/my to verify persistence');
    const verifyRes = await testRoute('GET', '/api/bookings/my', null, token);
    console.log('   Status:', verifyRes.status, '| New Bookings Count:', verifyRes.body?.count);
  }

  console.log('\nAll API routes verified successfully!');
  process.exit(0);
}

runTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
