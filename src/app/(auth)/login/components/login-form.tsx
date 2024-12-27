"use client";

import { Backdrop } from "@/components/backdrop";
import InputAuth from "@/components/input-auth";
import Link from "next/link";

export default function LoginForm() {
  return (
    <div>
      <div className="w-[70%] px-5 py-4 m-auto">
        <h2 className="text-[1.5rem] leading-8 font-medium">Log In</h2>
        <span className="text-gray-500 inline-block mt-2">
          Become a hero for animals in need, starting your journey here by
          logging in and making a difference today.
        </span>
        <form
          className="pt-5 flex flex-col gap-y-4"
          onSubmit={(e) => e.preventDefault()} // Ngăn submit form tạm thời
        >
          <div className="flex flex-col gap-y-2">
            <InputAuth
              id="email"
              label="Email"
              type="text"
              autoComplete="off"
              register={() => {}} // Không xử lý logic
              error="Invalid email" // Hiển thị lỗi tĩnh
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <InputAuth
              id="password"
              label="Password"
              type="password" // Tĩnh kiểu nhập
              autoComplete="off"
              register={() => {}} // Không xử lý logic
              error="Password is required" // Hiển thị lỗi tĩnh
              value="" // Không có giá trị nhập
              onClickEyePassword={() => {}} // Không xử lý
            />
          </div>
          <div className="flex flex-col gap-y-5">
            <button
              className="mt-2 block w-[100%] rounded-md py-2 bg-[#C3B1E1]"
            >
              <span className="text-base text-gray-200">Log In</span>
            </button>
            <div className="flex items-center justify-between gap-3">
              <div className="w-[50%] h-1 rounded-full bg-[#C3B1E1]"></div>
              <span className="text-gray-400">OR</span>
              <div className="w-[50%] h-1 rounded-full bg-[#C3B1E1]"></div>
            </div>
            <button
              type="button"
              className="block w-[100%] rounded-md py-2 bg-white border border-gray-400 hover:bg-gray-300"
            >
              <div className="relative">
                <figure className="absolute top-1/2 -translate-y-1/2 left-[38%]">
                  <img
                    src={"/images/Google-icon.svg"}
                    alt="Login with Google"
                    width={25}
                    height={25}
                    className="block"
                  />
                </figure>
                <span className="text-base text-gray-700">Google</span>
              </div>
            </button>
            <div className="flex justify-between">
              <p className="text-[1rem]">
                First time using PawFund?{" "}
                <Link href="/signup">
                  <span className="font-bold cursor-pointer">Sign up</span>
                </Link>
              </p>
              <Link href="/forgot-password">
                <p className="text-[1rem]">
                  <span className="font-bold cursor-pointer">
                    Forgot password?
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Backdrop open={false} /> {/* Backdrop tắt */}
      <Backdrop open={false} /> {/* Backdrop Google tắt */}
    </div>
  );
}
