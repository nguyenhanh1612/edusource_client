import useToast from "@/hooks/use-toast";
import { getAllProductCart } from "@/services/cart/api-services";
import { isTResponseData } from "@/utils/compare";
import { useRef, useState } from "react";

export default function useGetAllProductCart() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);
  const hasFetchedData = useRef(false);

  const getAllProductCartApi = async (params: REQUEST.GetProductFromCart) => {
    setPending(true);
    try {
      const res = await getAllProductCart(params);
      if (isTResponseData(res)) {
        return res as TResponseData<API.ResponseDataProductCart>;
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

  return { isPending, getAllProductCartApi };
}
