// Deliveries.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getDeliveries, markAsDelivered, Delivery } from './../app/api';

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

  const handleMarkAsDelivered = async (id: number) => {
    try {
      await markAsDelivered(id);
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
        <View style={styles.deliveryItem}>
          <Text>{item.description}</Text>
          <Button
            title="Mark as Delivered"
            onPress={() => handleMarkAsDelivered(item.id)}
          />
        </View>
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
