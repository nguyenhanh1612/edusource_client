import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import PaymentFailedPage from "./components/fail";

export const metadata: Metadata = {
    title: "Payment Fail",
    description: "Payment fail for EduSource",
};

export default function Home() {
    return (
        <div>
            <PaymentFailedPage />
        </div>
    )
}