import React from 'react'
import { FaRegStar } from "react-icons/fa6";
function Reviews() {
    return (
        <div>
            <div className="flex gap-2 items-center">
                <div className="">
                    <div className="flex text-3xl gap-4">
                        <span><FaRegStar /></span>
                        <span><FaRegStar /></span>
                        <span><FaRegStar /></span>
                        <span><FaRegStar /></span>
                        <span><FaRegStar /></span>
                    </div>
                    <div>
                        <span className="text-xl">Dựa trên 20 đánh giá</span>
                    </div>
                </div>
                <div>
                    <span className="text-7xl text-[#fb8500]">5.0</span>
                </div>
            </div>
            <h1 className="font-semibold text-3xl">Xếp hạng</h1>
            <div className="max-w-6xl font-sans">
                <div className="space-y-2">
                    <div className="flex items-center">
                        <p className="text-base text-gray-800 font-bold">5.0</p>
                        <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <div className="bg-gray-300 rounded-full w-full h-[14px] ml-3">
                            <div className="w-2/3 h-full rounded-full bg-[#facc15]"></div>
                        </div>
                        <p className="text-base text-gray-500 font-bold ml-3">66%</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-base text-gray-800 font-bold">4.0</p>
                        <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <div className="bg-gray-300 rounded-full w-full h-[14px] ml-3">
                            <div className="w-1/3 h-full rounded-full bg-[#facc15]"></div>
                        </div>
                        <p className="text-base text-gray-500 font-bold ml-3">33%</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-base text-gray-800 font-bold">3.0</p>
                        <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <div className="bg-gray-300 rounded-full w-full h-[14px] ml-3">
                            <div className="w-1/6 h-full rounded-full bg-[#facc15]"></div>
                        </div>
                        <p className="text-base text-gray-500 font-bold ml-3">16%</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-base text-gray-800 font-bold">2.0</p>
                        <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <div className="bg-gray-300 rounded-full w-full h-[14px] ml-3">
                            <div className="w-1/12 h-full rounded-full bg-[#facc15]"></div>
                        </div>
                        <p className="text-base text-gray-500 font-bold ml-5">8%</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-base text-gray-800 font-bold">1.0</p>
                        <svg className="w-5 fill-gray-800 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <div className="bg-gray-300 rounded-full w-full h-[14px] ml-3">
                            <div className="w-[6%] h-full rounded-full bg-[#facc15]"></div>
                        </div>
                        <p className="text-base text-gray-500 font-bold ml-5">6%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews
