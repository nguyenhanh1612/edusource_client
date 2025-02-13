import useToast from "@/hooks/use-toast";
import { getAllProduct } from "@/services/product/api-services";
import { isTResponseData } from "@/utils/compare";
import { useRef, useState } from "react";

export default function useGetAllProduct() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);
  const hasFetchedData = useRef(false);

  const getAllProductApi = async (params: REQUEST.GetProduct) => {
    setPending(true);
    try {
      const res = await getAllProduct(params);
      if (isTResponseData(res)) {
        return res as TResponseData<API.ResponseDataProduct>;
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

  return { isPending, getAllProductApi };
}
