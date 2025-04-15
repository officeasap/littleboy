export default function handler(req, res) {
  const { airport } = req.query;

  if (!airport) {
    return res.status(400).json({ error: 'Missing airport IATA code' });
  }

  // ✈️ Mock arrival data for CGK (Soekarno-Hatta)
  const mockArrivals = [
    {
      flightNumber: 'SQ951',
      airline: 'Singapore Airlines',
      from: 'SIN',
      to: 'CGK',
      arrivalTime: '2025-04-16T08:45:00Z',
      status: 'Landed',
      gate: 'C05',
      terminal: '2'
    },
    {
      flightNumber: 'MH726',
      airline: 'Malaysia Airlines',
      from: 'KUL',
      to: 'CGK',
      arrivalTime: '2025-04-16T10:15:00Z',
      status: 'On Time',
      gate: 'D07',
      terminal: '3'
    },
    {
      flightNumber: 'GA877',
      airline: 'Garuda Indonesia',
      from: 'NRT',
      to: 'CGK',
      arrivalTime: '2025-04-16T13:00:00Z',
      status: 'Delayed',
      gate: 'A01',
      terminal: '3'
    }
  ];

  const arrivals = mockArrivals.filter(
    flight => flight.to === airport.toUpperCase()
  );

  if (arrivals.length === 0) {
    return res.status(404).json({ message: 'No arrival flights found for this airport.' });
  }

  return res.status(200).json(arrivals);
}

