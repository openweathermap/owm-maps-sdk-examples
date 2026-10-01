import { useEffect } from 'react';
import {
  useLayers,
  useOverlays,
  usePointFlowStore,
  usePointQuery,
  useSearch,
  useSettings,
  useTimeline,
} from '@openweather/maps-react';

/**
 * A tour of the ambient hooks `<SimpleMapUI>`'s own chrome doesn't use directly (it reads
 * `controller` fields straight from context instead) — logged to the console rather than
 * duplicated as new UI, so this stays a demonstration and not a second copy of the simple kit.
 * Mounted as `<SimpleMapUI>`'s `children`, inside the same `<MapsProviders>` tree it sets up.
 */
export function ApiTour() {
  const layers = useLayers();
  const timeline = useTimeline();
  const search = useSearch();
  const overlays = useOverlays();
  const pointQuery = usePointQuery();
  const settings = useSettings();
  const pointFlow = usePointFlowStore();

  useEffect(() => {
    console.log('[owm] active layers:', layers.active);
  }, [layers.active]);

  useEffect(() => {
    console.log('[owm] timeline frame:', timeline.currentTime);
  }, [timeline.currentTime]);

  useEffect(() => {
    if (search.results.length)
      console.log('[owm] search results:', search.results.length);
  }, [search.results]);

  useEffect(() => {
    console.log('[owm] overlays:', overlays);
  }, [overlays]);

  useEffect(() => {
    if (pointQuery)
      console.log(
        '[owm] point query:',
        pointQuery.layers.map((l) => l.formattedValue),
      );
  }, [pointQuery]);

  useEffect(() => {
    console.log('[owm] units:', settings.units);
  }, [settings.units]);

  // `usePointFlowStore` is the same popup/detail-routing store `<WeatherMapUI>` used to share
  // between its popup and detail panel — neither exists in this simple kit, but the store itself
  // is still part of the headless tier, so it's exercised here for API completeness.
  useEffect(() => {
    if (!pointFlow) return;
    return pointFlow.subscribe((snapshot) =>
      console.log('[owm] point flow:', snapshot.popup),
    );
  }, [pointFlow]);

  return null;
}
