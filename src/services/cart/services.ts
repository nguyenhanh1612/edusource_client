import { useMutation } from "@tanstack/react-query";
import { addToCart, deleteCart } from "./api-services";
import useToast from "@/hooks/use-toast";

export const useServiceAddToCart = () => {
  const { addToast } = useToast();
  return useMutation<TResponse, TMeta, REQUEST.AddProductToCart>({
    mutationFn: addToCart,
    onSuccess: (data) => {
      addToast({
        type: "success",
        description: data.value.message,
        duration: 5000,
      });
    },
    onError: (error) => {
      addToast({
        type: "error",
        description: error?.detail,
        duration: 5000,
      });
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
      );
    },
    onError: (error) => {
      addToast({
        type: "error",
        description: error?.detail,
        duration: 5000,
      });
    },
  });
};
