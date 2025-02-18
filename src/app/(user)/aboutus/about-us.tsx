"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";

const AboutUs = () => {

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [ref6, inView6] = useInView({ triggerOnce: true, threshold: 0.2 });


    return (
        <div className='grid grid-cols-12 mt-6'>
            <motion.div
                ref={ref1}
                initial="hidden"
                animate={inView1 ? "visible" : "hidden"}
                variants={sectionVariants}
                transition={{ duration: 0.7 }}
                className='col-span-12 space-y-4 py-10 px-28 mt-20'
            >
                <h1 className='text-4xl font-semibold'>Công ty Cung Cấp Tài Liệu Dạy Tiếng Anh</h1>
                <h2 className='text-2xl text-teal-400'>Chúng tôi cung cấp các slide bài giảng, tài liệu, bài thi dạy học cho giáo viên tiếng Anh.</h2>
            </motion.div>

            <div className='flex col-span-12 py-10 px-28 gap-10'>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className='col-span-6 space-y-10 text-gray-500'
                >
                    <p>EduSource cam kết cung cấp các tài liệu học chất lượng, giúp giáo viên tiếng Anh giảng dạy hiệu quả hơn.</p>
                    <p>Chúng tôi hiểu rằng công việc của giáo viên rất bận rộn, vì vậy chúng tôi mang đến những tài liệu đã được chuẩn bị sẵn, tiết kiệm thời gian cho giáo viên trong việc chuẩn bị bài giảng.</p>
                    <p>Tất cả tài liệu mà chúng tôi cung cấp đều có sẵn dưới dạng slide, bài giảng trực tuyến và các tài liệu bổ trợ, giúp các thầy cô có thể dễ dàng áp dụng trong lớp học.</p>
                    <p>Chúng tôi được điều hành bởi một đội ngũ chuyên gia giáo dục và không nhận bất kỳ khoản tài trợ từ chính phủ. Để duy trì hoạt động, chúng tôi phụ thuộc vào sự đóng góp và hỗ trợ từ cộng đồng giáo dục.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="col-span-6 bg-[url('/images/about1.jpg')] bg-cover bg-center w-2/3 h-[50vh] rounded-lg shadow-md flex flex-col items-center justify-center"
                />
            </div>

            <motion.div
                ref={ref2}
                initial="hidden"
                animate={inView2 ? "visible" : "hidden"}
                variants={sectionVariants}
                transition={{ duration: 0.7 }}
                className="col-span-12 bg-[url('/images/about2.jpg')] bg-cover bg-center w-full h-[60vh] shadow-md flex flex-col items-end justify-center relative p-4 mt-4"
            >

                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                <div className='relative z-10 w-4/12 p-8 mr-10'>
                    <h1 className="text-white text-3xl font-bold text-center">Giá trị của việc dạy học có thể được đo bằng cách giáo viên giúp học sinh tiếp cận kiến thức mới như thế nào.</h1>
                    <p className="text-white text-lg text-center">- Albert Einstein</p>
                </div>
            </motion.div>


            <div className='col-span-12 py-16 px-28 gap-10 grid grid-cols-12'>
                <motion.div
                    ref={ref3}
                    initial="hidden"
                    animate={inView3 ? "visible" : "hidden"}
                    variants={sectionVariants}
                    transition={{ duration: 0.7 }}
                    className='col-span-4 flex flex-col items-center justify-center'
                >
                    <div className="bg-[url('/images/about3.jpg')] bg-cover bg-center w-[30vh] h-[25vh] shadow-md"></div>
                    <div className='flex '>
                        <div className="mt-[-2vh] relative z-0 bg-[url('/images/about4.jpg')] bg-cover bg-center w-[30vh] h-[30vh] shadow-md"></div>
                        <div className="bg-[url('/images/about5.jpg')] bg-cover bg-center w-[25vh] h-[25vh] shadow-md"></div>
                    </div>
                </motion.div>

                <motion.div
                    ref={ref4}
                    initial="hidden"
                    animate={inView4 ? "visible" : "hidden"}
                    variants={sectionVariants}
                    transition={{ duration: 0.7 }}
                    className='col-span-8 space-y-10 '
                >
                    <h1 className='text-4xl font-semibold'>Chúng tôi cung cấp tài liệu học phong phú</h1>
                    <p className='text-gray-500'>Các tài liệu của chúng tôi được chọn lọc kỹ lưỡng từ nhiều nguồn uy tín, giúp giáo viên có thể dễ dàng áp dụng trong lớp học. Các tài liệu bao gồm bài giảng PowerPoint, giáo án, và các bài tập luyện tập giúp học sinh thực hành tiếng Anh một cách hiệu quả.</p>
                    <p className='text-gray-500'>Chúng tôi không chỉ cung cấp tài liệu cho các giáo viên tiếng Anh, mà còn hỗ trợ họ trong việc tạo ra các lớp học sinh động, sáng tạo với các phương pháp giảng dạy mới nhất.</p>
                    <p className='text-gray-500'>Ngoài ra, chúng tôi còn tổ chức các khóa học nâng cao kỹ năng giảng dạy và tư vấn miễn phí cho các giáo viên có nhu cầu.</p>
                    <p className='text-gray-500'>Tất cả tài liệu đều được cập nhật thường xuyên để đảm bảo rằng các giáo viên luôn có tài liệu mới nhất, phù hợp với xu hướng giảng dạy hiện nay.</p>
                </motion.div>
            </div>

            <div className='flex col-span-12 py-16 px-28 gap-10'>
                <motion.div
                    ref={ref5}
                    initial="hidden"
                    animate={inView5 ? "visible" : "hidden"}
                    variants={sectionVariants}
                    transition={{ duration: 0.7 }}
                    className='w-1/2 space-y-10'
                >
                    <h1 className='text-4xl font-semibold'>Đội ngũ Cung Cấp Tài Liệu Dạy Tiếng Anh</h1>
                    <div className='space-y-6 text-gray-500'>
                        <div>
                            <h3 className='text-2xl font-medium text-black'>Những người sáng lập chúng tôi</h3>
                            <p>Công ty chúng tôi được sáng lập bởi một nhóm các chuyên gia giáo dục và những người đam mê việc hỗ trợ giáo viên dạy tiếng Anh. Đội ngũ sáng lập gồm nhiều người có kinh nghiệm trong giáo dục, công nghệ, thiết kế tài liệu học và quản lý.</p>
                        </div>
                    </div>
                    {/* <div className="mt-4">
                        <Link href="/adopt">
                            <Button variant="outline" className="text-gray-600 uppercase p-4 border-black hover:bg-teal-400">Become a Volunteer</Button>
                        </Link>
                    </div> */}
                </motion.div>

                <motion.div
                    ref={ref6}
                    initial="hidden"
                    animate={inView6 ? "visible" : "hidden"}
                    variants={sectionVariants}
                    transition={{ duration: 0.7 }}
                    className='w-1/2 flex flex-col items-center'
                >
                    <div className="bg-[url('/images/about6.webp')] bg-cover bg-center w-2/3 h-[50vh] shadow-md rounded-lg"></div>
                </motion.div>
            </div>
        </div>
    );
}

export default AboutUs;
