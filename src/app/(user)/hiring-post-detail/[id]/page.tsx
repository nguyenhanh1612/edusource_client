"use client";
import { useParams } from "next/navigation";
import React from "react";
import HiringPostDetailComponent from "../components/HiringPostDetail";

const HiringPostDetailPage = () => {
    const { id } = useParams(); // Get the dynamic id from the URL
    
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 bg-gray-50 min-h-screen bg-[url('https://media.istockphoto.com/id/1218737747/vector/learning-online-e-learning-video-call-chat-with-class-distance-education.jpg?s=612x612&w=0&k=20&c=fFFwc3CTP4XtvmruZLiK8EzAbzvAxJL_kw5BsA7z7w8=')] bg-cover bg-center bg-no-repeat opacity-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center"></h2>
            <HiringPostDetailComponent />
        </div>
    );
};

export default HiringPostDetailPage;
