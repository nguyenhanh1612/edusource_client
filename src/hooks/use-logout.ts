import { useServiceLogout } from "@/services/auth/services";
import { resetCart } from "@/stores/cart-slice";
import { RootState } from "@/stores/store";
import { useDispatch, useSelector } from "react-redux";

export default function useLogout() {
  const { mutate, isPending } = useServiceLogout();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cartSlice);

  const handleLogout = () => {
    try {
      if (cart.items.length > 0) {
        localStorage.setItem("cartBackup", JSON.stringify(cart));
      }
      dispatch(resetCart());
      mutate();
    } catch (err) {
      location.href = "/";
    }
  };
  return {
    isPending,
    handleLogout,
  };
}
