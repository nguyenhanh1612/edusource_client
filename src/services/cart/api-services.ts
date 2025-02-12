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
}: REQUEST.GetProductFromCart): Promise<TResponseData<API.ResponseDataProductCart>> => {
  const response = await request<TResponseData<API.ResponseDataProductCart>>(
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

export const addToCart = async ({
  productId,
}: REQUEST.AddProductToCart): Promise<TResponseData> => {
  const response = await request<TResponseData>(
    API_ENDPOINTS.ADD_PRODUCT_TO_CART,
    {
      method: "POST",
      params: {
        productId
      },
    }
  );

  return response.data;
};


export const deleteCart = async ({
  productId,
}: REQUEST.DeleteCart): Promise<TResponseData> => {
  const response = await request<TResponseData>(
    API_ENDPOINTS.REMOVE_PRODUCT_FROM_CART,
    {
      method: "DELETE",
      params: {
        productId
      },
    }
  );
  return response.data;
};