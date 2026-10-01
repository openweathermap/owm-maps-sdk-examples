import { SimpleMapUI } from '@openweather/maps-react/maplibre';
import { ApiTour } from './ApiTour';

function resolveApiKey(): string | undefined {
  const params = new URLSearchParams(window.location.search);
  return params.get('appid') ?? import.meta.env.VITE_OWM_API_KEY;
}

// The lightning websocket is a distinct service with its own credential — not the tile `appid`.
function resolveLightningKey(): string | undefined {
  const params = new URLSearchParams(window.location.search);
  return params.get('lightning_appid') ?? import.meta.env.VITE_OWM_LIGHTNING_API_KEY;
}

export function App() {
  const apiKey = resolveApiKey();
  if (!apiKey) {
    return (
      <div data-owm-part="error-box" className="owm-root">
        {
          'Failed to load weather map:\nNo API key configured. Set VITE_OWM_API_KEY in .env.local (copy .env.example) or pass ?appid=... in the URL.'
        }
      </div>
    );
  }

  const lightningKey = resolveLightningKey();

  return (
    <SimpleMapUI
      apiKey={apiKey}
      center={[0, 30]}
      zoom={2}
      defaultLayer="temperature"
      {...(lightningKey && {
        lightningStreamUrl: `wss://wl-stream-api-1.owm.io/ws?apikey=${encodeURIComponent(lightningKey)}`,
      })}
    >
      <ApiTour />
    </SimpleMapUI>
  );
}
