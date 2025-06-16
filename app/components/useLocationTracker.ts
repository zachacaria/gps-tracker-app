import { useEffect, useState, useRef } from 'react';
import * as Location from 'expo-location';

export default function useLocationTracker(isTracking: boolean) {
  const [locationData, setLocationData] = useState<Location.LocationObjectCoords[]>([]);

  useEffect(() => {
    let subscription: Promise<Location.LocationSubscription> | undefined;

    if (isTracking) {
      Location.requestForegroundPermissionsAsync().then(({ status }) => {
        if (status !== 'granted') return;

        subscription = Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 3000,
            distanceInterval: 5,
          },
          (loc) => {
            setLocationData((prev) => [...prev, loc.coords]);
          }
        );
      });
    } else {
      setLocationData([]);
    }

    return () => {
      subscription?.then((s) => s.remove());
    };
  }, [isTracking]);

  return { locationData };
}