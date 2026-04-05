export type Luzon1911Zone = 'I' | 'II' | 'III' | 'IV' | 'V';
export type AngularFormat = 'dd' | 'dms';
export type CoordinateAxis = 'latitude' | 'longitude';

export type Luzon1911Geographic = {
  longitude: number;
  latitude: number;
  zone: Luzon1911Zone;
};

export type Luzon1911Grid = {
  x: number;
  y: number;
  zone: Luzon1911Zone;
};

export type DmsAngle = {
  degrees: string;
  minutes: string;
  seconds: string;
  direction: 'N' | 'S' | 'E' | 'W';
};

const CLARKE_1866_A = 6378206.4;
const CLARKE_1866_INV_F = 294.978698213898;
const PTM_SCALE = 0.99995;
const FALSE_EASTING = 500000;
const FALSE_NORTHING = 0;

const f = 1 / CLARKE_1866_INV_F;
const e2 = 2 * f - f * f;
const ePrimeSquared = e2 / (1 - e2);

const ZONE_CENTRAL_MERIDIANS: Record<Luzon1911Zone, number> = {
  I: 117,
  II: 119,
  III: 121,
  IV: 123,
  V: 125
};

export const LUZON_1911_ZONES: Array<{
  code: Luzon1911Zone;
  label: string;
  centralMeridian: number;
}> = [
  { code: 'I', label: 'Zone I', centralMeridian: 117 },
  { code: 'II', label: 'Zone II', centralMeridian: 119 },
  { code: 'III', label: 'Zone III', centralMeridian: 121 },
  { code: 'IV', label: 'Zone IV', centralMeridian: 123 },
  { code: 'V', label: 'Zone V', centralMeridian: 125 }
];

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function toDegrees(value: number) {
  return (value * 180) / Math.PI;
}

function meridionalArc(latitudeRadians: number) {
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

function muFromMeridionalArc(meridionalDistance: number) {
  const e4 = e2 * e2;
  const e6 = e4 * e2;

  return meridionalDistance / (CLARKE_1866_A * (1 - e2 / 4 - (3 * e4) / 64 - (5 * e6) / 256));
}

export function validateZone(zone: string): asserts zone is Luzon1911Zone {
  if (!ZONE_CENTRAL_MERIDIANS[zone as Luzon1911Zone]) {
    throw new Error('Zone must be one of I, II, III, IV, or V.');
  }
}

export function validateLuzon1911Geographic(longitude: number, latitude: number) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    throw new Error('Longitude and latitude must be valid numbers.');
  }

  if (longitude < 116 || longitude > 127) {
    throw new Error('Longitude must be between 116 and 127 degrees for Philippine zone conversion.');
  }

  if (latitude < 4 || latitude > 22) {
    throw new Error('Latitude must be between 4 and 22 degrees for Philippine zone conversion.');
  }
}

export function validateGridCoordinates(x: number, y: number) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    throw new Error('PTM X and PTM Y must be valid numbers.');
  }

  if (x < -100000 || x > 1200000) {
    throw new Error('PTM X is outside the expected range for Luzon 1911 zone coordinates.');
  }

  if (y < 0 || y > 3000000) {
    throw new Error('PTM Y is outside the expected range for Luzon 1911 zone coordinates.');
  }
}

export function geographicToLuzon1911Grid({
  longitude,
  latitude,
  zone
}: Luzon1911Geographic): Luzon1911Grid {
  validateZone(zone);
  validateLuzon1911Geographic(longitude, latitude);

  const latRad = toRadians(latitude);
  const lonRad = toRadians(longitude);
  const lonOriginRad = toRadians(ZONE_CENTRAL_MERIDIANS[zone]);
  const sinLat = Math.sin(latRad);
  const cosLat = Math.cos(latRad);
  const tanLat = Math.tan(latRad);
  const n = CLARKE_1866_A / Math.sqrt(1 - e2 * sinLat * sinLat);
  const t = tanLat * tanLat;
  const c = ePrimeSquared * cosLat * cosLat;
  const a = cosLat * (lonRad - lonOriginRad);
  const m = meridionalArc(latRad);

  const x =
    FALSE_EASTING +
    PTM_SCALE *
      n *
      (a +
        ((1 - t + c) * Math.pow(a, 3)) / 6 +
        ((5 - 18 * t + t * t + 72 * c - 58 * ePrimeSquared) * Math.pow(a, 5)) / 120);

  const y =
    FALSE_NORTHING +
    PTM_SCALE *
      (m +
        n *
          tanLat *
          ((a * a) / 2 +
            ((5 - t + 9 * c + 4 * c * c) * Math.pow(a, 4)) / 24 +
            ((61 - 58 * t + t * t + 600 * c - 330 * ePrimeSquared) * Math.pow(a, 6)) / 720));

  return { x, y, zone };
}

export function luzon1911GridToGeographic({ x, y, zone }: Luzon1911Grid): Luzon1911Geographic {
  validateZone(zone);
  validateGridCoordinates(x, y);

  const xShifted = x - FALSE_EASTING;
  const yShifted = y - FALSE_NORTHING;
  const lonOrigin = ZONE_CENTRAL_MERIDIANS[zone];
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
    toRadians(lonOrigin) +
    (d -
      ((1 + 2 * t1 + c1) * Math.pow(d, 3)) / 6 +
      ((5 - 2 * c1 + 28 * t1 - 3 * c1 * c1 + 8 * ePrimeSquared + 24 * t1 * t1) * Math.pow(d, 5)) /
        120) /
      cosPhi1;

  const longitude = toDegrees(longitudeRadians);
  const latitude = toDegrees(latitudeRadians);

  validateLuzon1911Geographic(longitude, latitude);

  return { longitude, latitude, zone };
}

export function formatDecimalDegrees(value: number) {
  return value.toFixed(8);
}

export function formatMeters(value: number) {
  return value.toFixed(3);
}

export function decimalDegreesToDms(value: number, axis: CoordinateAxis) {
  const absolute = Math.abs(value);
  const degrees = Math.floor(absolute);
  const minutesFloat = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Number(((minutesFloat - minutes) * 60).toFixed(4));
  const direction = axis === 'latitude' ? (value >= 0 ? 'N' : 'S') : value >= 0 ? 'E' : 'W';

  return {
    degrees,
    minutes,
    seconds,
    direction
  };
}

export function formatDms(value: number, axis: CoordinateAxis) {
  const dms = decimalDegreesToDms(value, axis);
  return `${dms.degrees}° ${dms.minutes}' ${dms.seconds}" ${dms.direction}`;
}

export function dmsToDecimalDegrees(angle: DmsAngle, axis: CoordinateAxis) {
  const degrees = Number(angle.degrees);
  const minutes = Number(angle.minutes || 0);
  const seconds = Number(angle.seconds || 0);

  if ([degrees, minutes, seconds].some((value) => Number.isNaN(value))) {
    throw new Error(`Enter valid ${axis} DMS values.`);
  }

  const limit = axis === 'latitude' ? 90 : 180;

  if (degrees < 0 || degrees > limit) {
    throw new Error(`${axis === 'longitude' ? 'Longitude' : 'Latitude'} degrees must be between 0 and ${limit}.`);
  }

  if (minutes < 0 || minutes >= 60 || seconds < 0 || seconds >= 60) {
    throw new Error('Minutes and seconds must be between 0 and 59.9999.');
  }

  const sign = angle.direction === 'S' || angle.direction === 'W' ? -1 : 1;

  return sign * (degrees + minutes / 60 + seconds / 3600);
}
