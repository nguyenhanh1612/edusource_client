import Home from "@/app/page";
import ActiveVerifyChangeEmail from "../components/verify-change-email";

export default function ActiveVerifyChangeEmailPage({ params }: any) {
  return (
    <div>
      <ActiveVerifyChangeEmail userId={decodeURIComponent(params?.userId)}>
          <Home />
      </ActiveVerifyChangeEmail>
    </div>
  );
}
