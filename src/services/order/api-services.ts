import API_ENDPOINTS from "./api-path";
import request from "@/services/interceptor";

export const createOrder = async (): Promise<
  TResponseData<{ success: boolean; paymentUrl: string; message: string }>
> => {
  const response = await request<
    TResponseData<{ success: boolean; paymentUrl: string; message: string }>
  >(API_ENDPOINTS.POST_CREATE_ORDER, {
    method: "POST",
  });
  return response.data;
};

export const getAllOrders = async ({
  SortType,
  IsSortASC,
  pageIndex,
  pageSize,
}: REQUEST.GetAllOrders): Promise<
  TResponseData<API.ResponseDataGetAllOrders>
> => {
  const response = await request<TResponseData<API.ResponseDataGetAllOrders>>(
    API_ENDPOINTS.GET_ALL_ORDERS,
    {
      method: "GET",
      params: {
        SortType,
        IsSortASC,
        pageIndex,
        pageSize,
      },
    }
  );

  return response.data;
};

export const getDashboard = async ({
  month,
  year,
  week,
}: REQUEST.GetDashboard): Promise<
  TResponseData<API.TDashboardData>
> => {
  const response = await request<TResponseData<API.TDashboardData>>(
    API_ENDPOINTS.GET_DASH_BOARD,
    {
      method: "GET",
      params: {
        month,
        year,
        week,
      },
    }
  );

  return response.data;
};
