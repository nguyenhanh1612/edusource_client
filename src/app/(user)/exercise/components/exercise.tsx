"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Backdrop } from "@/components/backdrop";
import useGetProductById from "../hooks/useGetProductById";
import { useAppSelector } from "@/stores/store";
import { Roles } from "@/const/authentication";
import usePostAddToCart from "../../exercise/hooks/useAddToCart";
import { DetailView } from "@/components/detail-view";
import { useDispatch } from "react-redux";
import useGetProductByIdByUser from "../../detailslide/hooks/useGetProductByIdByUser";

interface ViewDetailExcerciseProps {
  exerciseId: string;
}

export default function DetailTest({ exerciseId }: ViewDetailExcerciseProps) {
  const { isPending: isProductLoading, getProductByIdApi } = useGetProductById();
  const { isPending: isAddingToCart, postAddToCartApi } = usePostAddToCart();
  const [exerciseData, setExerciseData] = useState<API.Unit | null>(null);
  const router = useRouter();
  const userState = useAppSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const { isPending: isUserPending, getProductByIdByUserApi } = useGetProductByIdByUser();

  const handleAddToCart = async () => {
    if (!userState.user) {
      router.push("/login");
      return;
    }
    if (!exerciseId) {
      return;
    }
    try {
      const response = await postAddToCartApi({ productId: exerciseId });
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (!exerciseId) {
      return;
    }

    const fetchProduct = async () => {
     try {
        let response;

        if (userState.user && userState.user.roleId === 2) {
          response = await getProductByIdByUserApi({ id: exerciseId });
        } else {
          response = await getProductByIdApi({ id: exerciseId });
        }

        if (response?.value?.data) {
          setExerciseData(response.value.data as unknown as API.Unit);
        } else {
          router.push("/error");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [exerciseId]);

  if (isProductLoading) {
    return <Backdrop open={true} />;
  }

  if (!exerciseData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Sản phẩm không tồn tại hoặc đã bị xóa.</p>
      </div>
    );
  }

  return (
    <DetailView
      data={exerciseData}
      onAddToCart={handleAddToCart}
      isAddingToCart={isAddingToCart}
    />
  );
}