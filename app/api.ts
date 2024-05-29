import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:8080',
});

export interface Delivery {
  id: number;
  description: string;
}

export const getDeliveries = async (): Promise<Delivery[]> => {
  try {
    const response = await api.get<Delivery[]>('/deliveries');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const markAsDelivered = async (deliveryId: number): Promise<void> => {
  try {
    await api.post(`/deliveries/${deliveryId}/delivered`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
