// utils/cache.js
import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.resolve('./.cache');
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR);

export function getCached(key) {
  const file = path.join(CACHE_DIR, `${key}.json`);
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const isFresh = Date.now() - data.timestamp < 10 * 60 * 1000; // 10 minutes
    if (isFresh) return data.payload;
  }
  return null;
}

export function setCached(key, payload) {
  const file = path.join(CACHE_DIR, `${key}.json`);
  fs.writeFileSync(
    file,
    JSON.stringify({ timestamp: Date.now(), payload }, null, 2)
  );
}

