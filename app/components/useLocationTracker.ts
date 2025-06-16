import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useLocationTracker(initialTracking: boolean) {
  const [locationData, setLocationData] = useState<Location.LocationObjectCoords[]>([]);
  const [isTracking, setIsTracking] = useState(initialTracking);

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
    }

    return () => {
      subscription?.then((s) => s.remove());
    };
  }, [isTracking]);

  const resetLocationData = () => setLocationData([]);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return null;
    const location = await Location.getCurrentPositionAsync({});
    return location.coords;
  };

  return { locationData, resetLocationData, getCurrentLocation, isTracking, setIsTracking };
}
