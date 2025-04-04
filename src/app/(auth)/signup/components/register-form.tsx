"use client";
import { useRegisterForm } from "@/app/(auth)/signup/hooks/useRegisterForm";
import { Backdrop } from "@/components/backdrop";
import InputAuth from "@/components/input-auth";
import useLoginGoogle from "@/hooks/use-login-google";
import Link from "next/link";

export default function RegisterForm() {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    valuePassword,
    typePassword,
    valueConfirmPassword,
    typeConfirmPassword,
    handleToggleTypePassword,
    handleToggleConfirmPassword,
    isPending,
  } = useRegisterForm();

  const { handleLoginGoogle, isPendingGoogle } = useLoginGoogle();

  return (
    <div>
      <div className="w-[80%] px-5 py-4 pt-10 m-auto">
        <h2 className="text-[1.5rem] leading-8 font-medium">Đăng ký</h2>
        <span className="text-gray-500 inline-block mt-2">
          Đăng ký ngay hôm nay để mở khóa hàng ngàn tài liệu tiếng Anh chất lượng, giúp bạn dễ dàng tạo dựng bài học hiệu quả!
        </span>
        <form
          className="pt-5 flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-x-2">
            <div className="w-1/2 flex flex-col gap-y-2">
              <InputAuth
                id="firstname"
                label="Họ"
                type="text"
                autoComplete="off"
                register={register("firstName")}
                error={errors?.firstName?.message}
              />
            </div>
            <div className="w-1/2 flex flex-col gap-y-2">
              <InputAuth
                id="lastname"
                label="Tên"
                type="text"
                autoComplete="off"
                register={register("lastName")}
                error={errors?.lastName?.message}
              />
            </div>
          </div>
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
            <div className="flex gap-x-4 items-end">
              <div className="flex flex-col gap-y-2">
                <div className="flex justify-between">
                  <label htmlFor="Code" className="text-gray-600 mt-2">
                    Mã số
                  </label>
                </div>
                <div
                  className={`block p-2 border-2 border-gray-300 rounded-md text-center ${errors?.phoneNumber?.message && "border-red-500"
                    }`}
                >
                  +84
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-y-2">
                <InputAuth
                  id="phonenumber"
                  label="Số điện thoại"
                  type="number"
                  autoComplete="off"
                  register={register("phoneNumber")}
                  error={errors?.phoneNumber?.message}
                />
              </div>
            </div>
            {errors?.phoneNumber?.message && (
              <p className="text-base text-red-400">
                {errors?.phoneNumber?.message}
              </p>
            )}
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
          <div className="flex flex-col gap-y-2">
            <InputAuth
              id="confirmpassword"
              label="Xác nhận mật khẩu"
              type={typeConfirmPassword === false ? "password" : "text"}
              autoComplete="off"
              register={register("confirmPassword")}
              error={errors?.confirmPassword?.message}
              value={valueConfirmPassword}
              onClickEyePassword={handleToggleConfirmPassword}
            />
          </div>
          <div className="flex flex-col gap-y-5">
            <button
              className={`mt-2 block w-[100%] rounded-md py-2 ${Object.keys(errors).length === 0
                  ? "bg-[#7a3cdd]"
                  : "bg-[#C3B1E1]"
                }`}
            >
              <span className="text-base text-gray-200">Đăng ký</span>
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
                Bạn có tài khoản EduSource không?{" "}
                <Link href="/login">
                  <span className="font-bold cursor-pointer">Đăng nhập</span>
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

