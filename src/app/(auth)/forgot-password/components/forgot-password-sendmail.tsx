import InputAuth from "@/components/input-auth";
import Link from "next/link";
import { Backdrop } from "@/components/backdrop";

export default function ForgotPasswordSendMail() {
  return (
    <div className="w-[100%]">
      <h2 className="text-[1.5rem] leading-8 font-medium">Forgot password</h2>
      <span className="text-gray-500 inline-block mt-2">
        Enter your email to start the password recovery process!
      </span>
      <form
        className="pt-5 flex flex-col gap-y-4"
        onSubmit={(e) => e.preventDefault()} // Tạm thời ngăn submit
      >
        <div className="flex flex-col gap-y-2">
          <InputAuth
            id="email"
            label="Email"
            type="text"
            autoComplete="off"
            register={() => {}} // Tạm thời không có xử lý
            error="Email is required" // Hiển thị lỗi tĩnh
          />
        </div>
        <div className="flex flex-col gap-y-5">
          <button
            className="mt-2 block w-[100%] rounded-md py-2 bg-[#C3B1E1]"
          >
            <span className="text-base text-gray-200">Submit</span>
          </button>
          <div className="flex items-center justify-between gap-3">
            <div className="w-[50%] h-1 rounded-full bg-[#C3B1E1]"></div>
            <span className="text-gray-400">OR</span>
            <div className="w-[50%] h-1 rounded-full bg-[#C3B1E1]"></div>
          </div>
          <div className="flex justify-between">
            <p className="text-[1rem]">
              Have an account at PawFund?{" "}
              <Link href="/login">
                <span className="font-bold cursor-pointer">Log In</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
      <Backdrop open={false} /> {/* Backdrop tắt */}
    </div>
  );
}