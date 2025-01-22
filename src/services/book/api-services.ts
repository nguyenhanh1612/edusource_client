import API_ENDPOINTS from "@/services/book/api-path";
import request from "@/services/interceptor";

export const getAllBook = async ({
  id,
  name,
  pageIndex,
  pageSize,
  category,
  gradeLevel,
}: REQUEST.GetBooks): Promise<TResponseData<API.ResponseData>> => {
  const response = await request<TResponseData<API.ResponseData>>(
    API_ENDPOINTS.GET_ALL_BOOK,
    {
      method: "GET",
      params: {
        id,
        name,
        pageIndex,
        pageSize,
        category,
        gradeLevel,
      },
    }
  );

  return response.data;
};
