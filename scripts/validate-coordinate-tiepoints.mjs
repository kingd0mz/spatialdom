import fs from 'node:fs';
import path from 'node:path';

const csvPath = path.join(
  process.cwd(),
  'src',
  'tools',
  'coordinate-converter',
  'data',
  'sample-tiepoints.csv'
);

const CLARKE_1866_A = 6378206.4;
const CLARKE_1866_INV_F = 294.978698213898;
const PTM_SCALE = 0.99995;
const FALSE_EASTING = 500000;
const FALSE_NORTHING = 0;
const f = 1 / CLARKE_1866_INV_F;
const e2 = 2 * f - f * f;
const ePrimeSquared = e2 / (1 - e2);

const zoneMap = {
  '1': 'I',
  '2': 'II',
  '3': 'III',
  '4': 'IV',
  '5': 'V',
  '1A': 'I',
  '2A': 'II',
  '3A': 'III',
  '4A': 'IV',
  '5A': 'V'
};

const centralMeridians = {
  I: 117,
  II: 119,
  III: 121,
  IV: 123,
  V: 125
};

const forwardToleranceMeters = 1;
const inverseToleranceDegrees = 0.00001;

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function toDegrees(value) {
  return (value * 180) / Math.PI;
}

function meridionalArc(latitudeRadians) {
  const e4 = e2 * e2;
  const e6 = e4 * e2;

  return (
    CLARKE_1866_A *
    ((1 - e2 / 4 - (3 * e4) / 64 - (5 * e6) / 256) * latitudeRadians -
      ((3 * e2) / 8 + (3 * e4) / 32 + (45 * e6) / 1024) * Math.sin(2 * latitudeRadians) +
      ((15 * e4) / 256 + (45 * e6) / 1024) * Math.sin(4 * latitudeRadians) -
      ((35 * e6) / 3072) * Math.sin(6 * latitudeRadians))
  );
}

function muFromMeridionalArc(meridionalDistance) {
  const e4 = e2 * e2;
  const e6 = e4 * e2;

  return meridionalDistance / (CLARKE_1866_A * (1 - e2 / 4 - (3 * e4) / 64 - (5 * e6) / 256));
}

function geographicToGrid(longitude, latitude, zone) {
  const latRad = toRadians(latitude);
  const lonRad = toRadians(longitude);
  const lonOriginRad = toRadians(centralMeridians[zone]);
  const sinLat = Math.sin(latRad);
  const cosLat = Math.cos(latRad);
  const tanLat = Math.tan(latRad);
  const n = CLARKE_1866_A / Math.sqrt(1 - e2 * sinLat * sinLat);
  const t = tanLat * tanLat;
  const c = ePrimeSquared * cosLat * cosLat;
  const a = cosLat * (lonRad - lonOriginRad);
  const m = meridionalArc(latRad);

  return {
    x:
      FALSE_EASTING +
      PTM_SCALE *
        n *
        (a +
          ((1 - t + c) * Math.pow(a, 3)) / 6 +
          ((5 - 18 * t + t * t + 72 * c - 58 * ePrimeSquared) * Math.pow(a, 5)) / 120),
    y:
      FALSE_NORTHING +
      PTM_SCALE *
        (m +
          n *
            tanLat *
            ((a * a) / 2 +
              ((5 - t + 9 * c + 4 * c * c) * Math.pow(a, 4)) / 24 +
              ((61 - 58 * t + t * t + 600 * c - 330 * ePrimeSquared) * Math.pow(a, 6)) / 720))
  };
}

