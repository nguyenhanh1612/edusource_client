import useToast from "@/hooks/use-toast";
import { getAllOrders } from "@/services/order/api-services";
import { isTResponseData } from "@/utils/compare";
import { useRef, useState } from "react";

export default function useGetAllOrders() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);
  const hasFetchedData = useRef(false);

  const getAllOrdersApi = async (params: REQUEST.GetAllOrders) => {
    setPending(true);
    try {
      const res = await getAllOrders(params);
      if (isTResponseData(res)) {
        return res as TResponseData<API.ResponseDataGetAllOrders>;
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

  return { isPending, getAllOrdersApi };
}
