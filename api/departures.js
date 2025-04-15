export default function handler(req, res) {
  const { airport } = req.query;

  if (!airport) {
    return res.status(400).json({ error: 'Missing airport IATA code' });
  }

  // 🛫 Mock departure data for CGK (Soekarno-Hatta)
  const mockDepartures = [
    {
      flightNumber: 'GA200',
      airline: 'Garuda Indonesia',
      from: 'CGK',
      to: 'SIN',
      departureTime: '2025-04-16T09:00:00Z',
      status: 'Scheduled',
      gate: 'A12',
      terminal: '3'
    },
    {
      flightNumber: 'JT305',
      airline: 'Lion Air',
      from: 'CGK',
      to: 'KUL',
      departureTime: '2025-04-16T11:30:00Z',
      status: 'Delayed',
      gate: 'B03',
      terminal: '1'
    },
    {
      flightNumber: 'QF42',
      airline: 'Qantas',
      from: 'CGK',
      to: 'SYD',
      departureTime: '2025-04-16T13:20:00Z',
      status: 'On Time',
      gate: 'C08',
      terminal: '2'
    }
  ];

  const departures = mockDepartures.filter(
    flight => flight.from === airport.toUpperCase()
  );

  if (departures.length === 0) {
    return res.status(404).json({ message: 'No departure flights found for this airport.' });
  }

  return res.status(200).json(departures);
}

