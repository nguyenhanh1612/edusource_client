"use client";
import React from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { useAppSelector } from "@/stores/store";
import { Roles } from "@/const/authentication";

interface CardComponentProps {
  slideId: string;
  product: API.Product;

}

const CardComponent: React.FC<CardComponentProps> = ({ slideId, product }) => {
  const userState = useAppSelector((state) => state.userSlice);

  return (
    <Link href={`/detailslide/${slideId}`}>
      <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-xl"
          />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h5 className="font-semibold text-2xl text-center text-gray-900">{product.name}</h5>
            <h5 className="font-medium text-lg text-center text-gray-600">({product.description})</h5>
          </div>
          <div className="flex flex-col justify-center ml-16">
            <span className="text-gray-700">Bao gồm:</span>
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
            <div className="flex items-center gap-2">
              <IoCheckmarkOutline className="text-[#ffd15d]" />
              <p className="text-base text-gray-700">{product.unit} unit</p>
            </div>
            <span>Bởi <span className="text-orange-400 font-medium">EduSource</span></span>
          </div>
          {!(userState.user?.roleId === Roles[0].id || userState.user?.roleId === Roles[2].id) && (
            <button className="w-full bg-[#219ebc] py-3.5 text-white rounded-full mt-4 text-xl transition-all duration-300 ease-in-out hover:bg-[#1a7a8f] hover:scale-105">
              Mua ngay
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardComponent;