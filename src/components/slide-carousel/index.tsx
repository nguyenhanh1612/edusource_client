"use client";
import React from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { useAppSelector } from "@/stores/store";
import { Roles } from "@/const/authentication";
import { useRouter } from "next/navigation";

interface CardComponentProps {
  slideId: string;
  product: API.Product;
  setIsPending: (value: boolean) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ slideId, product, setIsPending }) => {
  const userState = useAppSelector((state) => state.userSlice);
  const router = useRouter();

  const isPurchased = product.isPurchased;

  const handleNavigateToDetail = async () => {
    setIsPending(true); 
    router.push(`/detailslide/${slideId}`);
  };

  const handleBuyClick = () => {
    if (!userState.user?.roleId) {
      router.push("/login");
    } else if (userState.user.roleId === 2) {
      localStorage.setItem("selectedProducts", JSON.stringify([product]));
      router.push("/checkout");
    }
  };

  return (
    <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl p-4">
      <div onClick={handleNavigateToDetail} className="block cursor-pointer">
        <div className="relative overflow-hidden rounded-xl bg-gray-200">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h5 className="font-semibold text-xl text-gray-900 text-center">{product.name}</h5>
        <p className="text-gray-600 text-center text-sm mt-1">({product.description})</p>
        <div className="flex flex-col items-center mt-2">
          <p className="flex items-center gap-1.5 text-base text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5 text-yellow-500"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              ></path>
            </svg>
            {product.rating} đánh giá
          </p>
          <p className="text-sm text-gray-700 flex items-center gap-1">
            <IoCheckmarkOutline className="text-[#ffd15d]" />
            {product.unit} đơn vị
          </p>
          <span className="text-sm text-gray-700">Bởi <span className="text-orange-400 font-medium">EduSource</span></span>
        </div>

        <div className="mt-auto">
          {isPurchased ? (
            <div className="w-full bg-gray-400 py-3.5 text-white rounded-full mt-4 text-xl text-center">
              Đã mua
            </div>
          ) : userState.user?.roleId === 3 ? null : (
            <button className="w-full bg-[#219ebc] py-3.5 text-white rounded-full mt-4 text-xl transition-all duration-300 ease-in-out hover:bg-[#1a7a8f] hover:scale-105"
              onClick={handleBuyClick}
            >
              Mua ngay
            </button>
          )}
        </div>
      </div>
    </div>

  );
};

export default CardComponent;