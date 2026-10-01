# Vanilla example (`createWeatherMap` + simple UI kit)

A framework-free demo of the OpenWeather Maps SDK: `createWeatherMap()` from `@openweather/maps-maplibre`
plus `createSimpleMapUI()` from `@openweather/maps-ui` — no React. `main.ts` also logs the rest of the API
(engine events, timeline, search, point query, particle/waves/raster config) to the console so it
stays a complete tour of the SDK, not just the UI kit.

The chrome here (layer panel, legend, timeline, search, overlays, point-query box) is the SDK's
**simple** UI kit — plain controls, no art assets, no fan-out/fold layout. This example stays deliberately small.

## Features

- **Layer panel** — a flat list of the catalog's popular layers (radar, temperature, precipitation, wind, pressure, clouds, waves), grouped by category.
- **Timeline** — a plain `<input type="range">` scrubber with play/pause, driven by `createTimelineModel`.
- **Legend** — color-ramp bar with min/max and click-to-cycle units (°C/°F, m/s / mph / km/h, etc.).
- **Overlays** — four plain toggles: wind/wave particles, cyclone tracks, contour isolines, real-time lightning strikes.
- **Search** — geocoding with debounced results and a "use current location" button.
- **Point query** — click anywhere on a scalar layer to sample its decoded value.
- **Zoom controls**.

## Setup

Requires Node.js 20+. The SDK packages are installed from npm (`@openweather/maps-*`), so no other repo is needed.

```bash
npm install
```

Copy the env template and add your own OpenWeather API key (get one at https://home.openweathermap.org/api_keys):

```bash
cp .env.example .env.local
# edit .env.local: VITE_OWM_API_KEY=...
```

`VITE_OWM_LIGHTNING_API_KEY` is optional — the lightning overlay is a separate credentialed service from the tile API; without it, the lightning toggle is simply unavailable. Without any `VITE_OWM_API_KEY` configured, the demo shows an in-page error instead of a blank map.

Then start the dev server for this example:

```bash
npm run dev
```

Open the printed `localhost` URL in your browser. To override the key per-URL instead of via `.env.local` (e.g. for a quick one-off test), append `?appid=YOUR_KEY` (and `?lightning_appid=YOUR_LIGHTNING_KEY`).

## Build

```bash
npm run build
```

A normal multi-file Vite build (hashed `assets/*.js`/`*.css`) — nothing is inlined into a single document.
