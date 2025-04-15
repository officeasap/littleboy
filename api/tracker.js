export default function handler(req, res) {
  const { flightNumber } = req.query;

  if (!flightNumber) {
    return res.status(400).json({ error: 'Missing flight number' });
  }

  // 🛠 Sample mock data for flight status tracking (replace later with real data)
  const mockTrackData = [
    {
      flightNumber: 'GA100',
      airline: 'Garuda Indonesia',
      status: 'On Time',
      departure: '2025-04-16T08:00:00Z',
      arrival: '2025-04-16T16:00:00Z',
      from: 'CGK',
      to: 'JFK',
      currentLocation: 'Over the Pacific Ocean',
      lastChecked: '2025-04-16T10:30:00Z',
      delay: '0 minutes'
    },
    {
      flightNumber: 'DL789',
      airline: 'Delta Airlines',
      status: 'Delayed',
      departure: '2025-04-16T12:30:00Z',
      arrival: '2025-04-16T20:30:00Z',
      from: 'CGK',
      to: 'JFK',
      currentLocation: 'Over the Atlantic Ocean',
      lastChecked: '2025-04-16T14:00:00Z',
      delay: '45 minutes'
    }
  ];

  const flightStatus = mockTrackData.find(flight => flight.flightNumber === flightNumber.toUpperCase());

  if (!flightStatus) {
    return res.status(404).json({ message: 'Flight not found.' });
  }

  return res.status(200).json(flightStatus);
}

