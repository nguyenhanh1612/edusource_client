import API_ENDPOINTS from "@/services/product/api-path";
import request from "@/services/interceptor";

export const getAllProduct = async ({
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
  IsPublic,
  IsApproved,
  BookId,
  pageIndex,
  pageSize,
}: REQUEST.GetProduct): Promise<TResponseData<API.ResponseDataProduct>> => {
  const response = await request<TResponseData<API.ResponseDataProduct>>(
    API_ENDPOINTS.GET_ALL_PRODUCTS,
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
        IsPublic,
        IsApproved,
        BookId,
        pageIndex,
        pageSize,
      },
    }
  );

  return response.data;
};

export const getProductById = async ({
  id,
}: REQUEST.GetProductById): Promise<TResponseData<API.ResponseDataUnit>> => {
  const response = await request<TResponseData<API.ResponseDataUnit>>(
    API_ENDPOINTS.GET_PRODUCT_BY_ID,
    {
      method: "GET",
      params: {
        id,
      },
    }
  );

  return response.data;
};

export const createProduct = async (body: FormData) => {
  const response = await request<TResponse>(API_ENDPOINTS.POST_CREATE_PRODUCT, {
    method: "POST",
    data: body,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};