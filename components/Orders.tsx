import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import {getOrders, markAsPickedUp, markAsDelivered, markIncident, Order} from '@/app/api';
import { OrderCard } from './OrderCard';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      // @ts-ignore
      toast.error(error.message)
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      switch (newStatus) {
        case "INPROGRESS":
          await markAsPickedUp(orderId);
          toast.success("Order picked up")
          break;
        case "DELIVERED":
          await markAsDelivered(orderId);
            toast.success("Order delivered")
          break;
        case "INCIDENT":
          await markIncident(orderId);
            toast.error("Incident reported")
          break;
        case "SOLVED":
          await markAsPickedUp(orderId);
          newStatus = "INPROGRESS";
          toast.success("Incident solved")
          break;
        default:
          throw new Error(`Unknown status: ${newStatus}`);
      }
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
                  order={item}
                  updateOrderStatus={updateOrderStatus}
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
