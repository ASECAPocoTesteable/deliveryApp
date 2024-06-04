// index.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Orders from '../../components/Orders';
import { OrderCard } from '@/components/OrderCard';
const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Orders />
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
