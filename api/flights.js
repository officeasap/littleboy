export default function handler(req, res) {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'Missing origin (from) or destination (to) IATA code' });
  }

  // Sample mock data (replace later with real data or scraped routes)
  const mockFlights = [
    {
      flightNumber: 'GA100', // Updated flight number to fit Garuda Indonesia
      airline: 'Garuda Indonesia', // Changed to Indonesian airline
      from: 'CGK',
      to: 'JFK',
      departure: '2025-04-16T08:00:00Z',
      arrival: '2025-04-16T16:00:00Z',
      duration: '16h 00m',
      aircraft: 'Boeing 787-8',
      status: 'Scheduled'
    },
    {
      flightNumber: 'DL789',
      airline: 'Delta Airlines',
      from: 'CGK',
      to: 'JFK',
      departure: '2025-04-16T12:30:00Z',
      arrival: '2025-04-16T20:30:00Z',
      duration: '16h 00m',
      aircraft: 'Airbus A350',
      status: 'Scheduled'
    }
  ];

  const results = mockFlights.filter(
    flight => flight.from === from.toUpperCase() && flight.to === to.toUpperCase()
  );

  if (results.length === 0) {
    return res.status(404).json({ message: 'No flights found for this route.' });
  }

  return res.status(200).json(results);
}
