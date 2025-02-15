import API_ENDPOINTS from "./api-path";
import request from "@/services/interceptor";

export const createOrder = async (): Promise<TResponseData<{ success: boolean; paymentUrl: string; message: string }>> => {
  const response = await request<TResponseData<{ success: boolean; paymentUrl: string; message: string }>>(
    API_ENDPOINTS.POST_CREATE_ORDER,
    {
      method: "POST", 
    }
  );
  return response.data;
};