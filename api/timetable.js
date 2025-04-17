// api/timetable.js

import { getCached, setCached } from '../utils/cache.js';
import fetch from 'node-fetch';

const API_URL = 'https://api.aviationstack.com/v1/timetable';
const ACCESS_KEY = 'c1e20070cd11b45c048c0f3ac887377e';

export default async function handler(req, res) {
  const { iataCode, type } = req.query;

  if (!iataCode || !type) {
    return res.status(400).json({ error: 'Missing required parameters: iataCode and type' });
  }

  const cacheKey = `timetable_${iataCode}_${type}`;

  const cached = getCached(cacheKey);
  if (cached) {
    return res.status(200).json(cached);
  }

  try {
    const response = await fetch(`${API_URL}?access_key=${ACCESS_KEY}&iataCode=${iataCode}&type=${type}`);
    const data = await response.json();

    if (data && !data.error) {
      setCached(cacheKey, data);
      res.status(200).json(data);
    } else {
      res.status(502).json({ error: 'Failed to fetch from AviationStack' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}

