import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui/button";

type Review = {
    id: number;
    name: string;
    avatar: string;
    date: string;
    rating: number;
    comment: string;
};

const ReviewForm: React.FC<{ addReview: (review: Review) => void }> = ({ addReview }) => {
    const [review, setReview] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [error, setError] = useState<string>("");

    const formattedDate = new Intl.DateTimeFormat("vi-VN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date()).replace(", ", " ").replace(/(\d+)$/, "năm $1");



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError("Vui lòng chọn số sao trước khi gửi đánh giá.");
            return;
        }

        const newReview: Review = {
            id: Date.now(), // Tạo ID ngẫu nhiên
            name: "Người dùng ẩn danh", // Có thể lấy từ user info
            avatar: "https://via.placeholder.com/50", // Avatar mặc định
            date: new Intl.DateTimeFormat("vi-VN", {
                day: "numeric",
                month: "long",
                year: "numeric",
            }).format(new Date()).replace(", ", " ").replace(/(\d+)$/, "năm $1"),
            rating,
            comment: review,
        };

        addReview(newReview); // Gửi review mới lên state
        setReview(""); // Reset form
        setRating(0);
    };

    return (
        <form className="bg-gray-100 p-4 rounded-lg w-1/2" onSubmit={handleSubmit}>
            {/* Chọn số sao */}
            <div className="mt-2">
                <label className="block text-sm font-bold text-gray-700">Đánh giá sản phẩm *</label>
                <div className="flex space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
                            className="cursor-pointer transition-transform transform hover:scale-110">
                            {star <= (hover || rating) ? <FaStar className="w-8 h-8 text-yellow-400" /> : <CiStar className="w-8 h-8 text-gray-400" />}
                        </span>
                    ))}
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Viết đánh giá */}
            <div className="mt-2">
                <label className="block text-sm font-bold text-gray-700">Viết đánh giá</label>
                <textarea className="w-full mt-1 p-2 border border-gray-300 rounded" rows={3} value={review} onChange={(e) => setReview(e.target.value)}
                    placeholder="Hãy chia sẻ nhận xét của bạn về sản phẩm này"></textarea>
            </div>

            {/* Gửi đánh giá */}
            <Button type="submit" className="mt-3 px-4 py-2 bg-[#fb8500] text-white rounded transition-opacity hover:bg-[#fd9e41] hover:opacity-80">
                Gửi
            </Button>
        </form>
    );
};


export default ReviewForm;
