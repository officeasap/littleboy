export default function handler(req, res) {
  const { iata } = req.query;

  if (!iata) {
    return res.status(400).json({ error: 'Missing IATA code' });
  }

  const weather = {
    iata: iata.toUpperCase(),
    metar: `METAR ${iata} 121130Z 18004KT 9999 FEW015 13/07 Q1013 NOSIG`,
    taf: `TAF ${iata} 121100Z 1212/1318 18005KT CAVOK`,
  };

  res.status(200).json(weather);
}

