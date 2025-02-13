import { useServiceLogout } from "@/services/auth/services";
import { resetCart } from "@/stores/cart-slice";
import { useDispatch } from "react-redux";

export default function useLogout() {
  const { mutate, isPending } = useServiceLogout();
  const dispatch = useDispatch();
  const handleLogout = () => {
    try {
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
