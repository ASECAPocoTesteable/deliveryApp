import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDeliveries, markAsDelivered, Delivery } from './../app/api';
import { Order } from './DeliveryCard';

const Deliveries: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const data = await getDeliveries();
      setDeliveries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      await markAsDelivered(orderId);
      fetchDeliveries();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={deliveries}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Order order={item} updateOrderStatus={updateOrderStatus} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  deliveryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Deliveries;
