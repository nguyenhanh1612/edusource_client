"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaTimesCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { GoArrowLeft } from "react-icons/go";
export default function PaymentFailedPage() {
  const router = useRouter()

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

        <div>
          <Button
            className="bg-sky-500 hover:bg-sky-700"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <GoArrowLeft /> Quay về trang chủ
          </Button>

        </div>
      </div>
    </div>
  );
}