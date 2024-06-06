import axios from 'axios';

let api = axios.create({
  baseURL: 'http://192.168.0.156:8082',
});

export interface Order {
    id: number;
    userAddress: string;
    status: string;
    warehouseDirection: string;
    products: { id: number; name: string; quantity: number }[];
}

export const setURL = (url: string) => {
    api = axios.create({
        baseURL: url,
    });
}

export const getOrders = async (): Promise<Order[]> => {
    const promises = [];
    for (let id = 1; id <= 25; id++) {
    promises.push(api.get<Order[]>(`/order/${id}`));
    }
    const responses = await Promise.all(promises);
    return responses
        .map(response => response.data)
        .flat()
        .filter(order => order.id !== undefined)
        .reverse();
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
