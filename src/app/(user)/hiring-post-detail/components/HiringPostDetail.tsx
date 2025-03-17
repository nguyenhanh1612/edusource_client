"use client";

import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HiringPostDetailCommentsTab from "./CommentsTab";
import HiringPostDetailInforTab from "./InformationTab";
import { useAppSelector } from "@/stores/store";
import { sendMessageAPI } from "@/services/customer_request/api-service";
import { MessageCircle } from "lucide-react";
import CRChatBot from "./CRChatBot";


const HiringPostDetailPage = () => {
    const [activeTab, setActiveTab] = useState("json");
    const router = useRouter();
    const user = useAppSelector((state) => state.userSlice.user);
    const [backingPage, setBackingPage] = useState("/");
    useEffect(() => {
        if (user) {
            if (user.roleId == 2) {
                setBackingPage("/personal-hiring-post");
            } else {
                setBackingPage("/customer-request");

            }
        }
    }, [])

    return (
        <div className="max-w-5xl mx-auto px-8 py-12 bg-gray-50 min-h-screen flex flex-col items-center">
            {/* Chatbot section */}
            {user && user.roleId == 2 && <CRChatBot />}

            <div className="w-full bg-white rounded-xl shadow-lg p-6 ">
                {/* Tabs Section */}
                <div className="flex justify-between items-center border-b pb-3">
                    <div className="flex space-x-6">
                        <button
                            className={`text-lg font-semibold px-4 py-2 transition-all duration-300 ${activeTab === "json" ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                            onClick={() => setActiveTab("json")}
                        >
                            Thông tin chi tiết
                        </button>
                        <button
                            className={`text-lg font-semibold px-4 py-2 transition-all duration-300 ${activeTab === "comments" ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                            onClick={() => setActiveTab("comments")}
                        >
                            Hội thoại
                        </button>
                    </div>

                    <button
                        className="px-5 py-2 text-white font-medium border border-gray-300 rounded-lg bg-blue-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-300"

                        onClick={() => router.push(backingPage)}
                    >
                        ← Trở lại
                    </button>
                </div>

                {/* Content Section */}
                <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-inner">
                    {activeTab === "comments" ? (
                        <div>
                            <HiringPostDetailCommentsTab />
                        </div>
                    ) : (
                        <div className="overflow-auto">
                            <HiringPostDetailInforTab />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default HiringPostDetailPage;



