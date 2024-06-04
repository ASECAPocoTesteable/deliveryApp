import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { getOrders, markAsDelivered, Order } from '@/app/api';
import { OrderCard } from './OrderCard';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchOrders()
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      await markAsDelivered(orderId);
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
          <OrderCard
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

export default Orders;
