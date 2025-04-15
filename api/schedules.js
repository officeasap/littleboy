export default function handler(req, res) {
  const { airport } = req.query;

  if (!airport) {
    return res.status(400).json({ error: 'Missing airport IATA code' });
  }

  // 🛫 Mock flight schedule data for CGK (Soekarno-Hatta)
  const mockSchedules = [
    {
      flightNumber: 'GA200',
      airline: 'Garuda Indonesia',
      type: 'departure',
      airport: 'CGK',
      to: 'SIN',
      departureTime: '2025-04-16T09:00:00Z',
      status: 'Scheduled',
      gate: 'A12'
    },
    {
      flightNumber: 'JT305',
      airline: 'Lion Air',
      type: 'departure',
      airport: 'CGK',
      to: 'KUL',
      departureTime: '2025-04-16T11:30:00Z',
      status: 'Delayed',
      gate: 'B03'
    },
    {
      flightNumber: 'SQ951',
      airline: 'Singapore Airlines',
      type: 'arrival',
      airport: 'CGK',
      from: 'SIN',
      arrivalTime: '2025-04-16T08:45:00Z',
      status: 'Landed',
      gate: 'C05'
    },
    {
      flightNumber: 'MH726',
      airline: 'Malaysia Airlines',
      type: 'arrival',
      airport: 'CGK',
      from: 'KUL',
      arrivalTime: '2025-04-16T10:15:00Z',
      status: 'On Time',
      gate: 'D07'
    }
  ];

  const filtered = mockSchedules.filter(
    f => f.airport === airport.toUpperCase()
  );

  if (filtered.length === 0) {
    return res.status(404).json({ message: 'No scheduled flights found for this airport.' });
  }

  return res.status(200).json(filtered);
}

