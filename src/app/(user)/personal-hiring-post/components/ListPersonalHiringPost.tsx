"use client";

import { fetchAllHiringPostsAPI, fetchHiringPostsByCustomerIdAPI } from "@/services/customer_request/api-service";
import { HiringPost } from "@/services/customer_request/definition";
import { useAppSelector } from "@/stores/store";
import { useEffect, useState } from "react";

const tempArrImg = [
    "https://m.media-amazon.com/images/I/71DoSRyaXWL._AC_UF1000,1000_QL80_.jpg",
    "https://upload.wikimedia.org/wikipedia/en/e/e4/It_Ends_with_Us_%28Colleen_Hoover%29.png",
    "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/OXWGA4UNSRAY7CE5S34IXHPL3U.jpg&w=1200",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpDUVsyl3enxkQzFOzgJlB2O52L-o0630iMw&s",
    "https://storage.googleapis.com/pr-newsroom-wp/1/2022/10/It-Starts-With-Us.jpeg",
    "https://cup-us.imgix.net/covers/9780231211581.jpg?auto=format&w=350"
];

const tempArrAvatar = [
    "https://media-cdn-v2.laodong.vn/storage/newsportal/2018/7/10/617854/Cristiano-Ronaldo-Ba.jpg?w=800&h=420&crop=auto&scale=both",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJnuSzLJ_pnB1vY08vn3RSbsfT0KpmTGWkltv0G3g-RC0OQHjM61dQNkgs7y4KkbiBHE&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DeyZNqRdLF9WiyJOo7YQW5HxbSp3F6tNQQ&s",
    "https://i.scdn.co/image/ab6761610000e5eb5a79a6ca8c60e4ec1440be53",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2zy4Vpy9Fquns6VF3rZkkj2ceikaHG82dPw&s"
];


const getRandomImage = () => tempArrImg[Math.floor(Math.random() * tempArrImg.length)];
const getRandomAvt = () => tempArrAvatar[Math.floor(Math.random() * tempArrAvatar.length)];


const ListPersonalHiringPost = () => {
    const [data, setData] = useState<HiringPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [staffFilter, setStaffFilter] = useState<string>("");
    const pageSize = 12;
    const user = useAppSelector((state) => state.userSlice.user);

    useEffect(() => {
        const loadHiringPost = async () => {
            try {
                if (user?.userId) {
                    const res = await fetchHiringPostsByCustomerIdAPI(user.userId);
                    setData(res);
                } else {
                    setError("User ID is not available.");
                }
            } catch (e) {
                console.error(e);
                setError("Failed to fetch customer requests.");
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
        <div className="max-w-6xl mx-auto p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                {/* Search by Post */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search hiring posts..."
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
                        placeholder="Filter by Staff ID or Name..."
                        value={staffFilter}
                        onChange={(e) => setStaffFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        👤
                    </span>
                </div>
            </div>

            {loading && <p className="text-center text-blue-600">Chờ một chút nhé...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && paginatedData.length === 0 && (
                <p className="text-center text-gray-500">No customer requests found.</p>
            )}

            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedData.map(post => (
                    <div
                        key={post.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden p-5 transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
                    >
                        <img
                            className="w-full h-48 object-cover rounded-lg"
                            alt="Post Image"
                            src={getRandomImage()}
                        />
                        <div className="p-4">
                            <h4 className="text-xl font-semibold text-gray-800">{post.title}</h4>
                            <p className="text-gray-600 mt-2 mb-4 leading-relaxed">
                                {post.description.split(" ").slice(0, 20).join(" ")}...
                            </p>
                            <div className="flex items-center space-x-3 mb-3">
                                <img
                                    src={getRandomAvt()}
                                    alt="Customer Avatar"
                                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                                />
                                <span className="font-medium text-gray-700">{post.customerName}</span>
                            </div>
                            <p className="text-sm text-gray-700 font-medium">
                                Staff Assigned:{" "}
                                <span className={`font-semibold ${post.staffName ? "text-green-500" : "text-yellow-600"}`}>
                                    {post.staffName || "Not Assigned Yet"}
                                </span>
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                            <p className="block font-semibold text-blue-600 mt-3">
                                Category: {post.requirementCate}
                            </p>
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
                        Previous
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
                        Next
                    </button>
                </div>
            )}
        </div>

    );
};

export default ListPersonalHiringPost;