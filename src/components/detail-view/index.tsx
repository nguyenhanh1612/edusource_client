import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MdShoppingCart } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { GiFlexibleStar } from "react-icons/gi";
import { Card, CardContent } from "@/components/ui/card";
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
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/stores/store";
import { Roles } from "@/const/authentication";
import { categoryType, contentType, uploadType } from "@/const/product";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import PdfViewer from "../pdf_viewer";
import ReviewForm from "../review-form";
interface DetailViewProps {
  data: API.Unit;
  onAddToCart: () => void;
  isAddingToCart: boolean;

}

export function DetailView({ data, onAddToCart, isAddingToCart }: DetailViewProps) {
  const userState = useAppSelector((state) => state.userSlice);
  const [showPdf, setShowPdf] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const galleryRef = useRef<HTMLDivElement>(null);
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!galleryRef.current) return;

    let lightbox = new PhotoSwipeLightbox({
      gallery: galleryRef.current,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const getCategoryType = (id: number) => categoryType.find((item) => item.id === id)?.type || "Không xác định";
  const getContentType = (id: number) => contentType.find((item) => item.id === id)?.type || "Không xác định";
  const getUploadType = (id: number) => uploadType.find((item) => item.id === id)?.type || "Không xác định";

  const [reviews, setReviews] = useState([
    {
      "id": 1,
      "name": "Trần Minh Đức",
      "avatar": "https://randomuser.me/api/portraits/men/10.jpg",
      "date": "21 tháng 2 năm 2025",
      "rating": 5,
      "comment": "Tài liệu rất bổ ích và đầy đủ, đa dạng"
    }    
  ]);

  const addReview = (newReview: any) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]); 
  };

  return (
    <div className="mx-auto">
      <div className="p-8 bg-[#669bbc]">
        <div className="relative flex flex-col bg-[#669bbc] mt-28 bg-[url('/images/BG_2.png')]">
          <div className="ml-20">
            <h1 className="text-2xl font-bold text-white">{data.name}</h1>
            <h2 className="text-lg text-white">{data.description}</h2>
            <p className="flex items-center gap-2 text-yellow-300 font-medium mt-2">
              {[...Array(Math.floor(data.rating))].map((_, index) => (
                <BsStarFill key={`full-${index}`} />
              ))}

              {data.rating % 1 !== 0 && <BsStarHalf />}

              {[...Array(5 - Math.ceil(data.rating))].map((_, index) => (
                <BsStar key={`empty-${index}`} />
              ))}

              <span className="ml-2 text-white">{data.rating} (100 xếp hạng)</span>
            </p>
          </div>

          <div className="grid grid-cols-3 mt-6">
            <div className="space-y-6 flex flex-col items-center">
              <div>
                <img
                  src={data.book.imageUrl}
                  alt={data.book.name}
                  className="rounded-t-xl w-full h-64"
                />
              </div>

              <div className="mt-4 space-y-2">
                {data.listImages.length === 1 ? (
                  // Hiển thị ảnh đơn
                  <div ref={galleryRef} className="p-1 w-full max-w-sm">
                    <Card className="overflow-hidden rounded-lg h-32 flex items-center justify-center">
                      <a href={data.listImages[0]} data-pswp-width="1200" data-pswp-height="800">
                        <img
                          src={data.listImages[0]}
                          alt="single-image"
                          className="w-full h-32 object-cover cursor-pointer rounded-lg"
                        />
                      </a>
                    </Card>
                  </div>
                ) : data.listImages.length <= 3 ? (
                  // Hiển thị toàn bộ ảnh nếu <= 3 ảnh
                  <div ref={galleryRef} className="grid grid-cols-3 gap-2 w-full max-w-sm">
                    {data.listImages.map((image, index) => (
                      <div key={index} className="p-1">
                        <Card className="overflow-hidden rounded-lg h-32 flex items-center justify-center">
                          <a href={image} data-pswp-width="1200" data-pswp-height="800">
                            <img
                              src={image}
                              alt={`image-${index}`}
                              className="w-full h-32 object-cover cursor-pointer rounded-lg"
                            />
                          </a>
                        </Card>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Dùng Carousel nếu có từ 4 ảnh trở lên
                  <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
                    <CarouselContent ref={galleryRef}>
                      {data.listImages.map((image, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                          <div className="p-1">
                            <Card className="overflow-hidden rounded-lg h-32 flex items-center justify-center">
                              <a href={image} data-pswp-width="1200" data-pswp-height="800">
                                <img
                                  src={image}
                                  alt={`image-${index}`}
                                  className="w-full h-32 object-cover cursor-pointer rounded-lg"
                                />
                              </a>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                )}
              </div>

              <div className="w-2/4">
                <button
                  className="rounded-full bg-[#003566] text-white px-4 py-2 w-full flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-110 active:scale-95"
                  onClick={() => {
                    if (!data.isPurchased) {
                      alert("Bạn chỉ có thể xem trước 3 trang. Mua khóa học để xem toàn bộ!");
                    }
                    setShowPreview(true);
                  }}
                >
                  <IoSearchOutline />
                  Xem trước
                </button>

                {showPreview && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <button
                      className="absolute top-5 right-5 text-white text-3xl z-50"
                      onClick={() => setShowPreview(false)}
                    >
                      ✖
                    </button>
                    <div className="relative w-[80%] h-[95%] bg-white shadow-lg overflow-hidden">
                      <PdfViewer fileUrl={data.fileUrl} isPurchased={data.isPurchased} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mx-auto">
              <div className="mt-4 text-gray-700">
                <span className="text-white">
                  {data.book.name}
                </span>
                <div className="flex items-center gap-2">
                  <BsGraphUpArrow className="text-[#ffb154]" /> <span className="text-[#add7f6]">Chủ yếu được sử dụng với mẫu giáo và lớp 1</span>
                </div>
              </div>
              <div className="text-gray-700 flex flex-col">
                <span className="text-white">Cấp lớp</span>
                <span className="text-[#add7f6] ml-6">
                  {data.book.gradeLevel}
                </span>
              </div>
              <div className="text-gray-700 flex flex-col">
                <span className="text-white">Định dạng bao gồm</span>
                <span className="text-[#add7f6] ml-6">{getUploadType(data.uploadType)}</span>
              </div>
              <div className="text-gray-700 flex flex-col ">
                <span className="text-white">Số trang</span>
                <span className="text-[#add7f6] ml-6">{data.totalPage}</span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col py-16 items-center justify-center bg-[#fdf0d5] shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-[70%] rounded-md space-y-4 mx-auto">
                <h3 className="text-4xl font-semibold text-[#219ebc]">
                  {data.price.toLocaleString("vi-VN")}<sup className="text-2xl">đ</sup>
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  Giá niêm yết: <s>{(data.price * 1.2).toLocaleString("vi-VN")} đ</s>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-red-500">
                  Bạn tiết kiệm: {(data.price * 0.2).toLocaleString("vi-VN")} đ
                </p>
                {!(userState.user?.roleId === Roles[2].id) && (
                  data.isPurchased ? (
                    <a
                      href={data.fileUrl}
                      download
                      className="mt-3 bg-green-500 text-white hover:bg-green-600 w-2/3 rounded-full flex items-center justify-center py-2"
                    >
                      📥 Tải xuống
                    </a>
                  ) : (
                    <Button
                      onClick={onAddToCart}
                      disabled={isAddingToCart}
                      className="mt-3 bg-[#ffb154] text-black hover:bg-[#de9944] w-2/3 rounded-full flex items-center justify-center"
                    >
                      <MdShoppingCart /> {isAddingToCart ? "Đang xử lý..." : "Thêm vào giỏ hàng"}
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="px-20">
          <div className="rounded-full bg-white p-4 flex items-center gap-4 mt-8">
            <div className="ml-4">
              <img src="/images/logo1.png" alt="" className="rounded-full w-14 h-14" />
            </div>
            <div className="flex flex-col">
              <strong>EduSource</strong>
              <div className="flex items-center gap-2">
                <span>7k người theo dõi</span>
                <span><FaRegStar /></span>
                <span>Theo dõi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        ref={ref1}
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ duration: 0.7 }}
        className="bg-[#fb8500] w-full text-white text-3xl text-center flex items-center justify-center p-4 overflow-hidden"
      >
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex items-center w-full"
        >
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4 px-4">
              <GiFlexibleStar className="text-[#219ebc]" />
              <span>Đánh giá</span>
              <GiFlexibleStar className="text-[#219ebc]" />
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="bg-white pt-4">
        <div className="px-12">
          <Reviews />
        </div>

        <div className="space-y-4 p-12 bg-[url('/images/BG_1.png')]">
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
        <h3 className="font-bold text-xl px-12 ">Tất cả đánh giá ({reviews.length})</h3>

        <div className="px-12 py-8">
          <ReviewSection reviews={reviews} />
        </div>

        {data.isPurchased && (
          <div className="px-12 py-4">
            <h3 className="font-bold text-lg">Viết đánh giá của bạn</h3>
            <ReviewForm productId={data.id} addReview={addReview} />
          </div>
        )}
      </div>

    </div>
  );
}