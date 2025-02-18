"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Backdrop } from "@/components/backdrop";
import useGetProductById from "../hooks/useGetProductById";
import { useAppSelector } from "@/stores/store";
import { Roles } from "@/const/authentication";
import usePostAddToCart from "../../exercise/hooks/useAddToCart";
import { DetailView } from "@/components/detail-view";
import useGetProductByIdByUser from "../../detailslide/hooks/useGetProductByIdByUser";

interface ViewDetailTestProps {
  testId: string;
}

export default function DetailTest({ testId }: ViewDetailTestProps) {
  const { isPending: isProductLoading, getProductByIdApi } = useGetProductById();
  const { isPending: isAddingToCart, postAddToCartApi } = usePostAddToCart();

  const [testData, setTestData] = useState<API.Unit | null>(null);
  const router = useRouter();
  const userState = useAppSelector((state) => state.userSlice);
  const { isPending: isUserPending, getProductByIdByUserApi } = useGetProductByIdByUser();

  const handleAddToCart = async () => {
    if (!userState.user) {
      router.push("/login");
      return;
    }
    if (!testId) {
      return;
    }
    try {
      const response = await postAddToCartApi({ productId: testId });
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (!testId) {
      return;
    }

    const fetchProduct = async () => {
      try {
        let response;

        if (userState.user && userState.user.roleId === 2) {
          response = await getProductByIdByUserApi({ id: testId });
        } else {
          response = await getProductByIdApi({ id: testId });
        }

        if (response?.value?.data) {
          setTestData(response.value.data as unknown as API.Unit);
        } else {
          router.push("/error");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [testId]);

  if (isProductLoading) {
    return <Backdrop open={true} />;
  }

  if (!testData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Sản phẩm không tồn tại hoặc đã bị xóa.</p>
      </div>
    );
  }

  return (
    <DetailView
      data={testData}
      onAddToCart={handleAddToCart}
      isAddingToCart={isAddingToCart}
    />
  );
}