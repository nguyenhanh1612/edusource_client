import { useServiceAddToCart } from "@/services/cart/services";
import { addToCart } from "@/stores/cart-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function usePostAddToCart() {
  const dispatch = useDispatch();
  const [isPending, setPending] = useState(false);
  const { mutate, isPending: isMutating } = useServiceAddToCart();

  const postAddToCartApi = async (params: REQUEST.AddProductToCart) => {
    setPending(true);
    try {
      mutate(params, {
        onSuccess: (data) => {
          if (!params.productId) {
            console.error("productId is undefined");
            return;
          }
          dispatch(addToCart({ productId: params.productId, quantity: 1 }));
        },
        onError: (error) => {},
      });
    } finally {
      setPending(false);
    }
  };
  return { isPending: isPending || isMutating, postAddToCartApi };
}
