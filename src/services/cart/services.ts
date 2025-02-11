import { useMutation } from "@tanstack/react-query";
import { addToCart, deleteCart } from "./api-services";
import useToast from "@/hooks/use-toast";

export const useServiceAddToCart = () => {
  return useMutation<TResponse, TMeta, REQUEST.AddProductToCart>({
    mutationFn: addToCart,
    onSuccess: (data) => {
      console.log("Thêm giỏ hàng thành công", data);
    },
  });
};

export const useServiceDeleteCart = () => {
  const { addToast } = useToast();
  return useMutation<TResponse, TMeta, REQUEST.DeleteCart>({
    mutationFn: deleteCart,
    onSuccess: (data) => {
      addToast(
        {
          type: "success",
          description: data.value.message,
          duration: 5000,
        },
        false
      );
    },
    onError: () => {
      addToast({
        type: "error",
        description: "Please try again!",
        duration: 5000,
      });
    },
  });
};
