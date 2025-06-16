import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../index';

export default function TrackingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tracking'>>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Ready to Start Your Trip?</Text>
      <Button title="Start Trip" onPress={() => navigation.navigate('Trip')} />
    </View>
    //console.log('Successfully navigated to Tracking Screen!');
);
}