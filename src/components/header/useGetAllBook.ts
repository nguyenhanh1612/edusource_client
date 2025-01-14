import useToast from "@/hooks/use-toast";
import { getAllBook } from "@/services/book/api-services";
import { isTResponseData } from "@/utils/compare";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

export default function useGetAllBook() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);
  const hasFetchedData = useRef(false);

  const getAllBookApi = async (params: REQUEST.GetBooks) => {
    setPending(true);
    try {
      const res = await getAllBook(params);
      if (isTResponseData(res)) {
        return res as TResponseData<API.ResponseData>;
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

  return { isPending, getAllBookApi };
}
