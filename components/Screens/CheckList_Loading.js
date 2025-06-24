import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

export default function CheckList_Loading({ navigation, route }) {
  const { score } = route.params; 

  useEffect(() => {
    const timer = setTimeout(() => {
      
      navigation.replace('CheckList_Result', { score: score });
    }, 3000); 

    
    return () => clearTimeout(timer);
  }, [navigation, score]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text style={styles.text}>수면의 질을 분석하고 있어요...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383948',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
