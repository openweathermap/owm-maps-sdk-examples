import 'maplibre-gl/dist/maplibre-gl.css';
import '@openweather/maps-react/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { logger } from '@openweather/maps-maplibre';
import { App } from './App';

// Isoline / layer perf logs in the console. Turn off for a quiet production build:
//   logger.setEnabled(false)
logger.setEnabled(true);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
