import API_ENDPOINTS from "@/services/cart/api-path";
import request from "@/services/interceptor";

export const getAllProductCart = async ({
  name,
  price,
  category,
  description,
  ContentType,
  Unit,
  UploadType,
  TotalPage,
  Size,
  Rating,
  BookId,
  pageIndex,
  pageSize,
}: REQUEST.GetProductFromCart): Promise<TResponseData<API.ProductCart>> => {
  const response = await request<TResponseData<API.ProductCart>>(
    API_ENDPOINTS.GET_ALL_PRODUCTS_FROM_CART,
    {
      method: "GET",
      params: {
        name,
        price,
        category,
        description,
        ContentType,
        Unit,
        UploadType,
        TotalPage,
        Size,
        Rating,
        BookId,
        pageIndex,
        pageSize,
      },
    }
  );

  return response.data;
};

export const addToCart = async (body: REQUEST.AddProductToCart) => {
  const response = await request<TResponse>(API_ENDPOINTS.ADD_PRODUCT_TO_CART, {
    method: "POST",
    data: body,
  });
  return response.data;
};

export const deleteCart = async (body: REQUEST.DeleteCart) => {
  const response = await request<TResponse>(
    API_ENDPOINTS.REMOVE_PRODUCT_FROM_CART,
    {
      method: "DELETE",
      data: body,
    }
  );
  return response.data;
};
