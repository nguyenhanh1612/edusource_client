"use client";

import { useLoginForm } from "@/app/(auth)/login/hooks/useLoginForm";
import { Backdrop } from "@/components/backdrop";
import InputAuth from "@/components/input-auth";
import Link from "next/link";
import useLoginGoogle from "@/hooks/use-login-google";

export default function LoginForm() {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    valuePassword,
    typePassword,
    handleToggleTypePassword,
    isPending,
  } = useLoginForm();

  const { handleLoginGoogle, isPendingGoogle } = useLoginGoogle();

  return (
    <div>
      <div className="w-[80%] px-5 py-4 m-auto">
        <h2 className="text-[1.5rem] leading-8 font-medium">Đăng nhập</h2>
        <span className="text-gray-500 inline-block mt-2">
          Khám phá kho tài liệu tiếng Anh cấp 1 được thiết kế sinh động, dễ hiểu – giải pháp tối ưu giúp bé học giỏi hơn mỗi ngày!
        </span>
        <form
          className="pt-5 flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-y-2">
            <InputAuth
              id="email"
              label="Email"
              type="text"
              autoComplete="off"
              register={register("email")}
              error={errors?.email?.message}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <InputAuth
              id="password"
              label="Mật khẩu"
              type={typePassword === false ? "password" : "text"}
              autoComplete="off"
              register={register("password")}
              error={errors?.password?.message}
              value={valuePassword}
              onClickEyePassword={handleToggleTypePassword}
            />
          </div>
          <div className="flex flex-col gap-y-5">
            <button
              className={`mt-2 block w-[100%] rounded-md py-2 ${Object.keys(errors).length === 0
                ? "bg-[#7a3cdd]"
                : "bg-[#C3B1E1]"
                }`}
            >
              <span className="text-base text-gray-200">Đăng nhập</span>
            </button>
            <div className="flex items-center justify-between gap-3">
              <div
                className={`w-[50%] h-1 rounded-full ${Object.keys(errors).length === 0
                  ? "bg-[#7a3cdd]"
                  : "bg-[#C3B1E1]"
                  }`}
              ></div>
              <span className="text-gray-400">HOẶC</span>
              <div
                className={`w-[50%] h-1 rounded-full ${Object.keys(errors).length === 0
                  ? "bg-[#7a3cdd]"
                  : "bg-[#C3B1E1]"
                  }`}
              ></div>
            </div>
            <button
              type="button"
              onClick={() => handleLoginGoogle()}
              className={`block w-[100%] rounded-md py-2 bg-white border border-gray-400 hover:bg-gray-300`}
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
                Lần đầu sử dụng EduSource?{" "}
                <Link href="/signup">
                  <span className="font-bold cursor-pointer">Đăng ký</span>
                </Link>
              </p>
              <Link href="/forgot-password">
                <p className="text-[1rem]">
                  <span className="font-bold cursor-pointer">
                    Quên mật khẩu?
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Backdrop open={isPending} />
      <Backdrop open={isPendingGoogle} />
    </div>
  );
}
