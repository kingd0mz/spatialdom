export type UtmCoordinate = {
  zone: number;
  hemisphere: 'N' | 'S';
  easting: number;
  northing: number;
};

export type LatLonCoordinate = {
  latitude: number;
  longitude: number;
};

const WGS84_A = 6378137;
const WGS84_ECC_SQUARED = 0.00669438;
const K0 = 0.9996;

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function toDegrees(value: number) {
  return (value * 180) / Math.PI;
}

function longitudeZone(longitude: number) {
  return Math.floor((longitude + 180) / 6) + 1;
}

function normalizedZone(latitude: number, longitude: number) {
  let zone = longitudeZone(longitude);

  if (latitude >= 56 && latitude < 64 && longitude >= 3 && longitude < 12) {
    zone = 32;
  }

  if (latitude >= 72 && latitude < 84) {
    if (longitude >= 0 && longitude < 9) zone = 31;
    else if (longitude >= 9 && longitude < 21) zone = 33;
    else if (longitude >= 21 && longitude < 33) zone = 35;
    else if (longitude >= 33 && longitude < 42) zone = 37;
  }

  return zone;
}

export function validateLatLon(latitude: number, longitude: number) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error('Latitude and longitude must be valid numbers.');
  }

  if (latitude < -80 || latitude > 84) {
    throw new Error('Latitude must be between -80 and 84 degrees for UTM conversion.');
  }

  if (longitude < -180 || longitude > 180) {
    throw new Error('Longitude must be between -180 and 180 degrees.');
  }
}

export function validateUtm(zone: number, hemisphere: string, easting: number, northing: number) {
  if (!Number.isInteger(zone) || zone < 1 || zone > 60) {
    throw new Error('UTM zone must be an integer between 1 and 60.');
  }

  if (hemisphere !== 'N' && hemisphere !== 'S') {
    throw new Error('Hemisphere must be N or S.');
  }

  if (!Number.isFinite(easting) || !Number.isFinite(northing)) {
    throw new Error('Easting and northing must be valid numbers.');
  }

  if (easting < 100000 || easting > 1000000) {
    throw new Error('UTM easting must be between 100000 and 1000000 meters.');
  }

  if (northing < 0 || northing > 10000000) {
    throw new Error('UTM northing must be between 0 and 10000000 meters.');
  }
}

export function latLonToUtm(latitude: number, longitude: number): UtmCoordinate {
  validateLatLon(latitude, longitude);

  const latRad = toRadians(latitude);
  const lonRad = toRadians(longitude);
  const zone = normalizedZone(latitude, longitude);
  const longOrigin = (zone - 1) * 6 - 180 + 3;
  const longOriginRad = toRadians(longOrigin);
  const eccPrimeSquared = WGS84_ECC_SQUARED / (1 - WGS84_ECC_SQUARED);
  const sinLat = Math.sin(latRad);
  const cosLat = Math.cos(latRad);
  const tanLat = Math.tan(latRad);
  const n = WGS84_A / Math.sqrt(1 - WGS84_ECC_SQUARED * sinLat * sinLat);
  const t = tanLat * tanLat;
  const c = eccPrimeSquared * cosLat * cosLat;
  const a = cosLat * (lonRad - longOriginRad);
  const ecc2 = WGS84_ECC_SQUARED;
  const ecc4 = ecc2 * ecc2;
  const ecc6 = ecc4 * ecc2;
  const m =
    WGS84_A *
    ((1 - ecc2 / 4 - (3 * ecc4) / 64 - (5 * ecc6) / 256) * latRad -
      ((3 * ecc2) / 8 + (3 * ecc4) / 32 + (45 * ecc6) / 1024) * Math.sin(2 * latRad) +
      ((15 * ecc4) / 256 + (45 * ecc6) / 1024) * Math.sin(4 * latRad) -
      ((35 * ecc6) / 3072) * Math.sin(6 * latRad));

  const easting =
    K0 *
      n *
      (a +
        ((1 - t + c) * Math.pow(a, 3)) / 6 +
        ((5 - 18 * t + t * t + 72 * c - 58 * eccPrimeSquared) * Math.pow(a, 5)) / 120) +
    500000;

  let northing =
    K0 *
    (m +
      n *
        tanLat *
        ((a * a) / 2 +
          ((5 - t + 9 * c + 4 * c * c) * Math.pow(a, 4)) / 24 +
          ((61 - 58 * t + t * t + 600 * c - 330 * eccPrimeSquared) * Math.pow(a, 6)) / 720));

  const hemisphere = latitude >= 0 ? 'N' : 'S';

  if (latitude < 0) {
    northing += 10000000;
  }

  return {
    zone,
    hemisphere,
    easting,
    northing
  };
}

