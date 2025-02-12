import { useServiceDeleteCart } from "@/services/cart/services";
import { removeFromCart } from "@/stores/cart-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function useDeleteCart() {
  const dispatch = useDispatch();
  const [isPending, setPending] = useState(false);
  const { mutate, isPending: isMutating } = useServiceDeleteCart();

  const deleteCartApi = async (params: REQUEST.DeleteCart) => {
    setPending(true);
    try {
      mutate(params, {
        onSuccess: (data) => {
          if (!params.productId) {
            console.error("productId is undefined");
            return;
          }
          dispatch(removeFromCart({ productId: params.productId }));
        },
        onError: (error) => {},
      });
    } finally {
      setPending(false);
    }
  };
  return { isPending: isPending || isMutating, deleteCartApi };
}
