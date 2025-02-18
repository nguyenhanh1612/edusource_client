"use client";

import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <div className="flex justify-center">
          <FaTimesCircle className="text-6xl text-red-500" />
        </div>

       
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Thanh Toán Thất Bại
        </h1>

      
        <p className="text-gray-600 mt-2">
          Rất tiếc, quá trình thanh toán của bạn không thành công. Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ để được giúp đỡ.
        </p>

        
        <Link
          href="/payment" 
          className="mt-6 inline-block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Thử Lại Thanh Toán
        </Link>

        
        <Link
          href="/" 
          className="mt-4 inline-block text-gray-600 hover:text-gray-800 transition duration-300"
        >
          Quay Về Trang Chủ
        </Link>
      </div>
    </div>
  );
}