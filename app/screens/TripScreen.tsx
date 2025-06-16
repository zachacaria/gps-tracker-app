import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useLocationTracker from '../components/useLocationTracker';

export default function TripScreen() {
  const navigation = useNavigation();
  const [tripStartTime, setTripStartTime] = useState<Date | null>(new Date());
  const [tripDuration, setTripDuration] = useState<number>(0);
  const [profit, setProfit] = useState<string>('');
  const [startLocation, setStartLocation] = useState<any>(null);
  const [endLocation, setEndLocation] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const { locationData, resetLocationData, getCurrentLocation, isTracking, setIsTracking } = useLocationTracker(true);

  useEffect(() => {
    getCurrentLocation().then(setStartLocation);
    setIsTracking(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (tripStartTime) {
      interval = setInterval(() => {
        setTripDuration(Math.floor((new Date().getTime() - tripStartTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [tripStartTime]);

  const stopTrip = async () => {
    setIsTracking(false);
    const end = await getCurrentLocation();
    setEndLocation(end);
    Alert.prompt(
      'Trip Income',
      'Enter the income from this trip:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (value) => {
            const trip = {
              GPS_Location_Start: startLocation,
              GPS_Location_End: end,
              Duration: tripDuration,
              Trip_Income: parseFloat(value),
            };
            setTrips((prev) => [...prev, trip]);
            resetLocationData();
            navigation.goBack();
          },
        },
      ],
      'plain-text'
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Trip In Progress</Text>
      <Text style={{ marginBottom: 10 }}>Duration: {tripDuration} seconds</Text>
      <Button title="Stop Trip" onPress={stopTrip} color="red" />
    </View>
  );
}