export function utmToLatLon(zone: number, hemisphere: 'N' | 'S', easting: number, northing: number): LatLonCoordinate {
  validateUtm(zone, hemisphere, easting, northing);

  const eccPrimeSquared = WGS84_ECC_SQUARED / (1 - WGS84_ECC_SQUARED);
  const ecc2 = WGS84_ECC_SQUARED;
  const ecc4 = ecc2 * ecc2;
  const ecc6 = ecc4 * ecc2;
  const x = easting - 500000;
  let y = northing;

  if (hemisphere === 'S') {
    y -= 10000000;
  }

  const longOrigin = (zone - 1) * 6 - 180 + 3;
  const m = y / K0;
  const mu = m / (WGS84_A * (1 - ecc2 / 4 - (3 * ecc4) / 64 - (5 * ecc6) / 256));
  const e1 = (1 - Math.sqrt(1 - ecc2)) / (1 + Math.sqrt(1 - ecc2));
  const phi1Rad =
    mu +
    ((3 * e1) / 2 - (27 * Math.pow(e1, 3)) / 32) * Math.sin(2 * mu) +
    ((21 * e1 * e1) / 16 - (55 * Math.pow(e1, 4)) / 32) * Math.sin(4 * mu) +
    ((151 * Math.pow(e1, 3)) / 96) * Math.sin(6 * mu) +
    ((1097 * Math.pow(e1, 4)) / 512) * Math.sin(8 * mu);

  const sinPhi1 = Math.sin(phi1Rad);
  const cosPhi1 = Math.cos(phi1Rad);
  const tanPhi1 = Math.tan(phi1Rad);
  const n1 = WGS84_A / Math.sqrt(1 - ecc2 * sinPhi1 * sinPhi1);
  const t1 = tanPhi1 * tanPhi1;
  const c1 = eccPrimeSquared * cosPhi1 * cosPhi1;
  const r1 = (WGS84_A * (1 - ecc2)) / Math.pow(1 - ecc2 * sinPhi1 * sinPhi1, 1.5);
  const d = x / (n1 * K0);

  const latitude =
    phi1Rad -
    (n1 * tanPhi1) /
      r1 *
      ((d * d) / 2 -
        ((5 + 3 * t1 + 10 * c1 - 4 * c1 * c1 - 9 * eccPrimeSquared) * Math.pow(d, 4)) / 24 +
        ((61 + 90 * t1 + 298 * c1 + 45 * t1 * t1 - 252 * eccPrimeSquared - 3 * c1 * c1) *
          Math.pow(d, 6)) /
          720);

  const longitude =
    toRadians(longOrigin) +
    (d -
      ((1 + 2 * t1 + c1) * Math.pow(d, 3)) / 6 +
      ((5 - 2 * c1 + 28 * t1 - 3 * c1 * c1 + 8 * eccPrimeSquared + 24 * t1 * t1) * Math.pow(d, 5)) /
        120) /
      cosPhi1;

  return {
    latitude: toDegrees(latitude),
    longitude: toDegrees(longitude)
  };
}

export function formatDecimalDegrees(value: number) {
  return value.toFixed(6);
}

export function formatMeters(value: number) {
  return value.toFixed(2);
}
