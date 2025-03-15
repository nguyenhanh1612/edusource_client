import React from "react";

interface Review {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
}

const ReviewSection: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  return (
    <div className="max-w-4xl space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="p-4 rounded-lg shadow-lg bg-gray-100">
          <div className="flex items-start">
            <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border-2 border-white" />
            <div className="ml-3">
              <h4 className="text-gray-800 text-sm font-bold">{review.name}</h4>
              <h4 className="text-sm">{review.date}</h4>
            </div>
          </div>
          <div className="flex space-x-1 mt-1">
            {[...Array(5)].map((_, index) => (
              <svg key={index} className={`w-3 ${index < review.rating ? "fill-[#facc15]" : "fill-[#CED5D8]"}`} viewBox="0 0 14 13">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
