"use client";
import React from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link"; 
const CardComponent: React.FC = () => {
    const cards = Array.from({ length: 8 });

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-6xl mx-auto"
        >
            <CarouselContent>
                {cards.map((_, index) => {
                    const slideId = (index + 1).toString(); 

                    return (
                        <CarouselItem
                            key={slideId}
                            className="md:basis-1/2 lg:basis-1/4"
                        >
                            <Link href={`/detailslide/${slideId}`} passHref>
                                <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-lg">
                                    <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                                        <img
                                            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                            alt="card image"
                                        />
                                        <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                                        <button
                                            className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button"
                                            data-ripple-dark="true"
                                        >
                                            <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                    className="h-6 w-6"
                                                >
                                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <h5 className="font-medium text-xl text-blue-gray-900 text-center">
                                                Bài giảng Family and Friends 2
                                            </h5>
                                            <h5 className="font-medium text-xl text-blue-gray-900 text-center">
                                                (phiên bản 15 bài)
                                            </h5>
                                        </div>
                                        <p className="flex items-center gap-1.5 text-base text-blue-gray-900">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                className="h-5 w-5 text-yellow-700"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                            5.0
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <IoCheckmarkOutline className="text-[#ffd15d]" />
                                            <p className="text-base text-gray-700">15 đơn vị</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <IoCheckmarkOutline className="text-[#ffd15d]" />
                                            <p className="text-base text-gray-700">Bảng câu hỏi kỹ năng</p>
                                        </div>
                                        <button className="w-full bg-[#219ebc] py-3.5 text-white rounded-full mt-4 text-xl">
                                            Mua ngay
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default CardComponent;
