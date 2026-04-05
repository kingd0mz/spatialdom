import { useEffect, useState } from 'react';
import {
  formatDecimalDegrees,
  formatMeters,
  latLonToUtm,
  utmToLatLon
} from '../../lib/coordinates';
import ToolAdSlot from '../../shared/ads/ToolAdSlot';
import ToolLayout from '../../shared/layout/ToolLayout';

type Mode = 'decimal' | 'utm';

type ConversionState =
  | {
      ok: true;
      text: string;
      detailText: string;
      detail: Array<{ label: string; value: string }>;
    }
  | {
      ok: false;
      error: string;
    };

const defaultDecimal = {
  latitude: '14.5995',
  longitude: '120.9842'
};

const defaultUtm = {
  zone: '51',
  hemisphere: 'N' as 'N' | 'S',
  easting: '281169.30',
  northing: '1619286.90'
};

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function parseNumber(value: string, label: string) {
  const parsed = Number(value.trim());

  if (!value.trim() || Number.isNaN(parsed)) {
    throw new Error(`${label} must be a valid number.`);
  }

  return parsed;
}

function getDecimalResult(latitudeValue: string, longitudeValue: string): ConversionState {
  try {
    const latitude = parseNumber(latitudeValue, 'Latitude');
    const longitude = parseNumber(longitudeValue, 'Longitude');
    const utm = latLonToUtm(latitude, longitude);
    const text = `Zone ${utm.zone}${utm.hemisphere} ${formatMeters(utm.easting)} mE ${formatMeters(utm.northing)} mN`;

    return {
      ok: true,
      text,
      detailText: [`Zone: ${utm.zone}${utm.hemisphere}`, `Easting: ${formatMeters(utm.easting)} m`, `Northing: ${formatMeters(utm.northing)} m`].join('\n'),
      detail: [
        { label: 'Zone', value: `${utm.zone}${utm.hemisphere}` },
        { label: 'Easting', value: `${formatMeters(utm.easting)} m` },
        { label: 'Northing', value: `${formatMeters(utm.northing)} m` }
      ]
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unable to convert decimal coordinates.'
    };
  }
}

function getUtmResult(zoneValue: string, hemisphere: 'N' | 'S', eastingValue: string, northingValue: string): ConversionState {
  try {
    const zone = parseNumber(zoneValue, 'UTM zone');
    const easting = parseNumber(eastingValue, 'Easting');
    const northing = parseNumber(northingValue, 'Northing');
    const latLon = utmToLatLon(zone, hemisphere, easting, northing);
    const text = `${formatDecimalDegrees(latLon.latitude)}, ${formatDecimalDegrees(latLon.longitude)}`;

    return {
      ok: true,
      text,
      detailText: [`Latitude: ${formatDecimalDegrees(latLon.latitude)}`, `Longitude: ${formatDecimalDegrees(latLon.longitude)}`].join('\n'),
      detail: [
        { label: 'Latitude', value: formatDecimalDegrees(latLon.latitude) },
        { label: 'Longitude', value: formatDecimalDegrees(latLon.longitude) }
      ]
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unable to convert UTM coordinates.'
    };
  }
}

