import axios from 'axios';

let deliveryApi = axios.create({
    baseURL: 'http://192.168.0.156:8082',
});

let controlTowerApi = axios.create({
    baseURL: 'http://192.168.0.156:8080',
});

let warehouseApi = axios.create({
    baseURL: 'http://192.168.0.156:8081',
});

export interface Order {
    id: number;
    userAddress: string;
    status: string;
    warehouseDirection: string;
    products: { id: number; name: string; quantity: number }[];
}

export const setURL = (url: string) => {
    deliveryApi = axios.create({
        baseURL: url,
    });
}

export const getOrders = async (): Promise<Order[]> => {
    const response = await deliveryApi.get<Order[]>(`/order/all`);
    return response.data.reverse();
};

export const markAsDelivered = async (orderId: number): Promise<void> => {
    try {
    await deliveryApi.post(`/order/${orderId}/complete`);
    } catch (error) {
    console.error(error);
    throw error;
    }
};

export const markAsPickedUp = async (orderId: number): Promise<void> => {
    try {
        await deliveryApi.post(`/order/${orderId}/take`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const markIncident = async (orderId: number): Promise<void> => {
    try {
        await deliveryApi.post(`/order/${orderId}/incident`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const addStock = async (productId: number, quantity: number): Promise<void> => {
    try {
        await warehouseApi.put(`/product/${productId}`, { id:productId, addedQuantity:quantity });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const checkout = async (products: { productId: number, quantity: number }[]): Promise<number> => {
    try {
        return await controlTowerApi.post(`/order/checkout`, {
            products: products,
            direction: 'Calle 123'
        }).then(response => response.data.id);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const markOrderReadyForPickup = async (orderId: number): Promise<void> => {
    try {
        await warehouseApi.put(`/order/ready-for-pickup/${orderId}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createOrder = async (products: { productId: number, quantity: number }[]): Promise<number> => {
    try {
        products.map(product => addStock(product.productId, product.quantity));
        const orderId = await checkout(products);
        await markOrderReadyForPickup(orderId);
        return orderId;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteOrder = async (orderId: number): Promise<void> => {
    try {
        await controlTowerApi.delete(`/order/${orderId}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
