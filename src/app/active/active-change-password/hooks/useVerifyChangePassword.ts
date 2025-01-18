// "use client";

// import { useServiceVerifyChangePassword } from "@/services/account/services";
// import { useState } from "react";

// export default function useVerifyChangePassword() {
//   const { mutate, isPending } = useServiceVerifyChangePassword();
//   const [isVerified, setIsVerified] = useState(false); // Trạng thái xác minh thành công
//   const [error, setError] = useState<string | null>(null); // Trạng thái lỗi (nếu có)

//   const verifyChangePassword = async (body: REQUEST.TVerifyChangePassword) => {
//     try {
//       await mutate(body); // Chờ cho đến khi mutate hoàn thành
//       setIsVerified(true); // Nếu thành công, set trạng thái verified
//     } catch (err) {
//       setError("Verification failed. Please try again."); // Set thông báo lỗi nếu có
//       console.log(err);
//     }
//   };

//   return { isPending, isVerified, error, verifyChangePassword };
// }

"use client";
import { useServiceVerifyChangePassword } from "@/services/account/services";

export default function useVerifyChangePassword() {
  const { mutate, isPending } = useServiceVerifyChangePassword();

  const verifyChangePassword = (body: REQUEST.TVerifyChangePassword) => {
    try {
      mutate(body);
    } catch (err) {
      console.log(err);
    }
  };

  return { isPending, verifyChangePassword };
}

