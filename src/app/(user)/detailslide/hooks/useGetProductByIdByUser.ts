import useToast from "@/hooks/use-toast";
import { getProductById, getProductByIdByUser } from "@/services/product/api-services";
import { isTResponseData } from "@/utils/compare";
import { useRef, useState } from "react";

export default function useGetProductByIdByUser() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);
  const hasFetchedData = useRef(false);

  const getProductByIdByUserApi = async (params: REQUEST.GetProductByIdByUser) => {
    setPending(true);
    try {
      const res = await getProductByIdByUser(params);
      if (isTResponseData(res)) {
        console.log(res);
        return res as TResponseData<API.ResponseDataUnitByUser>;
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

  return { isPending, getProductByIdByUserApi };
}
