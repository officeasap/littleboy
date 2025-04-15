import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { iata } = req.query;

  if (!iata) {
    return res.status(400).json({ error: 'Missing IATA code' });
  }

  // Ensure the data file is accessible at the correct path
  const filePath = path.join(process.cwd(), 'data', 'airports.dat'); // This assumes `data/airports.dat` is in your repo

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n');

    for (let line of lines) {
      const fields = line.split(',');

      const iataCode = fields[4]?.replace(/"/g, '');

      if (iataCode === iata.toUpperCase()) {
        const airport = {
          id: fields[0]?.replace(/"/g, ''),
          name: fields[1]?.replace(/"/g, ''),
          city: fields[2]?.replace(/"/g, ''),
          country: fields[3]?.replace(/"/g, ''),
          iata: iataCode,
          icao: fields[5]?.replace(/"/g, ''),
          lat: parseFloat(fields[6]),
          lon: parseFloat(fields[7]),
          alt: parseInt(fields[8]),
          timezone: fields[9],
        };

        return res.status(200).json(airport);
      }
    }

    return res.status(404).json({ error: 'Airport not found' });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', detail: error.message });
  }
}


