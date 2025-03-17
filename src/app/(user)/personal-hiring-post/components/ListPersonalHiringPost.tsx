"use client";

import { fetchCustomerPersonalHiringAPI } from "@/services/customer_request/api-service";
import { HiringPostListResponse } from "@/services/customer_request/definition";
import { useAppSelector } from "@/stores/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const tempArrImg = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrontVwpuWbJw-Cw6gv2XrpVHcVEEWfmMRXQ&s",
    "https://www.timeshighereducation.com/student/sites/default/files/istock-151597880.jpg",
    "https://www.robertsoncollege.com/site-content/uploads/2023/06/post-secondary-education-hero-2400px.jpg",
];

const tempArrAvatar = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJnuSzLJ_pnB1vY08vn3RSbsfT0KpmTGWkltv0G3g-RC0OQHjM61dQNkgs7y4KkbiBHE&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DeyZNqRdLF9WiyJOo7YQW5HxbSp3F6tNQQ&s",
];


const getRandomImage = (bookImg: string, cateImg: string) => bookImg ? bookImg : cateImg ? cateImg : tempArrImg[Math.floor(Math.random() * tempArrImg.length)];
const getRandomAvt = (userAvt: string) => userAvt ? userAvt : tempArrAvatar[Math.floor(Math.random() * tempArrAvatar.length)];


const ListPersonalHiringPost = () => {
    const [data, setData] = useState<HiringPostListResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [staffFilter, setStaffFilter] = useState<string>("");
    const pageSize = 12;
    const router = useRouter();
    const user = useAppSelector((state) => state.userSlice.user);


    useEffect(() => {
        const loadHiringPost = async () => {
            try {
                if (!user || !user.userId) throw new Error("Không tìm thấy tài khoản");
                const res = await fetchCustomerPersonalHiringAPI(user.userId);
                setData(res);
            } catch (e) {
                console.error(e);
                setError("Đã xảy ra lỗi khi tải");
            } finally {
                setLoading(false);
            }
        };
        loadHiringPost();
    }, []);

    const filteredData = data.filter(post =>
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!staffFilter ||
            (post.staffId && String(post.staffId).includes(staffFilter)) ||
            (post.staffName && post.staffName.toLowerCase().includes(staffFilter.toLowerCase()))
        )
    );


    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const totalPages = Math.ceil(filteredData.length / pageSize);

    const generatePagination = () => {
        const maxPagesToShow = 5;
        const pagination: (string | number)[] = [];

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pagination.push(i);
            }
        } else {
            pagination.push(1);
            if (currentPage > 3) pagination.push("...");

            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pagination.push(i);
            }

            if (currentPage < totalPages - 2) pagination.push("...");
            pagination.push(totalPages);
        }

        return pagination;
    };

    return (
        <div className="max-w-full mx-auto p-5">
            {/* ACTION REGION */}
            <div className="flex justify-between items-center mb-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                    {/* Search by Post */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm yêu cầu..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            🔍
                        </span>
                    </div>

                    {/* Filter by Staff */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm theo nhân viên đảm nhận..."
                            value={staffFilter}
                            onChange={(e) => setStaffFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            👤
                        </span>
                    </div>
                </div>

                {/* Create New Button */}
                <button
                    onClick={() => router.push("/create-hiring")}
                    className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
                >
                    Tạo mới yêu cầu
                </button>
            </div>
            {/* ACTION REGION */}
            {loading && <p className="text-center text-blue-600">Chờ tí nhé...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && paginatedData.length === 0 && (
                <p className="text-center text-gray-500">Chưa có dữ liệu</p>
            )}



            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                {paginatedData.map(post => (
                    <div
                        key={post.id}
                        onClick={() => router.push(`/hiring-post-detail/${post.id}`)}
                        className="bg-white rounded-2xl shadow-md overflow-hidden p-5 transition-all transform hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer border border-gray-200"
                    >
                        <div className="relative">
                            <img
                                className="w-full h-52 object-cover rounded-xl"
                                alt="Ảnh bài viết"
                                src={getRandomImage(post.bookImg, post.requirementCateImg)}
                            />
                            <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-lg shadow-md">
                                {post.bookName || post.requirementCate || "Không xác định"}
                            </div>
                        </div>
                        <div className="p-5">
                            <h4 className="text-xl font-bold text-gray-900 leading-tight">{post.title}</h4>
                            <div className="flex items-center space-x-3 my-4">
                                <img
                                    src={getRandomAvt(post.customerAvt)}
                                    alt="Ảnh đại diện"
                                    className="w-12 h-12 rounded-full border-2 border-blue-500 shadow-sm"
                                />
                                <span className="font-medium text-gray-800">{post.customerName}</span>
                            </div>
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Nhân viên :</span>{" "}
                                <span className={`${post.staffName ? "text-green-600" : "text-yellow-600"} font-semibold`}>
                                    {post.staffName || "Chưa xác định"}
                                </span>
                            </p>
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Giá :</span>{" "}
                                <span className={`${(post.price >= 0) ? "text-green-600" : "text-yellow-600"} font-semibold`}>
                                    {post.price >= 0 ? post.price : "Chưa xác định"}
                                </span>
                            </p>
                            <p className="text-gray-500 text-xs mt-2 flex items-center gap-3  px-3 py-1 rounded-md">
                                <span className="bg-green-500 text-white text-[10px] font-semibold px-2 py-1 rounded-md">
                                    {(() => {
                                        if (post.status === "completed") {
                                            return "Hoàn thành";
                                        } else if (post.status === "pending") {
                                            return "Đang chờ";
                                        } else if (post.status === "ready") {
                                            return "Sẵn sàng";
                                        } else {
                                            return "Không xác định";
                                        }
                                    })()}
                                </span>

                                <span className="text-gray-600 text-[10px] bg-gray-100">{new Date(post.createdAt).toLocaleDateString()}</span>
                            </p>

                            <button className="mt-4 w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                                Chi tiết
                            </button>
                        </div>
                    </div>

                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-5 space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded-md bg-white text-gray-800 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Trước
                    </button>

                    {generatePagination().map((item, index) => (
                        <button
                            key={index}
                            onClick={() => typeof item === "number" && setCurrentPage(item)}
                            className={`px-4 py-2 border rounded-md ${currentPage === item
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-800 hover:bg-gray-200"
                                }`}
                            disabled={typeof item !== "number"}
                        >
                            {item}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded-md bg-white text-gray-800 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Tiếp theo
                    </button>
                </div>
            )}
        </div>

    );
};
export default ListPersonalHiringPost;