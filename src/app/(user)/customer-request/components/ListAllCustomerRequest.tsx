"use client";

import { fetchAllHiringPostsAPI } from "@/services/customer_request/api-service";
import { HiringPost } from "@/services/customer_request/definition";
import { useEffect, useState } from "react";

const ListAllCustomerRequestPage = () => {
    const [data, setData] = useState<HiringPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const pageSize = 6;

    useEffect(() => {
        const loadHiringPost = async () => {
            try {
                const res = await fetchAllHiringPostsAPI();
                setData(res);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        };
        loadHiringPost();
    }, []);

    const filteredData = data.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const totalPages = Math.ceil(filteredData.length / pageSize);

    return (
        <div className="max-w-6xl mx-auto p-5">
            <input
                type="text"
                placeholder="Search hiring posts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded mb-5"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {paginatedData.map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden p-4 transition-transform transform hover:scale-105">
                        <img
                            className="w-full h-48 object-cover"
                            alt="Post Image"
                            src={post.bookImg || post.requirementCateImg}
                        />
                        <div className="p-3">
                            <h4 className="text-lg font-semibold">{post.title}</h4>
                            <p className="text-gray-600 block mb-2">
                                {post.description.split(" ").slice(0, 20).join(" ")}...
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                                <img src={post.customerAvt} alt="Customer Avatar" className="w-8 h-8 rounded-full" />
                                <span className="font-medium">{post.customerName}</span>
                            </div>
                            <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
                            <p className="block font-semibold text-blue-600 mt-2">{post.requirementCate}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-5 space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ListAllCustomerRequestPage;
