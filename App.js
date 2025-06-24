import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Nav from './components/Nav';

export default function App() {
  return (
    <View style={{flex:1, position:'relative'}}>
     <SafeAreaProvider>
      <Nav/>
    </SafeAreaProvider>
    </View>
  );
}