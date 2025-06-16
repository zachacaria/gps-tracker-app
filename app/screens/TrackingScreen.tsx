import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import useLocationTracker from '../components/useLocationTracker';

export default function TrackingScreen() {
  const [isTracking, setIsTracking] = useState(false);
  const { locationData } = useLocationTracker(isTracking);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>GPS Tracking</Text>
      <Switch
        value={isTracking}
        onValueChange={setIsTracking}
      />
      <Text style={{ marginTop: 20 }}>Points Collected: {locationData.length}</Text>
    </View>
  );
}