import { expect } from '@wdio/globals';
import { createOrder, deleteOrder } from '../../app/api';

describe('Delivery App Tests', () => {
  let orderId: number;

  before(async () => {
    // Arrange: Crea una orden con productos específicos
    const products = [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 3 }];
    orderId = await createOrder(products);
  });

  after(async () => {
    // Tear down: Elimina la orden creada para limpiar el estado
    if (orderId) {
      await deleteOrder(orderId);
      const ordersButton = await $('//*[@text="Recargar Órdenes"]');
      await ordersButton.waitForDisplayed({ timeout: 5000 });
      await ordersButton.click();
    }
  });

  it('should open the app and display the order', async () => {
    // Act: Realiza las acciones de la prueba
    const ordersButton = await $('//*[@text="Recargar Órdenes"]');
    await ordersButton.waitForDisplayed({ timeout: 5000 });
    await ordersButton.click();

    const firstOrder = await $(`~${orderId}`);
    await firstOrder.waitForDisplayed({ timeout: 5000 });

    // Assert: Verifica que la orden creada se muestra correctamente
    expect(await firstOrder.isDisplayed()).toBe(true);
  });

  it('should change order status to in progress', async () => {
      // Act: Cambia el estado de la orden a "En progreso"
      const recogerButton = await $('//*[@text="Recoger"]');
      await recogerButton.click();

      // Assert: Verifica que el estado de la orden ha cambiado a "En progreso"
      const status = await $('//*[@text="In Progress"]');
      expect(await status.isDisplayed()).toBe(true);
    });


    it('should report an incident', async () => {
      // Act: Reporta un incidente para la orden
      const reportIncidentButton = await $('//*[@text="Reportar Incidente"]');
      await reportIncidentButton.click();

      // Assert: Verifica que el incidente ha sido reportado
      const status = await $('//*[@text="Incident"]');
      expect(await status.isDisplayed()).toBe(true);
    });

    it('should solve an incident', async () => {
      // Act: Resuelve un incidente para la orden
      const solveIncidentButton = await $('//*[@text="Solucionado"]');
      await solveIncidentButton.click();

      // Assert: Verifica que el incidente ha sido resuelto
      const status = await $('//*[@text="In Progress"]');
      expect(await status.isDisplayed()).toBe(true);
    });

    it('should change order status to delivered', async () => {
      // Act: Cambia el estado de la orden a "Entregado"
      const deliveredButton = await $('//*[@text="Entregar"]');
      await deliveredButton.click();

      // Assert: Verifica que el estado de la orden ha cambiado a "Entregado"
      const status = await $('//*[@text="Delivered"]');
      expect(await status.isDisplayed()).toBe(true);
    });

    it('should reload and update orders list when a new order comes', async () => {
      // Act: Recarga la lista de órdenes cuando llega una nueva orden
      await driver.pause(5000);
      const ordersButton = await $('//*[@text="Recargar Órdenes"]');
      await ordersButton.waitForDisplayed({ timeout: 5000 });
      await ordersButton.click();

      // Crear una nueva orden
      const newProducts = [{ productId: 3, quantity: 1 }, { productId: 1, quantity: 2 }];
      const newOrderId = await createOrder(newProducts);

      // Recarga la lista de órdenes

      await ordersButton.click();

      const newOrder = await $(`~${newOrderId}`);
      await newOrder.waitForDisplayed({ timeout: 5000 });

      // Assert: Verifica que la nueva orden se muestra en la lista
      expect(await newOrder.isDisplayed()).toBe(true);

      // Limpieza de la nueva orden creada
      await deleteOrder(newOrderId);
    });
});
