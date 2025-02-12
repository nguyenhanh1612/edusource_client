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
import usePostAddToCart from "../hooks/useAddToCart";

interface ViewDetailExcerciseProps {
  exerciseId: string;
}

export default function DetailExercise({ exerciseId }: ViewDetailExcerciseProps) {
  const { isPending: isProductLoading, getProductByIdApi } = useGetProductById();
  const { isPending: isAddingToCart, postAddToCartApi } = usePostAddToCart();

  const [exerciseData, setExerciseData] = useState<API.Unit | null>(null);
  const [selectedValue, setSelectedValue] = useState("");
  const router = useRouter();
  const userState = useAppSelector((state) => state.userSlice);
  

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
        const response = await getProductByIdApi({ id: exerciseId });
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
    <div className="mx-auto ">
      <div className="p-8 bg-[#669bbc]">
        <div className="relative flex flex-col bg-[#669bbc]">
          <div className="ml-20">
            <h1 className="text-2xl font-bold text-white">{exerciseData.name}</h1>
            <h2 className="text-lg text-white">{exerciseData.description}</h2>
            <p className="flex items-center gap-2 text-yellow-300 font-medium mt-2">
              {[...Array(Math.floor(exerciseData.rating))].map((_, index) => (
                <BsStarFill key={`full-${index}`} />
              ))}

              {exerciseData.rating % 1 !== 0 && <BsStarHalf />}

              {[...Array(5 - Math.ceil(exerciseData.rating))].map((_, index) => (
                <BsStar key={`empty-${index}`} />
              ))}

              <span className="ml-2 text-white">{exerciseData.rating} (100 xếp hạng)</span>
            </p>
          </div>

          <div className="grid grid-cols-3 mt-6">
            <div className="space-y-6 flex flex-col items-center">
              <div>
                <img
                  src={exerciseData.book.imageUrl}
                  alt={exerciseData.book.name}
                  className="rounded-t-xl w-full h-64"
                />
              </div>

              <div className="mt-4 space-y-2">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full max-w-sm"
                >
                  <CarouselContent>
                    {exerciseData.listImages.map((image, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <Card>
                            <img src={image} alt={`additional-image-${index + 1}`} className="w-full h-full object-contain" />
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <Button className="rounded-full bg-[#003566] w-1/2"><IoSearchOutline />Xem trước</Button>
            </div>

            <div className="mx-auto">
              <div className="mt-4 text-gray-700">
                <span className="text-white">
                  {exerciseData.book.name}
                </span>
                <div className="flex items-center gap-2">
                  <BsGraphUpArrow className="text-[#ffb154]" /> <span className="text-[#add7f6]">Chủ yếu được sử dụng với mẫu giáo và lớp 1</span>
                </div>
              </div>
              <div className="text-gray-700 flex flex-col">
                <span className="text-white">Cấp lớp</span>
                <span className="text-[#add7f6] ml-6">
                  {exerciseData.book.gradeLevel}
                </span>
              </div>
              <div className="text-gray-700 flex flex-col">
                <span className="text-white">Định dạng bao gồm</span>
                <span className="text-[#add7f6] ml-6">{exerciseData.category}</span>
              </div>
              <div className="text-gray-700 flex flex-col ">
                <span className="text-white">Số trang</span>
                <span className="text-[#add7f6] ml-6">{exerciseData.totalPage}</span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col py-16 items-center justify-center bg-[#fdf0d5] shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-[70%] rounded-md space-y-4 mx-auto">
                <h3 className="text-4xl font-semibold text-[#219ebc]">
                  {(exerciseData.price).toLocaleString("vi-VN")}<sup className="text-2xl">đ</sup>
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">Giá niêm yết:  VND</p>
                <p className="mt-2 text-sm leading-relaxed text-red-500">Bạn tiết kiệm:  VND</p>
                {!(userState.user?.roleId === Roles[2].id) && (
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="mt-3 bg-[#ffb154] text-black hover:bg-[#de9944] w-2/3 rounded-full"
                  >
                    <MdShoppingCart /> {isAddingToCart ? "Đang xử lý..." : "Thêm vào giỏ hàng"}
                  </Button>
                )}
              </div>
              <div className="flex flex-col justify-center items-center text-white space-y-4">
                <span>Chia sẻ tài nguyên này</span>
                <span className="flex gap-4">
                  <LiaFacebookF />
                  <PiThreadsLogo />
                  <PiInstagramLogo />
                </span>
                <span className="flex items-center gap-2"><CiFlag1 />Báo cáo tài nguyên này cho EduSource</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-20">
          <div className="rounded-full bg-white p-4 flex items-center gap-4 mt-8">
            <div className="ml-4">
              <img src="/images/about1.jpg" alt="" className="rounded-full w-14 h-14" />
            </div>
            <div className="flex flex-col">
              <strong>Suke</strong>
              <div className="flex items-center gap-2">

                <span>7k người theo dõi</span>
                <span><FaRegStar /></span>
                <span>Theo dõi</span>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="bg-[#fb8500] w-full text-white text-3xl text-center flex items-center justify-center space-x-4">
        <GiFlexibleStar className="text-[#219ebc]" />
        <span>Đánh giá</span>
        <GiFlexibleStar className="text-[#219ebc]" />
      </div>

      <div className="px-12">
        <Reviews />
      </div>

      <div className="space-y-4 p-12">
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tất cả xếp hạng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5 star">5 sao</SelectItem>
              <SelectItem value="4 star">4 sao</SelectItem>
              <SelectItem value="3 star">3 sao</SelectItem>
              <SelectItem value="2 star">2 sao</SelectItem>
              <SelectItem value="1 star">1 sao</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tất cả các lớp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5 star">Lớp 1</SelectItem>
              <SelectItem value="4 star">Lớp 2</SelectItem>
              <SelectItem value="3 star">Lớp 3</SelectItem>
              <SelectItem value="2 star">Lớp 4</SelectItem>
              <SelectItem value="1 star">Lớp 5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select onValueChange={(value) => setSelectedValue(value)}>
            <SelectTrigger className="w-[250px]">
              <span className="text-sm text-gray-700">
                {`Sắp xếp theo: ${selectedValue || ""}`}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Gần đây nhất">Gần đây nhất</SelectItem>
              <SelectItem value="Cũ nhất">Cũ nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <h3 className="font-bold text-xl px-12 ">Tất cả đánh giá(2)</h3>

      <div className="px-12 py-8">
        <ReviewSection />
      </div>
    </div>
  );
}



