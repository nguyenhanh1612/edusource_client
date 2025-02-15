"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GiFlexibleStar } from "react-icons/gi";
import CardComponent from "@/components/slide-carousel";
import { PowerPoint } from "@/components/powerpoint-carousel";
import FeedbackCarousel from "@/components/feedback-carousel";
import useGetAllProduct from "./hooks/useGetAllProduct";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function HomePage() {
  const { isPending, getAllProductApi } = useGetAllProduct();
  const [products, setProducts] = useState<API.Product[]>([]);


  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProductApi({});
      if (response) {
        const filteredProducts = response.value.data.items.filter(
          (product) => product.category === 0
        );
        setProducts(filteredProducts);
      }
    };

    fetchProducts();
  }, []);


  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref6, inView6] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref7, inView7] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref8, inView8] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref9, inView9] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref10, inView10] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref11, inView11] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref12, inView12] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <div className="flex flex-col justify-center min-h-full bg-white">
      <div className="bg-[url('/images/banner.jpg')] bg-cover bg-center w-full h-[120vh] shadow-md flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-black opacity-35"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="max-w-lg text-center mb-4 relative z-10 font-epilogue"
        >
          <h5 className="text-[#ffd60a] text-lg">
            TÀI LIỆU DẠY TIẾNG ANH TRỰC TUYẾN
          </h5>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-6xl w-1/2 font-medium text-center text-white mb-4 relative z-10 font-epilogue"
        >
          Nơi những giáo viên xuất sắc <span className="italic text-[#ffb154]">chia sẻ</span> những ý tưởng đổi mới của họ
        </motion.h1>
        <motion.div
          className="flex gap-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
        >
          <Link href="/aboutus">
            <Button
              className={`hover:bg-transparent text-lg w-56 transform transition-transform duration-700 relative group flex items-center justify-center uppercase p-6`}
              variant="outline"
            >
              <span className="text-white inline-block transition-transform duration-300 transform group-hover:-translate-x-4">
                Về chúng tôi
              </span>
              <span className="transition-transform duration-300 transform opacity-0 group-hover:opacity-100 absolute right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </Button>
          </Link>
          <Link href="/donation">
            <Button
              className={`hover:bg-pink-600 text-lg w-32 bg-pink-600 border-none transform transition-transform duration-700 relative group flex items-center justify-center uppercase p-6`}
              variant="outline"
            >
              <span className="text-white inline-block transition-transform duration-300 transform group-hover:-translate-x-4">
                Sách
              </span>
              <span className="transition-transform duration-300 transform opacity-0 group-hover:opacity-100 absolute right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </Button>
          </Link>

          <Link href="/event">
            <Button
              className={`hover:bg-transparent text-lg w-48 transform transition-transform duration-700 relative group flex items-center justify-center uppercase p-6`}
              variant="outline"
            >
              <span className="text-white inline-block transition-transform duration-300 transform group-hover:-translate-x-4">
                Liên hệ
              </span>
              <span className="transition-transform duration-300 transform opacity-0 group-hover:opacity-100 absolute right-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className='col-span-12 py-16 px-28 gap-10 grid grid-cols-12 mt-8'>
        <motion.div
          ref={ref1}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          variants={sectionVariants}
          transition={{ duration: 0.7 }}
          className='col-span-6 flex flex-col items-center justify-center'
        >
          <div className='flex space-x-20 mb-4'>
            <div className="bg-[url('/images/home1.jpg')] bg-cover bg-center w-[30vh] h-[30vh] shadow-md  transform rotate-[-10deg] -translate-y-10"></div>
            <div className="bg-[url('/images/home2.jpg')] bg-cover bg-center w-[30vh] h-[30vh] shadow-md transform rotate-[6deg] translate-y-4"></div>
          </div>
          <div className='flex space-x-10 mt-4'>
            <div className="bg-[url('/images/home3.jpg')] bg-cover bg-center w-[30vh] h-[30vh] shadow-md  transform rotate-[-1deg] -translate-y-8"></div>
            <div className="bg-[url('/images/home4.jpg')] bg-cover bg-center w-[30vh] h-[30vh] shadow-md transform rotate-[-4deg] translate-y-4"></div>
          </div>
        </motion.div>

        <motion.div
          ref={ref2}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          variants={sectionVariants}
          transition={{ duration: 0.7 }}
          className='col-span-6 space-y-10 flex flex-col items-center justify-center'
        >
          <h1 className='text-4xl font-semibold text-center'>Bài giảng PowerPoint</h1>
          <p className="text-gray-500 text-xl mb-4">
            Nâng cao khả năng giảng dạy của bạn với các slide được thiết kế của chúng tôi. Các trang trình bày có thể tùy chỉnh này tuân theo cấu trúc sách giáo khoa, giúp bạn trình bày các bài học rõ ràng, ngắn gọn, có tổ chức và mang tính tương tác một cách dễ dàng. Tiết kiệm thời gian và gây ấn tượng với học sinh của bạn bằng các trang trình bày sinh động và hấp dẫn về mặt hình ảnh.
          </p>
          <div className="mt-4">
            <Link href="/allpowerpoint">
              <Button
                variant="outline"
                className="text-gray-600 bg-teal-400 uppercase p-8 hover:bg-teal-300"
              >
                Khám phá bài giảng
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className='col-span-12 py-16 px-28 grid grid-cols-12 mt-8'>
        <motion.div
          ref={ref3}
          initial="hidden"
          animate={inView3 ? "visible" : "hidden"}
          variants={sectionVariants}
          transition={{ duration: 0.7 }}
          className='col-span-5 space-y-10 flex flex-col items-center justify-center'
        >
          <h1 className='text-4xl font-semibold text-center'>Kho tàng đề thi</h1>
          <p className="text-gray-500 text-xl mb-4">
            Ngân hàng đề thi toàn diện này giúp giáo viên đánh giá chính xác sự tiến bộ của học sinh. Với nhiều loại câu hỏi khác nhau, bao gồm tất cả các chủ đề thiết yếu trong sách giáo khoa, những bài kiểm tra này giúp tiết kiệm thời gian và cung cấp thông tin chi tiết có giá trị để cải thiện mục tiêu.
          </p>
          <div className="mt-4">
            <Link href="/alltest">
              <Button
                variant="outline"
                className="text-gray-600 bg-teal-400 uppercase p-8 hover:bg-teal-300"
              >
                Khám phá đề thi
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          ref={ref4}
          initial="hidden"
          animate={inView4 ? "visible" : "hidden"}
          variants={sectionVariants}
          transition={{ duration: 0.7 }}
          className='col-span-7 flex flex-col items-center justify-center'
        >
          <div className='flex space-x-8 mb-4'>
            <div className="bg-[url('/images/home5.png')] bg-cover bg-center w-[30vh] h-[50vh] shadow-md -translate-y-8"></div>
            <div className="bg-[url('/images/home6.png')] bg-cover bg-center w-[30vh] h-[50vh] shadow-md translate-y-4"></div>
            <div className="bg-[url('/images/home7.png')] bg-cover bg-center w-[30vh] h-[50vh] shadow-md -translate-y-12"></div>
          </div>
        </motion.div>
      </div>

      <div className='col-span-12 py-16 px-20 space-x-10 grid grid-cols-12 mt-8'>
        <motion.div
          ref={ref5}
          initial="hidden"
          animate={inView5 ? "visible" : "hidden"}
          variants={sectionVariants}
          transition={{ duration: 0.7 }}
          className='col-span-7 flex flex-col items-center justify-center'
        >
          <div className='flex space-x-8 mb-4'>
            <div className="bg-[url('/images/home8.png')] bg-cover bg-center w-[30vh] h-[50vh] shadow-md -translate-y-16"></div>
            <div className="bg-[url('/images/home9.png')] bg-cover bg-center w-[40vh] h-[30vh] shadow-md translate-y-20"></div>
            <div className="bg-[url('/images/home10.png')] bg-cover bg-center w-[30vh] h-[50vh] shadow-md translate-y-18"></div>
          </div>
        </motion.div>

        <motion.div
          ref={ref6}
          initial="hidden"
          animate={inView6 ? "visible" : "hidden"}
          variants={sectionVariants}
          transition={{ duration: 0.7 }}
          className='col-span-5 space-y-10 flex flex-col items-center justify-center'
        >
          <h1 className='text-4xl font-semibold text-center'>Bài tập bổ sung</h1>
          <p className="text-gray-500 text-xl mb-4">
            Tăng cường sự tự tin của học sinh với bộ sưu tập bài tập bổ sung phong phú của chúng tôi. Được biên soạn cẩn thận để phù hợp với sách giáo khoa của bạn, những bài tập này phù hợp với nhiều phong cách học tập khác nhau và giúp học sinh hiểu sâu hơn về các bài học trên lớp.
          </p>
          <div className="mt-4">
            <Link href="/allexercise">
              <Button
                variant="outline"
                className="text-gray-600 bg-teal-400 uppercase p-8 hover:bg-teal-300"
              >
                Khám phá bài tập
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        ref={ref7}
        initial="hidden"
        animate={inView7 ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ duration: 0.7 }}
        className="bg-[#fb8500] w-full text-white text-3xl text-center flex items-center justify-center space-x-4"
      >
        <GiFlexibleStar className="text-[#219ebc]" />
        <span>Khám phá tài nguyên slide của chúng tôi</span>
        <GiFlexibleStar className="text-[#219ebc]" />
      </motion.div>

      <motion.div
        ref={ref8}
        initial="hidden"
        animate={inView8 ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ duration: 0.7 }}
        className="p-8 bg-[#669bbc] w-full"
      >
        <Carousel opts={{ align: "start" }} className="w-full max-w-7xl mx-auto">
          <CarouselContent className="flex-nowrap">
            {products.map((product) => (
              <CarouselItem className="md:basis-1/2 lg:basis-1/4" key={product.id}>
                <CardComponent slideId={product.id} product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>

      <motion.div
        ref={ref9}
        initial="hidden"
        animate={inView9 ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ duration: 0.7 }}
        className="p-10 flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold text-[#fb8500]">Cộng đồng của chúng tôi</h1>
      </motion.div>

      <motion.div
        ref={ref10}
        initial="hidden"
        animate={inView10 ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-12 my-8"
      >
        <div className="col-span-6 col-start-2">
          <PowerPoint />
        </div>
        <div className="col-span-4 flex flex-col justify-center px-8 gap-y-4">
          <h1 className='text-4xl font-semibold text-center'>Family and Friends 3
            National Edition</h1>
          <p className="text-gray-500 text-xl mb-4">
            Các bài giảng điện tử được trình bày với  bố cục rõ ràng, hình minh họa sống động và trò chơi, và các tệp nghe tích hợp để tạo ra cảm giác trực quan trong giảng dạy.
          </p>
          <span className="text-gray-500 text-left text-xl">
            Người thực hiện: <span className="text-[#fb8500] font-bold">Jake</span>
          </span>
        </div>
      </motion.div>

      <motion.div
        ref={ref11}
        initial="hidden"
        animate={inView11 ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ duration: 0.7 }}
        className="p-10 flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold text-[#fb8500]">Ý kiến khách hàng của chúng tôi</h1>
      </motion.div>

      <motion.div
        ref={ref12}
        initial="hidden"
        animate={inView12 ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ duration: 0.7 }}
        className="p-10"
      >
        <FeedbackCarousel />
      </motion.div>
    </div>
  );
}
