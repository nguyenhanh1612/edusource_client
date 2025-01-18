import LogIn from "@/app/(auth)/login/page";
import ActiveVerifyChangePassword from "../components/verify-change-password";
import AuthLayout from "@/app/(auth)/layout";
import ChangePasswordSuccess from "@/app/(user)/change-password-success/components/changepasswordsuccess";
import Home from "@/app/page";

export default function ActiveVerifyChangePasswordPage({ params }: any) {
  return (
    <div>
      <ActiveVerifyChangePassword userId={decodeURIComponent(params?.userId)}>
          <Home />
      </ActiveVerifyChangePassword>
    </div>
  );
}
