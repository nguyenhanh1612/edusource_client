"use client";

import { fetchAllHiringPostsAPI } from "@/services/customer_request/api-service";
import { HiringPost } from "@/services/customer_request/definition";
import { useEffect, useState } from "react";

const tempArrImg = [
    "https://m.media-amazon.com/images/I/71DoSRyaXWL._AC_UF1000,1000_QL80_.jpg",
    "https://upload.wikimedia.org/wikipedia/en/e/e4/It_Ends_with_Us_%28Colleen_Hoover%29.png",
    "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/OXWGA4UNSRAY7CE5S34IXHPL3U.jpg&w=1200",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpDUVsyl3enxkQzFOzgJlB2O52L-o0630iMw&s",
    // "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.blackincbooks.com.au%2Fbooks%2Fbetween-us&psig=AOvVaw1sE1H9jespBXkzluQZtIkG&ust=1740704970301000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDC877V4osDFQAAAAAdAAAAABAj",
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
const getRandomAvt = () => tempArrAvatar[Math.floor(Math.random() * tempArrImg.length)];


const ListAllCustomerRequestPage = () => {
    const [data, setData] = useState<HiringPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const pageSize = 12;

    useEffect(() => {
        const loadHiringPost = async () => {
            try {
                const res = await fetchAllHiringPostsAPI();
                setData(res);
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
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
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
            <input
                type="text"
                placeholder="Search hiring posts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded-md mb-5 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {loading && <p className="text-center text-blue-600">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && paginatedData.length === 0 && (
                <p className="text-center text-gray-500">No customer requests found.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedData.map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden p-4 transition-transform transform hover:scale-105">
                        <img
                            className="w-full h-48 object-cover rounded-md"
                            alt="Post Image"
                            src={getRandomImage()}
                        />
                        <div className="p-3">
                            <h4 className="text-lg font-semibold">{post.title}</h4>
                            <p className="text-gray-600 block mb-2">
                                {post.description.split(" ").slice(0, 20).join(" ")}...
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                                <img src={getRandomAvt()} alt="Customer Avatar" className="w-8 h-8 rounded-full" />
                                <span className="font-medium">{post.customerName}</span>
                            </div>
                            <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
                            <p className="block font-semibold text-blue-600 mt-2">{post.requirementCate}</p>
                        </div>
                    </div>
                ))}
            </div>

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

export default ListAllCustomerRequestPage;