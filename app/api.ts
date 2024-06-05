import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082',
});

export interface Order {
  id: number;
  description: string;
}

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get<Order[]>('/order/1');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const markAsDelivered = async (orderId: number): Promise<void> => {
  try {
    await api.post(`/order/${orderId}/complete`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const markAsPickedUp = async (orderId: number): Promise<void> => {
    try {
        await api.post(`/order/${orderId}/take`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const markIncident = async (orderId: number): Promise<void> => {
    try {
        await api.post(`/order/${orderId}/incident`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