function CoordinateConverterPage() {
  const [mode, setMode] = useState<Mode>('decimal');
  const [decimalInputs, setDecimalInputs] = useState(defaultDecimal);
  const [utmInputs, setUtmInputs] = useState(defaultUtm);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Coordinate Converter | Spatialdom';

    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    if (!copyStatus) {
      return;
    }

    const timeoutId = window.setTimeout(() => setCopyStatus(''), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [copyStatus]);

  const result =
    mode === 'decimal'
      ? getDecimalResult(decimalInputs.latitude, decimalInputs.longitude)
      : getUtmResult(utmInputs.zone, utmInputs.hemisphere, utmInputs.easting, utmInputs.northing);

  const handleCopy = async (value: string, successMessage: string) => {
    if (!result.ok) {
      return;
    }

    try {
      await copyText(value);
      setCopyStatus(successMessage);
    } catch {
      setCopyStatus('Copy failed. Please copy manually.');
    }
  };

  const handleReset = () => {
    setDecimalInputs(defaultDecimal);
    setUtmInputs(defaultUtm);
    setCopyStatus('');
  };

  return (
    <ToolLayout
      title="Coordinate Converter"
      intro="Convert between decimal latitude/longitude and UTM coordinates in the browser. The interface is optimized for quick field checks, mobile input, and future reuse across additional spatial tools."
    >
      <div className="mx-auto grid max-w-4xl gap-6">
        <section className="panel rounded-[2rem] p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="section-label">Input Mode</p>
              <h2 className="text-xl font-semibold text-text-primary">Select source coordinates</h2>
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border-strong bg-surface-soft p-1">
              <button
                type="button"
                onClick={() => setMode('decimal')}
                className={mode === 'decimal' ? 'interactive-accent px-4 py-2.5' : 'interactive-outline px-4 py-2.5'}
              >
                Lat / Lon
              </button>
              <button
                type="button"
                onClick={() => setMode('utm')}
                className={mode === 'utm' ? 'interactive-accent px-4 py-2.5' : 'interactive-outline px-4 py-2.5'}
              >
                UTM
              </button>
            </div>
          </div>
        </section>

        <section className="panel rounded-[2rem] p-5 sm:p-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="section-label">{mode === 'decimal' ? 'Latitude / Longitude' : 'Universal Transverse Mercator'}</p>
              <h2 className="text-2xl font-semibold text-text-primary">
                {mode === 'decimal' ? 'Decimal degrees input' : 'UTM input'}
              </h2>
              <p className="text-sm leading-6 text-text-body">
                {mode === 'decimal'
                  ? 'Enter decimal coordinates to produce a UTM result instantly.'
                  : 'Enter zone, hemisphere, easting, and northing to convert back to decimal latitude and longitude.'}
              </p>
            </div>

            {mode === 'decimal' ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm text-text-secondary">Latitude</span>
                  <input
                    value={decimalInputs.latitude}
                    onChange={(event) =>
                      setDecimalInputs((current) => ({ ...current, latitude: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-border-strong bg-surface-soft px-4 py-3 text-sm text-text-primary outline-none transition focus:border-border-hover"
                    inputMode="decimal"
                    placeholder="e.g. 14.5995"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-text-secondary">Longitude</span>
                  <input
                    value={decimalInputs.longitude}
                    onChange={(event) =>
                      setDecimalInputs((current) => ({ ...current, longitude: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-border-strong bg-surface-soft px-4 py-3 text-sm text-text-primary outline-none transition focus:border-border-hover"
                    inputMode="decimal"
                    placeholder="e.g. 120.9842"
                  />
                </label>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm text-text-secondary">Zone</span>
                  <input
                    value={utmInputs.zone}
                    onChange={(event) => setUtmInputs((current) => ({ ...current, zone: event.target.value }))}
                    className="w-full rounded-2xl border border-border-strong bg-surface-soft px-4 py-3 text-sm text-text-primary outline-none transition focus:border-border-hover"
                    inputMode="numeric"
                    placeholder="e.g. 51"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-text-secondary">Hemisphere</span>
                  <select
                    value={utmInputs.hemisphere}
                    onChange={(event) =>
                      setUtmInputs((current) => ({
                        ...current,
                        hemisphere: event.target.value as 'N' | 'S'
                      }))
                    }
                    className="w-full rounded-2xl border border-border-strong bg-surface-soft px-4 py-3 text-sm text-text-primary outline-none transition focus:border-border-hover"
                  >
                    <option value="N">Northern</option>
                    <option value="S">Southern</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-text-secondary">Easting (m)</span>
                  <input
                    value={utmInputs.easting}
                    onChange={(event) => setUtmInputs((current) => ({ ...current, easting: event.target.value }))}
                    className="w-full rounded-2xl border border-border-strong bg-surface-soft px-4 py-3 text-sm text-text-primary outline-none transition focus:border-border-hover"
                    inputMode="decimal"
                    placeholder="e.g. 281169.30"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-text-secondary">Northing (m)</span>
                  <input
                    value={utmInputs.northing}
                    onChange={(event) => setUtmInputs((current) => ({ ...current, northing: event.target.value }))}
                    className="w-full rounded-2xl border border-border-strong bg-surface-soft px-4 py-3 text-sm text-text-primary outline-none transition focus:border-border-hover"
                    inputMode="decimal"
                    placeholder="e.g. 1619286.90"
                  />
                </label>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={handleReset} className="interactive-outline inline-flex items-center justify-center">
                Clear / reset
              </button>
            </div>
          </div>
        </section>

        <section className="panel rounded-[2rem] p-5 sm:p-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="section-label">Output</p>
              <h2 className="text-2xl font-semibold text-text-primary">
                {mode === 'decimal' ? 'Converted UTM coordinates' : 'Converted latitude / longitude'}
              </h2>
            </div>

            {result.ok ? (
              <>
                <div className="theme-card rounded-3xl p-4 sm:p-5">
                  <p className="text-sm text-text-secondary">Primary output</p>
                  <p className="mt-2 break-words text-lg font-medium text-text-primary sm:text-xl">{result.text}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {result.detail.map((item) => (
                    <div key={item.label} className="theme-card rounded-3xl p-4">
                      <p className="text-sm text-text-secondary">{item.label}</p>
                      <p className="mt-2 text-base font-medium text-text-primary">{item.value}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-4 text-sm leading-6 text-red-200">
                {result.error}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleCopy(result.ok ? result.text : '', 'Copied compact result.')}
                  disabled={!result.ok}
                  className="interactive-accent inline-flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Copy result
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(result.ok ? result.detailText : '', 'Copied detailed values.')}
                  disabled={!result.ok}
                  className="interactive-outline inline-flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Copy details
                </button>
              </div>
              {copyStatus ? <p className="text-sm text-text-body">{copyStatus}</p> : null}
            </div>
          </div>
        </section>

        <div className="pt-2">
          <ToolAdSlot label="Bottom Banner" />
        </div>
      </div>
    </ToolLayout>
  );
}

export default CoordinateConverterPage;
