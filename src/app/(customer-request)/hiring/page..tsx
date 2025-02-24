"use client";

import { useEffect, useState } from "react";
import { Input, Pagination, Row, Col, Typography, notification } from "antd";
import { fetchAllHiringPostsAPI } from "@/services/customer_request/api-service";
import { HiringPost } from "@/services/customer_request/definition";
import { RootState, useAppSelector } from "@/stores/store";

const { Search } = Input;
const { Title, Text } = Typography;

const Page = () => {
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
            } catch (e) {
                notification.error({
                    message: "Cannot load hiring posts"
                })
            }
            loadHiringPost();
        }
    }, []);

    const filteredData = data.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="max-w-6xl mx-auto p-5">
            <Search
                placeholder="Search hiring posts"
                enterButton
                className="mb-5 w-full"
            />
            <Row gutter={[16, 16]}>
                {paginatedData.map(post => (
                    <Col xs={24} sm={12} md={8} key={post.id}>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 transition-transform transform hover:scale-105">
                            <img
                                className="w-full h-48 object-cover"
                                alt="Post Image"
                                src={post.bookImg || post.requirementCateImg}
                            />
                            <div className="p-3">
                                <Title level={4} className="text-lg font-semibold">{post.title}</Title>
                                <Text className="text-gray-600 block mb-2">
                                    {post.description.split(" ").slice(0, 20).join(" ")}...
                                </Text>
                                <div className="flex items-center space-x-2 mt-2">
                                    <img src={post.customerAvt} alt="Customer Avatar" className="w-8 h-8 rounded-full" />
                                    <Text className="font-medium">{post.customerName}</Text>
                                </div>
                                <Text className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</Text>
                                <Text className="block font-semibold text-blue-600 mt-2">{post.requirementCate}</Text>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
            <Pagination
                current={currentPage}
                total={filteredData.length}
                pageSize={pageSize}
                onChange={setCurrentPage}
                className="text-center mt-5"
            />
        </div>
    );
};

export default Page;
