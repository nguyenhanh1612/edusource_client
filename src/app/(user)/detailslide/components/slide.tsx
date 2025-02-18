"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Backdrop } from "@/components/backdrop";
import useGetProductById from "../hooks/useGetProductById";
import { useAppSelector } from "@/stores/store";
import { Roles } from "@/const/authentication";
import usePostAddToCart from "../../exercise/hooks/useAddToCart";
import { DetailView } from "@/components/detail-view";
import useGetProductByIdByUser from "../hooks/useGetProductByIdByUser";

interface ViewDetailSlideProps {
  slideId: string;
}

export default function DetailSlide({ slideId }: ViewDetailSlideProps) {
  const { isPending, getProductByIdApi } = useGetProductById();
  const { isPending: isUserPending, getProductByIdByUserApi } = useGetProductByIdByUser();
  const [slideData, setSlideData] = useState<API.Unit | null>(null);
  const [selectedValue, setSelectedValue] = useState("");
  const router = useRouter();
  const userState = useAppSelector((state) => state.userSlice);
  const { isPending: isAddingToCart, postAddToCartApi } = usePostAddToCart();

  useEffect(() => {
    if (!slideId) {
      console.error("slideId is undefined");
      return;
    }

    const fetchProduct = async () => {
      try {
        let response;

        if (userState.user && userState.user.roleId === 2) {
          response = await getProductByIdByUserApi({ id: slideId });
        } else {
          response = await getProductByIdApi({ id: slideId });
        }

        if (response?.value?.data) {
          setSlideData(response.value.data as unknown as API.Unit);
        } else {
          router.push("/error");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [slideId, userState.user]);

  if (isPending) {
    return <Backdrop open={true} />;
  }

  if (!slideData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Sản phẩm không tồn tại hoặc đã bị xóa.</p>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!userState.user) {
      router.push("/login");
      return;
    }
    if (!slideId) {
      return;
    }
    try {
      const response = await postAddToCartApi({ productId: slideId });
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <DetailView
      data={slideData}
      onAddToCart={handleAddToCart}
      isAddingToCart={isAddingToCart}
    />
  );
}



