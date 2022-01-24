import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './components/AppNavigator';
import 'react-native-gesture-handler';

export default function App() {
  return (
    
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

