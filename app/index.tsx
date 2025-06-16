import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrackingScreen from './screens/TrackingScreen';
import TripScreen from './screens/TripScreen';

export type RootStackParamList = {
  Tracking: undefined;
  Trip: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tracking">
        <Stack.Screen name="Tracking" component={TrackingScreen} />
        <Stack.Screen name="Trip" component={TripScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}