// index.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Deliveries from '../../components/Deliveries';
import { Order } from '@/components/DeliveryCard';
const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Deliveries />
      <Order
        order={{
          id: 1,
          orderId: '1234',
          deliverer: {
            name: 'John',
            surname: 'Doe',
          },
          status: 'PENDING',
        }}
        updateOrderStatus={() => {}}
      />
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