function gridToGeographic(x, y, zone) {
  const xShifted = x - FALSE_EASTING;
  const yShifted = y - FALSE_NORTHING;
  const m = yShifted / PTM_SCALE;
  const mu = muFromMeridionalArc(m);
  const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));

  const phi1Rad =
    mu +
    ((3 * e1) / 2 - (27 * Math.pow(e1, 3)) / 32) * Math.sin(2 * mu) +
    ((21 * e1 * e1) / 16 - (55 * Math.pow(e1, 4)) / 32) * Math.sin(4 * mu) +
    ((151 * Math.pow(e1, 3)) / 96) * Math.sin(6 * mu) +
    ((1097 * Math.pow(e1, 4)) / 512) * Math.sin(8 * mu);

  const sinPhi1 = Math.sin(phi1Rad);
  const cosPhi1 = Math.cos(phi1Rad);
  const tanPhi1 = Math.tan(phi1Rad);
  const n1 = CLARKE_1866_A / Math.sqrt(1 - e2 * sinPhi1 * sinPhi1);
  const r1 = (CLARKE_1866_A * (1 - e2)) / Math.pow(1 - e2 * sinPhi1 * sinPhi1, 1.5);
  const t1 = tanPhi1 * tanPhi1;
  const c1 = ePrimeSquared * cosPhi1 * cosPhi1;
  const d = xShifted / (n1 * PTM_SCALE);

  const latitudeRadians =
    phi1Rad -
    (n1 * tanPhi1) /
      r1 *
      ((d * d) / 2 -
        ((5 + 3 * t1 + 10 * c1 - 4 * c1 * c1 - 9 * ePrimeSquared) * Math.pow(d, 4)) / 24 +
        ((61 + 90 * t1 + 298 * c1 + 45 * t1 * t1 - 252 * ePrimeSquared - 3 * c1 * c1) *
          Math.pow(d, 6)) /
          720);

  const longitudeRadians =
    toRadians(centralMeridians[zone]) +
    (d -
      ((1 + 2 * t1 + c1) * Math.pow(d, 3)) / 6 +
      ((5 - 2 * c1 + 28 * t1 - 3 * c1 * c1 + 8 * ePrimeSquared + 24 * t1 * t1) * Math.pow(d, 5)) /
        120) /
      cosPhi1;

  return {
    longitude: toDegrees(longitudeRadians),
    latitude: toDegrees(latitudeRadians)
  };
}

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const character = line[i];

    if (character === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (character === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += character;
    }
  }

  result.push(current);
  return result;
}

const lines = fs.readFileSync(csvPath, 'utf8').trim().split(/\r?\n/);
const headers = parseCsvLine(lines.shift());

let total = 0;
let supported = 0;
let forwardPass = 0;
let inversePass = 0;
let bothPass = 0;
const failures = [];

for (const line of lines) {
  total += 1;
  const values = parseCsvLine(line);
  const row = Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  const zone = zoneMap[String(row.zone).trim()];

  if (!zone) {
    failures.push({ name: row.name, zone: row.zone, reason: 'Unsupported zone code' });
    continue;
  }

  supported += 1;

  const longitude = Number(row.lon);
  const latitude = Number(row.lat);
  const x = Number(row.ptmx);
  const y = Number(row.ptmy);
  const forward = geographicToGrid(longitude, latitude, zone);
  const inverse = gridToGeographic(x, y, zone);
  const dx = Math.abs(forward.x - x);
  const dy = Math.abs(forward.y - y);
  const dLon = Math.abs(inverse.longitude - longitude);
  const dLat = Math.abs(inverse.latitude - latitude);
  const forwardOk = dx <= forwardToleranceMeters && dy <= forwardToleranceMeters;
  const inverseOk = dLon <= inverseToleranceDegrees && dLat <= inverseToleranceDegrees;

  if (forwardOk) {
    forwardPass += 1;
  }

  if (inverseOk) {
    inversePass += 1;
  }

  if (forwardOk && inverseOk) {
    bothPass += 1;
  } else if (failures.length < 10) {
    failures.push({
      name: row.name,
      zone: row.zone,
      dx: Number(dx.toFixed(6)),
      dy: Number(dy.toFixed(6)),
      dLon: Number(dLon.toFixed(9)),
      dLat: Number(dLat.toFixed(9))
    });
  }
}

const summary = {
  totalRows: total,
  supportedRows: supported,
  forwardPass,
  inversePass,
  bothPass,
  forwardPercent: Number(((forwardPass / supported) * 100).toFixed(2)),
  inversePercent: Number(((inversePass / supported) * 100).toFixed(2)),
  bothPercent: Number(((bothPass / supported) * 100).toFixed(2)),
  forwardToleranceMeters,
  inverseToleranceDegrees,
  failures
};

console.log(JSON.stringify(summary, null, 2));
