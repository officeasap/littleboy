export default function handler(req, res) {
  const { airport } = req.query;

  if (!airport) {
    return res.status(400).json({ error: 'Missing airport IATA code' });
  }

  // ✈️ Mock route map for CGK (Soekarno-Hatta)
  const mockRoutes = {
    CGK: [
      { to: 'SIN', airline: 'Garuda Indonesia', flightNumber: 'GA834' },
      { to: 'KUL', airline: 'Lion Air', flightNumber: 'JT150' },
      { to: 'JFK', airline: 'Garuda Indonesia', flightNumber: 'GA100' },
      { to: 'SYD', airline: 'Qantas', flightNumber: 'QF42' }
    ],
    JFK: [
      { to: 'LAX', airline: 'Delta Airlines', flightNumber: 'DL435' },
      { to: 'CDG', airline: 'Air France', flightNumber: 'AF11' },
      { to: 'CGK', airline: 'Garuda Indonesia', flightNumber: 'GA101' }
    ]
  };

  const routes = mockRoutes[airport.toUpperCase()];

  if (!routes || routes.length === 0) {
    return res.status(404).json({ message: 'No routes found for this airport.' });
  }

  return res.status(200).json({
    airport: airport.toUpperCase(),
    routes
  });
}

