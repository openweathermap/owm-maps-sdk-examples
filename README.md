# OpenWeather Maps SDK — examples

Runnable example apps for the [OpenWeather Maps SDK](https://www.npmjs.com/package/@openweather/maps-maplibre), a modular TypeScript SDK for weather maps on [MapLibre GL JS](https://maplibre.org/).

| Example | Stack | Run |
| --- | --- | --- |
| [`vanilla/`](vanilla) | `createWeatherMap` + `createSimpleMapUI`, Vite | `cd vanilla && npm install && npm run dev` |
| [`react/`](react) | `<SimpleMapUI>`, React 19, Vite | `cd react && npm install && npm run dev` |

Each folder is self-contained: it installs the SDK from npm (`@openweather/maps-*`) and can be copied out as a starting point for your own project. Vite is used only by these examples; the SDK itself works with any bundler that handles ESM and CSS imports.

You need an OpenWeather Maps API key: https://home.openweathermap.org/api_keys. Copy `.env.example` to `.env.local` in the example folder and set `VITE_OWM_API_KEY`, or append `?appid=YOUR_KEY` to the dev-server URL.

Licensed under MIT.
