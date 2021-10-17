import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import StackNavigation from './src/Navigation/StackNavigation';

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StackNavigation />
    </SafeAreaView>
  );
}
