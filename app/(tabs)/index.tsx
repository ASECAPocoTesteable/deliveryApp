// index.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Deliveries from '../../components/Deliveries';
const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Deliveries />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
