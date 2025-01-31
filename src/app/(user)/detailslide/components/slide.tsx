"use client";
import { Backdrop } from "@/components/backdrop";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import { LiaFacebookF } from "react-icons/lia";
import { PiThreadsLogo } from "react-icons/pi";
import { PiInstagramLogo } from "react-icons/pi";
import { CiFlag1 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
interface SlideData {
  slideId: string;
  title: string;
  subtitle: string;
  nameBook: string;
  gradeLevel: string;
  formatInclude: string;
  page: number;
  mainImage: string;
  additionalImages: string[];
  price: number;
  originalPrice: number;
  discountPrice: number;
  rating: number;
  features: string[];
}

interface ViewDetailSlideProps {
  slideId: string;
}

const mockData: SlideData[] = [
  {
    slideId: "1",
    title: "Bài giảng Family and Friends 2",
    subtitle: "(phiên bản 15 bài)",
    nameBook: "Family and Friends 2",
    gradeLevel: "Cấp 2",
    formatInclude: "PDF, Video",
    page: 15,
    mainImage: "/images/about1.jpg",
    additionalImages: ["/images/about1.jpg", "/images/about1.jpg", "/images/about1.jpg", "/images/about1.jpg", "/images/about1.jpg"],
    price: 200000,
    originalPrice: 300000,
    discountPrice: 250000,
    rating: 5.0,
    features: ["15 đơn vị", "Bảng câu hỏi kỹ năng"],
  },
  {
    slideId: "2",
    title: "Bài giảng Tiếng Anh 4",
    subtitle: "(phiên bản 20 bài)",
    nameBook: "Tiếng Anh 4",
    gradeLevel: "Cấp 1",
    formatInclude: "PDF, Audio",
    page: 20,
    mainImage: "https://example.com/image2.jpg",
    additionalImages: ["https://example.com/image2_1.jpg", "https://example.com/image2_2.jpg"],
    price: 180000,
    originalPrice: 250000,
    discountPrice: 220000,
    rating: 4.8,
    features: ["20 đơn vị", "Bảng kiểm tra kiến thức"],
  },
  {
    slideId: "3",
    title: "Bài giảng Tiếng Anh 5",
    subtitle: "(phiên bản 25 bài)",
    nameBook: "Tiếng Anh 5",
    gradeLevel: "Cấp 1",
    formatInclude: "PDF, Audio, Video",
    page: 25,
    mainImage: "https://example.com/image3.jpg",
    additionalImages: ["https://example.com/image3_1.jpg", "https://example.com/image3_2.jpg"],
    price: 250000,
    originalPrice: 350000,
    discountPrice: 300000,
    rating: 4.7,
    features: ["25 đơn vị", "Bảng bài tập nâng cao"],
  },
];

export default function DetailSlide({ slideId }: ViewDetailSlideProps) {
  const [slideData, setSlideData] = useState<SlideData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSlideDetails = () => {
      const selectedSlide = mockData.find((slide) => slide.slideId === slideId);

      if (selectedSlide) {
        setSlideData(selectedSlide);
      } else {
        router.push("/error");
      }

      setLoading(false);
    };

    fetchSlideDetails();
  }, [slideId, router]);

  if (loading) {
    return <Backdrop open={loading} />;
  }

  if (!slideData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Slide không tồn tại hoặc đã bị xóa.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-8 bg-[#669bbc]">
      <div className="relative flex flex-col bg-[#669bbc]">
        <div className="ml-20">
          <h1 className="text-2xl font-bold text-white">{slideData.title}</h1>
          <h2 className="text-lg text-white">{slideData.subtitle}</h2>
          <p className="flex items-center gap-2 text-yellow-300 font-medium mt-2">
            {[...Array(Math.floor(slideData.rating))].map((_, index) => (
              <BsStarFill key={`full-${index}`} />
            ))}

            {slideData.rating % 1 !== 0 && <BsStarHalf />}

            {[...Array(5 - Math.ceil(slideData.rating))].map((_, index) => (
              <BsStar key={`empty-${index}`} />
            ))}

            <span className="ml-2 text-white">{slideData.rating} (100 xếp hạng)</span>
          </p>
        </div>

        <div className="grid grid-cols-3 mt-6">
          <div className="space-y-6 flex flex-col items-center">
            <div>
              <img
                src={slideData.mainImage}
                alt={slideData.title}
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
                  {slideData.additionalImages.map((image, index) => (
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
                {slideData.nameBook}
              </span>
              <div className="flex items-center gap-2">
                <BsGraphUpArrow className="text-[#ffb154]" /> <span className="text-[#add7f6]">Chủ yếu được sử dụng với mẫu giáo và lớp 1</span>
              </div>
            </div>
            <div className="text-gray-700 flex flex-col">
              <span className="text-white">Cấp lớp</span>
              <span className="text-[#add7f6] ml-6">
                {slideData.gradeLevel}
              </span>
            </div>
            <div className="text-gray-700 flex flex-col">
              <span className="text-white">Định dạng bao gồm</span>
              <span className="text-[#add7f6] ml-6">{slideData.formatInclude}</span>
            </div>
            <div className="text-gray-700 flex flex-col ">
              <span className="text-white">Số trang</span>
              <span className="text-[#add7f6] ml-6">{slideData.page}</span>
            </div>
          </div>



          <div className="space-y-8">
            <div className="flex flex-col py-16 items-center justify-center bg-[#fdf0d5] shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-[70%] rounded-md space-y-4 mx-auto">
              <h3 className="text-4xl font-semibold text-[#219ebc]">{slideData.price} VND</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">Giá niêm yết: {slideData.originalPrice} VND</p>
              <p className="mt-2 text-sm leading-relaxed text-red-500">Bạn tiết kiệm: {slideData.discountPrice} VND</p>
              <Button className="mt-3 bg-[#ffb154] text-black hover:bg-[#de9944] w-2/3 rounded-full"><MdShoppingCart />Thêm vào giỏ hàng</Button>
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

  );
}
