import 'maplibre-gl/dist/maplibre-gl.css';
import '@openweather/maps-ui/styles.css';
import {
  createWeatherMap,
  logger,
  type WeatherMapHandle,
} from '@openweather/maps-maplibre';
import { showWeatherMapError } from '@openweather/maps-ui';
import { createSimpleMapUI } from '@openweather/maps-ui/maplibre';

// Isoline / layer perf logs in the console. Turn off for a quiet production build:
//   logger.setEnabled(false)
logger.setEnabled(true);

function resolveApiKey(): string | undefined {
  const params = new URLSearchParams(window.location.search);
  return params.get('appid') ?? import.meta.env.VITE_OWM_API_KEY;
}

// The lightning websocket is a distinct service with its own credential — not the tile `appid`.
function resolveLightningKey(): string | undefined {
  const params = new URLSearchParams(window.location.search);
  return params.get('lightning_appid') ?? import.meta.env.VITE_OWM_LIGHTNING_API_KEY;
}

/**
 * A tour of the rest of the API surface `createSimpleMapUI` already wires up internally for its
 * own UI (events, timeline, search, point query, overlay toggles) — logged to the console rather
 * than duplicated in new UI, so this stays a demonstration and not a second copy of the simple kit.
 */
function logApiSurface(handle: WeatherMapHandle): void {
  const controller = handle.getController();

  // Engine events — the same three createSimpleMapUI listens to for its own status text.
  handle.on('layerchange', ({ code }) => console.log('[owm] layerchange →', code));
  handle.on('layer:locked', ({ code }) =>
    console.log('[owm] layer:locked →', code, '(needs a plan upgrade)'),
  );
  handle.on('error', ({ message }) => console.warn('[owm] error →', message));

  // Timeline — play/pause and scrub are also driven by the simple kit's range control; this is
  // the same controller, so either can drive it. Space bar toggles play as a second entry point.
  window.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' || e.target !== document.body) return;
    e.preventDefault();
    const { playback } = controller.timeline.getSnapshot();
    if (playback.playing) controller.timeline.pause();
    else controller.timeline.play();
  });

  // Search — controller.search is the same debounced/cancellable store the search box reads.
  controller.search.subscribe((snapshot) => {
    if (snapshot.results.length)
      console.log('[owm] search results:', snapshot.results.length);
  });

  // Point query — controller.pointQuery.events fires independently of the on-screen query box.
  controller.pointQuery.events.on('result', (result) =>
    console.log(
      '[owm] point query:',
      result.layers.map((l) => l.formattedValue),
    ),
  );

  // Live per-frame config the simple kit's plain toggles don't expose panels for — count/speed
  // for wind particles, density/drift for wave glyphs, and raster tile params (opacity, contrast,
  // gamma…). Called once here with the engine's own current values, just to show the shape; a
  // consumer building a fuller UI would wire these to real controls.
  handle.updateParticleConfig({ numParticles: 16384, speedFactor: 0.2 });
  handle.updateWavesConfig({ glyphDensity: 2048, driftSpeedFactor: 0.3 });
  handle.updateRasterParams({ opacity: 0.75 });
}

async function main(): Promise<void> {
  const mapContainer = document.getElementById('map')!;

  const apiKey = resolveApiKey();
  if (!apiKey) {
    showWeatherMapError(
      mapContainer,
      'No API key configured. Set VITE_OWM_API_KEY in .env.local (copy .env.example) or pass ?appid=... in the URL.',
    );
    return;
  }

  const lightningKey = resolveLightningKey();
  let handle: WeatherMapHandle;
  try {
    handle = await createWeatherMap({
      apiKey,
      container: mapContainer,
      center: [0, 30],
      zoom: 2,
      defaultLayer: 'temperature',
      // A regular tile `appid` connects to the lightning stream but receives no strikes — it
      // needs this separate, lightning-enabled key. Omitted entirely (not sent broken) if unset.
      ...(lightningKey && {
        lightningStreamUrl: `wss://wl-stream-api-1.owm.io/ws?apikey=${encodeURIComponent(lightningKey)}`,
      }),
    });
  } catch (err) {
    showWeatherMapError(mapContainer, err instanceof Error ? err.message : String(err));
    return;
  }

  // Console access for exploring the SDK API from devtools:
  //   owm.controller.listLayers(), owm.controller.timeline.getSnapshot(), owm.map.getZoom(), …
  (window as unknown as Record<string, unknown>).owm = {
    handle,
    controller: handle.getController(),
    map: handle.getMap(),
  };

  logApiSurface(handle);

  // The simple kit: a flat layer panel, a timeline range control, a legend, search, overlay
  // toggles, zoom, and a point-query box — built on the same headless view-models logged above.
  createSimpleMapUI({ handle, apiKey });
}

void main();
