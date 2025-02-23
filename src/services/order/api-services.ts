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

export const getAllOrders = async ({
  pageIndex,
  pageSize,
}: REQUEST.GetAllOrders): Promise<TResponseData<API.ResponseDataGetAllOrders>> => {
  const response = await request<TResponseData<API.ResponseDataGetAllOrders>>(
    API_ENDPOINTS.GET_ALL_ORDERS,
    {
      method: "GET",
      params: {
        pageIndex,
        pageSize,
      }
    }
  );

  return response.data;
};