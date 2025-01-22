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
