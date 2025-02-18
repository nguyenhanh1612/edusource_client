'use client'
import React, { useEffect, useState } from "react";
import useGetAllProduct from "../hooks/useGetAllProduct";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

function AllExercise() {
  const { isPending, getAllProductApi } = useGetAllProduct();
  const [filteredProducts, setFilteredProducts] = useState<API.Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProductApi({
        category: 1, 
        pageIndex: 1,
        pageSize: 10,
      });
  
      if (res) {
        setFilteredProducts(res.value.data.items);
      }
    };
  
    fetchProducts();
  }, []);
  
const handleProductClick = (id: string) => {
    router.push(`/exercise/${id}`); 
  };

  return (
    <div className="container mx-auto p-4 mt-32">
      <h1 className="text-3xl font-bold text-center mb-6">Tổng hợp bài tập</h1>
      {isPending ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="p-4 border rounded-lg shadow-sm bg-white cursor-pointer transition-transform transform hover:scale-105"
              
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover border-2 border-[#8ecae6] rounded-lg"
                />
              )}
              <div className="flex flex-col text-center space-y-2 mt-2">
                <h3 className="font-semibold text-2xl">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
              <div className="flex items-center justify-center mt-2 space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= product.rating ? (
                      <FaStar key={star} className="text-yellow-500" />
                    ) : (
                      <FaRegStar key={star} className="text-gray-300" />
                    )
                  )}
                </div>
                <div className="text-sm font-medium text-gray-700 mt-1">{product.rating}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllExercise;
