import { createOrder } from "./api-services";

export const OrderService = {
  createOrder: async () => {
    try {
      const response = await createOrder();
      if (response.isSuccess && response.value.data.success) {
        return response.value.data.paymentUrl; 
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },
};