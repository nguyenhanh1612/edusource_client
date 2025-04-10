'use client'
import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useGetAllProduct from "../../allexercise/hooks/useGetAllProduct";
import { motion } from "framer-motion";
import { Backdrop } from "@/components/backdrop";
function AllPowerPoint() {
  const { isPending, getAllProductApi } = useGetAllProduct();
  const [filteredProducts, setFilteredProducts] = useState<API.Product[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProductApi({
        UploadType: 0,
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
    setIsNavigating(true);
    router.push(`/test/${id}`);
  };

  return (
    <div className="container mx-auto p-6 mt-32">
      <h1 className="text-4xl font-extrabold text-center text-[#023047] drop-shadow-md mb-8">
        Tổng hợp PowerPoint
      </h1>

      {(isPending || isNavigating) && <Backdrop open={true} />}

      {!isPending && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-[url('/images/BG_1.png')]">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="relative p-5 border border-gray-200 rounded-xl shadow-lg bg-white cursor-pointer transition-all duration-300 
              hover:shadow-xl hover:scale-105 hover:bg-[#8ecae6]/20"
              whileHover={{ scale: 1.05 }}
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-52 object-cover border-4 border-[#8ecae6] rounded-lg"
                />
              )}
              <div className="flex flex-col text-center space-y-3 mt-3">
                <h3 className="text-2xl font-bold text-[#023047]">{product.name}</h3>
                <p className="text-sm text-gray-700">{product.description}</p>
              </div>

              {/* Hiển thị rating */}
              <div className="flex items-center justify-center mt-3 space-x-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= product.rating ? (
                      <FaStar key={star} className="text-yellow-500 text-lg drop-shadow-md" />
                    ) : (
                      <FaRegStar key={star} className="text-gray-300 text-lg" />
                    )
                  )}
                </div>
                <span className="text-sm font-medium text-gray-800 mt-1">
                  {product.rating}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {!isPending && filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-gray-600 text-lg font-medium">
            Hiện tại chưa có sản phẩm nào. Vui lòng quay lại sau nhé!
          </p>
        </div>
      )}
    </div>
  );
}

export default AllPowerPoint;
