"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Backdrop } from "@/components/backdrop";
import useGetProductById from "../hooks/useGetProductById";
import { Button } from "@/components/ui/button";
import { MdShoppingCart } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { GiFlexibleStar } from "react-icons/gi";
import { Card, CardContent } from "@/components/ui/card"
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import { LiaFacebookF } from "react-icons/lia";
import { PiThreadsLogo } from "react-icons/pi";
import { PiInstagramLogo } from "react-icons/pi";
import { CiFlag1 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
import Reviews from "@/components/reviews";
import ReviewSection from "@/components/reviews-section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppSelector } from "@/stores/store";
import { Roles } from "@/const/authentication";
import usePostAddToCart from "../../exercise/hooks/useAddToCart";
import { DetailView } from "@/components/detail-view";

interface ViewDetailSlideProps {
  slideId: string;
}

export default function DetailSlide({ slideId }: ViewDetailSlideProps) {
  const { isPending, getProductByIdApi } = useGetProductById();
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
        const response = await getProductByIdApi({ id: slideId });
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
  }, [slideId]);

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



