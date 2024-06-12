import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet, View, TouchableOpacity, ActivityIndicator, TextInput, Button } from 'react-native';
import Modal from 'react-native-modal';
import { getOrders, markAsPickedUp, markAsDelivered, markIncident, Order, setURL } from '@/app/api';
import { OrderCard } from './OrderCard';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
      console.error(error);
      setIsModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUrl = () => {
    setURL(url);
    setIsModalVisible(false);
    fetchOrders();
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      switch (newStatus) {
        case "INPROGRESS":
          await markAsPickedUp(orderId);
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Order picked up',
          });
          break;
        case "DELIVERED":
          await markAsDelivered(orderId);
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Order delivered',
          });
          break;
        case "INCIDENT":
          await markIncident(orderId);
          Toast.show({
            type: 'error',
            text1: 'Incident',
            text2: 'Incident reported',
          });
          break;
        case "SOLVED":
          await markAsPickedUp(orderId);
          newStatus = "INPROGRESS";
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Incident solved',
          });
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
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.reloadButton} onPress={fetchOrders}>
          <Icon name="refresh" size={24} color="#fff" />
          <Text style={styles.reloadButtonText}>Recargar Órdenes</Text>
        </TouchableOpacity>
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
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ingrese la URL del servidor</Text>
            <TextInput
                style={styles.input}
                value={url}
                onChangeText={setUrl}
                placeholder="http://example.com"
            />
            <Button title="Actualizar URL" onPress={handleUpdateUrl} />
          </View>
        </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  reloadButton: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#007bff', // Azul
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  reloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  deliveryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
});

export default Orders;
