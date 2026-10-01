# React example (`<SimpleMapUI>`)

React 19 demo of the OpenWeather Maps SDK: one `<SimpleMapUI>` from `@openweather/maps-react/maplibre`, with `ApiTour.tsx` mounted as its `children` to log the rest of the controller API to the console. Behaviour matches the [vanilla example](../vanilla).

## Setup

Requires Node.js 20+.

```bash
npm install
cp .env.example .env.local
# edit .env.local: VITE_OWM_API_KEY=...   (get a key at https://home.openweathermap.org/api_keys)
npm run dev
```

Open the printed `localhost` URL. Alternatively append `?appid=YOUR_KEY` (and optionally `?lightning_appid=...`) to the URL. `VITE_OWM_LIGHTNING_API_KEY` is optional.

## Build

```bash
npm run build
```
