import useToast from "@/hooks/use-toast";
import { getAllProduct, getAllProductByUser } from "@/services/product/api-services";
import { isTResponseData } from "@/utils/compare";
import { useRef, useState } from "react";

export default function useGetAllProductByUser() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);
  const hasFetchedData = useRef(false);

  const getAllProductByUserApi = async (params: REQUEST.GetProductByUser) => {
    setPending(true);
    try {
      const res = await getAllProductByUser(params);
      if (isTResponseData(res)) {
        return res as TResponseData<API.ResponseDataProductByUser>;
      } else {
        addToast({
          type: "error",
          description: "Failed to fetch books",
        });
        return null;
      }
    } catch (error) {
      addToast({
        type: "error",
        description: "An error occurred while fetching books",
      });
      return null;
    } finally {
      setPending(false);
    }
  };

  return { isPending, getAllProductByUserApi };
}
