import React, { useState } from "react";
import { TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const feedbackData = [
    {
        id: 1,
        name: "Nguyễn Minh An",
        title: "Giáo viên Tiểu học",
        feedback: "Tài liệu trên EduSource rất hữu ích! Tôi có thể nhanh chóng tìm được giáo án phù hợp mà không mất quá nhiều thời gian biên soạn.",
        stars: 5,
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: 2,
        name: "Trần Thị Hạnh",
        title: "Giáo viên Tiểu học",
        feedback: "Nguồn tài liệu phong phú, bám sát chương trình học. Tôi đặc biệt thích các bài giảng có hình ảnh minh họa sinh động.",
        stars: 4.5,
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        id: 3,
        name: "Lê Quốc Bảo",
        title: "Giáo viên Tiểu học",
        feedback: "Tôi mong muốn có thêm nhiều tài liệu tích hợp phương pháp giảng dạy mới giúp học sinh tiếp thu tốt hơn.",
        stars: 4,
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        id: 4,
        name: "Phạm Lan Anh",
        title: "Phụ huynh học sinh",
        feedback: "Tôi tìm được rất nhiều tài liệu hay giúp con học tốt hơn. Giao diện dễ sử dụng, nội dung rõ ràng.",
        stars: 5,
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        id: 5,
        name: "Hoàng Văn Nam",
        title: "Giáo viên Tiểu học",
        feedback: "Tài liệu trên EduSource giúp tôi rất nhiều trong việc soạn bài giảng và hỗ trợ học sinh ôn tập hiệu quả.",
        stars: 4.5,
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
];

export default function FeedbackCarousel() {
    const [expandedFeedback, setExpandedFeedback] = useState<number | null>(null);


    return (
        <div className="px-4 sm:px-10">
            <div className="max-w-7xl w-full mx-auto">
                <Carousel opts={{ align: "start" }} className="w-full">
                    <CarouselContent>
                        {feedbackData.map((item) => (
                            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 flex flex-col h-full">
                                <div className="p-4 flex flex-col flex-grow h-full">
                                    <Card className="flex-grow h-full">
                                        <CardContent className="flex flex-col items-center p-6 h-full">

                                            <div className="flex items-center mb-4">
                                                <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full" />
                                                <div className="ml-4">
                                                    <h4 className="font-semibold">{item.name}</h4>
                                                    <p className="mt-1 text-xs text-gray-400">{item.title}</p>
                                                </div>
                                            </div>


                                            <p
                                                className="flex-grow text-sm text-center cursor-pointer"
                                                onClick={() => setExpandedFeedback(expandedFeedback === item.id ? null : item.id)}
                                            >
                                                {expandedFeedback === item.id
                                                    ? item.feedback
                                                    : item.feedback.length > 50
                                                        ? item.feedback.slice(0, 50) + "..."
                                                        : item.feedback}
                                                {item.feedback.length > 50 && (
                                                    <span className="text-black font-bold ml-1">
                                                        {expandedFeedback === item.id ? "Thu gọn" : "Xem thêm"}
                                                    </span>
                                                )}
                                            </p>


                                            <div className="flex space-x-2 mt-4">
                                                {Array.from({ length: 5 }).map((_, index) => {
                                                    if (index < Math.floor(item.stars)) {
                                                        return (
                                                            <TiStarFullOutline key={index} className="text-yellow-400 text-2xl" />
                                                        );
                                                    }
                                                    if (index === Math.floor(item.stars) && item.stars % 1 !== 0) {
                                                        return (
                                                            <TiStarHalfOutline key={index} className="text-yellow-400 text-2xl" />
                                                        );
                                                    }
                                                    return (
                                                        <TiStarFullOutline key={index} className="text-gray-300 text-2xl" />
                                                    );
                                                })}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>


                    <CarouselPrevious className="bg-white text-black p-2 rounded-full cursor-pointer">
                        <FaAngleLeft />
                    </CarouselPrevious>
                    <CarouselNext className="bg-black text-white p-2 rounded-full cursor-pointer">
                        <FaAngleRight />
                    </CarouselNext>
                </Carousel>
            </div>
        </div>
    );
}
