import InputAuth from "@/components/input-auth";
import Link from "next/link";
import { Backdrop } from "@/components/backdrop";

export default function ForgotPasswordChange() {
  return (
    <div className="w-[100%]">
      <h2 className="text-[1.5rem] leading-8 font-medium">Forgot password</h2>
      <span className="text-gray-500 inline-block mt-2">
        Enter your new password and confirm it to complete the recovery process!
      </span>
      <form
        className="pt-5 flex flex-col gap-y-4"
        onSubmit={(e) => e.preventDefault()} // Tạm thời ngăn hành vi submit
      >
        <div className="flex flex-col gap-y-2">
          <InputAuth
            id="password"
            label="New Password"
            type="password"
            autoComplete="off"
            value="examplepassword" // Giá trị tĩnh
            onClickEyePassword={() => {}} // Tạm bỏ logic
          />
          <InputAuth
            id="confirmpassword"
            label="New Confirm Password"
            type="password"
            autoComplete="off"
            value="examplepassword" // Giá trị tĩnh
            onClickEyePassword={() => {}} // Tạm bỏ logic
          />
        </div>
        <div className="flex flex-col gap-y-5">
          <button
            className="mt-2 block w-[100%] rounded-md py-2 bg-[#C3B1E1]"
            type="button"
          >
            <span className="text-base text-gray-200"> Submit </span>
          </button>
          <div className="flex items-center justify-between gap-3">
            <div className="w-[50%] h-1 rounded-full bg-[#C3B1E1]"></div>
            <span className="text-gray-400">OR</span>
            <div className="w-[50%] h-1 rounded-full bg-[#C3B1E1]"></div>
          </div>
          <div className="flex justify-between">
            <p className="text-[1rem] flex items-center gap-x-1">
              Have an account PawFund?{" "}
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
