import React, { useState } from 'react';
import { TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";  // Import Card components
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";  // Import Carousel components

const feedbackData = [
    {
        id: 1,
        name: "John Doe",
        title: "Founder of Rubik",
        feedback: "The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.",
        stars: 4.5,
        avatar: "https://readymadeui.com/team-1.webp",
    },
    {
        id: 2,
        name: "Jane Smith",
        title: "CEO of Creative Studio",
        feedback: "I had an incredible experience. The food quality was superb, and the environment was perfect for a relaxed meal.",
        stars: 4,
        avatar: "https://readymadeui.com/team-2.webp",
    },
    {
        id: 3,
        name: "Alice Brown",
        title: "Designer at UXLab",
        feedback: "Good service, but the waiting time could be improved. Overall, I was satisfied with the quality.",
        stars: 3,
        avatar: "https://readymadeui.com/team-3.webp",
    },
    {
        id: 4,
        name: "Bob Johnson",
        title: "Developer at TechCorp",
        feedback: "Fantastic food, but could use a few more vegetarian options.",
        stars: 5,
        avatar: "https://readymadeui.com/team-4.webp",
    },
    {
        id: 5,
        name: "Charlie White",
        title: "Manager at AlphaCo",
        feedback: "Good atmosphere, but the prices were a bit high.",
        stars: 4,
        avatar: "https://readymadeui.com/team-5.webp",
    },
];

export default function FeedbackCarousel() {
    return (
        <div className="px-4 sm:px-10">
            <div className="max-w-7xl w-full mx-auto">  
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
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
                                            <p className="flex-grow text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                                                {item.feedback.length > 50 ? item.feedback.slice(0, 50) + '...' : item.feedback}
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
