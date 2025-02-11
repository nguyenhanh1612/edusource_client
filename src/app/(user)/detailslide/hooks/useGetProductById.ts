import useToast from "@/hooks/use-toast";
import { getProductById } from "@/services/product/api-services";
import { isTResponseData } from "@/utils/compare";
import { useRef, useState } from "react";

export default function useGetProductById() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);
  const hasFetchedData = useRef(false);

  const getProductByIdApi = async (params: REQUEST.GetProductById) => {
    setPending(true);
    try {
      const res = await getProductById(params);
      if (isTResponseData(res)) {
        return res as TResponseData<API.ResponseDataUnit>;
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

  return { isPending, getProductByIdApi };
}
